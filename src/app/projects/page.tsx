import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Projects | Pro-Luce Lighting",
  description: "View architectural spaces illuminated by Pro-Luce.",
};

const projects = [
  { id: "proj1", name: "Villa Aman", location: "Lake Como, Italy", type: "Residential", image: "/images/residential.png" },
  { id: "proj2", name: "The Zenith Tower", location: "Dubai, UAE", type: "Commercial", image: "/images/commercial.png" },
  { id: "proj3", name: "Maison Noir", location: "Paris, France", type: "Hospitality", image: "/images/hospitality.png" },
  { id: "proj4", name: "Gallery 19", location: "New York, USA", type: "Architectural", image: "/images/architectural.png" },
];

export default function ProjectsPage() {
  return (
    <div className="pt-32 pb-24 bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <header className="mb-24 md:mb-32 text-center flex flex-col items-center">
          <h1 className="font-serif text-5xl md:text-7xl font-light mb-6 tracking-wide leading-tight">Light in Context</h1>
          <p className="font-sans text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto tracking-wide">
            Explore how Pro-Luce transforms environments through intentional illumination.
          </p>
          <div className="w-16 h-[1px] bg-[#D9B780] mt-10"></div>
        </header>

        <div className="space-y-32 md:space-y-48">
          {projects.map((project, idx) => (
            <div key={project.id} className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-20 items-center group cursor-pointer`}>
              <div className="w-full md:w-3/5 aspect-video relative overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-[1.05]">
                  <Image 
                    src={project.image} 
                    alt={project.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover" 
                  />
                </div>
                <div className="absolute inset-0 bg-background/20 transition-colors duration-700 ease-out group-hover:bg-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out bg-background/60 z-20 backdrop-blur-[2px]">
                  <span className="uppercase tracking-[0.3em] text-xs font-semibold text-foreground border border-foreground/30 px-6 py-3 rounded-full hover:bg-foreground hover:text-background transition-colors duration-300">View Project</span>
                </div>
              </div>
              <div className="w-full md:w-2/5 md:px-12 flex flex-col items-start relative">
                {/* Decorative line */}
                <div className={`hidden md:block absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#D9B780]/30 to-transparent ${idx % 2 !== 0 ? 'right-0' : 'left-0'}`}></div>
                
                <p className="text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase text-[#D9B780] mb-6 font-semibold">{project.type}</p>
                <h2 className="font-serif text-4xl md:text-5xl mb-4 group-hover:text-[#D9B780] transition-colors duration-500 tracking-wide">{project.name}</h2>
                <p className="font-sans text-foreground/50 tracking-wider text-sm">{project.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
