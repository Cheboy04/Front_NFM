import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { getDraftData } from "next-drupal/draft"
import { Article } from "@/components/drupal/Article"
import { BasicPage } from "@/components/drupal/BasicPage"
import { drupal } from "@/lib/drupal"
import type { Metadata, ResolvingMetadata } from "next"
import type { DrupalNode, JsonApiParams } from "next-drupal"
import type { DrupalArticle } from "@/lib/types"

async function getNode(slug: string[]) {
  const path = `/${slug.join("/")}`
  const params: JsonApiParams = {}
  const draftData = await getDraftData()

  if (draftData.path === path) {
    params.resourceVersion = draftData.resourceVersion
  }

  const translatedPath = await drupal.translatePath(path)

  if (!translatedPath) {
    throw new Error("Resource not found", { cause: "NotFound" })
  }

  const type = translatedPath.jsonapi?.resourceName!
  const uuid = translatedPath.entity.uuid

  if (type === "node--article") {
    params.include = "field_image,uid,field_category,field_tags"
  }

  const resource = await drupal.getResource<DrupalNode>(type, uuid, {
    params,
    cache: "force-cache",
    next: {
      revalidate: 3600,
    },
  })

  if (!resource) {
    throw new Error(
      `Failed to fetch resource: ${translatedPath?.jsonapi?.individual}`,
      { cause: "DrupalError" }
    )
  }

  return resource
}

type NodePageParams = { slug: string[] }
type NodePageProps = {
  params: Promise<NodePageParams>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  props: NodePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params
  let node
  try {
    node = await getNode(params.slug)
  } catch (e) {
    return {}
  }

  const article = node as DrupalArticle
  const imageUrl = article.field_image?.uri?.url
    ? `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${article.field_image.uri.url}`
    : undefined

  return {
    title: node.title,
    description: article.field_excerpt || undefined,
    openGraph: {
      title: node.title,
      description: article.field_excerpt || undefined,
      images: imageUrl ? [{ url: imageUrl }] : [],
      type: 'article',
    },
  }
}

const RESOURCE_TYPES = ["node--page", "node--article"]

export async function generateStaticParams(): Promise<NodePageParams[]> {
  const resources = await drupal.getResourceCollectionPathSegments(RESOURCE_TYPES, {})
  return resources.map((resource) => ({ slug: resource.segments }))
}

export default async function NodePage(props: NodePageProps) {
  const params = await props.params
  const draft = await draftMode()
  const isDraftMode = draft.isEnabled

  let node
  try {
    node = await getNode(params.slug)
  } catch (error) {
    notFound()
  }

  if (!isDraftMode && node?.status === false) {
    notFound()
  }

  // Para artículos, traer artículos relacionados (misma categoría o los más recientes)
  let relatedArticles: DrupalArticle[] = []
  if (node.type === "node--article") {
    const article = node as DrupalArticle
    try {
      const related = await drupal.getResourceCollection<DrupalArticle[]>("node--article", {
        params: {
          "filter[status]": 1,
          "filter[id][operator]": "<>",
          "filter[id][value]": node.id,
          "include": "field_image,field_category",
          "sort": "-created",
          "page[limit]": 3,
        },
        next: { revalidate: 3600 },
      })
      relatedArticles = related
    } catch (e) {
      // Si falla, simplemente no mostramos relacionados
    }
  }

  return (
    <>
      {node.type === "node--page" && <BasicPage node={node} />}
      {node.type === "node--article" && (
        <Article node={node as DrupalArticle} relatedArticles={relatedArticles} />
      )}
    </>
  )
}
