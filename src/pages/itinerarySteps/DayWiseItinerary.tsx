import React, { useState } from "react";
import { FaEye, FaBold, FaItalic, FaImage } from "react-icons/fa";

const DayWiseItinerary = () => {
  const [remark, setRemark] = useState("");
  const [mode, setMode] = useState("Flight");
  const [desc, setDesc] = useState(
    "Welcome to Singapore! Your driver is awaiting your arrival and will transfer you to the hotel."
  );

  return (
    <div className="p-6 bg-[#F6F6FA] min-h-screen font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[#1E1E1E] font-raleway">
            Day Wise Itinerary<span className="text-red-500">*</span>
          </h1>
          <div className="h-[1.5px] bg-black mt-1"></div>
        </div>
        <button className="flex items-center space-x-2 bg-[#10A4B0] text-white px-3 py-1 rounded-full text-xs font-inter font-medium hover:bg-opacity-90 transition">
          <FaEye /> <span>Preview</span>
        </button>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Form Section */}
        <div className="bg-white rounded-lg border border-[#E0E0E0] p-6 space-y-4">
          <h2 className="text-base font-semibold text-[#1E1E1E] font-raleway">
            Day 1: Feb 18, 2024
          </h2>

          {/* Tabs */}
          <div className="flex space-x-6 text-xs font-raleway font-medium">
            <span className="text-[#10A4B0]">● Day Itinerary</span>
            <span className="text-[#727171]">● Sightseeing</span>
            <span className="text-[#727171]">● Transfers</span>
            <span className="text-[#727171]">● Meals</span>
          </div>

          {/* Search field */}
          <input
            type="text"
            placeholder="Enter Paragraph Title (e.g. Food)"
            className="w-full bg-gray-100 border border-gray-200 rounded-[5px] h-[30px] px-2 text-sm text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#10A4B0]"
          />

          {/* Image + Title + Description */}
          <div className="bg-[#F8F8F8] rounded-md border border-[#DDDDDD]">
            <img
              src="https://images.unsplash.com/flagged/photo-1562503542-2a1e6f03b16b?w=600&auto=format&fit=crop&q=60"
              alt="Singapore"
              className="w-full h-48 object-cover rounded-t-md"
            />
            <div className="p-4">
              <h3 className="text-sm font-semibold text-[#1E1E1E] font-raleway mb-2">
                Arrival in Singapore
              </h3>
              <p className="text-[#727171] text-xs">{desc}</p>
            </div>
          </div>

          {/* Mode of Travel */}
          <div>
            <label className="block text-xs font-medium text-[#1E1E1E] mb-1 font-inter">
              Mode of Travel
            </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full bg-gray-100 border border-gray-200 rounded-[5px] h-[30px] px-2 text-sm text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#10A4B0]"
            >
              <option>Flight</option>
              <option>Train</option>
              <option>Bus</option>
              <option>Car</option>
            </select>
          </div>

          {/* Add Image & Remark */}
          <div>
            <label className="block text-xs font-medium text-[#1E1E1E] mb-1 font-inter">
              Add Image & Remark
            </label>
            <div className="bg-white border border-[#DDDDDD] rounded-md">
              <div className="flex items-center p-2 space-x-1 bg-[#F8F8F8] border-b border-[#DDDDDD] rounded-t-md">
                <button className="p-1.5 border border-[#7F7F7F] rounded">
                  <FaBold className="w-3 h-3" />
                </button>
                <button className="p-1.5 border border-[#7F7F7F] rounded">
                  <FaItalic className="w-3 h-3" />
                </button>
                <button className="p-1.5 border border-[#7F7F7F] rounded">
                  <FaImage className="w-3 h-3" />
                </button>
              </div>
              <textarea
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Enter a short overview"
                className="w-full h-24 p-2 text-sm text-[#1E1E1E] focus:outline-none rounded-b-md"
              />
            </div>
          </div>

          {/* Submit buttons */}
          <div className="flex justify-between items-center pt-2">
            <button className="bg-[#10A4B0] text-white font-raleway font-medium text-sm px-10 py-2 rounded-md hover:bg-opacity-90 transition">
              Submit
            </button>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-[#1E1E1E] text-white rounded-l-md text-xs">
                {"<"}
              </button>
              <button className="px-4 py-2 bg-[#1E1E1E] text-white rounded-r-md text-xs">
                {">"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Preview Section */}
        <div className="bg-white rounded-lg border border-[#E0E0E0] p-6">
          <h2 className="text-base font-semibold text-[#717182] font-raleway mb-4">
            Save Details
          </h2>
          <div className="bg-[#10A4B0] text-white px-4 py-2 rounded-t-md text-xs font-raleway font-medium">
            Day Itinerary
          </div>
          <div className="border border-[#E0E0E0] rounded-b-md overflow-hidden">
            <img
              src="https://images.unsplash.com/flagged/photo-1562503542-2a1e6f03b16b?w=600&auto=format&fit=crop&q=60"
              alt="Singapore"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-sm font-semibold text-[#1E1E1E] font-raleway mb-2">
                Arrival in Singapore
              </h3>
              <p className="text-[#727171] text-xs">{desc}</p>
              <p className="mt-2 text-xs text-[#1E1E1E]">
                ✈ <span className="font-semibold">Transfer Type:</span> Private
              </p>
            </div>
          </div>
          <button className="mt-4 bg-[#10A4B0] text-white font-raleway font-medium text-sm px-10 py-2 rounded-md hover:bg-opacity-90 transition">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DayWiseItinerary;