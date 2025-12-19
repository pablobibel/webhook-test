import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    dni: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration
    setIsSuccess(true);
    setTimeout(() => {
        navigate('/login');
    }, 2000);
  };

  if (isSuccess) {
      return (
        <div className="min-h-screen bg-cyber-900 flex items-center justify-center p-4">
             <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-2xl w-full max-w-md shadow-2xl text-center">
                <CheckCircle2 size={64} className="text-emerald-500 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-white mb-2">Registro Exitoso</h2>
                <p className="text-slate-400">Tu solicitud ha sido enviada al administrador para su aprobación.</p>
                <p className="text-slate-500 text-sm mt-4">Redirigiendo al login...</p>
             </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-cyber-900 flex items-center justify-center p-4 relative overflow-y-auto">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
         <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl w-full max-w-2xl shadow-2xl relative z-10 my-8">
        <button onClick={() => navigate('/login')} className="flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Volver al Login
        </button>

        <div className="mb-8 border-b border-white/10 pb-4">
          <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <UserPlus size={24} className="text-blue-500" />
            Solicitud de Registro
          </h2>
          <p className="text-slate-400 text-sm">Completa tus datos profesionales para solicitar acceso a MechaSystem.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Nombre</label>
            <input 
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Juan"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Apellido</label>
            <input 
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Pérez"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-300">Correo Electrónico Corporativo</label>
            <input 
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="juan.perez@empresa.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Puesto Laboral</label>
            <input 
              name="jobTitle"
              required
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Analista SOC"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">DNI / Identificación</label>
            <input 
              name="dni"
              required
              value={formData.dni}
              onChange={handleChange}
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="12.345.678"
            />
          </div>

          <div className="md:col-span-2 mt-4">
             <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-lg transition-all shadow-lg shadow-blue-600/20"
            >
                Enviar Solicitud de Registro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};