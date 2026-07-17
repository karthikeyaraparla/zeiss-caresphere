import { motion } from 'framer-motion';
import { Star, Building2, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';

const customers = [
  { name: 'Stanford Research Institute', industry: 'Academic Research', country: 'USA', assets: 8, tier: 'Enterprise' },
  { name: 'MedTech Solutions GmbH', industry: 'Medical Technology', country: 'Germany', assets: 12, tier: 'Enterprise' },
  { name: 'Advanced Semiconductor Corp', industry: 'Semiconductor', country: 'Japan', assets: 24, tier: 'Enterprise' },
  { name: 'Optik Precision Systems', industry: 'Industrial Metrology', country: 'Germany', assets: 6, tier: 'Business' },
  { name: 'Cairo Eye Center', industry: 'Ophthalmology', country: 'Egypt', assets: 4, tier: 'Business' },
  { name: 'TechVision Labs', industry: 'Research Systems', country: 'Switzerland', assets: 9, tier: 'Enterprise' },
];

const testimonials = [
  { name: 'Prof. James Morrison', role: 'Director, Stanford Research Institute', content: 'CareSphere AI predicted our LSM 980 failure 6 weeks before it occurred. The estimated savings from avoided downtime was over $180,000.', rating: 5 },
  { name: 'Yuki Tanaka', role: 'VP Operations, Advanced Semiconductor Corp', content: 'With 24 ZEISS instruments across our cleanrooms, CareSphere AI transformed our entire maintenance strategy. 73% reduction in unplanned downtime.', rating: 5 },
  { name: 'Dr. Sarah Chen', role: 'CTO, MedTech Solutions GmbH', content: 'The AI analysis reports are incredibly detailed. Our service engineers arrive perfectly prepared. It\'s like having a crystal ball for equipment failures.', rating: 5 },
  { name: 'Dr. Ahmed Hassan', role: 'Medical Director, Cairo Eye Center', content: 'For our ophthalmology practice, equipment downtime directly impacts patient care. CareSphere AI has given us peace of mind and better outcomes.', rating: 5 },
];

const industries = [
  { name: 'Medical Technology', count: 234, icon: '🏥' },
  { name: 'Semiconductor', count: 187, icon: '💾' },
  { name: 'Academic Research', count: 156, icon: '🔬' },
  { name: 'Industrial Metrology', count: 143, icon: '📏' },
  { name: 'Ophthalmology', count: 89, icon: '👁️' },
  { name: 'Other', count: 38, icon: '🔧' },
];

export default function CustomersLandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Customer Stories</Badge>
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground mb-6">
              Trusted by <span className="gradient-text">global enterprises</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              847+ enterprises across 45 countries use ZEISS CareSphere AI to protect their equipment investments and prevent costly failures.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { value: '847+', label: 'Enterprise Customers' },
              { value: '45', label: 'Countries' },
              { value: '3,241', label: 'Assets Monitored' },
              { value: '96%', label: 'Customer Retention' },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="p-6 text-center">
                  <p className="text-4xl font-extrabold text-primary mb-1">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Featured customers */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Featured Customers</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {customers.map((c, i) => (
                <motion.div key={c.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -3 }}>
                  <Card className="p-5 hover:shadow-premium transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        {c.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </div>
                      <Badge variant="secondary" className="text-xs">{c.tier}</Badge>
                    </div>
                    <h3 className="text-sm font-bold text-foreground mb-1">{c.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{c.industry}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Globe className="size-3" />{c.country}</span>
                      <span className="flex items-center gap-1"><Building2 className="size-3" />{c.assets} assets</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">What Customers Say</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((t, i) => (
                <motion.div key={t.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -3 }}>
                  <Card className="p-6 h-full hover:shadow-premium transition-all">
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="size-4 fill-warning text-warning" />)}
                    </div>
                    <p className="text-sm text-foreground leading-relaxed mb-5 italic">"{t.content}"</p>
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
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

          {/* Industries */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Industries We Serve</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {industries.map((ind, i) => (
                <motion.div key={ind.name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <Card className="p-5 text-center hover:shadow-premium transition-all">
                    <div className="text-3xl mb-2">{ind.icon}</div>
                    <p className="text-sm font-semibold text-foreground">{ind.name}</p>
                    <p className="text-2xl font-bold text-primary mt-1">{ind.count}</p>
                    <p className="text-xs text-muted-foreground">customers</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
}
