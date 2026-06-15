"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";

export function StickyConsultButton() {
  return (
    <Link
      href="/contact"
      className="fixed bottom-4 left-4 right-4 z-50 md:hidden flex items-center justify-center gap-2 rounded-full bg-[#0B3AA8] py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#082A78] transition-colors"
    >
      <Calendar className="h-4 w-4" />
      Book a Free Consultation
    </Link>
  );
}
