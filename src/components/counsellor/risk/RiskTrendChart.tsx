import React from "react";
import { Activity } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { DuoCard } from "@/components/duo";

interface RiskTrendChartProps {
  trendData: any[];
}

export const RiskTrendChart: React.FC<RiskTrendChartProps> = ({ trendData }) => {
  return (
    <DuoCard className="p-4 border-2 border-border bg-card">
      <div className="mb-4">
        <h2 className="font-display text-sm font-extrabold text-foreground flex items-center gap-2">
          <Activity className="size-4 text-duo-blue" /> Wellness Risk Trend over Time (ISMS 2.0 Monitoring)
        </h2>
        <p className="text-[10px] text-muted-foreground font-semibold">
          Track cohort wellbeing trends across high, medium, and low risk segments over the last 6 weeks.
        </p>
      </div>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
            <XAxis dataKey="week" tick={{ fontSize: 9, fontWeight: 700 }} />
            <YAxis allowDecimals={false} domain={[0, 5]} tick={{ fontSize: 9, fontWeight: 700 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                borderRadius: "12px",
                fontSize: "11px",
                fontWeight: "700",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "10px", fontWeight: "700" }} />
            <Line type="monotone" name="High Risk" dataKey="High Risk" stroke="#FF4B4B" strokeWidth={3} activeDot={{ r: 8 }} />
            <Line type="monotone" name="Medium Risk" dataKey="Medium Risk" stroke="#FF9600" strokeWidth={3} activeDot={{ r: 6 }} />
            <Line type="monotone" name="Low Risk" dataKey="Low Risk" stroke="#58CC02" strokeWidth={3} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DuoCard>
  );
};
