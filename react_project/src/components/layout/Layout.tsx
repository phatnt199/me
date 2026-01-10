import { useState } from 'react';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import {
  Home,
  User,
  Briefcase,
  Code,
  Layers,
  Mail,
  Sun,
  Moon,
  PanelLeft,
  PanelRight,
  PanelTop,
  PanelBottom,
  Menu,
  X
} from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useSidebar, type SidebarPosition } from '../../context/SidebarContext';
import { Magnetic } from '../ui/Magnetic';
import { HERO_DATA } from '../../data/portfolio';
import clsx from 'clsx';

const NAV_COLORS: Record<string, { text: string; bg: string; shadow: string; hoverText: string }> = {
  'dev-red': { text: 'text-dev-red', bg: 'bg-dev-red', shadow: 'shadow-dev-red/20', hoverText: 'group-hover:text-dev-red' },
  'dev-blue': { text: 'text-dev-blue', bg: 'bg-dev-blue', shadow: 'shadow-dev-blue/20', hoverText: 'group-hover:text-dev-blue' },
  'dev-orange': { text: 'text-dev-orange', bg: 'bg-dev-orange', shadow: 'shadow-dev-orange/20', hoverText: 'group-hover:text-dev-orange' },
  'dev-yellow': { text: 'text-dev-yellow', bg: 'bg-dev-yellow', shadow: 'shadow-dev-yellow/20', hoverText: 'group-hover:text-dev-yellow' },
  'dev-pink': { text: 'text-dev-pink', bg: 'bg-dev-pink', shadow: 'shadow-dev-pink/20', hoverText: 'group-hover:text-dev-pink' },
  'dev-green': { text: 'text-dev-green', bg: 'bg-dev-green', shadow: 'shadow-dev-green/20', hoverText: 'group-hover:text-dev-green' },
};

const NAV_ITEMS = [
  { name: 'Home', path: '/', icon: Home, color: 'dev-red' },
  { name: 'About', path: '/about', icon: User, color: 'dev-blue' },
  { name: 'Experience', path: '/experience', icon: Briefcase, color: 'dev-orange' },
  { name: 'Skills', path: '/skills', icon: Code, color: 'dev-yellow' },
  { name: 'Projects', path: '/projects', icon: Layers, color: 'dev-pink' },
  { name: 'Contact', path: '/contact', icon: Mail, color: 'dev-green' },
];

export const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();
  const { position, setPosition } = useSidebar();
  const location = useLocation();

  const isVertical = position === 'left' || position === 'right';

  // Dynamic positioning styles
  const positionStyles = {
    left: 'left-0 top-0 h-screen w-80 flex-col',
    right: 'right-0 top-0 h-screen w-80 flex-col',
    top: 'top-0 left-0 right-0 h-auto w-full flex-row',
    bottom: 'bottom-0 left-0 right-0 h-auto w-full flex-row',
  };

  return (
    <aside 
      className={clsx(
        "hidden md:flex fixed z-50 p-4 transition-all duration-500 ease-in-out",
        positionStyles[position]
      )}
    >
      <div 
        className={clsx(
          "flex-1 flex bg-bg-secondary/50 backdrop-blur-xl border border-bg-tertiary shadow-2xl overflow-hidden transition-all duration-500",
          isVertical ? "flex-col rounded-[2rem]" : "flex-row items-center rounded-[1.5rem] px-6 py-2"
        )}
      >
        <div className={clsx("flex items-center relative group shrink-0", isVertical ? "p-8 flex-col" : "mr-8 gap-4")}>
          {/* Avatar */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className={clsx(
              "rounded-full overflow-hidden border-4 border-primary shadow-lg shadow-primary/20 relative z-10 transition-all",
              isVertical ? "w-24 h-24 mb-4" : "w-12 h-12 border-2"
            )}
          >
            <img src={HERO_DATA.avatar} alt="Phat Nguyen" className="w-full h-full object-cover" />
          </motion.div>
          
          <div className={clsx("text-center", !isVertical && "text-left")}>
            <h2 className={clsx("font-bold text-primary transition-all", isVertical ? "text-xl" : "text-lg leading-none")}>
              {isVertical ? "Phat Nguyen" : "PhatNT"}
            </h2>
            {isVertical && (
                        <p className="text-sm text-fg-muted font-mono bg-bg-tertiary px-2 py-1 rounded mt-2 text-[10px] tracking-widest uppercase">
                          Solution Architect
                        </p>            )}
          </div>
        </div>

        <nav className={clsx("flex-1", isVertical ? "px-4 py-6 space-y-3 overflow-y-auto no-scrollbar" : "flex justify-center gap-2")}>
          <LayoutGroup>
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              const colors = NAV_COLORS[item.color];

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={clsx(
                    "relative flex items-center justify-center rounded-2xl transition-all duration-300 group z-10 overflow-hidden",
                    isVertical ? "gap-4 px-4 py-3 w-full" : "px-3 py-2 flex-col gap-1 min-w-[5rem]",
                    isActive ? "text-white" : "text-fg-muted hover:text-fg"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className={clsx("absolute inset-0 -z-10 shadow-lg", colors.bg, colors.shadow, isVertical ? "rounded-2xl" : "rounded-xl")}
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <motion.div whileHover={isVertical ? { x: 3 } : { y: -2 }}>
                    <item.icon size={isVertical ? 20 : 18} className={clsx(isActive ? "text-white" : [colors.hoverText, "transition-colors"])} />
                  </motion.div>
                  {isVertical && (
                    <span className="font-medium w-24 text-left font-mono relative">
                      {item.name}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </LayoutGroup>
        </nav>

        <div className={clsx("border-bg-tertiary shrink-0 flex gap-2", isVertical ? "p-6 border-t flex-col" : "ml-8 border-l pl-6 items-center")}>
          {/* Position Switcher */}
          <div className={clsx("flex bg-bg-tertiary rounded-xl p-1", isVertical ? "justify-between" : "gap-1")}>
            {(['left', 'bottom', 'top', 'right'] as SidebarPosition[]).map((pos) => (
              <button
                key={pos}
                onClick={() => setPosition(pos)}
                className={clsx(
                  "p-2 rounded-lg transition-all",
                  position === pos ? "bg-bg text-primary shadow-sm" : "text-fg-muted hover:text-fg"
                )}
              >
                {pos === 'left' && <PanelLeft size={16} />}
                {pos === 'right' && <PanelRight size={16} />}
                {pos === 'top' && <PanelTop size={16} />}
                {pos === 'bottom' && <PanelBottom size={16} />}
              </button>
            ))}
          </div>

          <Magnetic>
            <button
              onClick={toggleTheme}
              className={clsx(
                "flex items-center justify-center gap-3 rounded-2xl bg-bg-tertiary hover:bg-bg text-fg hover:text-primary transition-all duration-300 border border-transparent hover:border-bg-tertiary group",
                isVertical ? "w-full px-4 py-3" : "p-3"
              )}
            >
              <motion.div 
                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </motion.div>
              {isVertical && (
                <span className="text-sm font-medium font-mono group-hover:tracking-wider transition-all">
                  {theme === 'dark' ? 'Light' : 'Dark'}
                </span>
              )}
            </button>
          </Magnetic>
        </div>
      </div>
    </aside>
  );
};

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  // Find current active item for FAB color
  const activeItem = NAV_ITEMS.find(item => item.path === location.pathname);
  const activeColors = activeItem ? NAV_COLORS[activeItem.color] : NAV_COLORS['dev-red'];

  return (
    <div className="md:hidden fixed bottom-6 right-6 z-50">
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg/80 backdrop-blur-sm -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Menu Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-14 right-0 bg-bg-secondary/95 backdrop-blur-xl border border-bg-tertiary rounded-2xl p-3 shadow-2xl min-w-[200px]"
          >
            {/* Avatar & Name */}
            <div className="flex items-center gap-3 px-3 py-3 border-b border-bg-tertiary mb-2">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                <img src={HERO_DATA.avatar} alt="Phat Nguyen" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-bold text-primary text-sm">Phat Nguyen</div>
                <div className="text-[10px] text-fg-muted font-mono">Solution Architect</div>
              </div>
            </div>

            {/* Nav Items */}
            <div className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path;
                const colors = NAV_COLORS[item.color];

                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.path)}
                    className={clsx(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                      isActive
                        ? [colors.bg, "text-white shadow-lg", colors.shadow]
                        : "text-fg-muted hover:bg-bg-tertiary hover:text-fg"
                    )}
                  >
                    <item.icon size={18} />
                    <span className="font-mono text-sm font-medium">{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Theme Toggle */}
            <div className="mt-2 pt-2 border-t border-bg-tertiary">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-fg-muted hover:bg-bg-tertiary hover:text-fg transition-all"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                <span className="font-mono text-sm font-medium">
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "w-11 h-11 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300",
          isOpen
            ? "bg-bg-secondary border border-bg-tertiary text-fg rotate-0"
            : [activeColors.bg, "text-white", activeColors.shadow]
        )}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.div>
      </motion.button>
    </div>
  );
};

import { Spotlight } from '../ui/Spotlight';
import { ScrollProgress } from '../ui/ScrollProgress';
import { Particles } from '../ui/Particles';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { position } = useSidebar();

  const mainStyles = {
    left: 'md:ml-80 pb-0 md:pb-0 pt-0 md:pt-0',
    right: 'md:mr-80 pb-0 md:pb-0 pt-0 md:pt-0',
    top: 'md:mt-32 pb-0 md:pb-0 pt-0 md:pt-0',
    bottom: 'md:mb-32 pb-0 md:pb-0 pt-0 md:pt-0',
  };

  return (
    <div className="min-h-screen bg-bg text-fg transition-colors duration-300 font-sans relative">
      <ScrollProgress />
      <Particles />
      <Spotlight />
      <Sidebar />

      <main className={clsx("min-h-screen transition-all duration-500 ease-in-out", mainStyles[position])}>
        {children}
      </main>

      <MobileNav />
    </div>
  );
};
