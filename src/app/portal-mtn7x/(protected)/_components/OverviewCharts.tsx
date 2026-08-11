"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import { STATUS_COLORS, STATUS_LABEL_ID } from "../_lib/theme";

export interface CategoryDatum {
  name: string;
  count: number;
  color: string;
}

export interface StatusDatum {
  status: string;
  count: number;
}

function ChartTooltip({ active, payload }: { active?: boolean; payload?: { name: string; value: number; payload: { fill?: string } }[] }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-md border border-white/10 bg-[#1a1a1c] px-3 py-2 text-xs shadow-xl">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.payload.fill }} />
        <span className="text-zinc-300">{item.name}</span>
        <span className="font-semibold text-white">{item.value}</span>
      </div>
    </div>
  );
}

export function CategoryBarChart({ data }: { data: CategoryDatum[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }} barCategoryGap={14}>
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          width={90}
          tick={{ fill: "#a1a1aa", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip cursor={{ fill: "rgba(255,255,255,0.03)" }} content={<ChartTooltip />} />
        <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={22}>
          {data.map((d) => (
            <Cell key={d.name} fill={d.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function StockDonutChart({ data }: { data: StatusDatum[] }) {
  const total = data.reduce((sum, d) => sum + d.count, 0);
  const chartData = data.map((d) => ({
    name: STATUS_LABEL_ID[d.status] ?? d.status,
    value: d.count,
    fill: STATUS_COLORS[d.status as keyof typeof STATUS_COLORS] ?? "#71717a",
  }));

  return (
    <div className="flex items-center gap-6">
      <ResponsiveContainer width={140} height={140}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={44}
            outerRadius={64}
            paddingAngle={2}
            stroke="#111113"
            strokeWidth={2}
          >
            {chartData.map((d) => (
              <Cell key={d.name} fill={d.fill} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="space-y-2.5">
        {chartData.map((d) => (
          <div key={d.name} className="flex items-center gap-2 text-sm">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.fill }} />
            <span className="text-zinc-400">{d.name}</span>
            <span className="font-semibold text-white ml-auto pl-4">{d.value}</span>
          </div>
        ))}
        <div className="pt-2 mt-1 border-t border-white/[0.06] text-xs text-zinc-500">Total {total} produk</div>
      </div>
    </div>
  );
}
