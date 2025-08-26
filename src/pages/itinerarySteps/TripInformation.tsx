import React from "react";
import { MoreHorizontal, Trash2 } from "lucide-react";

const TripInformation: React.FC = () => {
  return (
    <div className="bg-[#F6F6FA] min-h-screen p-4 sm:p-6 lg:p-2 font-raleway">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Section */}
          <div className="lg:col-span-2">
            <h1 className="text-[#10A4B0] font-raleway font-semibold text-xl mb-4">
              Trip Information<span className="text-red-500">*</span>
            </h1>

            {/* Inclusions */}
            <div className="border border-gray-300 rounded-md bg-white mb-6">
              <div className="flex justify-between items-center border-b border-gray-300 px-4 py-2 text-sm font-semibold">
                Inclusions<span className="text-red-500">*</span>
                <Trash2 className="w-4 h-4 text-gray-500 cursor-pointer" />
              </div>
              <div className="p-4 space-y-3">
                {/* Toolbar */}
                <div className="flex gap-1 border border-gray-300 p-1 w-fit">
                  <button className="px-2 py-1 hover:bg-gray-100 font-bold">B</button>
                  <button className="px-2 py-1 hover:bg-gray-100 italic">I</button>
                  <button className="px-2 py-1 hover:bg-gray-100 underline">U</button>
                  <button className="px-2 py-1 hover:bg-gray-100">🔗</button>
                  <button className="px-2 py-1 hover:bg-gray-100">🖼️</button>
                </div>
                {/* Textarea */}
                <textarea
                  className="w-full border border-gray-300 p-2 text-sm min-h-[120px] resize-none focus:outline-none"
                  defaultValue={`📍 Flights\n• Return Flights (DEL – DMK – DEL)\n• Baggage: 20kg Check-In + 7kg Hand Baggage`}
                />
              </div>
            </div>

            {/* Exclusions */}
            <div className="border border-gray-300 rounded-md bg-white mb-6">
              <div className="flex justify-between items-center border-b border-gray-300 px-4 py-2 text-sm font-semibold">
                Exclusions<span className="text-red-500">*</span>
                <Trash2 className="w-4 h-4 text-gray-500 cursor-pointer" />
              </div>
              <div className="p-4 space-y-3">
                <div className="flex gap-1 border border-gray-300 p-1 w-fit">
                  <button className="px-2 py-1 hover:bg-gray-100 font-bold">B</button>
                  <button className="px-2 py-1 hover:bg-gray-100 italic">I</button>
                  <button className="px-2 py-1 hover:bg-gray-100 underline">U</button>
                  <button className="px-2 py-1 hover:bg-gray-100">🔗</button>
                  <button className="px-2 py-1 hover:bg-gray-100">🖼️</button>
                </div>
                <textarea
                  className="w-full border border-gray-300 p-2 text-sm min-h-[120px] resize-none focus:outline-none"
                  placeholder="Enter a short overview"
                />
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="border border-gray-300 rounded-md bg-white">
              <div className="flex justify-between items-center border-b border-gray-300 px-4 py-2 text-sm font-semibold">
                Cancellation Policy<span className="text-red-500">*</span>
                <Trash2 className="w-4 h-4 text-gray-500 cursor-pointer" />
              </div>
              <div className="p-4 space-y-3">
                <div className="flex gap-1 border border-gray-300 p-1 w-fit">
                  <button className="px-2 py-1 hover:bg-gray-100 font-bold">B</button>
                  <button className="px-2 py-1 hover:bg-gray-100 italic">I</button>
                  <button className="px-2 py-1 hover:bg-gray-100 underline">U</button>
                  <button className="px-2 py-1 hover:bg-gray-100">🔗</button>
                  <button className="px-2 py-1 hover:bg-gray-100">🖼️</button>
                </div>
                <textarea
                  className="w-full border border-gray-300 p-2 text-sm min-h-[120px] resize-none focus:outline-none"
                  placeholder="Enter a short overview"
                />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:col-span-1 sticky top-8 self-stretch mt-11">
            <div className="bg-white p-4 rounded-lg border border-[#E0E0E0]">
              <h2 className="text-xl font-semibold text-[#717182] font-raleway mb-4">Save Details</h2>
              <div className="border border-[#E0E0E0] rounded-lg">
                <div className="bg-[#10A4B0] text-white flex justify-between items-center px-3 py-3 rounded-t-lg">
                  <h3 className="font-raleway font-medium text-lg">Sightseeing</h3>
                  <MoreHorizontal className="w-6 h-6"/>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1 font-raleway text-sm">Inclusions</h4>
                    <ul className="list-disc ml-5 space-y-1 text-xs font-inter">
                      <li>Flights: Mumbai – Paris – Rome – Mumbai (Economy Class)</li>
                      <li>Airport pickup and drop with 15 kg baggage allowance</li>
                      <li>Meet and greet assistance at the airport</li>
                      <li>3-star hotel accommodation on double/twin sharing basis</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 font-raleway text-sm">Exclusions</h4>
                    <ul className="list-disc ml-5 space-y-1 text-xs font-inter">
                      <li>Travel insurance</li>
                      <li>Meals not specified in the inclusions</li>
                      <li>Expenses of personal nature like laundry, drinks, tips</li>
                      <li>Optional tours and activities</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 font-raleway text-sm">Cancellation Policy</h4>
                    <ul className="list-disc ml-5 space-y-1 text-xs font-inter">
                      <li>Cancellations made more than 30 days before departure: 80% refund</li>
                      <li>Cancellations between 15 to 30 days before departure: 50% refund</li>
                      <li>Cancellations less than 15 days before travel: No refund</li>
                      <li>Visa fees are non-refundable in all cases</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 font-raleway text-sm">Terms and Conditions</h4>
                    <ul className="list-disc ml-5 space-y-1 text-xs font-inter">
                      <li>All travelers must carry valid ID proof such as passport and visa</li>
                      <li>The itinerary is subject to change due to weather or local conditions</li>
                      <li>Hotels are subject to availability; similar alternatives will be provided</li>
                      <li>Delays or missed connections are at the traveler's own risk and cost</li>
                    </ul>
                  </div>
                  <hr className="border-t-2 border-dashed border-gray-300 my-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripInformation;