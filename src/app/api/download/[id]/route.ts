import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const userId = (session.user as any).id;
    const userRole = (session.user as any).role;

    const document = await prisma.document.findUnique({
      where: { id },
      include: { client: true },
    });

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    const isOwner = document.client.userId === userId;
    const isStaff = ["SUPER_ADMIN", "ATTORNEY", "CASE_MANAGER", "SUPPORT_STAFF"].includes(userRole);

    if (!isOwner && !isStaff) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (!document.fileUrl) {
      return NextResponse.json({ error: "File not available" }, { status: 404 });
    }

    return NextResponse.redirect(document.fileUrl);
  } catch (error) {
    console.error("Download API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
