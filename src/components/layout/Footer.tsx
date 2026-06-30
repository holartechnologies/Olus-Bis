import Link from "next/link";
import { BRAND, SERVICES, NAV_LINKS } from "@/lib/constants";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-[#082A78] text-white" style={{ paddingLeft: "8%", paddingRight: "8%" }}>
      <div className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="mb-4">
              <h3 className="text-xl font-bold">OLUS-BIS</h3>
              <p className="text-[#F5B300] text-xs tracking-wider uppercase">Immigration Services</p>
            </div>
            <p className="text-sm text-blue-200 leading-relaxed mb-4">
              {BRAND.tagline}. We provide expert immigration guidance for individuals, families, students, workers, investors, and businesses.
            </p>
            <div className="space-y-2 text-sm text-blue-200">
              <a href={`tel:${BRAND.phone}`} className="flex items-center gap-2 hover:text-[#F5B300]">
                <Phone className="h-4 w-4" /> {BRAND.phone}
              </a>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2 hover:text-[#F5B300]">
                <Mail className="h-4 w-4" /> {BRAND.email}
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> United States
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Our Services</h4>
            <ul className="space-y-3">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-blue-200 hover:text-[#F5B300] transition-colors flex items-center gap-1"
                  >
                    <ArrowRight className="h-3 w-3" /> {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-blue-200 hover:text-[#F5B300] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/assessment"
                  className="text-sm text-blue-200 hover:text-[#F5B300] transition-colors"
                >
                  Free Assessment
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Business Hours</h4>
            <div className="space-y-2 text-sm text-blue-200">
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4" /> Mon - Fri: 9:00 AM - 6:00 PM
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4" /> Sat: 10:00 AM - 2:00 PM
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4" /> Sun: Closed
              </p>
            </div>
            <div className="mt-6">
              <Button asChild className="bg-[#F5B300] text-[#1a1a2e] hover:bg-[#e8a800] w-full font-semibold">
                <Link href="/contact">
                  Schedule Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-blue-800">
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-blue-300">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-blue-300">
            <Link href="/privacy-policy" className="hover:text-[#F5B300]">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-[#F5B300]">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-[#F5B300]">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
