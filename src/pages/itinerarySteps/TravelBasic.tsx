import { useNavigate } from 'react-router-dom';
import { useItinerary } from '../../context/ItineraryContext'; // Adjust path as needed
import { ChangeEvent, FC, FormEvent } from 'react';
import {
  Eye,
  MapPin,
  Calendar,
  ChevronDown,
  Bold,
  Italic,
  Link,
  Image as ImageIcon,
  MoreHorizontal,
} from 'lucide-react';

// ✅ Define ItineraryData type if not imported
interface ItineraryData {
  clientName: string;
  email: string;
  phone: string;
  nationality: string;
  startDate: string;
  endDate: string;
  totalTravelers: number;
  totalDays: number;
  tripOverviewTitle: string;
  tripOverviewDetails: string;
}

interface InputFieldProps {
  label: string;
  name: Extract<keyof ItineraryData, string>; // ✅ Constrained to string keys
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'number' | 'select';
}

interface SummaryRowProps {
  label: string;
  value: string | number;
}

// Reusable InputField Component
const InputField: FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
}) => {
  const commonInputClasses =
    'w-full bg-gray-100 border border-gray-200 rounded-[5px] h-[30px] px-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#10A4B0]';

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <div className="relative">
            <select
              name={name as string}
              value={value as string}
              onChange={onChange}
              className={`${commonInputClasses} appearance-none`}
            >
              <option>Indian</option>
              <option>American</option>
              <option>British</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        );
      case 'date':
        return (
          <div className="relative">
            <input
              type="date"
              name={name as string}
              value={value as string}
              onChange={onChange}
              className={`${commonInputClasses} pr-8`}
            />
            <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        );
      default:
        return (
          <input
            type={type}
            name={name as string}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={commonInputClasses}
          />
        );
    }
  };

  return (
    <div>
      <label className="block text-xs font-medium text-[#1E1E1E] mb-2 font-inter">{label}</label>
      {renderInput()}
    </div>
  );
};

// Reusable SummaryRow Component
const SummaryRow: FC<SummaryRowProps> = ({ label, value }) => (
  <div className="flex justify-between items-center text-xs font-raleway">
    <span className="font-semibold text-[#1E1E1E] w-1/3">{label}</span>
    <span className="text-gray-500">-</span>
    <span className="font-medium text-[#1E1E1E] w-2/3 text-right truncate">{value || '...'}</span>
  </div>
);

// Main Page Component
const TravelBasicPage: FC = () => {
  const { data, updateData } = useItinerary();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isNumber = type === 'number';
    updateData({ [name]: isNumber ? (Number(value) < 1 ? 1 : Number(value)) : value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert('Saved Travel Basic Details!');
    navigate('/my-itinerary/create/arrival-departure'); // Navigate to next step
  };

  return (
    <div className="bg-[#F6F6FA] min-h-screen p-4 sm:p-6 lg:p-2 font-raleway">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-semibold text-[#10A4B0] font-raleway">Travel Basic</h1>
           
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="hidden md:flex items-center space-x-2 text-xs text-[#727171] cursor-pointer">
            <MapPin className="w-4 h-4" />
            <span className="font-raleway font-medium">Define Your route</span>
          </div>
          <button className="flex items-center space-x-2 bg-[#10A4B0] text-white px-3 py-1 rounded-full text-xs font-inter font-medium">
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Form Section */}
        <div className="lg:col-span-2 bg-white p-4 rounded-lg border border-[#E0E0E0] space-y-6">
          <img
            src="https://plus.unsplash.com/premium_photo-1661964003610-2422de390fec?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Tokyo cityscape"
            className="w-full h-44 object-cover rounded-md"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <InputField label="Client Name" name="clientName" value={data.clientName} onChange={handleChange} placeholder="Type here" />
            <InputField label="Email Address" name="email" value={data.email} onChange={handleChange} placeholder="Type here" type="email" />
            <InputField label="Phone Number" name="phone" value={data.phone} onChange={handleChange} placeholder="Type here" type="tel" />
            <InputField label="Nationality" name="nationality" value={data.nationality} onChange={handleChange} type="select" />
            <InputField label="Start Date" name="startDate" value={data.startDate} onChange={handleChange} type="date" />
            <InputField label="End Date" name="endDate" value={data.endDate} onChange={handleChange} type="date" />
            <InputField label="Total Travelers" name="totalTravelers" value={data.totalTravelers} onChange={handleChange} type="number" />
            <InputField label="Total Days" name="totalDays" value={data.totalDays} onChange={handleChange} type="number" />
          </div>

          <div className="border-t border-[#E0E0E0] pt-6 space-y-2">
            <InputField label="Trip Overview" name="tripOverviewTitle" value={data.tripOverviewTitle} onChange={handleChange} placeholder="Enter Paragraph Title (e.g Food)" />
            <div className="bg-white border border-[#DDDDDD] rounded-md">
              <div className="flex items-center p-2 space-x-1 bg-[#F8F8F8] border-b border-[#DDDDDD] rounded-t-md">
                <button type="button" className="p-1.5 border border-[#7F7F7F] rounded"><Bold className="w-4 h-4" /></button>
                <button type="button" className="p-1.5 border border-[#7F7F7F] rounded"><Italic className="w-4 h-4" /></button>
                <button type="button" className="p-1.5 border border-[#7F7F7F] rounded"><Link className="w-4 h-4" /></button>
                <button type="button" className="p-1.5 border border-[#7F7F7F] rounded"><ImageIcon className="w-4 h-4" /></button>
              </div>
              <textarea
                name="tripOverviewDetails"
                value={data.tripOverviewDetails}
                onChange={handleChange}
                placeholder="Enter a short overview"
                className="w-full h-24 p-2 text-sm focus:outline-none rounded-b-md"
              />
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button type="submit" className="bg-[#10A4B0] text-white font-raleway font-medium text-sm px-10 py-2 rounded-md hover:bg-opacity-90 transition-colors">
              Save & Next
            </button>
          </div>
        </div>

        {/* Right Summary Section */}
        <div className="lg:col-span-1 sticky top-8">
          <div className="bg-white p-4 rounded-lg border border-[#E0E0E0]">
            <h2 className="text-xl font-semibold text-[#717182] font-raleway mb-4">Save Details</h2>
            <div className="border border-[#E0E0E0] rounded-lg">
              <div className="bg-[#10A4B0] text-white flex justify-between items-center px-3 py-3 rounded-t-lg">
                <h3 className="font-raleway font-medium text-lg">Travel Basic</h3>
                <MoreHorizontal className="w-6 h-6" />
              </div>
              <div className="p-4 space-y-3">
                <SummaryRow label="Client Name" value={data.clientName} />
                <SummaryRow label="Email" value={data.email} />
                <SummaryRow label="Phone Number" value={data.phone} />
                <SummaryRow label="Nationality" value={data.nationality} />
                <SummaryRow label="Start Date" value={data.startDate} />
                <SummaryRow label="End Date" value={data.endDate} />
                <SummaryRow label="Total Travelers" value={data.totalTravelers} />
                <SummaryRow label="Total Days" value={data.totalDays} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TravelBasicPage;
