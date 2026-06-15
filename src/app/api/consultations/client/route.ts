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
      const consultations = await prisma.consultation.findMany({
        include: { lead: true, client: { include: { user: true } }, assignedTo: true },
        orderBy: { appointmentDate: "desc" },
      });
      return NextResponse.json({ consultations });
    }

    const client = await prisma.client.findUnique({ where: { userId } });

    if (!client) {
      return NextResponse.json({ consultations: [] });
    }

    const consultations = await prisma.consultation.findMany({
      where: { clientId: client.id },
      orderBy: { appointmentDate: "desc" },
    });

    return NextResponse.json({ consultations });
  } catch (error) {
    console.error("Client consultations API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
