"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Generate = () => {
  const {data: session} = useSession();
  const searchParams = useSearchParams();
  // const [link, setlink] = useState("");
  //  const [linktext, setlinktext] = useState("");
  const [links, setLinks] = useState([{link:  "", linktext: ""}]) 
  const [handle, sethandle] = useState(searchParams.get("handle") || "");
  const [pic, setpic] = useState("");
  const [desc, setdesc] = useState("")

   const router = useRouter();

  const handleChange = (index, link, linktext) => {
    setLinks((initialLinks)=>{
       return initialLinks.map((item, i)=>{
          if(i==index){
            return {link, linktext}
          }
          else{
            return item
          }
        })
    })
  }

  const addLink =() =>{
    setLinks(links.concat([{link: "", linktext: ""}]))
  }

 const SubmitLinks = async () => {


  if(!session){
    toast.error("Please login to save your Bittree");
  return;
  };

  if (!handle || !links[0].link || !links[0].linktext) {
    toast.error("Please fill all fields");
    return;
  }

    const r = await fetch("/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        links: links,
        handle: handle,
        pic: pic,
        desc: desc,
        email: session.user.email,
        
        
        
      }),
    });
    
    console.log({
    links: links,
    handle: handle,
    pic: pic,
    desc: desc,
    email: session.user.email,
    
    
})
    
    const result = await r.json();
    if(result.success){
          toast.success(result.message);
          setLinks([])
          setpic("")
          sethandle("")
          setdesc("")
    }
    else{
      toast.error(result.message)
    }

      if(result.success){
    toast.success(result.message);
    //2 second ke baad user ko naye page par bhej do
    setTimeout(() => {
      router.push(`/${handle}`)
    }, 2000);
  }

      
  };

return (
  <div className="bg-[#f5faf5] min-h-screen grid grid-cols-1 md:grid-cols-2">
    {/* LEFT SIDE: EDITOR */}
    <div className="flex justify-center items-center flex-col p-6 pt-32">
      
      {/* MAIN FORM BOX */}
      <div className="bg-white p-10 rounded-[2.5rem]  shadow-2xl border border-gray-100 w-full max-w-[600px] flex flex-col gap-8">
        
        <h1 className="font-extrabold text-3xl text-black text-center">Create your Bittree</h1>

        {/* STEP 1: HANDLE */}
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-lg text-gray-800">Step 1: Claim your handle</h2>
          <input
            value={handle}
            onChange={(e) => sethandle(e.target.value)}
            className="bg-gray-100 text-black px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-[#d2e823] w-full font-medium"
            type="text"
            placeholder="Choose a Handle"
          />
        </div>

        {/* STEP 2: LINKS */}
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-lg text-gray-800">Step 2: Add links</h2>
          
          <div className="flex flex-col gap-4">
            {links && links.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-3">
                <input
                  value={item.linktext || ""}
                  onChange={(e) => handleChange(index, item.link, e.target.value)}
                  className="bg-gray-100 text-black px-5 py-3 rounded-xl border-none focus:ring-2 focus:ring-[#d2e823] flex-1 text-sm font-semibold"
                  type="text"
                  placeholder="Enter link text"
                />
                <input
                  value={item.link || ""}
                  onChange={(e) => handleChange(index, e.target.value, item.linktext)}
                  className="bg-gray-100 text-black px-5 py-3 rounded-xl border-none focus:ring-2 focus:ring-[#d2e823] flex-1 text-sm font-semibold"
                  type="text"
                  placeholder="Enter link"
                />
              </div>
            ))}
          </div>

          <button 
            onClick={() => addLink()}
            className="w-fit px-6 py-2 mt-2 font-bold text-sm text-black bg-[#d2e823] rounded-full hover:bg-[#b8cc1f] transition-all"
          >
            + Add Link
          </button>
        </div>

        {/* STEP 3: PICTURE & DESC */}
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-lg text-gray-800">Step 3: Picture & Bio</h2>
          
          <div className="flex flex-col gap-3">
            <input
              value={pic || ""}
              onChange={(e) => setpic(e.target.value)}
              className="bg-gray-100 text-black px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-[#d2e823]"
              type="text"
              placeholder="Enter link to your picture"
            />
            <input
              value={desc || ""}
              onChange={(e) => setdesc(e.target.value)}
              className="bg-gray-100 text-black px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-[#d2e823]"
              type="text"
              placeholder="Enter your Description"
            />
          </div>
        </div>

        {/* PUBLISH BUTTON */}
        <button
          disabled={pic == "" || handle == "" || links[0].link == "" || links[0].linktext == ""}
          onClick={() => SubmitLinks()}
          className="disabled:bg-gray-300 disabled:text-gray-500 px-8 py-5 w-full font-extrabold text-white bg-black rounded-full shadow-xl hover:scale-[1.02] transition-all text-xl mt-4"
        >
          Create your BitTree 
        </button>

      </div>
    </div>

    {/* RIGHT SIDE: IMAGE */}
    <div className="hidden md:block fixed right-0 top-0 w-1/2 h-screen">
      <img
        className="w-full h-full object-cover"
        src="/generate.png"
        alt="Generate your link"
      />
    </div>

    <ToastContainer />
  </div>
);

};

export default Generate;
