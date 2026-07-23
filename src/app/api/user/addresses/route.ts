import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/db";
import { User } from "@/db/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    const user = await User.findById(session.user.id);
    return NextResponse.json({ addresses: user.addresses || [] });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    await connectToDatabase();
    const user = await User.findById(session.user.id);
    
    // If it's the first address, or isDefault is true, handle defaults
    if (body.isDefault || user.addresses.length === 0) {
      user.addresses.forEach((addr: any) => (addr.isDefault = false));
      body.isDefault = true;
    }

    user.addresses.push(body);
    await user.save();
    return NextResponse.json({ addresses: user.addresses });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
