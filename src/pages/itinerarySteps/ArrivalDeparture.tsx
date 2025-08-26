import React, { useState, ChangeEvent, FC, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItinerary } from '../../context/ItineraryContext'; // Adjust path
import { Eye, Plus, Calendar, ChevronDown, MoreHorizontal, Trash2, X, Plane, Train, Bus, Car } from 'lucide-react';

// SECTION: Type Definitions for props and state
interface JourneyLeg {
  id: number;
  modeOfTravel: 'Flight' | 'Train' | 'Bus' | 'Car';
  fromCity: string;
  date: string;
  time: string;
  airline?: string;
  flightNo?: string;
  airport?: string;
  trainName?: string;
  trainNo?: string;
  station?: string;
  busService?: string;
  busNo?: string;
  carType?: string;
  driverDetails?: string;
}

interface InputFieldProps {
  label: string;
  name: keyof JourneyLeg;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  placeholder?: string;
  type?: 'text' | 'date' | 'time' | 'select';
  options?: string[];
  containerClassName?: string;
  labelClassName?: string;
}

interface SummaryRowProps {
  label: string;
  value?: string;
}

interface PreviewModalProps {
  legs: JourneyLeg[];
  onClose: () => void;
}

// SECTION: Reusable Sub-Components
const InputField: FC<InputFieldProps> = ({ label, name, value, onChange, placeholder, type = 'text', options, containerClassName = '', labelClassName = '' }) => {
  const commonInputClasses = "w-full bg-gray-100 border border-gray-200 rounded-[5px] h-[30px] px-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#10A4B0]";
  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <div className="relative">
            <select name={name} value={value} onChange={onChange} className={`${commonInputClasses} appearance-none`}>
              {options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        );
      case 'date':
      case 'time':
        return (
          <div className="relative">
            <input type={type} name={name} value={value} onChange={onChange} className={`${commonInputClasses} pr-8`} />
            {type === 'date' && <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />}
          </div>
        );
      default:
        return <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className={commonInputClasses} />;
    }
  };
  return (
    <div className={containerClassName}>
      <label className={`block text-xs font-medium text-[#1E1E1E] mb-2 font-inter ${labelClassName}`}>{label}</label>
      {renderInput()}
    </div>
  );
};

const SummaryRow: FC<SummaryRowProps> = ({ label, value }) => (
  <div className="flex justify-between items-center text-xs font-raleway">
    <span className="font-semibold text-[#1E1E1E]">{label}</span>
    <div className="flex items-center gap-4">
      <span className="text-gray-500">-</span>
      <span className="font-medium text-[#1E1E1E] text-right truncate">{value || '...'}</span>
    </div>
  </div>
);

const PreviewModal: FC<PreviewModalProps> = ({ legs, onClose }) => {
  const travelModeIcons = {
    Flight: <Plane className="w-5 h-5 text-[#10A4B0]" />,
    Train: <Train className="w-5 h-5 text-[#10A4B0]" />,
    Bus: <Bus className="w-5 h-5 text-[#10A4B0]" />,
    Car: <Car className="w-5 h-5 text-[#10A4B0]" />,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <header className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-raleway font-semibold">Journey Preview</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <X className="w-5 h-5" />
          </button>
        </header>
        <main className="overflow-y-auto p-6 space-y-4">
          {legs.map((leg, index) => (
            <div key={leg.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  {travelModeIcons[leg.modeOfTravel]}
                  <h3 className="font-raleway font-bold text-md">{leg.modeOfTravel} Details (Leg {index + 1})</h3>
                </div>
                <span className="text-sm font-medium text-gray-600">{leg.date}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <SummaryRow label="From" value={leg.fromCity} />
                <SummaryRow label="Time" value={leg.time} />
                {leg.modeOfTravel === 'Flight' && <>
                  <SummaryRow label="Airline" value={leg.airline} />
                  <SummaryRow label="Flight No." value={leg.flightNo} />
                  <SummaryRow label="Airport" value={leg.airport} />
                </>}
                {leg.modeOfTravel === 'Train' && <>
                  <SummaryRow label="Train Name" value={leg.trainName} />
                  <SummaryRow label="Train No." value={leg.trainNo} />
                  <SummaryRow label="Station" value={leg.station} />
                </>}
                {leg.modeOfTravel === 'Bus' && <>
                  <SummaryRow label="Bus Service" value={leg.busService} />
                  <SummaryRow label="Bus No." value={leg.busNo} />
                </>}
                {leg.modeOfTravel === 'Car' && <>
                  <SummaryRow label="Car Type" value={leg.carType} />
                  <SummaryRow label="Driver" value={leg.driverDetails} />
                </>}
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

// SECTION: Main Page Component
const ArrivalDeparturePage: FC = () => {
  const { data, updateData } = useItinerary();
  const navigate = useNavigate();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Initialize journeyLegs with default data if empty
  useEffect(() => {
    if (data.journeyLegs.length === 0) {
      updateData({
        journeyLegs: [{
          id: Date.now(),
          modeOfTravel: 'Flight',
          fromCity: '',
          date: data.startDate || '', // Pre-fill with startDate
          time: '',
          airline: 'Emirates',
          flightNo: '',
          airport: '',
        }],
      });
    }
  }, [data.startDate, updateData]);

  const handleLegChange = (id: number, e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedLegs = data.journeyLegs.map(leg =>
      leg.id === id ? { ...leg, [name]: value } : leg
    );
    updateData({ journeyLegs: updatedLegs });
  };

  const addLeg = () => {
    updateData({
      journeyLegs: [
        ...data.journeyLegs,
        {
          id: Date.now(),
          modeOfTravel: 'Flight',
          fromCity: '',
          date: data.endDate || '', // Pre-fill with endDate for return legs
          time: '',
          airline: '',
          flightNo: '',
          airport: '',
        },
      ],
    });
  };

  const removeLeg = (id: number) => {
    updateData({ journeyLegs: data.journeyLegs.filter(leg => leg.id !== id) });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Saved Arrival & Departure Details!");
    navigate('/my-itinerary/create/accommodation'); // Navigate to next step
  };

  return (
    <>
      {isPreviewOpen && <PreviewModal legs={data.journeyLegs} onClose={() => setIsPreviewOpen(false)} />}
      <div className="bg-[#F6F6FA] min-h-screen p-4 sm:p-6 lg:p-2 font-raleway">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-[#10A4B0] font-raleway">Arrival & Departure</h1>
          
          <div className="flex items-center space-x-4">
            <button onClick={addLeg} className="flex items-center space-x-2 text-xs text-[#727171] cursor-pointer hover:text-[#10A4B0]">
              <Plus className="w-4 h-4"/>
              <span className="font-raleway font-medium">Add more destination</span>
            </button>
            <button type="button" onClick={() => setIsPreviewOpen(true)} className="flex items-center space-x-2 bg-[#10A4B0] text-white px-3 py-1 rounded-full text-xs font-inter font-medium">
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
          </div>
        </header>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white p-4 rounded-lg border border-[#E0E0E0] space-y-6">
            <img src="https://images.unsplash.com/photo-1523833082115-1e8e294bd14e?q=80&w=1295&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Airplane on runway" className="w-full h-44 object-cover rounded-md shadow-md" />
            {data.journeyLegs.map((leg, index) => (
              <div key={leg.id} className="p-4 border border-gray-200 rounded-lg space-y-4 relative pt-6">
                {data.journeyLegs.length > 1 && (
                  <button type="button" onClick={() => removeLeg(leg.id)} className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4"/>
                  </button>
                )}
                <InputField
                  label={`Mode of Travel (Leg ${index + 1})`} name="modeOfTravel" value={leg.modeOfTravel}
                  onChange={(e) => handleLegChange(leg.id, e)} type="select"
                  options={['Flight', 'Train', 'Bus', 'Car']} containerClassName="w-full"
                />
                {leg.modeOfTravel === 'Flight' && (
                  <div className="space-y-4 animation-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField label="Airline" name="airline" value={leg.airline || ''} onChange={(e) => handleLegChange(leg.id, e)} type="select" options={['Select Airline', 'Emirates', 'Qatar Airways', 'Singapore Airlines']} />
                      <InputField label="Flight No." name="flightNo" value={leg.flightNo || ''} onChange={(e) => handleLegChange(leg.id, e)} placeholder="Enter Flight No." />
                    </div>
                  </div>
                )}
                {leg.modeOfTravel === 'Train' && (
                  <div className="space-y-4 animation-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField label="Train Name" name="trainName" value={leg.trainName || ''} onChange={(e) => handleLegChange(leg.id, e)} placeholder="e.g., Express One" />
                      <InputField label="Train No." name="trainNo" value={leg.trainNo || ''} onChange={(e) => handleLegChange(leg.id, e)} placeholder="e.g., T-12345" />
                    </div>
                  </div>
                )}
                {leg.modeOfTravel === 'Bus' && (
                  <div className="space-y-4 animation-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField label="Bus Service" name="busService" value={leg.busService || ''} onChange={(e) => handleLegChange(leg.id, e)} placeholder="e.g., National Express" />
                      <InputField label="Bus No." name="busNo" value={leg.busNo || ''} onChange={(e) => handleLegChange(leg.id, e)} placeholder="e.g., B-99" />
                    </div>
                  </div>
                )}
                {leg.modeOfTravel === 'Car' && (
                  <div className="space-y-4 animation-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField label="Car Type" name="carType" value={leg.carType || ''} onChange={(e) => handleLegChange(leg.id, e)} placeholder="e.g., Sedan, SUV" />
                      <InputField label="Driver Details" name="driverDetails" value={leg.driverDetails || ''} onChange={(e) => handleLegChange(leg.id, e)} placeholder="e.g., John Doe - 555-1234" />
                    </div>
                  </div>
                )}
                <hr className="border-gray-200"/>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InputField label="From" name="fromCity" value={leg.fromCity} onChange={(e) => handleLegChange(leg.id, e)} type="select" options={['Select a City', 'Dubai (UAE)', 'Singapore (SG)', 'New York (USA)', 'London (UK)']} />
                  <InputField label="Date" name="date" value={leg.date} onChange={(e) => handleLegChange(leg.id, e)} type="date" />
                  <InputField label="Time" name="time" value={leg.time} onChange={(e) => handleLegChange(leg.id, e)} type="time" labelClassName="font-medium text-gray-700 after:content-['(Optional)'] after:font-normal after:text-gray-400 after:ml-1" />
                </div>
                <InputField label="Airport / Station" name="airport" value={leg.airport || ''} onChange={(e) => handleLegChange(leg.id, e)} type="select" options={['Select Here', 'Dubai (DXB)', 'Changi (SIN)', 'JFK Airport (JFK)', 'Heathrow (LHR)']} containerClassName="w-full" labelClassName="font-medium text-gray-700 after:content-['(Optional)'] after:font-normal after:text-gray-400 after:ml-1" />
              </div>
            ))}
            <div className="flex justify-center pt-4">
              <button type="submit" className="bg-[#10A4B0] text-white font-raleway font-medium text-sm px-10 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                Save & Next
              </button>
            </div>
          </div>
          <div className="lg:col-span-1 sticky top-8">
            <div className="bg-white p-4 rounded-lg border border-[#E0E0E0]">
              <h2 className="text-xl font-semibold text-[#717182] font-raleway mb-4">Save Details</h2>
              <div className="border border-[#E0E0E0] rounded-lg">
                <div className="bg-[#10A4B0] text-white flex justify-between items-center px-3 py-3 rounded-t-lg">
                  <h3 className="font-raleway font-medium text-lg">Arrival & Departure</h3>
                  <MoreHorizontal className="w-6 h-6"/>
                </div>
                <div className="p-4 space-y-3">
                  <SummaryRow label="Mode of Travel" value={data.journeyLegs[0]?.modeOfTravel} />
                  <SummaryRow label="From" value={data.journeyLegs[0]?.fromCity} />
                  <SummaryRow label="To" value={data.journeyLegs[data.journeyLegs.length - 1]?.fromCity} />
                  <hr className="border-t-2 border-dashed border-gray-300 my-2" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ArrivalDeparturePage;