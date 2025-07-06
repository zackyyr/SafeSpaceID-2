import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const productFile = path.join(process.cwd(), "app/data/Product.json");

export async function GET(_, { params }) {
  try {
    const { id } = params;
    const data = fs.readFileSync(productFile, "utf-8");
    const products = JSON.parse(data);

    const product = products.find((p) => p.id === id);

    if (!product) {
      return NextResponse.json({ message: "Produk tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.error("GET PRODUCT BY ID ERROR:", err);
    return NextResponse.json({ message: "Gagal ambil produk" }, { status: 500 });
  }
}
