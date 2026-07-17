import { motion } from 'framer-motion';
import { FileText, Download, Calendar, TrendingUp, Users, Package, BarChart3, Plus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PageHeader } from '@/components/shared/PageHeader';
import { cn } from '@/lib/utils';

const reports = [
  { id: 'r1', title: 'Monthly Maintenance Summary', type: 'maintenance', status: 'ready', period: 'November 2024', generatedAt: '2024-12-01', size: '2.4 MB', format: 'PDF', icon: Package },
  { id: 'r2', title: 'Risk Assessment Report', type: 'risk', status: 'ready', period: 'Q4 2024', generatedAt: '2024-12-10', size: '1.8 MB', format: 'PDF', icon: TrendingUp },
  { id: 'r3', title: 'Customer Performance Report', type: 'customer', status: 'ready', period: 'November 2024', generatedAt: '2024-12-05', size: '3.1 MB', format: 'PDF', icon: Users },
  { id: 'r4', title: 'AI Analysis Insights', type: 'performance', status: 'generating', period: 'Q4 2024', format: 'PDF', icon: BarChart3 },
  { id: 'r5', title: 'Annual Equipment Health Report', type: 'performance', status: 'scheduled', period: '2024 Annual', scheduledFor: '2025-01-01', format: 'Excel', icon: FileText },
];

const analyticsData = [
  { label: 'Total Analyses Run', value: 1847, change: '+23%', color: 'text-primary' },
  { label: 'Failures Prevented', value: 142, change: '+18%', color: 'text-success' },
  { label: 'Cost Savings Estimated', value: '€2.4M', change: '+31%', color: 'text-success' },
  { label: 'Avg Response Time', value: '4.2h', change: '-12%', color: 'text-success' },
];

const reportTypeColors: Record<string, string> = {
  maintenance: 'bg-primary/10 text-primary',
  risk: 'bg-destructive/10 text-destructive',
  customer: 'bg-success/10 text-success',
  performance: 'bg-warning/10 text-warning-foreground',
  financial: 'bg-purple-500/10 text-purple-500',
};

const statusColors: Record<string, string> = {
  ready: 'bg-success/10 text-success border-success/20',
  generating: 'bg-warning/10 text-warning-foreground border-warning/20',
  scheduled: 'bg-muted text-muted-foreground border-border',
};

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Reports"
        subtitle="Generate and download analytics reports"
        icon={<BarChart3 className="size-5" />}
        actions={
          <Button size="sm" className="gap-1.5">
            <Plus className="size-4" />
            Generate Report
          </Button>
        }
      />

      {/* Analytics summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {analyticsData.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card>
              <CardContent className="pt-5 pb-4">
                <p className={cn('text-2xl font-bold', item.color)}>{item.value.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{item.label}</p>
                <Badge variant="outline" className={cn('mt-2 text-xs', item.change.startsWith('+') ? 'text-success border-success/20 bg-success/5' : 'text-success border-success/20 bg-success/5')}>
                  {item.change} vs last period
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Reports list */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-base font-semibold text-foreground">Available Reports</h2>
          {reports.map((report, i) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -1 }}
            >
              <Card className="hover:shadow-premium transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={cn('size-10 rounded-xl flex items-center justify-center shrink-0', reportTypeColors[report.type])}>
                      <report.icon className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{report.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="size-3" /> {report.period}
                        </span>
                        {report.generatedAt && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="size-3" /> {report.generatedAt}
                          </span>
                        )}
                        {report.size && (
                          <span className="text-xs text-muted-foreground">{report.size}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant="outline" className={cn('text-xs', statusColors[report.status])}>
                        {report.status === 'generating' && (
                          <div className="size-1.5 rounded-full bg-warning mr-1.5 animate-pulse" />
                        )}
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </Badge>
                      <Button
                        size="sm"
                        variant={report.status === 'ready' ? 'outline' : 'ghost'}
                        disabled={report.status !== 'ready'}
                        className="gap-1.5"
                      >
                        <Download className="size-3.5" />
                        {report.format}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick generate panel */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-foreground">Quick Generate</h2>
          <Card>
            <CardContent className="pt-5 space-y-4">
              {[
                { label: 'Risk Summary', period: 'This month', progress: 82 },
                { label: 'Maintenance Compliance', period: 'Q4 2024', progress: 91 },
                { label: 'Asset Health Overview', period: 'Current', progress: 67 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                    <span className="text-xs text-muted-foreground">{item.period}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={item.progress} className="h-1.5 flex-1" />
                    <span className="text-xs font-medium text-foreground w-8">{item.progress}%</span>
                  </div>
                </div>
              ))}
              <Button size="sm" className="w-full gap-1.5 mt-2">
                <FileText className="size-4" />
                Generate All Reports
              </Button>
            </CardContent>
          </Card>

          {/* Scheduled reports */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Scheduled Reports</CardTitle>
              <CardDescription>Automatic report generation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'Weekly Risk Digest', schedule: 'Every Monday', next: 'Dec 16' },
                { label: 'Monthly Summary', schedule: 'First of month', next: 'Jan 1' },
                { label: 'Quarterly Analytics', schedule: 'Quarterly', next: 'Jan 1' },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-foreground">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.schedule}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">Next: {s.next}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
