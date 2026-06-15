"use client";

import { useState, useEffect } from "react";
import { X, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem("exit-popup-shown")) {
        setShow(true);
        sessionStorage.setItem("exit-popup-shown", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
        <button
          onClick={() => setShow(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5B300]/20">
            <Calendar className="h-8 w-8 text-[#F5B300]" />
          </div>
          <h2 className="text-2xl font-bold text-[#0B3AA8] mb-2">
            Don&apos;t Leave Your Dream Behind!
          </h2>
          <p className="text-gray-600">
            Schedule a free consultation today and take the first step toward your American dream.
          </p>
        </div>

        <form className="space-y-3 mb-4">
          <Input placeholder="Your Name" required />
          <Input type="email" placeholder="Your Email" required />
          <Button asChild className="w-full bg-[#F5B300] text-[#1a1a2e] hover:bg-[#e8a800] font-semibold">
            <Link href="/contact">
              Book Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </form>

        <p className="text-xs text-gray-400 text-center">
          By submitting, you agree to our privacy policy.
        </p>
      </div>
    </div>
  );
}
