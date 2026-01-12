import { motion } from 'framer-motion';
import { SKILLS_DATA } from '../../data/portfolio';
import clsx from 'clsx';
import { TiltCard } from '../ui/TiltCard';
import { Cpu, Globe, Database, Terminal, Code2, Coffee, Zap } from 'lucide-react';

// Map icons for categories
const CATEGORY_ICONS: Record<string, any> = {
  Languages: Code2,
  Frameworks: Globe,
  Persistence: Database,
  Infrastructure: Terminal,
};

const CATEGORY_COLORS: Record<string, string> = {
  Languages: 'text-dev-blue',
  Frameworks: 'text-dev-pink',
  Persistence: 'text-dev-green',
  Infrastructure: 'text-dev-orange',
};

export const Skills = () => {
  return (
    <section className="min-h-screen px-6 py-20 max-w-[1600px] mx-auto relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-dev-blue/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-dev-blue">
            Technical Arsenal
          </h2>
          <p className="text-fg-muted max-w-2xl text-lg sm:text-xl leading-relaxed">
            I don't just write code; I architect ecosystems. From bare-metal performance optimization to distributed cloud-native systems.
          </p>
        </motion.div>
      </div>

      <div className="space-y-24 md:space-y-32">
        
        {/* Section 1: Core Architecture (Progress Cards) */}
        <div>
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-10 flex items-center gap-3 text-fg"
          >
            <Cpu className="text-primary" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-fg to-fg-muted">
              Core Competencies
            </span>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS_DATA.technical.map((skill, idx) => {
              const colors = ["text-dev-red", "text-dev-orange", "text-dev-yellow", "text-dev-green", "text-dev-blue", "text-dev-pink"];
              const colorClass = colors[idx % colors.length];
              const bgClass = colorClass.replace('text-', 'bg-');

              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <TiltCard className="p-6 h-full bg-bg-secondary/50 border border-bg-tertiary rounded-2xl hover:border-primary/30 transition-all duration-300 group">
                    <div className="flex items-start justify-between mb-6">
                      <div className={clsx("p-3 rounded-xl bg-bg-tertiary/50 group-hover:scale-110 transition-transform duration-300", colorClass)}>
                        <skill.icon size={24} />
                      </div>
                      <span className={clsx("text-2xl font-bold font-mono opacity-50 group-hover:opacity-100 transition-opacity", colorClass)}>
                        {Math.round(skill.level * 100)}%
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-bold mb-4 text-fg group-hover:text-primary transition-colors">
                      {skill.name}
                    </h4>

                    {/* Custom Progress Bar */}
                    <div className="relative h-2 w-full bg-bg-tertiary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level * 100}%` }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 + (idx * 0.1) }}
                        className={clsx("absolute top-0 left-0 h-full rounded-full", bgClass)}
                      />
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Toolchain Clusters */}
        <div>
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-10 flex items-center gap-3 text-fg"
          >
            <Terminal className="text-dev-blue" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-fg to-fg-muted">
              Tech Stack & Tools
            </span>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {SKILLS_DATA.languages.map((group, groupIdx) => {
              const Icon = CATEGORY_ICONS[group.category] || Terminal;
              const colorClass = CATEGORY_COLORS[group.category] || 'text-fg';

              return (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: groupIdx * 0.1 }}
                  className="bg-bg-secondary/30 border border-bg-tertiary rounded-3xl p-6 hover:bg-bg-secondary/50 transition-colors backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Icon className={clsx("w-5 h-5", colorClass)} />
                    <h4 className="font-bold text-fg tracking-wide uppercase text-sm">
                      {group.category}
                    </h4>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item, itemIdx) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: (groupIdx * 0.1) + (itemIdx * 0.05) }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className={clsx(
                          "px-3 py-1.5 rounded-lg text-xs font-medium border border-bg-tertiary bg-bg/50 text-fg-muted cursor-default transition-all hover:border-primary/30 hover:text-fg hover:shadow-lg hover:shadow-primary/5",
                        )}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Leadership & Soft Skills */}
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left: Soft Skills Grid */}
          <div className="lg:col-span-7">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-10 flex items-center gap-3 text-fg"
            >
              <Coffee className="text-dev-green" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-fg to-fg-muted">
                Leadership & Strategy
              </span>
            </motion.h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILLS_DATA.soft.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-bg-secondary border border-bg-tertiary hover:border-dev-green/50 transition-all duration-300"
                >
                  <div className="p-3 rounded-lg bg-dev-green/10 text-dev-green group-hover:scale-110 transition-transform">
                    <skill.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-sm text-fg">{skill.name}</span>
                      <span className="text-xs font-mono text-dev-green opacity-0 group-hover:opacity-100 transition-opacity">
                        {Math.round(skill.level * 100)}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-bg-tertiary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-dev-green"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Summary Box */}
          <div className="lg:col-span-5 flex items-end">
            <TiltCard className="w-full p-8 rounded-3xl bg-gradient-to-br from-bg-secondary to-bg border border-bg-tertiary relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <Zap size={120} />
              </div>
              
              <h4 className="text-xl font-bold mb-6 text-dev-blue flex items-center gap-2">
                <Terminal size={20} />
                Philosophy
              </h4>
              
              <div className="space-y-4">
                {SKILLS_DATA.descriptions.map((desc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className="flex gap-3 text-sm leading-relaxed text-fg-muted"
                  >
                    <span className="text-dev-blue mt-1">▹</span>
                    <p>{desc}</p>
                  </motion.div>
                ))}
              </div>
            </TiltCard>
          </div>
        </div>

      </div>
    </section>
  );
};

