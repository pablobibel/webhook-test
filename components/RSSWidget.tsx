
import React from 'react';
import { WidgetItem } from '../types';

interface RSSWidgetProps {
  items: WidgetItem[];
}

export const RSSWidget: React.FC<RSSWidgetProps> = ({ items }) => {
  return (
    <div className="space-y-1">
      {items.map((item) => (
        <a 
          key={item.id} 
          href={item.url || '#'} 
          className="group flex flex-col p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
        >
          <div className="flex items-center gap-2 mb-1">
             {item.source && (
               <div className="w-4 h-4 rounded bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">
                  {item.source.charAt(0)}
               </div>
             )}
             <span className="text-[10px] text-slate-400 font-medium">{item.source} • {item.date}</span>
          </div>
          <p className="text-sm text-slate-700 font-semibold group-hover:text-blue-600 line-clamp-2 transition-colors">
            {item.title}
          </p>
          {item.subtitle && (
            <span className="text-xs text-slate-500 mt-1">{item.subtitle}</span>
          )}
        </a>
      ))}
    </div>
  );
};
