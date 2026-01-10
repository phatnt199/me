import { motion } from 'framer-motion';
import { CONTACT_DATA, HERO_DATA } from '../../data/portfolio';
import { ArrowUpRight, MapPin, Clock, Sparkles, Coffee, Handshake, Lightbulb, Code2 } from 'lucide-react';
import clsx from 'clsx';
import { Magnetic } from '../ui/Magnetic';

const SERVICES = [
  { icon: Code2, label: 'System Architecture', color: 'text-dev-blue' },
  { icon: Lightbulb, label: 'Technical Consulting', color: 'text-dev-yellow' },
  { icon: Handshake, label: 'Team Leadership', color: 'text-dev-green' },
  { icon: Coffee, label: 'Code Review & Mentoring', color: 'text-dev-orange' },
];

const CONTACT_COLORS: Record<string, { bg: string; hover: string; shadow: string }> = {
  Email: { bg: 'bg-dev-red/10', hover: 'group-hover:bg-dev-red', shadow: 'group-hover:shadow-dev-red/25' },
  Messenger: { bg: 'bg-dev-blue/10', hover: 'group-hover:bg-dev-blue', shadow: 'group-hover:shadow-dev-blue/25' },
  Telegram: { bg: 'bg-dev-green/10', hover: 'group-hover:bg-dev-green', shadow: 'group-hover:shadow-dev-green/25' },
  Teams: { bg: 'bg-dev-pink/10', hover: 'group-hover:bg-dev-pink', shadow: 'group-hover:shadow-dev-pink/25' },
};

export const Contact = () => {
  return (
    <section className="min-h-screen px-6 py-20 max-w-6xl mx-auto flex flex-col justify-center relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 -left-32 w-72 h-72 bg-dev-blue/5 rounded-full blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
        <div className="w-20 h-1 bg-primary rounded-full" />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Left Column - Info */}
        <div className="space-y-6 sm:space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Let's build <br />
              <span className="text-primary">something great.</span>
            </h3>
            <p className="text-base sm:text-lg text-fg-muted max-w-md leading-relaxed">
              Looking for a technical partner who understands both code and business?
              Let's discuss how I can help turn your vision into reality.
            </p>
          </motion.div>

          {/* Location & Timezone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 sm:gap-4"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-bg-secondary rounded-lg sm:rounded-xl border border-bg-tertiary">
              <MapPin size={14} className="sm:w-4 sm:h-4 text-dev-pink" />
              <span className="text-xs sm:text-sm">{HERO_DATA.location}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-bg-secondary rounded-lg sm:rounded-xl border border-bg-tertiary">
              <Clock size={14} className="sm:w-4 sm:h-4 text-dev-blue" />
              <span className="text-xs sm:text-sm">UTC+7 (ICT)</span>
            </div>
          </motion.div>

          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-5 sm:py-3 bg-dev-green/10 rounded-xl sm:rounded-2xl border border-dev-green/20"
          >
            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dev-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-dev-green"></span>
            </span>
            <span className="text-dev-green font-bold text-xs sm:text-sm tracking-wider">AVAILABLE FOR PROJECTS</span>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-xs sm:text-sm font-bold text-fg-muted uppercase tracking-widest mb-3 sm:mb-4 flex items-center gap-2">
              <Sparkles size={12} className="sm:w-3.5 sm:h-3.5 text-dev-yellow" />
              What I can help with
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {SERVICES.map((service) => (
                <div
                  key={service.label}
                  className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-bg-secondary/50 rounded-lg sm:rounded-xl border border-bg-tertiary hover:border-primary/30 transition-colors"
                >
                  <service.icon size={16} className={clsx("sm:w-[18px] sm:h-[18px]", service.color)} />
                  <span className="text-xs sm:text-sm font-medium">{service.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Contact Cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
          }}
          className="grid grid-cols-2 gap-3 sm:gap-4"
        >
          {CONTACT_DATA.map((contact) => {
            const Icon = contact.icon;
            const colors = CONTACT_COLORS[contact.name] || CONTACT_COLORS.Email;

            return (
              <Magnetic key={contact.name}>
                <motion.a
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.95 },
                    show: { opacity: 1, y: 0, scale: 1 }
                  }}
                  whileHover={{ y: -8 }}
                  className={clsx(
                    "group relative p-4 sm:p-6 bg-bg-secondary border border-bg-tertiary rounded-2xl sm:rounded-[2rem] flex flex-col items-center gap-2 sm:gap-4",
                    "hover:border-primary/50 transition-all duration-300 hover:shadow-2xl",
                    colors.shadow
                  )}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className={clsx(
                    "relative p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300",
                    colors.bg,
                    colors.hover,
                    "group-hover:text-white group-hover:shadow-lg"
                  )}>
                    <Icon size={22} className="sm:w-7 sm:h-7" />
                  </div>

                  <div className="text-center relative min-w-0 w-full">
                    <div className="font-bold text-sm sm:text-base text-fg mb-0.5 sm:mb-1 group-hover:text-primary transition-colors">
                      {contact.name}
                    </div>
                    <div className="text-[10px] sm:text-xs text-fg-muted truncate px-1">
                      {contact.address}
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <ArrowUpRight size={14} className="sm:w-4 sm:h-4 text-primary" />
                  </div>
                </motion.a>
              </Magnetic>
            );
          })}
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-12 sm:mt-20 p-5 sm:p-8 bg-gradient-to-r from-bg-secondary to-bg-tertiary/50 rounded-2xl sm:rounded-[2rem] border border-bg-tertiary text-center"
      >
        <p className="text-sm sm:text-base text-fg-muted mb-3 sm:mb-4">Ready to discuss your next project?</p>
        <a
          href={CONTACT_DATA[0]?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-primary text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-bold hover:bg-dev-green transition-colors shadow-lg shadow-primary/25 hover:shadow-dev-green/25"
        >
          Get in Touch
          <ArrowUpRight size={16} className="sm:w-[18px] sm:h-[18px]" />
        </a>
      </motion.div>

      {/* Footer */}
      <footer className="mt-12 sm:mt-20 pt-6 sm:pt-8 border-t border-bg-tertiary">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-fg-muted">
          <p>© {new Date().getFullYear()} Phat Nguyen. All rights reserved.</p>
          <p className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <span>Built with</span>
            <span className="text-dev-red">passion</span>
            <span>+</span>
            <span className="text-dev-pink">love</span>
            <span className="text-fg-muted">— waiting for your contact</span>
          </p>
        </div>
      </footer>
    </section>
  );
};
