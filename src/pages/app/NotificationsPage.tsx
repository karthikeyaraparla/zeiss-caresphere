import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Check, AlertTriangle, Info, CheckCircle2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared/PageHeader';
import { cn } from '@/lib/utils';

const notifications = [
  { id: 'n1', type: 'alert', title: 'Critical Risk Detected', message: 'ZEISS GeminiSEM 560 at Advanced Semiconductor Corp has reached critical risk level (94/100). Immediate action required.', createdAt: '2024-12-10T11:20:00Z', read: false },
  { id: 'n2', type: 'warning', title: 'Maintenance Overdue', message: 'ZEISS SIGMA 500 SEM maintenance is 45 days overdue. Turbo pump bearing temperature elevated.', createdAt: '2024-12-09T09:00:00Z', read: false },
  { id: 'n3', type: 'info', title: 'AI Analysis Complete', message: 'Risk analysis for ZEISS Axio Observer 7 completed. Risk Score: 72/100. 4 action items generated.', createdAt: '2024-12-10T14:35:00Z', read: false },
  { id: 'n4', type: 'success', title: 'Ticket Resolved', message: 'Support ticket #T5 (OCT calibration verification) has been resolved successfully by Anna Fischer.', createdAt: '2024-12-02T15:00:00Z', read: true },
  { id: 'n5', type: 'info', title: 'New Customer Registered', message: 'SemTech Iberia has been added as a Starter tier customer. 2 assets pending registration.', createdAt: '2024-12-01T09:00:00Z', read: true },
];

const typeStyles = {
  alert: { icon: AlertTriangle, bg: 'bg-destructive/10 text-destructive', dot: 'bg-destructive' },
  warning: { icon: Zap, bg: 'bg-warning/10 text-warning-foreground', dot: 'bg-warning' },
  info: { icon: Info, bg: 'bg-primary/10 text-primary', dot: 'bg-primary' },
  success: { icon: CheckCircle2, bg: 'bg-success/10 text-success', dot: 'bg-success' },
};

export default function NotificationsPage() {
  const [items, setItems] = useState(notifications);

  const markAllRead = () => setItems(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <PageHeader
        title="Notifications"
        subtitle={`${items.filter(n => !n.read).length} unread notifications`}
        icon={<Bell className="size-5" />}
        actions={
          <Button size="sm" variant="outline" onClick={markAllRead} className="gap-1.5">
            <Check className="size-4" />
            Mark all read
          </Button>
        }
      />

      <div className="space-y-2">
        {items.map((n, i) => {
          const style = typeStyles[n.type as keyof typeof typeStyles];
          const Icon = style.icon;
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className={cn(
                  'hover:shadow-premium transition-all duration-200 cursor-pointer',
                  !n.read && 'border-primary/20 bg-primary/2'
                )}
                onClick={() => setItems(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
              >
                <CardContent className="p-4 flex items-start gap-4">
                  <div className={cn('size-9 rounded-xl flex items-center justify-center shrink-0', style.bg)}>
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-foreground">{n.title}</p>
                      {!n.read && <div className={cn('size-2 rounded-full shrink-0', style.dot)} />}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{n.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {!n.read && (
                    <Badge variant="secondary" className="text-xs shrink-0">New</Badge>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
