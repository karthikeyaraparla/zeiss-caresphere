import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Microscope, Eye, EyeOff, ArrowRight, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Spinner } from '@/components/shared/LoadingSkeleton';
import { cn } from '@/lib/utils';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: 'admin@zeiss-caresphere.com', password: 'demo1234' },
  });

  const onSubmit = async (data: FormData) => {
    await login(data.email, data.password);
    navigate('/app');
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left panel */}
      <div className="relative flex flex-col bg-primary p-8 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <ParticlesBg />

        {/* Logo */}
        <Link to="/" className="relative flex items-center gap-2.5 font-bold z-10">
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary-foreground/20">
            <Microscope className="size-4 text-primary-foreground" />
          </div>
          <span className="text-primary-foreground text-lg">ZEISS CareSphere AI</span>
        </Link>

        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-sm">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl font-extrabold text-primary-foreground mb-4 tracking-tight">
              Welcome back to the future of asset intelligence.
            </h2>
            <p className="text-primary-foreground/70 text-lg leading-relaxed">
              Sign in to access AI-powered predictive analytics for your enterprise equipment fleet.
            </p>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 space-y-3"
          >
            {[
              { icon: Zap, text: 'Real-time AI risk analysis' },
              { icon: Shield, text: 'Enterprise-grade security (SOC 2)' },
              { icon: ArrowRight, text: '73% reduction in unplanned downtime' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="size-7 rounded-lg bg-primary-foreground/20 flex items-center justify-center shrink-0">
                  <Icon className="size-3.5 text-primary-foreground" />
                </div>
                <span className="text-sm text-primary-foreground/80">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <p className="relative z-10 text-xs text-primary-foreground/40 mt-auto">
          Built for Carl ZEISS Innovate @2030 Hackathon
        </p>
      </div>

      {/* Right panel */}
      <div className="flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Sign in</h1>
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                Create one free
              </Link>
            </p>
          </div>

          {/* Demo credentials notice */}
          <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
            <p className="text-xs font-semibold text-primary mb-1">Demo Credentials</p>
            <p className="text-xs text-muted-foreground">Email: admin@zeiss-caresphere.com</p>
            <p className="text-xs text-muted-foreground">Password: demo1234</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                {...register('email')}
                aria-invalid={!!errors.email}
                className={cn(errors.email && 'border-destructive')}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  aria-invalid={!!errors.password}
                  className={cn('pr-10', errors.password && 'border-destructive')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full h-11 text-base font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" className="border-primary-foreground/20 border-t-primary-foreground" />
                  Signing in...
                </div>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="size-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By signing in, you agree to our{' '}
            <a href="#" className="text-primary hover:underline">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function ParticlesBg() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 6 + 3,
    delay: Math.random() * 3,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary-foreground/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
