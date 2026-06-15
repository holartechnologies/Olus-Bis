import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, Bell, MessageSquare, Upload, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function ClientDashboard() {
  const session = await auth();
  const userId = (session!.user as any).id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      client: {
        include: {
          documents: { orderBy: { createdAt: "desc" }, take: 5 },
          consultations: { orderBy: { appointmentDate: "desc" }, take: 5 },
          cases: { orderBy: { createdAt: "desc" }, take: 5 },
        },
      },
    },
  });

  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const client = user?.client;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <FileText className="h-5 w-5 text-[#0B3AA8]" />
            </div>
            <div>
              <p className="text-2xl font-bold">{client?.documents.length || 0}</p>
              <p className="text-xs text-gray-500">Documents</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <Calendar className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{client?.consultations.length || 0}</p>
              <p className="text-xs text-gray-500">Consultations</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
              <Bell className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{notifications.filter((n) => !n.isRead).length}</p>
              <p className="text-xs text-gray-500">Notifications</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <MessageSquare className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs text-gray-500">Messages</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Recent Documents</h2>
              <Link href="/client/documents" className="text-sm text-[#0B3AA8] hover:underline flex items-center">
                View All <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
            {client?.documents.length ? (
              <div className="space-y-3">
                {client.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{doc.originalName}</span>
                    </div>
                    <Badge variant={doc.verificationStatus === "VERIFIED" ? "default" : "secondary"}>
                      {doc.verificationStatus}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Upload className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500 mb-3">No documents uploaded yet</p>
                <Button asChild size="sm" className="bg-[#0B3AA8]">
                  <Link href="/client/documents">Upload Document</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Upcoming Consultations</h2>
              <Link href="/client/consultations" className="text-sm text-[#0B3AA8] hover:underline flex items-center">
                View All <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
            {client?.consultations.length ? (
              <div className="space-y-3">
                {client.consultations.map((consultation) => (
                  <div key={consultation.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="text-sm font-medium">
                        {new Date(consultation.appointmentDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500">{consultation.type}</p>
                    </div>
                    <Badge>{consultation.status}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No consultations scheduled</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Notifications</h2>
          </div>
          {notifications.length ? (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border ${!notification.isRead ? "bg-blue-50 border-blue-200" : ""}`}
                >
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-xs text-gray-500">{notification.message}</p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">No notifications</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
