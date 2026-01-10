import { motion, LayoutGroup } from 'framer-motion';
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
  PanelBottom
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useSidebar, type SidebarPosition } from '../../context/SidebarContext';
import { Magnetic } from '../ui/Magnetic';
import clsx from 'clsx';

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
            <img src="/images/profile-2.jpg" alt="Phat Nguyen" className="w-full h-full object-cover" />
          </motion.div>
          
          <div className={clsx("text-center", !isVertical && "text-left")}>
            <h2 className={clsx("font-bold text-fg transition-all", isVertical ? "text-xl" : "text-lg leading-none")}>
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
                      className={clsx("absolute inset-0 -z-10 shadow-lg", `bg-${item.color} shadow-${item.color}/20`, isVertical ? "rounded-2xl" : "rounded-xl")}
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <motion.div whileHover={isVertical ? { x: 3 } : { y: -2 }}>
                    <item.icon size={isVertical ? 20 : 18} className={clsx(isActive ? "text-white" : `group-hover:text-${item.color} transition-colors`)} />
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
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-bg-secondary/95 backdrop-blur-xl border-t border-bg-tertiary z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-between items-center px-4 py-3">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                "flex flex-col items-center justify-center p-1 min-w-[3.5rem] transition-all duration-300",
                isActive ? `text-${item.color}` : "text-fg-muted hover:text-fg"
              )
            }
          >
            {({ isActive }) => (
              <>
                <motion.div 
                  whileTap={{ scale: 0.8 }}
                  animate={isActive ? { y: -2 } : { y: 0 }}
                >
                  <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </motion.div>
                <span className={clsx(
                  "text-[10px] mt-1 font-medium transition-opacity",
                  isActive ? "opacity-100 font-bold" : "opacity-70"
                )}>
                  {item.name}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

import { Spotlight } from '../ui/Spotlight';
import { ScrollProgress } from '../ui/ScrollProgress';
import { Particles } from '../ui/Particles';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { position } = useSidebar();

  const mainStyles = {
    left: 'md:ml-80 pb-24 md:pb-0 pt-16 md:pt-0',
    right: 'md:mr-80 pb-24 md:pb-0 pt-16 md:pt-0',
    top: 'md:mt-32 pb-24 md:pb-0 pt-16 md:pt-0', // Top bar height approx
    bottom: 'md:mb-32 pb-24 md:pb-0 pt-16 md:pt-0', // Bottom bar height
  };

  return (
    <div className="min-h-screen bg-bg text-fg transition-colors duration-300 font-sans relative">
      <ScrollProgress />
      <Particles />
      <Spotlight />
      <Sidebar />
      
      {/* Mobile Top Bar for Theme Toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-bg/80 backdrop-blur-md z-40 flex items-center justify-between px-6 border-b border-bg-tertiary">
        <span className="font-bold text-lg text-primary">PhatNT</span>
        <ThemeToggleMobile />
      </div>

      <main className={clsx("min-h-screen transition-all duration-500 ease-in-out", mainStyles[position])}>
        {children}
      </main>
      
      <MobileNav />
    </div>
  );
};

const ThemeToggleMobile = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-bg-tertiary text-fg hover:text-primary transition-colors"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};
