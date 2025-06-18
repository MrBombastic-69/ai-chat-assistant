import { NextResponse } from "next/server"; // Import NextResponse from Next.js for handling responses
// import OpenAI from "openai"; // Import OpenAI library for interacting with the OpenAI API

// System prompt for the AI, providing guidelines on how to respond to users
const systemPrompt = "What is the meaning of life?"; // Use your own system prompt here

// POST function to handle incoming requests
export async function POST(request) {
  try {
    const { messages, model } = await request.json();
    
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model || "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI assistant who always responds in markdown format. Be concise and clear in your responses.",
          },
          ...messages,
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    
    return Response.json({
      content: data.choices[0].message.content,
    });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { error: "Failed to get response from AI" },
      { status: 500 }
    );
  }
}
