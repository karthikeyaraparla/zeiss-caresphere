import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  Shield,
  Zap,
  BarChart3,
  Package,
  Users,
  CheckCircle2,
  Star,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { Microscope3DScene, AnimatedHeadline } from '@/components/shared/Microscope3DScene';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { MagneticButton } from '@/components/shared/MicroInteractions';
import { cn } from '@/lib/utils';

// Animated particle background
function ParticleField() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/30"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [-15, 15, -15],
            x: [-8, 8, -8],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Floating 3D microscope illustration
function SectionTitle({ badge, title, subtitle }: { badge?: string; title: React.ReactNode; subtitle?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
    >
      {badge && (
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
          {badge}
        </Badge>
      )}
      <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">{title}</h2>
      {subtitle && (
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  );
}

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    desc: 'Google Gemini AI analyzes asset data, usage patterns, and historical maintenance records to predict failures with 96% confidence.',
    color: 'text-primary bg-primary/10',
  },
  {
    icon: AlertTriangle,
    title: 'Risk Scoring Engine',
    desc: 'Every asset receives a dynamic risk score (0-100) updated in real-time. Prioritize maintenance before costly breakdowns occur.',
    color: 'text-orange-500 bg-orange-500/10',
  },
  {
    icon: BarChart3,
    title: 'Predictive Analytics',
    desc: 'Advanced trend analysis and failure pattern recognition across your entire equipment fleet with beautiful visual dashboards.',
    color: 'text-success bg-success/10',
  },
  {
    icon: Package,
    title: 'Asset Intelligence',
    desc: 'Complete lifecycle management for all ZEISS equipment. Track specifications, maintenance history, and performance trends.',
    color: 'text-purple-500 bg-purple-500/10',
  },
  {
    icon: Users,
    title: 'Customer Portal',
    desc: 'Manage enterprise customers, track SLAs, and deliver proactive support with a 360° view of every customer relationship.',
    color: 'text-cyan-500 bg-cyan-500/10',
  },
  {
    icon: Shield,
    title: 'Proactive Maintenance',
    desc: 'Automatically generate work orders and maintenance schedules. Reduce unplanned downtime by up to 73% with AI-driven insights.',
    color: 'text-destructive bg-destructive/10',
  },
];

const stats = [
  { value: '96%', label: 'Prediction Accuracy' },
  { value: '73%', label: 'Downtime Reduction' },
  { value: '3,241', label: 'Assets Monitored' },
  { value: '847', label: 'Enterprise Customers' },
];

const testimonials = [
  {
    name: 'Prof. James Morrison',
    role: 'Director of Research, Stanford University',
    content: 'CareSphere AI predicted our LSM 980 failure 6 weeks before it occurred. The ROI from avoided downtime has been extraordinary.',
    rating: 5,
  },
  {
    name: 'Yuki Tanaka',
    role: 'VP Operations, Advanced Semiconductor Corp',
    content: 'With 24 ZEISS instruments across our cleanrooms, manual tracking was impossible. CareSphere AI transformed our entire maintenance strategy.',
    rating: 5,
  },
  {
    name: 'Dr. Sarah Chen',
    role: 'CTO, MedTech Solutions GmbH',
    content: 'The AI analysis reports are incredibly detailed and actionable. Our service engineers now arrive perfectly prepared for every visit.',
    rating: 5,
  },
];

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <ParticleField />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center py-20">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{ y: heroY }}
            >
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-sm px-3 py-1">
                <Zap className="size-3 mr-1.5" />
                Carl ZEISS Innovate @2030 Hackathon
              </Badge>

              <h1 className="text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08] mb-6">
                <AnimatedHeadline text="Predict" />
                <br />
                <span className="gradient-text"><AnimatedHeadline text="Tomorrow." /></span>
                <br />
                <AnimatedHeadline text="Support" />
                <br />
                <span className="gradient-text"><AnimatedHeadline text="Today." /></span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg">
                AI-powered Predictive Support Intelligence Platform that helps enterprises analyze assets, predict risks, and prevent downtime before failures occur.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <MagneticButton>
                  <Link to="/signup">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 h-12 px-8 text-base" data-cta="true">
                      Start Monitoring
                      <ArrowRight className="size-4 ml-2" />
                    </Button>
                  </Link>
                </MagneticButton>
                <MagneticButton strength={0.2}>
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                    Book a Demo
                  </Button>
                </MagneticButton>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                {['No credit card required', 'Enterprise-grade security', 'SOC 2 Type II'].map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-success" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="flex justify-center lg:justify-end"
            >
              <Microscope3DScene />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        >
          <div className="size-6 border-2 border-muted-foreground/40 rounded-full flex items-center justify-center">
            <div className="size-1.5 bg-muted-foreground/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl font-extrabold text-primary-foreground mb-1">{stat.value}</p>
                <p className="text-primary-foreground/70 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-background" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            badge="Platform Features"
            title={<>Everything you need to<br /><span className="gradient-text">prevent failures</span></>}
            subtitle="A complete AI-powered platform designed specifically for ZEISS enterprise equipment management and predictive maintenance."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} direction="up" delay={i * 0.08}>
                <motion.div whileHover={{ y: -4 }}>
                <Card className="p-6 h-full hover:shadow-premium transition-all duration-300 border-border/60 group">
                  <div className={cn('size-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110', feature.color)}>
                    <feature.icon className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-muted/30" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            badge="How It Works"
            title={<>From data to <span className="gradient-text">actionable insights</span></>}
            subtitle="Three simple steps to predict failures and prevent costly downtime across your entire equipment fleet."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Register Your Assets',
                desc: 'Add your ZEISS equipment to the platform. Enter model numbers, serial numbers, usage history, and maintenance records.',
                icon: Package,
              },
              {
                step: '02',
                title: 'AI Analyzes Risk',
                desc: 'Google Gemini AI processes all asset data, identifies degradation patterns, and generates detailed risk assessments with confidence scores.',
                icon: Brain,
              },
              {
                step: '03',
                title: 'Take Preventive Action',
                desc: 'Receive prioritized maintenance recommendations, schedule service visits, and eliminate unplanned downtime before it affects operations.',
                icon: Shield,
              },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="text-center"
              >
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="size-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <step.icon className="size-8 text-primary" />
                  </div>
                  <div className="absolute -top-3 -right-3 size-8 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            badge="Customer Stories"
            title={<>Trusted by leading <span className="gradient-text">enterprises worldwide</span></>}
          />

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="p-6 h-full hover:shadow-premium transition-all duration-300">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="size-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-6 italic">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-5xl font-extrabold text-primary-foreground mb-6 tracking-tight">
              Start predicting failures today
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-10 leading-relaxed">
              Join 847+ enterprise customers who use ZEISS CareSphere AI to prevent costly downtime and optimize equipment performance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="h-12 px-8 text-base font-semibold">
                  Start Free Trial
                  <ArrowRight className="size-4 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-base bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10"
                >
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
