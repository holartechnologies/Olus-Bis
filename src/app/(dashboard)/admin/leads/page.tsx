import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Leads</h1>
          <p className="text-sm text-gray-500">Track and manage incoming leads</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-4 text-sm font-medium text-gray-500">Name</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Email</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Source</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Score</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Date</th>
                <th className="text-right p-4 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <span className="font-medium">{lead.firstName} {lead.lastName}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{lead.email}</td>
                  <td className="p-4">
                    <Badge variant="outline" className="text-xs">{lead.source}</Badge>
                  </td>
                  <td className="p-4">
                    <span className={`text-sm font-semibold ${lead.leadScore >= 70 ? "text-green-600" : lead.leadScore >= 40 ? "text-yellow-600" : "text-gray-600"}`}>
                      {lead.leadScore}
                    </span>
                  </td>
                  <td className="p-4">
                    <Badge className={
                      lead.consultationStatus === "CONFIRMED" ? "bg-green-100 text-green-700" :
                      lead.consultationStatus === "COMPLETED" ? "bg-blue-100 text-blue-700" :
                      lead.consultationStatus === "CANCELLED" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }>
                      {lead.consultationStatus}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">No leads yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
