import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Article } from "@/components/drupal/Article";
import { drupal } from "@/lib/drupal";
import type { Metadata } from "next";
import type { DrupalArticle } from "@/lib/types";

type NodePageParams = { slug: string[] };
type NodePageProps = {
  params: Promise<NodePageParams>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getArticleByAlias(aliasPath: string): Promise<DrupalArticle | null> {
  try {
    const articles = await drupal.getResourceCollection<DrupalArticle[]>("node--article", {
      params: {
        "filter[status]": 1,
        "filter[path][value]": aliasPath,
        include: "field_image,uid,field_category,field_tags",
        "page[limit]": 1,
        sort: "-created",
      },
      next: { revalidate: 3600 },
    });

    return articles?.[0] ?? null;
  } catch {
    return null;
  }
}

export const dynamicParams = true;

// Si Drupal se cae en build, no rompas el deploy
export async function generateStaticParams(): Promise<NodePageParams[]> {
  try {
    const resources = await drupal.getResourceCollectionPathSegments(["node--article"], {});
    // resources trae segments, normalmente ["blog","mi-slug"]
    // Aquí devolvemos solo lo que va dentro de /blog/ (o sea, sin el prefijo "blog")
    return resources
      .filter((r) => r.segments?.[0] === "blog")
      .map((r) => ({ slug: r.segments.slice(1) }));
  } catch {
    console.warn("Drupal unreachable during build. Skipping static generation for /blog/*.");
    return [];
  }
}

export async function generateMetadata(props: NodePageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const aliasPath = `/blog/${slug.join("/")}`;

  const article = await getArticleByAlias(aliasPath);
  if (!article) return {};

  const imageUrl = article.field_image?.uri?.url
    ? `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${article.field_image.uri.url}`
    : undefined;

  return {
    title: article.title,
    description: article.field_excerpt || undefined,
    openGraph: {
      title: article.title,
      description: article.field_excerpt || undefined,
      images: imageUrl ? [{ url: imageUrl }] : [],
      type: "article",
    },
  };
}

export default async function BlogArticlePage(props: NodePageProps) {
  const { slug } = await props.params;
  const draft = await draftMode();
  const isDraftMode = draft.isEnabled;

  const aliasPath = `/blog/${slug.join("/")}`;
  const article = await getArticleByAlias(aliasPath);

  if (!article) notFound();
  if (!isDraftMode && (article as any)?.status === false) notFound();

  // Relacionados (fallback silencioso)
  let relatedArticles: DrupalArticle[] = [];
  try {
    const related = await drupal.getResourceCollection<DrupalArticle[]>("node--article", {
      params: {
        "filter[status]": 1,
        "filter[id][operator]": "<>",
        "filter[id][value]": article.id,
        include: "field_image,field_category",
        sort: "-created",
        "page[limit]": 3,
      },
      next: { revalidate: 3600 },
    });
    relatedArticles = related;
  } catch {}

  return <Article node={article} relatedArticles={relatedArticles} />;
}