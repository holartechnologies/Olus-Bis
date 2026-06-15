import { PrismaClient, Role } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const adminPassword = await hash("Admin@123456", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@olus-bis.com" },
    update: {},
    create: {
      firstName: "Oluseyi",
      lastName: "Bisiriyu",
      email: "admin@olus-bis.com",
      password: adminPassword,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
    },
  });

  console.log(`Admin user created: ${admin.email}`);

  const faqs = [
    {
      question: "What is the first step in the US immigration process?",
      answer: "The first step is determining your eligibility and the appropriate visa category for your situation. We recommend scheduling a consultation with our team to evaluate your specific circumstances and create a personalized immigration strategy.",
      order: 1,
    },
    {
      question: "How long does the US visa process typically take?",
      answer: "Processing times vary widely depending on the visa category, USCIS workload, and individual circumstances. Family-based visas can take 6-24 months, employment-based visas 6-12 months, and immediate relative petitions 6-18 months. Your attorney will provide a more accurate timeline based on your specific case.",
      order: 2,
    },
    {
      question: "What documents do I need for a visa application?",
      answer: "Required documents vary by visa type but typically include a valid passport, completed application forms, passport-sized photographs, proof of financial support, supporting documents for your visa category, and evidence of ties to your home country. Our team will provide a personalized document checklist.",
      order: 3,
    },
    {
      question: "Can I work in the US while my green card application is pending?",
      answer: "Yes, in many cases you can apply for work authorization while your green card application is pending. This typically requires filing Form I-765, Application for Employment Authorization, along with your adjustment of status application.",
      order: 4,
    },
    {
      question: "What is the difference between a Green Card and US Citizenship?",
      answer: "A Green Card grants lawful permanent residence, allowing you to live and work permanently in the US. US Citizenship grants additional rights including voting, obtaining a US passport, and protection from deportation. Green Card holders can apply for citizenship after meeting residency requirements.",
      order: 5,
    },
    {
      question: "How can OLUS-BIS help with my immigration case?",
      answer: "OLUS-BIS provides comprehensive immigration services including case evaluation, application preparation, document gathering, USCIS representation, and ongoing support throughout your immigration journey. Our team ensures your case is handled professionally and efficiently.",
      order: 6,
    },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq }).catch(() => {});
  }

  console.log(`FAQs seeded`);

  const testimonialData = [
    {
      clientName: "Maria G.",
      clientTitle: "Green Card Recipient",
      content: "OLUS-BIS made my green card process smooth and stress-free. Their team was professional, responsive, and truly cared about my case.",
      rating: 5,
      featured: true,
      status: "PUBLISHED",
    },
    {
      clientName: "James O.",
      clientTitle: "H-1B Visa Holder",
      content: "From initial consultation to visa approval, Barrister Bisiriyu provided exceptional guidance. His expertise in employment visas is unmatched.",
      rating: 5,
      featured: true,
      status: "PUBLISHED",
    },
    {
      clientName: "Amina S.",
      clientTitle: "Student Visa Success",
      content: "As an international student, the visa process was overwhelming. OLUS-BIS guided me every step of the way. Now I'm studying at my dream university!",
      rating: 5,
      featured: false,
      status: "PUBLISHED",
    },
  ];

  for (const t of testimonialData) {
    await prisma.testimonial.create({ data: t }).catch(() => {});
  }

  console.log(`Testimonials seeded`);

  const settings = [
    { key: "site_name", value: "OLUS-BIS Immigration Services", type: "string" },
    { key: "site_email", value: "info@olus-bis.com", type: "string" },
    { key: "site_phone", value: "+1 (234) 567-890", type: "string" },
    { key: "site_tagline", value: "Your Trusted Immigration Partner for America", type: "string" },
    { key: "whatsapp_number", value: "+1234567890", type: "string" },
    { key: "business_hours", value: "Mon-Fri: 9:00 AM - 6:00 PM", type: "string" },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: s,
      create: s,
    });
  }

  console.log(`Settings seeded`);
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
