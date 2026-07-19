"use client";

import { motion, Variants } from "framer-motion";

const formVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function ContactClient() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-32"
        >
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-foreground mb-6 tracking-wide leading-tight">Inquiries</h1>
          <p className="font-sans text-foreground/60 text-lg md:text-xl max-w-xl tracking-wide leading-relaxed">
            Our specialists are available to consult on complex architectural requirements and bespoke lighting configurations.
          </p>
          <div className="w-16 h-[1px] bg-accent mt-10"></div>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-32">
          
          <motion.form 
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="space-y-10"
          >
            <motion.div variants={itemVariants} className="space-y-3 relative group">
              <label htmlFor="name" className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-foreground/50 transition-colors group-focus-within:text-accent">Full Name</label>
              <input type="text" id="name" className="w-full bg-transparent border-b border-border/40 py-2 text-foreground focus:outline-none focus:border-accent transition-colors placeholder:text-foreground/20 text-lg" placeholder="John Doe" />
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-3 relative group">
              <label htmlFor="email" className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-foreground/50 transition-colors group-focus-within:text-accent">Email Address</label>
              <input type="email" id="email" className="w-full bg-transparent border-b border-border/40 py-2 text-foreground focus:outline-none focus:border-accent transition-colors placeholder:text-foreground/20 text-lg" placeholder="john@example.com" />
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-3 relative group">
              <label htmlFor="company" className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-foreground/50 transition-colors group-focus-within:text-accent">Company / Studio</label>
              <input type="text" id="company" className="w-full bg-transparent border-b border-border/40 py-2 text-foreground focus:outline-none focus:border-accent transition-colors placeholder:text-foreground/20 text-lg" placeholder="Architecture Firm" />
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-3 relative group">
              <label htmlFor="message" className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-foreground/50 transition-colors group-focus-within:text-accent">Message</label>
              <textarea id="message" rows={4} className="w-full bg-transparent border-b border-border/40 py-2 text-foreground focus:outline-none focus:border-accent transition-colors resize-none placeholder:text-foreground/20 text-lg leading-relaxed" placeholder="Tell us about your project..."></textarea>
            </motion.div>
            <motion.button variants={itemVariants} type="submit" className="bg-foreground text-background px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-accent transition-colors duration-300 w-full md:w-auto shadow-sm">
              Submit Inquiry
            </motion.button>
          </motion.form>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="space-y-20 relative"
          >
            <div className="hidden md:block absolute -left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-border/30 to-transparent"></div>
            <div>
              <h3 className="font-serif text-3xl mb-6 text-foreground tracking-wide italic text-accent">Global Headquarters</h3>
              <p className="font-sans text-foreground/80 leading-loose text-lg tracking-wide">
                Pro-Luce Architecture<br />
                Via della Luce, 24<br />
                20121 Milano MI, Italy
              </p>
            </div>
            <div>
              <h3 className="font-serif text-3xl mb-6 text-foreground tracking-wide italic text-accent">Direct Contact</h3>
              <p className="font-sans text-foreground/80 leading-loose text-lg tracking-wide flex flex-col gap-2">
                <a href="mailto:info@pro-luce.com" className="hover:text-accent transition-colors inline-block w-fit group">
                  info@pro-luce.com
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-accent"></span>
                </a>
                <a href="tel:+390212345678" className="hover:text-accent transition-colors inline-block w-fit group">
                  +39 02 1234 5678
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-accent"></span>
                </a>
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
