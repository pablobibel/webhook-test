import React from 'react';
import { Bug, ShieldAlert, CheckCircle2, Siren } from 'lucide-react';
import { User, VulnerabilityItem } from '../types';

interface VulnerabilitiesProps {
  user: User;
  vulnerabilities: VulnerabilityItem[];
  onGenerateCase: (id: string, type: 'vulnerability') => void;
}

export const Vulnerabilities: React.FC<VulnerabilitiesProps> = ({ user, vulnerabilities, onGenerateCase }) => {
  
  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case 'Critical': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Bug className="text-rose-500" />
            Gestión de Vulnerabilidades
        </h2>
        <p className="text-slate-500">CVEs detectados y alertas de seguridad de infraestructura.</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {vulnerabilities.map((vuln) => (
          <div key={vuln.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-slate-300 transition-all">
            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${getSeverityBadge(vuln.severity)}`}>
                    {vuln.severity}
                  </span>
                  <span className="text-sm font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{vuln.cve}</span>
                  <span className="text-xs text-slate-400">{vuln.date}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{vuln.title}</h3>
                <p className="text-slate-600 text-sm">{vuln.description}</p>
              </div>

              <div className="flex flex-col items-end gap-2 min-w-[200px]">
                {vuln.caseGeneratedBy ? (
                  <div className="flex flex-col items-end animate-in fade-in slide-in-from-right-4 duration-500">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200 shadow-sm">
                      <CheckCircle2 size={14} />
                      Caso generado
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1">
                      por {vuln.caseGeneratedBy}
                    </span>
                  </div>
                ) : (
                  <button 
                    onClick={() => onGenerateCase(vuln.id, 'vulnerability')}
                    className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 border border-rose-200 rounded-lg hover:bg-rose-100 hover:border-rose-300 transition-colors text-sm font-semibold shadow-sm group"
                  >
                    <Siren size={16} className="group-hover:animate-pulse" />
                    Generar Caso
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};