import { motion } from 'framer-motion';
import type { Project } from '../../data/portfolio';
import { X, Github, ExternalLink, Calendar, Layers, Code, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import { useEffect } from 'react';

interface ProjectDetailsModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectDetailsModal = ({ project, onClose }: ProjectDetailsModalProps) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
      />
      
      <motion.div
        layoutId={`project-${project.title}`}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-bg-secondary rounded-3xl shadow-2xl border border-bg-tertiary flex flex-col custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-bg/50 hover:bg-bg-tertiary text-fg transition-colors backdrop-blur-md"
        >
          <X size={20} />
        </button>

        {/* Hero Image */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2 mb-3"
            >
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/20 text-primary border border-primary/20 backdrop-blur-md">
                {project.category}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-bg/40 text-fg-muted backdrop-blur-md border border-white/5">
                <Calendar size={12} />
                {project.year}
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-fg drop-shadow-lg"
            >
              {project.title}
            </motion.h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Main Info */}
          <div className="flex-1 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-fg mb-2 flex items-center gap-2">
                <Layers size={18} className="text-primary" />
                Overview
              </h3>
              <p className="text-fg-muted leading-relaxed text-base sm:text-lg">
                {project.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-fg mb-3 flex items-center gap-2">
                <Sparkles size={18} className="text-primary" />
                Key Highlights
              </h3>
              <ul className="grid gap-3">
                {project.highlights.map((highlight, idx) => (
                  <motion.li
                    key={highlight}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-bg-tertiary/50 border border-bg-tertiary"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-fg-muted text-sm sm:text-base">{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="w-full md:w-80 space-y-6">
            {/* Actions */}
            <div className="flex flex-col gap-3">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-bg-tertiary hover:bg-primary/20 hover:text-primary hover:border-primary/50 text-fg font-medium transition-all duration-300 border border-transparent"
                >
                  <Github size={18} />
                  View Source Code
                </a>
              ) : (
                <button disabled className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-bg-tertiary/50 text-fg-muted/50 cursor-not-allowed border border-transparent">
                  <Github size={18} />
                  Private Repository
                </button>
              )}
              
              <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 font-medium">
                <ExternalLink size={18} />
                Live Demo / Case Study
              </button>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-sm font-bold text-fg uppercase tracking-wider mb-3 flex items-center gap-2">
                <Code size={16} className="text-primary" />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-bg-tertiary text-fg-muted border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
