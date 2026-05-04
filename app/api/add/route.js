import clientPromise from "@/lib/mongodb"

export async function POST(request) {
    const body = await request.json()
    
    const client = await clientPromise;
    const db = client.db("bittree")
    const collection = db.collection("links")
    //If the handle is already claimed, you cannot create the bittree
    const doc = await collection.findOne({handle: body.handle})
    if (doc){

        if(doc.email === body.email || !doc.email){

            await collection.updateOne(
                {handle: body.handle},
                {
                    $set: {
                        links: body.links.map(l => ({
                            ...l,
                            clicks: l.clicks || 0
                        })),
                        pic:body.pic,
                        desc: body.desc,
                        email: body.email
                    }
                }
            )
            return Response.json({
                success: true,
                error: false,
                message: 'Bittree Updated Succesfully!',
                result: null
            })
        }else{
             return Response.json({success: false, error: true, message: 'This Bittree already Exists!', result: null,})

        }

            }

    const result = await collection.insertOne({
        ...body,
        links: body.links.map(l=>({
            ...l,
            clicks: 0
        }))
    
})


    return Response.json({success: true, error: false, message: 'Your Bittree has been generated!', result: result,})

}