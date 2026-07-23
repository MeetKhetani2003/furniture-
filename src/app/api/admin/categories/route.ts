import { NextResponse } from 'next/server';
import connectToDatabase from '@/db';
import { Category } from '@/db/models/Category';

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find().populate('attributeSet').sort({ name: 1 });
    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const newCategory = new Category(body);
    await newCategory.save();
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
