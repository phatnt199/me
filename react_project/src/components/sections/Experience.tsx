import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';
import { EXPERIENCE_DATA, EDUCATION_DATA } from '../../data/portfolio';
import { Briefcase, GraduationCap, MapPin, Calendar, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

type Tab = 'professional' | 'academic';

export const Experience = () => {
  const [activeTab, setActiveTab] = useState<Tab>('professional');

  return (
    <section className="min-h-screen px-4 sm:px-6 py-20 lg:py-32 max-w-7xl mx-auto relative">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-primary/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[250px] md:w-[600px] h-[250px] md:h-[600px] bg-dev-blue/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none mix-blend-screen" />

      {/* Section Header */}
      <div className="mb-12 md:mb-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-fg to-fg-muted">
            The Journey.
          </h2>
          <div className="flex items-center gap-3 sm:gap-4 mb-8">
            <div className="h-[2px] w-12 sm:w-24 bg-primary" />
            <p className="text-fg-muted text-base sm:text-xl font-medium tracking-wide">
              Foundations & Milestones
            </p>
          </div>
        </motion.div>

        {/* Mobile Tabs */}
        <div className="lg:hidden flex p-1 bg-bg-secondary/50 backdrop-blur-md rounded-xl border border-bg-tertiary">
          <button
            onClick={() => setActiveTab('professional')}
            className={clsx(
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all duration-300",
              activeTab === 'professional' 
                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                : "text-fg-muted hover:text-fg"
            )}
          >
            <Briefcase size={16} />
            Professional
          </button>
          <button
            onClick={() => setActiveTab('academic')}
            className={clsx(
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all duration-300",
              activeTab === 'academic' 
                ? "bg-dev-blue text-white shadow-lg shadow-dev-blue/20" 
                : "text-fg-muted hover:text-fg"
            )}
          >
            <GraduationCap size={16} />
            Academic
          </button>
        </div>
      </div>

      {/* Mobile Content (Tabbed) */}
      <div className="lg:hidden relative z-10 min-h-[500px]">
        <AnimatePresence mode="wait">
          {activeTab === 'professional' ? (
            <motion.div
              key="professional"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {EXPERIENCE_DATA.map((item, idx) => (
                <SpotlightCard key={item.id} item={item} index={idx} type="job" />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="academic"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {EDUCATION_DATA.map((item, idx) => (
                <SpotlightCard key={item.id} item={item} index={idx} type="edu" />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Content (Grid) */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
        {/* Experience Column */}
        <div className="space-y-12">
          <div className="flex items-center gap-4 mb-16">
            <div className="p-3 rounded-2xl bg-bg-secondary border border-bg-tertiary shadow-sm">
              <Briefcase size={24} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold tracking-widest uppercase text-fg-muted">Professional</h3>
          </div>
          
          <div className="space-y-8">
            {EXPERIENCE_DATA.map((item, idx) => (
              <SpotlightCard key={item.id} item={item} index={idx} type="job" />
            ))}
          </div>
        </div>

        {/* Education Column */}
        <div className="space-y-12">
          <div className="flex items-center gap-4 mb-16 mt-32"> {/* Offset foreditorial look */}
            <div className="p-3 rounded-2xl bg-bg-secondary border border-bg-tertiary shadow-sm">
              <GraduationCap size={24} className="text-dev-blue" />
            </div>
            <h3 className="text-2xl font-bold tracking-widest uppercase text-fg-muted">Academic</h3>
          </div>

          <div className="space-y-8">
            {EDUCATION_DATA.map((item, idx) => (
              <SpotlightCard key={item.id} item={item} index={idx} type="edu" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SpotlightCard = ({ item, index, type }: { item: any, index: number, type: 'job' | 'edu' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.98, 1, 1, 0.98]);
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [2, 0, 0, 2]);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const title = 'role' in item ? item.role : item.title;
  const place = 'place' in item ? item.place : '';
  const watermark = place.charAt(0);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, filter: useMotionTemplate`blur(${blur}px)` }}
      className="group relative rounded-2xl sm:rounded-3xl bg-bg-secondary/30 border border-bg-tertiary overflow-hidden transition-colors hover:bg-bg-secondary/50"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Gradient - Hide on small touch devices to save perf */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl sm:rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 hidden sm:block"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${type === 'job' ? 'rgba(var(--color-primary), 0.15)' : 'rgba(var(--color-dev-blue), 0.15)'},
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative p-6 sm:p-8 h-full flex flex-col">
        {/* Watermark - Smaller on mobile */}
        <div className="absolute top-2 right-4 text-[5rem] sm:text-[8rem] font-bold opacity-[0.03] select-none font-serif leading-none pointer-events-none">
          {watermark}
        </div>

        <div className="mb-4 sm:mb-6 flex flex-col gap-1.5 sm:gap-2">
          <span className={clsx(
            "text-[10px] sm:text-xs font-bold tracking-widest uppercase px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full w-fit border",
            type === 'job' 
              ? "bg-primary/10 text-primary border-primary/20"
              : "bg-dev-blue/10 text-dev-blue border-dev-blue/20"
          )}>
            {item.time}
          </span>
          <h4 className="text-lg sm:text-2xl font-bold text-fg group-hover:text-primary transition-colors mt-1 sm:mt-2">
            {title}
          </h4>
          <div className="flex items-center gap-1.5 sm:gap-2 text-fg-muted text-xs sm:text-sm font-medium">
            <MapPin size={14} className="sm:w-4 sm:h-4" />
            {place}
          </div>
        </div>

        <div className="space-y-2.5 sm:space-y-3 relative z-10">
          {item.details.map((detail: string, i: number) => (
            <p key={i} className="text-xs sm:text-base text-fg-muted/80 leading-relaxed pl-3 sm:pl-4 border-l border-bg-tertiary">
              {detail}
            </p>
          ))}
        </div>

        {/* Bottom Accent */}
        <div className={clsx(
          "absolute bottom-0 left-0 w-full h-[2px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left",
          type === 'job' ? "bg-primary" : "bg-dev-blue"
        )} />
      </div>
    </motion.div>
  );
};