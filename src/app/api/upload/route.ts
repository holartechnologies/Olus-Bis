import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadFile, getFileCategory } from "@/lib/upload";

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

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const category = (formData.get("category") as string) || "general";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const subDir = category || getFileCategory(file.name);
    const result = await uploadFile(file, subDir);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const document = await prisma.document.create({
      data: {
        clientId: user.client.id,
        fileName: result.fileName!,
        originalName: file.name,
        filePath: result.filePath!,
        fileSize: file.size,
        mimeType: file.type,
        category: subDir,
        uploadedById: userId,
      },
    });

    await prisma.notification.create({
      data: {
        userId,
        title: "Document Uploaded",
        message: `Your document "${file.name}" has been uploaded successfully and is pending verification.`,
        type: "DOCUMENT_UPLOAD",
      },
    });

    return NextResponse.json({ success: true, document });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
