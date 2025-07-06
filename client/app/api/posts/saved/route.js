import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const usersPath = path.join(process.cwd(), "app/data/Users.json");
const postsPath = path.join(process.cwd(), "app/data/Posts.json");

export async function POST(req) {
  try {
    const { userEmail } = await req.json();

    const userData = JSON.parse(fs.readFileSync(usersPath, "utf8"));
    const postsData = JSON.parse(fs.readFileSync(postsPath, "utf8"));

    const user = userData.find((u) => u.email === userEmail);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const saved = postsData.filter((p) => user.savedPosts.includes(p.slug));
    return NextResponse.json(saved);
  } catch (err) {
    console.error("Error fetching saved posts:", err);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
