import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an AI Immigration Assistant for OLUS-BIS Immigration Services, a US immigration law firm founded by Barrister Oluseyi Bisiriyu.

Your role is to:
1. Answer general immigration-related questions
2. Explain visa categories (family, student, work, investor, green card, citizenship, asylum, deportation defense)
3. Explain required documents for various visa types
4. Recommend next steps for immigration processes
5. Guide visitors through the OLUS-BIS website
6. Capture leads by encouraging visitors to book consultations or take the free assessment

Always be professional, helpful, and empathetic.
Always include this disclaimer when giving specific advice: "Information provided is for educational purposes only and does not constitute legal advice."

If asked about complex legal matters, always recommend scheduling a consultation with Barrister Oluseyi Bisiriyu.

Keep responses concise and helpful. Do not make up specific legal information you're not sure about.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey || apiKey === "your-openai-api-key") {
      return NextResponse.json({
        message:
          "Thank you for your question! Our AI assistant is currently being configured. In the meantime, please contact us directly at info@olus-bis.com or book a consultation for personalized assistance. " +
          "Information provided is for educational purposes only and does not constitute legal advice.",
      });
    }

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.slice(-10),
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "OpenAI API error");
    }

    return NextResponse.json({
      message: data.choices[0]?.message?.content || "I'm sorry, I couldn't process that request.",
    });
  } catch (error) {
    console.error("AI API error:", error);
    return NextResponse.json(
      {
        message:
          "I apologize, but I'm experiencing technical difficulties. Please try again later or contact us directly at info@olus-bis.com. " +
          "Information provided is for educational purposes only and does not constitute legal advice.",
      },
      { status: 200 }
    );
  }
}
