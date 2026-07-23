import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Microscope, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Spinner } from '@/components/shared/LoadingSkeleton';
import { cn } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});
type FormData = z.infer<typeof schema>;

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await signup(data.name, data.email, data.password, data.company);
    navigate('/app');
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — form */}
      <div className="flex items-center justify-center p-8 bg-background order-2 lg:order-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="flex items-center gap-2.5 font-bold mb-8 lg:hidden">
            <div className="flex items-center justify-center size-8 rounded-lg bg-primary">
              <Microscope className="size-4 text-primary-foreground" />
            </div>
            <span className="text-foreground">ZEISS ZePSI AI</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Create your account</h1>
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  placeholder="Alex Zimmermann"
                  {...register('name')}
                  aria-invalid={!!errors.name}
                  className={cn(errors.name && 'border-destructive')}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>

              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="email">Work email</Label>
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

              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="company">Company name</Label>
                <Input
                  id="company"
                  placeholder="ZEISS Medical Technology"
                  {...register('company')}
                  aria-invalid={!!errors.company}
                  className={cn(errors.company && 'border-destructive')}
                />
                {errors.company && <p className="text-xs text-destructive">{errors.company.message}</p>}
              </div>

              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
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

              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter password"
                  {...register('confirmPassword')}
                  aria-invalid={!!errors.confirmPassword}
                  className={cn(errors.confirmPassword && 'border-destructive')}
                />
                {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full h-11 text-base font-semibold mt-2"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" className="border-primary-foreground/20 border-t-primary-foreground" />
                  Creating account...
                </div>
              ) : (
                <>
                  Create account
                  <ArrowRight className="size-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-primary hover:underline">Terms</a>{' '}
            and{' '}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </p>
        </motion.div>
      </div>

      {/* Right panel */}
      <div className="relative flex flex-col bg-primary p-8 overflow-hidden order-1 lg:order-2">
        <div className="absolute inset-0 grid-bg opacity-20" />

        <Link to="/" className="relative flex items-center gap-2.5 font-bold z-10">
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary-foreground/20">
            <Microscope className="size-4 text-primary-foreground" />
          </div>
          <span className="text-primary-foreground text-lg">ZEISS ZePSI AI</span>
        </Link>

        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-sm">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl font-extrabold text-primary-foreground mb-4 tracking-tight">
              Start your predictive maintenance journey.
            </h2>
            <p className="text-primary-foreground/70 text-lg leading-relaxed mb-8">
              Join 847+ enterprise customers using AI to prevent equipment failures before they occur.
            </p>
          </motion.div>

          <div className="space-y-3">
            {[
              '14-day free trial — no credit card required',
              'AI analysis for unlimited assets',
              'Full platform access including all features',
              'Dedicated onboarding support',
              'SOC 2 Type II certified platform',
            ].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                className="flex items-center gap-3"
              >
                <CheckCircle2 className="size-4 text-primary-foreground shrink-0" />
                <span className="text-sm text-primary-foreground/80">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
