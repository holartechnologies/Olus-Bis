import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminConsultationsPage() {
  const consultations = await prisma.consultation.findMany({
    include: { lead: true, client: { include: { user: true } }, assignedTo: true },
    orderBy: { appointmentDate: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Consultations</h1>
          <p className="text-sm text-gray-500">Manage consultation requests and schedules</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-4 text-sm font-medium text-gray-500">Client</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Type</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Date</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Assigned To</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-right p-4 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {consultations.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <span className="font-medium">
                      {c.client ? `${c.client.user.firstName} ${c.client.user.lastName}` :
                       c.lead ? `${c.lead.firstName} ${c.lead.lastName}` : "Unknown"}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{c.type || "General"}</td>
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(c.appointmentDate).toLocaleString()}
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {c.assignedTo ? `${c.assignedTo.firstName} ${c.assignedTo.lastName}` : "Unassigned"}
                  </td>
                  <td className="p-4">
                    <Badge className={
                      c.status === "CONFIRMED" ? "bg-green-100 text-green-700" :
                      c.status === "COMPLETED" ? "bg-blue-100 text-blue-700" :
                      c.status === "CANCELLED" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }>
                      {c.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
              ))}
              {consultations.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">No consultations yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
