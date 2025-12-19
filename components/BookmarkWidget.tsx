
import React from 'react';
import * as Icons from 'lucide-react';
import { WidgetItem } from '../types';

interface BookmarkWidgetProps {
  items: WidgetItem[];
}

export const BookmarkWidget: React.FC<BookmarkWidgetProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 gap-1">
      {items.map((item) => {
        const IconComponent = (Icons as any)[item.icon || 'ExternalLink'] || Icons.ExternalLink;
        return (
          <a 
            key={item.id} 
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all group border border-transparent hover:border-slate-100"
          >
            <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
               <IconComponent size={16} />
            </div>
            <span className="text-sm font-semibold">{item.title}</span>
          </a>
        );
      })}
    </div>
  );
};
