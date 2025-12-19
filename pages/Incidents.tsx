import React from 'react';
import { AlertOctagon, Filter, Download, Activity, Clock, CheckCircle } from 'lucide-react';
import { Incident, IncidentStatus } from '../types';

interface IncidentsProps {
  incidents: Incident[];
}

export const Incidents: React.FC<IncidentsProps> = ({ incidents }) => {
  
  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'Critical': return 'text-rose-600 bg-rose-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Medium': return 'text-amber-600 bg-amber-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getStatusBadge = (status: IncidentStatus) => {
    switch(status) {
      case IncidentStatus.OPEN: 
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-700 border border-rose-200">
            <Activity size={12} /> Abierto
          </span>
        );
      case IncidentStatus.IN_PROGRESS: 
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200">
            <Clock size={12} /> En Curso
          </span>
        );
      case IncidentStatus.RESOLVED: 
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
            <CheckCircle size={12} /> Solucionado
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
       <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <AlertOctagon className="text-rose-500" />
            SOC: Gestión de Incidentes
          </h2>
          <p className="text-slate-500">Casos activos sincronizados con TheHive.</p>
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50">
                <Filter size={16} /> Filtros
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-cyber-800 text-white rounded-lg text-sm font-medium hover:bg-cyber-900">
                <Download size={16} /> Exportar Reporte
            </button>
        </div>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">ID Incidente</th>
                <th className="px-6 py-4">Título</th>
                <th className="px-6 py-4">Severidad</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Origen</th>
                <th className="px-6 py-4">Asignado a</th>
                <th className="px-6 py-4">Tiempo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {incidents.map((inc) => (
                <tr key={inc.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-600">{inc.id}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">{inc.title}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(inc.severity)}`}>
                      {inc.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(inc.status)}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{inc.source}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{inc.assignee || 'Sin asignar'}</td>
                  <td className="px-6 py-4 text-slate-400 text-xs">{inc.timestamp}</td>
                </tr>
              ))}
              {incidents.length === 0 && (
                  <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-slate-400">No hay incidentes registrados.</td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};