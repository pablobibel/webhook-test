
import { WidgetData, WidgetType } from './types';

export const dashboardData: WidgetData[] = [
  {
    id: 'n8n-workflows',
    title: 'n8n: Automatizaciones Activas',
    type: WidgetType.RSS,
    content: [
      { id: 'wf1', title: 'Phishing Detection System', subtitle: 'En ejecución', date: '2 min ago', source: 'n8n' },
      { id: 'wf2', title: 'Slack Incident Notifier', subtitle: 'Esperando evento', date: '15 min ago', source: 'n8n' },
      { id: 'wf3', title: 'Daily DB Backup Sync', subtitle: 'Completado', date: '4 hours ago', source: 'n8n' }
    ]
  },
  {
    id: 'postgres-stats',
    title: 'PostgreSQL: Métricas Críticas',
    type: WidgetType.BOOKMARK,
    content: [
      { id: 'db1', title: 'Conexiones Activas: 42', url: '#', icon: 'Database' },
      { id: 'db2', title: 'Tamaño de Logs: 1.2GB', url: '#', icon: 'FileText' },
      { id: 'db3', title: 'Uptime: 142 días', url: '#', icon: 'Activity' }
    ]
  },
  {
    id: 'threat-intel',
    title: 'Threat Intel: Noticias Mundiales',
    type: WidgetType.RSS,
    content: [
      { id: 'ti1', title: 'Nuevo exploit detectado en Azure AD Connect', source: 'The Hacker News', date: '1 hour ago' },
      { id: 'ti2', title: 'Campaña de Ransomware LockBit contra sector salud', source: 'BleepingComputer', date: '3 hours ago' },
      { id: 'ti3', title: 'Vulnerabilidad Zero-Day en Chrome parcheada', source: 'KrebsOnSecurity', date: '5 hours ago' }
    ]
  },
  {
    id: 'quick-links',
    title: 'Herramientas OSINT',
    type: WidgetType.BOOKMARK,
    content: [
      { id: 'ql1', title: 'VirusTotal Scanner', url: 'https://virustotal.com', icon: 'Search' },
      { id: 'ql2', title: 'Shodan Search', url: 'https://shodan.io', icon: 'Globe' },
      { id: 'ql3', title: 'Have I Been Pwned', url: 'https://haveibeenpwned.com', icon: 'UserX' },
      { id: 'ql4', title: 'CyberChef', url: 'https://gchq.github.io/CyberChef', icon: 'Tool' }
    ]
  },
  {
    id: 'soc-internal',
    title: 'SOC: Enlaces Internos',
    type: WidgetType.BOOKMARK,
    content: [
      { id: 'si1', title: 'Instancia TheHive', url: '#', icon: 'Shield' },
      { id: 'si2', title: 'Grafana Dashboards', url: '#', icon: 'PieChart' },
      { id: 'si3', title: 'Documentación VPN', url: '#', icon: 'BookOpen' }
    ]
  }
];
