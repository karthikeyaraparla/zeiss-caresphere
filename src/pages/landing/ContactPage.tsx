import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { Spinner } from '@/components/shared/LoadingSkeleton';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  subject: z.string().min(1),
  message: z.string().min(10),
});
type FormData = z.infer<typeof schema>;

const faqs = [
  { q: 'How does AI analysis work?', a: 'ZePSI uses Google Gemini to analyze asset specifications, usage history, maintenance records, and failure patterns to generate predictive risk assessments.' },
  { q: 'How accurate are the predictions?', a: 'Our AI achieves 96% accuracy in predicting equipment failures more than 2 weeks in advance, validated across 50,000+ historical service records.' },
  { q: 'Do I need IoT sensors?', a: 'No. ZePSI is designed for manual asset management. You register assets and input data manually, and AI does the analysis without any IoT connectivity.' },
  { q: 'How long does onboarding take?', a: 'Most customers are fully onboarded within 2 business days. Our team provides dedicated support throughout the setup process.' },
  { q: 'Is my data secure?', a: 'Yes. ZePSI is SOC 2 Type II certified, uses end-to-end encryption, and your data never leaves your designated data region.' },
  { q: 'Can I export reports?', a: 'Yes. All reports can be exported as PDF, CSV, or Excel. You can also schedule automatic report delivery via email.' },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Contact Us</Badge>
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground mb-6">
              Let's <span className="gradient-text">talk</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to prevent equipment failures? Our team is here to help you get started.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-10 mb-20">
            {/* Contact form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="size-20 rounded-full bg-success/10 flex items-center justify-center mb-5">
                    <CheckCircle2 className="size-10 text-success" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Message Sent!</h2>
                  <p className="text-muted-foreground max-w-sm">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <Card className="p-8">
                  <h2 className="text-xl font-bold text-foreground mb-6">Send us a message</h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label>Full Name *</Label>
                        <Input placeholder="Alex Zimmermann" {...register('name')} aria-invalid={!!errors.name} />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Work Email *</Label>
                        <Input type="email" placeholder="you@company.com" {...register('email')} aria-invalid={!!errors.email} />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Company *</Label>
                        <Input placeholder="Your company" {...register('company')} aria-invalid={!!errors.company} />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Subject *</Label>
                        <Select onValueChange={v => setValue('subject', v)}>
                          <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="demo">Book a Demo</SelectItem>
                            <SelectItem value="sales">Sales Inquiry</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Message *</Label>
                      <Textarea
                        rows={5}
                        placeholder="Tell us about your equipment fleet and what you're trying to achieve..."
                        {...register('message')}
                        aria-invalid={!!errors.message}
                      />
                    </div>
                    <Button type="submit" size="lg" disabled={loading} className="w-full gap-2">
                      {loading ? <><Spinner size="sm" className="border-primary-foreground/20 border-t-primary-foreground" /> Sending...</> : <><Send className="size-4" /> Send Message</>}
                    </Button>
                  </form>
                </Card>
              )}
            </div>

            {/* Contact info */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-base font-semibold text-foreground mb-4">Contact Information</h3>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: 'Email', value: 'caresphere@zeiss.com' },
                    { icon: Phone, label: 'Phone', value: '+49 7364 20-0' },
                    { icon: MapPin, label: 'Address', value: 'Carl-Zeiss-Promenade 10\n07745 Jena, Germany' },
                    { icon: Clock, label: 'Support Hours', value: 'Mon–Fri: 8am–6pm CET\n24/7 for critical issues' },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex gap-3">
                      <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="size-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className="text-sm font-medium text-foreground whitespace-pre-line">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="size-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Book a Demo</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">See ZePSI AI live with your own equipment data.</p>
                <Button size="sm" className="w-full">Schedule Demo</Button>
              </Card>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-3xl font-bold text-center text-foreground mb-10">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {faqs.map((faq, i) => (
                <motion.div key={faq.q} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <Card className="p-5 h-full">
                    <h3 className="text-sm font-semibold text-foreground mb-2">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
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
