import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Maria G.",
    title: "Green Card Recipient",
    location: "Nigeria to United States",
    content:
      "OLUS-BIS made my green card process smooth and stress-free. Their team was professional, responsive, and truly cared about my case. I couldn't have done it without them. From our first consultation to the final approval, every step was handled with expertise and care.",
    rating: 5,
  },
  {
    name: "James O.",
    title: "H-1B Visa Holder",
    location: "United Kingdom to United States",
    content:
      "From the initial consultation to visa approval, Barrister Bisiriyu provided exceptional guidance. His expertise in employment visas is unmatched. The entire process was transparent and well-communicated. Highly recommended!",
    rating: 5,
  },
  {
    name: "Amina S.",
    title: "F-1 Student Visa",
    location: "Kenya to United States",
    content:
      "As an international student, the visa process was overwhelming. OLUS-BIS guided me every step of the way. Now I'm studying at my dream university in the US! Their attention to detail and supportive approach made all the difference.",
    rating: 5,
  },
  {
    name: "Carlos M.",
    title: "Marriage Green Card",
    location: "Mexico to United States",
    content:
      "The team at OLUS-BIS handled our marriage-based green card application with professionalism and care. They made a complex process feel manageable. We are now happily living together in the United States thanks to their hard work.",
    rating: 5,
  },
  {
    name: "Priya K.",
    title: "O-1 Visa Recipient",
    location: "India to United States",
    content:
      "My O-1 visa case was complex, but Barrister Bisiriyu built a compelling case that highlighted my achievements. His strategic approach and deep understanding of immigration law were instrumental in my approval.",
    rating: 5,
  },
  {
    name: "Ahmed H.",
    title: "Asylum Granted",
    location: "Somalia to United States",
    content:
      "I am forever grateful to OLUS-BIS for their compassionate and skilled representation during my asylum case. They handled my case with the sensitivity and professionalism it deserved. They gave me a new life.",
    rating: 5,
  },
];

export default function SuccessStoriesPage() {
  return (
    <>
      <section className="bg-gradient-brand text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-[#F5B300]/20 text-[#F5B300] border-[#F5B300]/30">
            Success Stories
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Client Success Stories</h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Real stories from real clients who trusted us with their immigration journey.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[#F5B300] text-[#F5B300]" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-[#0B3AA8]">{testimonial.name}</p>
                    <p className="text-sm text-[#F5B300]">{testimonial.title}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
