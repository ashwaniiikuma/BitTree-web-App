"use client"
import Link from 'next/link'
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession() 
  const pathname = usePathname()
  
  // Is line ko dhyan se dekhna, agar pathname "/" nahi hua toh ye null return karega
  const showNavbar = ["/", "/generate"].includes(pathname)

  if (!showNavbar) return null;

  return (
    <nav className='bg-white w-[90vw] lg:w-[92vw] flex justify-between items-center top-6 lg:top-12  left-[2.5vw] lg:left-[4vw]  rounded-full fixed p-3 lg:p-4  px-4 lg:px-6  z-50 shadow-md border border-gray-100'>
      <div className="logo flex items-center">
        <Link href={"/"}>
          <img className='h-5 lg:h-6  px-2 lg:px-4' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg" alt="logo" />
        </Link>
   
      </div>

      <div className='flex gap-2 lg:gap-3 items-center'>
        {!session ? (
          <>
            <button onClick={() => signIn('google')} className='bg-gray-100 text-blue-500 cursor-pointer font-bold px-4 lg:px-6 py-2.5 lg:py-4 text-sm lg:text-base  rounded-full  hover:bg-gray-200 transition-all'>
              Log in
            </button>
            <button onClick={() => signIn('google')} className='bg-[#1e2321] font-bold px-5 lg:px-8 cursor-pointer  py-2.5 lg:py-4 text-sm lg:text-base text-white rounded-full hover:bg-black transition-all'>
              Sign up free
            </button>
          </>
        ) : (
          <div className='flex gap-2 lg:gap-4 items-center'>
            <span className=' hidden lg:block text-gray-600 font-semibold text-sm italic'> {session.user.email}</span>
            <Link href="/generate">
               <button className='bg-gray-200 cursor-pointer text-gray-700 font-bold px-6 py-4 lg:px-6 text-sm lg:text-base rounded-lg'>Dashboard</button>
            </Link>
            <button 
    onClick={() => signOut()} 
    className='relative group cursor-pointer overflow-hidden bg-[#0a0a0a] text-white font-bold px-5 lg:px-7 py-2.5 lg:py-4 text-sm lg:text-base rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] active:scale-95'
  >
    {/* Background Shine Effect (AI Touch) */}
    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
    
    {/* Button Text */}
    <div className="flex items-center gap-2">
       <span>Logout</span>
       {/* Ek chota sa minimalist icon */}
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
         <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
       </svg>
    </div>
  </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar