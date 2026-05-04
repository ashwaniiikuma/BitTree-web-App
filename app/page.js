"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { resolve } from "styled-jsx/css";

export default function Home() {
  const router = useRouter()
    const [text, setText] = useState("")
    const [status, setStatus] = useState("")

    useEffect(()=>{
      const delayDebounceFn = setTimeout(async () => {
        if(text.length > 2){
          setStatus("Checking...")
          await new Promise(resolve => setTimeout(resolve, 1000))
          const res = await fetch(`/api/check?handle=${text}`)
          const data = await res.json()

          if(data.exists){
            if(data.isMine){
            setStatus("Yours") //naya status : yours
            }else{
            setStatus("Taken")
          }
        }else{
          setStatus("Available")  // Bilkul naya handle
        }
      }
      }, 500)

             return () => clearTimeout(delayDebounceFn)
     },[text] )
   

  const createTree = () => {
    if(status === "Available" || status === "Yours"){
          router.push(`/generate?handle=${text}`)

    }else if(status === "Taken"){
      alert("Bhai ye handle pehele se booked hai!")
    }
  }

  return (
    <main>
<section className="bg-[#d2e823] min-h-[100vh] grid grid-cols-1 lg:grid-cols-2 px-4 md:px-10 lg:px-0 overflow-x-hidden">  

          <div className=" flex  justify-center lg:mt-40 flex-col  lg:ml-[5vw] gap-4 py-8 lg:py-0 order-2 lg:-order-1 text-center lg:text-left">
           
            <p className="text-[#254f1a] py-5 font-extrabold text-4xl md:text-6xl  lg:text-7xl leading-tight"> A link in bio built for you. </p>
              
              <p className="text-[rgb(37,79,26)]  text-base md:text-lg lg:text-xl lg:mr-[3vw] opacity-90" >Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
              
              <div className="input flex flex-col md:flex-row gap-3 mt-6 w-full  mx-w-[95%] md:mx-w-[500px] lg:max-w-[600px] mx-auto lg:mx-0">
                <div className="flex flex-col md:flex-row gap-3">

             
                <input value={text} onChange={(e)=>setText(e.target.value)} className="bg-white  focus:outline-[#d2e823] px-5 py-4  text-black font-semibold text-lg  rounded-lg flex-[1.5] h-[60px]  min-w-0" type="text" placeholder="Enter your-url" />
                
                <button onClick={()=> createTree()} className="bg-[#254f1a] border border-black px-8 py-4 text-white text-lg font-semibold cursor-pointer rounded-full hover:bg-[#1a3a12] flex-1 h-[60px] transition-all active:scale-95 whitespace-nowrap w-full md:w-auto">Get started for free</button>
              </div>

          
             </div>

             <div className="mt-2  min-h-[32px] w-full transition-all duration-300  ">
      {status === "Checking..." && (
        <div className="flex items-center gap-2 text-[#254f1a] bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-sm border border-[#254f1a]/10">
          <span className="animate-spin h-3 w-3 border-2 border-[#254f1a] border-t-transparent rounded-full"></span>
          <span className="text-sm font-medium">Checking availability...</span>
        </div>
  )}

  {status === "Taken" && (
    <div className="flex items-center gap-2 text-red-700 bg-red-100/80 w-fit px-4 py-1.5 rounded-lg border border-red-200 shadow-sm">
      <span className="text-lg">⚠️</span>
      <span className="text-sm font-bold">
        Oops! <span className="underline italic">/{text}</span> is already claimed.
      </span>
    </div>
  )}

  {status === "Available" && (
    <div className="flex items-center gap-2 text-[#254f1a] bg-[#ffffff] w-fit px-4 py-1.5 rounded-lg border-2 border-[#254f1a] shadow-[4px_4px_0px_0px_rgba(37,79,26,1)]">
      <span className="text-lg">✨</span>
      <span className="text-sm font-bold uppercase tracking-tight">
        Claim it now! <span className="text-black/70 ml-1">bittree.com/{text}</span>
      </span>
    </div>
  )}

   {status === "Yours" && (
    <div className="text-blue-700 text-sm font-bold bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
          Welcome back! This is your handle.
      <span className="block text-[10px] opacity-70 font-normal">
    Click to manage or update your tree.
      </span>
    </div>
  )}
</div>
          </div>

        
        <div className=" flex items-center justify-center  flex-col order-1 lg:order-2 mt-12 lg:mt-0 lg:mr-[1vw]">
          <img className="rounded-3xl h-[350px] lg:h-[650px] w-auto object-contain shadow-2xl lg:shadow-none " src="/download.png" alt="download image" />
        </div>
        
      </section>
       {/* <section className="bg-red-700 min-h-[100vh] ">
        ASHWANI
      </section> */}
    </main>
  );
}
