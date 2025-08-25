import React, { useState } from 'react';
import { Trash2, Eye, MoreHorizontal } from 'lucide-react';

interface TripDetails {
  inclusions: string;
  exclusions: string;
  cancellationPolicy: string;
}

const TripInformation: React.FC = () => {
  const [tripDetails, setTripDetails] = useState<TripDetails>({
    inclusions: `• Flights\n• Return Flights (DEL - DMK - DEL)\n• Baggage: 20kg Check-In + 7kg Hand Baggage`,
    exclusions: '',
    cancellationPolicy: ''
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (field: keyof TripDetails, value: string) => {
    setTripDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDelete = (field: keyof TripDetails) => {
    setTripDetails(prev => ({
      ...prev,
      [field]: ''
    }));
  };

  const formatTextForPreview = (text: string) => {
    if (!text.trim()) return ['No information provided'];
    return text.split('\n').filter(line => line.trim());
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 font-sans">
      <div className="w-full px-2 sm:px-4">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Trip Information</h1>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Section - Editing Forms */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Trip Information*</h2>
            
            {/* Inclusions Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-sm font-medium text-gray-800">Inclusions*</h3>
                <button
                  onClick={() => handleDelete('inclusions')}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              
              {/* Rich Text Editor Toolbar */}
              <div className="flex items-center space-x-1 sm:space-x-2 mb-2 sm:mb-3 p-1 sm:p-2 bg-gray-50 rounded-md">
                <button className="p-1 sm:p-2 hover:bg-gray-200 rounded transition-colors font-bold text-sm sm:text-base">B</button>
                <button className="p-1 sm:p-2 hover:bg-gray-200 rounded transition-colors italic text-sm sm:text-base">I</button>
                <button className="p-1 sm:p-2 hover:bg-gray-200 rounded transition-colors">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </button>
                <button className="p-1 sm:p-2 hover:bg-gray-200 rounded transition-colors">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              
              <textarea
                value={tripDetails.inclusions}
                onChange={(e) => handleInputChange('inclusions', e.target.value)}
                placeholder="Enter inclusions"
                className="w-full h-24 sm:h-32 p-2 sm:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base"
              />
            </div>

            {/* Exclusions Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-sm font-medium text-gray-800">Exclusions*</h3>
                <button
                  onClick={() => handleDelete('exclusions')}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              
              {/* Rich Text Editor Toolbar */}
              <div className="flex items-center space-x-1 sm:space-x-2 mb-2 sm:mb-3 p-1 sm:p-2 bg-gray-50 rounded-md">
                <button className="p-1 sm:p-2 hover:bg-gray-200 rounded transition-colors font-bold text-sm sm:text-base">B</button>
                <button className="p-1 sm:p-2 hover:bg-gray-200 rounded transition-colors italic text-sm sm:text-base">I</button>
                <button className="p-1 sm:p-2 hover:bg-gray-200 rounded transition-colors">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </button>
                <button className="p-1 sm:p-2 hover:bg-gray-200 rounded transition-colors">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              
              <textarea
                value={tripDetails.exclusions}
                onChange={(e) => handleInputChange('exclusions', e.target.value)}
                placeholder="Enter a short overview"
                className="w-full h-24 sm:h-32 p-2 sm:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base"
              />
            </div>

            {/* Cancellation Policy Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-sm font-medium text-gray-800">Cancellation Policy*</h3>
                <button
                  onClick={() => handleDelete('cancellationPolicy')}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              
              {/* Rich Text Editor Toolbar */}
              <div className="flex items-center space-x-1 sm:space-x-2 mb-2 sm:mb-3 p-1 sm:p-2 bg-gray-50 rounded-md">
                <button className="p-1 sm:p-2 hover:bg-gray-200 rounded transition-colors font-bold text-sm sm:text-base">B</button>
                <button className="p-1 sm:p-2 hover:bg-gray-200 rounded transition-colors italic text-sm sm:text-base">I</button>
                <button className="p-1 sm:p-2 hover:bg-gray-200 rounded transition-colors">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </button>
                <button className="p-1 sm:p-2 hover:bg-gray-200 rounded transition-colors">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              
              <textarea
                value={tripDetails.cancellationPolicy}
                onChange={(e) => handleInputChange('cancellationPolicy', e.target.value)}
                placeholder="Enter a short overview"
                className="w-full h-24 sm:h-32 p-2 sm:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Right Section - Preview */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-800">Save Details</h2>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-xs"
              >
                <Eye size={18} className="sm:w-5 sm:h-5" />
                <span>Preview</span>
              </button>
            </div>

            {showPreview && (
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-sm font-semibold text-teal-900">Sightseeing</h3>
                  <button className="text-teal-600 hover:text-teal-800">
                    <MoreHorizontal size={18} className="sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Inclusions Preview */}
                <div className="mb-3 sm:mb-4">
                  <h4 className="font-medium text-teal-800 mb-1 sm:mb-2 text-xs">Inclusions</h4>
                  <ul className="space-y-1">
                    {formatTextForPreview(tripDetails.inclusions).map((item, index) => (
                      <li key={index} className="text-xs sm:text-sm text-teal-700 flex items-start">
                        <span className="text-teal-500 mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions Preview */}
                <div className="mb-3 sm:mb-4">
                  <h4 className="font-medium text-teal-800 mb-1 sm:mb-2 text-xs">Exclusions</h4>
                  <ul className="space-y-1">
                    {formatTextForPreview(tripDetails.exclusions).map((item, index) => (
                      <li key={index} className="text-xs sm:text-sm text-teal-700 flex items-start">
                        <span className="text-teal-500 mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cancellation Policy Preview */}
                <div className="mb-3 sm:mb-4">
                  <h4 className="font-medium text-teal-800 mb-1 sm:mb-2 text-xs">Cancellation Policy</h4>
                  <ul className="space-y-1">
                    {formatTextForPreview(tripDetails.cancellationPolicy).map((item, index) => (
                      <li key={index} className="text-xs sm:text-sm text-teal-700 flex items-start">
                        <span className="text-teal-500 mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Terms and Conditions Preview */}
                <div>
                  <h4 className="font-medium text-teal-800 mb-1 sm:mb-2 text-xs">Terms and Conditions</h4>
                  <ul className="space-y-1">
                    <li className="text-xs sm:text-sm text-teal-700 flex items-start">
                      <span className="text-teal-500 mr-2">•</span>
                      All travelers must carry valid ID proof such as passport and visa
                    </li>
                    <li className="text-xs sm:text-sm text-teal-700 flex items-start">
                      <span className="text-teal-500 mr-2">•</span>
                      The itinerary is subject to change due to weather or local conditions
                    </li>
                    <li className="text-xs sm:text-sm text-teal-700 flex items-start">
                      <span className="text-teal-500 mr-2">•</span>
                      Hotels are subject to availability; similar alternatives will be provided
                    </li>
                    <li className="text-xs sm:text-sm text-teal-700 flex items-start">
                      <span className="text-teal-500 mr-2">•</span>
                      Delays or missed connections are at the traveler's own risk and cost
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-6 sm:mt-8">
              <button className="w-full bg-green-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-md hover:bg-green-700 transition-colors font-semibold text-xs">
                Save Trip Information
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripInformation;