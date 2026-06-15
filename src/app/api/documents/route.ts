import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const userRole = (session.user as any).role;

    const isStaff = ["SUPER_ADMIN", "ATTORNEY", "CASE_MANAGER", "SUPPORT_STAFF"].includes(userRole);

    if (isStaff) {
      const documents = await prisma.document.findMany({
        include: { client: { include: { user: true } } },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json({ documents });
    }

    const client = await prisma.client.findUnique({
      where: { userId },
    });

    if (!client) {
      return NextResponse.json({ documents: [] });
    }

    const documents = await prisma.document.findMany({
      where: { clientId: client.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ documents });
  } catch (error) {
    console.error("Documents API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
