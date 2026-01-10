import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPERIENCE_DATA, EDUCATION_DATA } from '../../data/portfolio';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';
import clsx from 'clsx';

type Tab = 'experience' | 'education';

export const Experience = () => {
  const [activeTab, setActiveTab] = useState<Tab>('experience');

  const data = activeTab === 'experience' ? EXPERIENCE_DATA : EDUCATION_DATA;

  return (
    <section className="min-h-screen px-6 py-20 max-w-5xl mx-auto">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Resume</h2>
          <div className="w-20 h-1 bg-primary rounded-full" />
        </div>
        
        {/* Tabs */}
        <div className="flex bg-bg-secondary p-1 rounded-2xl border border-bg-tertiary">
          <button
            onClick={() => setActiveTab('experience')}
            className={clsx(
              "px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
              activeTab === 'experience' 
                ? "bg-primary text-white shadow-md" 
                : "text-fg-muted hover:text-fg"
            )}
          >
            <Briefcase size={16} /> Experience
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={clsx(
              "px-6 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2",
              activeTab === 'education' 
                ? "bg-primary text-white shadow-md" 
                : "text-fg-muted hover:text-fg"
            )}
          >
            <GraduationCap size={16} /> Education
          </button>
        </div>
      </div>

      <div className="relative border-l-2 border-bg-tertiary ml-3 md:ml-6 space-y-12 pb-12">
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="space-y-12"
          >
            {data.map((item) => (
              <motion.div 
                key={item.id} 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                }}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-bg border-4 border-secondary shadow-[0_0_0_4px_var(--color-bg)]" />
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-accent/10 text-accent text-xs font-bold border border-accent/20 w-fit">
                    <Calendar size={12} />
                    {item.time}
                  </span>
                  <span className="text-sm text-fg-muted flex items-center gap-1">
                    <MapPin size={12} />
                    {item.place}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-fg mb-2">
                  {'role' in item ? item.role : item.title}
                </h3>

                <ul className="space-y-2">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="text-fg-muted text-sm leading-relaxed flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-bg-tertiary shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
