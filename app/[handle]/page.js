
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation"
import LinkCard from "@/components/LinkCard"
import Twitter from "next-auth/providers/twitter"
import { summary } from "framer-motion/client"


export async function generateMetadata({params}) {
  const {handle} = await params

  
  const client = await clientPromise
  const db = client.db("bittree")
  const collection = db.collection("links")
  const item = await collection.findOne({handle})

  if(!item){
    return {title: "User not Found | BitTree"}
  }

  return {
    title: `${item.handle} || BitTree`,
    description: item.desc || `check out @${item.handle}'s social links on BitTree`,
    openGraph: {
      title: `${item.handle} on BitTree`,
      description: item.desc,
      images: [
        {
          url: item.pic || "/default-avtar.png",
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: "summary_largy_image",
      title: `@${item.handle} | BitTree`,
      description: item.desc,
      image: [item.pic || "/default-avtar.png"],
    },
  }
}



export default async function Page({ params }) {

  const { handle } = await params

  
  const client = await clientPromise
  const db = client.db("bittree")
  const collection = db.collection("links")
  const item = await collection.findOne({handle})

  if (!item) {
    return notFound()
  }

  
  return (

    <div className="w-full min-h-screen bg-purple-400 flex justify-center items-start py-10">
      


      <div className="photo flex flex-col items-center justify-center gap-4">

        {/* PROFILE */}
        <img
          src={item.pic}
          className="w-30 h-30 rounded-full border-3 border-white shadow-2xl object-cover"
          alt=""
        />

        <span className="font-bold text-xl tracking-tight">
          @{item.handle}
        </span>

        <span className="desc w-80 text-gray-700 text-center">
          {item.desc}
        </span>

        {/* LINKS */}
        <div className="links w-full">

          {item.links.map((link, index) => (
            <LinkCard
              key={index}
              link={link}
              index={index}
              handle={item.handle}
            />
          ))}

        </div>
      </div>
    </div>
  )
}

