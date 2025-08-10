import React, { useState } from 'react';

export interface TourCategory {
  name: string;
  value: number;
  percentage: number;
  customers: number;
  color: string;
}

interface ConcentricTourGraphProps {
  data?: TourCategory[];
}

const defaultData: TourCategory[] = [
  {
    name: "Adventure Tours",
    value: 35,
    percentage: 35,
    customers: 2847,
    color: "#A2D2FF",
  },
  {
    name: "Cultural Tours",
    value: 28,
    percentage: 28,
    customers: 2274,
    color: "#00B8A9",
  },
  {
    name: "Luxury Tours",
    value: 22,
    percentage: 22,
    customers: 1786,
    color: "#FFB3C6",
  },
  {
    name: "Eco Tours",
    value: 15,
    percentage: 15,
    customers: 1218,
    color: "#CDB4DB",
  },
];

const ConcentricTourGraph: React.FC<ConcentricTourGraphProps> = ({ data }) => {
  const [filter, setFilter] = useState<'Last Week' | 'Last Month' | 'All Time'>('Last Week');

  // Use incoming data or fallback to default
  const rawData = data && data.length > 0 ? data : defaultData;

  // Apply filter logic
  const scale = filter === 'Last Week' ? 0.3 : filter === 'Last Month' ? 0.6 : 1;

  const scaledData = rawData.map((item) => ({
    ...item,
    customers: Math.floor(item.customers * scale),
  }));

  const totalCustomers = scaledData.reduce((sum, item) => sum + item.customers, 0);

  const finalData = scaledData.map((item) => ({
    ...item,
    percentage: totalCustomers > 0 ? Math.round((item.customers / totalCustomers) * 100) : 0,
  }));

  const size = 238;
  const center = size / 2;
  const maxRadius = 110;
  const strokeWidth = 18;
  const gap = 8;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 w-[592px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 font-roboto">Total Tours</h3>
          <p className="text-sm text-gray-500 font-roboto">
            Explore the most popular types of tours
          </p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="px-3 py-1.5 border border-gray-400 text-xs rounded-[10px] font-medium text-[#626262] hover:border-[#00B8A9] focus:outline-none font-inter"
        >
          <option>Last Week</option>
          <option>Last Month</option>
          <option>All Time</option>
        </select>
      </div>

      <div className="flex gap-6">
        {/* Table */}
        <div className="flex flex-col w-[290px]">
          {/* Table Header */}
          <div className="grid grid-cols-2 gap-2 text-sm font-semibold text-[#767676] font-roboto pb-2 border-b border-gray-200">
            <span className="text-black">Category</span>
            <span className="text-center">% Share</span>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col divide-y divide-gray-100">
            {finalData.map((item) => (
              <div
                key={item.name}
                className="grid grid-cols-2 items-center py-2 transition-transform hover:scale-[1.01] group"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-[9px] h-[9px] shrink-0 rounded-full inline-block"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-black font-medium font-roboto">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm text-center text-[#767676] font-semibold font-roboto">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Concentric Graph */}
        <div className="relative w-[238px] h-[238px]">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background rings */}
            {finalData.map((_, index) => {
              const radius = maxRadius - index * (strokeWidth + gap);
              return (
                <circle
                  key={`bg-${index}`}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke="#f5f5f5"
                  strokeWidth={strokeWidth}
                />
              );
            })}

            {/* Data rings */}
            {finalData.map((item, index) => {
              const radius = maxRadius - index * (strokeWidth + gap);
              const circumference = 2 * Math.PI * radius;
              const dashArray = (item.percentage / 100) * circumference;
              const rotationOffset = index * 45;

              return (
                <circle
                  key={`data-${index}`}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={`${dashArray} ${circumference}`}
                  strokeDashoffset={0}
                  style={{
                    transform: `rotate(${rotationOffset}deg)`,
                    transformOrigin: `${center}px ${center}px`,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                  }}
                  className="transition-all duration-300 hover:brightness-110"
                />
              );
            })}
          </svg>

          {/* Small glowing center circle */}
          <div
            className="absolute rounded-full bg-white border border-gray-300"
            style={{
              width: '24px',
              height: '24px',
              left: '107px',
              top: '107px',
              boxShadow: '0 0 10px rgba(0, 184, 169, 0.5)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ConcentricTourGraph;
