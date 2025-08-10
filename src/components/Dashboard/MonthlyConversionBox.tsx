import React from "react";
import MonthlyIcon from "../../assets/MonthlyConversionIcon.svg";

const MonthlyConversionCard: React.FC = () => {
  return (
    <div
      className={`
    w-[386px]  /* Set fixed width */
    h-[255px]  /* Keep the height if needed */
    box-border
    bg-[#FDEEE1]
    border border-[#CBCBCB]
    shadow-[0_0_10px_rgba(0,0,0,0.25),inset_0_0_10px_rgba(0,0,0,0.25)]
    rounded-[24px]
    p-4
    relative
    overflow-hidden
  `}
      role="region"
      aria-label="Monthly Conversion Card"
    >

      {/* Green % Badge */}
      <div
        className="absolute top-3 right-3 w-[72px] h-[24px] bg-green-500 text-white text-[12px] font-bold flex items-center justify-center gap-[4px] rounded-full shadow-md z-10"
      >
        {/* Diagonal arrow icon first */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h10v10" />
        </svg>
        20%
      </div>


      {/* Icon + Tag */}
      <div className="absolute left-4 top-4 w-[55px] h-[40px] bg-[#FFD8B6] rounded-[10px] flex items-center justify-center">
        <img
          src={MonthlyIcon}
          alt="Chart Icon"
          className="w-6 h-6"
        />
      </div>

      {/* Text Content */}
      <div className="mt-[58px] pr-1">
        <h3 className="text-sm font-medium text-gray-800 mb-1">
          Monthly Conversion
        </h3>
        <h4 className="text-base font-bold text-gray-900 mb-2 leading-snug">
          Leads turned into customers
        </h4>
        <p className="text-xs text-gray-700 leading-tight line-clamp-4">
          “Leads Turned into Customers” shows the percentage of potential clients who showed interest in your travel services and successfully booked a trip. It helps you understand how effective your sales team is at converting leads into sales.
        </p>
      </div>
    </div>
  );
};

export default MonthlyConversionCard;
