
import React from 'react';
import { Search, Bell, User, Settings, Database, Terminal } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#f0eee9]/80 backdrop-blur-xl border-b border-slate-200/60 px-8 py-3">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-8">
        {/* Search */}
        <div className="flex-1 max-w-2xl relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Buscar amenazas, IOCs, CVEs o workflows..."
            className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all shadow-sm"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4 border-r border-slate-200 pr-4">
            <div className="flex items-center gap-2 text-xs text-emerald-600 font-mono bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
               <Database size={12} /> Postgres Connected
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-600 font-mono bg-blue-50 px-2 py-1 rounded border border-blue-100">
               <Terminal size={12} /> n8n Listening
            </div>
          </div>
          
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#f0eee9]"></span>
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
            <Settings size={20} />
          </button>
          
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
             <User size={18} />
          </div>
        </div>
      </div>
    </header>
  );
};
