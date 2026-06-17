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
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { client: true },
    });

    if (!user?.client) {
      return NextResponse.json({ error: "Client profile not found" }, { status: 400 });
    }

    const body = await request.json();
    const { fileUrl, fileKey, fileName, originalName, fileSize, mimeType, category } = body;

    if (!fileUrl || !fileKey || !originalName) {
      return NextResponse.json({ error: "Missing required file metadata" }, { status: 400 });
    }

    const document = await prisma.document.create({
      data: {
        clientId: user.client.id,
        fileName: fileName || originalName,
        originalName,
        filePath: fileUrl,
        fileSize,
        mimeType,
        category: category || "general",
        fileUrl,
        fileKey,
        uploadedById: userId,
      },
    });

    await prisma.notification.create({
      data: {
        userId,
        title: "Document Uploaded",
        message: `Your document "${originalName}" has been uploaded successfully and is pending verification.`,
        type: "DOCUMENT_UPLOAD",
      },
    });

    return NextResponse.json({ success: true, document });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
