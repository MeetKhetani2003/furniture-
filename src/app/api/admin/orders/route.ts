import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/db";
import { Order } from "@/db/models/Order";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "admin" && session.user.email !== process.env.ADMIN_EMAIL)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    // Populate user to get customer email if needed
    const orders = await Order.find({}).populate("user", "email name").sort({ createdAt: -1 }).lean();
    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
