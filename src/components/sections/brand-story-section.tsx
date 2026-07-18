"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function BrandStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-32 md:py-48 bg-secondary text-foreground relative overflow-hidden flex items-center justify-center min-h-[80vh]">
      <motion.div 
        style={{ y: y1, opacity }}
        className="container mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center"
      >
        <span className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-accent mb-10 block font-semibold">
          The Pro-Luce Ethos
        </span>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-7xl leading-[1.2] font-light max-w-5xl mx-auto text-balance">
          Light is the fourth dimension of architecture. We shape it with <span className="italic font-medium text-accent">precision</span>, materiality, and restraint.
        </h2>
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: 96, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="mt-16 w-[1px] bg-gradient-to-b from-accent to-transparent mx-auto"
        ></motion.div>
      </motion.div>
      
      {/* Background abstract elements for depth */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-accent/20 blur-[120px]"></div>
      </div>
    </section>
  );
}
