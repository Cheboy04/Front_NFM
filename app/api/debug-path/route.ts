import { NextResponse } from "next/server";
import { drupal } from "@/lib/drupal";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path") || "/blog/nuevo-articulo-desde-drupal";

  try {
    const translated = await drupal.translatePath(path);
    return NextResponse.json({
      ok: true,
      baseUrl: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL,
      path,
      translated,
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        ok: false,
        baseUrl: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL,
        path,
        error: e?.message || String(e),
      },
      { status: 500 }
    );
  }
}