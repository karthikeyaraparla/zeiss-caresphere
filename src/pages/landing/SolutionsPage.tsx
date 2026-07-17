import { motion } from 'framer-motion';
import { Brain, Package, Users, TrendingUp, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';

const solutions = [
  {
    icon: Brain,
    title: 'Predictive Failure Detection',
    subtitle: 'AI-powered early warning system',
    desc: 'Stop waiting for failures. Our AI analyzes dozens of variables across your asset portfolio to detect failure precursors weeks before they become problems.',
    benefits: ['96% prediction accuracy', '6+ weeks advance warning', 'Component-level diagnosis', 'Confidence scoring'],
    color: 'text-primary bg-primary/10',
  },
  {
    icon: Package,
    title: 'Equipment Lifecycle Management',
    subtitle: 'Complete asset intelligence',
    desc: 'A unified view of your entire equipment fleet. From purchase through decommission, track every asset\'s health, history, and future maintenance needs.',
    benefits: ['Digital asset registry', 'Maintenance history tracking', 'Warranty management', 'Performance trending'],
    color: 'text-purple-500 bg-purple-500/10',
  },
  {
    icon: Users,
    title: 'Customer Success Enablement',
    subtitle: 'Proactive customer support',
    desc: 'Transform your customer relationships from reactive to proactive. Know about equipment issues before your customers do and deliver exceptional service.',
    benefits: ['360° customer view', 'SLA monitoring', 'Proactive outreach alerts', 'Customer health scores'],
    color: 'text-cyan-500 bg-cyan-500/10',
  },
  {
    icon: TrendingUp,
    title: 'Operational Analytics',
    subtitle: 'Data-driven decision making',
    desc: 'Beautiful dashboards and automated reports give you the insights needed to optimize your field service operations and maximize equipment uptime.',
    benefits: ['Executive dashboards', 'Trend analysis', 'ROI reporting', 'Benchmark comparisons'],
    color: 'text-success bg-success/10',
  },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Solutions</Badge>
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground mb-6">
              Solutions for <span className="gradient-text">every challenge</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              CareSphere AI addresses the complete spectrum of enterprise equipment management challenges with intelligent, AI-powered solutions.
            </p>
          </motion.div>

          <div className="space-y-8">
            {solutions.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-8 hover:shadow-premium transition-all">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className={`size-14 rounded-2xl flex items-center justify-center mb-5 ${s.color}`}>
                        <s.icon className="size-7" />
                      </div>
                      <Badge variant="secondary" className="mb-3">{s.subtitle}</Badge>
                      <h2 className="text-2xl font-bold text-foreground mb-3">{s.title}</h2>
                      <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {s.benefits.map(b => (
                        <div key={b} className="flex items-center gap-2 p-3 bg-muted/40 rounded-xl">
                          <Zap className="size-4 text-primary shrink-0" />
                          <span className="text-sm text-foreground font-medium">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
}
