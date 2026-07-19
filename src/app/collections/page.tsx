import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Collections | Pro-Luce Lighting",
  description: "Explore our curated collections of architectural, commercial, hospitality, and residential lighting solutions.",
};

const collections = [
  { id: "architectural", name: "Architectural", desc: "Precision engineering for structural integration.", image: "/images/architectural.png" },
  { id: "commercial", name: "Commercial", desc: "High-performance illumination for workspaces.", image: "/images/commercial.png" },
  { id: "hospitality", name: "Hospitality", desc: "Atmospheric warmth for luxury environments.", image: "/images/hospitality.png" },
  { id: "residential", name: "Residential", desc: "Intimate and refined lighting for living spaces.", image: "/images/residential.png" },
];

export default function CollectionsPage() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <header className="mb-20 md:mb-32">
          <h1 className="font-serif text-5xl md:text-7xl font-light text-foreground mb-6 tracking-wide leading-tight">Collections</h1>
          <p className="font-sans text-foreground/60 text-lg md:text-xl max-w-2xl tracking-wide leading-relaxed">
            Our lighting systems are categorized by spatial intent, ensuring the perfect harmony between architecture and illumination.
          </p>
          <div className="w-16 h-[1px] bg-[#D9B780] mt-10"></div>
        </header>

        <div className="grid grid-cols-1 gap-32 md:gap-48">
          {collections.map((collection, idx) => (
            <div key={collection.id} className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 items-center group cursor-pointer`}>
              <div className="w-full md:w-1/2 aspect-[4/3] relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-[1.05]">
                  <Image 
                    src={collection.image} 
                    alt={collection.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover" 
                  />
                </div>
                <div className="absolute inset-0 bg-background/10 transition-colors duration-700 ease-out group-hover:bg-transparent pointer-events-none"></div>
              </div>
              <div className="w-full md:w-1/2 md:px-12 relative">
                {/* Decorative line */}
                <div className={`hidden md:block absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#D9B780]/30 to-transparent ${idx % 2 !== 0 ? 'right-0' : 'left-0'}`}></div>

                <h2 className="font-serif text-4xl md:text-6xl mb-6 text-foreground group-hover:text-[#D9B780] transition-colors duration-500 tracking-wide">{collection.name}</h2>
                <p className="font-sans text-foreground/70 mb-10 max-w-md text-balance text-lg tracking-wide leading-relaxed">{collection.desc}</p>
                <a href={`/collections/${collection.id}`} className="inline-flex items-center gap-4 text-xs uppercase tracking-[0.3em] font-bold hover:text-[#D9B780] transition-colors duration-300 relative pb-2 group/link">
                  <span className="relative z-10">View Collection</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D9B780] transition-all duration-500 ease-out group-hover/link:w-full"></span>
                  <span className="text-[#D9B780] transform group-hover/link:translate-x-3 transition-transform duration-500 ease-out">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
