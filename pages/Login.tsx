import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>(UserRole.ADMIN);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin(role);
      navigate('/');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-cyber-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
         <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full"></div>
         <div className="absolute top-[60%] -right-[10%] w-[40%] h-[50%] bg-emerald-600/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 mb-4 shadow-lg shadow-blue-500/20">
            <ShieldCheck size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Bienvenido</h2>
          <p className="text-slate-400 text-sm">MechaSystem Cibersecurity Intelligence</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Correo Electrónico</label>
            <input 
              type="email" 
              required
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="usuario@mechasystem.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Contraseña</label>
            <input 
              type="password" 
              required
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
             <div className="flex items-start gap-2">
                <AlertCircle size={16} className="text-amber-500 mt-0.5" />
                <div>
                   <label className="block text-xs font-semibold text-amber-500 mb-1">Simular Rol (Demo)</label>
                   <select 
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded px-2 py-1"
                    >
                      <option value={UserRole.ADMIN}>Administrador</option>
                      <option value={UserRole.USER}>Usuario Común</option>
                    </select>
                </div>
             </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3.5 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
          >
            {isLoading ? 'Accediendo...' : (
              <>
                Ingresar al Sistema
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
            <button onClick={() => navigate('/register')} className="text-sm text-slate-400 hover:text-white transition-colors">
                ¿No tienes cuenta? <span className="text-blue-400 font-medium">Regístrate</span>
            </button>
        </div>
      </div>
    </div>
  );
};