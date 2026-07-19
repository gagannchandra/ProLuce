"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const strokeColor = mounted && theme === 'light' ? '#161514' : '#ffffff';
  const glowColor = mounted && theme === 'light' ? 'rgba(198,168,124,0.15)' : 'rgba(224,234,72,0.12)';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden px-6 pt-24 pb-12 transition-colors duration-700">
      
      {/* Huge Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col items-center justify-center w-full"
        >
          <h1 
            className="text-[35vw] md:text-[28vw] font-serif leading-[0.8] whitespace-nowrap text-transparent opacity-[0.05]"
            style={{ WebkitTextStroke: `2px ${strokeColor}` }}
          >
            404
          </h1>
        </motion.div>
      </div>

      {/* Centered Ambient Light Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] pointer-events-none z-0">
        <div 
          className="w-full h-full blur-3xl transition-colors duration-700"
          style={{ background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 60%)` }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center mt-[-10vh]">
        
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <h2 className="font-sans tracking-[0.4em] text-foreground/60 uppercase text-xs md:text-sm mb-6 flex items-center gap-4">
            <span className="w-8 md:w-12 h-[1px] bg-foreground/40"></span>
            Lost in Space
            <span className="w-8 md:w-12 h-[1px] bg-foreground/40"></span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="mt-8 md:mt-10"
        >
          <p className="font-sans text-foreground/80 tracking-widest text-sm md:text-base font-light uppercase max-w-lg mx-auto leading-relaxed">
            The page you are looking for has vanished.
            <br />
            <span className="text-accent font-medium drop-shadow-sm mt-2 inline-block">
              Redirecting in {countdown} seconds
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="mt-10"
        >
          <Link 
            href="/" 
            className="inline-flex items-center justify-center gap-3 bg-accent hover:bg-foreground text-background px-8 py-4 rounded-full font-bold tracking-[0.15em] uppercase text-xs transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 group"
          >
            Return Home Now
            <span className="bg-background/10 group-hover:bg-background/5 rounded-full w-6 h-6 flex items-center justify-center transition-colors">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
