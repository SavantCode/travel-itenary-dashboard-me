import React, { useState } from "react";
import { FaEye, FaBold, FaItalic, FaImage } from "react-icons/fa";

const DayWiseItinerary = () => {
  const [remark, setRemark] = useState("");
  const [mode, setMode] = useState("Flight");
  const [title, setTitle] = useState("Arrival in Singapore");
  const [desc, setDesc] = useState("Welcome to Singapore! Your driver is awaiting your arrival and will transfer you to the hotel.");

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-cyan-700">
          Day Wise Itinerary<span className="text-red-500">*</span>
        </h1>
        <button className="flex items-center space-x-2 bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition">
          <FaEye /> <span>Preview</span>
        </button>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Form Section */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <h2 className="text-base font-semibold text-gray-800">Day 1: Feb 18, 2024</h2>

          {/* Tabs */}
          <div className="flex space-x-6 text-xs font-medium">
            <span className="text-cyan-600">● Day Itinerary</span>
            <span className="text-gray-500">● Sightseeing</span>
            <span className="text-gray-500">● Transfers</span>
            <span className="text-gray-500">● Meals</span>
          </div>

          {/* Search field */}
          <input
            type="text"
            placeholder="Enter Paragraph Title (e.g. Food)"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />

          {/* Image + Title + Description */}
          <div className="bg-gray-50 p-3 rounded-md border">
            <img
              src="https://images.unsplash.com/flagged/photo-1562503542-2a1e6f03b16b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2luZ2Fwb3JlfGVufDB8fDB8fHww"
              alt="Singapore"
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Arrival in Singapore</h3>
              <p className="text-gray-600 text-xs">{desc}</p>
            </div>
          </div>

          {/* Mode of Travel */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Mode of Travel</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option>Flight</option>
              <option>Train</option>
              <option>Bus</option>
              <option>Car</option>
            </select>
          </div>

          {/* Add Image & Remark */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Add Image & Remark</label>
            <div className="border rounded-md p-2">
              <div className="flex items-center space-x-3 mb-2">
                <button className="p-1 border rounded hover:bg-gray-100"><FaBold /></button>
                <button className="p-1 border rounded hover:bg-gray-100"><FaItalic /></button>
                <button className="p-1 border rounded hover:bg-gray-100"><FaImage /></button>
              </div>
              <textarea
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Enter a short overview"
                className="w-full border-none focus:ring-0 text-xs"
                rows={3}
              />
            </div>
          </div>

          {/* Submit buttons */}
          <div className="flex justify-between items-center">
            <button className="bg-cyan-600 text-white px-6 py-2 rounded-md hover:bg-cyan-700 text-xs font-semibold">
              Submit
            </button>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-gray-800 text-white rounded-l-md">{"<"}</button>
              <button className="px-4 py-2 bg-gray-800 text-white rounded-r-md">{">"}</button>
            </div>
          </div>
        </div>

        {/* Right Preview Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-base font-semibold mb-4 text-gray-800">Save Details</h2>
          <div className="bg-cyan-600 text-white px-4 py-2 rounded-t-md text-xs font-semibold">
            Day Itinerary
          </div>
          <div className="border rounded-b-md overflow-hidden">
            <img
              src="https://images.unsplash.com/flagged/photo-1562503542-2a1e6f03b16b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2luZ2Fwb3JlfGVufDB8fDB8fHww"
              alt="Singapore"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Arrival in Singapore</h3>
              <p className="text-gray-600 text-xs">{desc}</p>
              <p className="mt-2 text-xs">
                ✈ <span className="font-semibold">Transfer Type:</span> Private
              </p>
            </div>
          </div>
          <button className="mt-4 bg-cyan-600 text-white px-6 py-2 rounded-md hover:bg-cyan-700 text-xs font-semibold">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DayWiseItinerary;  