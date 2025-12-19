
import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Newspaper, 
  AlertOctagon, 
  Settings, 
  ShieldCheck, 
  LogOut,
  User as UserIcon,
  Bot,
  Bug,
  Siren,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  FileText,
  BrainCircuit
} from 'lucide-react';
import { User, SystemHealth } from '../types';
import { StatusWidget } from './StatusWidget';

interface SidebarProps {
  user: User;
  systemHealth: SystemHealth;
  onLogout: () => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ user, systemHealth, onLogout, isCollapsed, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [socOpen, setSocOpen] = useState(true);

  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <aside className={`fixed left-0 top-0 h-screen transition-all duration-300 ease-in-out bg-[#0b1221] text-white flex flex-col shadow-2xl z-50 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      
      {/* Botón de colapso con flecha */}
      <button 
        onClick={onToggle}
        className="absolute -right-3 top-12 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-[#0b1221] text-white hover:bg-blue-500 transition-colors shadow-lg z-50"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Brand & User Integrated Area */}
      <div className={`p-5 border-b border-slate-700/30 overflow-hidden`}>
        <div className={`flex items-center gap-3 text-blue-400 ${isCollapsed ? 'justify-center' : 'mb-3'}`}>
          <ShieldCheck size={isCollapsed ? 28 : 24} className="flex-shrink-0" />
          {!isCollapsed && (
            <h1 className="font-bold text-base leading-tight tracking-tight whitespace-nowrap">
              MechaSystem
              <span className="block text-slate-400 text-[10px] font-normal tracking-widest uppercase">IntelliSuite</span>
            </h1>
          )}
        </div>
        
        {/* User Info integrado y pequeño */}
        {!isCollapsed && (
          <div className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-lg p-1.5 animate-in fade-in slide-in-from-left-2 duration-300">
            <div className="w-7 h-7 rounded-md bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
               <UserIcon size={14} />
            </div>
            <div className="min-w-0">
               <p className="text-[10px] font-bold text-white truncate leading-tight">
                {user.firstName} {user.lastName}
               </p>
               <p className="text-[8px] text-slate-500 font-mono uppercase tracking-tighter truncate">
                {user.role} • {user.jobTitle}
               </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto overflow-x-hidden">
        
        <NavLink to="/" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'} ${isCollapsed ? 'justify-center' : ''}`}>
            <LayoutDashboard size={20} className="flex-shrink-0" /> 
            {!isCollapsed && <span className="truncate">Dashboard</span>}
        </NavLink>

        <NavLink to="/intelligence" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'} ${isCollapsed ? 'justify-center' : ''}`}>
            <BrainCircuit size={20} className="flex-shrink-0" /> 
            {!isCollapsed && <span className="truncate">Intelligence</span>}
        </NavLink>

        <NavLink to="/chatbot" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'} ${isCollapsed ? 'justify-center' : ''}`}>
            <Bot size={20} className="flex-shrink-0" /> 
            {!isCollapsed && <span className="truncate">Assistant AI</span>}
        </NavLink>

        <NavLink to="/news" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'} ${isCollapsed ? 'justify-center' : ''}`}>
            <Newspaper size={20} className="flex-shrink-0" /> 
            {!isCollapsed && <span className="truncate">Noticias</span>}
        </NavLink>

        <NavLink to="/vulnerabilities" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'} ${isCollapsed ? 'justify-center' : ''}`}>
            <Bug size={20} className="flex-shrink-0" /> 
            {!isCollapsed && <span className="truncate">Vulnerabilidades</span>}
        </NavLink>

        {/* SOC Group */}
        <div className="pt-2 overflow-hidden">
          {!isCollapsed && (
            <button 
              onClick={() => setSocOpen(!socOpen)}
              className="flex items-center justify-between w-full px-3 py-2 text-[9px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-300 transition-colors"
            >
              <span>SOC Operations</span>
              {socOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            </button>
          )}
          
          {(socOpen || isCollapsed) && (
            <div className={`space-y-1 ${!isCollapsed ? 'mt-1 ml-1' : 'mt-2'}`}>
              <NavLink to="/soc/alerts" title="Alertas" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'bg-blue-500/10 text-blue-400' : 'text-slate-400 hover:text-white hover:bg-white/5'} ${isCollapsed ? 'justify-center' : ''}`}>
                <Siren size={18} className="flex-shrink-0" /> 
                {!isCollapsed && <span className="truncate text-xs">Alertas</span>}
              </NavLink>
              <NavLink to="/soc/incidents" title="Incidentes" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'bg-blue-500/10 text-blue-400' : 'text-slate-400 hover:text-white hover:bg-white/5'} ${isCollapsed ? 'justify-center' : ''}`}>
                <AlertOctagon size={18} className="flex-shrink-0" /> 
                {!isCollapsed && <span className="truncate text-xs">Incidentes</span>}
              </NavLink>
            </div>
          )}
        </div>

        <NavLink to="/audit" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'} ${isCollapsed ? 'justify-center' : ''}`}>
            <FileText size={20} className="flex-shrink-0" /> 
            {!isCollapsed && <span className="truncate">Auditoría</span>}
        </NavLink>

      </nav>

      {/* Bottom Section */}
      <div className="p-3 space-y-4 mt-auto border-t border-slate-700/30 overflow-hidden">
        {!isCollapsed && (
          <button 
            onClick={() => navigate('/settings')}
            className="flex items-center gap-3 px-3 py-2 w-full text-slate-400 hover:text-white hover:bg-white/5 rounded-xl text-[12px] font-medium transition-colors"
          >
            <Settings size={18} className="flex-shrink-0" />
            <span className="truncate">Configuraciones</span>
          </button>
        )}
        
        <button 
          onClick={onLogout}
          className={`flex items-center gap-3 px-3 py-2 w-full text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl text-[12px] font-medium transition-colors ${isCollapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!isCollapsed && <span className="truncate">Cerrar Sesión</span>}
        </button>

        {!isCollapsed && (
          <div className="px-1 scale-90 origin-bottom">
            <StatusWidget 
              overallStatus={systemHealth.overall}
              integrations={systemHealth.integrations}
            />
          </div>
        )}
      </div>
    </aside>
  );
};
