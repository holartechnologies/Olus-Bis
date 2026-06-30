import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BRAND } from "@/lib/constants";
import { CheckCircle, Target, Eye, Heart, Shield, Zap, Users, Globe } from "lucide-react";

const values = [
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Trust",
    desc: "We build lasting relationships through honesty, integrity, and reliable legal guidance.",
  },
  {
    icon: <Eye className="h-8 w-8" />,
    title: "Transparency",
    desc: "Clear communication and no hidden fees. You'll always know where your case stands.",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Expertise",
    desc: "Deep knowledge of US immigration law combined with years of practical experience.",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Speed",
    desc: "Efficient case processing without compromising on quality or attention to detail.",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Accessibility",
    desc: "We make immigration services accessible to everyone, regardless of background.",
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Compassion",
    desc: "We understand the emotional journey of immigration and treat every client with care.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-brand text-white py-20">
        <div className="container mx-auto px-[8%] text-center">
          <Badge className="mb-4 bg-[#F5B300]/20 text-[#F5B300] border-[#F5B300]/30">About Us</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Dedicated to making the American dream accessible to everyone through expert immigration guidance.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-[8%]">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0B3AA8] mb-4">Barrister Oluseyi Bisiriyu</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {BRAND.founder} is the founder and lead immigration attorney at {BRAND.name}. With a passion for immigration law and a commitment to excellence, Barrister Bisiriyu has dedicated his career to helping individuals and families navigate the complex United States immigration system.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                His journey into immigration law began with a deep understanding of the challenges immigrants face. This personal insight, combined with rigorous legal training and years of practice, has made him a trusted advocate for clients from around the world.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Barrister Bisiriyu believes that everyone deserves a chance to pursue their American dream, and he works tirelessly to make that vision a reality for his clients.
              </p>
            </div>
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#0B3AA8] to-[#082A78] flex items-center justify-center">
              <div className="text-center text-white p-8">
                <div className="text-6xl mb-4">&#x2696;&#xFE0F;</div>
                <p className="text-xl font-semibold">{BRAND.founder}</p>
                <p className="text-blue-200">Founder & Lead Immigration Attorney</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-[8%]">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <Card className="border-0 shadow-md">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-8 w-8 text-[#0B3AA8]" />
                  <h3 className="text-2xl font-bold text-[#0B3AA8]">Our Mission</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To provide exceptional, accessible, and compassionate immigration legal services that empower individuals, families, and businesses to achieve their immigration goals in the United States.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="h-8 w-8 text-[#0B3AA8]" />
                  <h3 className="text-2xl font-bold text-[#0B3AA8]">Our Vision</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To be the most trusted and innovative immigration law firm in the United States, known for our commitment to client success, legal excellence, and positive impact on the communities we serve.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B3AA8] mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at {BRAND.name}.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="group hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="mb-4 text-[#0B3AA8] group-hover:scale-110 transition-transform">{value.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-brand text-white">
        <div className="container mx-auto px-[8%] text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose OLUS-BIS?</h2>
          <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
            We combine legal expertise with personalized service to deliver the best outcomes for our clients.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              "Personalized attention for every case",
              "Experienced legal team",
              "Proven track record of success",
              "Transparent communication",
              "Comprehensive case management",
              "Technology-driven service delivery",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-left">
                <CheckCircle className="h-5 w-5 text-[#F5B300] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button asChild size="lg" className="bg-[#F5B300] text-[#1a1a2e] hover:bg-[#e8a800] font-semibold">
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
