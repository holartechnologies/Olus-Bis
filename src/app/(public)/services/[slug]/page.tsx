import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SERVICES } from "@/lib/constants";
import { Calendar, FileText, CheckCircle, ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedServices = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="bg-gradient-brand text-white py-20">
        <div className="container mx-auto px-4">
          <Badge className="mb-4 bg-[#F5B300]/20 text-[#F5B300] border-[#F5B300]/30">
            Immigration Service
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
          <p className="text-lg text-blue-200 max-w-2xl">{service.description}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[#0B3AA8] mb-6">
                About {service.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                At OLUS-BIS Immigration Services, we provide comprehensive legal assistance for {service.title.toLowerCase()}. Our experienced team understands the complexities of US immigration law and is committed to guiding you through every step of the process.
              </p>

              <h3 className="text-xl font-semibold text-[#0B3AA8] mb-4">What We Offer</h3>
              <div className="space-y-3 mb-8">
                {[
                  "Personalized case evaluation and strategy",
                  "Complete application preparation and review",
                  "Document gathering and organization",
                  "Regular case status updates",
                  "Representation before USCIS",
                  "Expert guidance and support throughout",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#0B3AA8] shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-semibold text-[#0B3AA8] mb-4">Common Requirements</h3>
              <p className="text-gray-600 mb-6">
                Requirements vary based on individual circumstances. During your consultation, we will provide a detailed list of required documents and guide you through the preparation process.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-lg mb-2">Disclaimer</h3>
                <p className="text-sm text-gray-600">
                  The information provided on this page is for general informational purposes only and does not constitute legal advice. Every immigration case is unique, and outcomes depend on individual circumstances. Contact us for a personalized consultation.
                </p>
              </div>
            </div>

            <div>
              <div className="sticky top-24 space-y-6">
                <Card className="border-[#0B3AA8]/20">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-semibold text-lg">Ready to Get Started?</h3>
                    <p className="text-sm text-gray-600">
                      Take the first step toward your immigration goal today.
                    </p>
                    <Button asChild className="w-full bg-[#F5B300] text-[#1a1a2e] hover:bg-[#e8a800] font-semibold">
                      <Link href="/contact">
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Consultation
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full border-[#0B3AA8] text-[#0B3AA8]">
                      <Link href="/assessment">
                        <FileText className="mr-2 h-4 w-4" />
                        Free Assessment
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Related Services</h3>
                    <div className="space-y-3">
                      {relatedServices.map((rs) => (
                        <Link
                          key={rs.slug}
                          href={`/services/${rs.slug}`}
                          className="block text-sm text-gray-600 hover:text-[#0B3AA8] hover:underline"
                        >
                          {rs.title}
                        </Link>
                      ))}
                    </div>
                    <Button asChild variant="link" className="mt-4 text-[#0B3AA8] p-0">
                      <Link href="/services">
                        View All Services <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
