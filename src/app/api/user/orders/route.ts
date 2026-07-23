import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/db";
import { Order } from "@/db/models/Order";
import { Product } from "@/db/models/Product";
import mongoose from "mongoose";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    
    // Fetch orders for this user, sorted by newest first
    const orders = await Order.find({ user: session.user.id })
      .sort({ createdAt: -1 })
      .lean();

    // Map order products to include details from the Product model
    const mappedOrders = await Promise.all(orders.map(async (order) => {
      const itemsWithDetails = await Promise.all(order.products.map(async (item: any) => {
        let productData = await Product.findOne({ id: item.product }).lean();
        if (!productData && mongoose.Types.ObjectId.isValid(item.product)) {
          productData = await Product.findById(item.product).lean();
        }
        return {
          productId: item.product,
          title: productData?.name || "Unknown Product",
          image: productData?.images?.[0] || productData?.image || "",
          price: item.price,
          quantity: item.quantity,
          selectedSize: "Standard", // Furniture typically doesn't have sizes like costumes
        };
      }));

      // Adapt the schema fields to what the new profile UI expects
      return {
        _id: order._id,
        createdAt: order.createdAt,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        shippingStatus: order.status,
        trackingNumber: order.awbCode || "",
        trackingLink: order.awbCode ? `https://shiprocket.co/tracking/${order.awbCode}` : "",
        shippingDetails: {
          name: order.shippingAddress?.fullName,
          phone: order.shippingAddress?.phone,
          address: `${order.shippingAddress?.addressLine1}, ${order.shippingAddress?.city}, ${order.shippingAddress?.state} - ${order.shippingAddress?.postalCode}`
        },
        items: itemsWithDetails,
        subtotal: order.totalAmount,
        discount: 0,
        shippingFee: 0,
        total: order.totalAmount,
      };
    }));

    return NextResponse.json({ success: true, orders: mappedOrders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
