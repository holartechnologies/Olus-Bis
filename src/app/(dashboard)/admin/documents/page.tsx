import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDocumentsPage() {
  const documents = await prisma.document.findMany({
    include: { client: { include: { user: true } }, verifiedBy: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Document Management</h1>
          <p className="text-sm text-gray-500">Review and verify client documents</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-4 text-sm font-medium text-gray-500">Document</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Client</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Category</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Uploaded</th>
                <th className="text-right p-4 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <span className="text-sm font-medium line-clamp-1">{doc.originalName}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {doc.client.user.firstName} {doc.client.user.lastName}
                  </td>
                  <td className="p-4 text-sm text-gray-600 capitalize">{doc.category || "General"}</td>
                  <td className="p-4">
                    <Badge className={
                      doc.verificationStatus === "VERIFIED" ? "bg-green-100 text-green-700" :
                      doc.verificationStatus === "REJECTED" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }>
                      {doc.verificationStatus}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <XCircle className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {documents.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">No documents uploaded</td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
