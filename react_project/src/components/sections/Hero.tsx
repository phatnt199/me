import { motion } from 'framer-motion';
import { HERO_DATA } from '../../data/portfolio';
import { ArrowRight, MessageCircle, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Typewriter } from '../ui/Typewriter';
import { Magnetic } from '../ui/Magnetic';

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-start md:items-center justify-center px-6 pt-4 pb-20 md:py-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-4 md:gap-12 lg:gap-8 items-center pt-0 md:pt-0">
        {/* Left: Text Content */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-mono text-secondary text-sm md:text-base font-medium tracking-wider mb-4 block">
              &lt;Hi there! I am... /&gt;
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-fg tracking-tight leading-tight">
              {HERO_DATA.name}
              <span className="text-primary">.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl text-fg-muted mb-8 font-mono h-auto md:h-16 flex flex-col lg:block items-center lg:items-start gap-2">
              <span>A <span className="text-fg font-bold"><Typewriter text={HERO_DATA.title} delay={0.5} /></span></span>
              <span className="hidden md:inline"><br /></span>
              <span>based in {HERO_DATA.location}</span>
            </h2>
            
            <p className="text-base md:text-lg text-fg-muted max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">
              {HERO_DATA.intro}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Magnetic>
              <Link 
                to="/projects"
                className="px-8 py-4 bg-primary text-white rounded-2xl font-mono font-bold hover:bg-dev-green transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-dev-green/40 group w-full sm:w-auto"
              >
                View Portfolio <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
              </Link>
            </Magnetic>
            
            <Magnetic>
              <Link
                to="/contact"
                className="px-8 py-4 bg-bg-secondary text-fg rounded-2xl font-mono font-bold hover:bg-bg-tertiary border border-bg-tertiary transition-colors w-full sm:w-auto flex items-center justify-center"
              >
                 Contact Me
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right: Code/Avatar Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="order-1 lg:order-2 flex justify-center py-2 md:py-8"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
             {/* Decorative Rings */}
             <div className="absolute inset-0 rounded-full border border-dev-blue/20 animate-[spin_10s_linear_infinite]" />
             <div className="absolute inset-4 rounded-full border border-dashed border-dev-pink/30 animate-[spin_15s_linear_infinite_reverse]" />
             
             {/* Avatar Container */}
             <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-bg-secondary shadow-2xl shadow-primary/20 bg-bg-secondary">
                <img 
                  src={HERO_DATA.avatar} 
                  alt={HERO_DATA.name}
                  className="w-full h-full object-cover" 
                />
             </div>

             {/* Floating Badge 1: Inquiry (Top Left) */}
             <Link to="/contact">
               <motion.div
                 animate={{ y: [0, 10, 0] }}
                 whileHover={{ scale: 1.05, borderColor: "var(--color-dev-blue)" }}
                 transition={{
                   y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                   scale: { duration: 0.2 }
                 }}
                 className="absolute top-0 -left-1 sm:-top-2 sm:-left-2 md:-top-4 md:-left-8 bg-bg-secondary border border-bg-tertiary p-1.5 sm:p-2 md:p-4 rounded-lg sm:rounded-xl shadow-xl flex items-center gap-1.5 sm:gap-2 md:gap-3 cursor-pointer group/badge transition-colors"
               >
                 <div className="p-1 sm:p-1.5 md:p-2 bg-dev-blue/10 rounded-md sm:rounded-lg text-dev-blue group-hover/badge:bg-dev-blue group-hover/badge:text-white transition-colors">
                   <MessageCircle size={12} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                 </div>
                 <div className="font-mono text-[8px] sm:text-[10px] md:text-xs text-left">
                   <div className="text-fg-muted italic group-hover/badge:text-dev-blue transition-colors">Inquiry</div>
                   <div className="font-bold text-fg">Your vision</div>
                 </div>
               </motion.div>
             </Link>

             {/* Floating Badge 2: Delivery (Bottom Right) */}
             <Link to="/projects">
               <motion.div
                 animate={{ y: [0, -10, 0] }}
                 whileHover={{ scale: 1.05, borderColor: "var(--color-dev-green)" }}
                 transition={{
                   y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                   scale: { duration: 0.2 }
                 }}
                 className="absolute bottom-0 -right-1 sm:-bottom-2 sm:-right-2 md:-bottom-4 md:-right-8 bg-bg-secondary border border-bg-tertiary p-1.5 sm:p-2 md:p-4 rounded-lg sm:rounded-xl shadow-xl flex items-center gap-1.5 sm:gap-2 md:gap-3 cursor-pointer group/badge transition-colors"
               >
                 <div className="p-1 sm:p-1.5 md:p-2 bg-dev-green/10 rounded-md sm:rounded-lg text-dev-green group-hover/badge:bg-dev-green group-hover/badge:text-white transition-colors">
                   <Rocket size={12} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                 </div>
                 <div className="font-mono text-[8px] sm:text-[10px] md:text-xs text-left">
                   <div className="text-fg-muted italic">Delivery</div>
                   <div className="font-bold text-fg">My solution</div>
                 </div>
               </motion.div>
             </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};