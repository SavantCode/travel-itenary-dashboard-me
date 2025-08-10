import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import KPICard from '../components/Dashboard/KPICard';
import RevenueChart from '../components/Dashboard/RevenueChart';
import ConcentricTourGraph from '../components/Dashboard/ConcentricTourGraph';
import CustomersByCountryChart from '../components/Dashboard/CustomersByCountryChart';
import LeadsChart from '../components/Dashboard/LeadsChart';
import ConversionChart from '../components/Dashboard/ConversionChart';
import MonthlyConversionChart from '../components/Dashboard/MonthlyConversionBox';

import dashboardData from '../data/dashboardData.json';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

        {/* Right Side - Search and Add Button */}

        <div className="flex items-center space-x-4">
          {/* Search bar section */}
          <div className="relative">
            {/* Optional: place icon right-aligned instead */}
            <input
              type="text"
              placeholder="Search Here..."
              className="
              pl-4 pr-10 py-[6px]
              w-[172px] h-[30px]
              bg-white bg-opacity-100
              border border-gray-400 border-opacity-40
              rounded-full
              text-[10px] font-inter font-normal leading-[100%]
              placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
            "
            />
            {/* Search Icon (right-aligned) */}
            <Search
              className="
              absolute right-3 top-1/2 transform -translate-y-1/2
              w-4 h-4 text-gray-600
            "
            />
          </div>

          {/* Create New Itinerary button */}
          <button
            className="
            flex items-center justify-center space-x-2
            px-[20px] py-[6px]
            w-[201px] h-[30px]
            bg-[#4681CB]
            rounded-full
            text-[14px] font-raleway font-medium leading-[100%] text-white
            hover:bg-blue-700
            transition-colors
          "
          >
            <span>Create New Itinerary</span>
            {/* Chevron down — if needed for dropdown behavior */}
            <ChevronDown
              className="w-4 h-4 transform rotate-[-90deg] text-white"
            />
          </button>
        </div>

      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.kpiCards.map((card) => (
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



      {/* Charts Row 1 */}
      <div className="space-y-6">
        {/* First row: two charts side-by-side on lg, stacked on small */}
        <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
          <div className="flex-1 flex flex-col">
            <CustomersByCountryChart data={dashboardData.customersByCountry} />
          </div>
          <div className="flex-1 flex flex-col">
            <LeadsChart data={dashboardData.leadsData} />
          </div>
        </div>

        {/* Second 2: two charts side-by-side on lg, stacked on small */}
        <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
          <div className="flex-1 flex flex-col">

            <ConcentricTourGraph data={dashboardData.tourCategories} />
            {/* if not prps data given in concetric graph it will take default data */}



          </div>

          <div className="flex-1 flex flex-col">
            <ConversionChart data={dashboardData.conversionData} />
          </div>
        </div>
      </div>


      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ width: "1512px" }}>


        <div className="w-full">
          <RevenueChart data={dashboardData.revenueData} />
        </div>
        <div className="w-full">
          {/* lead generation pink box */}
          <MonthlyConversionChart />
        </div>
      </div>


    </div>
  );
};

export default Dashboard;