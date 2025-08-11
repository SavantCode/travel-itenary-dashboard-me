// Dohnout Shape
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface CountryData {
  country: string;
  percentage: number;
  customers: number;
  color: string;
}

interface CustomersByCountryChartProps {
  data: CountryData[];
}

const CustomersByCountryChart: React.FC<CustomersByCountryChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Total Leads</h2>
          <p className="text-[13px] text-[#8C8B8B] mt-[6px] leading-[24px]">Weekly overview of lead generation trends</p>
        </div>
        <select className="px-3 py-1.5 border-2 text-xs rounded-full font-medium text-[#626262] border-gray-600  hover:border-[#00B8A9] hover:bg-gray-100 focus:outline-none font-inter"
        style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}>
          <option>Last Week</option>
          <option>Last Month</option>
          <option>Last Year</option>
        </select>
      </div>

      {/* Chart + Legend */}
      <div className="flex items-center space-x-8">
        {/* Pie Chart */}
        <div className="" style={{ width: 234, height: 234 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="percentage"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex-1">
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-medium text-gray-600 border-b pb-2">
              <span>Country</span>
              <span>% Share</span>
              <span>No. of Customers</span>
            </div>
            {data.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">{item.country}</span>
                </div>
                <span className="text-sm text-gray-600">{item.percentage}%</span>
                <span className="text-sm font-medium text-gray-900">{item.customers}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersByCountryChart;
