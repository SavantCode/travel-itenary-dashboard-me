import React, { memo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface RevenueData {
  month: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

const RevenueChart: React.FC<RevenueChartProps> = memo(({ data }) => {
  return (
    <div className="relative bg-white border border-[#CBCBCB] rounded-[24px] w-full h-full min-h-[255px] overflow-hidden flex flex-col p-5">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Total Revenue</h2>
          <p className="text-[13px] text-[#8C8B8B] mt-[6px] leading-[24px]">Track your monthly revenue growth</p>
        </div>
        <select className="px-3 py-1.5 border-2 text-xs rounded-full font-medium text-[#626262] border-gray-600 hover:border-[#00B8A9] focus:outline-none" style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}>
          <option>Last Year</option>
        </select>
      </div>
      <div className="flex-grow mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} barCategoryGap="20%">
            <CartesianGrid vertical={false} stroke="#A0A0A0" strokeOpacity={0.5} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "rgba(0,0,0,0.6)", fontSize: 12 }} dy={8} />
            <YAxis hide domain={[0, 2]} type="number" ticks={[0, 1, 1.5, 2]} />
            <Tooltip formatter={(value: number) => `${value} L`} cursor={{ fill: "rgba(0,0,0,0.05)" }} contentStyle={{ fontSize: 12 }} />
            <Bar dataKey="revenue" fill="#D2FF77" radius={[10, 10, 0, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

export default RevenueChart;