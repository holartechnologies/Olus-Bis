import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminFAQPage() {
  const faqs = await prisma.fAQ.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">FAQ Management</h1>
          <p className="text-sm text-gray-500">Manage frequently asked questions</p>
        </div>
        <Button className="bg-[#0B3AA8]">Add FAQ</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-4 text-sm font-medium text-gray-500 w-16">Order</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Question</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Category</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Published</th>
                <th className="text-right p-4 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((faq) => (
                <tr key={faq.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-sm text-gray-600">{faq.order}</td>
                  <td className="p-4 text-sm font-medium line-clamp-1 max-w-md">{faq.question}</td>
                  <td className="p-4 text-sm text-gray-600">{faq.category || "General"}</td>
                  <td className="p-4">
                    <Badge className={faq.isPublished ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                      {faq.isPublished ? "Yes" : "No"}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </td>
                </tr>
              ))}
              {faqs.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">No FAQs yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
