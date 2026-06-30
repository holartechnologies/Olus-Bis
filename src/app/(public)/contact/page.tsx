"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BRAND } from "@/lib/constants";
import { Phone, Mail, MessageCircle, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-gradient-brand text-white py-20">
        <div className="container mx-auto px-[8%] text-center">
          <Badge className="mb-4 bg-[#F5B300]/20 text-[#F5B300] border-[#F5B300]/30">Contact Us</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Ready to start your immigration journey? Contact us today for a consultation.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-[8%]">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-[#0B3AA8] mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required />
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-[#0B3AA8] hover:bg-[#082A78]">
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                  Send Message
                </Button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0B3AA8] mb-6">Contact Information</h2>
              <div className="space-y-4 mb-8">
                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0B3AA8]/10">
                      <Phone className="h-6 w-6 text-[#0B3AA8]" />
                    </div>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <a href={`tel:${BRAND.phone}`} className="text-sm text-[#0B3AA8] hover:underline">{BRAND.phone}</a>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0B3AA8]/10">
                      <Mail className="h-6 w-6 text-[#0B3AA8]" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <a href={`mailto:${BRAND.email}`} className="text-sm text-[#0B3AA8] hover:underline">{BRAND.email}</a>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0B3AA8]/10">
                      <MessageCircle className="h-6 w-6 text-[#0B3AA8]" />
                    </div>
                    <div>
                      <p className="font-semibold">WhatsApp</p>
                      <a href={`https://wa.me/${BRAND.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-sm text-[#0B3AA8] hover:underline">Chat with us on WhatsApp</a>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0B3AA8]/10">
                      <MapPin className="h-6 w-6 text-[#0B3AA8]" />
                    </div>
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-sm text-gray-600">United States</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0B3AA8]/10">
                      <Clock className="h-6 w-6 text-[#0B3AA8]" />
                    </div>
                    <div>
                      <p className="font-semibold">Business Hours</p>
                      <p className="text-sm text-gray-600">Mon-Fri: 9:00 AM - 6:00 PM</p>
                      <p className="text-sm text-gray-600">Sat: 10:00 AM - 2:00 PM</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-2">Book a Consultation</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Schedule a one-on-one consultation with our immigration team to discuss your case.
                </p>
                <Button asChild className="w-full bg-[#F5B300] text-[#1a1a2e] hover:bg-[#e8a800] font-semibold">
                  <a href={`https://wa.me/${BRAND.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Book via WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
