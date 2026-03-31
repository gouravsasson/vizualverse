import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function authorize(req: NextRequest) {
  const password = req.headers.get("x-admin-password");
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

// GET - List all images
export async function GET(req: NextRequest) {
  const authError = authorize(req);
  if (authError) return authError;

  try {
    const allResources: { public_id: string; secure_url: string; format: string; bytes: number; width: number; height: number; created_at: string; folder: string }[] = [];
    let nextCursor: string | undefined;

    do {
      const result = await cloudinary.api.resources({
        type: "upload",
        prefix: "vizualverse/",
        max_results: 100,
        next_cursor: nextCursor,
      });
      allResources.push(
        ...result.resources.map((r: { public_id: string; secure_url: string; format: string; bytes: number; width: number; height: number; created_at: string }) => ({
          public_id: r.public_id,
          secure_url: r.secure_url,
          format: r.format,
          bytes: r.bytes,
          width: r.width,
          height: r.height,
          created_at: r.created_at,
          folder: r.public_id.includes("/Exterior/") ? "Exterior" : r.public_id.includes("/Interior/") ? "Interior" : "Other",
        }))
      );
      nextCursor = result.next_cursor;
    } while (nextCursor);

    return NextResponse.json({ images: allResources });
  } catch (error) {
    console.error("Cloudinary list error:", error);
    return NextResponse.json({ error: "Failed to list images" }, { status: 500 });
  }
}

// POST - Upload image
export async function POST(req: NextRequest) {
  const authError = authorize(req);
  if (authError) return authError;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string;

    if (!file || !folder) {
      return NextResponse.json({ error: "File and folder are required" }, { status: 400 });
    }

    if (!["Exterior", "Interior"].includes(folder)) {
      return NextResponse.json({ error: "Folder must be Exterior or Interior" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<{ public_id: string; secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `vizualverse/${folder}`,
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as { public_id: string; secure_url: string });
        }
      ).end(buffer);
    });

    return NextResponse.json({ success: true, public_id: result.public_id, secure_url: result.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}

// DELETE - Delete image
export async function DELETE(req: NextRequest) {
  const authError = authorize(req);
  if (authError) return authError;

  try {
    const { public_id } = await req.json();

    if (!public_id || !public_id.startsWith("vizualverse/")) {
      return NextResponse.json({ error: "Invalid public_id" }, { status: 400 });
    }

    const result = await cloudinary.uploader.destroy(public_id);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
