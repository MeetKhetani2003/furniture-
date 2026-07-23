import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/db";
import { User } from "@/db/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "admin" && session.user.email !== process.env.ADMIN_EMAIL)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    // In our User model, we might not have a 'role' field, but let's fetch all users
    const users = await User.find({}).sort({ createdAt: -1 }).select("-password").lean();
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
