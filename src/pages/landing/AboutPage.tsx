import { motion } from 'framer-motion';
import { Microscope, Target, Eye, Rocket } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';

const timeline = [
  { year: '2020', event: 'Problem Identified', desc: 'ZEISS field engineers reported increasing cases of unexpected equipment failures causing significant customer downtime.' },
  { year: '2021', event: 'Research Phase', desc: 'Deep analysis of 50,000+ service records reveals predictable failure patterns detectable weeks in advance.' },
  { year: '2022', event: 'AI Prototype', desc: 'First AI model trained on historical maintenance data achieves 84% failure prediction accuracy.' },
  { year: '2023', event: 'Platform Launch', desc: 'CareSphere AI beta launch with 50 enterprise customers. Risk scoring engine achieves 91% accuracy.' },
  { year: '2024', event: 'Gemini Integration', desc: 'Integration with Google Gemini AI boosts prediction accuracy to 96%. Platform reaches 500+ customers.' },
  { year: '2030', event: 'ZEISS Vision', desc: 'Full IoT integration, digital twins, and autonomous maintenance scheduling across the entire ZEISS equipment ecosystem.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Carl ZEISS Innovate @2030
            </Badge>
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground mb-6">
              The future of <span className="gradient-text">equipment intelligence</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              ZEISS CareSphere AI was built for the Carl ZEISS Innovate @2030 Hackathon to reimagine how enterprises manage, monitor, and maintain their most critical equipment.
            </p>
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {[
              { icon: Eye, title: 'Vision', content: 'A world where equipment failures are predicted and prevented before they impact operations, research, or patient care — making ZEISS the most trusted partner for equipment lifecycle management.' },
              { icon: Target, title: 'Mission', content: 'To leverage the power of AI and data analytics to transform reactive maintenance into proactive prevention, saving enterprises millions in downtime costs while maximizing equipment performance.' },
              { icon: Rocket, title: 'Hackathon Goal', content: 'Demonstrate that AI-powered predictive maintenance can be implemented as a production-ready SaaS platform that directly advances the Carl ZEISS Innovate @2030 strategy for digital services.' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }}>
                <Card className="p-6 h-full hover:shadow-premium transition-all">
                  <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                    <item.icon className="size-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-3">{item.title}</h2>
                  <p className="text-muted-foreground leading-relaxed text-sm">{item.content}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Journey</h2>
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-0.5 h-full w-0.5 bg-border hidden md:block" />
              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className={`flex items-center gap-8 md:${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className="flex-1">
                      <Card className="p-5 hover:shadow-premium transition-all">
                        <Badge className="mb-2 bg-primary/10 text-primary border-primary/20">{item.year}</Badge>
                        <h3 className="text-base font-bold text-foreground mb-1">{item.event}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </Card>
                    </div>
                    <div className="hidden md:flex size-4 rounded-full bg-primary shrink-0 relative z-10" />
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Team note */}
          <Card className="p-8 text-center bg-primary/5 border-primary/20">
            <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Microscope className="size-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Built for Carl ZEISS Innovate @2030</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              This platform represents our vision for ZEISS's digital transformation journey — combining world-class optical and medical technology expertise with cutting-edge AI capabilities to create unprecedented value for customers worldwide.
            </p>
          </Card>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
}
