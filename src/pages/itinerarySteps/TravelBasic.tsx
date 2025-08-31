



//v2--also best -- but doesnt have from and to option
import { useNavigate } from 'react-router-dom';
import { useItinerary } from '../../context/ItineraryContext';
import { useAuth } from '../../context/AuthContext';
import { generateItinerary } from '../../api/itinerary_api'; // Using the abstracted fetch logic
import { ChangeEvent, FC, FormEvent, useState, useEffect } from 'react';
import {
  Eye, Calendar, ChevronDown, Bold, Italic, Link,
  Image as ImageIcon, MoreHorizontal, Wand2, Loader2, AlertCircle, CheckCircle
} from 'lucide-react';

// --- TYPE DEFINITIONS ---
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
  name: Extract<keyof ItineraryData, string>;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'number' | 'select';
  required?: boolean;
}

interface SummaryRowProps {
  label: string;
  value: string | number;
}

// =================================================================
// --- REUSABLE UI COMPONENTS ---
// =================================================================

const InputField: FC<InputFieldProps> = ({ label, name, value, onChange, placeholder, type = 'text', required = false }) => {
  const commonInputClasses = 'w-full bg-gray-100 border border-gray-200 rounded-[5px] h-[30px] px-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#10A4B0] transition-all';

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <div className="relative">
            <select name={name} value={value as string} onChange={onChange} className={`${commonInputClasses} appearance-none`} required={required}>
              <option value="">Select nationality</option>
              <option value="Indian">Indian</option><option value="American">American</option><option value="British">British</option><option value="Canadian">Canadian</option>
              <option value="Australian">Australian</option><option value="German">German</option><option value="French">French</option><option value="Other">Other</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        );
      case 'date':
        return (
          <div className="relative">
            <input type="date" name={name} value={value as string} onChange={onChange} className={`${commonInputClasses} pr-8`} required={required} min={new Date().toISOString().split('T')[0]} />
            <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        );
      default:
        return (<input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className={commonInputClasses} required={required} min={type === 'number' ? 1 : undefined} />);
    }
  };

  return (
    <div>
      <label className="block text-xs font-medium text-[#1E1E1E] mb-2 font-inter">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
      {renderInput()}
    </div>
  );
};

const SummaryRow: FC<SummaryRowProps> = ({ label, value }) => (
  <div className="flex justify-between items-center text-xs font-raleway">
    <span className="font-semibold text-[#1E1E1E] w-1/3">{label}</span><span className="text-gray-500">-</span>
    <span className="font-medium text-[#1E1E1E] w-2/3 text-right truncate">{value || '...'}</span>
  </div>
);

const Alert: FC<{ type: 'success' | 'error' | 'info'; message: string; onClose?: () => void }> = ({ type, message, onClose }) => {
  const typeStyles = {
    success: 'bg-green-50 border-green-200 text-green-800', error: 'bg-red-50 border-red-200 text-red-800', info: 'bg-blue-50 border-blue-200 text-blue-800'
  };
  const Icon = { success: CheckCircle, error: AlertCircle, info: AlertCircle }[type];
  return (
    <div className={`border rounded-md p-3 flex items-start space-x-2 ${typeStyles[type]} mb-4`}>
      <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" /><div className="flex-1"><p className="text-sm font-medium">{message}</p></div>
      {onClose && <button onClick={onClose} className="text-gray-400 hover:text-gray-600">×</button>}
    </div>
  );
};


// =================================================================
// --- MAIN PAGE COMPONENT ---
// =================================================================
const TravelBasicPage: FC = () => {
  const { data, updateData } = useItinerary();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [generationSuccess, setGenerationSuccess] = useState(false);
  const [apiFrom] = useState({ country: 'India', city: 'Mumbai' });
  const [apiTo, setApiTo] = useState({ country: '', city: '' });
  const [apiTravelerType, setApiTravelerType] = useState('solo');
  const [formErrors, setFormErrors] = useState<string[]>([]);

  useEffect(() => {
    if (data.startDate && data.endDate) {
      const start = new Date(data.startDate); const end = new Date(data.endDate);
      const timeDiff = end.getTime() - start.getTime();
      if (timeDiff < 0) return;
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
      if (daysDiff > 0 && daysDiff !== data.totalDays) { updateData({ totalDays: daysDiff }); }
    }
  }, [data.startDate, data.endDate, data.totalDays, updateData]);

  useEffect(() => {
    if (generationSuccess) { const timer = setTimeout(() => setGenerationSuccess(false), 3000); return () => clearTimeout(timer); }
  }, [generationSuccess]);

  useEffect(() => {
    if (generationError) { const timer = setTimeout(() => setGenerationError(null), 5000); return () => clearTimeout(timer); }
  }, [generationError]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (formErrors.length > 0) { setFormErrors([]); }
    updateData({ [name]: type === 'number' ? (Number(value) < 1 ? 1 : Number(value)) : value });
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];
    if (!data.clientName.trim()) errors.push('Client Name');
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('Valid email is required');
    if (!data.startDate) errors.push('Start Date');
    if (!data.endDate) errors.push('End Date');
    if (!data.tripOverviewDetails.trim()) errors.push('Trip Overview');
    if (data.startDate && data.endDate) {
      if (new Date(data.endDate) < new Date(data.startDate)) errors.push('End date must be after start date');
    }
    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) { return; }
    localStorage.setItem('travelBasicData', JSON.stringify(data));
    navigate('/my-itinerary/create/arrival-departure');
  };

  const handleGenerateItinerary = async () => {
    setGenerationError(null); setGenerationSuccess(false);
    
    // Step 1: Validate the form fields required for both saving and generation.
    if (!validateForm()) {
        setGenerationError('Please fill in all required form fields before generating.');
        return;
    }
    // Step 2: Validate fields specific to the AI generator.
    if (!apiTo.city.trim() || !apiTo.country.trim()) {
        setGenerationError('Please provide a Destination City and Country for the AI generator.');
        return;
    }

    // *** NEWLY ADDED LOGIC ***
    // Step 3: Save the form data to session storage upon successful validation.
    try {
        sessionStorage.setItem('travelBasicData', JSON.stringify(data));
    } catch (error) {
        console.error("Failed to save data to sessionStorage:", error);
        setGenerationError("Could not save your data. Please try again.");
        return; // Stop if saving fails
    }

    // Step 4: Proceed with AI itinerary generation.
    setIsGenerating(true);

    const payload = {
      traveler: data.clientName,
      travelerType: apiTravelerType,
      travelBasics: {
        from: apiFrom, to: apiTo, startDate: data.startDate, endDate: data.endDate,
        totalTravelers: data.totalTravelers, totalDays: data.totalDays,
      },
      tripOverviewDetails: data.tripOverviewDetails,
    };

    try {
      const generatedItinerary = await generateItinerary(payload);

      sessionStorage.setItem('generatedItinerary', JSON.stringify({ ...generatedItinerary, generatedAt: new Date().toISOString() }));
      setGenerationSuccess(true);
      setTimeout(() => navigate('/my-itinerary/create/view'), 1500);

    } catch (err: any) {
      if (err.message.includes("session has expired")) {
        setTimeout(() => logout(), 3000);
      }
      setGenerationError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-[#F6F6FA] min-h-screen p-4 sm:p-6 lg:p-2 font-raleway">
      <header className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-semibold text-[#10A4B0] font-raleway">Travel Basic</h1>
          <p className="text-sm text-gray-600 mt-1">Set up trip details and generate an AI-powered itinerary.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-[#10A4B0] text-white px-3 py-1 rounded-full text-xs font-inter font-medium">
            <Eye className="w-4 h-4" /><span>Preview</span>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-white p-4 rounded-lg border border-[#E0E0E0] space-y-6">
          <img src="https://plus.unsplash.com/premium_photo-1661964003610-2422de390fec?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0" alt="Travel Destination" className="w-full h-44 object-cover rounded-md" />
          
          <div className="border border-purple-200 bg-purple-50 p-4 rounded-lg space-y-4">
            <div className="flex items-center justify-between"><h3 className="text-lg font-semibold text-purple-800 font-raleway">AI Itinerary Generator</h3><span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">✨ Powered by Gemini</span></div>
            {generationSuccess && <Alert type="success" message="✨ Itinerary generated! Redirecting..." />}
            {generationError && <Alert type="error" message={generationError} onClose={() => setGenerationError(null)} />}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div><label className="block text-xs font-medium text-[#1E1E1E] mb-2">To (City) <span className="text-red-500">*</span></label><input type="text" placeholder="e.g., Chiang Mai" value={apiTo.city} onChange={(e) => setApiTo({ ...apiTo, city: e.target.value })} className="w-full bg-white border border-gray-300 rounded-[5px] h-[30px] px-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
              <div><label className="block text-xs font-medium text-[#1E1E1E] mb-2">To (Country) <span className="text-red-500">*</span></label><input type="text" placeholder="e.g., Thailand" value={apiTo.country} onChange={(e) => setApiTo({ ...apiTo, country: e.target.value })} className="w-full bg-white border border-gray-300 rounded-[5px] h-[30px] px-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
              <div><label className="block text-xs font-medium text-[#1E1E1E] mb-2">Traveler Type</label><select value={apiTravelerType} onChange={(e) => setApiTravelerType(e.target.value)} className="w-full bg-white border border-gray-300 rounded-[5px] h-[30px] px-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"><option value="solo">Solo</option><option value="couple">Couple</option><option value="family">Family</option><option value="group">Group</option></select></div>
            </div>
            <div className="flex items-center justify-end"><button type="button" onClick={handleGenerateItinerary} disabled={isGenerating} className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-inter font-medium hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed transition-colors min-w-[140px]">{isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}<span>{isGenerating ? 'Generating...' : 'Generate with AI'}</span></button></div>
          </div>
          
          <form onSubmit={handleSubmit} noValidate>
            {formErrors.length > 0 && <Alert type="error" message={`Please fix: ${formErrors.join(', ')}`} onClose={() => setFormErrors([])} />}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <InputField label="Client Name" name="clientName" value={data.clientName} onChange={handleChange} placeholder="Enter full name" required />
              <InputField label="Email Address" name="email" value={data.email} onChange={handleChange} placeholder="Enter email address" type="email" required />
              <InputField label="Phone Number" name="phone" value={data.phone} onChange={handleChange} placeholder="Enter phone number" type="tel" />
              <InputField label="Nationality" name="nationality" value={data.nationality} onChange={handleChange} type="select" />
              <InputField label="Start Date" name="startDate" value={data.startDate} onChange={handleChange} type="date" required />
              <InputField label="End Date" name="endDate" value={data.endDate} onChange={handleChange} type="date" required />
              <InputField label="Total Travelers" name="totalTravelers" value={data.totalTravelers} onChange={handleChange} type="number" />
              <div>
                <label className="block text-xs font-medium text-[#1E1E1E] mb-2 font-inter">Total Days</label>
                <div className="relative">
                  <input type="number" name="totalDays" value={data.totalDays} className="w-full bg-gray-200 border border-gray-300 rounded-[5px] h-[30px] px-2 text-sm text-gray-600 cursor-not-allowed" readOnly />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">Auto</span>
                </div>
              </div>
            </div>
            <div className="border-t border-[#E0E0E0] pt-6 space-y-2 mt-6">
              <InputField label="Trip Overview Title" name="tripOverviewTitle" value={data.tripOverviewTitle} onChange={handleChange} placeholder="e.g., Cultural Adventure, Beach Getaway" />
              <div>
                <label className="block text-xs font-medium text-[#1E1E1E] mb-2 font-inter">Trip Overview Details <span className="text-red-500">*</span></label>
                <div className="bg-white border border-[#DDDDDD] rounded-md">
                  <div className="flex items-center p-2 space-x-1 bg-[#F8F8F8] border-b border-[#DDDDDD] rounded-t-md">
                    <button type="button" className="p-1.5 border border-[#7F7F7F] rounded hover:bg-gray-200"><Bold className="w-4 h-4" /></button>
                    <button type="button" className="p-1.5 border border-[#7F7F7F] rounded hover:bg-gray-200"><Italic className="w-4 h-4" /></button>
                    <button type="button" className="p-1.5 border border-[#7F7F7F] rounded hover:bg-gray-200"><Link className="w-4 h-4" /></button>
                    <button type="button" className="p-1.5 border border-[#7F7F7F] rounded hover:bg-gray-200"><ImageIcon className="w-4 h-4" /></button>
                  </div>
                  <textarea name="tripOverviewDetails" value={data.tripOverviewDetails} onChange={handleChange} placeholder="Describe your desired experience, interests, activities, travel style, etc." className="w-full h-24 p-3 text-sm focus:outline-none rounded-b-md resize-none" maxLength={500} required />
                </div>
              </div>
            </div>
            <div className="flex justify-center pt-6">
              <button type="submit" className="bg-[#10A4B0] text-white font-raleway font-medium text-sm px-10 py-3 rounded-md hover:bg-opacity-90 transition-colors disabled:bg-gray-400" disabled={isGenerating}>Save & Continue</button>
            </div>
          </form>
        </div>
        <div className="lg:col-span-1 sticky top-8">
          <div className="bg-white p-4 rounded-lg border border-[#E0E0E0]">
            <h2 className="text-xl font-semibold text-[#717182] font-raleway mb-4">Trip Summary</h2>
            <div className="border border-[#E0E0E0] rounded-lg">
              <div className="bg-[#10A4B0] text-white flex justify-between items-center px-3 py-3 rounded-t-lg">
                <h3 className="font-raleway font-medium text-lg">Travel Basic</h3>
                <MoreHorizontal className="w-6 h-6" />
              </div>
              <div className="p-4 space-y-3">
                <SummaryRow label="Client Name" value={data.clientName} />
                <SummaryRow label="Email" value={data.email} />
                <SummaryRow label="Phone" value={data.phone} />
                <SummaryRow label="Nationality" value={data.nationality} />
                <SummaryRow label="Start Date" value={data.startDate || 'Not set'} />
                <SummaryRow label="End Date" value={data.endDate || 'Not set'} />
                <SummaryRow label="Travelers" value={data.totalTravelers} />
                <SummaryRow label="Total Days" value={data.totalDays || 'Auto'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelBasicPage;



// //v2--also best -- but doesnt have from and to option--this works the best
// import { useNavigate } from 'react-router-dom';
// import { useItinerary } from '../../context/ItineraryContext';
// import { useAuth } from '../../context/AuthContext';
// import { generateItinerary } from '../../api/itinerary_api'; // Using the abstracted fetch logic
// import { ChangeEvent, FC, FormEvent, useState, useEffect } from 'react';
// import {
//   Eye, Calendar, ChevronDown, Bold, Italic, Link,
//   Image as ImageIcon, MoreHorizontal, Wand2, Loader2, AlertCircle, CheckCircle
// } from 'lucide-react';

// // --- TYPE DEFINITIONS ---
// interface ItineraryData {
//   clientName: string;
//   email: string;
//   phone: string;
//   nationality: string;
//   startDate: string;
//   endDate: string;
//   totalTravelers: number;
//   totalDays: number;
//   tripOverviewTitle: string;
//   tripOverviewDetails: string;
// }

// interface InputFieldProps {
//   label: string;
//   name: Extract<keyof ItineraryData, string>;
//   value: string | number;
//   onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
//   placeholder?: string;
//   type?: 'text' | 'email' | 'tel' | 'date' | 'number' | 'select';
//   required?: boolean;
// }

// interface SummaryRowProps {
//   label: string;
//   value: string | number;
// }

// // =================================================================
// // --- REUSABLE UI COMPONENTS ---
// // =================================================================

// const InputField: FC<InputFieldProps> = ({ label, name, value, onChange, placeholder, type = 'text', required = false }) => {
//   const commonInputClasses = 'w-full bg-gray-100 border border-gray-200 rounded-[5px] h-[30px] px-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#10A4B0] transition-all';

//   const renderInput = () => {
//     switch (type) {
//       case 'select':
//         return (
//           <div className="relative">
//             <select name={name} value={value as string} onChange={onChange} className={`${commonInputClasses} appearance-none`} required={required}>
//               <option value="">Select nationality</option>
//               <option value="Indian">Indian</option><option value="American">American</option><option value="British">British</option><option value="Canadian">Canadian</option>
//               <option value="Australian">Australian</option><option value="German">German</option><option value="French">French</option><option value="Other">Other</option>
//             </select>
//             <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//           </div>
//         );
//       case 'date':
//         return (
//           <div className="relative">
//             <input type="date" name={name} value={value as string} onChange={onChange} className={`${commonInputClasses} pr-8`} required={required} min={new Date().toISOString().split('T')[0]} />
//             <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//           </div>
//         );
//       default:
//         return (<input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className={commonInputClasses} required={required} min={type === 'number' ? 1 : undefined} />);
//     }
//   };

//   return (
//     <div>
//       <label className="block text-xs font-medium text-[#1E1E1E] mb-2 font-inter">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
//       {renderInput()}
//     </div>
//   );
// };

// const SummaryRow: FC<SummaryRowProps> = ({ label, value }) => (
//   <div className="flex justify-between items-center text-xs font-raleway">
//     <span className="font-semibold text-[#1E1E1E] w-1/3">{label}</span><span className="text-gray-500">-</span>
//     <span className="font-medium text-[#1E1E1E] w-2/3 text-right truncate">{value || '...'}</span>
//   </div>
// );

// const Alert: FC<{ type: 'success' | 'error' | 'info'; message: string; onClose?: () => void }> = ({ type, message, onClose }) => {
//   const typeStyles = {
//     success: 'bg-green-50 border-green-200 text-green-800', error: 'bg-red-50 border-red-200 text-red-800', info: 'bg-blue-50 border-blue-200 text-blue-800'
//   };
//   const Icon = { success: CheckCircle, error: AlertCircle, info: AlertCircle }[type];
//   return (
//     <div className={`border rounded-md p-3 flex items-start space-x-2 ${typeStyles[type]} mb-4`}>
//       <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" /><div className="flex-1"><p className="text-sm font-medium">{message}</p></div>
//       {onClose && <button onClick={onClose} className="text-gray-400 hover:text-gray-600">×</button>}
//     </div>
//   );
// };


// // =================================================================
// // --- MAIN PAGE COMPONENT ---
// // =================================================================
// const TravelBasicPage: FC = () => {
//   const { data, updateData } = useItinerary();
//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   const [isGenerating, setIsGenerating] = useState(false);
//   const [generationError, setGenerationError] = useState<string | null>(null);
//   const [generationSuccess, setGenerationSuccess] = useState(false);
//   const [apiFrom] = useState({ country: 'India', city: 'Mumbai' });
//   const [apiTo, setApiTo] = useState({ country: '', city: '' });
//   const [apiTravelerType, setApiTravelerType] = useState('solo');
//   const [formErrors, setFormErrors] = useState<string[]>([]);

//   useEffect(() => {
//     if (data.startDate && data.endDate) {
//       const start = new Date(data.startDate); const end = new Date(data.endDate);
//       const timeDiff = end.getTime() - start.getTime();
//       if (timeDiff < 0) return;
//       const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
//       if (daysDiff > 0 && daysDiff !== data.totalDays) { updateData({ totalDays: daysDiff }); }
//     }
//   }, [data.startDate, data.endDate, data.totalDays, updateData]);

//   useEffect(() => {
//     if (generationSuccess) { const timer = setTimeout(() => setGenerationSuccess(false), 3000); return () => clearTimeout(timer); }
//   }, [generationSuccess]);

//   useEffect(() => {
//     if (generationError) { const timer = setTimeout(() => setGenerationError(null), 5000); return () => clearTimeout(timer); }
//   }, [generationError]);

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target;
//     if (formErrors.length > 0) { setFormErrors([]); }
//     updateData({ [name]: type === 'number' ? (Number(value) < 1 ? 1 : Number(value)) : value });
//   };

//   const validateForm = (): boolean => {
//     const errors: string[] = [];
//     if (!data.clientName.trim()) errors.push('Client Name');
//     if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('Valid email is required');
//     if (!data.startDate) errors.push('Start Date');
//     if (!data.endDate) errors.push('End Date');
//     if (!data.tripOverviewDetails.trim()) errors.push('Trip Overview');
//     if (data.startDate && data.endDate) {
//       if (new Date(data.endDate) < new Date(data.startDate)) errors.push('End date must be after start date');
//     }
//     setFormErrors(errors);
//     return errors.length === 0;
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) { return; }
//     localStorage.setItem('travelBasicData', JSON.stringify(data));
//     navigate('/my-itinerary/create/arrival-departure');
//   };

//   const handleGenerateItinerary = async () => {
//     setGenerationError(null); setGenerationSuccess(false);
    
//     // Step 1: Validate the form fields required for both saving and generation.
//     if (!validateForm()) {
//         setGenerationError('Please fill in all required form fields before generating.');
//         return;
//     }
//     // Step 2: Validate fields specific to the AI generator.
//     if (!apiTo.city.trim() || !apiTo.country.trim()) {
//         setGenerationError('Please provide a Destination City and Country for the AI generator.');
//         return;
//     }

//     // *** NEWLY ADDED LOGIC ***
//     // Step 3: Save the form data to session storage upon successful validation.
//     try {
//         sessionStorage.setItem('travelBasicData', JSON.stringify(data));
//     } catch (error) {
//         console.error("Failed to save data to sessionStorage:", error);
//         setGenerationError("Could not save your data. Please try again.");
//         return; // Stop if saving fails
//     }

//     // Step 4: Proceed with AI itinerary generation.
//     setIsGenerating(true);

//     const payload = {
//       traveler: data.clientName,
//       travelerType: apiTravelerType,
//       travelBasics: {
//         from: apiFrom, to: apiTo, startDate: data.startDate, endDate: data.endDate,
//         totalTravelers: data.totalTravelers, totalDays: data.totalDays,
//       },
//       tripOverviewDetails: data.tripOverviewDetails,
//     };

//     try {
//       const generatedItinerary = await generateItinerary(payload);

//       sessionStorage.setItem('generatedItinerary', JSON.stringify({ ...generatedItinerary, generatedAt: new Date().toISOString() }));
//       setGenerationSuccess(true);
//       setTimeout(() => navigate('/my-itinerary/create/view'), 1500);

//     } catch (err: any) {
//       if (err.message.includes("session has expired")) {
//         setTimeout(() => logout(), 3000);
//       }
//       setGenerationError(err.message);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return (
//     <div className="bg-[#F6F6FA] min-h-screen p-4 sm:p-6 lg:p-2 font-raleway">
//       <header className="flex justify-between items-center mb-4">
//         <div>
//           <h1 className="text-xl font-semibold text-[#10A4B0] font-raleway">Travel Basic</h1>
//           <p className="text-sm text-gray-600 mt-1">Set up trip details and generate an AI-powered itinerary.</p>
//         </div>
//         <div className="flex items-center space-x-4">
//           <button className="flex items-center space-x-2 bg-[#10A4B0] text-white px-3 py-1 rounded-full text-xs font-inter font-medium">
//             <Eye className="w-4 h-4" /><span>Preview</span>
//           </button>
//         </div>
//       </header>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
//         <div className="lg:col-span-2 bg-white p-4 rounded-lg border border-[#E0E0E0] space-y-6">
//           <img src="https://plus.unsplash.com/premium_photo-1661964003610-2422de390fec?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0" alt="Travel Destination" className="w-full h-44 object-cover rounded-md" />
          
//           <div className="border border-purple-200 bg-purple-50 p-4 rounded-lg space-y-4">
//             <div className="flex items-center justify-between"><h3 className="text-lg font-semibold text-purple-800 font-raleway">AI Itinerary Generator</h3><span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">✨ Powered by Gemini</span></div>
//             {generationSuccess && <Alert type="success" message="✨ Itinerary generated! Redirecting..." />}
//             {generationError && <Alert type="error" message={generationError} onClose={() => setGenerationError(null)} />}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <div><label className="block text-xs font-medium text-[#1E1E1E] mb-2">To (City) <span className="text-red-500">*</span></label><input type="text" placeholder="e.g., Chiang Mai" value={apiTo.city} onChange={(e) => setApiTo({ ...apiTo, city: e.target.value })} className="w-full bg-white border border-gray-300 rounded-[5px] h-[30px] px-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
//               <div><label className="block text-xs font-medium text-[#1E1E1E] mb-2">To (Country) <span className="text-red-500">*</span></label><input type="text" placeholder="e.g., Thailand" value={apiTo.country} onChange={(e) => setApiTo({ ...apiTo, country: e.target.value })} className="w-full bg-white border border-gray-300 rounded-[5px] h-[30px] px-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
//               <div><label className="block text-xs font-medium text-[#1E1E1E] mb-2">Traveler Type</label><select value={apiTravelerType} onChange={(e) => setApiTravelerType(e.target.value)} className="w-full bg-white border border-gray-300 rounded-[5px] h-[30px] px-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"><option value="solo">Solo</option><option value="couple">Couple</option><option value="family">Family</option><option value="group">Group</option></select></div>
//             </div>
//             <div className="flex items-center justify-end"><button type="button" onClick={handleGenerateItinerary} disabled={isGenerating} className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-inter font-medium hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed transition-colors min-w-[140px]">{isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}<span>{isGenerating ? 'Generating...' : 'Generate with AI'}</span></button></div>
//           </div>
          
//           <form onSubmit={handleSubmit} noValidate>
//             {formErrors.length > 0 && <Alert type="error" message={`Please fix: ${formErrors.join(', ')}`} onClose={() => setFormErrors([])} />}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//               <InputField label="Client Name" name="clientName" value={data.clientName} onChange={handleChange} placeholder="Enter full name" required />
//               <InputField label="Email Address" name="email" value={data.email} onChange={handleChange} placeholder="Enter email address" type="email" required />
//               <InputField label="Phone Number" name="phone" value={data.phone} onChange={handleChange} placeholder="Enter phone number" type="tel" />
//               <InputField label="Nationality" name="nationality" value={data.nationality} onChange={handleChange} type="select" />
//               <InputField label="Start Date" name="startDate" value={data.startDate} onChange={handleChange} type="date" required />
//               <InputField label="End Date" name="endDate" value={data.endDate} onChange={handleChange} type="date" required />
//               <InputField label="Total Travelers" name="totalTravelers" value={data.totalTravelers} onChange={handleChange} type="number" />
//               <div>
//                 <label className="block text-xs font-medium text-[#1E1E1E] mb-2 font-inter">Total Days</label>
//                 <div className="relative">
//                   <input type="number" name="totalDays" value={data.totalDays} className="w-full bg-gray-200 border border-gray-300 rounded-[5px] h-[30px] px-2 text-sm text-gray-600 cursor-not-allowed" readOnly />
//                   <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">Auto</span>
//                 </div>
//               </div>
//             </div>
//             <div className="border-t border-[#E0E0E0] pt-6 space-y-2 mt-6">
//               <InputField label="Trip Overview Title" name="tripOverviewTitle" value={data.tripOverviewTitle} onChange={handleChange} placeholder="e.g., Cultural Adventure, Beach Getaway" />
//               <div>
//                 <label className="block text-xs font-medium text-[#1E1E1E] mb-2 font-inter">Trip Overview Details <span className="text-red-500">*</span></label>
//                 <div className="bg-white border border-[#DDDDDD] rounded-md">
//                   <div className="flex items-center p-2 space-x-1 bg-[#F8F8F8] border-b border-[#DDDDDD] rounded-t-md">
//                     <button type="button" className="p-1.5 border border-[#7F7F7F] rounded hover:bg-gray-200"><Bold className="w-4 h-4" /></button>
//                     <button type="button" className="p-1.5 border border-[#7F7F7F] rounded hover:bg-gray-200"><Italic className="w-4 h-4" /></button>
//                     <button type="button" className="p-1.5 border border-[#7F7F7F] rounded hover:bg-gray-200"><Link className="w-4 h-4" /></button>
//                     <button type="button" className="p-1.5 border border-[#7F7F7F] rounded hover:bg-gray-200"><ImageIcon className="w-4 h-4" /></button>
//                   </div>
//                   <textarea name="tripOverviewDetails" value={data.tripOverviewDetails} onChange={handleChange} placeholder="Describe your desired experience, interests, activities, travel style, etc." className="w-full h-24 p-3 text-sm focus:outline-none rounded-b-md resize-none" maxLength={500} required />
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-center pt-6">
//               <button type="submit" className="bg-[#10A4B0] text-white font-raleway font-medium text-sm px-10 py-3 rounded-md hover:bg-opacity-90 transition-colors disabled:bg-gray-400" disabled={isGenerating}>Save & Continue</button>
//             </div>
//           </form>
//         </div>
//         <div className="lg:col-span-1 sticky top-8">
//           <div className="bg-white p-4 rounded-lg border border-[#E0E0E0]">
//             <h2 className="text-xl font-semibold text-[#717182] font-raleway mb-4">Trip Summary</h2>
//             <div className="border border-[#E0E0E0] rounded-lg">
//               <div className="bg-[#10A4B0] text-white flex justify-between items-center px-3 py-3 rounded-t-lg">
//                 <h3 className="font-raleway font-medium text-lg">Travel Basic</h3>
//                 <MoreHorizontal className="w-6 h-6" />
//               </div>
//               <div className="p-4 space-y-3">
//                 <SummaryRow label="Client Name" value={data.clientName} />
//                 <SummaryRow label="Email" value={data.email} />
//                 <SummaryRow label="Phone" value={data.phone} />
//                 <SummaryRow label="Nationality" value={data.nationality} />
//                 <SummaryRow label="Start Date" value={data.startDate || 'Not set'} />
//                 <SummaryRow label="End Date" value={data.endDate || 'Not set'} />
//                 <SummaryRow label="Travelers" value={data.totalTravelers} />
//                 <SummaryRow label="Total Days" value={data.totalDays || 'Auto'} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TravelBasicPage;









// v1 older working version
// import { useNavigate } from 'react-router-dom';
// import { useItinerary } from '../../context/ItineraryContext';
// import { useAuth } from '../../context/AuthContext';
// import { generateItinerary } from '../../api/itinerary_api'; // Using the abstracted fetch logic
// import { ChangeEvent, FC, FormEvent, useState, useEffect, useCallback } from 'react';
// import {
//   Eye, Calendar, ChevronDown, Bold, Italic, Link,
//   Image as ImageIcon, MoreHorizontal, Wand2, Loader2, AlertCircle, CheckCircle
// } from 'lucide-react';

// // --- TYPE DEFINITIONS ---
// interface ItineraryData {
//   clientName: string;
//   email: string;
//   phone: string;
//   nationality: string;
//   startDate: string;
//   endDate: string;
//   totalTravelers: number;
//   totalDays: number;
//   tripOverviewTitle: string;
//   tripOverviewDetails: string;
// }

// interface InputFieldProps {
//   label: string;
//   name: Extract<keyof ItineraryData, string>;
//   value: string | number;
//   onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
//   placeholder?: string;
//   type?: 'text' | 'email' | 'tel' | 'date' | 'number' | 'select';
//   required?: boolean;
// }

// interface SummaryRowProps {
//   label: string;
//   value: string | number;
// }

// // =================================================================
// // --- REUSABLE UI COMPONENTS ---
// // =================================================================

// const InputField: FC<InputFieldProps> = ({ label, name, value, onChange, placeholder, type = 'text', required = false }) => {
//   const commonInputClasses = 'w-full bg-gray-100 border border-gray-200 rounded-[5px] h-[30px] px-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#10A4B0] transition-all';

//   const renderInput = () => {
//     switch (type) {
//       case 'select':
//         return (
//           <div className="relative">
//             <select name={name} value={value as string} onChange={onChange} className={`${commonInputClasses} appearance-none`} required={required}>
//               <option value="">Select nationality</option>
//               <option value="Indian">Indian</option><option value="American">American</option><option value="British">British</option><option value="Canadian">Canadian</option>
//               <option value="Australian">Australian</option><option value="German">German</option><option value="French">French</option><option value="Other">Other</option>
//             </select>
//             <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//           </div>
//         );
//       case 'date':
//         return (
//           <div className="relative">
//             <input type="date" name={name} value={value as string} onChange={onChange} className={`${commonInputClasses} pr-8`} required={required} min={new Date().toISOString().split('T')[0]} />
//             <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//           </div>
//         );
//       default:
//         return (<input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className={commonInputClasses} required={required} min={type === 'number' ? 1 : undefined} />);
//     }
//   };

//   return (
//     <div>
//       <label className="block text-xs font-medium text-[#1E1E1E] mb-2 font-inter">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
//       {renderInput()}
//     </div>
//   );
// };

// const SummaryRow: FC<SummaryRowProps> = ({ label, value }) => (
//   <div className="flex justify-between items-center text-xs font-raleway">
//     <span className="font-semibold text-[#1E1E1E] w-1/3">{label}</span><span className="text-gray-500">-</span>
//     <span className="font-medium text-[#1E1E1E] w-2/3 text-right truncate">{value || '...'}</span>
//   </div>
// );

// const Alert: FC<{ type: 'success' | 'error' | 'info'; message: string; onClose?: () => void }> = ({ type, message, onClose }) => {
//   const typeStyles = {
//     success: 'bg-green-50 border-green-200 text-green-800', error: 'bg-red-50 border-red-200 text-red-800', info: 'bg-blue-50 border-blue-200 text-blue-800'
//   };
//   const Icon = { success: CheckCircle, error: AlertCircle, info: AlertCircle }[type];
//   return (
//     <div className={`border rounded-md p-3 flex items-start space-x-2 ${typeStyles[type]} mb-4`}>
//       <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" /><div className="flex-1"><p className="text-sm font-medium">{message}</p></div>
//       {onClose && <button onClick={onClose} className="text-gray-400 hover:text-gray-600">×</button>}
//     </div>
//   );
// };


// // =================================================================
// // --- MAIN PAGE COMPONENT ---
// // =================================================================
// const TravelBasicPage: FC = () => {
//   const { data, updateData } = useItinerary();
//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   const [isGenerating, setIsGenerating] = useState(false);
//   const [generationError, setGenerationError] = useState<string | null>(null);
//   const [generationSuccess, setGenerationSuccess] = useState(false);
//   const [apiFrom] = useState({ country: 'India', city: 'Mumbai' });
//   const [apiTo, setApiTo] = useState({ country: '', city: '' });
//   const [apiTravelerType, setApiTravelerType] = useState('solo');
//   const [formErrors, setFormErrors] = useState<string[]>([]);

//   useEffect(() => {
//     if (data.startDate && data.endDate) {
//       const start = new Date(data.startDate); const end = new Date(data.endDate);
//       const timeDiff = end.getTime() - start.getTime();
//       if (timeDiff < 0) return;
//       const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
//       if (daysDiff > 0 && daysDiff !== data.totalDays) { updateData({ totalDays: daysDiff }); }
//     }
//   }, [data.startDate, data.endDate, data.totalDays, updateData]);

//   useEffect(() => {
//     if (generationSuccess) { const timer = setTimeout(() => setGenerationSuccess(false), 3000); return () => clearTimeout(timer); }
//   }, [generationSuccess]);

//   useEffect(() => {
//     if (generationError) { const timer = setTimeout(() => setGenerationError(null), 5000); return () => clearTimeout(timer); }
//   }, [generationError]);

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target;
//     if (formErrors.length > 0) { setFormErrors([]); }
//     updateData({ [name]: type === 'number' ? (Number(value) < 1 ? 1 : Number(value)) : value });
//   };

//   const validateForm = (): boolean => {
//     const errors: string[] = [];
//     if (!data.clientName.trim()) errors.push('Client Name');
//     if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('Valid email is required');
//     if (!data.startDate) errors.push('Start Date');
//     if (!data.endDate) errors.push('End Date');
//     if (!data.tripOverviewDetails.trim()) errors.push('Trip Overview');
//     if (data.startDate && data.endDate) {
//       if (new Date(data.endDate) < new Date(data.startDate)) errors.push('End date must be after start date');
//     }
//     setFormErrors(errors);
//     return errors.length === 0;
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) { return; }
//     localStorage.setItem('travelBasicData', JSON.stringify(data));
//     navigate('/my-itinerary/create/arrival-departure');
//   };

//   const handleGenerateItinerary = async () => {
//     setGenerationError(null); setGenerationSuccess(false);
    
//     if (!validateForm()) {
//         setGenerationError('Please fill in all required form fields before generating.');
//         return;
//     }
//     if (!apiTo.city.trim() || !apiTo.country.trim()) {
//         setGenerationError('Please provide a Destination City and Country for the AI generator.');
//         return;
//     }

//     setIsGenerating(true);

//     const payload = {
//       traveler: data.clientName,
//       travelerType: apiTravelerType,
//       travelBasics: {
//         from: apiFrom, to: apiTo, startDate: data.startDate, endDate: data.endDate,
//         totalTravelers: data.totalTravelers, totalDays: data.totalDays,
//       },
//       tripOverviewDetails: data.tripOverviewDetails,
//     };

//     try {
//       const generatedItinerary = await generateItinerary(payload);

//       sessionStorage.setItem('generatedItinerary', JSON.stringify({ ...generatedItinerary, generatedAt: new Date().toISOString() }));
//       setGenerationSuccess(true);
//       setTimeout(() => navigate('/my-itinerary/create/view-itinerary'), 1500);

//     } catch (err: any) {
//       if (err.message.includes("session has expired")) {
//         setTimeout(() => logout(), 3000);
//       }
//       setGenerationError(err.message);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return (
//     <div className="bg-[#F6F6FA] min-h-screen p-4 sm:p-6 lg:p-2 font-raleway">
//       <header className="flex justify-between items-center mb-4">
//         <div>
//           <h1 className="text-xl font-semibold text-[#10A4B0] font-raleway">Travel Basic</h1>
//           <p className="text-sm text-gray-600 mt-1">Set up trip details and generate an AI-powered itinerary.</p>
//         </div>
//         <div className="flex items-center space-x-4">
//           <button className="flex items-center space-x-2 bg-[#10A4B0] text-white px-3 py-1 rounded-full text-xs font-inter font-medium">
//             <Eye className="w-4 h-4" /><span>Preview</span>
//           </button>
//         </div>
//       </header>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
//         <div className="lg:col-span-2 bg-white p-4 rounded-lg border border-[#E0E0E0] space-y-6">
//           <img src="https://plus.unsplash.com/premium_photo-1661964003610-2422de390fec?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0" alt="Travel Destination" className="w-full h-44 object-cover rounded-md" />
          
//           <div className="border border-purple-200 bg-purple-50 p-4 rounded-lg space-y-4">
//             <div className="flex items-center justify-between"><h3 className="text-lg font-semibold text-purple-800 font-raleway">AI Itinerary Generator</h3><span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">✨ Powered by Gemini</span></div>
//             {generationSuccess && <Alert type="success" message="✨ Itinerary generated! Redirecting..." />}
//             {generationError && <Alert type="error" message={generationError} onClose={() => setGenerationError(null)} />}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <div><label className="block text-xs font-medium text-[#1E1E1E] mb-2">To (City) <span className="text-red-500">*</span></label><input type="text" placeholder="e.g., Chiang Mai" value={apiTo.city} onChange={(e) => setApiTo({ ...apiTo, city: e.target.value })} className="w-full bg-white border border-gray-300 rounded-[5px] h-[30px] px-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
//               <div><label className="block text-xs font-medium text-[#1E1E1E] mb-2">To (Country) <span className="text-red-500">*</span></label><input type="text" placeholder="e.g., Thailand" value={apiTo.country} onChange={(e) => setApiTo({ ...apiTo, country: e.target.value })} className="w-full bg-white border border-gray-300 rounded-[5px] h-[30px] px-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
//               <div><label className="block text-xs font-medium text-[#1E1E1E] mb-2">Traveler Type</label><select value={apiTravelerType} onChange={(e) => setApiTravelerType(e.target.value)} className="w-full bg-white border border-gray-300 rounded-[5px] h-[30px] px-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"><option value="solo">Solo</option><option value="couple">Couple</option><option value="family">Family</option><option value="group">Group</option></select></div>
//             </div>
//             <div className="flex items-center justify-end"><button type="button" onClick={handleGenerateItinerary} disabled={isGenerating} className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-inter font-medium hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed transition-colors min-w-[140px]">{isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}<span>{isGenerating ? 'Generating...' : 'Generate with AI'}</span></button></div>
//           </div>
          
//           <form onSubmit={handleSubmit} noValidate>
//             {formErrors.length > 0 && <Alert type="error" message={`Please fix: ${formErrors.join(', ')}`} onClose={() => setFormErrors([])} />}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//               <InputField label="Client Name" name="clientName" value={data.clientName} onChange={handleChange} placeholder="Enter full name" required />
//               <InputField label="Email Address" name="email" value={data.email} onChange={handleChange} placeholder="Enter email address" type="email" required />
//               <InputField label="Phone Number" name="phone" value={data.phone} onChange={handleChange} placeholder="Enter phone number" type="tel" />
//               <InputField label="Nationality" name="nationality" value={data.nationality} onChange={handleChange} type="select" />
//               <InputField label="Start Date" name="startDate" value={data.startDate} onChange={handleChange} type="date" required />
//               <InputField label="End Date" name="endDate" value={data.endDate} onChange={handleChange} type="date" required />
//               <InputField label="Total Travelers" name="totalTravelers" value={data.totalTravelers} onChange={handleChange} type="number" />
//               <div>
//                 <label className="block text-xs font-medium text-[#1E1E1E] mb-2 font-inter">Total Days</label>
//                 <div className="relative">
//                   <input type="number" name="totalDays" value={data.totalDays} className="w-full bg-gray-200 border border-gray-300 rounded-[5px] h-[30px] px-2 text-sm text-gray-600 cursor-not-allowed" readOnly />
//                   <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">Auto</span>
//                 </div>
//               </div>
//             </div>
//             <div className="border-t border-[#E0E0E0] pt-6 space-y-2 mt-6">
//               <InputField label="Trip Overview Title" name="tripOverviewTitle" value={data.tripOverviewTitle} onChange={handleChange} placeholder="e.g., Cultural Adventure, Beach Getaway" />
//               <div>
//                 <label className="block text-xs font-medium text-[#1E1E1E] mb-2 font-inter">Trip Overview Details <span className="text-red-500">*</span></label>
//                 <div className="bg-white border border-[#DDDDDD] rounded-md">
//                   <div className="flex items-center p-2 space-x-1 bg-[#F8F8F8] border-b border-[#DDDDDD] rounded-t-md">
//                     <button type="button" className="p-1.5 border border-[#7F7F7F] rounded hover:bg-gray-200"><Bold className="w-4 h-4" /></button>
//                     <button type="button" className="p-1.5 border border-[#7F7F7F] rounded hover:bg-gray-200"><Italic className="w-4 h-4" /></button>
//                     <button type="button" className="p-1.5 border border-[#7F7F7F] rounded hover:bg-gray-200"><Link className="w-4 h-4" /></button>
//                     <button type="button" className="p-1.5 border border-[#7F7F7F] rounded hover:bg-gray-200"><ImageIcon className="w-4 h-4" /></button>
//                   </div>
//                   <textarea name="tripOverviewDetails" value={data.tripOverviewDetails} onChange={handleChange} placeholder="Describe your desired experience, interests, activities, travel style, etc." className="w-full h-24 p-3 text-sm focus:outline-none rounded-b-md resize-none" maxLength={500} required />
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-center pt-6">
//               <button type="submit" className="bg-[#10A4B0] text-white font-raleway font-medium text-sm px-10 py-3 rounded-md hover:bg-opacity-90 transition-colors disabled:bg-gray-400" disabled={isGenerating}>Save & Continue</button>
//             </div>
//           </form>
//         </div>
//         <div className="lg:col-span-1 sticky top-8">
//           <div className="bg-white p-4 rounded-lg border border-[#E0E0E0]">
//             <h2 className="text-xl font-semibold text-[#717182] font-raleway mb-4">Trip Summary</h2>
//             <div className="border border-[#E0E0E0] rounded-lg">
//               <div className="bg-[#10A4B0] text-white flex justify-between items-center px-3 py-3 rounded-t-lg">
//                 <h3 className="font-raleway font-medium text-lg">Travel Basic</h3>
//                 <MoreHorizontal className="w-6 h-6" />
//               </div>
//               <div className="p-4 space-y-3">
//                 <SummaryRow label="Client Name" value={data.clientName} />
//                 <SummaryRow label="Email" value={data.email} />
//                 <SummaryRow label="Phone" value={data.phone} />
//                 <SummaryRow label="Nationality" value={data.nationality} />
//                 <SummaryRow label="Start Date" value={data.startDate || 'Not set'} />
//                 <SummaryRow label="End Date" value={data.endDate || 'Not set'} />
//                 <SummaryRow label="Travelers" value={data.totalTravelers} />
//                 <SummaryRow label="Total Days" value={data.totalDays || 'Auto'} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TravelBasicPage;
