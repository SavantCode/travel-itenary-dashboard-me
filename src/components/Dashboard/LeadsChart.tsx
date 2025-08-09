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
        border: "1px solid #ddd",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
      }}
    >
      <h2 style={{ margin: 0 }}>Total Leads</h2>
      <p style={{ color: "#888", margin: "4px 0 20px" }}>
        Weekly overview of lead generation trends
      </p>
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
