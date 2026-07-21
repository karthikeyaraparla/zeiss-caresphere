import GaugeComponent from "react-gauge-component";

interface RiskGaugeProps {
  value: number;
}

export default function RiskGauge({ value }: RiskGaugeProps) {
  return (
    <div className="w-full flex justify-center">
      <GaugeComponent
  type="semicircle"
  value={value}
  minValue={0}
  maxValue={100}
  arc={{
    width: 0.22,
    padding: 0.02,
    cornerRadius: 8,
    subArcs: [
      { limit: 40, color: "#22C55E" },
      { limit: 70, color: "#EAB308" },
      { limit: 90, color: "#F97316" },
      { color: "#DC2626" },
    ],
  }}
  pointer={{
    animate: true,
    color: "#111827",
    length: 0.75,
    width: 12,
  }}
  labels={{
    valueLabel: {
      formatTextValue: (v) => `${v}%`,
      style: {
        fontSize: "40px",
        fill: "#111827",
      },
    },
  }}
/>
    </div>
  );
}