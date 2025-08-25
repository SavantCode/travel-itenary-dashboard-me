import React, { memo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, ResponsiveContainer } from "recharts";

export interface ConversionData {
  month: string; conversion: number; total: number; percentage: number;
}
export interface ConversionChartProps { data: ConversionData[]; }

const ConversionChart: React.FC<ConversionChartProps> = memo(({ data }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm w-full h-full min-h-[300px] flex flex-col">
      <header className="flex flex-wrap justify-between items-center mb-6 gap-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Monthly Conversion</h2>
          <p className="text-sm text-gray-500 mt-1">Track growth, one month at a time</p>
        </div>
        <button className="px-3 py-1.5 border text-xs rounded-full font-medium text-gray-600 border-gray-300 hover:border-teal-500 focus:outline-none transition">Last 6 Months</button>
      </header>
      <div className="flex-grow w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 5, bottom: 5 }} barCategoryGap="35%">
            <CartesianGrid stroke="#e5e7eb" horizontal={false} />
            <YAxis dataKey="month" type="category" axisLine={false} tickLine={false} tick={{ fill: "#374151", fontSize: 13 }} width={60} />
            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} domain={[0, "dataMax + 20"]} />
            <Tooltip cursor={{ fill: "rgba(0,0,0,0.04)" }} contentStyle={{ borderRadius: "0.75rem", border: "1px solid #e5e7eb" }} />
            <Bar dataKey="total" fill="#e5e7eb" radius={[4, 4, 4, 4]} barSize={18} />
            <Bar dataKey="conversion" fill="#34d399" radius={[4, 4, 4, 4]} barSize={18}>
              <LabelList dataKey="percentage" position="right" formatter={(v: number) => `${v.toFixed(0)}%`} style={{ fill: "#374151", fontSize: 12, fontWeight: "500" }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

export default ConversionChart;