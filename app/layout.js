import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";
import LoadingProvider from "@/components/LoadingProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BitTree - Your favorite link sharing site",
  description: "We brought a revolution in link sharing",
  icons:{
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  
};

export default function RootLayout({ children }) {



  return (
    <html lang="en">
              <SessionWrapper>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
       <Navbar />
    <LoadingProvider>
        {children}
        </LoadingProvider>
      </body>
                    </SessionWrapper>

    </html>
  );
}