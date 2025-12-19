
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MoreVertical } from 'lucide-react';

interface WidgetWrapperProps {
  title: string;
  children: React.ReactNode;
}

export const WidgetWrapper: React.FC<WidgetWrapperProps> = ({ title, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="bg-[#0e1a2b]/95 backdrop-blur-md border border-white/5 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/30">
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
        <h3 className="text-sm font-bold text-slate-200 tracking-tight uppercase opacity-80">{title}</h3>
        <div className="flex items-center gap-2">
          <button className="text-slate-500 hover:text-white transition-colors">
            <MoreVertical size={16} />
          </button>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-slate-500 hover:text-white transition-colors"
          >
            {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
        </div>
      </div>
      {!isCollapsed && (
        <div className="p-2 animate-in fade-in slide-in-from-top-2 duration-300">
          {children}
        </div>
      )}
    </div>
  );
};
