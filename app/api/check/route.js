import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


export async function GET(request){
    const {searchParams} = new URL(request.url);
    const handle = searchParams.get("handle");
    const session = await getServerSession(authOptions)

    if(!handle){
        return NextResponse.json({error: "Handle is required"}, {status: 400});
    }

    const client = await clientPromise;
    const db = client.db("bittree")
    const collection = db.collection("links");

    const doc = await collection.findOne({handle: handle.toLocaleLowerCase() });

    if(doc){
    const session = await getServerSession(authOptions);

    if(session && doc.email === session.user.email){
        // Yahan 'exists' ko true rakho, par isMine bhi true hai
        return NextResponse.json(
            { exists: true, isMine: true, message: "This is yours!" }, 
            { status: 200 } // Sahi jagah ye hai
        );
    }

    // Agar kisi aur ka hai (Already taken)
    return NextResponse.json(
        { exists: true, isMine: false, message: "Already taken!" }, 
        { status: 200 } // 400 mat do, warna frontend fetch crash ho jayega
    );
}

// Bilkul fresh handle
return NextResponse.json(
    { exists: false, isMine: false, message: "Available" }, 
    { status: 200 }
)
}