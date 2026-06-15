import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminClientsPage() {
  const clients = await prisma.client.findMany({
    include: { user: true, _count: { select: { documents: true, consultations: true, cases: true } } },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Clients</h1>
          <p className="text-sm text-gray-500">Manage active clients</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-4 text-sm font-medium text-gray-500">Name</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Email</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Nationality</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Goal</th>
                <th className="text-center p-4 text-sm font-medium text-gray-500">Docs</th>
                <th className="text-center p-4 text-sm font-medium text-gray-500">Cases</th>
                <th className="text-right p-4 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <span className="font-medium">{client.user.firstName} {client.user.lastName}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{client.user.email}</td>
                  <td className="p-4 text-sm text-gray-600">{client.nationality || "-"}</td>
                  <td className="p-4 text-sm text-gray-600 max-w-[150px] truncate">{client.immigrationGoal || "-"}</td>
                  <td className="p-4 text-center text-sm">{client._count.documents}</td>
                  <td className="p-4 text-center text-sm">{client._count.cases}</td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
              ))}
              {clients.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">No clients yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
