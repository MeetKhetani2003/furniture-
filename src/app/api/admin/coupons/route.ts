import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/db";
import { Coupon } from "@/db/models/Coupon";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "admin" && session.user.email !== process.env.ADMIN_EMAIL)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const coupons = await Coupon.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ coupons });
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
    
    const newCoupon = await Coupon.create(body);
    return NextResponse.json({ coupon: newCoupon });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
