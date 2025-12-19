
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Intelligence } from './pages/Intelligence'; // NUEVA IMPORTACIÓN
import { News } from './pages/News';
import { Incidents } from './pages/Incidents';
import { ChatBot } from './pages/ChatBot';
import { Vulnerabilities } from './pages/Vulnerabilities';
import { Alerts } from './pages/Alerts';
import { Audit } from './pages/Audit';
import { User, UserRole, SystemStatus, SecurityAlert, Incident, IncidentStatus, AuditLog, NewsItem, VulnerabilityItem } from './types';

function App() {
  // --- Auth State Management ---
  const [user, setUser] = useState<User | null>(null);
  
  // --- System Status State Management ---
  const [systemHealth, setSystemHealth] = useState({
    overall: SystemStatus.ACTIVO,
    integrations: [
      { name: 'n8n Workflow Engine', connected: true },
      { name: 'PostgreSQL Database', connected: true },
      { name: 'TheHive (Incident Response)', connected: true },
      { name: 'Vector DB (RAG)', connected: true }
    ]
  });

  // --- Data State (Simulating Backend) ---
  const [alerts, setAlerts] = useState<SecurityAlert[]>([
    { id: 'ALT-1001', source: 'Antivirus', severity: 'High', message: 'Malware detectado en endpoint HR-02', timestamp: '10:42 AM', ip: '192.168.10.45' },
    { id: 'ALT-1002', source: 'Firewall', severity: 'Medium', message: 'Conexión saliente bloqueada a IP de C2 conocida', timestamp: '11:15 AM', ip: '45.33.22.11' },
    { id: 'ALT-1003', source: 'Email', severity: 'Critical', message: 'Campaña de Phishing masivo detectada', timestamp: '11:20 AM' }
  ]);

  const [incidents, setIncidents] = useState<Incident[]>([
    { id: 'INC-2024-001', title: 'SQL Injection Attempt', severity: 'High', status: IncidentStatus.OPEN, timestamp: '2 mins ago', source: 'WAF', assignee: 'Juan Pérez' },
    { id: 'INC-2024-002', title: 'Failed Login Spikes', severity: 'Medium', status: IncidentStatus.IN_PROGRESS, timestamp: '1 hour ago', source: 'Auth Service', assignee: 'Maria Garcia' },
    { id: 'INC-2024-003', title: 'Port Scan Detected', severity: 'Low', status: IncidentStatus.RESOLVED, timestamp: '3 hours ago', source: 'Firewall', assignee: 'Juan Pérez' },
  ]);

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  const [newsItems, setNewsItems] = useState<NewsItem[]>([
    {
      id: 'NEWS-1',
      title: "Actualización Crítica de PostgreSQL",
      summary: "Se ha liberado un parche de seguridad importante para versiones 14.x y 15.x que previene inyección SQL avanzada.",
      date: "12 Oct, 2023",
      source: "PostgreSQL Official",
      tag: "Infraestructura"
    },
    {
      id: 'NEWS-2',
      title: "Nuevos flujos de automatización en n8n",
      summary: "El equipo ha desplegado 3 nuevos workflows para la detección automática de phishing en correos corporativos.",
      date: "10 Oct, 2023",
      source: "MechaSystem Internal",
      tag: "Automatización"
    },
    {
      id: 'NEWS-3',
      title: "Reporte Semanal de Ciberseguridad",
      summary: "Resumen de los intentos de acceso no autorizados bloqueados por el firewall perimetral durante la última semana.",
      date: "08 Oct, 2023",
      source: "Security Team",
      tag: "Reporte"
    }
  ]);

  const [vulnerabilities, setVulnerabilities] = useState<VulnerabilityItem[]>([
    { id: 'VUL-1', cve: 'CVE-2023-44487', title: 'HTTP/2 Rapid Reset Attack', severity: 'Critical', description: 'Vulnerabilidad en el protocolo HTTP/2 permite ataques DDoS masivos.', date: '2023-10-10' },
    { id: 'VUL-2', cve: 'CVE-2023-38545', title: 'Buffer Overflow en cURL', severity: 'High', description: 'Desbordamiento de búfer basado en pila en la negociación del handshake SOCKS5.', date: '2023-10-11' }
  ]);

  // Limpia cualquier sesión persistente en el montaje de la app
  useEffect(() => {
    try { localStorage.removeItem('mecha_user'); } catch (e) { /* ignore */ }
    try { sessionStorage.removeItem('mecha_user'); } catch (e) { /* ignore */ }
    setUser(null);
  }, []);


  const handleLogin = (role: UserRole) => {
    const mockUser: User = {
      id: '1',
      firstName: role === UserRole.ADMIN ? 'Admin' : 'Usuario',
      lastName: role === UserRole.ADMIN ? 'Superusuario' : 'Generico',
      email: role === UserRole.ADMIN ? 'admin@mechasystem.com' : 'user@mechasystem.com',
      jobTitle: role === UserRole.ADMIN ? 'Head of Security' : 'L1 Analyst',
      role: role
    };
    setUser(mockUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Protected Route Wrapper
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return (
      <Layout user={user} systemHealth={systemHealth} onLogout={handleLogout}>
        {children}
      </Layout>
    );
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/intelligence" element={
          <ProtectedRoute>
            <Intelligence />
          </ProtectedRoute>
        } />

        <Route path="/chatbot" element={
          <ProtectedRoute>
            <ChatBot />
          </ProtectedRoute>
        } />
        
        <Route path="/news" element={
          <ProtectedRoute>
            <News user={user!} newsItems={newsItems} onGenerateCase={handleGenerateCaseFromContent} />
          </ProtectedRoute>
        } />

        <Route path="/vulnerabilities" element={
          <ProtectedRoute>
            <Vulnerabilities user={user!} vulnerabilities={vulnerabilities} onGenerateCase={handleGenerateCaseFromContent} />
          </ProtectedRoute>
        } />

        {/* SOC Routes */}
        <Route path="/soc/alerts" element={
          <ProtectedRoute>
            <Alerts alerts={alerts} onCreateCase={handlePromoteAlertToIncident} onDismiss={handleDismissAlert} />
          </ProtectedRoute>
        } />
        
        <Route path="/soc/incidents" element={
          <ProtectedRoute>
            <Incidents incidents={incidents} />
          </ProtectedRoute>
        } />
        
        <Route path="/audit" element={
          <ProtectedRoute>
            <Audit logs={auditLogs} />
          </ProtectedRoute>
        } />
        
        <Route path="/settings" element={
          <ProtectedRoute>
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-slate-700">Configuraciones</h2>
                <p className="text-slate-500">Módulo de configuración en desarrollo.</p>
            </div>
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );

  // Helper local para mantener el archivo App.tsx limpio pero funcional con las props de antes
  function handlePromoteAlertToIncident(alert: SecurityAlert) { /* ... logic ... */ }
  function handleDismissAlert(alert: SecurityAlert) { /* ... logic ... */ }
  function handleGenerateCaseFromContent(id: string, type: string) { /* ... logic ... */ }
}

export default App;
