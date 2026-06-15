import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.message.findMany({
    include: { sender: true, recipient: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-sm text-gray-500">View all client and team messages</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-4 text-sm font-medium text-gray-500">From</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">To</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Subject</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Date</th>
                <th className="text-right p-4 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-sm">{msg.sender.firstName} {msg.sender.lastName}</td>
                  <td className="p-4 text-sm">{msg.recipient.firstName} {msg.recipient.lastName}</td>
                  <td className="p-4 text-sm font-medium line-clamp-1">{msg.subject || "No subject"}</td>
                  <td className="p-4">
                    <Badge className={msg.isRead ? "bg-gray-100 text-gray-700" : "bg-blue-100 text-blue-700"}>
                      {msg.isRead ? "Read" : "Unread"}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
              ))}
              {messages.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">No messages yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
