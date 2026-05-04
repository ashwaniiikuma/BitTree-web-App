"use client"


export default function LinkCard({link, index, handle}) {
  

    let iconUrl = "https://cdn-icons-png.flaticon.com/512/2065/2065157.png"; 
  
  
  const url = link.link.toLowerCase();

  // Social Media Icons Logic
  if (url.includes("facebook.com")) iconUrl = "https://cdn-icons-png.flaticon.com/512/733/733547.png";
  else if (url.includes("instagram.com")) iconUrl = "https://cdn-icons-png.flaticon.com/512/174/174855.png";
  else if (url.includes("whatsapp.com") || url.includes("wa.me")) iconUrl = "https://cdn-icons-png.flaticon.com/512/733/733585.png";
  else if (url.includes("linkedin.com")) iconUrl = "https://cdn-icons-png.flaticon.com/512/174/174857.png";
  else if (url.includes("youtube.com") || url.includes("youtu.be")) iconUrl = "https://cdn-icons-png.flaticon.com/512/1384/1384060.png";
  else if (url.includes("twitter.com") || url.includes("x.com")) iconUrl = "https://cdn-icons-png.flaticon.com/512/5969/5969020.png";
  else if (url.includes("github.com")) iconUrl = "https://cdn-icons-png.flaticon.com/512/25/25231.png";
  else if (url.includes("snapchat.com")) iconUrl = "https://cdn-icons-png.flaticon.com/512/174/174870.png";
  else if (url.includes("telegram.me") || url.includes("t.me")) iconUrl = "https://cdn-icons-png.flaticon.com/512/2111/2111646.png";
  else if (url.includes("spotify.com")) iconUrl = "https://cdn-icons-png.flaticon.com/512/174/174872.png";
  else if (url.includes("reddit.com")) iconUrl = "https://cdn-icons-png.flaticon.com/512/52/52053.png";
  else if (url.includes("threads.net")) iconUrl = "https://cdn-icons-png.flaticon.com/512/11520/11520119.png";
  else if (url.includes("pinterest.com")) iconUrl = "https://cdn-icons-png.flaticon.com/512/145/145808.png";
  else if (url.includes("discord.gg") || url.includes("discord.com")) iconUrl = "https://cdn-icons-png.flaticon.com/512/3670/3670157.png";


 const handleClick = async () =>{
  
  await fetch ("/api/click",{
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                handle,
                index,
            }),
            
        })
        
        window.open(link.link, "_blank")
    }
    



  
  return (
<div 
    onClick={handleClick}
    className='cursor-pointer w-full bg-white/80 backdrop-blur-md py-4 px-6 rounded-2xl my-4 flex items-center justify-between border border-purple-100 shadow-2xl hover:shadow-2xl hover:scale-[1.02] hover:bg-white transition-all duration-250 group'
  >

    {/* 🔥 LEFT SIDE: ICON + TEXT */}
    <div className="flex items-center gap-6">
      
      {/* ICON - Added a subtle background circle */}
      <div className="w-10 h-10 flex items-center justify-center bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
        <img 
          src={iconUrl} 
          className="w-5 h-5 object-contain"
          alt=""
        />
      </div>

      {/* TEXT - Slightly tighter tracking and better color */}
      <span className='font-semibold text-gray-800 text-lg tracking-tight group-hover:text-purple-700 transition-colors'>
        {link.linktext}
      </span>

    </div>

    {/* 🔥 RIGHT SIDE: CLICKS - Made it look like a status badge */}
    <div className="flex flex-col items-end">
      <span className='text-sm font-black text-purple-600 bg-purple-50 px-2 py-1 rounded-full border border-purple-100'>
        {link.clicks || 0} <span className="text-[10px] font-medium text-purple-400 uppercase ml-1">Clicks</span>
      </span>
    </div>

  </div>
)
}


