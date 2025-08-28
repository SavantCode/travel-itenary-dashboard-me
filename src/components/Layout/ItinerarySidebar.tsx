// components/ItinerarySidebar.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface ItinerarySidebarProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  onBackToItinerary: () => void;
}

const ItinerarySidebar: React.FC<ItinerarySidebarProps> = ({
  currentStep,
  onStepClick,
  onBackToItinerary
}) => {
  const navigate = useNavigate();

  const steps = [
    { id: 1, label: 'Travel Basic', path: '/my-itinerary/create/travel-basic' },
    { id: 2, label: 'Arrival & Departure', path: '/my-itinerary/create/arrival-departure' },
    { id: 3, label: 'Accommodation', path: '/my-itinerary/create/accommodation' },
    { id: 4, label: 'Vehicle', path: '/my-itinerary/create/vehicle' },
    { id: 5, label: 'Day Wise Itinerary', path: '/my-itinerary/create/day-wise-itinerary' },
    { id: 6, label: 'Pricing', path: '/my-itinerary/create/pricing' },
    { id: 7, label: 'Trip Information', path: '/my-itinerary/create/trip-information' },
    { id: 8, label: 'View Itinerary', path: '/my-itinerary/create/view-itinerary' },

  ];

  return (
    <div className="bg-white w-[286px] flex flex-col border-r border-gray-200">
      <div className="px-7 py-6 border-b border-gray-200">
        <button
          onClick={onBackToItinerary}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Itinerary</span>
        </button>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 shadow-md"></div>
            <div className="absolute inset-0 w-6 h-6 bg-white rounded-full m-1"></div>
          </div>
          <span className="text-xl font-semibold text-teal-600 font-raleway">Global Vacations</span>
        </div>
      </div>

      <nav className="flex-1 py-6 px-5 space-y-2">
        {steps.map((step) => {
          const completed = currentStep > step.id;
          const active = currentStep === step.id;

          return (
            <button
              key={step.id}
              onClick={() => {
                onStepClick(step.id);
                navigate(step.path);
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-md transition-all ${
                active
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold ${
                  active
                    ? 'bg-white text-teal-600'
                    : completed
                    ? 'bg-teal-100 text-teal-600'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {completed ? '✓' : step.id}
              </div>
              <span className={`${active ? 'text-white' : 'text-gray-700'} font-medium`}>
                {step.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{currentStep}/7</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-teal-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 7) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ItinerarySidebar;
