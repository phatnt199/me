import { useState } from 'react';
import { motion, LayoutGroup, AnimatePresence, useMotionValue, animate } from 'framer-motion';
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
  
  const width = typeof window !== 'undefined' ? window.innerWidth : 375;
  const height = typeof window !== 'undefined' ? window.innerHeight : 800;

  const x = useMotionValue(0); 
  const y = useMotionValue(0);
  
  const handleNavClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const activeItem = NAV_ITEMS.find(item => item.path === location.pathname);
  const activeColors = activeItem ? NAV_COLORS[activeItem.color] : NAV_COLORS['dev-red'];

  const EDGE_MARGIN = 4;
  const BUTTON_SIZE = 56;
  const leftSnap = -(width - (EDGE_MARGIN * 2) - BUTTON_SIZE);
  const rightSnap = 0;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-bg/60 backdrop-blur-md z-50 flex items-center justify-center"
            onClick={() => setIsOpen(false)}
          >
            {/* Expanded Menu (Hero Animation Target) */}
            <motion.div
              layoutId="menu-container"
              className="bg-bg-secondary/90 backdrop-blur-xl border border-bg-tertiary shadow-2xl w-[280px] overflow-hidden"
              style={{ borderRadius: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6"
              >
                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary mb-3 shadow-lg">
                    <img src={HERO_DATA.avatar} alt="Phat Nguyen" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-lg text-primary">Phat Nguyen</h3>
                    <p className="text-xs text-fg-muted font-mono tracking-wider uppercase">Solution Architect</p>
                  </div>
                </div>

                {/* Grid Menu */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {NAV_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;
                    const colors = NAV_COLORS[item.color];
                    return (
                      <button
                        key={item.name}
                        onClick={() => handleNavClick(item.path)}
                        className="flex flex-col items-center gap-2 group"
                      >
                        <div className={clsx(
                          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm",
                          isActive 
                            ? [colors.bg, "text-white shadow-md scale-110"] 
                            : "bg-bg-tertiary text-fg-muted group-hover:bg-bg group-hover:text-fg"
                        )}>
                          <item.icon size={20} />
                        </div>
                        <span className={clsx(
                          "text-[10px] font-medium transition-colors",
                          isActive ? "text-fg" : "text-fg-muted"
                        )}>
                          {item.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-bg-tertiary/50">
                  <button 
                    onClick={toggleTheme}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-bg-tertiary/50 text-fg-muted hover:bg-bg-tertiary hover:text-fg transition-all text-xs font-medium"
                  >
                    {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    {theme === 'dark' ? 'Light' : 'Dark'}
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-bg-tertiary/50 text-fg-muted hover:bg-dev-red/10 hover:text-dev-red transition-all text-xs font-medium"
                  >
                    <X size={16} />
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button (Draggable Source) */}
      {!isOpen && (
        <motion.div 
          className="md:hidden fixed z-50"
          style={{ bottom: EDGE_MARGIN, right: EDGE_MARGIN, x, y }}
          drag
          dragMomentum={false}
          dragElastic={0.1}
          dragConstraints={{ 
            left: leftSnap, 
            right: rightSnap, 
            top: -(height - EDGE_MARGIN * 2 - BUTTON_SIZE), 
            bottom: 0 
          }}
        onDragEnd={() => {
          // Snap X to nearest edge, leave Y free (momentum)
          const currentX = x.get();
          // Midpoint between leftSnap (negative) and rightSnap (0)
          const midPoint = leftSnap / 2;
          
          const targetX = currentX < midPoint ? leftSnap : rightSnap;
          
          animate(x, targetX, { type: "spring", stiffness: 300, damping: 30 });
        }}
        dragTransition={{
          power: 0.2,
          timeConstant: 200
        }}
      >
          <motion.button
            layoutId="menu-container"
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className={clsx(
              "w-14 h-14 flex items-center justify-center shadow-2xl relative",
              [activeColors.bg, "text-white", activeColors.shadow]
            )}
            style={{ borderRadius: 16 }}
          >
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Menu size={26} />
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </>
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