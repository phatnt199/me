import { motion } from 'framer-motion';
import { SKILLS_DATA } from '../../data/portfolio';
import clsx from 'clsx';

export const Skills = () => {
  return (
    <section className="min-h-screen px-6 py-20 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-2">What Can I Do?</h2>
        <div className="w-20 h-1 bg-primary rounded-full" />
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Left Column: Technical Skills */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="text-dev-orange">#</span> Core Architecture Stack
          </h3>
          <div className="space-y-6">
            {SKILLS_DATA.technical.map((skill, idx) => {
              // Cycle through colors for bars
              const colors = ["bg-dev-red", "bg-dev-orange", "bg-dev-yellow", "bg-dev-green", "bg-dev-blue", "bg-dev-pink"];
              const barColor = colors[idx % colors.length];
              
              return (
                <motion.div 
                  key={skill.name}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 }
                  }}
                >
                  <div className="flex justify-between mb-2 text-sm font-medium">
                    <span className="flex items-center gap-2">
                      <skill.icon size={16} className={clsx(barColor.replace('bg-', 'text-'))} />
                      {skill.name}
                    </span>
                    <span className="text-fg-muted">{skill.level * 100}%</span>
                  </div>
                  <div className="h-2 w-full bg-bg-tertiary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level * 100}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                      className={clsx("h-full rounded-full", barColor)}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column: Soft Skills & Languages */}
        <div className="space-y-12">
           {/* Languages Chips */}
           <motion.div
             initial="hidden"
             whileInView="show"
             viewport={{ once: true }}
             variants={{
               hidden: { opacity: 0 },
               show: { opacity: 1, transition: { staggerChildren: 0.05 } }
             }}
           >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-dev-yellow">#</span> Toolchain & Mastery
            </h3>
            <div className="space-y-6">
              {SKILLS_DATA.languages.map((group) => (
                <div key={group.category}>
                  <h4 className="text-xs font-mono font-bold text-fg-muted uppercase tracking-widest mb-3">
                    {group.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <motion.span
                        key={item}
                        variants={{
                          hidden: { opacity: 0, scale: 0.8 },
                          show: { opacity: 1, scale: 1 }
                        }}
                        whileHover={{ y: -3, backgroundColor: "var(--color-bg-tertiary)" }}
                        className="px-3 py-1.5 bg-bg-secondary border border-bg-tertiary rounded-xl text-xs font-medium cursor-default transition-colors text-dev-blue hover:text-dev-pink"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills Grid */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-dev-green">#</span> Leadership & Strategy
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {SKILLS_DATA.soft.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                  className="p-3 sm:p-4 bg-bg-secondary rounded-xl sm:rounded-2xl border border-bg-tertiary flex items-center gap-3"
                >
                  <div className="p-2 bg-bg text-dev-green rounded-lg sm:rounded-xl shrink-0">
                    <skill.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-xs sm:text-sm truncate">{skill.name}</div>
                    <div className="mt-1 w-full bg-bg-tertiary h-1.5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-dev-green"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Skill Context Text */}
      <div className="mt-16 p-6 bg-bg-secondary/50 border border-bg-tertiary rounded-[2rem]">
        <h4 className="font-bold mb-4 text-dev-blue">In Summary</h4>
        <div className="space-y-2 text-fg-muted text-sm">
          {SKILLS_DATA.descriptions.map((desc, i) => (
            <p key={i}>• {desc}</p>
          ))}
        </div>
      </div>
    </section>
  );
};
