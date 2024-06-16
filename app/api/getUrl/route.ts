import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { url } = body;

  req.headers.set('Access-Control-Allow-Origin', '*');
  req.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  req.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return NextResponse.json(
    { url: url },
    {
      headers: corsHeaders,
    }
  );
}
