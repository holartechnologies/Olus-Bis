import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const userRole = (session.user as any).role;

    const body = await request.json();
    const { subject, content, recipientId } = body;

    if (!content) {
      return NextResponse.json({ error: "Message content is required" }, { status: 400 });
    }

    const isStaff = ["SUPER_ADMIN", "ATTORNEY", "CASE_MANAGER", "SUPPORT_STAFF"].includes(userRole);

    let targetRecipientId = recipientId;

    if (!targetRecipientId) {
      if (isStaff) {
        const client = await prisma.client.findUnique({ where: { userId } });
        if (client) {
          const admin = await prisma.user.findFirst({ where: { role: "SUPER_ADMIN" } });
          targetRecipientId = admin?.id;
        }
      } else {
        const admin = await prisma.user.findFirst({
          where: { role: { in: ["SUPER_ADMIN", "ATTORNEY"] } },
        });
        targetRecipientId = admin?.id;
      }
    }

    if (!targetRecipientId) {
      return NextResponse.json({ error: "No recipient available" }, { status: 400 });
    }

    const message = await prisma.message.create({
      data: {
        senderId: userId,
        recipientId: targetRecipientId,
        subject: subject || null,
        content,
      },
    });

    await prisma.notification.create({
      data: {
        userId: targetRecipientId,
        title: "New Message",
        message: `You have received a new message${subject ? `: ${subject}` : ""}`,
        type: "MESSAGE_RECEIVED",
      },
    });

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error("Messages API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const messages = await prisma.message.findMany({
      where: {
        OR: [{ senderId: userId }, { recipientId: userId }],
      },
      include: { sender: true, recipient: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Messages API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
