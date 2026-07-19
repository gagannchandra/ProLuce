"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function HeroSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Determine colors based on theme, fallback to dark mode colors if not mounted
  const strokeColor = mounted && theme === 'light' ? '#161514' : '#ffffff';
  const glowColor = mounted && theme === 'light' ? 'rgba(198,168,124,0.15)' : 'rgba(224,234,72,0.12)';

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-background pt-24 pb-12 transition-colors duration-700">
      
      {/* Huge Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col items-center justify-center w-full"
        >
          <h1 
            className="text-[28vw] md:text-[24vw] font-serif leading-[0.8] whitespace-nowrap text-transparent opacity-[0.05]"
            style={{ WebkitTextStroke: `2px ${strokeColor}` }}
          >
            PRO
          </h1>
          <h1 
            className="text-[28vw] md:text-[24vw] font-serif leading-[0.8] whitespace-nowrap text-transparent opacity-[0.05]"
            style={{ WebkitTextStroke: `2px ${strokeColor}` }}
          >
            LUCE
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

      {/* Main Content Wrapper - Centered */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <h2 className="font-sans tracking-[0.4em] text-foreground/60 uppercase text-xs md:text-sm mb-6 flex items-center gap-4">
            <span className="w-8 md:w-12 h-[1px] bg-foreground/40"></span>
            Premium Lighting
            <span className="w-8 md:w-12 h-[1px] bg-foreground/40"></span>
          </h2>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-[8rem] font-medium tracking-tight text-foreground leading-none drop-shadow-xl">
            PRO<span className="font-light">-</span>LUCE
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="mt-8 md:mt-10"
        >
          <p className="font-sans text-foreground/80 tracking-widest text-sm md:text-base font-light uppercase max-w-lg mx-auto leading-relaxed">
            Designed to illuminate exceptional spaces.
            <br />
            <span className="text-accent font-medium drop-shadow-sm mt-2 inline-block">
              Collection 2026
            </span>
          </p>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="mt-10"
        >
          <Link href="/collections" className="inline-flex items-center justify-center gap-3 bg-accent hover:bg-foreground text-background px-8 py-4 rounded-full font-bold tracking-[0.15em] uppercase text-xs transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 group">
            Explore Collection
            <span className="bg-background/10 group-hover:bg-background/5 rounded-full w-6 h-6 flex items-center justify-center transition-colors">
              →
            </span>
          </Link>
        </motion.div>

        {/* Categories as Modern Pills */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
           className="mt-16 md:mt-24 flex flex-wrap justify-center items-center gap-3 md:gap-4"
        >
          {["Architectural", "Commercial", "Hospitality", "Residential"].map((cat) => (
            <Link 
              key={cat} 
              href={`/collections#${cat.toLowerCase()}`}
              className="px-5 py-2 md:px-7 md:py-2.5 rounded-full border border-foreground/20 bg-foreground/5 backdrop-blur-md text-foreground/70 text-[10px] md:text-xs tracking-[0.15em] uppercase hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300"
            >
              {cat}
            </Link>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
