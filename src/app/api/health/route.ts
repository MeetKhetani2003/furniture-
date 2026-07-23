import connectToDatabase from "@/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    
    // Check if the connection state is 1 (connected)
    const isDbConnected = conn.connection.readyState === 1;

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      database: isDbConnected ? "connected" : "disconnected",
    });
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        database: "disconnected",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 }
    );
  }
}
