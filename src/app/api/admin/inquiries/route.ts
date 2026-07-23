import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/db";
import { Inquiry } from "@/db/models/Inquiry";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "admin" && session.user.email !== process.env.ADMIN_EMAIL)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ inquiries });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
