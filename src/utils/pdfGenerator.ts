import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type { AIAnalysisResult, Ticket } from "@/types";

export function generateAIReport(
  ticket: Ticket,
  result: AIAnalysisResult
) {
  const doc = new jsPDF();

  // Header
  doc.setFillColor(13, 110, 253);
  doc.rect(0, 0, 210, 22, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.text("ZEISS CareSphere AI", 14, 14);

  doc.setFontSize(10);
  doc.text("Predictive Maintenance Report", 14, 19);

  // Reset text color
  doc.setTextColor(0, 0, 0);

  // Ticket Details
  autoTable(doc, {
    startY: 30,
    head: [["Ticket Information", ""]],
    body: [
      ["Title", ticket.title],
      ["Description", ticket.description],
      ["Generated", new Date().toLocaleString()],
    ],
    theme: "grid",
    headStyles: {
      fillColor: [13, 110, 253],
    },
  });

  // AI Summary
  autoTable(doc, {
    startY: (doc as any).lastAutoTable.finalY + 10,
    head: [["AI Executive Summary"]],
    body: [[result.summary || "No executive summary generated."]],
    theme: "striped",
    headStyles: {
      fillColor: [59, 130, 246],
    },
  });

  // Analysis
  autoTable(doc, {
    startY: (doc as any).lastAutoTable.finalY + 10,
    head: [["Analysis", "Value"]],
    body: [
      ["Risk Score", `${result.riskScore}%`],
      ["Severity", result.severity],
      ["Confidence", `${result.confidence}%`],
      ["Likely Cause", result.likelyCause],
      ["Recommendation", result.recommendation],
      ["Estimated Downtime", result.estimatedDowntime],
      ["Maintenance Priority", result.maintenancePriority],
      ["Engineer Required", result.engineerRequired],
      ["Parts Needed", result.partsNeeded.length
  ? result.partsNeeded.join(", ")
  : "No replacement parts required."],
      [
        "Preventive Actions",
        result.preventiveActions.join(", "),
      ],
    ],
    theme: "grid",
    headStyles: {
      fillColor: [13, 110, 253],
    },
  });

  // Footer
  doc.setFontSize(10);

  doc.setTextColor(120);

  doc.text(
    "Generated using CareSphere AI powered by Gemini",
    14,
    285
  );

  doc.save(
    `AI_Report_${ticket.title.replace(/\s+/g, "_")}.pdf`
  );
}