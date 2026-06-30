"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Loader2, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Result {
  recommendedPathway: string;
  nextSteps: string;
}

const immigrationGoals = [
  "Family Reunification",
  "Work/Employment",
  "Education/Study",
  "Business/Investment",
  "Citizenship/Naturalization",
  "Asylum/Protection",
  "Green Card (Permanent Residence)",
  "Other",
];

const educationLevels = [
  "High School",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate/PhD",
  "Professional Degree",
  "Trade/Vocational",
  "Other",
];

const employmentStatuses = [
  "Employed Full-Time",
  "Employed Part-Time",
  "Self-Employed",
  "Unemployed",
  "Student",
  "Retired",
  "Business Owner",
];

export default function AssessmentPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    currentLocation: "",
    immigrationGoal: "",
    educationLevel: "",
    employmentStatus: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data);
        toast.success("Assessment complete! Check your recommended pathway below.");
      } else {
        toast.error(data.error || "Failed to process assessment.");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <>
        <section className="bg-gradient-brand text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4 bg-[#F5B300]/20 text-[#F5B300] border-[#F5B300]/30">
              Your Results
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Immigration Assessment</h1>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card className="border-[#0B3AA8]/20">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-[#0B3AA8] mb-4">
                  Recommended Visa Pathway
                </h2>
                <p className="text-xl font-semibold text-[#F5B300] mb-6">
                  {result.recommendedPathway}
                </p>
                <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                  <h3 className="font-semibold mb-3">Suggested Next Steps:</h3>
                  <p className="text-gray-600 leading-relaxed">{result.nextSteps}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild className="bg-[#F5B300] text-[#1a1a2e] hover:bg-[#e8a800] font-semibold">
                    <Link href="/contact">
                      Book a Consultation <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-[#0B3AA8] text-[#0B3AA8]">
                    <Link href="/services">Explore Services</Link>
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-6">
                  This assessment is for informational purposes only and does not constitute legal advice.
                  Schedule a consultation with our attorneys for personalized guidance.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="bg-gradient-brand text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-[#F5B300]/20 text-[#F5B300] border-[#F5B300]/30">
            Free Assessment
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Free Immigration Assessment</h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Find out which visa pathway is right for you. Answer a few questions and get personalized recommendations.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="border-[#0B3AA8]/20">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country of Origin *</Label>
                    <Input id="country" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentLocation">Current Location *</Label>
                    <Input id="currentLocation" value={formData.currentLocation} onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Immigration Goal *</Label>
                  <Select value={formData.immigrationGoal} onValueChange={(v) => setFormData({ ...formData, immigrationGoal: v || "" })} required>
                    <SelectTrigger><SelectValue placeholder="Select your goal" /></SelectTrigger>
                    <SelectContent>
                      {immigrationGoals.map((goal) => (
                        <SelectItem key={goal} value={goal}>{goal}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Education Level *</Label>
                  <Select value={formData.educationLevel} onValueChange={(v) => setFormData({ ...formData, educationLevel: v || "" })} required>
                    <SelectTrigger><SelectValue placeholder="Select education level" /></SelectTrigger>
                    <SelectContent>
                      {educationLevels.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Employment Status *</Label>
                  <Select value={formData.employmentStatus} onValueChange={(v) => setFormData({ ...formData, employmentStatus: v || "" })} required>
                    <SelectTrigger><SelectValue placeholder="Select employment status" /></SelectTrigger>
                    <SelectContent>
                      {employmentStatuses.map((status) => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-[#F5B300] text-[#1a1a2e] hover:bg-[#e8a800] font-semibold text-base py-6">
                  {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <FileText className="mr-2 h-5 w-5" />}
                  {loading ? "Processing..." : "Get My Assessment"}
                </Button>
              </form>
              <p className="text-xs text-gray-400 mt-4 text-center">
                This assessment is for informational purposes only and does not constitute legal advice.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
