import React, { memo, useState } from 'react';
import { Search, ChevronDown, Users, DollarSign, TrendingUp, MapPin, ArrowUpRight } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { useNavigate } from 'react-router-dom';




// --- UPDATED DUMMY DATA ---
const dashboardData = {
  "kpiCards": [
    { "id": 1, "title": "Total Customers", "value": "10,284", "subtitle": "Customers", "growth": "21.5%", "icon": "users", "color": "bg-blue-100", "iconColor": "text-blue-500" },
    { "id": 2, "title": "Total Revenue", "value": "$84,284", "subtitle": "Revenue", "growth": "12.8%", "icon": "dollar", "color": "bg-green-100", "iconColor": "text-green-500" },
    { "id": 3, "title": "Conversion Rate", "value": "68.4%", "subtitle": "Conversion", "growth": "8.2%", "icon": "trending", "color": "bg-purple-100", "iconColor": "text-purple-500" },
    { "id": 4, "title": "Avg. Tour Price", "value": "$1,240", "subtitle": "Avg. Price", "growth": "5.6%", "icon": "map", "color": "bg-orange-100", "iconColor": "text-orange-500" }
  ],
  "customersByCountry": [
    { "country": "USA", "percentage": 40, "customers": 4112, "color": "#8884d8" },
    { "country": "Canada", "percentage": 25, "customers": 2570, "color": "#82ca9d" },
    { "country": "UK", "percentage": 20, "customers": 2056, "color": "#ffc658" },
    { "country": "Australia", "percentage": 15, "customers": 1542, "color": "#ff8042" }
  ],
  "leadsData": [
    { week: 'W1', currentWeek: 119, previousWeek: 104 },
    { week: 'W2', currentWeek: 105, previousWeek: 115 },
    { week: 'W3', currentWeek: 130, previousWeek: 110 },
    { week: 'W4', currentWeek: 100, previousWeek: 122 },
    { week: 'W5', currentWeek: 148, previousWeek: 139 },
  ],
  "revenueData": [
    { month: 'Jan 22', revenue: 0.9 }, { month: 'Feb 22', revenue: 1.1 }, { month: 'Mar 22', revenue: 1.1 },
    { month: 'Apr 22', revenue: 0.6 }, { month: 'May 22', revenue: 1.25 }, { month: 'Jun 22', revenue: 1.2 },
    { month: 'Jul 22', revenue: 0.8 }, { month: 'Aug 22', revenue: 1.0 }, { month: 'Sep 22', revenue: 1.02 },
    { month: 'Oct 22', revenue: 1.8 }, { month: 'Nov 22', revenue: 1.0 }, { month: 'Dec 22', revenue: 1.3 },

    { month: 'Jan 23', revenue: 1.1 }, { month: 'Feb 23', revenue: 0.7 }, { month: 'Mar 23', revenue: 1.3 },
    { month: 'Apr 23', revenue: 1.5 }, { month: 'May 23', revenue: 0.9 }, { month: 'Jun 23', revenue: 1.4 },
    { month: 'Jul 23', revenue: 1.1 }, { month: 'Aug 23', revenue: 0.92 }, { month: 'Sep 23', revenue: 1.6 },
    { month: 'Oct 23', revenue: 1.4 }, { month: 'Nov 23', revenue: 1.2 }, { month: 'Dec 23', revenue: 1.7 },

    { month: 'Jan 24', revenue: 1.6 }, { month: 'Feb 24', revenue: 1.8 }, { month: 'Mar 24', revenue: 1.9 },
    { month: 'Apr 24', revenue: 1.2 }, { month: 'May 24', revenue: 1.0 }, { month: 'Jun 24', revenue: 1.3 },
    { month: 'Jul 24', revenue: 1.5 }, { month: 'Aug 24', revenue: 0.8 }, { month: 'Sep 24', revenue: 0.6 },
    { month: 'Oct 24', revenue: 1.1 }, { month: 'Nov 24', revenue: 1.0 }, { month: 'Dec 24', revenue: 1.4 },

    { month: 'Jan 25', revenue: 1.9 }, { month: 'Feb 25', revenue: 1.3 }, { month: 'Mar 25', revenue: 1.0 },
    { month: 'Apr 25', revenue: 0.9 }, { month: 'May 25', revenue: 1.7 }, { month: 'Jun 25', revenue: 1.5 },
    { month: 'Jul 25', revenue: 1.6 }, { month: 'Aug 25', revenue: 1.2 }, { month: 'Sep 25', revenue: 1.0 },
    { month: 'Oct 25', revenue: 1.3 }, { month: 'Nov 25', revenue: 1.1 }, { month: 'Dec 25', revenue: 0.7 },
  ],
  "tourCategories": [
    { "name": "Adventure Tours", "value": 35, "percentage": 35, "customers": 2847, "color": "#A2D2FF" },
    { "name": "Cultural Tours", "value": 28, "percentage": 28, "customers": 2274, "color": "#00B8A9" },
    { "name": "Luxury Tours", "value": 22, "percentage": 22, "customers": 1786, "color": "#FFB3C6" },
    { "name": "Eco Tours", "value": 15, "percentage": 15, "customers": 1218, "color": "#CDB4DB" }
  ],
  "conversionData": [
    { month: 'Jul', metricA: 170, metricB: 620, percentage: 25.6 },
    { month: 'Jun', metricA: 155, metricB: 500, percentage: 24.3 },
    { month: 'May', metricA: 180, metricB: 550, percentage: 29.2 },
    { month: 'Apr', metricA: 175, metricB: 580, percentage: 26.4 },
    { month: 'Mar', metricA: 210, metricB: 620, percentage: 31.6 },
    { month: 'Feb', metricA: 150, metricB: 480, percentage: 25.3 },
    { month: 'Jan', metricA: 180, metricB: 650, percentage: 26.6 },
  ],
};

// =====================================================================================
// 1. CHILD COMPONENTS (MEMOIZED FOR PERFORMANCE)
// =====================================================================================

interface KPICardProps {
  title: string; value: string; subtitle: string; growth: string;
  icon: 'users' | 'dollar' | 'trending' | 'map';
  color: string; iconColor: string;
}
const KPICard: React.FC<KPICardProps> = memo(({ title, value, subtitle, growth, icon, color, iconColor }) => {
  const IconComponent = { users: Users, dollar: DollarSign, trending: TrendingUp, map: MapPin }[icon];
  
  return (
    <div className={`rounded-2xl shadow-sm border border-gray-300 p-4 flex flex-col justify-between ${color}`}>
      <div className="flex justify-between items-start">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-black/5">
          <IconComponent className={`${iconColor} w-6 h-6`} />
        </div>
        <div className="flex items-center bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
          <ArrowUpRight size={12} className="mr-1" />
          {growth}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700">{title}</p>
        <div className="flex items-baseline space-x-2 mt-1">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          <span className="text-sm font-medium text-gray-600 truncate">{subtitle}</span>
        </div>
      </div>
    </div>
  );
});

interface CountryData { country: string; percentage: number; customers: number; color: string; }
interface CustomersByCountryChartProps { data: CountryData[]; }
const CustomersByCountryChart: React.FC<CustomersByCountryChartProps> = memo(({ data }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Customers by Country</h2>
        <select className="px-3 py-1.5 border text-xs rounded-full font-medium text-gray-600 border-gray-300 hover:border-teal-500 focus:outline-none">
          <option>Last Week</option>
          <option>Last Month</option>
            <option>All Time</option>
        </select>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-48 h-48 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="percentage">
                {data.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 w-full">
          <div className="space-y-3">
            {data.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-x-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="font-medium text-gray-700">{item.country}</span>
                </div>
                <span className="font-semibold text-gray-800">{item.customers.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

interface LeadData { week: string; currentWeek: number; previousWeek: number; }
interface LeadsChartProps { data: LeadData[]; }
const LeadsChart: React.FC<LeadsChartProps> = memo(({ data }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Total Leads</h2>
          <p className="text-sm text-gray-500 mt-1">Weekly overview of lead generation trends</p>
        </div>
        {/* <button className="px-4 py-1.5 border text-xs font-medium rounded-md text-gray-700 border-gray-300 hover:bg-gray-50 focus:outline-none">
            <select className="px-3 py-1.5 border text-xs rounded-full font-medium text-gray-600 border-gray-300 hover:border-teal-500 focus:outline-none">
        </select>
         
         
        </button> */}
        <select className="px-3 py-1.5 border text-xs rounded-full font-medium text-gray-600 border-gray-300 hover:border-teal-500 focus:outline-none">
          <option>Last Week</option>
          <option>Last Month</option>
          <option>All Time</option>
        </select>
          
      </div>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
            <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} domain={[80, 150]} ticks={[80, 90, 100, 110, 120, 130, 140, 150]} />
            <Tooltip contentStyle={{ borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} />
            <Line type="linear" dataKey="currentWeek" name="Current Week" stroke="#1A202C" strokeWidth={2} dot={{ r: 3, fill: '#1A202C' }} activeDot={{ r: 6 }} />
            <Line type="linear" dataKey="previousWeek" name="Previous Week" stroke="#A9B5D8" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3, fill: '#A9B5D8' }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

// --- [UPDATED] RevenueChart Component ---
const RevenueChart: React.FC<{ data: { month: string; revenue: number }[] }> = memo(({ data }) => {
  const [selectedYear, setSelectedYear] = useState('25');
  const years = Array.from(new Set(data.map(item => item.month.split(' ')[1])));
  const filteredData = data.filter(item => item.month.endsWith(selectedYear));
  const revenueValues = filteredData.map(d => d.revenue);
  const maxY = Math.ceil((Math.max(...revenueValues) + 0.2) * 2) / 2;
  const minY = Math.floor((Math.min(...revenueValues) - 0.2) * 2) / 2;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Total Revenue</h2>
          <p className="text-sm text-gray-500 mt-1">Track your monthly revenue growth and performance.</p>
        </div>
        <select className="px-4 py-1.5 border text-xs font-medium rounded-full text-gray-700 border-gray-300 hover:bg-gray-50 focus:outline-none"
          value={selectedYear}
          onChange={e => setSelectedYear(e.target.value)}>
          {years.map(y => <option key={y} value={y}>Year {y}</option>)}
        </select>
      </div>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredData} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
            <YAxis axisLine={false} tickLine={false} tickFormatter={v => `${v.toFixed(1)}L`} tick={{ fontSize: 12, fill: '#6b7280' }} domain={[minY, maxY]} />
            <Tooltip cursor={{ fill: 'rgba(196, 244, 113, 0.2)' }} contentStyle={{ borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} formatter={v => [`${v} L`, "Revenue"]} />
            <Bar dataKey="revenue" fill="#C4F471" radius={[6, 6, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

const MonthlyConversionChartInfo: React.FC = memo(() => (
  <div className="bg-[#FDEEE1] rounded-2xl p-6 shadow-sm border border-gray-200 h-full flex flex-col justify-between">
    <div>
      <div className="flex justify-between items-start">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#FFD8B6]">
          <TrendingUp className="w-6 h-6 text-[#d97706]" />
        </div>
        <div className="flex items-center bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
          <ArrowUpRight size={12} className="mr-1" />
          20%
        </div>
      </div>
      <h5 className='text-md font-bold text-gray-700 mt-4'> Monthly Conversion</h5>
      <h3 className="text-lg font-bold text-gray-800 mt-6">Leads turned into customers</h3>
    
    <p className="text-sm text-gray-600 leading-relaxed mt-4 font-semibold">Leads Turned into Customers shows how many people who showed interest in your travel services actually booked a trip. It helps you understand how well you're turning inquiries into real customers. The better this number, the more successful your efforts are in converting leads into sales."</p>
    </div>
  </div>
));
interface TourCategory { name: string; value: number; percentage: number; customers: number; color: string; }
const ConcentricTourGraph: React.FC<{ data: TourCategory[] }> = memo(({ data }) => {
  const size = 200, center = size / 2, maxRadius = 90, strokeWidth = 16, gap = 6;
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 h-full">  
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Total Tours</h2>
        <select className="px-3 py-1.5 border text-xs rounded-full font-medium text-gray-600 border-gray-300 hover:border-teal-500 focus:outline-none">
          <option>Last Week</option>
          <option>Last Month</option>
          <option>All Time</option>
        </select>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative shrink-0" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="transform -rotate-90">
            {data.map((item, index) => {
              const radius = maxRadius - index * (strokeWidth + gap);
              const circumference = 2 * Math.PI * radius;
              const dashArray = (item.percentage / 100) * circumference;
              return (
                <g key={index}>
                  <circle cx={center} cy={center} r={radius} fill="none" stroke="#f5f5f5" strokeWidth={strokeWidth} />
                  <circle cx={center} cy={center} r={radius} fill="none" stroke={item.color} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={`${dashArray} ${circumference}`} />
                </g>
              );
            })}
          </svg>
        </div>
        <div className="flex-1 w-full">
          <div className="space-y-3">
            {data.map(item => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-x-3">
                  <span className="w-3 h-3 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span className="font-semibold">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

interface ConversionData { month: string; metricA: number; metricB: number; percentage: number; }
const ConversionChart: React.FC<{ data: ConversionData[] }> = memo(({ data }) => (
  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm w-full h-full flex flex-col">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Monthly Conversion</h2>
        <p className="text-sm text-gray-500 mt-1">Track Growth, One Month at a Time.</p>
      </div>
      <button className="px-4 py-1.5 border text-xs font-medium rounded-full text-gray-700 border-gray-300 hover:bg-gray-50 focus:outline-none">
        Last 6 Month
          
      </button>
    </div>
    <div className="flex-grow w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 50, left: 5, bottom: 5 }} barSize={10} barCategoryGap="50%">
          <CartesianGrid stroke="#e5e7eb" horizontal={false} />
          <YAxis dataKey="month" type="category" axisLine={false} tickLine={false} tick={{ fill: "#374151", fontSize: 13, fontWeight: 500 }} width={40} />
          <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} domain={[0, 800]} ticks={[0, 200, 400, 600, 800]} />
          <Tooltip cursor={{ fill: "rgba(0,0,0,0.04)" }} contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }} />
          <Bar dataKey="metricA" name="Converted" fill="#7AF2C1" radius={[0, 6, 6, 0]}>
            <LabelList dataKey="percentage" position="right" offset={8} formatter={v => `${v.toFixed(1)}%`} style={{ fill: "#374151", fontSize: 12, fontWeight: "500" }} />
          </Bar>
          <Bar dataKey="metricB" name="Total Leads" fill="#A37FF2" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
));

// const Dashboard: React.FC = () => (
//   <div className="w-full p-4 md:p-6 lg:p-8 bg-gray-50">
//     <div className="space-y-6">
//       <div className="flex flex-wrap items-center justify-between gap-4">
//         <h1 className="text-2xl font-bold text-teal-600">Dashboard</h1>
//         <div className="flex items-center flex-wrap gap-4">
//           <div className="relative">
//             <input type="text" placeholder="Search Here..." className="pl-4 pr-10 py-2 w-52 h-9 bg-white border border-gray-300 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500" />
//             <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />
//           </div>

//           <button className="flex items-center justify-center gap-x-2 px-5 py-2 w-52 h-9 bg-teal-500 hover:bg-teal-600 rounded-full text-sm font-medium text-white transition-colors">
        
//             <span>Create New Itinerary</span>
//             <ChevronDown className="w-4 h-4" />
//           </button>

//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {dashboardData.kpiCards.map(card => (
//           <KPICard
//             key={card.id}
//             title={card.title}
//             value={card.value}
//             subtitle={card.subtitle}
//             growth={card.growth}
//             icon={card.icon}
//             color={card.color}
//             iconColor={card.iconColor}
//           />
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
//         <CustomersByCountryChart data={dashboardData.customersByCountry} />
//         <LeadsChart data={dashboardData.leadsData} />
//         <RevenueChart data={dashboardData.revenueData} />
//         <MonthlyConversionChartInfo />
//         <ConcentricTourGraph data={dashboardData.tourCategories} />
//         <ConversionChart data={dashboardData.conversionData} />
//       </div>
//     </div>
//   </div>
// );
const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  return (<div className=" w-full rounded-lg  pl-0 p-4 md:p-2 lg:p-2 bg-gray-50 ">
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-bold text-[#10A4B0] font-raleway">Dashboard</h1>
        <div className="flex items-center flex-wrap gap-4">
          <div className="relative">
            <input type="text" placeholder="Search Here..." className="pl-4 pr-10 py-2 w-52 h-9 bg-white border border-gray-300 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 font-raleway" />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />
          </div>
          {/* <button className="flex items-center justify-center gap-x-2 px-5 py-2 w-52 h-9 bg-teal-500 hover:bg-teal-600 rounded-full text-sm font-medium text-white transition-colors">
            <span>Create New Itinerary</span>
            <ChevronDown className="w-4 h-4" />
          </button> */}
             <button
      onClick={() => navigate("/login")}  // 👈 directly inside button
      className="flex items-center justify-center gap-x-2 px-5 py-2 w-52 h-9 bg-teal-500 hover:bg-teal-600 rounded-full text-sm font-medium text-white transition-colors font-raleway"
    >
      <span>Create New Itinerary</span>
      <ChevronDown className="w-4 h-4" />
    </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.kpiCards.map(card => (
          <KPICard
            key={card.id}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            growth={card.growth}
            icon={card.icon}
            color={card.color}
            iconColor={card.iconColor}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
        <CustomersByCountryChart data={dashboardData.customersByCountry} />
        <LeadsChart data={dashboardData.leadsData} />
        <RevenueChart data={dashboardData.revenueData} />
        <MonthlyConversionChartInfo />
        <ConcentricTourGraph data={dashboardData.tourCategories} />
        <ConversionChart data={dashboardData.conversionData} />
      </div>
    </div>
  </div>)
};

export default Dashboard;