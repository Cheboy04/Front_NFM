import { NextResponse } from "next/server";
import { drupal } from "@/lib/drupal";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const alias = searchParams.get("alias") || "/blog/nuevo-articulo-desde-drupal";

  const url = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/node/article?filter[path][alias]=${encodeURIComponent(alias)}&page[limit]=1`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    const text = await res.text();

    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      contentType: res.headers.get("content-type"),
      url,
      bodyStarts: text.slice(0, 200),
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || String(e), url }, { status: 500 });
  }
}