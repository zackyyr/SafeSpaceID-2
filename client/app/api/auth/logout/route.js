import { NextResponse } from "next/server";

export async function POST() {
  // Hapus cookie token
  const response = NextResponse.json({ message: "Logout success" });

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    expires: new Date(0), // segera expired
  });

  return response;
}
