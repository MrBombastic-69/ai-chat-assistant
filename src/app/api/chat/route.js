import { NextResponse } from "next/server"; // Import NextResponse from Next.js for handling responses
// import OpenAI from "openai"; // Import OpenAI library for interacting with the OpenAI API

// System prompt for the AI, providing guidelines on how to respond to users
const systemPrompt = "What is the meaning of life?"; // Use your own system prompt here

// POST function to handle incoming requests
export async function POST(request) {
  console.log("API route called");
  
  try {
    const { messages, model } = await request.json();
    console.log("Received request:", { model, messageCount: messages.length });
    
    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY not found in environment variables");
      return Response.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }
    
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

    console.log("Groq API response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", errorText);
      throw new Error(`Groq API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Groq API response received");
    
    return Response.json({
      content: data.choices[0].message.content,
    });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { error: "Failed to get response from AI: " + error.message },
      { status: 500 }
    );
  }
}

// Add OPTIONS method for CORS preflight requests
export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
