import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Server, Database, Activity, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';
import { SystemStatus, IntegrationStatus } from '../types';

interface StatusWidgetProps {
  overallStatus: SystemStatus;
  integrations: IntegrationStatus[];
}

export const StatusWidget: React.FC<StatusWidgetProps> = ({ overallStatus, integrations }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: SystemStatus) => {
    switch (status) {
      case SystemStatus.ACTIVO: return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case SystemStatus.INACTIVO: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
      case SystemStatus.ATENCION: return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case SystemStatus.CRITICO: return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
      default: return 'text-slate-500';
    }
  };

  const getStatusIcon = (status: SystemStatus) => {
    switch (status) {
      case SystemStatus.ACTIVO: return <CheckCircle className="w-4 h-4" />;
      case SystemStatus.INACTIVO: return <XCircle className="w-4 h-4" />;
      case SystemStatus.ATENCION: return <Activity className="w-4 h-4" />;
      case SystemStatus.CRITICO: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full mt-auto border-t border-slate-700 pt-4 px-2">
      <div className="flex flex-col gap-2">
        {/* Main Status Badge */}
        <div className={`flex items-center justify-between px-3 py-2 rounded-lg border ${getStatusColor(overallStatus)} transition-colors`}>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                overallStatus === SystemStatus.ACTIVO ? 'bg-emerald-400' : 'bg-rose-400'
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                overallStatus === SystemStatus.ACTIVO ? 'bg-emerald-500' : 'bg-rose-500'
              }`}></span>
            </span>
            <span className="text-xs font-bold tracking-wider">{overallStatus}</span>
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="hover:bg-black/10 rounded p-1 transition-colors"
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
        </div>

        {/* Integrations List (Collapsible) */}
        {isExpanded && (
          <div className="bg-slate-800/50 rounded-lg p-2 space-y-2 animate-in slide-in-from-bottom-2 duration-200">
            <p className="text-[10px] uppercase text-slate-400 font-semibold px-1">Integraciones</p>
            {integrations.map((integration, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs px-2 py-1.5 rounded hover:bg-slate-700/50 transition-colors">
                <div className="flex items-center gap-2 text-slate-300">
                  {integration.name.toLowerCase().includes('postgre') ? <Database size={12} /> : <Server size={12} />}
                  <span>{integration.name}</span>
                </div>
                <div className={`w-2 h-2 rounded-full ${integration.connected ? 'bg-emerald-500' : 'bg-rose-500'}`} title={integration.connected ? 'Conectado' : 'Desconectado'} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};