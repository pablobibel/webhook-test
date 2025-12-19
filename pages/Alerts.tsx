import React from 'react';
import { Siren, Shield, Flame, Mail, Trash2, ShieldPlus } from 'lucide-react';
import { SecurityAlert } from '../types';

interface AlertsProps {
  alerts: SecurityAlert[];
  onCreateCase: (alert: SecurityAlert) => void;
  onDismiss: (alert: SecurityAlert) => void;
}

export const Alerts: React.FC<AlertsProps> = ({ alerts, onCreateCase, onDismiss }) => {

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Firewall': return <Flame size={18} className="text-orange-500" />;
      case 'Antivirus': return <Shield size={18} className="text-emerald-500" />;
      case 'Email': return <Mail size={18} className="text-blue-500" />;
      default: return <Siren size={18} className="text-purple-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Siren className="text-orange-600" />
            SOC: Alertas en Tiempo Real
        </h2>
        <p className="text-slate-500">Consolidación de eventos de seguridad (EDR, Firewall, Gateway).</p>
      </header>

      {alerts.length === 0 ? (
         <div className="bg-white rounded-xl p-12 text-center border border-slate-200 shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
              <Shield size={32} className="text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Todo despejado</h3>
            <p className="text-slate-500">No hay alertas activas pendientes de revisión.</p>
         </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="bg-white border-l-4 border-l-rose-500 rounded-r-xl shadow-sm border-y border-r border-slate-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                     <span className="flex items-center gap-1 px-2 py-1 bg-slate-100 rounded text-xs font-semibold text-slate-700">
                        {getSourceIcon(alert.source)}
                        {alert.source}
                     </span>
                     <span className="text-xs font-mono text-slate-400">{alert.timestamp}</span>
                     {alert.ip && <span className="text-xs font-mono bg-slate-800 text-slate-200 px-2 py-0.5 rounded">{alert.ip}</span>}
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg">{alert.message}</h3>
                  <p className="text-sm text-rose-600 font-medium mt-1">Severidad: {alert.severity}</p>
                </div>
                
                <div className="flex items-center gap-3">
                   <button 
                      onClick={() => onDismiss(alert)}
                      className="flex items-center gap-2 px-4 py-2 text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-200"
                   >
                      <Trash2 size={16} />
                      Desestimar
                   </button>
                   <button 
                      onClick={() => onCreateCase(alert)}
                      className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-rose-600/20"
                   >
                      <ShieldPlus size={16} />
                      Crear Caso (TheHive)
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};