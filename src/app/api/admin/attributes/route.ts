import { NextResponse } from 'next/server';
import connectToDatabase from '@/db';
import { AttributeSet } from '@/db/models/AttributeSet';

export async function GET() {
  try {
    await connectToDatabase();
    const attributeSets = await AttributeSet.find().sort({ createdAt: -1 });
    return NextResponse.json(attributeSets);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const newAttributeSet = new AttributeSet(body);
    await newAttributeSet.save();
    return NextResponse.json(newAttributeSet, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
