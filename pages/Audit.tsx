import React, { useState } from 'react';
import { FileText, Filter, LayoutGrid, Newspaper, Bug, Siren } from 'lucide-react';
import { AuditLog } from '../types';

interface AuditProps {
  logs: AuditLog[];
}

type FilterType = 'ALL' | 'SOC' | 'NOTICIAS' | 'VULNERABILIDADES';

export const Audit: React.FC<AuditProps> = ({ logs }) => {
  const [filter, setFilter] = useState<FilterType>('ALL');

  const filteredLogs = logs.filter(log => {
    if (filter === 'ALL') return true;
    return log.module === filter;
  });

  const getModuleIcon = (module: string) => {
    switch (module) {
      case 'SOC': return <Siren size={14} className="text-purple-500" />;
      case 'NOTICIAS': return <Newspaper size={14} className="text-blue-500" />;
      case 'VULNERABILIDADES': return <Bug size={14} className="text-rose-500" />;
      default: return <LayoutGrid size={14} className="text-slate-500" />;
    }
  };

  const getModuleBadge = (module: string) => {
    switch (module) {
      case 'SOC': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'NOTICIAS': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'VULNERABILIDADES': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
       <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <FileText className="text-slate-600" />
            Auditoría de Acciones
           </h2>
           <p className="text-slate-500">Registro histórico de operaciones en la plataforma.</p>
        </div>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 pb-2">
        <button 
          onClick={() => setFilter('ALL')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
            filter === 'ALL' 
              ? 'bg-slate-800 text-white border-slate-800' 
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <LayoutGrid size={16} /> Todos
        </button>
        <button 
          onClick={() => setFilter('NOTICIAS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
            filter === 'NOTICIAS' 
              ? 'bg-blue-600 text-white border-blue-600' 
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Newspaper size={16} /> Noticias
        </button>
        <button 
          onClick={() => setFilter('VULNERABILIDADES')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
            filter === 'VULNERABILIDADES' 
              ? 'bg-rose-600 text-white border-rose-600' 
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Bug size={16} /> Vulnerabilidades
        </button>
        <button 
          onClick={() => setFilter('SOC')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
            filter === 'SOC' 
              ? 'bg-purple-600 text-white border-purple-600' 
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Siren size={16} /> SOC
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                <tr>
                <th className="px-6 py-4">Módulo</th>
                <th className="px-6 py-4">Acción</th>
                <th className="px-6 py-4">Detalle</th>
                <th className="px-6 py-4">Usuario</th>
                <th className="px-6 py-4">Fecha/Hora</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${getModuleBadge(log.module)}`}>
                            {getModuleIcon(log.module)}
                            {log.module}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                    <span className="font-mono text-slate-600 text-xs">
                        {log.action}
                    </span>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{log.detail}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{log.user}</td>
                    <td className="px-6 py-4 text-slate-400 text-xs">{log.timestamp}</td>
                </tr>
                ))}
                {filteredLogs.length === 0 && (
                    <tr>
                        <td colSpan={5} className="px-6 py-12 text-center">
                            <div className="flex flex-col items-center justify-center text-slate-400">
                                <Filter size={32} className="mb-2 opacity-50" />
                                <p>No hay registros de auditoría para este filtro.</p>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};