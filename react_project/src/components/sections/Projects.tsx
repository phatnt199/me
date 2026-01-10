import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS_DATA, type ProjectCategory } from '../../data/portfolio';
import { Calendar, Sparkles, Github, ExternalLink } from 'lucide-react';
import { TiltCard } from '../ui/TiltCard';
import clsx from 'clsx';

const CATEGORIES: { label: string; value: ProjectCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Finance', value: 'Finance' },
  { label: 'Enterprise', value: 'Enterprise' },
  { label: 'Backend', value: 'Backend' },
  { label: 'Web', value: 'Web' },
  { label: 'Mobile', value: 'Mobile' },
  { label: 'IoT', value: 'IoT' },
];

const CATEGORY_STYLES: Record<ProjectCategory, { badge: string; icon: string }> = {
  Finance: {
    badge: 'bg-dev-green/20 text-dev-green border-dev-green/30',
    icon: 'text-dev-green',
  },
  Enterprise: {
    badge: 'bg-dev-blue/20 text-dev-blue border-dev-blue/30',
    icon: 'text-dev-blue',
  },
  Web: {
    badge: 'bg-dev-orange/20 text-dev-orange border-dev-orange/30',
    icon: 'text-dev-orange',
  },
  Mobile: {
    badge: 'bg-dev-pink/20 text-dev-pink border-dev-pink/30',
    icon: 'text-dev-pink',
  },
  IoT: {
    badge: 'bg-dev-yellow/20 text-dev-yellow border-dev-yellow/30',
    icon: 'text-dev-yellow',
  },
  Backend: {
    badge: 'bg-dev-red/20 text-dev-red border-dev-red/30',
    icon: 'text-dev-red',
  },
};

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all');

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === activeCategory);

  return (
    <section className="min-h-screen px-6 py-20 max-w-[1600px] mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">What I Did</h2>
        <div className="w-20 h-1 bg-primary rounded-full" />
      </div>

      {/* Category Filter */}
      <div className="mb-6 sm:mb-10 flex flex-wrap gap-1.5 sm:gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={clsx(
              "px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 border",
              activeCategory === cat.value
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/25"
                : "bg-bg-secondary text-fg-muted border-bg-tertiary hover:border-primary/50 hover:text-fg"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-8 auto-rows-max pb-20 md:pb-0"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const styles = CATEGORY_STYLES[project.category];

            return (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <TiltCard
                  className="group relative rounded-2xl sm:rounded-[2rem] overflow-hidden cursor-pointer bg-bg-secondary border border-bg-tertiary shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 flex flex-col h-full hover:border-primary/30"
                >
                  {/* Image Container */}
                  <div className="aspect-video overflow-hidden bg-bg-tertiary relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-3 sm:p-5">
                      <p className="text-xs sm:text-sm text-fg leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Year Badge */}
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 px-2 py-0.5 sm:px-3 sm:py-1 bg-bg/80 backdrop-blur-sm rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold flex items-center gap-1 sm:gap-1.5 text-fg-muted">
                      <Calendar size={10} className="sm:w-3 sm:h-3" />
                      {project.year}
                    </div>

                    {/* Category Badge */}
                    <div className={clsx(
                      "absolute top-2 left-2 sm:top-4 sm:left-4 px-2 py-0.5 sm:px-3 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider border",
                      styles.badge
                    )}>
                      {project.category}
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="p-4 sm:p-6 flex flex-col flex-1 bg-bg-secondary">
                    <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                      <h3 className="text-base sm:text-lg font-bold text-fg group-hover:text-primary transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={clsx(
                            "flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs font-medium transition-all duration-300 shrink-0",
                            "bg-bg-tertiary text-fg-muted hover:bg-fg hover:text-bg"
                          )}
                        >
                          <Github size={14} />
                          <span className="hidden sm:inline">View</span>
                          <ExternalLink size={10} className="hidden sm:inline" />
                        </a>
                      )}
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                      {project.highlights.slice(0, 2).map((highlight) => (
                        <span
                          key={highlight}
                          className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 bg-bg text-[10px] sm:text-xs text-fg-muted rounded-md"
                        >
                          <Sparkles size={8} className={clsx("sm:w-2.5 sm:h-2.5", styles.icon)} />
                          <span className="truncate max-w-[80px] sm:max-w-none">{highlight}</span>
                        </span>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="mt-auto pt-3 sm:pt-4 border-t border-bg-tertiary">
                      <div className="flex flex-wrap gap-1 sm:gap-1.5">
                        {project.techStack.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className={clsx(
                              "px-1.5 sm:px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-medium rounded-md transition-colors",
                              "bg-bg-tertiary text-fg-muted group-hover:text-fg"
                            )}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 5 && (
                          <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-medium rounded-md bg-bg-tertiary text-fg-muted">
                            +{project.techStack.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-fg-muted"
        >
          <p>No projects found in this category.</p>
        </motion.div>
      )}
    </section>
  );
};
