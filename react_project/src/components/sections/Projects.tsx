import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS_DATA, type ProjectCategory, type Project } from '../../data/portfolio';
import { Calendar, Github, Search, ArrowUpDown, Filter } from 'lucide-react';
import { TiltCard } from '../ui/TiltCard';
import { ProjectDetailsModal } from './ProjectDetailsModal';
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

type SortOption = 'newest' | 'oldest' | 'name';

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter and Sort Logic
  const filteredProjects = useMemo(() => {
    let result = PROJECTS_DATA;

    // Category Filter
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Search Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.techStack.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sorting
    return result.sort((a, b) => {
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      // Parse year (simple implementation, assumes 'YYYY' or 'YYYY - YYYY')
      const yearA = parseInt(a.year.split(' ')[0]);
      const yearB = parseInt(b.year.split(' ')[0]);
      return sortBy === 'newest' ? yearB - yearA : yearA - yearB;
    });
  }, [activeCategory, searchQuery, sortBy]);

  // Masonry Column Distribution (Client-side simple distribution)
  // We'll use CSS columns for simplicity and performance as it handles height variability best naturally
  // But to ensure LTR reading order if we cared deeply, we'd use JS. 
  // For this, standard CSS columns with `break-inside-avoid` is efficient and visually pleasing enough.

  return (
    <section className="min-h-screen px-6 py-20 max-w-[1600px] mx-auto relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
            Featured Work
          </h2>
          <p className="text-fg-muted max-w-2xl text-lg">
            A selection of projects that define my journey—from low-level systems programming to enterprise-scale architectures.
          </p>
        </div>
        
        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted group-focus-within:text-primary transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-bg-secondary border border-bg-tertiary rounded-xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none w-full sm:w-64 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2 bg-bg-secondary border border-bg-tertiary rounded-xl px-3 py-2.5">
            <ArrowUpDown size={16} className="text-fg-muted" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent border-none text-sm text-fg outline-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-10 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={clsx(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border flex items-center gap-2",
              activeCategory === cat.value
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105"
                : "bg-bg-secondary text-fg-muted border-bg-tertiary hover:border-primary/50 hover:text-fg hover:bg-bg-tertiary"
            )}
          >
            {activeCategory === cat.value && <Filter size={14} />}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Masonry Layout using CSS Columns */}
      <motion.div 
        layout
        className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6 pb-20"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            const styles = CATEGORY_STYLES[project.category];

            return (
              <motion.div
                key={project.title}
                layoutId={`project-${project.title}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="break-inside-avoid mb-6"
                onClick={() => setSelectedProject(project)}
              >
                <TiltCard
                  className="group relative rounded-3xl overflow-hidden cursor-pointer bg-bg-secondary border border-bg-tertiary shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-full hover:border-primary/40"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1"
                      loading="lazy"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent opacity-80" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                      <div className={clsx(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md shadow-sm",
                        styles.badge
                      )}>
                        {project.category}
                      </div>
                      
                      <div className="px-2.5 py-1 bg-bg/90 backdrop-blur-sm rounded-lg text-xs font-bold text-fg-muted flex items-center gap-1.5 shadow-sm border border-white/5">
                        <Calendar size={12} />
                        {project.year}
                      </div>
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="p-6 relative z-20 -mt-12">
                    <div className="p-5 bg-bg-secondary/95 backdrop-blur-xl rounded-2xl border border-white/5 shadow-lg group-hover:translate-y-[-5px] transition-transform duration-300">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="text-xl font-bold text-fg group-hover:text-primary transition-colors leading-tight">
                          {project.title}
                        </h3>
                        {project.github && (
                          <div className="p-1.5 rounded-lg bg-bg-tertiary text-fg-muted opacity-0 group-hover:opacity-100 transition-opacity">
                            <Github size={16} />
                          </div>
                        )}
                      </div>

                      <p className="text-sm text-fg-muted leading-relaxed line-clamp-2 mb-4 group-hover:text-fg transition-colors">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-dashed border-bg-tertiary">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-bg-tertiary/50 text-fg-muted border border-transparent group-hover:border-primary/20 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-bg-tertiary/50 text-fg-muted">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Overlay Action */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
                    <span className="px-6 py-2 bg-bg text-fg font-bold rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View Details
                    </span>
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
          className="flex flex-col items-center justify-center py-32 text-fg-muted"
        >
          <div className="w-20 h-20 bg-bg-secondary rounded-full flex items-center justify-center mb-4">
            <Search size={32} className="opacity-50" />
          </div>
          <h3 className="text-xl font-bold text-fg mb-2">No projects found</h3>
          <p>Try adjusting your search or filters.</p>
        </motion.div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

