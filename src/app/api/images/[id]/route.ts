import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDatabase from "@/db";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    await connectToDatabase();
    
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return new NextResponse("Invalid Image ID", { status: 400 });
    }

    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db!, { 
      bucketName: 'uploads' 
    });
    
    const objId = new mongoose.Types.ObjectId(params.id);
    
    // Check if file exists first to avoid unhandled stream errors
    const files = await bucket.find({ _id: objId }).toArray();
    if (!files || files.length === 0) {
      return new NextResponse("Image not found", { status: 404 });
    }

    const file = files[0];
    const stream = bucket.openDownloadStream(objId);
    
    // Next.js Response supports Web Streams or Node streams wrapped in any (mostly Web ReadableStream)
    // We can convert Node stream to Web stream using standard Web API wrapper but `stream as any` works in Next App Router
    return new Response(stream as any, {
      headers: { 
        'Content-Type': file.metadata?.contentType || (file as any).contentType || 'image/jpeg', 
        'Cache-Control': 'public, max-age=31536000, immutable' 
      }
    });
  } catch (error) {
    console.error("Image fetch error:", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
