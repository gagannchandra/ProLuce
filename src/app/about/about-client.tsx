"use client";

import { motion } from "framer-motion";

export default function AboutClient() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-32"
        >
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-foreground mb-6 tracking-wide leading-tight">Our Philosophy</h1>
          <div className="w-16 h-[1px] bg-accent mt-8"></div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-lg md:text-xl text-foreground/80 space-y-8 leading-loose tracking-wide text-pretty"
          >
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-accent first-letter:mr-2 first-letter:float-left">
              Light is the defining element of space. At Pro-Luce, we do not merely manufacture fixtures; we engineer the medium through which architecture is experienced.
            </p>
            <p>
              Founded on the principles of precision, materiality, and restraint, our collections are designed to seamlessly integrate into the most demanding environments, providing unparalleled visual comfort and aesthetic purity.
            </p>
            <p>
              Our engineering team works closely with leading architects and designers to develop lighting solutions that meet both rigorous technical standards and uncompromising design visions.
            </p>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.3, delayChildren: 0.2 }
              }
            }}
            className="aspect-[4/5] md:aspect-square bg-background border border-border/30 relative overflow-hidden group"
          >
             <div className="absolute inset-0 bg-gradient-to-tr from-foreground/5 to-transparent transition-opacity duration-1000 opacity-50"></div>
             {/* Decorative abstract elements */}
             <motion.div 
               variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 1 } }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
               className="absolute right-12 top-12 bottom-12 w-[1px] bg-accent/40 transform origin-top"
             ></motion.div>
             <motion.div 
               variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
               className="absolute left-12 right-12 bottom-12 h-[1px] bg-accent/40 transform origin-left"
             ></motion.div>
             <motion.div 
               variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1 } }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-accent/20 rounded-full"
             ></motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
