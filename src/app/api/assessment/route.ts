import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateRecommendation(data: {
  immigrationGoal: string;
  educationLevel: string;
  employmentStatus: string;
}) {
  const goal = data.immigrationGoal.toLowerCase();

  if (goal.includes("family")) {
    return {
      pathway: "Family-Based Immigration",
      steps:
        "Based on your goals, a family-based visa pathway may be suitable for you. We recommend scheduling a consultation to discuss your specific family connections in the US and determine the best visa category for your situation. You'll typically need to provide evidence of the family relationship, financial support documents, and identification paperwork.",
    };
  }
  if (goal.includes("work") || goal.includes("employment")) {
    return {
      pathway: "Employment-Based Visa",
      steps:
        "Based on your profile, an employment-based visa pathway appears promising. Your education level and employment status suggest you may qualify for various work visa categories. We recommend consulting with our team to evaluate which specific visa (H-1B, L-1, O-1, EB-2, EB-3, etc.) best matches your qualifications and employment situation.",
    };
  }
  if (goal.includes("education") || goal.includes("study") || goal.includes("student")) {
    return {
      pathway: "Student Visa (F-1 / M-1 / J-1)",
      steps:
        "Based on your educational goals, a student visa pathway may be right for you. The process involves gaining admission to a SEVP-approved US school, obtaining your I-20 form, and applying for your visa. We recommend scheduling a consultation to discuss the specific requirements for F-1, M-1, or J-1 visas based on your educational plans.",
    };
  }
  if (goal.includes("business") || goal.includes("investor") || goal.includes("investment")) {
    return {
      pathway: "Investor / Business Visa",
      steps:
        "Based on your business goals, an investor or business visa pathway may be suitable. Options may include the EB-5 Immigrant Investor Program, E-2 Treaty Investor Visa, or L-1 Intracompany Transferee Visa. Schedule a consultation to discuss your investment capacity and business plans in detail.",
    };
  }
  if (goal.includes("citizen") || goal.includes("naturalization")) {
    return {
      pathway: "Citizenship & Naturalization",
      steps:
        "Based on your goal of becoming a US citizen, the naturalization process is the right path. Eligibility requires meeting residency requirements, demonstrating good moral character, passing English and civics tests, and more. We recommend scheduling a consultation to evaluate your eligibility and begin the application process.",
    };
  }
  if (goal.includes("asylum") || goal.includes("protection")) {
    return {
      pathway: "Asylum / Refugee Protection",
      steps:
        "Based on your situation, seeking asylum or humanitarian protection may be appropriate. This process involves demonstrating a well-founded fear of persecution. We strongly recommend scheduling an immediate consultation with our team to discuss your case confidentially and determine the best course of action.",
    };
  }
  if (goal.includes("green card") || goal.includes("permanent")) {
    return {
      pathway: "Green Card (Lawful Permanent Residence)",
      steps:
        "Based on your goal of obtaining a green card, there are several pathways available including family-sponsored, employment-based, or humanitarian categories. Schedule a consultation with our team to determine which green card category best fits your profile and begin the application process.",
    };
  }

  return {
    pathway: "Comprehensive Immigration Evaluation",
    steps:
      "Based on your profile, we recommend a comprehensive evaluation to determine the best immigration pathway for you. Schedule a consultation with Barrister Oluseyi Bisiriyu to discuss your specific situation, explore all available options, and create a personalized immigration strategy.",
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, country, currentLocation, immigrationGoal, educationLevel, employmentStatus } = body;

    if (!firstName || !lastName || !email || !country || !currentLocation || !immigrationGoal || !educationLevel || !employmentStatus) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const recommendation = generateRecommendation({
      immigrationGoal,
      educationLevel,
      employmentStatus,
    });

    await prisma.assessment.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        country,
        currentLocation,
        immigrationGoal,
        educationLevel,
        employmentStatus,
        recommendedPathway: recommendation.pathway,
        nextSteps: recommendation.steps,
      },
    });

    return NextResponse.json({
      recommendedPathway: recommendation.pathway,
      nextSteps: recommendation.steps,
    });
  } catch (error) {
    console.error("Assessment API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
