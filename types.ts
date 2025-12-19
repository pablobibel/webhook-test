
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export enum SystemStatus {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO',
  ATENCION = 'ATENCION',
  CRITICO = 'CRITICO'
}

export enum WidgetType {
  RSS = 'RSS',
  BOOKMARK = 'BOOKMARK',
  METRIC = 'METRIC'
}

// Added IncidentStatus enum to fix "no exported member" error
export enum IncidentStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED'
}

export interface WidgetItem {
  id: string;
  title: string;
  subtitle?: string;
  url?: string;
  icon?: string;
  date?: string;
  source?: string;
}

export interface WidgetData {
  id: string;
  title: string;
  type: WidgetType;
  content: WidgetItem[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  role: UserRole;
}

export interface IntegrationStatus {
  name: string;
  connected: boolean;
  lastSync?: string;
}

export interface SystemHealth {
  overall: SystemStatus;
  integrations: IntegrationStatus[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  source: string;
  tag: string;
  caseGeneratedBy?: string;
}

export interface VulnerabilityItem {
  id: string;
  cve: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  date: string;
  caseGeneratedBy?: string;
}

export interface SecurityAlert {
  id: string;
  source: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  message: string;
  timestamp: string;
  ip?: string;
}

export interface Incident {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  // Updated status to use IncidentStatus enum instead of string
  status: IncidentStatus;
  source: string;
  assignee?: string;
  timestamp: string;
}

export interface AuditLog {
  id: string;
  action: string;
  module: string;
  detail: string;
  user: string;
  timestamp: string;
}
