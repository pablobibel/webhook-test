
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { User, SystemHealth } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  systemHealth: SystemHealth;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, systemHealth, onLogout }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#f0eee9] flex overflow-hidden">
      <Sidebar 
        user={user} 
        systemHealth={systemHealth} 
        onLogout={onLogout} 
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      {/* El margen izquierdo dinámico + el padding de 24px (p-6) crea el "blank space" solicitado */}
      <main className={`flex-1 transition-[margin-left] duration-300 ease-in-out h-screen overflow-y-auto will-change-[margin-left] ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <div className="p-8 animate-in fade-in duration-500 text-slate-800">
          <div className="max-w-screen-2xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
