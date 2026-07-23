import { useEffect, useState } from "react";
import { Brain, Zap } from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import RiskGauge from "@/components/ai/RiskGauge";
import { generateAIReport } from "@/utils/pdfGenerator";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getTickets } from "@/services/ticketService";
import { analyzeTicket } from "@/services/geminiService";

import type {
  Ticket,
  AIAnalysisResult,
} from "@/types";

const processingSteps = [
  "Reading support ticket...",
  "Identifying medical equipment...",
  "Analyzing issue symptoms...",
  "Predicting possible failure...",
  "Calculating risk score...",
  "Generating recommendations...",
  "Preparing final report..."
];

export default function AIAnalysisPage() {

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicketId, setSelectedTicketId] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [result, setResult] =
    useState<AIAnalysisResult | null>(null);
const [previewOpen, setPreviewOpen] = useState(false);
    const selectedTicket = tickets.find(
  (ticket) => ticket.id === selectedTicketId
);

  useEffect(() => {
    loadTickets();
  }, []);

  async function loadTickets() {

    try {

      const data = await getTickets();

      setTickets(data ?? []);

    } catch (err) {

      console.error(err);

    }

  }

async function handleAnalyze() {

  const ticket = tickets.find(
    t => t.id === selectedTicketId
  );

  if (!ticket) return;

  // 👇 Declare interval here
  let interval: ReturnType<typeof setInterval> | undefined;

  try {

    setLoading(true);
    setCurrentStep(0);

    interval = setInterval(() => {

      setCurrentStep(prev => {

        if (prev >= processingSteps.length - 1) {
          return prev;
        }

        return prev + 1;

      });

    }, 700);

    const aiResult = await analyzeTicket(
      ticket.title,
      ticket.description
    );

    setResult(aiResult);

  } catch (err) {

    console.error(err);

  } finally {

    if (interval) {
      clearInterval(interval);
    }

    setLoading(false);
    setCurrentStep(0);

  }

}
    return (
  <div className="p-6 space-y-6">

    <PageHeader
      title="AI Predictive Maintenance"
      subtitle="Analyze support tickets using Gemini AI"
      icon={<Brain className="size-5" />}
    />

    <Card className="p-6 space-y-4">

      <Select
        value={selectedTicketId}
        onValueChange={setSelectedTicketId}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Ticket" />
        </SelectTrigger>

        <SelectContent>
          {tickets.map(ticket => (
            <SelectItem
              key={ticket.id}
              value={ticket.id}
            >
              {ticket.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="space-y-4">

  <Button
    onClick={handleAnalyze}
    disabled={loading || !selectedTicketId}
    className="w-full"
  >
    {loading ? "Analyzing..." : "Analyze"}
  </Button>

  {loading && (

    <Card className="p-5">

      <div className="flex items-center gap-2 mb-4">

        <Brain className="animate-pulse text-blue-600" />

        <h3 className="font-semibold">
          Gemini AI Processing
        </h3>

      </div>

      <div className="w-full bg-muted rounded-full h-3 mb-5 overflow-hidden">

        <div
          className="bg-blue-600 h-full transition-all duration-500"
          style={{
            width: `${((currentStep + 1) / processingSteps.length) * 100}%`,
          }}
        />

      </div>

      <ul className="space-y-2">

        {processingSteps.map((step, index) => (

          <li
            key={step}
            className={`flex items-center gap-2 ${
              index <= currentStep
                ? "text-green-600"
                : "text-muted-foreground"
            }`}
          >
            {index <= currentStep ? "✅" : "⏳"}

            {step}

          </li>

        ))}
      </ul>

    </Card>

  )}

</div>

      {result && (

        <Card className="p-6 mt-6">

          <div className="flex items-center justify-between mb-6">

  <div className="flex items-center gap-2">
    <Zap className="text-yellow-500" />

    <h2 className="text-2xl font-bold">
      AI Analysis Report
    </h2>
  </div>

  <Button
  variant="outline"
  onClick={() => setPreviewOpen(true)}
>
  📄 Preview Report
</Button>

</div>

<Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">

  <div className="p-6">

    <h3 className="text-lg font-semibold flex items-center gap-2">
      🧠 AI Executive Summary
    </h3>

    <p className="mt-4 leading-7 text-muted-foreground">
      {result.summary}
    </p>

  </div>

</Card>

          {/* Top Metrics */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

<Card className="p-6 min-h-[260px] flex items-center justify-center shadow-md">
    <RiskGauge value={result.riskScore} />

</Card>

            <Card className="p-5">

              <h3 className="text-sm text-muted-foreground">
                Severity
              </h3>

              <p
                className={`text-3xl font-bold mt-2 ${
                  result.severity === "Critical"
                    ? "text-red-600"
                    : result.severity === "High"
                    ? "text-orange-500"
                    : result.severity === "Medium"
                    ? "text-yellow-500"
                    : "text-green-600"
                }`}
              >
                {result.severity}
              </p>

            </Card>

            <Card className="p-5">

              <h3 className="text-sm text-muted-foreground">
                Confidence
              </h3>

              <p className="text-4xl font-bold text-green-600 mt-2">
                {result.confidence}%
              </p>

            </Card>

          </div>

          {/* Information Grid */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">  
                    <Card className="p-5">

              <h3 className="text-lg font-semibold mb-3">
                🔍 Likely Cause
              </h3>

              <p className="text-muted-foreground leading-7">
                {result.likelyCause}
              </p>

            </Card>

            <Card className="p-5">

              <h3 className="text-lg font-semibold mb-3">
                💡 Recommendation
              </h3>

              <p className="text-muted-foreground leading-7">
                {result.recommendation}
              </p>

            </Card>

            <Card className="p-5">

              <h3 className="text-lg font-semibold mb-3">
                ⏱ Estimated Downtime
              </h3>

              <p className="text-muted-foreground">
                {result.estimatedDowntime}
              </p>

            </Card>

            <Card className="p-5">

              <h3 className="text-lg font-semibold mb-3">
                🛠 Maintenance Priority
              </h3>

              <p className="text-muted-foreground">
                {result.maintenancePriority}
              </p>

            </Card>

            <Card className="p-5">

              <h3 className="text-lg font-semibold mb-3">
                👨‍🔧 Engineer Required
              </h3>

              <p className="text-muted-foreground">
                {result.engineerRequired}
              </p>

            </Card>

          </div>

          {/* Bottom Grid */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

            <Card className="p-5">

              <h3 className="text-lg font-semibold mb-3">
                ✅ Preventive Actions
              </h3>

              <ul className="space-y-3">

                {result.preventiveActions.map((action) => (

                  <li
                    key={action}
                    className="bg-muted rounded-lg p-3"
                  >
                    {action}
                  </li>

                ))}

              </ul>

            </Card>

            <Card className="p-5">

              <h3 className="text-lg font-semibold mb-3">
                🔩 Parts Required
              </h3>

              <ul className="space-y-3">

                {result.partsNeeded.map((part) => (

                  <li
                    key={part}
                    className="bg-muted rounded-lg p-3"
                  >
                    {part}
                  </li>

                ))}

              </ul>

            </Card>

          </div>

        </Card>

           )}

    </Card>

    {/* Paste Dialog Here */}

    <Dialog
  open={previewOpen}
  onOpenChange={setPreviewOpen}
>
  <DialogContent className="max-w-3xl">

    <DialogHeader>
      <DialogTitle>
        📄 AI Report Preview
      </DialogTitle>
    </DialogHeader>

    {result && selectedTicket && (

      <div className="space-y-6">

        <Card className="p-4">

          <h3 className="font-semibold mb-2">
            Ticket
          </h3>

          <p>
            <strong>Title:</strong> {selectedTicket.title}
          </p>

          <p>
            <strong>Description:</strong>{" "}
            {selectedTicket.description}
          </p>

        </Card>

        <Card className="p-4">

          <h3 className="font-semibold mb-2">
            🧠 Executive Summary
          </h3>

          <p>{result.summary}</p>

        </Card>

        <div className="grid grid-cols-3 gap-4">

          <Card className="p-4 text-center">

            <h4 className="text-sm">
              Risk
            </h4>

            <p className="text-3xl font-bold text-red-500">
              {result.riskScore}%
            </p>

          </Card>

          <Card className="p-4 text-center">

            <h4 className="text-sm">
              Severity
            </h4>

            <p className="font-bold">
              {result.severity}
            </p>

          </Card>

          <Card className="p-4 text-center">

            <h4 className="text-sm">
              Confidence
            </h4>

            <p className="font-bold text-green-600">
              {result.confidence}%
            </p>

          </Card>

        </div>

        <Card className="p-4">

          <h3 className="font-semibold mb-2">
            Recommendation
          </h3>

          <p>{result.recommendation}</p>

        </Card>

        <div className="flex justify-end">

          <Button
            onClick={() =>
              generateAIReport(selectedTicket, result)
            }
          >
            📄 Download PDF
          </Button>

        </div>

      </div>

    )}

  </DialogContent>
</Dialog>

  </div>

);

}