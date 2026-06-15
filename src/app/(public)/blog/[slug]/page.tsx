import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft, Clock } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { category: true, author: true },
  });

  if (!post || post.status !== "PUBLISHED") {
    notFound();
  }

  return (
    <>
      <section className="bg-gradient-brand text-white py-20">
        <div className="container mx-auto px-4">
          <Link href="/blog" className="inline-flex items-center text-sm text-blue-200 hover:text-white mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Resources
          </Link>
          <Badge className="mb-4 bg-[#F5B300]/20 text-[#F5B300] border-[#F5B300]/30">
            {post.category?.name || "General"}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-blue-200">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </span>
            {post.author && (
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                By {post.author.firstName} {post.author.lastName}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-lg max-w-none prose-headings:text-[#0B3AA8] prose-a:text-[#0B3AA8]">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-lg mb-2">Need Personalized Immigration Guidance?</h3>
            <p className="text-sm text-gray-600 mb-4">
              The information in this article is for educational purposes. Every immigration case is unique. Contact us for a consultation tailored to your specific situation.
            </p>
            <Button asChild className="bg-[#F5B300] text-[#1a1a2e] hover:bg-[#e8a800] font-semibold">
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
          </div>

          <div className="mt-8">
            <Link href="/blog" className="text-[#0B3AA8] hover:underline text-sm flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Resource Center
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
