import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/db";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "admin" && session.user.email !== process.env.ADMIN_EMAIL)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File exceeds 5MB limit" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // GridFSBucket is available on the native MongoDB Db object
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db!, { 
      bucketName: 'uploads' 
    });

    return new Promise((resolve) => {
      const uploadStream = bucket.openUploadStream(file.name, {
        contentType: file.type
      });
      
      uploadStream.end(buffer);
      
      uploadStream.on('finish', (storedFile) => {
        resolve(NextResponse.json({ url: `/api/images/${storedFile._id}` }));
      });
      
      uploadStream.on('error', (err) => {
        resolve(NextResponse.json({ error: err.message }, { status: 500 }));
      });
    });
  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: error.message || "Server Error" }, { status: 500 });
  }
}
