import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RevenueData {
  month: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  return (
    <div
      className="relative bg-white border border-[#CBCBCB] rounded-[24px] w-full max-w-[838px] h-[255px] overflow-hidden"
      style={{
        fontFamily: "Inter, sans-serif",
        // borderTopWidth: 0, // Remove top border for better top grid line visibility
      }}
    >
      {/* Title and description */}
      <div className="absolute top-[20px] left-[20px]">
        <h3 className="text-[18px] font-normal text-black leading-[24px]">
          Total Revenue
        </h3>
        <p className="text-[12px] text-[#8C8B8B] mt-[6px] leading-[24px]">
          {/* Track your monthly revenue growth and performance. */}
          reeeeeeeeeeeeeveeeeeeeeeeeeeeenueeeeeeeeee
        </p>
      </div>

      {/* "Last Year" badge */}
      <div className="absolute top-[16px] right-[20px] bg-white border border-[#626262] text-[#626262] text-[10px] font-medium rounded-[10px] px-3 py-[2px] leading-[12px] whitespace-nowrap">
        Last Year
      </div>

      {/* Y-axis labels aligned with ticks and grid lines */}
      <div
        className="absolute left-[20px] top-[82px] h-[133px] flex flex-col justify-between text-[12px] text-[rgba(0,0,0,0.6)] font-normal leading-[16px] pointer-events-none"
        aria-hidden="true"
        style={{ userSelect: "none" }}
      >
        <span style={{ lineHeight: "16px", paddingBottom: "4px" }}>2L</span>
        <span style={{ lineHeight: "16px" }}>1.5L</span>
        <span style={{ lineHeight: "16px" }}>1L</span>
        <span style={{ lineHeight: "16px", paddingTop: "4px" }}>0L</span>
      </div>

      {/* Chart container */}
      <div className="absolute top-[82px] left-[64px] right-[16px] bottom-[32px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }} // Add top margin to push lines down
            barCategoryGap="20%"
            barGap={4}
          >
            <CartesianGrid
              vertical={false}
              stroke="#A0A0A0" // consistent grey color
              strokeOpacity={0.5} // increased opacity for better visibility
              strokeDasharray="" // solid lines
              horizontal={true}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(0,0,0,0.6)", fontSize: 12, fontWeight: 500 }}
              dy={8}
            />

            <YAxis
              hide
              domain={[0, 2]}
              type="number"
              ticks={[0, 1, 1.5, 2]} // exact tick positions for grid lines and labels
              interval={0}
            />

            <Tooltip
              formatter={(value) => `${value} L`}
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
              contentStyle={{ fontSize: 12, fontFamily: "Inter, sans-serif" }}
            />

            <Bar
              dataKey="revenue"
              fill="#D2FF77"
              radius={[10, 10, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
