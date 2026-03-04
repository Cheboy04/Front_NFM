import { cache } from "react";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { drupal } from "@/lib/drupal";
import { Article } from "@/components/drupal/Article";
import type { DrupalArticle } from "@/lib/types";

type Params = { slug: string[] };
type Props = { params: Promise<Params> };

const getArticleByAlias = cache(async (aliasPath: string): Promise<DrupalArticle | null> => {
  try {
    const articles = await drupal.getResourceCollection<DrupalArticle[]>("node--article", {
      params: {
        "filter[status]": 1,
        "filter[path][value]": aliasPath,
        include: "field_image,uid,field_category,field_tags",
        "page[limit]": 1,
      },
      next: { revalidate: 3600 },
    });
    return articles?.[0] ?? null;
  } catch {
    return null;
  }
});

const getRelatedArticles = cache(async (excludeId: string): Promise<DrupalArticle[]> => {
  try {
    return await drupal.getResourceCollection<DrupalArticle[]>("node--article", {
      params: {
        "filter[status]": 1,
        "filter[id][operator]": "<>",
        "filter[id][value]": excludeId,
        include: "field_image,field_category",
        sort: "-created",
        "page[limit]": 3,
      },
      next: { revalidate: 3600 },
    });
  } catch {
    return [];
  }
});

export const dynamicParams = true;

// Mantén tu build estable si Drupal falla en build
export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  try {
    const resources = await drupal.getResourceCollectionPathSegments(["node--article"], {});
    return resources
      .filter((r) => r.segments?.[0] === "blog")
      .map((r) => ({ slug: r.segments.slice(1) }));
  } catch {
    console.warn("Drupal unreachable during build. Skipping static generation for /blog/*.");
    return [];
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
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

export default async function BlogArticlePage(props: Props) {
  const { slug } = await props.params;
  const draft = await draftMode();
  const isDraftMode = draft.isEnabled;

  const aliasPath = `/blog/${slug.join("/")}`;
  const article = await getArticleByAlias(aliasPath);

  if (!article) notFound();
  if (!isDraftMode && (article as any)?.status === false) notFound();

  const relatedArticles = await getRelatedArticles(article.id);

  return <Article node={article} relatedArticles={relatedArticles} />;
}