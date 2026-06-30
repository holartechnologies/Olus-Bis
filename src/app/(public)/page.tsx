import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SERVICES, BRAND } from "@/lib/constants";
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
  CheckCircle,
  Star,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  FileText,
  Calendar,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="h-6 w-6" />,
  Heart: <Heart className="h-6 w-6" />,
  GraduationCap: <GraduationCap className="h-6 w-6" />,
  Briefcase: <Briefcase className="h-6 w-6" />,
  TrendingUp: <TrendingUp className="h-6 w-6" />,
  FileCheck: <FileCheck className="h-6 w-6" />,
  Award: <Award className="h-6 w-6" />,
  Shield: <Shield className="h-6 w-6" />,
  Scale: <Scale className="h-6 w-6" />,
};

const testimonials = [
  {
    name: "Maria G.",
    title: "Green Card Recipient",
    content:
      "OLUS-BIS made my green card process smooth and stress-free. Their team was professional, responsive, and truly cared about my case. I couldn't have done it without them.",
    rating: 5,
  },
  {
    name: "James O.",
    title: "Work Visa Holder",
    content:
      "From the initial consultation to visa approval, Barrister Bisiriyu provided exceptional guidance. His expertise in employment visas is unmatched. Highly recommended!",
    rating: 5,
  },
  {
    name: "Amina S.",
    title: "Student Visa Success",
    content:
      "As an international student, the visa process was overwhelming. OLUS-BIS guided me every step of the way. Now I'm studying at my dream university in the US!",
    rating: 5,
  },
];

const stats = [
  { value: "500+", label: "Cases Handled" },
  { value: "95%", label: "Success Rate" },
  { value: "50+", label: "Visa Categories" },
  { value: "10+", label: "Years Experience" },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B3AA8] via-[#082A78] to-[#0B3AA8]">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-[#F5B300]/20 text-[#F5B300] border-[#F5B300]/30 hover:bg-[#F5B300]/20">
              Trusted Immigration Partner
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Making Your American Dream Possible Through{" "}
              <span className="text-[#F5B300]">Expert Immigration Guidance</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
              Professional immigration services for individuals, families, students, workers, investors, and businesses.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#F5B300] text-[#1a1a2e] hover:bg-[#e8a800] font-semibold text-base px-8 py-6"
              >
                <Link href="/contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book a Consultation
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 py-6"
              >
                <Link href="/assessment">
                  <FileText className="mr-2 h-5 w-5" />
                  Free Assessment
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#0B3AA8] mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50" style={{ paddingLeft: "8%", paddingRight: "8%" }}>
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B3AA8] mb-4">
              Our Immigration Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive immigration solutions tailored to your unique needs. We handle every visa category with expertise and care.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`}>
                <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:border-[#0B3AA8]/30 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0B3AA8]/10 text-[#0B3AA8] group-hover:bg-[#0B3AA8] group-hover:text-white transition-colors">
                      {iconMap[service.icon] || <FileCheck className="h-6 w-6" />}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-[#0B3AA8] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-3 bg-[#0B3AA8]/10 text-[#0B3AA8] border-[#0B3AA8]/20">
                Meet Your Attorney
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B3AA8] mb-4">
                Barrister Oluseyi Bisiriyu
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                With extensive experience in United States immigration law, Barrister Oluseyi Bisiriyu has helped hundreds of individuals, families, and businesses navigate the complex US immigration system.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our firm combines legal expertise with a compassionate approach, ensuring every client receives personalized attention and strategic guidance throughout their immigration journey.
              </p>
              <div className="space-y-3">
                {[
                  "Expert knowledge of US immigration law",
                  "Personalized case strategy",
                  "Dedicated client support team",
                  "Proven track record of success",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#0B3AA8] shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-8 bg-[#0B3AA8] hover:bg-[#082A78]">
                <Link href="/about">
                  Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-[#0B3AA8] to-[#082A78] flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="text-6xl mb-4">&#x2696;&#xFE0F;</div>
                  <p className="text-lg font-semibold">Barrister Oluseyi Bisiriyu</p>
                  <p className="text-sm text-blue-200">Founder & Lead Immigration Attorney</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B3AA8] mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real stories from real clients who trusted us with their immigration journey.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[#F5B300] text-[#F5B300]" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-[#0B3AA8]">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-[#0B3AA8] text-[#0B3AA8]">
              <Link href="/success-stories">
                View More Success Stories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-brand text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Immigration Journey?
          </h2>
          <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
            Take the first step toward your American dream. Schedule a consultation with our experienced immigration team today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-[#F5B300] text-[#1a1a2e] hover:bg-[#e8a800] font-semibold px-8">
              <Link href="/contact">
                <Calendar className="mr-2 h-5 w-5" />
                Book Consultation
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Link href="/assessment">
                <FileText className="mr-2 h-5 w-5" />
                Free Assessment
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Phone className="h-8 w-8 text-[#0B3AA8]" />
              </div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <a href={`tel:${BRAND.phone}`} className="text-sm text-[#0B3AA8] hover:underline">
                {BRAND.phone}
              </a>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Mail className="h-8 w-8 text-[#0B3AA8]" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <a href={`mailto:${BRAND.email}`} className="text-sm text-[#0B3AA8] hover:underline">
                {BRAND.email}
              </a>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <MessageCircle className="h-8 w-8 text-[#0B3AA8]" />
              </div>
              <h3 className="font-semibold mb-2">WhatsApp</h3>
              <a
                href={`https://wa.me/${BRAND.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#0B3AA8] hover:underline"
              >
                Chat with us
              </a>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Clock className="h-8 w-8 text-[#0B3AA8]" />
              </div>
              <h3 className="font-semibold mb-2">Hours</h3>
              <p className="text-sm text-gray-600">Mon-Fri: 9AM-6PM</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B3AA8] mb-4">
              Immigration Resources
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay informed with our latest immigration news, guides, and updates from USCIS.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "US Immigration Guide 2025",
                desc: "Comprehensive guide to US visa categories, requirements, and application processes.",
                icon: <FileText className="h-8 w-8" />,
              },
              {
                title: "USCIS Fee Updates",
                desc: "Latest information on USCIS filing fees, forms, and processing times.",
                icon: <Clock className="h-8 w-8" />,
              },
              {
                title: "Common Visa Questions",
                desc: "Answers to frequently asked questions about US immigration and visa applications.",
                icon: <Heart className="h-8 w-8" />,
              },
            ].map((resource) => (
              <Card key={resource.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4 text-[#0B3AA8]">{resource.icon}</div>
                  <h3 className="font-semibold mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-600">{resource.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-[#0B3AA8] text-[#0B3AA8]">
              <Link href="/blog">Visit Resource Center <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
