import React from 'react';
import { Newspaper, ExternalLink, Calendar, Siren, CheckCircle2 } from 'lucide-react';
import { NewsItem, User } from '../types';

interface NewsProps {
  user: User;
  newsItems: NewsItem[];
  onGenerateCase: (id: string, type: 'news') => void;
}

export const News: React.FC<NewsProps> = ({ user, newsItems, onGenerateCase }) => {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Newspaper className="text-blue-500" />
            Noticias & Actualizaciones
        </h2>
        <p className="text-slate-500">Mantente informado sobre las últimas novedades del sistema y seguridad.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((item) => (
          <article key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow p-6 flex flex-col h-full relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded uppercase tracking-wide">
                {item.tag}
              </span>
              <div className="flex items-center text-slate-400 text-xs gap-1">
                <Calendar size={12} />
                {item.date}
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight">
              {item.title}
            </h3>
            <p className="text-slate-600 text-sm mb-6 flex-grow">
              {item.summary}
            </p>
            
            <div className="mb-4">
               {item.caseGeneratedBy ? (
                  <div className="w-full bg-emerald-50 border border-emerald-100 rounded-lg p-2 flex items-center justify-center gap-2 animate-in fade-in duration-300">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <div className="text-center">
                        <span className="block text-xs font-bold text-emerald-700">Caso Generado</span>
                        <span className="block text-[10px] text-emerald-600">por {item.caseGeneratedBy}</span>
                    </div>
                  </div>
               ) : (
                 <button 
                   onClick={() => onGenerateCase(item.id, 'news')}
                   className="w-full py-2 bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 hover:border-rose-200 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                 >
                   <Siren size={16} />
                   Generar Caso de Impacto
                 </button>
               )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center mt-auto">
              <span className="text-xs font-medium text-slate-500">{item.source}</span>
              <button className="text-cyber-accent hover:text-blue-600 text-sm font-medium flex items-center gap-1">
                Leer más <ExternalLink size={14} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};