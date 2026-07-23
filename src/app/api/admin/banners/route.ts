import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/db";
import { Banner } from "@/db/models/Banner";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "admin" && session.user.email !== process.env.ADMIN_EMAIL)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const banners = await Banner.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ banners });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "admin" && session.user.email !== process.env.ADMIN_EMAIL)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await connectToDatabase();
    
    const newBanner = await Banner.create(body);
    return NextResponse.json({ banner: newBanner });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
