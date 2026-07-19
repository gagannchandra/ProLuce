"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const products = [
  { id: "p1", name: "Aura Pendant", category: "Residential", image: "/images/residential.png" },
  { id: "p2", name: "Linea Profile", category: "Architectural", image: "/images/architectural.png" },
  { id: "p3", name: "Lumina Sconce", category: "Hospitality", image: "/images/hospitality.png" },
  { id: "p4", name: "Zenith Spotlight", category: "Commercial", image: "/images/commercial.png" },
  { id: "p5", name: "Halo Ring", category: "Architectural", image: "/images/architectural.png" },
];

export function FeaturedProductsSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-60%"]);

  return (
    <section ref={targetRef} className="h-[200vh] bg-background relative">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-24">
        
        <div className="container mx-auto px-6 md:px-12 mb-12 md:mb-20 flex justify-between items-end">
          <div className="max-w-2xl">
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground font-light tracking-wide leading-tight">
              Featured Series
            </h2>
          </div>
          <Link href="/products" className="group hidden md:flex items-center gap-4 text-foreground uppercase tracking-[0.2em] text-xs font-semibold hover:text-accent transition-colors duration-300 relative pb-2">
            <span className="relative z-10">Explore Catalogue</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-500 ease-out group-hover:w-full"></span>
            <ArrowRight size={18} strokeWidth={1.5} className="group-hover:translate-x-3 transition-transform duration-500 ease-out" />
          </Link>
        </div>

        <motion.div style={{ x }} className="flex gap-8 md:gap-12 px-6 md:px-12 w-max cursor-grab active:cursor-grabbing">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="w-[75vw] md:w-[450px] lg:w-[550px] flex-shrink-0 group"
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-8 rounded-sm">
                <div className="absolute inset-0 transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-[1.05]">
                   <Image 
                     src={product.image} 
                     alt={product.name} 
                     fill 
                     sizes="(max-width: 768px) 75vw, 550px"
                     className="object-cover" 
                   />
                </div>
                <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-700 ease-out"></div>
              </div>
              <div className="flex justify-between items-baseline pr-4">
                <div>
                  <p className="text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase text-foreground/50 mb-3">{product.category}</p>
                  <h3 className="font-serif text-3xl md:text-4xl text-foreground group-hover:text-accent transition-colors duration-300 tracking-wide">{product.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
