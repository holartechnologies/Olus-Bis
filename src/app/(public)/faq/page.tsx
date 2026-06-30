import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function FAQPage() {
  const faqs = await prisma.fAQ.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <section className="bg-gradient-brand text-white py-20">
        <div className="container mx-auto px-[8%] text-center">
          <Badge className="mb-4 bg-[#F5B300]/20 text-[#F5B300] border-[#F5B300]/30">FAQ</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Find answers to common questions about US immigration services and processes.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-[8%] max-w-3xl">
          {faqs.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p>No FAQs available yet. Check back soon.</p>
            </div>
          ) : (
            <Accordion className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-[#0B3AA8]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          <div className="mt-12 p-6 bg-gray-50 rounded-xl text-center">
            <h3 className="font-semibold text-lg mb-2">Still Have Questions?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Can&apos;t find what you&apos;re looking for? Contact us for personalized assistance.
            </p>
            <div className="flex justify-center gap-4">
              <a href="/contact" className="text-[#0B3AA8] font-medium hover:underline">Contact Us</a>
              <span className="text-gray-300">|</span>
              <a href={`https://wa.me/1234567890`} target="_blank" rel="noopener noreferrer" className="text-[#0B3AA8] font-medium hover:underline">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
