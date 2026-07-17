// Type definitions for ZEISS CareSphere AI

export type RiskLevel = 'critical' | 'high' | 'medium' | 'low';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'critical' | 'high' | 'medium' | 'low';
export type AssetCondition = 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
export type AssetCategory =
  | 'Microscopy'
  | 'Ophthalmology'
  | 'Semiconductor'
  | 'Industrial Metrology'
  | 'Surgical Systems'
  | 'Vision Care'
  | 'Research Systems'
  | 'Other';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  country: string;
  city: string;
  status: 'active' | 'inactive' | 'pending';
  tier: 'enterprise' | 'business' | 'starter';
  assetCount: number;
  openTickets: number;
  contractStart: string;
  contractEnd: string;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
}

export interface Asset {
  id: string;
  customerId: string;
  customerName: string;
  name: string;
  category: AssetCategory;
  modelNumber: string;
  serialNumber: string;
  purchaseDate: string;
  warrantyExpiry: string;
  usageHours: number;
  condition: AssetCondition;
  lastMaintenance: string;
  nextMaintenanceDue: string;
  issueDescription?: string;
  location: string;
  firmware?: string;
  status: 'operational' | 'maintenance' | 'offline' | 'warning';
  createdAt: string;
  updatedAt: string;
}

export interface AIAnalysis {
  id: string;
  assetId: string;
  assetName: string;
  customerId: string;
  customerName: string;
  riskScore: number;
  riskLevel: RiskLevel;
  priority: TicketPriority;
  rootCause: string;
  recommendation: string;
  estimatedDowntime: string;
  suggestedAction: string;
  confidence: number;
  components: AnalysisComponent[];
  actionItems: ActionItem[];
  analyzedAt: string;
  model: string;
}

export interface AnalysisComponent {
  name: string;
  health: number;
  status: 'healthy' | 'degraded' | 'critical';
  notes: string;
}

export interface ActionItem {
  id: string;
  action: string;
  priority: TicketPriority;
  estimatedTime: string;
  cost: string;
  completed: boolean;
}

export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  customerId: string;
  customerName: string;
  assetId?: string;
  assetName?: string;
  assignedTo?: string;
  assignedEngineer?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  dueDate?: string;
  tags: string[];
  comments: TicketComment[];
}

export interface TicketComment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  isInternal: boolean;
}

export interface DashboardMetrics {
  totalCustomers: number;
  totalAssets: number;
  openTickets: number;
  highRiskAssets: number;
  aiAnalyses: number;
  maintenanceDue: number;
  resolvedTickets: number;
  avgRiskScore: number;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  tags: string[];
  views: number;
  helpful: number;
  author: string;
  createdAt: string;
  updatedAt: string;
  status: 'published' | 'draft';
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'engineer' | 'analyst' | 'viewer';
  avatar?: string;
  company: string;
  department: string;
  phone?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface Report {
  id: string;
  title: string;
  type: 'maintenance' | 'risk' | 'performance' | 'customer' | 'financial';
  status: 'ready' | 'generating' | 'scheduled';
  period: string;
  generatedAt?: string;
  scheduledFor?: string;
  size?: string;
  format: 'PDF' | 'CSV' | 'Excel';
}
