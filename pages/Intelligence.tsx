
import React from 'react';
import { dashboardData } from '../data';
import { WidgetType } from '../types';
import { WidgetWrapper } from '../components/WidgetWrapper';
import { RSSWidget } from '../components/RSSWidget';
import { BookmarkWidget } from '../components/BookmarkWidget';
import { Header } from '../components/Header';
import { BrainCircuit, Globe, DatabaseZap, Network, Search, RefreshCw, Terminal, Cpu, Layers, Zap, ArrowUpRight } from 'lucide-react';

export const Intelligence: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f0eee9] text-slate-800 pb-12">
      <Header />
      
      <div className="px-8 pt-8 max-w-screen-2xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 tracking-tight">
              <BrainCircuit className="text-blue-600" size={32} />
              Intelligence Hub
            </h2>
            <p className="text-slate-500 mt-1">OSINT feeds, automated discovery and data persistence logs.</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all shadow-md shadow-blue-500/20">
              <RefreshCw size={16} /> Refrescar Feeds
            </button>
          </div>
        </header>

        {/* Dynamic Widgets Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-6 space-y-6">
          {dashboardData.map((widget) => (
            <div key={widget.id} className="break-inside-avoid">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden hover:border-blue-500/30 transition-all">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-50/50 border-b border-slate-100">
                  <h3 className="text-xs font-bold text-slate-500 tracking-wider uppercase">{widget.title}</h3>
                </div>
                <div className="p-2">
                  {widget.type === WidgetType.RSS ? (
                    <RSSWidget items={widget.content} />
                  ) : (
                    <BookmarkWidget items={widget.content} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Integration Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-slate-200">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Network size={18} className="text-blue-500" />
              n8n Activity Stream
            </h3>
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs space-y-2 max-h-[250px] overflow-y-auto">
                <div className="flex gap-4 p-1">
                  <span className="text-slate-500">[15:40:12]</span>
                  <span className="text-emerald-400">● Trigger: cron_1h executed</span>
                </div>
                <div className="flex gap-4 p-1">
                  <span className="text-slate-500">[15:40:15]</span>
                  <span className="text-blue-400">○ Fetching data from Twitter API...</span>
                </div>
                <div className="flex gap-4 p-1">
                  <span className="text-slate-500">[15:40:22]</span>
                  <span className="text-emerald-400">● 42 potential IOCs found and sent to DB</span>
                </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <DatabaseZap size={18} className="text-indigo-500" />
              Vector DB Stats
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-sm text-slate-500">Documentos indexados</span>
                <span className="text-sm font-bold">14,203</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-sm text-slate-500">Tiempo de búsqueda (avg)</span>
                <span className="text-sm font-bold text-emerald-600">32ms</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-slate-500">Último backup</span>
                <span className="text-sm font-bold text-slate-400 italic">Hoy, 04:00 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
