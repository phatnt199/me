import React, { createContext, useContext, useEffect, useState } from 'react';

export type SidebarPosition = 'left' | 'right' | 'top' | 'bottom';

interface SidebarContextType {
  position: SidebarPosition;
  setPosition: (pos: SidebarPosition) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [position, setPosition] = useState<SidebarPosition>(() => {
    return (localStorage.getItem('sidebarPosition') as SidebarPosition) || 'left';
  });

  useEffect(() => {
    localStorage.setItem('sidebarPosition', position);
  }, [position]);

  return (
    <SidebarContext.Provider value={{ position, setPosition }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
