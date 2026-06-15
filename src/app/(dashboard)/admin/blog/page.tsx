import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    include: { category: true, author: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <p className="text-sm text-gray-500">Manage blog content and resources</p>
        </div>
        <Button asChild className="bg-[#0B3AA8]">
          <Link href="/admin/blog/new">New Post</Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-4 text-sm font-medium text-gray-500">Title</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Category</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Author</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Published</th>
                <th className="text-right p-4 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <span className="font-medium line-clamp-1">{post.title}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{post.category?.name || "-"}</td>
                  <td className="p-4 text-sm text-gray-600">
                    {post.author ? `${post.author.firstName} ${post.author.lastName}` : "-"}
                  </td>
                  <td className="p-4">
                    <Badge className={
                      post.status === "PUBLISHED" ? "bg-green-100 text-green-700" :
                      post.status === "DRAFT" ? "bg-gray-100 text-gray-700" : "bg-yellow-100 text-yellow-700"
                    }>
                      {post.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "-"}
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">No blog posts yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
