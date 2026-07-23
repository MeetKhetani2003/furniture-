import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/db";
import { Product } from "@/db/models/Product";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "admin" && session.user.email !== process.env.ADMIN_EMAIL)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await connectToDatabase();
    
    if (id) {
      const product = await Product.findById(id).lean();
      return NextResponse.json({ product });
    }

    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "admin" && session.user.email !== process.env.ADMIN_EMAIL)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) return NextResponse.json({ error: "Product ID is required" }, { status: 400 });

    const body = await req.json();
    await connectToDatabase();

    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ product: updatedProduct });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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
    
    // Generate SKU if not provided
    if (!body.sku) {
      const count = await Product.countDocuments();
      body.sku = `SKU-${(count + 1).toString().padStart(5, '0')}`;
    }

    const newProduct = await Product.create(body);
    return NextResponse.json({ product: newProduct });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "admin" && session.user.email !== process.env.ADMIN_EMAIL)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    await connectToDatabase();
    await Product.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
