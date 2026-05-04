import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server";

export async function POST(req) {

  const body = await req.json()
  const { handle, index } = body

  
  if (!handle && handle !== 0) {
    return Response.json({ success: false, message: "Handle missing" })
  }
  

  const client = await clientPromise
  const db = client.db("bittree")
  const collection = db.collection("links")

  // ✅ STEP 3: update
 const result =  await collection.updateOne(
    { handle: handle },
    { $inc: { [`links.${index}.clicks`]: 1 },
    $set: {[`links.${index}.lastClickedAt`]: new Date() } 
  }
  );

  if(result.matchedCount === 0) {
    return NextResponse.json({success: false, message: "Handle not found"}, {status: 404})
  }

  return Response.json({ success: true })



}