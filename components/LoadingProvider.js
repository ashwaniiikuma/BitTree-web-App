"use client";
import { useState, useEffect } from "react";
import SplashScreen from "./SplashScreen";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingProvider({ children }) {
  // 1. Loading ko 'null' rakho taaki pehle frame pe kuch render na ho
  const [status, setStatus] = useState("checking"); 

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("splashViewed");

    if (hasSeenSplash) {
      setStatus("skip"); // Agar dekh liya hai toh turant skip
    } else {
      setStatus("loading"); // Pehli baar hai toh load karo
      const timer = setTimeout(() => {
        setStatus("done");
        sessionStorage.setItem("splashViewed", "true");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, []);

  // 2. Jab tak check ho raha hai (checking), tab tak screen khaali rakho (Zero flicker)
  if (status === "checking") return null;

  // 3. Agar skip karna hai, toh seedha children dikhao bina kisi wrapper ke
  if (status === "skip") return <>{children}</>;

  return (
    <AnimatePresence mode="wait">
      {status === "loading" ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999]"
        >
          <SplashScreen />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// "use client"
// import { useState, useEffect } from "react";
// import SplashScreen from "./SplashScreen";
// import {motion, AnimatePresence} from "framer-motion"


// export default function LoadingProvider({children}){
//     const [loading, setLoading] = useState(true);

//    useEffect(() => {
//     // Check karo kya is 'session' mein splash dikha chuke hain?
//     const hasSeenSplash = sessionStorage.getItem("splashViewed");

//     if (hasSeenSplash) {
//       setLoading(false); // Agar dikha chuke hain, toh loading turant band
//     } else {
//       const timer = setTimeout(() => {
//         setLoading(false);
//         sessionStorage.setItem("splashViewed", "true"); // Save karlo ki dikha diya
//       }, 2500);
//       return () => clearTimeout(timer);
//     }
//   }, []);

//   if (!loading) return <>{children}</>;
//   return <SplashScreen />;
// }


//     return(
//         <AnimatePresence mode="wait">
//             {loading? (
//             <motion.div
//             key = "splash"
//             initial={{opacity: 1}}
//             exit={{opacity: 0}} // smooth fade out animation
//             transition={{duration: 0.5}}
//             >
//                 <SplashScreen/>
//             </motion.div>
//             ):(
//             <motion.div
//             key= "content"
//             initial={{opacity: 0}}
//             animate={{opacity: 1}}
//             transition={{duration: 0.5}}
//             >
//                 {children}
//             </motion.div>
//             )}

//         </AnimatePresence>
//     )
// }