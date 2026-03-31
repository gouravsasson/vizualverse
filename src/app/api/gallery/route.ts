import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Public endpoint - no auth needed, returns only gallery images
export async function GET() {
  try {
    const allResources: { public_id: string; secure_url: string; width: number; height: number }[] = [];
    let nextCursor: string | undefined;

    do {
      const result = await cloudinary.api.resources({
        type: "upload",
        prefix: "vizualverse/",
        max_results: 100,
        next_cursor: nextCursor,
      });
      allResources.push(
        ...result.resources
          .filter((r: { public_id: string }) =>
            r.public_id.includes("/Exterior/") || r.public_id.includes("/Interior/")
          )
          .map((r: { public_id: string; secure_url: string; width: number; height: number }) => ({
            public_id: r.public_id,
            secure_url: r.secure_url,
            width: r.width,
            height: r.height,
          }))
      );
      nextCursor = result.next_cursor;
    } while (nextCursor);

    // Sort: Exterior first, then Interior, each sorted by number
    const sorted = allResources.sort((a, b) => {
      const aIsExt = a.public_id.includes("/Exterior/");
      const bIsExt = b.public_id.includes("/Exterior/");
      if (aIsExt !== bIsExt) return aIsExt ? -1 : 1;
      const aNum = parseInt(a.public_id.split("/").pop() || "0");
      const bNum = parseInt(b.public_id.split("/").pop() || "0");
      return aNum - bNum;
    });

    return NextResponse.json(
      { images: sorted },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("Gallery API error:", error);
    return NextResponse.json({ error: "Failed to load gallery" }, { status: 500 });
  }
}
