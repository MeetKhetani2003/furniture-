import { NextResponse } from 'next/server';
import connectToDatabase from '@/db';
import { AttributeSet } from '@/db/models/AttributeSet';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const attributeSet = await AttributeSet.findById(id);
    if (!attributeSet) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(attributeSet);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await req.json();
    const attributeSet = await AttributeSet.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(attributeSet);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    await AttributeSet.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
