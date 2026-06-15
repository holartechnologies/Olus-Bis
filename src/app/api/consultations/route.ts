import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail, getConsultationEmailHtml } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, date, time, type, notes } = body;

    if (!firstName || !lastName || !email || !phone || !date || !time || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let lead = await prisma.lead.findFirst({
      where: { email },
    });

    if (!lead) {
      lead = await prisma.lead.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          source: "WEBSITE",
          consultationStatus: "PENDING",
        },
      });
    }

    const appointmentDate = new Date(`${date}T${time}`);

    await prisma.consultation.create({
      data: {
        leadId: lead.id,
        appointmentDate,
        type,
        notes,
        status: "PENDING",
      },
    });

    await prisma.lead.update({
      where: { id: lead.id },
      data: { consultationStatus: "PENDING" },
    });

    const emailResult = await sendEmail({
      to: process.env.SMTP_FROM || "info@olus-bis.com",
      subject: `New Consultation Request from ${firstName} ${lastName}`,
      html: getConsultationEmailHtml({
        firstName,
        lastName,
        email,
        phone,
        date: appointmentDate.toLocaleDateString(),
        time,
        type,
      }),
    });

    if (!emailResult.success) {
      console.error("Failed to send consultation email");
    }

    return NextResponse.json({ success: true, message: "Consultation request submitted successfully" });
  } catch (error) {
    console.error("Consultation API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
