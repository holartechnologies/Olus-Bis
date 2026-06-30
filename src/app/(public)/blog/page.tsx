import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { Calendar, ArrowRight, FileText } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    include: { category: true },
    orderBy: { publishedAt: "desc" },
    take: 20,
  });

  return (
    <>
      <section className="bg-gradient-brand text-white py-20">
        <div className="container mx-auto px-[8%] text-center">
          <Badge className="mb-4 bg-[#F5B300]/20 text-[#F5B300] border-[#F5B300]/30">
            Resource Center
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Immigration Resource Center</h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Stay informed with the latest immigration news, guides, and updates from OLUS-BIS.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-[8%]">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Posts Yet</h2>
              <p className="text-gray-500 mb-6">Check back soon for immigration guides and updates.</p>
              <Button asChild className="bg-[#F5B300] text-[#1a1a2e] hover:bg-[#e8a800]">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="group h-full hover:shadow-md transition-all hover:-translate-y-1">
                    <CardContent className="p-6">
                      {post.category && (
                        <Badge className="mb-3 bg-[#0B3AA8]/10 text-[#0B3AA8] border-[#0B3AA8]/20">
                          {post.category.name}
                        </Badge>
                      )}
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-[#0B3AA8] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      )}
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "Draft"}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
