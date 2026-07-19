"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const collections = [
  { id: "architectural", name: "Architectural", desc: "Precision engineering for structural integration.", image: "/images/architectural.png" },
  { id: "commercial", name: "Commercial", desc: "High-performance illumination for workspaces.", image: "/images/commercial.png" },
  { id: "hospitality", name: "Hospitality", desc: "Atmospheric warmth for luxury environments.", image: "/images/hospitality.png" },
  { id: "residential", name: "Residential", desc: "Intimate and refined lighting for living spaces.", image: "/images/residential.png" },
];

export default function CollectionsClient() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-32"
        >
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-foreground mb-6 tracking-wide leading-tight">Collections</h1>
          <p className="font-sans text-foreground/60 text-lg md:text-xl max-w-2xl tracking-wide leading-relaxed">
            Our lighting systems are categorized by spatial intent, ensuring the perfect harmony between architecture and illumination.
          </p>
          <div className="w-16 h-[1px] bg-accent mt-10"></div>
        </motion.header>

        <div className="grid grid-cols-1 gap-24 md:gap-32 lg:gap-48">
          {collections.map((collection, idx) => (
            <motion.div 
              key={collection.id} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 md:gap-12 lg:gap-24 items-center group cursor-pointer`}
            >
              <div className="w-full lg:w-1/2 aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3] relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-[1.05]">
                  <Image 
                    src={collection.image} 
                    alt={collection.name} 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover" 
                  />
                </div>
                <div className="absolute inset-0 bg-background/10 transition-colors duration-700 ease-out group-hover:bg-transparent pointer-events-none"></div>
              </div>
              <div className="w-full lg:w-1/2 lg:px-12 relative flex flex-col justify-center">
                {/* Decorative line */}
                <div className={`hidden lg:block absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-accent/30 to-transparent ${idx % 2 !== 0 ? 'right-0' : 'left-0'}`}></div>

                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6 text-foreground group-hover:text-accent transition-colors duration-500 tracking-wide">{collection.name}</h2>
                <p className="font-sans text-foreground/70 mb-8 md:mb-10 max-w-md text-balance text-base md:text-lg tracking-wide leading-relaxed">{collection.desc}</p>
                <a href={`/collections/${collection.id}`} className="inline-flex items-center gap-4 text-xs uppercase tracking-[0.3em] font-bold hover:text-accent transition-colors duration-300 relative pb-2 group/link self-start">
                  <span className="relative z-10">View Collection</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-500 ease-out group-hover/link:w-full"></span>
                  <span className="text-accent transform group-hover/link:translate-x-3 transition-transform duration-500 ease-out">→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
