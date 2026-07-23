import { motion } from 'framer-motion';
import { Brain, AlertTriangle, BarChart3, Package, Users, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';

const features = [
  {
    icon: Brain,
    title: 'Gemini AI Integration',
    desc: 'Powered by Google\'s most advanced Gemini AI model, ZePSI analyzes complex asset data patterns and generates actionable predictive insights with industry-leading 96% accuracy.',
    highlights: ['Natural language analysis', 'Context-aware recommendations', 'Continuous learning', 'Multi-modal data processing'],
    color: 'text-primary bg-primary/10',
  },
  {
    icon: AlertTriangle,
    title: 'Intelligent Risk Scoring',
    desc: 'Dynamic 0-100 risk scores calculated from usage hours, maintenance history, component wear patterns, environmental factors, and failure database correlations.',
    highlights: ['Real-time score updates', 'Component-level analysis', 'Historical trend tracking', 'Failure probability modeling'],
    color: 'text-orange-500 bg-orange-500/10',
  },
  {
    icon: Package,
    title: 'Comprehensive Asset Registry',
    desc: 'A complete digital twin of your equipment fleet. Track specifications, purchase history, firmware versions, maintenance records, and operational parameters.',
    highlights: ['Full lifecycle tracking', 'Firmware version management', 'Multi-location support', 'Import/export capabilities'],
    color: 'text-purple-500 bg-purple-500/10',
  },
  {
    icon: Users,
    title: 'Enterprise Customer Management',
    desc: 'Manage your entire customer base with 360° visibility. Track SLAs, contracts, asset portfolios, and support history for every account.',
    highlights: ['SLA monitoring', 'Contract management', 'Multi-tier support', 'Customer health scores'],
    color: 'text-cyan-500 bg-cyan-500/10',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics & Reporting',
    desc: 'Beautiful, actionable dashboards and automated reports. From executive summaries to detailed technical analyses, generate the insights you need.',
    highlights: ['Custom report builder', 'PDF/Excel export', 'Scheduled delivery', 'Executive dashboards'],
    color: 'text-success bg-success/10',
  },
  {
    icon: Shield,
    title: 'Proactive Maintenance Scheduling',
    desc: 'AI-generated maintenance schedules that prevent failures. Automatically create work orders, assign engineers, and track completion.',
    highlights: ['Auto work order creation', 'Engineer assignment', 'Parts forecasting', 'Compliance tracking'],
    color: 'text-destructive bg-destructive/10',
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <div className="pt-24 pb-16">
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Platform Features</Badge>
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground mb-6">
              Every feature you need to <span className="gradient-text">prevent failures</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              ZePSI AI combines cutting-edge artificial intelligence with enterprise asset management to deliver the most comprehensive predictive maintenance platform available.
            </p>
          </motion.div>
        </div>

        {/* Features */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card className="p-8 hover:shadow-premium transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div>
                    <div className={`size-12 rounded-2xl flex items-center justify-center mb-5 ${feature.color}`}>
                      <feature.icon className="size-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-3">{feature.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {feature.highlights.map(h => (
                      <div key={h} className="flex items-center gap-2 p-3 bg-muted/40 rounded-xl">
                        <CheckCircle2 className="size-4 text-primary shrink-0" />
                        <span className="text-sm text-foreground font-medium">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link to="/signup">
            <Button size="lg" className="h-12 px-8 text-base">
              Start Free Trial <ArrowRight className="size-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
}
