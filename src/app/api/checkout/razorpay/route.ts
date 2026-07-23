import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { amount } = await req.json();

    const options = {
      amount: Math.round(amount * 100), // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    
    return NextResponse.json({ id: order.id, currency: order.currency, amount: order.amount });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not create Razorpay order" }, { status: 500 });
  }
}
