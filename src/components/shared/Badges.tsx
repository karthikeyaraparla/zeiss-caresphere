import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { RiskLevel, TicketStatus, TicketPriority, AssetCondition } from '@/types';

export function RiskBadge({ level }: { level: RiskLevel }) {
  const styles: Record<RiskLevel, string> = {
    critical: 'bg-destructive/10 text-destructive border-destructive/20',
    high: 'bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400',
    medium: 'bg-warning/10 text-warning-foreground border-warning/20',
    low: 'bg-success/10 text-success border-success/20',
  };
  const labels: Record<RiskLevel, string> = {
    critical: 'Critical',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  };
  return (
    <Badge variant="outline" className={cn('font-medium', styles[level])}>
      {labels[level]}
    </Badge>
  );
}

export function StatusBadge({ status }: { status: TicketStatus }) {
  const styles: Record<TicketStatus, string> = {
    open: 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400',
    in_progress: 'bg-warning/10 text-warning-foreground border-warning/20',
    resolved: 'bg-success/10 text-success border-success/20',
    closed: 'bg-muted text-muted-foreground border-border',
  };
  const labels: Record<TicketStatus, string> = {
    open: 'Open',
    in_progress: 'In Progress',
    resolved: 'Resolved',
    closed: 'Closed',
  };
  return (
    <Badge variant="outline" className={cn('font-medium', styles[status])}>
      {labels[status]}
    </Badge>
  );
}

export function PriorityBadge({ priority }: { priority: TicketPriority }) {
  const styles: Record<TicketPriority, string> = {
    critical: 'bg-destructive/10 text-destructive border-destructive/20',
    high: 'bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400',
    medium: 'bg-warning/10 text-warning-foreground border-warning/20',
    low: 'bg-muted text-muted-foreground border-border',
  };
  const labels: Record<TicketPriority, string> = {
    critical: 'Critical',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  };
  return (
    <Badge variant="outline" className={cn('font-medium', styles[priority])}>
      {labels[priority]}
    </Badge>
  );
}

export function ConditionBadge({ condition }: { condition: AssetCondition }) {
  const styles: Record<AssetCondition, string> = {
    excellent: 'bg-success/10 text-success border-success/20',
    good: 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400',
    fair: 'bg-warning/10 text-warning-foreground border-warning/20',
    poor: 'bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400',
    critical: 'bg-destructive/10 text-destructive border-destructive/20',
  };
  const labels: Record<AssetCondition, string> = {
    excellent: 'Excellent',
    good: 'Good',
    fair: 'Fair',
    poor: 'Poor',
    critical: 'Critical',
  };
  return (
    <Badge variant="outline" className={cn('font-medium', styles[condition])}>
      {labels[condition]}
    </Badge>
  );
}

export function AssetStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    operational: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning-foreground border-warning/20',
    maintenance: 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400',
    offline: 'bg-muted text-muted-foreground border-border',
  };
  const labels: Record<string, string> = {
    operational: 'Operational',
    warning: 'Warning',
    maintenance: 'Maintenance',
    offline: 'Offline',
  };
  return (
    <Badge variant="outline" className={cn('font-medium', styles[status] ?? styles.offline)}>
      {labels[status] ?? status}
    </Badge>
  );
}
