import { NextResponse } from "next/server";
import { getFrontendProducts } from "@/lib/data/fetchProducts";

export async function GET(req: Request) {
  try {
    const products = await getFrontendProducts();
    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
