import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const usersPath = path.join(process.cwd(), "app/data/Users.json");

export async function POST(req) {
  try {
    const { postSlug, userEmail } = await req.json();

    if (!postSlug || !userEmail) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const userData = JSON.parse(fs.readFileSync(usersPath, "utf8"));
    const userIndex = userData.findIndex((u) => u.email === userEmail);

    if (userIndex === -1) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!userData[userIndex].savedPosts.includes(postSlug)) {
      userData[userIndex].savedPosts.push(postSlug);
    }

    fs.writeFileSync(usersPath, JSON.stringify(userData, null, 2));
    return NextResponse.json({ message: "Post saved" });
  } catch (err) {
    console.error("Error saving post:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
