import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail, getContactEmailHtml } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, subject, message } = body;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await prisma.contactRequest.create({
      data: { firstName, lastName, email, phone, subject, message },
    });

    const emailResult = await sendEmail({
      to: process.env.SMTP_FROM || "info@olus-bis.com",
      subject: `New Contact Request: ${subject || "General Inquiry"}`,
      html: getContactEmailHtml({ firstName, lastName, email, message, phone }),
    });

    if (!emailResult.success) {
      console.error("Failed to send email notification");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
