// Line Chart
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface LeadData {
  week: string;
  leads: number;
  leadsDotted: number;
}

interface TotalLeadsChartProps {
  data: LeadData[];
}

const TotalLeadsChart: React.FC<TotalLeadsChartProps> = ({ data }) => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "20px",
        width: "592px",
        height: "365px",
        border: "1px solid #ddd",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
      }}
    >
     {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Total Leads</h2>
          <p className="text-[12px] text-[#8C8B8B] mt-[6px] leading-[24px]">Weekly overview of lead generation trends</p>
        </div>
        <select className="px-3 py-1.5 border-2 text-xs rounded-full font-medium text-[#626262] border-gray-600  hover:border-[#00B8A9] hover:bg-gray-100 focus:outline-none font-inter"
        style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}>
          <option>Last Week</option>
          <option>Last Month</option>
          <option>Last Year</option>
        </select>
      </div>
      {/* Chart + Legend */}
      <div style={{ height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="0" stroke="#e5e5e5" />
            <XAxis dataKey="week" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #ccc"
              }}
            />
            <Line
              type="linear"
              dataKey="leads"
              stroke="#000"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2, fill: "#000" }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="linear"
              dataKey="leadsDotted"
              stroke="#3b82f6"
              strokeWidth={1.5}
              strokeDasharray="3 3"
              dot={{ r: 3, fill: "#3b82f6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TotalLeadsChart;
