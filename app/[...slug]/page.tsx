import { notFound } from "next/navigation";
import { BasicPage } from "@/components/drupal/BasicPage";
import { drupal } from "@/lib/drupal";
import type { Metadata } from "next";
import type { DrupalNode } from "next-drupal";

type NodePageParams = { slug: string[] };
type NodePageProps = {
  params: Promise<NodePageParams>;
};

async function getPageByAlias(aliasPath: string): Promise<DrupalNode | null> {
  try {
    const pages = await drupal.getResourceCollection<DrupalNode[]>("node--page", {
      params: {
        "filter[status]": 1,
        "filter[path][value]": aliasPath,
        "page[limit]": 1,
      },
      next: { revalidate: 3600 },
    });

    return pages?.[0] ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata(
  props: NodePageProps
): Promise<Metadata> {
  const { slug } = await props.params;
  const aliasPath = `/${slug.join("/")}`;

  const page = await getPageByAlias(aliasPath);

  if (!page) return {};

  return {
    title: page.title,
  };
}

export default async function Page(props: NodePageProps) {
  const { slug } = await props.params;
  const aliasPath = `/${slug.join("/")}`;

  const page = await getPageByAlias(aliasPath);

  if (!page) notFound();

  return <BasicPage node={page} />;
}