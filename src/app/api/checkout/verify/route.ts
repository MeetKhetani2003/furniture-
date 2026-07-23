import { NextResponse } from "next/server";
import crypto from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/db";
import { Order } from "@/db/models/Order"; // Need to create Order model

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, items, address } = body;

    const secret = process.env.RAZORPAY_SECRET!;
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest("hex");

    if (digest !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    await connectToDatabase();
    // Assuming Order model exists, if not we will create it
    const newOrder = new Order({
      user: session.user.id,
      products: items.map((item: any) => ({
        product: item.productId,
        quantity: item.quantity,
        price: item.price
      })),
      shippingAddress: address,
      paymentMethod: "Razorpay",
      paymentStatus: "Completed",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      totalAmount: amount,
      status: "Processing"
    });
    
    await newOrder.save();

    return NextResponse.json({ success: true, orderId: newOrder._id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not verify payment" }, { status: 500 });
  }
}
