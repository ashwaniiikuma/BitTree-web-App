
"use client"
import {motion, } from "framer-motion";

export default function SplashScreen(){

        const logoText = "BitTree";

        const letters = Array.from(logoText);

        const container = {
            hidden: {opacity: 0},
            visible: (i = 1) => ({
                opacity: 1,
                transition: {staggerChildren: 0.1, delayChildren: 0.04 * i},
            }),
        };

        const child = {
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    type: "spring",
                    damping: 12,
                    stiffness: 200,
                },
            },
            hidden:{
                opacity: 0,
                y: 20,
            },
        };




    return(
        <div className="fixed inset-0 z-[99] flex flex-col items-center justify-center bg-[#d2e823] h-screen w-full">
            <motion.div
            variants={container}
            animate="visible"
            initial="hidden"
            className="flex overflow-hidden text-7xl font-black text-[#1d331f]"
            >
                {letters.map((letter, index) =>(
                     <motion.span variants={child} key={index}>
                    {letter}
                </motion.span>
                ))}
               
            </motion.div>

            <motion.div
            initial={{width: 0}}
            animate={{width: "150px"}}
            transition={{delay: 0.8, duration: 1}}
            className="h-[4px] bg-[#1d331f] mt-4 rounded-full"
            >

            </motion.div>

            <motion.p
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ delay: 1.5}}
            className="mt-4 text-[#1d331f] tracking-[0.2] uppercase text-xs"
            >
                Welcome to your digital home

            </motion.p>

            <div className="mt-8 w-48 h-[2px] bg-[#1d331f]/10 relative overflow-hidden rounded-full">
                <motion.div
                initial={{left: "-100%"}}
                animate={{left: "100%"}}
                transition={{repeat: Infinity, duration: 1.5, ease: "linear"}}
                className="absolute h-full w-full bg-[#1d221f]"
                />

                
            </div>
        </div>
    )
}