//v3

import React, { useState, useRef, ChangeEvent, useCallback, memo } from 'react';
import { Eye, Image as ImageIcon, Trash2, Plus, X, BusFront, Maximize, Minimize, Car, Utensils } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// --- Reusable Default Image Configuration ---
const DEFAULT_IMAGES = {
  daySummary: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=1974&auto=format&fit=crop',
  sightseeing: 'https://images.unsplash.com/photo-1502602898657-3e91760c0337?q=80&w=2070&auto=format&fit=crop',
  // Placeholders for Transfer and Meal images if needed in the future
  transfer: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
  meal: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop',
};


// --- TYPE DEFINITIONS ---
type ActivityTab = 'Day Itinerary' | 'Sightseeing' | 'Transfers' | 'Meals';
type ImageLayout = 'cover' | 'contain';

interface SightseeingItem {
  id: number;
  name: string;
  time: string;
  image: string;
  imageLayout: ImageLayout;
  description: string;
  ticketsIncluded: boolean;
}

interface TransferItem {
  id: number;
  from: string;
  to: string;
  mode: string;
  pickupTime: string;
}

interface MealItem {
  id: number;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  location: string;
  inclusions: string;
  mealIncluded: boolean;
}

interface Day {
  id: number;
  date: Date;
  title: string;
  description: string;
  image: string;
  imageLayout: ImageLayout;
  remark: string;
  sightseeing: SightseeingItem[];
  transfers: TransferItem[];
  meals: MealItem[];
  activeTab: ActivityTab;
}

// --- INITIAL DATA ---
const initialDay: Day = {
  id: Date.now(),
  date: new Date('2025-08-27T00:00:00'), // Set to current date
  title: 'Arrival in Singapore',
  description: 'Welcome to Singapore! Your driver is awaiting your arrival and will transfer you to the hotel.',
  image: DEFAULT_IMAGES.daySummary,
  imageLayout: 'cover',
  remark: '<p>Your first day in the vibrant city of Singapore. <strong>Get ready to explore!</strong></p>',
  activeTab: 'Day Itinerary',
  sightseeing: [],
  transfers: [],
  meals: [],
};


// --- MEMOIZED COMPONENTS FOR PERFORMANCE ---

const MemoizedDayPreviewCard = memo(({ day, onDelete, onImageLayoutToggle }: { day: Day, onDelete: (id: number) => void, onImageLayoutToggle: (id: number) => void }) => (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="bg-[#10A4B0] text-white p-3 rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold text-lg">{day.activeTab}</h3>
        <div className="flex space-x-1.5">
          {[...Array(3)].map((_, i) => <span key={i} className="w-3 h-3 bg-white/70 rounded-full"></span>)}
        </div>
      </div>
      <div className="p-4">
        <div className="relative group mb-4">
          <img src={day.image} alt={day.title} className={`w-full h-48 rounded-md shadow-md bg-gray-200`} style={{ objectFit: day.imageLayout }} />
          <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => onImageLayoutToggle(day.id)} className="p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70">
              {day.imageLayout === 'cover' ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <h4 className="font-bold text-gray-800 text-sm mb-2">{day.title || "Your Title Here"}</h4>
          <p className="text-gray-600 text-xs mb-4 leading-relaxed">{day.description || "Your description will appear here..."}</p>
          <div className="border-t-2 border-dashed border-gray-300 pt-3 flex items-center gap-2">
            <BusFront className="w-4 h-4 text-gray-600" />
            <span className="font-semibold text-xs text-gray-800">Transfer Type: Private</span>
          </div>
        </div>
      </div>
      <div className="p-4 flex gap-2">
        <button className="w-full bg-[#10A4B0] text-white text-sm py-1.5 rounded-md hover:bg-opacity-90 transition-colors">Edit</button>
        <button onClick={() => onDelete(day.id)} className="p-2 bg-red-50 text-red-500 rounded-md hover:bg-red-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
));

const DayItineraryForm = memo(({ day, onUpdate, onImageUpload, fileInputRef }: any) => (
  <div className="space-y-6 animate-fade-in">
    <div>
        <label className="text-xs font-medium text-gray-500">Main Title for the Day</label>
        <input
            type="text"
            placeholder="e.g., Arrival & City Exploration"
            value={day.title}
            onChange={(e) => onUpdate('title', e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#10A4B0] focus:border-[#10A4B0] transition"
        />
    </div>
    <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-shrink-0 w-full sm:w-48 h-40 bg-gray-200 rounded-md relative cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
            <img src={day.image} alt="Itinerary" className="w-full h-full object-cover rounded-md" />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all">
                <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
        </div>
        <input type="file" accept="image/*" ref={fileInputRef} onChange={onImageUpload} className="hidden" />
        <textarea
            placeholder="Enter a summary for the day's activities..."
            value={day.description}
            onChange={(e) => onUpdate('description', e.target.value)}
            className="w-full h-40 p-2 border border-gray-300 rounded-md text-sm resize-none focus:ring-1 focus:ring-[#10A4B0] focus:border-[#10A4B0] transition"
        ></textarea>
    </div>
    <div>
        <label className="text-sm font-medium mb-1 block">Day's Remark / Overview</label>
        <div className="border border-gray-300 rounded-md">
            <ReactQuill
                value={day.remark}
                onChange={(value) => onUpdate('remark', value)}
                modules={{ toolbar: [['bold', 'italic', 'link']] }}
                theme="snow"
                className="quill-editor"
            />
        </div>
    </div>
  </div>
));

const SightseeingForm = memo(({ day, onUpdate }: any) => {
    const handleItemChange = (itemId: number, field: keyof SightseeingItem, value: any) => {
        const updatedItems = day.sightseeing.map((item: SightseeingItem) => item.id === itemId ? { ...item, [field]: value } : item);
        onUpdate('sightseeing', updatedItems);
    };
    const addItem = () => {
        const newItem: SightseeingItem = { id: Date.now(), name: '', time: '', image: DEFAULT_IMAGES.sightseeing, imageLayout: 'cover', description: '', ticketsIncluded: false };
        onUpdate('sightseeing', [...day.sightseeing, newItem]);
    };
    const deleteItem = (itemId: number) => {
        onUpdate('sightseeing', day.sightseeing.filter((item: SightseeingItem) => item.id !== itemId));
    };
    return (
        <div className="space-y-6 animate-fade-in">
            {day.sightseeing.map((item: SightseeingItem, index: number) => (
                <div key={item.id} className="bg-gray-50 p-4 rounded-lg border relative">
                    <button onClick={() => deleteItem(item.id)} className="absolute top-2 right-2 p-1.5 text-gray-400 hover:bg-red-100 hover:text-red-500 rounded-full"><Trash2 className="w-4 h-4" /></button>
                    <p className="font-semibold text-gray-700 mb-3">Sightseeing Spot #{index + 1}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Activity Name (e.g., Gardens by the Bay)" value={item.name} onChange={e => handleItemChange(item.id, 'name', e.target.value)} className="p-2 border rounded-md text-sm w-full"/>
                        <input type="text" placeholder="Time Slot (e.g., 10 AM - 1 PM)" value={item.time} onChange={e => handleItemChange(item.id, 'time', e.target.value)} className="p-2 border rounded-md text-sm w-full"/>
                    </div>
                    <textarea placeholder="Description..." value={item.description} onChange={e => handleItemChange(item.id, 'description', e.target.value)} className="w-full mt-3 p-2 border rounded-md text-sm resize-none h-20"></textarea>
                    <div className="flex items-center gap-2 mt-3">
                        <input type="checkbox" id={`ticket-${item.id}`} checked={item.ticketsIncluded} onChange={e => handleItemChange(item.id, 'ticketsIncluded', e.target.checked)} className="h-4 w-4 rounded accent-[#10A4B0]"/>
                        <label htmlFor={`ticket-${item.id}`} className="text-sm font-medium text-gray-700">Tickets Included</label>
                    </div>
                </div>
            ))}
            <button onClick={addItem} className="w-full text-center py-2 bg-gray-100 text-sm font-semibold text-[#10A4B0] rounded-md hover:bg-gray-200 transition">Add Sightseeing Spot</button>
        </div>
    );
});

const TransfersForm = memo(({ day, onUpdate }: { day: Day, onUpdate: (field: keyof Day, value: any) => void }) => {
    const handleItemChange = (itemId: number, field: keyof TransferItem, value: any) => {
        const updatedItems = day.transfers.map(item => item.id === itemId ? { ...item, [field]: value } : item);
        onUpdate('transfers', updatedItems);
    };
    const addItem = () => {
        const newItem: TransferItem = { id: Date.now(), from: '', to: '', mode: 'Private Cab', pickupTime: '' };
        onUpdate('transfers', [...day.transfers, newItem]);
    };
    const deleteItem = (itemId: number) => {
        onUpdate('transfers', day.transfers.filter(item => item.id !== itemId));
    };
    return (
        <div className="space-y-6 animate-fade-in">
            {day.transfers.map((item, index) => (
                 <div key={item.id} className="bg-gray-50 p-4 rounded-lg border relative">
                    <button onClick={() => deleteItem(item.id)} className="absolute top-2 right-2 p-1.5 text-gray-400 hover:bg-red-100 hover:text-red-500 rounded-full"><Trash2 className="w-4 h-4" /></button>
                    <p className="font-semibold text-gray-700 mb-3 flex items-center gap-2"><Car className="w-4 h-4" /> Transfer #{index + 1}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="From Location" value={item.from} onChange={e => handleItemChange(item.id, 'from', e.target.value)} className="p-2 border rounded-md text-sm w-full"/>
                        <input type="text" placeholder="To Location" value={item.to} onChange={e => handleItemChange(item.id, 'to', e.target.value)} className="p-2 border rounded-md text-sm w-full"/>
                        <input type="text" placeholder="Pickup Time (e.g., 9:00 AM)" value={item.pickupTime} onChange={e => handleItemChange(item.id, 'pickupTime', e.target.value)} className="p-2 border rounded-md text-sm w-full"/>
                        <select value={item.mode} onChange={e => handleItemChange(item.id, 'mode', e.target.value)} className="p-2 border rounded-md text-sm w-full bg-white">
                           <option>Private Cab</option><option>Coach</option><option>Metro</option><option>Ferry</option>
                        </select>
                    </div>
                 </div>
            ))}
            <button onClick={addItem} className="w-full text-center py-2 bg-gray-100 text-sm font-semibold text-[#10A4B0] rounded-md hover:bg-gray-200 transition">Add Transfer</button>
        </div>
    );
});

const MealsForm = memo(({ day, onUpdate }: { day: Day, onUpdate: (field: keyof Day, value: any) => void }) => {
    const handleItemChange = (itemId: number, field: keyof MealItem, value: any) => {
        const updatedItems = day.meals.map(item => item.id === itemId ? { ...item, [field]: value } : item);
        onUpdate('meals', updatedItems);
    };
    const addItem = () => {
        const newItem: MealItem = { id: Date.now(), type: 'Lunch', location: '', inclusions: '', mealIncluded: false };
        onUpdate('meals', [...day.meals, newItem]);
    };
    const deleteItem = (itemId: number) => {
        onUpdate('meals', day.meals.filter(item => item.id !== itemId));
    };
    return (
        <div className="space-y-6 animate-fade-in">
            {day.meals.map((item, index) => (
                <div key={item.id} className="bg-gray-50 p-4 rounded-lg border relative">
                    <button onClick={() => deleteItem(item.id)} className="absolute top-2 right-2 p-1.5 text-gray-400 hover:bg-red-100 hover:text-red-500 rounded-full"><Trash2 className="w-4 h-4" /></button>
                    <p className="font-semibold text-gray-700 mb-3 flex items-center gap-2"><Utensils className="w-4 h-4" /> Meal #{index + 1}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select value={item.type} onChange={e => handleItemChange(item.id, 'type', e.target.value)} className="p-2 border rounded-md text-sm w-full bg-white">
                           <option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Snack</option>
                        </select>
                        <input type="text" placeholder="Restaurant / Location" value={item.location} onChange={e => handleItemChange(item.id, 'location', e.target.value)} className="p-2 border rounded-md text-sm w-full"/>
                    </div>
                    <textarea placeholder="Inclusions (e.g., Set menu with soft drink)" value={item.inclusions} onChange={e => handleItemChange(item.id, 'inclusions', e.target.value)} className="w-full mt-3 p-2 border rounded-md text-sm resize-none h-20"></textarea>
                    <div className="flex items-center gap-2 mt-3">
                        <input type="checkbox" id={`meal-${item.id}`} checked={item.mealIncluded} onChange={e => handleItemChange(item.id, 'mealIncluded', e.target.checked)} className="h-4 w-4 rounded accent-[#10A4B0]"/>
                        <label htmlFor={`meal-${item.id}`} className="text-sm font-medium text-gray-700">Meal Included in Package</label>
                    </div>
                </div>
            ))}
            <button onClick={addItem} className="w-full text-center py-2 bg-gray-100 text-sm font-semibold text-[#10A4B0] rounded-md hover:bg-gray-200 transition">Add Meal</button>
        </div>
    );
});


// --- Main Component ---
const DayWiseItineraryPage: React.FC = () => {
  const [days, setDays] = useState<Day[]>([initialDay]);
  const [activeDayId, setActiveDayId] = useState<number>(initialDay.id);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeDay = days.find(d => d.id === activeDayId) || days[0];

  const handleUpdateDay = useCallback((id: number, field: keyof Day, value: any) => {
    setDays(currentDays => currentDays.map(day => day.id === id ? { ...day, [field]: value } : day));
  }, []);

  const handleAddDay = useCallback(() => {
    const lastDay = days[days.length - 1];
    const nextDayDate = new Date(lastDay.date);
    nextDayDate.setDate(nextDayDate.getDate() + 1);

    const newDay: Day = {
      id: Date.now(),
      date: nextDayDate,
      title: 'New Day Activity',
      description: 'Describe the activities for this day.',
      image: DEFAULT_IMAGES.daySummary,
      imageLayout: 'cover',
      remark: '',
      activeTab: 'Day Itinerary',
      sightseeing: [],
      transfers: [],
      meals: [],
    };
    setDays(currentDays => [...currentDays, newDay]);
    setActiveDayId(newDay.id);
  }, [days]);

  const handleDeleteDay = useCallback((idToDelete: number) => {
    if (days.length <= 1) return;
    setDays(currentDays => {
      const newDays = currentDays.filter(day => day.id !== idToDelete);
      if (activeDayId === idToDelete) {
        setActiveDayId(newDays[0]?.id || 0);
      }
      return newDays;
    });
  }, [days, activeDayId]);

  const handleImageUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      handleUpdateDay(activeDay.id, 'image', fileUrl);
    }
  }, [activeDay, handleUpdateDay]);

  const handleImageLayoutToggle = useCallback((id: number) => {
      setDays(currentDays => currentDays.map(day => day.id === id ? {...day, imageLayout: day.imageLayout === 'cover' ? 'contain' : 'cover'} : day));
  }, []);

  const handleSubmit = () => {
    console.log("Submitting Itinerary Data:", days);
    alert("Itinerary submitted successfully! Check the browser console for the complete data structure.");
  };

  const activityTabs: ActivityTab[] = ['Day Itinerary', 'Sightseeing', 'Transfers', 'Meals'];

  const renderActiveForm = () => {
      if (!activeDay) return null;
      switch(activeDay.activeTab) {
          case 'Day Itinerary':
              return <DayItineraryForm day={activeDay} onUpdate={(field: keyof Day, value: any) => handleUpdateDay(activeDay.id, field, value)} onImageUpload={handleImageUpload} fileInputRef={fileInputRef} />;
          case 'Sightseeing':
              return <SightseeingForm day={activeDay} onUpdate={(field: keyof Day, value: any) => handleUpdateDay(activeDay.id, field, value)} />;
          case 'Transfers':
              return <TransfersForm day={activeDay} onUpdate={(field: keyof Day, value: any) => handleUpdateDay(activeDay.id, field, value)} />;
          case 'Meals':
              return <MealsForm day={activeDay} onUpdate={(field: keyof Day, value: any) => handleUpdateDay(activeDay.id, field, value)} />;
          default:
              return null;
      }
  };

  return (
    <div className="bg-[#F6F6FA] min-h-screen font-sans text-[#1E1E1E]">
      <div className="max-w-screen-2xl mx-auto p-4 md:p-6 lg:p-8">
        <header className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
          <h1 className="font-semibold text-xl md:text-2xl text-[#10A4B0]">Day Wise Itinerary*</h1>
          <button onClick={() => setIsPreviewOpen(true)} className="flex items-center gap-2 bg-[#10A4B0] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-opacity">
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {days.map((day, index) => (
                <button
                  key={day.id}
                  onClick={() => setActiveDayId(day.id)}
                  className={`px-4 py-2 text-sm rounded-md font-semibold transition-colors ${activeDay.id === day.id ? 'bg-[#10A4B0] text-white shadow-sm' : 'bg-white hover:bg-gray-100 border'}`}
                >
                  Day {index + 1}
                </button>
              ))}
              <button onClick={handleAddDay} className="flex items-center gap-2 px-4 py-2 text-sm rounded-md font-semibold transition-colors bg-white hover:bg-gray-100 border text-[#10A4B0]">
                <Plus className="w-4 h-4" />
                <span>Add Day</span>
              </button>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="pb-3 mb-4 border-b border-gray-200">
                    <h2 className="font-semibold text-lg">
                        Day {days.findIndex(d => d.id === activeDay.id) + 1}: {activeDay.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </h2>
                </div>
                <div className="py-2 mb-4 border-b border-gray-200 flex flex-wrap gap-x-6 gap-y-3">
                    {activityTabs.map(tab => (
                        <div key={tab} className="flex items-center gap-2 cursor-pointer" onClick={() => handleUpdateDay(activeDay.id, 'activeTab', tab)}>
                            <div className={`w-3 h-3 rounded-full flex items-center justify-center transition-all ${activeDay.activeTab === tab ? 'bg-[#01B613]' : 'bg-gray-400'}`}>
                                {activeDay.activeTab === tab && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                            </div>
                            <span className={`text-sm font-medium ${activeDay.activeTab === tab ? 'text-black' : 'text-gray-500'}`}>{tab}</span>
                        </div>
                    ))}
                </div>
                {renderActiveForm()}
                <div className="mt-8 flex justify-center">
                    <button onClick={handleSubmit} className="bg-[#10A4B0] text-white font-semibold py-2 px-12 rounded-md hover:opacity-90 transition-opacity shadow-sm">
                        Submit
                    </button>
                </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <div className="bg-white p-4 rounded-t-lg border border-b-0 border-gray-200 shadow-sm">
                <h2 className="font-semibold text-xl text-gray-600">Save Details</h2>
              </div>
              <div className="bg-[#F6F6FA] border border-gray-200 rounded-b-lg p-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
                <MemoizedDayPreviewCard day={activeDay} onDelete={handleDeleteDay} onImageLayoutToggle={handleImageLayoutToggle}/>
              </div>
            </div>
          </div>
        </main>
      </div>

      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh]">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#10A4B0]">Complete Itinerary Preview</h2>
              <button onClick={() => setIsPreviewOpen(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)]">
              {days.map((day, index) => (
                <div key={day.id} className="mb-8 last:mb-0">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 pb-2 border-b-2 border-[#10A4B0]">
                    Day {index + 1}: {day.title} ({day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <img src={day.image} alt={day.title} className="w-full h-48 rounded-lg md:col-span-1 bg-gray-200" style={{objectFit: day.imageLayout}}/>
                    <div className="md:col-span-2">
                      <p className="text-gray-700 mb-3">{day.description}</p>
                      <div className="text-sm text-gray-600 mt-2 bg-gray-50 p-3 rounded-md prose" dangerouslySetInnerHTML={{ __html: day.remark }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <style>{`
        .quill-editor .ql-toolbar { border-top-left-radius: 0.375rem; border-top-right-radius: 0.375rem; border-color: #d1d5db; background-color: #f9fafb; }
        .quill-editor .ql-container { border-bottom-left-radius: 0.375rem; border-bottom-right-radius: 0.375rem; border-color: #d1d5db; min-height: 8rem; font-size: 0.875rem; }
        .prose { max-width: none; } .prose strong { font-weight: 600; }
        .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default DayWiseItineraryPage;



// //v2

// import React, { useState, useRef, ChangeEvent, useCallback, memo } from 'react';
// import { Eye, Bold, Italic, Link as LinkIcon, Image as ImageIcon, Trash2, ChevronDown, Plus, X, BusFront, Maximize, Minimize } from 'lucide-react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// // --- Type Definitions ---
// type ActivityTab = 'Day Itinerary' | 'Sightseeing' | 'Transfers' | 'Meals';
// type ImageLayout = 'cover' | 'contain';

// interface Day {
//   id: number;
//   date: Date;
//   title: string;
//   description: string;
//   image: string;
//   imageLayout: ImageLayout;
//   modeOfTravel: string;
//   remark: string;
//   activeTab: ActivityTab;
// }

// // --- Initial Data ---
// const initialDay: Day = {
//   id: Date.now(),
//   date: new Date('2024-02-18T00:00:00'),
//   title: 'Arrival in Singapore',
//   description: 'Welcome to Singapore! Your driver is awaiting your arrival and will transfer you to the hotel.',
//   image: 'defaultDaywiseImage',
//   imageLayout: 'cover',
//   modeOfTravel: 'Flight',
//   remark: '<p>Your first day in the vibrant city of Singapore. <strong>Get ready to explore!</strong></p>',
//   activeTab: 'Day Itinerary',
// };

// // --- Memoized Components for Performance ---
// const MemoizedDayPreviewCard = memo(({ day, onDelete, onImageLayoutToggle }: { day: Day, onDelete: (id: number) => void, onImageLayoutToggle: (id: number) => void }) => (
//     <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
//       <div className="bg-[#10A4B0] text-white p-3 rounded-t-lg flex justify-between items-center">
//         <h3 className="font-semibold text-lg">{day.activeTab}</h3>
//         <div className="flex space-x-1.5">
//           {[...Array(3)].map((_, i) => <span key={i} className="w-3 h-3 bg-white/70 rounded-full"></span>)}
//         </div>
//       </div>
//       <div className="p-4">
//         <div className="relative group mb-4">
//           <img src={day.image} alt={day.title} className={`w-full h-48 rounded-md shadow-md bg-gray-200`} style={{ objectFit: day.imageLayout }} />
//           <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
//             <button onClick={() => onImageLayoutToggle(day.id)} className="p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70">
//               {day.imageLayout === 'cover' ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
//             </button>
//           </div>
//         </div>
//         <div className="border-t border-gray-200 pt-3">
//           <h4 className="font-bold text-gray-800 text-sm mb-2">{day.title || "Your Title Here"}</h4>
//           <p className="text-gray-600 text-xs mb-4 leading-relaxed">{day.description || "Your description will appear here..."}</p>
//           <div className="border-t-2 border-dashed border-gray-300 pt-3 flex items-center gap-2">
//             <BusFront className="w-4 h-4 text-gray-600" />
//             <span className="font-semibold text-xs text-gray-800">Transfer Type: Private</span>
//           </div>
//         </div>
//       </div>
//       <div className="p-4 flex gap-2">
//         <button className="w-full bg-[#10A4B0] text-white text-sm py-1.5 rounded-md hover:bg-opacity-90 transition-colors">Edit</button>
//         <button onClick={() => onDelete(day.id)} className="p-2 bg-red-50 text-red-500 rounded-md hover:bg-red-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed">
//           <Trash2 className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
// ));

// // --- Main Component ---
// const DayWiseItineraryPage: React.FC = () => {
//   const [days, setDays] = useState<Day[]>([initialDay]);
//   const [activeDayId, setActiveDayId] = useState<number>(initialDay.id);
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const activeDay = days.find(d => d.id === activeDayId) || days[0];

//   const handleUpdateDay = useCallback((id: number, field: keyof Day, value: any) => {
//     setDays(currentDays => currentDays.map(day => day.id === id ? { ...day, [field]: value } : day));
//   }, []);

//   const handleAddDay = useCallback(() => {
//     const lastDay = days[days.length - 1];
//     const nextDayDate = new Date(lastDay.date);
//     nextDayDate.setDate(nextDayDate.getDate() + 1);

//     const newDay: Day = {
//       id: Date.now(),
//       date: nextDayDate,
//       title: 'New Day Activity',
//       description: 'Describe the activities for this day.',
//       image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=1974&auto=format&fit=crop',
//       imageLayout: 'cover',
//       modeOfTravel: 'Private Cab',
//       remark: '',
//       activeTab: 'Day Itinerary',
//     };
//     setDays(currentDays => [...currentDays, newDay]);
//     setActiveDayId(newDay.id);
//   }, [days]);

//   const handleDeleteDay = useCallback((idToDelete: number) => {
//     if (days.length <= 1) return;
//     setDays(currentDays => {
//       const newDays = currentDays.filter(day => day.id !== idToDelete);
//       if (activeDayId === idToDelete) {
//         setActiveDayId(newDays[0]?.id || 0);
//       }
//       return newDays;
//     });
//   }, [days, activeDayId]);

//   const handleImageUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const fileUrl = URL.createObjectURL(e.target.files[0]);
//       handleUpdateDay(activeDay.id, 'image', fileUrl);
//     }
//   }, [activeDay, handleUpdateDay]);

//   const handleImageLayoutToggle = useCallback((id: number) => {
//     const dayToUpdate = days.find(d => d.id === id);
//     if (dayToUpdate) {
//         handleUpdateDay(id, 'imageLayout', dayToUpdate.imageLayout === 'cover' ? 'contain' : 'cover');
//     }
// }, [days, handleUpdateDay]);


//   const handleSubmit = () => {
//     console.log("Submitting Itinerary Data:", days);
//     alert("Itinerary submitted successfully! Check the console for the data.");
//   };

//   const quillModules = {
//     toolbar: [
//       ['bold', 'italic', 'link']
//     ],
//   };

//   const activityTabs: ActivityTab[] = ['Day Itinerary', 'Sightseeing', 'Transfers', 'Meals'];

//   return (
//     <div className="bg-[#F6F6FA] min-h-screen font-sans text-[#1E1E1E]">
//       <div className="max-w-screen-2xl mx-auto p-4 md:p-6 lg:p-8">
//         <header className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
//           <h1 className="font-semibold text-xl md:text-2xl text-[#10A4B0]">Day Wise Itinerary*</h1>
//           <button onClick={() => setIsPreviewOpen(true)} className="flex items-center gap-2 bg-[#10A4B0] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-opacity">
//             <Eye className="w-4 h-4" />
//             <span>Preview</span>
//           </button>
//         </header>

//         <main className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-3 gap-8">
//           <div className="lg:col-span-3 xl:col-span-2">
//             <div className="flex items-center gap-2 mb-4 flex-wrap">
//               {days.map((day, index) => (
//                 <button
//                   key={day.id}
//                   onClick={() => setActiveDayId(day.id)}
//                   className={`px-4 py-2 text-sm rounded-md font-semibold transition-colors ${activeDay.id === day.id ? 'bg-[#10A4B0] text-white shadow-sm' : 'bg-white hover:bg-gray-100 border'}`}
//                 >
//                   Day {index + 1}
//                 </button>
//               ))}
//               <button onClick={handleAddDay} className="flex items-center gap-2 px-4 py-2 text-sm rounded-md font-semibold transition-colors bg-white hover:bg-gray-100 border text-[#10A4B0]">
//                 <Plus className="w-4 h-4" />
//                 <span>Add Day</span>
//               </button>
//             </div>
            
//             <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
//                 <div className="pb-3 mb-4 border-b border-gray-200">
//                     <h2 className="font-semibold text-lg">
//                         Day {days.findIndex(d => d.id === activeDay.id) + 1}: {activeDay.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
//                     </h2>
//                 </div>
//                 <div className="py-2 mb-4 border-b border-gray-200 flex flex-wrap gap-x-6 gap-y-3">
//                     {activityTabs.map(tab => (
//                         <div key={tab} className="flex items-center gap-2 cursor-pointer" onClick={() => handleUpdateDay(activeDay.id, 'activeTab', tab)}>
//                             <div className={`w-3 h-3 rounded-full flex items-center justify-center transition-all ${activeDay.activeTab === tab ? 'bg-[#01B613]' : 'bg-gray-400'}`}>
//                                 {activeDay.activeTab === tab && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
//                             </div>
//                             <span className={`text-sm font-medium ${activeDay.activeTab === tab ? 'text-black' : 'text-gray-500'}`}>{tab}</span>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="space-y-6">
//                     <div>
//                         <label className="text-xs font-medium text-gray-500">Search Day Itinerary from the database</label>
//                         <input
//                             type="text"
//                             placeholder="Enter Paragraph Title (e.g., Food Tour)"
//                             value={activeDay.title}
//                             onChange={(e) => handleUpdateDay(activeDay.id, 'title', e.target.value)}
//                             className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#10A4B0] focus:border-[#10A4B0] transition"
//                         />
//                     </div>
//                     <div className="flex flex-col sm:flex-row gap-4">
//                         <div className="flex-shrink-0 w-full sm:w-48 h-40 bg-gray-200 rounded-md relative cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
//                             <img src={activeDay.image} alt="Itinerary" className="w-full h-full object-cover rounded-md" />
//                             <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all">
//                                 <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
//                             </div>
//                         </div>
//                         <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
//                         <textarea
//                             placeholder="Enter a description for the day's activity..."
//                             value={activeDay.description}
//                             onChange={(e) => handleUpdateDay(activeDay.id, 'description', e.target.value)}
//                             className="w-full h-40 p-2 border border-gray-300 rounded-md text-sm resize-none focus:ring-1 focus:ring-[#10A4B0] focus:border-[#10A4B0] transition"
//                         ></textarea>
//                     </div>
//                     <div>
//                         <label className="text-sm font-medium">Mode of Travel</label>
//                         <div className="relative mt-1">
//                             <select
//                                 value={activeDay.modeOfTravel}
//                                 onChange={(e) => handleUpdateDay(activeDay.id, 'modeOfTravel', e.target.value)}
//                                 className="w-full p-2.5 pr-8 border bg-gray-50 border-gray-300 rounded-md text-sm appearance-none focus:ring-1 focus:ring-[#10A4B0] focus:border-[#10A4B0] transition"
//                             >
//                                 <option>Flight</option>
//                                 <option>Train</option>
//                                 <option>Private Cab</option>
//                                 <option>Bus</option>
//                             </select>
//                             <ChevronDown className="w-4 h-4 text-gray-500 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" />
//                         </div>
//                     </div>
//                     <div>
//                         <label className="text-sm font-medium mb-1 block">Add Image & Remark</label>
//                         <div className="border border-gray-300 rounded-md">
//                             <ReactQuill
//                                 value={activeDay.remark}
//                                 onChange={(value) => handleUpdateDay(activeDay.id, 'remark', value)}
//                                 modules={quillModules}
//                                 theme="snow"
//                                 className="quill-editor"
//                             />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="mt-8 flex justify-center">
//                     <button onClick={handleSubmit} className="bg-[#10A4B0] text-white font-semibold py-2 px-12 rounded-md hover:opacity-90 transition-opacity shadow-sm">
//                         Submit
//                     </button>
//                 </div>
//             </div>
//           </div>

//           <div className="lg:col-span-2 xl:col-span-1">
//             <div className="sticky top-8">
//               <div className="bg-white p-4 rounded-t-lg border border-b-0 border-gray-200 shadow-sm">
//                 <h2 className="font-semibold text-xl text-gray-600">Save Details</h2>
//               </div>
//               <div className="bg-[#F6F6FA] border border-gray-200 rounded-b-lg p-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
//                 <MemoizedDayPreviewCard day={activeDay} onDelete={handleDeleteDay} onImageLayoutToggle={handleImageLayoutToggle}/>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>

//       {isPreviewOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh]">
//             <div className="p-4 border-b flex justify-between items-center">
//               <h2 className="text-2xl font-bold text-[#10A4B0]">Complete Itinerary Preview</h2>
//               <button onClick={() => setIsPreviewOpen(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
//                 <X className="w-6 h-6 text-gray-600" />
//               </button>
//             </div>
//             <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)]">
//               {days.map((day, index) => (
//                 <div key={day.id} className="mb-8 last:mb-0">
//                   <h3 className="text-xl font-semibold text-gray-800 mb-3 pb-2 border-b-2 border-[#10A4B0]">
//                     Day {index + 1}: {day.title} ({day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })})
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <img src={day.image} alt={day.title} className="w-full h-48 rounded-lg md:col-span-1 bg-gray-200" style={{objectFit: day.imageLayout}}/>
//                     <div className="md:col-span-2">
//                       <p className="text-gray-700 mb-3">{day.description}</p>
//                       <p className="text-sm text-gray-600"><strong className="font-semibold text-gray-800">Travel Mode:</strong> {day.modeOfTravel}</p>
//                       <div className="text-sm text-gray-600 mt-2 bg-gray-50 p-3 rounded-md prose" dangerouslySetInnerHTML={{ __html: day.remark }} />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//       <style>{`
//         .quill-editor .ql-toolbar {
//           border-top-left-radius: 0.375rem;
//           border-top-right-radius: 0.375rem;
//           border-color: #d1d5db;
//           background-color: #f9fafb;
//         }
//         .quill-editor .ql-container {
//           border-bottom-left-radius: 0.375rem;
//           border-bottom-right-radius: 0.375rem;
//           border-color: #d1d5db;
//           height: 8rem;
//           font-size: 0.875rem;
//         }
//         .prose { max-width: none; }
//       `}</style>
//     </div>
//   );
// };

// export default DayWiseItineraryPage;









