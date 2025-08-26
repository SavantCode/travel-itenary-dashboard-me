import React from "react";

const Pricing = () => {
  return (
      <div className="bg-[#F6F6FA] min-h-screen p-4  sm:p-6 lg:p-2 font-raleway">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-teal-500 mb-3">
        Pricing
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Add Package Pricing (Text Editor) */}
          <div className="bg-white shadow rounded-xl p-4">
            <label className="block text-gray-700 font-medium text-xs mb-2">
              Add Package Pricing<span className="text-red-500">*</span>
            </label>
            <div className="border rounded-lg p-2 h-28 text-gray-500 text-xs">
              Enter a short overview
            </div>
          </div>

          {/* Add Package Pricing (Flight Details) */}
          <div className="bg-white shadow rounded-xl p-4">
            <label className="block text-gray-700 font-medium text-xs mb-4">
              Add Package Pricing<span className="text-red-500">*</span>
            </label>

            {/* Flight Info */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between text-xs text-teal-600 font-medium mb-2">
                <span>Flight: Singapore Airlines</span>
                <span>Flight No. SQ 421</span>
              </div>
              <div className="flex items-center justify-between text-gray-700 font-medium text-xs">
                <span>Mumbai (India)</span>
                <span className="mx-2">✈</span>
                <span>Singapore (Singapore)</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
                <div>
                  <p className="text-gray-500">Date</p>
                  <p className="text-xs">18 Feb 2024</p>
                  <p className="text-gray-500 mt-1">Time</p>
                  <p className="text-xs">12:50 AM</p>
                </div>
                <div>
                  <p className="text-gray-500">Date</p>
                  <p className="text-xs">19 Feb 2024</p>
                  <p className="text-gray-500 mt-1">Time</p>
                  <p className="text-xs">12:50 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="bg-white shadow rounded-xl p-4 space-y-4">
            <label className="block text-gray-700 font-medium text-xs">
              Bank & Branch Name
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="w-full border rounded-lg p-2 text-sm focus:ring focus:ring-teal-300"
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium text-xs">
                  Account No.
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="w-full border rounded-lg p-2 text-sm focus:ring focus:ring-teal-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium text-xs">
                  IFSC Code.
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="w-full border rounded-lg p-2 text-sm focus:ring focus:ring-teal-300"
                />
              </div>
            </div>

            <button className="w-full bg-teal-600 text-white text-xs font-semibold py-2 rounded-lg hover:bg-teal-700">
              Submit
            </button>
          </div>
        </div>

        {/* Right Preview Section */}
        {/* <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-base font-semibold bg-teal-500 text-white border-b pb-2">
            Pricing
          </h2>
          <div className="text-sm space-y-2 mt-4">
            <p>
              <span className="font-medium">Package pricing:</span> SGD 1300 per
              adult x 2
            </p>
            <p>
              <span className="font-medium">Bank and Branch Name:</span> Name
            </p>
            <p>
              <span className="font-medium">Account No.:</span> 213156842135
            </p>
            <p>
              <span className="font-medium">IFSC Code:</span> 2456114
            </p>
          </div>
          <div className="flex justify-center mt-4">
            <button className="bg-teal-500 text-white text-sm font-medium px-6 py-2 rounded-lg hover:bg-teal-600">
              Edit
            </button>
          </div>
        </div> */}


        <div className="lg:col-span-1 sticky top-8">
          <div className="bg-white p-4 rounded-lg border border-[#E0E0E0]">
            <h2 className="text-xl font-semibold text-[#717182] font-raleway mb-4">Save Details</h2>
            <div className="border border-[#E0E0E0] rounded-lg">
              <div className="bg-[#10A4B0] text-white flex justify-between items-center px-3 py-3 rounded-t-lg">
                <h3 className="font-raleway font-medium text-lg">Travel Basic</h3>
                
              </div>
              <div className="p-4 text-sm space-y-3 ">
             
               <p>
              <span className="font-medium">Package pricing:</span> SGD 1300 per
              adult x 2
            </p>
            <p>
              <span className="font-medium">Bank and Branch Name:</span> Name
            </p>
            <p>
              <span className="font-medium">Account No.:</span> 213156842135
            </p>
            <p>
              <span className="font-medium">IFSC Code:</span> 2456114
            </p>
             <div className="flex justify-center mt-4">
            <button className="bg-[#10A4B0] text-white text-sm font-medium px-6 py-2 rounded-lg hover:bg-teal-600">
              Edit
            </button>
          </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;