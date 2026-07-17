import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Users, Package, TicketCheck, AlertTriangle,
  Brain, Wrench, TrendingUp, CheckCircle2,
  ArrowRight, Clock, AlertCircle,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MetricCard } from '@/components/shared/MetricCard';
import { PageHeader } from '@/components/shared/PageHeader';
import { RiskBadge, StatusBadge, PriorityBadge } from '@/components/shared/Badges';
import { mockDashboardMetrics, mockAnalyses, mockTickets } from '@/lib/mock-data';

const riskTrendData = [
  { month: 'Jul', critical: 3, high: 8, medium: 14, low: 22 },
  { month: 'Aug', critical: 2, high: 9, medium: 16, low: 24 },
  { month: 'Sep', critical: 4, high: 11, medium: 13, low: 20 },
  { month: 'Oct', critical: 3, high: 7, medium: 18, low: 26 },
  { month: 'Nov', critical: 5, high: 10, medium: 15, low: 23 },
  { month: 'Dec', critical: 2, high: 8, medium: 12, low: 28 },
];

const ticketStatusData = [
  { name: 'Open', value: 28, color: 'var(--chart-1)' },
  { name: 'In Progress', value: 15, color: 'var(--chart-4)' },
  { name: 'Resolved', value: 47, color: 'var(--chart-3)' },
  { name: 'Closed', value: 222, color: 'var(--chart-2)' },
];

const assetCategoryData = [
  { category: 'Microscopy', assets: 891 },
  { category: 'Semiconductor', assets: 742 },
  { category: 'Ophthalmology', assets: 634 },
  { category: 'Industrial', assets: 523 },
  { category: 'Research', assets: 298 },
  { category: 'Other', assets: 153 },
];

export default function DashboardPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your asset monitoring and AI analysis platform"
        icon={<TrendingUp className="size-5" />}
        actions={
          <Button size="sm" className="gap-1.5">
            <Brain className="size-4" />
            Run Bulk Analysis
          </Button>
        }
      />

      {/* Metrics grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          title="Total Customers"
          value={mockDashboardMetrics.totalCustomers}
          icon={<Users className="size-5" />}
          trend={12}
          trendLabel="vs last month"
          variant="default"
          delay={0}
        />
        <MetricCard
          title="Total Assets"
          value={mockDashboardMetrics.totalAssets}
          icon={<Package className="size-5" />}
          trend={8}
          trendLabel="vs last month"
          variant="primary"
          delay={0.05}
        />
        <MetricCard
          title="Open Tickets"
          value={mockDashboardMetrics.openTickets}
          icon={<TicketCheck className="size-5" />}
          trend={-5}
          trendLabel="vs last week"
          variant="warning"
          delay={0.1}
        />
        <MetricCard
          title="High Risk Assets"
          value={mockDashboardMetrics.highRiskAssets}
          icon={<AlertTriangle className="size-5" />}
          trend={2}
          trendLabel="need attention"
          variant="danger"
          delay={0.15}
        />
        <MetricCard
          title="AI Analyses"
          value={mockDashboardMetrics.aiAnalyses}
          icon={<Brain className="size-5" />}
          trend={23}
          trendLabel="this month"
          variant="primary"
          delay={0.2}
        />
        <MetricCard
          title="Maintenance Due"
          value={mockDashboardMetrics.maintenanceDue}
          icon={<Wrench className="size-5" />}
          trend={-8}
          trendLabel="vs last month"
          variant="warning"
          delay={0.25}
        />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Risk trend chart */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Risk Trend Analysis</CardTitle>
              <CardDescription>Asset risk distribution over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={riskTrendData} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--popover)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Area type="monotone" dataKey="critical" stackId="1" stroke="var(--chart-5)" fill="var(--chart-5)" fillOpacity={0.6} name="Critical" />
                  <Area type="monotone" dataKey="high" stackId="1" stroke="var(--chart-4)" fill="var(--chart-4)" fillOpacity={0.6} name="High" />
                  <Area type="monotone" dataKey="medium" stackId="1" stroke="var(--chart-2)" fill="var(--chart-2)" fillOpacity={0.6} name="Medium" />
                  <Area type="monotone" dataKey="low" stackId="1" stroke="var(--chart-3)" fill="var(--chart-3)" fillOpacity={0.6} name="Low" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Ticket status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Ticket Status</CardTitle>
              <CardDescription>Current support ticket distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={ticketStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {ticketStatusData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'var(--popover)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {ticketStatusData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="size-2.5 rounded-full" style={{ background: item.color }} />
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                    <span className="text-xs font-semibold text-foreground ml-auto">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Asset categories + recent analyses */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Asset categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Asset Categories</CardTitle>
              <CardDescription>Fleet composition by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart
                  data={assetCategoryData}
                  layout="vertical"
                  margin={{ top: 0, right: 10, bottom: 0, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="category" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} width={80} />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--popover)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="assets" fill="var(--chart-1)" radius={[0, 4, 4, 0]} name="Assets" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent AI analyses */}
        <motion.div
          ref={ref}
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.45 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Recent AI Analyses</CardTitle>
                <CardDescription>Latest predictive maintenance assessments</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-primary gap-1">
                View all <ArrowRight className="size-3" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockAnalyses.map((analysis) => (
                  <motion.div
                    key={analysis.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 2 }}
                    className="flex items-center gap-4 p-3 rounded-xl border border-border/60 hover:border-primary/30 hover:bg-primary/2 transition-all cursor-pointer"
                  >
                    <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${
                      analysis.riskLevel === 'critical' ? 'bg-destructive/10 text-destructive' :
                      analysis.riskLevel === 'high' ? 'bg-orange-500/10 text-orange-500' :
                      'bg-warning/10 text-warning-foreground'
                    }`}>
                      <AlertCircle className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{analysis.assetName}</p>
                      <p className="text-xs text-muted-foreground truncate">{analysis.customerName}</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-lg font-bold ${
                        analysis.riskScore >= 80 ? 'text-destructive' :
                        analysis.riskScore >= 60 ? 'text-orange-500' :
                        'text-warning-foreground'
                      }`}>{analysis.riskScore}</p>
                      <p className="text-xs text-muted-foreground">Risk</p>
                    </div>
                    <div className="hidden sm:block">
                      <RiskBadge level={analysis.riskLevel} />
                    </div>
                    <div className="text-xs text-muted-foreground hidden md:flex items-center gap-1 w-20">
                      <Clock className="size-3" />
                      {new Date(analysis.analyzedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent tickets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Active Support Tickets</CardTitle>
              <CardDescription>Tickets requiring attention</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary gap-1">
              View all <ArrowRight className="size-3" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockTickets.filter(t => t.status !== 'resolved' && t.status !== 'closed').slice(0, 4).map((ticket) => (
                <motion.div
                  key={ticket.id}
                  whileHover={{ x: 2 }}
                  className="flex items-center gap-4 p-3 rounded-xl border border-border/60 hover:border-primary/30 hover:bg-primary/2 transition-all cursor-pointer"
                >
                  <div className={`size-2 rounded-full shrink-0 ${
                    ticket.priority === 'critical' ? 'bg-destructive' :
                    ticket.priority === 'high' ? 'bg-orange-500' :
                    ticket.priority === 'medium' ? 'bg-warning' : 'bg-muted-foreground'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{ticket.title}</p>
                    <p className="text-xs text-muted-foreground">{ticket.customerName}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <PriorityBadge priority={ticket.priority} />
                    <StatusBadge status={ticket.status} />
                  </div>
                  {ticket.assignedEngineer && (
                    <div className="hidden lg:flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CheckCircle2 className="size-3 text-success" />
                      {ticket.assignedEngineer}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
