import { motion } from 'framer-motion';
import { Code2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';

const techStack = [
  { name: 'React 19', role: 'Frontend Framework', desc: 'Latest React with concurrent features, server components readiness, and optimized rendering for complex dashboards.', color: 'text-cyan-500 bg-cyan-500/10' },
  { name: 'TypeScript', role: 'Type Safety', desc: 'Full type coverage across the entire codebase ensures reliability and developer productivity.', color: 'text-blue-500 bg-blue-500/10' },
  { name: 'Supabase', role: 'Backend & Auth', desc: 'PostgreSQL database, real-time subscriptions, Row-Level Security, and built-in authentication.', color: 'text-success bg-success/10' },
  { name: 'Google Gemini AI', role: 'AI Analysis Engine', desc: 'Gemini 2.0 Flash provides state-of-the-art predictive analysis with 96% accuracy on equipment failure prediction.', color: 'text-primary bg-primary/10' },
  { name: 'Framer Motion', role: 'Animations', desc: 'Production-quality animations and micro-interactions that make the platform feel alive and responsive.', color: 'text-purple-500 bg-purple-500/10' },
  { name: 'TanStack Query', role: 'Data Management', desc: 'Intelligent caching, background refetching, and optimistic updates for seamless real-time data experience.', color: 'text-orange-500 bg-orange-500/10' },
];

export default function TechnologyPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Technology Stack</Badge>
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground mb-6">
              Built on <span className="gradient-text">world-class technology</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              CareSphere AI leverages the most advanced technologies available to deliver enterprise-grade reliability, security, and performance.
            </p>
          </motion.div>

          {/* Architecture diagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Card className="p-8 overflow-hidden relative">
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="relative">
                <h2 className="text-xl font-bold text-center text-foreground mb-10">System Architecture</h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 flex-wrap">
                  {[
                    { layer: 'Frontend', items: ['React 19', 'TypeScript', 'Framer Motion', 'shadcn/ui'], color: 'border-primary/30 bg-primary/5' },
                    { layer: 'AI Engine', items: ['Google Gemini 2.0', 'Risk Modeling', 'Failure Prediction', 'NLP Analysis'], color: 'border-purple-500/30 bg-purple-500/5' },
                    { layer: 'Backend', items: ['Supabase', 'PostgreSQL', 'Edge Functions', 'Real-time API'], color: 'border-success/30 bg-success/5' },
                  ].map((layer, i) => (
                    <div key={layer.layer} className="flex items-center gap-6">
                      <Card className={`p-5 w-48 ${layer.color} border-2`}>
                        <p className="text-sm font-bold text-center text-foreground mb-3">{layer.layer}</p>
                        <div className="space-y-1.5">
                          {layer.items.map(item => (
                            <div key={item} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <div className="size-1.5 rounded-full bg-primary shrink-0" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </Card>
                      {i < 2 && <ArrowRight className="size-5 text-muted-foreground hidden md:block" />}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Tech stack */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -3 }}
              >
                <Card className="p-6 h-full hover:shadow-premium transition-all">
                  <div className={`size-10 rounded-xl flex items-center justify-center mb-4 ${tech.color}`}>
                    <Code2 className="size-5" />
                  </div>
                  <Badge variant="secondary" className="mb-2 text-xs">{tech.role}</Badge>
                  <h3 className="text-lg font-bold text-foreground mb-2">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tech.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Future roadmap */}
          <Card className="p-8">
            <h2 className="text-xl font-bold text-foreground mb-6">Future Roadmap</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { phase: 'Q1 2025', items: ['IoT sensor integration pilot', 'Real-time telemetry data ingestion', 'Edge computing support'] },
                { phase: 'Q2 2025', items: ['Native mobile apps (iOS/Android)', 'Augmented reality maintenance guides', 'Voice assistant integration'] },
                { phase: 'Q3 2025', items: ['Multi-tenant enterprise deployment', 'API marketplace for partners', 'Custom AI model fine-tuning'] },
                { phase: 'Q4 2025', items: ['Digital twin simulation', 'Predictive parts ordering', 'Blockchain-based maintenance records'] },
              ].map((r) => (
                <div key={r.phase} className="p-4 rounded-xl bg-muted/40 border border-border/60">
                  <p className="text-sm font-bold text-primary mb-2">{r.phase}</p>
                  <div className="space-y-1.5">
                    {r.items.map(item => (
                      <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
}
