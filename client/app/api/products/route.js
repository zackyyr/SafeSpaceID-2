import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const productFile = path.join(process.cwd(), "app/data/Product.json");

export async function GET() {
  try {
    const data = fs.readFileSync(productFile, "utf-8");
    const products = JSON.parse(data);

    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.error("GET PRODUCTS ERROR:", err);
    return NextResponse.json({ message: "Gagal ambil produk" }, { status: 500 });
  }
}
