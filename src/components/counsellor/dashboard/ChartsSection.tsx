import { DuoCard } from "@/components/duo";
import { Activity } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface ChartsSectionProps {
  trendData: any[];
  pieData: any[];
}

export function ChartsSection({ trendData, pieData }: Readonly<ChartsSectionProps>) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Wellbeing Trend Line Chart */}
      <DuoCard className="border border-border bg-card p-5">
        <div className="mb-4">
          <h2 className="font-display text-sm font-extrabold text-foreground flex items-center gap-2">
            <Activity className="size-4 text-duo-pink" /> Wellbeing Risk Trend
          </h2>
          <p className="text-[10px] text-muted-foreground font-semibold">
            Distress indices of High, Medium, and Low risk cohorts over the past 6 weeks.
          </p>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="week" tick={{ fontSize: 9, fontWeight: 700 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 9, fontWeight: 700 }} />
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
              <Line
                type="monotone"
                name="High Risk"
                dataKey="High Risk"
                stroke="#FF4B4B"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                name="Medium Risk"
                dataKey="Medium Risk"
                stroke="#FF9600"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                name="Low Risk"
                dataKey="Low Risk"
                stroke="#58CC02"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </DuoCard>

      {/* Case Status Distribution Pie Chart */}
      <DuoCard className="border border-border bg-card p-5">
        <div className="mb-4">
          <h2 className="font-display text-sm font-extrabold text-foreground flex items-center gap-2">
            <Activity className="size-4 text-duo-purple" /> Case Status Breakdown
          </h2>
          <p className="text-[10px] text-muted-foreground font-semibold">
            Distribution of Open, In Progress, and Closed case files for the current semester.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 h-48">
          <div className="h-full w-full sm:w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "12px",
                    fontSize: "11px",
                    fontWeight: "700",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-2.5 w-full sm:w-1/2 text-xs font-bold">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-2 rounded-xl bg-muted/30 border border-border/60">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="text-foreground font-numeric">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </DuoCard>
    </div>
  );
}
