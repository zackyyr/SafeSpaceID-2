import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const usersFile = path.join(process.cwd(), "app/data/Users.json");

export async function PATCH(req) {
  try {
    const { email, productId, action } = await req.json();

    if (!email || !productId || !["add", "remove"].includes(action)) {
      return NextResponse.json({ message: "Data tidak valid" }, { status: 400 });
    }

    // Baca data user
    const usersRaw = fs.readFileSync(usersFile, "utf-8");
    const users = JSON.parse(usersRaw);

    const userIndex = users.findIndex((u) => u.email === email);

    if (userIndex === -1) {
      return NextResponse.json({ message: "User tidak ditemukan" }, { status: 404 });
    }

    const wishlist = new Set(users[userIndex].wishlist || []);

    if (action === "add") {
      wishlist.add(productId);
    } else {
      wishlist.delete(productId);
    }

    users[userIndex].wishlist = Array.from(wishlist);

    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    return NextResponse.json(
      { message: "Wishlist berhasil diupdate", wishlist: users[userIndex].wishlist },
      { status: 200 }
    );
  } catch (err) {
    console.error("PATCH WISHLIST ERROR:", err);
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
