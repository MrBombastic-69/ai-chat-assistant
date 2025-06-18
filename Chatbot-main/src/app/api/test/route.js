export async function GET() {
  return Response.json({ message: "API routes are working!", timestamp: new Date().toISOString() });
}

export async function POST(request) {
  const body = await request.json();
  return Response.json({ 
    message: "POST request received", 
    data: body,
    timestamp: new Date().toISOString() 
  });
} 