// components/SidebarContext.tsx
import React, { createContext, useContext, useState } from 'react';

type SidebarType = 'default' | 'itinerary';

interface SidebarContextType {
  sidebar: SidebarType;
  setSidebar: (type: SidebarType) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebar, setSidebar] = useState<SidebarType>('default');

  return (
    <SidebarContext.Provider value={{ sidebar, setSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error('useSidebar must be used within SidebarProvider');
  return context;
};
