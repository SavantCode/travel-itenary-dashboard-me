import React, { memo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface LeadData { week: string; leads: number; leadsDotted: number; }
interface LeadsChartProps { data: LeadData[]; }

const LeadsChart: React.FC<LeadsChartProps> = memo(({ data }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 h-full flex flex-col">
      <header className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Total Leads</h2>
          <p className="text-sm text-gray-500 mt-1">Weekly overview of trends</p>
        </div>
        <select className="px-3 py-1.5 border text-xs rounded-full font-medium text-gray-600 border-gray-300 hover:border-teal-500 focus:outline-none transition">
          <option>Last Week</option><option>Last Month</option>
        </select>
      </header>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
            <Tooltip contentStyle={{ borderRadius: "0.75rem", border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }} />
            <Line type="monotone" dataKey="leads" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="leadsDotted" stroke="#6366f1" strokeWidth={2} strokeDasharray="4 4" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

export default LeadsChart;