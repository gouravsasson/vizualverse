import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Log the contact form submission (you can integrate with email service later)
    console.log("Contact form submission:", { name, email, phone, message, date: new Date().toISOString() });

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
