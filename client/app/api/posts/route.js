import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "app/data/Posts.json");

export async function GET() {
  try {
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const posts = JSON.parse(jsonData);
    return Response.json(posts);
  } catch (err) {
    return new Response("Gagal membaca data", { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const posts = JSON.parse(jsonData);

    // Cegah duplikasi
    const alreadyExists = posts.find((p) => p.id === body.id);
    if (alreadyExists) {
      return new Response("Postingan sudah ada", { status: 409 });
    }

    const updated = [body, ...posts];
    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
    return Response.json({ message: "Post berhasil ditambahkan" });
  } catch (err) {
    return new Response("Gagal menambahkan post", { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const jsonData = fs.readFileSync(filePath, "utf-8");
    let posts = JSON.parse(jsonData);

    const filtered = posts.filter((post) => post.id !== id);

    if (filtered.length === posts.length) {
      return new Response("Post tidak ditemukan", { status: 404 });
    }

    fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2));
    return Response.json({ message: "Post berhasil dihapus" });
  } catch (err) {
    return new Response("Gagal menghapus post", { status: 500 });
  }
}
