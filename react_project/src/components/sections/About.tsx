import { motion } from 'framer-motion';
import { ABOUT_DATA } from '../../data/portfolio';
import { Zap } from 'lucide-react';
import clsx from 'clsx';

export const About = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="min-h-screen px-6 py-20 max-w-7xl mx-auto">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-2">About Me</h2>
          <div className="w-20 h-1 bg-primary rounded-full" />
        </div>

        <div className="space-y-12">
          {/* Bio Column */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2 mb-6">
                {ABOUT_DATA.personalities.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full font-mono font-medium border border-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-4 text-fg-muted leading-relaxed">
                {ABOUT_DATA.bio.map((paragraph, index) => (
                  <motion.p key={index} variants={item}>
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* Opportunity / Vision Text (Migrated from Flutter) */}
            <div className="flex flex-col justify-center p-8 bg-bg-secondary rounded-[2rem] border border-bg-tertiary relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <Zap size={80} className="text-primary" />
              </div>
              <p className="relative z-10 text-fg-muted italic border-l-4 border-primary pl-6">
                "I focus on effectiveness and engineered outcomes. My goal is to build high-performance systems that not only drive business success but also deliver meaningful convenience and value to the community."
              </p>
            </div>
          </div>

          {/* Fun Facts Section */}
          <div className="pt-12">
            <h3 className="text-xl font-bold mb-8 font-mono flex items-center gap-2">
              <span className="text-dev-pink">#</span> Fun Facts
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {ABOUT_DATA.funFacts.map((fact, idx) => {
                const Icon = fact.icon;
                // Extended Color Cycle
                const colors = [
                  "text-dev-blue",
                  "text-dev-yellow",
                  "text-dev-orange",
                  "text-dev-green",
                  "text-dev-red",
                  "text-dev-pink",
                  "text-dev-blue",
                  "text-dev-green"
                ];
                const colorClass = colors[idx % colors.length];

                return (
                  <motion.div
                    key={fact.label}
                    variants={item}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    className="p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-[2rem] bg-bg-secondary border border-bg-tertiary flex flex-col items-center justify-center text-center gap-2 sm:gap-4 transition-all hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 group"
                  >
                    <div className={clsx("p-2 sm:p-4 bg-bg rounded-xl sm:rounded-2xl transition-colors duration-300 group-hover:text-white group-hover:bg-primary", colorClass)}>
                      <Icon size={20} className="sm:w-7 sm:h-7" />
                    </div>
                    <div className="min-w-0 w-full">
                      <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-fg mb-1 truncate">{fact.value}</h3>
                      <p className="text-[10px] sm:text-xs text-fg-muted font-mono uppercase tracking-wider sm:tracking-widest font-bold truncate">
                        {fact.label}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
