import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, AlertTriangle, CheckCircle2, Clock, Zap, Target,
  Activity, Shield, AlertCircle, ChevronDown, History,
  Cpu, ArrowRight, BarChart2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { PageHeader } from '@/components/shared/PageHeader';
import { RiskBadge, PriorityBadge } from '@/components/shared/Badges';
import { Spinner } from '@/components/shared/LoadingSkeleton';
import { mockAssets, mockAnalyses } from '@/lib/mock-data';
import type { AIAnalysis } from '@/types';
import { cn } from '@/lib/utils';

function RiskGauge({ score }: { score: number }) {
  const color = score >= 80 ? 'text-destructive' : score >= 60 ? 'text-orange-500' : score >= 40 ? 'text-warning-foreground' : 'text-success';

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <svg className="size-32" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" fill="none" stroke="var(--muted)" strokeWidth="10" />
          <motion.circle
            cx="60" cy="60" r="50"
            fill="none"
            stroke={score >= 80 ? 'oklch(0.58 0.22 27)' : score >= 60 ? 'oklch(0.65 0.20 45)' : score >= 40 ? 'oklch(0.72 0.18 75)' : 'oklch(0.60 0.18 145)'}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 50}`}
            strokeDashoffset={`${2 * Math.PI * 50 * (1 - score / 100)}`}
            transform="rotate(-90 60 60)"
            initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - score / 100) }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className={cn('text-4xl font-extrabold', color)}
          >
            {score}
          </motion.span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>
      <p className="text-sm font-medium text-muted-foreground">Risk Score</p>
    </div>
  );
}

function NeuralNetworkBg() {
  const nodes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    delay: Math.random() * 2,
  }));
  const connections = nodes.flatMap((_, i) =>
    nodes.slice(i + 1).map((__, j) => ({ fromIdx: i, toIdx: i + 1 + j, key: `${i}-${j}` }))
  ).slice(0, 20);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg className="w-full h-full">
        {connections.map((c) => {
          const from = nodes[c.fromIdx];
          const to = nodes[c.toIdx];
          if (!from || !to) return null;
          return (
            <motion.line
              key={c.key}
              x1={`${from.x}%`} y1={`${from.y}%`}
              x2={`${to.x}%`} y2={`${to.y}%`}
              stroke="oklch(0.52 0.22 255)"
              strokeWidth={0.5}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, delay: Math.random() * 2, repeat: Infinity }}
            />
          );
        })}
        {nodes.map((n) => (
          <motion.circle
            key={n.id}
            cx={`${n.x}%`} cy={`${n.y}%`} r={3}
            fill="oklch(0.52 0.22 255)"
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.5, 1] }}
            transition={{ duration: 2, delay: n.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </svg>
    </div>
  );
}

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i <= text.length) {
          setDisplayed(text.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 25);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return <span>{displayed}<span className="animate-pulse">|</span></span>;
}

function AnalysisLoadingAnimation() {
  const steps = [
    'Parsing asset specifications...',
    'Analyzing usage patterns...',
    'Cross-referencing maintenance history...',
    'Running failure prediction model...',
    'Calculating risk probability...',
    'Generating recommendations...',
    'Finalizing AI report...',
  ];
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(s => {
        if (s >= steps.length - 1) { clearInterval(interval); return s; }
        return s + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative flex flex-col items-center py-16 px-8 overflow-hidden"
    >
      <NeuralNetworkBg />

      <div className="relative z-10 mb-8">
        {/* Scanning ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="size-24 rounded-full border-2 border-primary/20 border-t-primary"
        />
        {/* Inner pulse */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Brain className="size-10 text-primary" />
        </motion.div>
        {/* Scanning sweep line */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        >
          <div
            className="absolute top-0 left-1/2 w-px h-12 bg-gradient-to-b from-primary to-transparent"
            style={{ transformOrigin: 'bottom center' }}
          />
        </motion.div>
        {/* Orbiting dots */}
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="absolute size-2.5 rounded-full bg-primary/60"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: i * 0.66 }}
            style={{
              top: '50%',
              left: '50%',
              transformOrigin: `${50 + 48}px 0px`,
              marginTop: -5,
              marginLeft: -5,
            }}
          />
        ))}
      </div>

      <h3 className="text-xl font-bold text-foreground mb-2 relative z-10">
        <TypewriterText text="AI Analysis in Progress" />
      </h3>
      <p className="text-muted-foreground text-sm mb-8 text-center max-w-xs relative z-10">
        Gemini AI is analyzing your asset data and generating predictive insights
      </p>

      {/* Progress bar */}
      <div className="w-full max-w-sm mb-6 relative z-10">
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-right">
          {Math.round(((currentStep + 1) / steps.length) * 100)}% — Step {currentStep + 1} of {steps.length}
        </p>
      </div>

      <div className="w-full max-w-sm space-y-2 relative z-10">
        {steps.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: i <= currentStep ? 1 : 0.3, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="flex items-center gap-3"
          >
            <div className={cn(
              'size-4 rounded-full flex items-center justify-center shrink-0',
              i < currentStep ? 'bg-success' : i === currentStep ? 'bg-primary' : 'bg-muted'
            )}>
              {i < currentStep
                ? <CheckCircle2 className="size-3 text-success-foreground" />
                : i === currentStep
                ? <Spinner size="sm" className="size-3 border-primary-foreground/20 border-t-primary-foreground" />
                : null
              }
            </div>
            <span className={cn('text-xs', i <= currentStep ? 'text-foreground' : 'text-muted-foreground')}>
              {step}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function AnalysisResultCard({ analysis }: { analysis: AIAnalysis }) {
  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header metrics */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-5 text-center">
          <RiskGauge score={analysis.riskScore} />
        </Card>

        <div className="col-span-1 md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: 'Risk Level', value: <RiskBadge level={analysis.riskLevel} />, icon: AlertCircle },
            { label: 'Priority', value: <PriorityBadge priority={analysis.priority} />, icon: Target },
            { label: 'AI Confidence', value: `${analysis.confidence}%`, icon: Brain },
            { label: 'Est. Downtime', value: analysis.estimatedDowntime, icon: Clock },
            { label: 'Analysis Date', value: new Date(analysis.analyzedAt).toLocaleDateString(), icon: Activity },
            { label: 'AI Model', value: analysis.model, icon: Cpu },
          ].map(({ label, value, icon: Icon }) => (
            <Card key={label} className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="size-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
              {typeof value === 'string'
                ? <p className="text-sm font-semibold text-foreground font-mono">{value}</p>
                : value
              }
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Root cause & recommendation */}
      <motion.div variants={item} className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <AlertTriangle className="size-4 text-orange-500" />
              </div>
              <CardTitle className="text-sm font-semibold">Root Cause Analysis</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{analysis.rootCause}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <Brain className="size-4 text-primary" />
              </div>
              <CardTitle className="text-sm font-semibold">AI Recommendation</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{analysis.recommendation}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Component health */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart2 className="size-4 text-muted-foreground" />
            <CardTitle className="text-sm font-semibold">Component Health Analysis</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysis.components.map((comp) => (
              <div key={comp.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={cn('size-2 rounded-full', comp.status === 'healthy' ? 'bg-success' : comp.status === 'degraded' ? 'bg-warning' : 'bg-destructive')} />
                    <span className="text-sm font-medium text-foreground">{comp.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{comp.notes}</span>
                    <span className={cn('text-sm font-bold', comp.health >= 70 ? 'text-success' : comp.health >= 40 ? 'text-warning-foreground' : 'text-destructive')}>
                      {comp.health}%
                    </span>
                  </div>
                </div>
                <Progress value={comp.health} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action items */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="size-4 text-muted-foreground" />
            <CardTitle className="text-sm font-semibold">Recommended Action Items</CardTitle>
          </div>
          <CardDescription>Complete these tasks to restore asset health</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analysis.actionItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-xl border border-border/60 hover:border-primary/30 hover:bg-primary/2 transition-all"
              >
                <div className={cn(
                  'size-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5',
                  item.priority === 'critical' ? 'bg-destructive/10 text-destructive' :
                  item.priority === 'high' ? 'bg-orange-500/10 text-orange-500' :
                  item.priority === 'medium' ? 'bg-warning/10 text-warning-foreground' :
                  'bg-muted text-muted-foreground'
                )}>
                  <span className="text-xs font-bold">{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.action}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="size-3" /> {item.estimatedTime}
                    </span>
                    <span className="text-xs text-muted-foreground">Cost: {item.cost}</span>
                  </div>
                </div>
                <PriorityBadge priority={item.priority} />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suggested action */}
      <div className={cn(
        'p-4 rounded-xl border flex items-center gap-4',
        analysis.riskLevel === 'critical' ? 'bg-destructive/5 border-destructive/30' :
        analysis.riskLevel === 'high' ? 'bg-orange-500/5 border-orange-500/30' :
        'bg-warning/5 border-warning/30'
      )}>
        <Zap className={cn('size-5 shrink-0', analysis.riskLevel === 'critical' ? 'text-destructive' : analysis.riskLevel === 'high' ? 'text-orange-500' : 'text-warning-foreground')} />
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">Suggested Action</p>
          <p className="text-sm text-muted-foreground">{analysis.suggestedAction}</p>
        </div>
        <Button size="sm" variant="outline">
          Create Ticket <ArrowRight className="size-3 ml-1.5" />
        </Button>
      </div>
    </motion.div>
  );
}

export default function AIAnalysisPage() {
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<AIAnalysis | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const runAnalysis = async () => {
    if (!selectedAssetId) return;
    setIsAnalyzing(true);
    setCurrentAnalysis(null);

    // Simulate AI call
    await new Promise(r => setTimeout(r, 3500));

    const existing = mockAnalyses.find(a => a.assetId === selectedAssetId);
    if (existing) {
      setCurrentAnalysis(existing);
    } else {
      // Generate mock result for assets without existing analysis
      const asset = mockAssets.find(a => a.id === selectedAssetId)!;
      setCurrentAnalysis({
        id: `ai_${Date.now()}`,
        assetId: selectedAssetId,
        assetName: asset.name,
        customerId: asset.customerId,
        customerName: asset.customerName,
        riskScore: Math.floor(Math.random() * 40) + 20,
        riskLevel: 'low',
        priority: 'low',
        rootCause: 'Asset is operating within normal parameters. No significant wear indicators detected. Routine maintenance schedule is on track.',
        recommendation: 'Continue with scheduled preventive maintenance. No immediate action required. Asset is in good health.',
        estimatedDowntime: 'N/A',
        suggestedAction: 'Maintain current schedule',
        confidence: 91,
        components: [
          { name: 'Primary System', health: 92, status: 'healthy', notes: 'Operating normally' },
          { name: 'Secondary System', health: 88, status: 'healthy', notes: 'Within spec' },
          { name: 'Control Electronics', health: 95, status: 'healthy', notes: 'No issues detected' },
          { name: 'Mechanical Components', health: 90, status: 'healthy', notes: 'Good condition' },
        ],
        actionItems: [
          { id: 'ai1', action: 'Perform scheduled 6-month inspection', priority: 'low', estimatedTime: '2 hours', cost: 'Included in contract', completed: false },
        ],
        analyzedAt: new Date().toISOString(),
        model: 'gemini-2.0-flash',
      });
    }
    setIsAnalyzing(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <PageHeader
        title="AI Analysis"
        subtitle="Select an asset to run Gemini AI predictive failure analysis"
        icon={<Brain className="size-5" />}
        badge={
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <Zap className="size-3 mr-1" />
            Powered by Gemini
          </Badge>
        }
      />

      {/* Asset selector */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 space-y-1.5">
              <label className="text-sm font-medium text-foreground">Select Asset to Analyze</label>
              <Select value={selectedAssetId} onValueChange={setSelectedAssetId}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Choose an asset..." />
                </SelectTrigger>
                <SelectContent>
                  {mockAssets.map(asset => (
                    <SelectItem key={asset.id} value={asset.id}>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{asset.name}</span>
                        <span className="text-muted-foreground text-xs">— {asset.customerName}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                size="lg"
                disabled={!selectedAssetId || isAnalyzing}
                onClick={runAnalysis}
                className="h-11 px-8 gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 min-w-36"
              >
                {isAnalyzing ? (
                  <>
                    <Spinner size="sm" className="border-primary-foreground/20 border-t-primary-foreground" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="size-4" />
                    Analyze
                  </>
                )}
              </Button>
            </div>
          </div>

          {selectedAssetId && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-xl bg-muted/40 border border-border/60"
            >
              {(() => {
                const a = mockAssets.find(x => x.id === selectedAssetId);
                if (!a) return null;
                return (
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <span className="text-muted-foreground">Category: <span className="text-foreground font-medium">{a.category}</span></span>
                    <span className="text-muted-foreground">Model: <span className="text-foreground font-mono font-medium">{a.modelNumber}</span></span>
                    <span className="text-muted-foreground">Usage: <span className="text-foreground font-medium">{a.usageHours.toLocaleString()}h</span></span>
                    <span className="text-muted-foreground">Condition: <span className="text-foreground font-medium capitalize">{a.condition}</span></span>
                    <span className="text-muted-foreground">Last Maintenance: <span className="text-foreground font-medium">{a.lastMaintenance}</span></span>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Analysis content */}
      <AnimatePresence mode="wait">
        {isAnalyzing && (
          <Card key="loading">
            <CardContent>
              <AnalysisLoadingAnimation />
            </CardContent>
          </Card>
        )}
        {!isAnalyzing && currentAnalysis && (
          <motion.div key="result">
            <AnalysisResultCard analysis={currentAnalysis} />
          </motion.div>
        )}
        {!isAnalyzing && !currentAnalysis && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-muted-foreground"
          >
            <Brain className="size-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">Select an asset and click Analyze</p>
            <p className="text-sm">Gemini AI will analyze the asset and predict potential failures</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* History */}
      <Card>
        <CardHeader
          className="cursor-pointer"
          onClick={() => setShowHistory(!showHistory)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="size-4 text-muted-foreground" />
              <CardTitle className="text-sm font-semibold">Analysis History</CardTitle>
              <Badge variant="secondary">{mockAnalyses.length}</Badge>
            </div>
            <ChevronDown className={cn('size-4 text-muted-foreground transition-transform', showHistory && 'rotate-180')} />
          </div>
        </CardHeader>
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <Separator />
              <CardContent className="pt-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        {['Asset', 'Customer', 'Risk Score', 'Level', 'Priority', 'Date', 'Action'].map(h => (
                          <th key={h} className="text-left text-xs font-semibold text-muted-foreground pb-2 pr-4">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockAnalyses.map(a => (
                        <tr key={a.id} className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                          <td className="py-3 pr-4 text-sm font-medium text-foreground">{a.assetName}</td>
                          <td className="py-3 pr-4 text-sm text-muted-foreground">{a.customerName}</td>
                          <td className="py-3 pr-4">
                            <span className={cn('text-sm font-bold', a.riskScore >= 80 ? 'text-destructive' : a.riskScore >= 60 ? 'text-orange-500' : 'text-warning-foreground')}>
                              {a.riskScore}
                            </span>
                          </td>
                          <td className="py-3 pr-4"><RiskBadge level={a.riskLevel} /></td>
                          <td className="py-3 pr-4"><PriorityBadge priority={a.priority} /></td>
                          <td className="py-3 pr-4 text-xs text-muted-foreground">
                            {new Date(a.analyzedAt).toLocaleDateString()}
                          </td>
                          <td className="py-3">
                            <Button
                              variant="ghost"
                              size="xs"
                              onClick={() => { setSelectedAssetId(a.assetId); setCurrentAnalysis(a); }}
                            >
                              View <ArrowRight className="size-3 ml-1" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}
