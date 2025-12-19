
import React from 'react';
import { Header } from '../components/Header';
import { Activity, Shield, Zap, Database, Terminal, Server, Cpu, Cloud, Wifi } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

const data = [
  { name: '00:00', events: 400 },
  { name: '04:00', events: 300 },
  { name: '08:00', events: 900 },
  { name: '12:00', events: 1200 },
  { name: '16:00', events: 1500 },
  { name: '20:00', events: 1100 },
  { name: '23:59', events: 600 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-full flex flex-col space-y-8 max-w-screen-2xl mx-auto px-4 lg:px-8">
      <Header />
      
      <div className="space-y-8 pb-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">System Health</h2>
            <p className="text-slate-500 mt-2 font-medium">Estado en tiempo real de la infraestructura MechaSystem.</p>
          </div>
          
          <div className="flex gap-4">
             <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                <div className="p-2 bg-emerald-50 rounded-lg">
                   <Wifi className="text-emerald-500" size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Latencia de Red</p>
                  <p className="text-lg font-bold text-slate-800">14ms</p>
                </div>
              </div>
          </div>
        </header>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Uso de CPU Cluster" value="24%" icon={<Cpu className="text-blue-500" />} trend="+2% vs ayer" />
          <StatCard title="RAM Libre" value="12.4 GB" icon={<Server className="text-indigo-500" />} trend="Estable" />
          <StatCard title="n8n Workflows" value="152" icon={<Terminal className="text-purple-500" />} trend="3 fallidos" />
          <StatCard title="Postgres Queries" value="1.2k/min" icon={<Database className="text-emerald-500" />} trend="+12% carga" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-xl">
                 <Activity size={20} className="text-blue-500" />
              </div>
              Eventos Procesados (24h)
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="events" stroke="#3b82f6" fillOpacity={1} fill="url(#colorEvents)" strokeWidth={4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-xl">
                 <Cloud size={20} className="text-indigo-500" />
              </div>
              Distribución de Carga
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc', radius: 8}}
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="events" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-white group-hover:shadow-md transition-all border border-transparent group-hover:border-slate-100">
        {icon}
      </div>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-full">{trend}</span>
    </div>
    <h4 className="text-slate-500 text-sm font-semibold tracking-tight">{title}</h4>
    <p className="text-3xl font-extrabold text-slate-900 mt-2">{value}</p>
  </div>
);
