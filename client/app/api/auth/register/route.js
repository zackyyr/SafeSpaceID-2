import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const usersFile = path.join(process.cwd(), "app/data/Users.json");

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Baca data user
    const usersRaw = fs.readFileSync(usersFile, "utf-8");
    const users = JSON.parse(usersRaw);

    // Cek apakah email sudah ada
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { message: "Email sudah terdaftar." },
        { status: 400 }
      );
    }

    // Tambahkan user baru
    const newUser = {
      email,
      password, // harusnya di-hash sih, tapi ini dummy dulu
      username: email.split("@")[0], // contoh username dari email
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    // Simpan ke file
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    return NextResponse.json(
      { message: "Registrasi berhasil." },
      { status: 201 }
    );
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return NextResponse.json(
      { message: "Gagal memproses registrasi." },
      { status: 500 }
    );
  }
}
