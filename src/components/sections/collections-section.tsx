"use client";


import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const collections = [
  {
    id: "architectural",
    title: "Architectural",
    desc: "Precision engineering for structural integration.",
    image: "/images/architectural.png",
  },
  {
    id: "commercial",
    title: "Commercial",
    desc: "High-performance illumination for workspaces.",
    image: "/images/commercial.png",
  },
  {
    id: "hospitality",
    title: "Hospitality",
    desc: "Atmospheric warmth for luxury environments.",
    image: "/images/hospitality.png",
  },
  {
    id: "residential",
    title: "Residential",
    desc: "Intimate and refined lighting for living spaces.",
    image: "/images/residential.png",
  },
];

export function CollectionsSection() {
  return (
    <section className="py-32 md:py-48 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 md:mb-32">
          <div className="max-w-3xl">
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground font-light tracking-wide max-w-2xl leading-[1.1]">
              Curated illumination for every spatial context.
            </h2>
          </div>
          <Link href="/collections" className="group flex items-center gap-4 mt-12 md:mt-0 text-foreground uppercase tracking-[0.2em] text-xs font-semibold hover:text-accent transition-colors duration-300 relative pb-1">
            <span className="relative z-10">View All Collections</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-500 ease-out group-hover:w-full"></span>
            <ArrowRight size={18} strokeWidth={1.5} className="group-hover:translate-x-3 transition-transform duration-500 ease-out" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {collections.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
              className={`group relative aspect-[3/4] md:aspect-square overflow-hidden cursor-pointer rounded-sm ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
            >
              <div className={`absolute inset-0 transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-[1.03]`}>
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover" 
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-700 ease-in-out"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]">
                <h3 className="font-serif text-3xl md:text-5xl font-light text-foreground mb-4 tracking-wide">{item.title}</h3>
                <p className="text-foreground/80 font-sans text-sm md:text-base tracking-[0.05em] leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-150">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
