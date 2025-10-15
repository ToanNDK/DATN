import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
  slug?: string;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();

  if (!q) return NextResponse.json({ results: [] });

  try {
    // JSON.stringify để escape chuỗi (dạng: "text")
    const escaped = JSON.stringify(q + "*"); // -> e.g. "\"dien thoai*\""

    const groq = `*[_type == "product" && name match ${escaped}] 
      | order(name asc)[0..5]{
        _id,
        name,
        price,
        "image": images[0].asset->url,
        "slug": slug.current
      }`;

    const results = (await client.fetch<Product[]>(groq)) || [];

    return NextResponse.json({ results });
  } catch (err) {
    console.error("Search API error:", err);
    return NextResponse.json({ results: [], error: "Search failed" }, { status: 500 });
  }
}
