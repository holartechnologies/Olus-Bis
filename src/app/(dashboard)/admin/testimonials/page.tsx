import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Testimonials</h1>
          <p className="text-sm text-gray-500">Manage client testimonials and reviews</p>
        </div>
        <Button className="bg-[#0B3AA8]">Add Testimonial</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-4 text-sm font-medium text-gray-500">Client</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Rating</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Content</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Featured</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-right p-4 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <span className="font-medium">{t.clientName}</span>
                    {t.clientTitle && <p className="text-xs text-gray-500">{t.clientTitle}</p>}
                  </td>
                  <td className="p-4">{'⭐'.repeat(t.rating)}</td>
                  <td className="p-4 text-sm text-gray-600 line-clamp-2 max-w-xs">{t.content}</td>
                  <td className="p-4">
                    <Badge className={t.featured ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                      {t.featured ? "Featured" : "No"}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge className={t.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                      {t.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </td>
                </tr>
              ))}
              {testimonials.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">No testimonials yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
