import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";

export interface ConversionData {
  month: string;
  conversion: number;
  total: number;
  percentage: number;
}

export interface ConversionChartProps {
  data: ConversionData[];
}

const ConversionChart: React.FC<ConversionChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-300 p-6 shadow-sm w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Monthly Conversion
          </h2>
          <p className="text-sm text-gray-500">Track Growth, One Month at a Time- BLUE green</p>
        </div>

        <button className="px-4 py-1 text-sm border border-gray-400 rounded-full text-gray-700 hover:bg-gray-100">
          Last 6 Months
        </button>
      </div>

      <div className="flex-grow w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 12, right: 24, left: 24, bottom: 12 }}
            barCategoryGap="30%"
            barGap={4}
          >
            <CartesianGrid
              stroke="#e5e7eb"
              horizontal={true}
              vertical={true}
            />

            <YAxis
              dataKey="month"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#374151", fontSize: 13, fontWeight: 500 }}
              width={60}
            />

            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              domain={[0, "dataMax"]}
              tickCount={6}
            />

            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                fontSize: "0.875rem",
              }}
              formatter={(value: number, name: string) => [
                value,
                name === "conversion" ? "Converted" : "Total",
              ]}
            />

            <Bar
              dataKey="total"
              fill="#a78bfa"
              barSize={16}
              radius={[0, 0, 0, 0]}
            />

            <Bar
              dataKey="conversion"
              fill="#34d399"
              barSize={16}
              radius={[0, 0, 0, 0]}
            >
              <LabelList
                dataKey="percentage"
                position="right"
                formatter={(label: React.ReactNode) => {
                  const n = Number(label as any);
                  return Number.isFinite(n) ? `${n.toFixed(1)}%` : "";
                }}
                style={{ fill: "#374151", fontSize: 12, fontWeight: "500" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ConversionChart;
