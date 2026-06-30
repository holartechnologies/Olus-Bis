import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SERVICES } from "@/lib/constants";
import {
  ArrowRight,
  Users,
  Heart,
  GraduationCap,
  Briefcase,
  TrendingUp,
  FileCheck,
  Award,
  Shield,
  Scale,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="h-8 w-8" />,
  Heart: <Heart className="h-8 w-8" />,
  GraduationCap: <GraduationCap className="h-8 w-8" />,
  Briefcase: <Briefcase className="h-8 w-8" />,
  TrendingUp: <TrendingUp className="h-8 w-8" />,
  FileCheck: <FileCheck className="h-8 w-8" />,
  Award: <Award className="h-8 w-8" />,
  Shield: <Shield className="h-8 w-8" />,
  Scale: <Scale className="h-8 w-8" />,
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-gradient-brand text-white py-20">
        <div className="container mx-auto px-[8%] text-center">
          <Badge className="mb-4 bg-[#F5B300]/20 text-[#F5B300] border-[#F5B300]/30">Our Services</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Immigration Services</h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Comprehensive immigration solutions tailored to your unique needs. We handle every visa category with expertise and care.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-[8%]">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`}>
                <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:border-[#0B3AA8]/30 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#0B3AA8]/10 text-[#0B3AA8] group-hover:bg-[#0B3AA8] group-hover:text-white transition-colors">
                      {iconMap[service.icon] || <FileCheck className="h-8 w-8" />}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-[#0B3AA8] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                    <div className="mt-4 flex items-center text-sm font-medium text-[#0B3AA8] group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-[8%] text-center">
          <h2 className="text-3xl font-bold text-[#0B3AA8] mb-4">Not Sure Which Service You Need?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Take our free immigration assessment to find out which visa pathway is right for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-[#F5B300] text-[#1a1a2e] hover:bg-[#e8a800] font-semibold">
              <Link href="/assessment">Take Free Assessment</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-[#0B3AA8] text-[#0B3AA8]">
              <Link href="/contact">Book Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
