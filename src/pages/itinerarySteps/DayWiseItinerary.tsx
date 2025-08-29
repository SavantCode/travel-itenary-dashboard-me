import React, { useState, useRef, ChangeEvent, useCallback, memo, FC, useEffect } from 'react';
import { Eye, Image as ImageIcon, Trash2, Plus, X, BusFront, Maximize, Minimize, Car, Utensils, MapPin, Loader2 } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { uploadImageToCloudinary } from '../../utils/cloudinary';

// --- Reusable Default Image Configuration ---
const DEFAULT_IMAGES = {
  daySummary: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=1974&auto=format&fit=crop',
  sightseeing: 'https://images.unsplash.com/photo-1502602898657-3e91760c0337?q=80&w=2070&auto=format&fit=crop',
  meal: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop',
};

// --- TYPE DEFINITIONS ---
type ActivityTab = 'Day Itinerary' | 'Sightseeing' | 'Transfers' | 'Meals';
type ImageLayout = 'cover' | 'contain';
interface SightseeingItem { id: number; name: string; time: string; image: string; imageLayout: ImageLayout; description: string; ticketsIncluded: boolean; }
interface TransferItem { id: number; from: string; to: string; mode: string; pickupTime: string; }
interface MealItem { id: number; type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'; location: string; image: string; inclusions: string; mealIncluded: boolean; }
interface Day { id: number; date: Date; title: string; description: string; image: string; imageLayout: ImageLayout; remark: string; sightseeing: SightseeingItem[]; transfers: TransferItem[]; meals: MealItem[]; activeTab: ActivityTab; }

// --- INITIAL DATA (Used as a fallback) ---
const initialDay: Day = { id: Date.now(), date: new Date(), title: 'Your First Day', description: 'Describe the plan for the first day.', image: DEFAULT_IMAGES.daySummary, imageLayout: 'cover', remark: '<p>Start your amazing journey here!</p>', activeTab: 'Day Itinerary', sightseeing: [], transfers: [], meals: [] };

// --- MEMOIZED COMPONENTS FOR PERFORMANCE ---
const MemoizedDayPreviewCard: FC<{ day: Day; onDelete: (id: number) => void; onImageLayoutToggle: (id: number) => void; isDeleteDisabled: boolean }> = memo(({ day, onDelete, onImageLayoutToggle, isDeleteDisabled }) => (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="bg-[#10A4B0] text-white p-3 rounded-t-lg flex justify-between items-center"><h3 className="font-semibold text-lg">{day.activeTab}</h3><div className="flex space-x-1.5">{[...Array(3)].map((_, i) => <span key={i} className="w-3 h-3 bg-white/70 rounded-full"></span>)}</div></div>
      <div className="p-4">
        <div className="relative group mb-4">
          <img src={day.image} alt={day.title} className={`w-full h-48 rounded-md shadow-md bg-gray-200`} style={{ objectFit: day.imageLayout }} />
          <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => onImageLayoutToggle(day.id)} className="p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70">{day.imageLayout === 'cover' ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}</button></div>
        </div>
        <div className="border-t border-gray-200 pt-3"><h4 className="font-bold text-gray-800 text-sm mb-2">{day.title || "Your Title Here"}</h4><p className="text-gray-600 text-xs mb-4 leading-relaxed">{day.description || "Your description will appear here..."}</p><div className="border-t-2 border-dashed border-gray-300 pt-3 flex items-center gap-2"><BusFront className="w-4 h-4 text-gray-600" /><span className="font-semibold text-xs text-gray-800">Transfer Type: Private</span></div></div>
      </div>
      <div className="p-4 flex gap-2"><button className="w-full bg-[#10A4B0] text-white text-sm py-1.5 rounded-md hover:bg-opacity-90 transition-colors">Edit</button><button onClick={() => onDelete(day.id)} disabled={isDeleteDisabled} className="p-2 bg-red-50 text-red-500 rounded-md hover:bg-red-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"><Trash2 className="w-4 h-4" /></button></div>
    </div>
));

const DayItineraryForm: FC<{ day: Day; onUpdate: (field: keyof Day, value: any) => void; onImageUpload: (e: ChangeEvent<HTMLInputElement>) => void; fileInputRef: React.RefObject<HTMLInputElement>; isUploading: boolean }> = memo(({ day, onUpdate, onImageUpload, fileInputRef, isUploading }) => (
    <div className="space-y-6 animate-fade-in">
        <div><label className="text-xs font-medium text-gray-500">Main Title for the Day</label><input type="text" placeholder="e.g., Arrival & City Exploration" value={day.title} onChange={(e) => onUpdate('title', e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#10A4B0] focus:border-[#10A4B0] transition" /></div>
        <div className="flex flex-col sm:flex-row gap-4">
            <div className={`flex-shrink-0 w-full sm:w-48 h-40 bg-gray-200 rounded-md relative group ${isUploading ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => !isUploading && fileInputRef.current?.click()}>
                <img src={day.image} alt="Itinerary" className="w-full h-full object-cover rounded-md" />
                <div className={`absolute inset-0 bg-black flex items-center justify-center transition-all ${isUploading ? 'bg-opacity-60' : 'bg-opacity-0 group-hover:bg-opacity-40'}`}>
                    {isUploading ? <Loader2 className="w-8 h-8 text-white animate-spin" /> : <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />}
                </div>
            </div>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={onImageUpload} className="hidden" disabled={isUploading} />
            <textarea placeholder="Enter a summary for the day's activities..." value={day.description} onChange={(e) => onUpdate('description', e.target.value)} className="w-full h-40 p-2 border border-gray-300 rounded-md text-sm resize-none focus:ring-1 focus:ring-[#10A4B0] focus:border-[#10A4B0] transition"></textarea>
        </div>
        <div><label className="text-sm font-medium mb-1 block">Day's Remark / Overview</label><ReactQuill value={day.remark} onChange={(value) => onUpdate('remark', value)} modules={{ toolbar: [['bold', 'italic', 'link']] }} theme="snow" className="quill-editor" /></div>
    </div>
));

const SightseeingForm: FC<{ day: Day; onUpdate: (field: keyof Day, value: any) => void; onImageUpload: (e: ChangeEvent<HTMLInputElement>, itemId: number) => void; uploadingIds: Set<number>; }> = memo(({ day, onUpdate, onImageUpload, uploadingIds }) => {
    const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
    const handleItemChange = (itemId: number, field: keyof SightseeingItem, value: any) => { onUpdate('sightseeing', day.sightseeing.map((item: SightseeingItem) => item.id === itemId ? { ...item, [field]: value } : item)); };
    const addItem = () => { onUpdate('sightseeing', [...day.sightseeing, { id: Date.now(), name: '', time: '', image: DEFAULT_IMAGES.sightseeing, imageLayout: 'cover', description: '', ticketsIncluded: false }]); };
    const deleteItem = (itemId: number) => { onUpdate('sightseeing', day.sightseeing.filter((item: SightseeingItem) => item.id !== itemId)); };
    return (
        <div className="space-y-6 animate-fade-in">{day.sightseeing.map((item: SightseeingItem, index: number) => {
            const isUploading = uploadingIds.has(item.id);
            return (
            <div key={item.id} className="bg-gray-50 p-4 rounded-lg border relative">
                <button onClick={() => deleteItem(item.id)} className="absolute top-3 right-3 p-1.5 text-gray-400 hover:bg-red-100 hover:text-red-500 rounded-full transition-colors"><Trash2 className="w-4 h-4" /></button>
                <p className="font-semibold text-gray-700 mb-3">Sightseeing Spot #{index + 1}</p>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className={`flex-shrink-0 w-full md:w-40 h-28 bg-gray-200 rounded-md relative group ${isUploading ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => !isUploading && fileInputRefs.current[item.id]?.click()}>
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
                        <div className={`absolute inset-0 bg-black flex items-center justify-center transition-all ${isUploading ? 'bg-opacity-60' : 'bg-opacity-0 group-hover:bg-opacity-40'}`}>
                           {isUploading ? <Loader2 className="w-6 h-6 text-white animate-spin" /> : <ImageIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100" />}
                        </div>
                    </div>
                    <input type="file" accept="image/*" ref={el => fileInputRefs.current[item.id] = el} onChange={(e) => onImageUpload(e, item.id)} className="hidden" disabled={isUploading} />
                    <div className="flex-grow space-y-3"><input type="text" placeholder="Activity Name (e.g., Gardens by the Bay)" value={item.name} onChange={e => handleItemChange(item.id, 'name', e.target.value)} className="p-2 border rounded-md text-sm w-full" /><input type="text" placeholder="Time Slot (e.g., 10 AM - 1 PM)" value={item.time} onChange={e => handleItemChange(item.id, 'time', e.target.value)} className="p-2 border rounded-md text-sm w-full" /></div>
                </div>
                <textarea placeholder="Description..." value={item.description} onChange={e => handleItemChange(item.id, 'description', e.target.value)} className="w-full mt-3 p-2 border rounded-md text-sm resize-none h-20"></textarea>
                <div className="flex items-center gap-2 mt-3"><input type="checkbox" id={`ticket-${item.id}`} checked={item.ticketsIncluded} onChange={e => handleItemChange(item.id, 'ticketsIncluded', e.target.checked)} className="h-4 w-4 rounded accent-[#10A4B0]" /><label htmlFor={`ticket-${item.id}`} className="text-sm font-medium text-gray-700">Tickets Included</label></div>
            </div>
        )})}
        <button onClick={addItem} className="w-full text-center py-2 bg-gray-100 text-sm font-semibold text-[#10A4B0] rounded-md hover:bg-gray-200 transition">Add Sightseeing Spot</button>
    </div>
    );
});

const TransfersForm: FC<{ day: Day; onUpdate: (field: keyof Day, value: any) => void }> = memo(({ day, onUpdate }) => {
    const handleItemChange = (itemId: number, field: keyof TransferItem, value: any) => { onUpdate('transfers', day.transfers.map(item => item.id === itemId ? { ...item, [field]: value } : item)); };
    const addItem = () => { onUpdate('transfers', [...day.transfers, { id: Date.now(), from: '', to: '', mode: 'Private Cab', pickupTime: '' }]); };
    const deleteItem = (itemId: number) => { onUpdate('transfers', day.transfers.filter(item => item.id !== itemId)); };
    return (
        <div className="space-y-6 animate-fade-in">{day.transfers.map((item, index) => (
            <div key={item.id} className="bg-gray-50 p-4 rounded-lg border relative">
                <button onClick={() => deleteItem(item.id)} className="absolute top-3 right-3 p-1.5 text-gray-400 hover:bg-red-100 hover:text-red-500 rounded-full"><Trash2 className="w-4 h-4" /></button>
                <p className="font-semibold text-gray-700 mb-3 flex items-center gap-2"><Car className="w-4 h-4" /> Transfer #{index + 1}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="From Location" value={item.from} onChange={e => handleItemChange(item.id, 'from', e.target.value)} className="p-2 border rounded-md text-sm w-full" />
                    <input type="text" placeholder="To Location" value={item.to} onChange={e => handleItemChange(item.id, 'to', e.target.value)} className="p-2 border rounded-md text-sm w-full" />
                    <input type="text" placeholder="Pickup Time (e.g., 9:00 AM)" value={item.pickupTime} onChange={e => handleItemChange(item.id, 'pickupTime', e.target.value)} className="p-2 border rounded-md text-sm w-full" />
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

const MealsForm: FC<{ day: Day; onUpdate: (field: keyof Day, value: any) => void; onImageUpload: (e: ChangeEvent<HTMLInputElement>, itemId: number) => void; uploadingIds: Set<number>; }> = memo(({ day, onUpdate, onImageUpload, uploadingIds }) => {
    const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
    const handleItemChange = (itemId: number, field: keyof MealItem, value: any) => { onUpdate('meals', day.meals.map(item => item.id === itemId ? { ...item, [field]: value } : item)); };
    const addItem = () => { onUpdate('meals', [...day.meals, { id: Date.now(), type: 'Lunch', location: '', image: DEFAULT_IMAGES.meal, inclusions: '', mealIncluded: false }]); };
    const deleteItem = (itemId: number) => { onUpdate('meals', day.meals.filter(item => item.id !== itemId)); };
    return (
        <div className="space-y-6 animate-fade-in">{day.meals.map((item, index) => {
            const isUploading = uploadingIds.has(item.id);
            return (
            <div key={item.id} className="bg-gray-50 p-4 rounded-lg border relative">
                <button onClick={() => deleteItem(item.id)} className="absolute top-3 right-3 p-1.5 text-gray-400 hover:bg-red-100 hover:text-red-500 rounded-full"><Trash2 className="w-4 h-4" /></button>
                <p className="font-semibold text-gray-700 mb-3 flex items-center gap-2"><Utensils className="w-4 h-4" /> Meal #{index + 1}</p>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className={`flex-shrink-0 w-full md:w-40 h-28 bg-gray-200 rounded-md relative group ${isUploading ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => !isUploading && fileInputRefs.current[item.id]?.click()}>
                        <img src={item.image} alt={item.location} className="w-full h-full object-cover rounded-md" />
                        <div className={`absolute inset-0 bg-black flex items-center justify-center transition-all ${isUploading ? 'bg-opacity-60' : 'bg-opacity-0 group-hover:bg-opacity-40'}`}>
                           {isUploading ? <Loader2 className="w-6 h-6 text-white animate-spin" /> : <ImageIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100" />}
                        </div>
                    </div>
                    <input type="file" accept="image/*" ref={el => fileInputRefs.current[item.id] = el} onChange={(e) => onImageUpload(e, item.id)} className="hidden" disabled={isUploading} />
                    <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-3"><select value={item.type} onChange={e => handleItemChange(item.id, 'type', e.target.value as any)} className="p-2 border rounded-md text-sm w-full bg-white h-fit"><option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Snack</option></select><input type="text" placeholder="Restaurant / Location" value={item.location} onChange={e => handleItemChange(item.id, 'location', e.target.value)} className="p-2 border rounded-md text-sm w-full h-fit" /><textarea placeholder="Inclusions (e.g., Set menu)" value={item.inclusions} onChange={e => handleItemChange(item.id, 'inclusions', e.target.value)} className="sm:col-span-2 p-2 border rounded-md text-sm w-full resize-none h-14"></textarea></div>
                </div>
                <div className="flex items-center gap-2 mt-3"><input type="checkbox" id={`meal-${item.id}`} checked={item.mealIncluded} onChange={e => handleItemChange(item.id, 'mealIncluded', e.target.checked)} className="h-4 w-4 rounded accent-[#10A4B0]" /><label htmlFor={`meal-${item.id}`} className="text-sm font-medium text-gray-700">Meal Included in Package</label></div>
            </div>
        )})}
        <button onClick={addItem} className="w-full text-center py-2 bg-gray-100 text-sm font-semibold text-[#10A4B0] rounded-md hover:bg-gray-200 transition">Add Meal</button>
    </div>
    );
});

// --- Main Page Component ---
const DayWiseItineraryPage: React.FC = () => {
  const [days, setDays] = useState<Day[]>([]);
  const [activeDayId, setActiveDayId] = useState<number | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [uploadingIds, setUploadingIds] = useState<Set<number>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const transformApiDataToState = (apiData: any): Day[] => {
        if (!apiData || !apiData.itinerary || apiData.itinerary.length === 0) {
            return [initialDay];
        }
        const startDate = new Date(apiData.startDate);
        return apiData.itinerary.map((apiDay: any, index: number) => {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + index);
            const sightseeingItems: SightseeingItem[] = apiDay.activities.map((activity: any, activityIndex: number) => ({ id: Date.now() + index * 1000 + activityIndex, name: activity.activity || 'Unnamed Activity', time: activity.time || 'N/A', image: activity.image || DEFAULT_IMAGES.sightseeing, imageLayout: 'cover' as ImageLayout, description: activity.details || '', ticketsIncluded: false, }));
            return { id: Date.now() + index, date: currentDate, title: apiDay.title || `Day ${apiDay.day}`, description: apiDay.summary || '', image: apiDay.activities[0]?.image || DEFAULT_IMAGES.daySummary, imageLayout: 'cover' as ImageLayout, remark: '', activeTab: 'Day Itinerary' as ActivityTab, sightseeing: sightseeingItems, transfers: [], meals: [], };
        });
    };
    try {
        const storedItineraryJSON = sessionStorage.getItem('generatedItinerary');
        if (storedItineraryJSON) {
            const apiData = JSON.parse(storedItineraryJSON);
            const initialState = transformApiDataToState(apiData);
            setDays(initialState);
            if (initialState.length > 0) {
                setActiveDayId(initialState[0].id);
            }
        } else {
            setDays([initialDay]);
            setActiveDayId(initialDay.id);
        }
    } catch (error) {
        console.error("Failed to parse itinerary from session storage:", error);
        setDays([initialDay]);
        setActiveDayId(initialDay.id);
    }
  }, []);

  const activeDay = days.find(d => d.id === activeDayId);
  const handleUpdateDay = useCallback((id: number, field: keyof Day, value: any) => { setDays(currentDays => currentDays.map(day => day.id === id ? { ...day, [field]: value } : day)); }, []);
  const handleAddDay = useCallback(() => { const lastDay = days[days.length - 1]; const nextDayDate = new Date(lastDay.date); nextDayDate.setDate(nextDayDate.getDate() + 1); const newDay: Day = { id: Date.now(), date: nextDayDate, title: 'New Day Activity', description: 'Describe the activities for this day.', image: DEFAULT_IMAGES.daySummary, imageLayout: 'cover', remark: '', activeTab: 'Day Itinerary', sightseeing: [], transfers: [], meals: [], }; setDays(currentDays => [...currentDays, newDay]); setActiveDayId(newDay.id); }, [days]);
  const handleDeleteDay = useCallback((idToDelete: number) => { if (days.length <= 1) return; setDays(currentDays => { const newDays = currentDays.filter(day => day.id !== idToDelete); if (activeDayId === idToDelete) { setActiveDayId(newDays[0]?.id || null); } return newDays; }); }, [days, activeDayId]);
  const handleImageLayoutToggle = useCallback((id: number) => { setDays(currentDays => currentDays.map(day => day.id === id ? {...day, imageLayout: day.imageLayout === 'cover' ? 'contain' : 'cover'} : day)); }, []);

  const createUploadHandler = useCallback(async ( e: ChangeEvent<HTMLInputElement>, id: number, updateFn: (id: number, imageUrl: string) => void ) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploadingIds(prev => new Set(prev).add(id));
    const imageUrl = await uploadImageToCloudinary(file);
    setUploadingIds(prev => { const newSet = new Set(prev); newSet.delete(id); return newSet; });
    if (imageUrl) { updateFn(id, imageUrl); }
  }, []);

  const handleDayImageUpload = (e: ChangeEvent<HTMLInputElement>) => { if (activeDay) createUploadHandler(e, activeDay.id, (_, url) => handleUpdateDay(activeDay.id, 'image', url)); };
  const handleSightseeingImageUpload = (e: ChangeEvent<HTMLInputElement>, itemId: number) => { if (activeDay) { createUploadHandler(e, itemId, (id, url) => { const updatedSightseeing = activeDay.sightseeing.map(item => item.id === id ? { ...item, image: url } : item); handleUpdateDay(activeDay.id, 'sightseeing', updatedSightseeing); }); } };
  const handleMealImageUpload = (e: ChangeEvent<HTMLInputElement>, itemId: number) => { if (activeDay) { createUploadHandler(e, itemId, (id, url) => { const updatedMeals = activeDay.meals.map(item => item.id === id ? { ...item, image: url } : item); handleUpdateDay(activeDay.id, 'meals', updatedMeals); }); } };
  
  const handleSave = () => { try { sessionStorage.setItem('editedItinerary', JSON.stringify(days)); alert("Itinerary saved!"); } catch (error) { console.error("Failed to save:", error); alert("Error saving."); } };

  const activityTabs: ActivityTab[] = ['Day Itinerary', 'Sightseeing', 'Transfers', 'Meals'];

  // FIXED: This function is modified to pass a correctly-scoped update handler to child components, resolving the type errors.
  const renderActiveForm = () => {
      if (!activeDay) return <div className="text-center p-10 text-gray-500">Please select a day to edit.</div>;

      // This new handler has the correct (field, value) signature expected by child components.
      const onActiveDayUpdate = (field: keyof Day, value: any) => {
        handleUpdateDay(activeDay.id, field, value);
      };

      switch(activeDay.activeTab) {
          case 'Day Itinerary': return <DayItineraryForm day={activeDay} onUpdate={onActiveDayUpdate} onImageUpload={handleDayImageUpload} fileInputRef={fileInputRef} isUploading={uploadingIds.has(activeDay.id)} />;
          case 'Sightseeing': return <SightseeingForm day={activeDay} onUpdate={onActiveDayUpdate} onImageUpload={handleSightseeingImageUpload} uploadingIds={uploadingIds} />;
          case 'Transfers': return <TransfersForm day={activeDay} onUpdate={onActiveDayUpdate} />;
          case 'Meals': return <MealsForm day={activeDay} onUpdate={onActiveDayUpdate} onImageUpload={handleMealImageUpload} uploadingIds={uploadingIds} />;
          default: return null;
      }
  };

  if (days.length === 0) { return <div className="flex items-center justify-center min-h-screen">Loading Itinerary...</div> }

  return (
    <div className="bg-[#F6F6FA] min-h-screen font-raleway text-[#1E1E1E]">
      <div className="w-full mx-auto px-1 sm:px-6 lg:px-2 py-2">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-[#10A4B0] font-raleway">Day Wise Itinerary</h1>
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex items-center space-x-2 text-xs text-[#727171] cursor-pointer"><MapPin className="w-4 h-4" /><span className="font-raleway font-medium">Define Your route</span></div>
            <button onClick={() => setIsPreviewOpen(true)} className="flex items-center space-x-2 bg-[#10A4B0] text-white px-3 py-1 rounded-full text-xs font-inter font-medium"><Eye className="w-4 h-4" /><span>Preview</span></button>
          </div>
        </header>

        <main className="flex flex-col xl:flex-row gap-8 items-start">
          <div className="w-full xl:flex-[2] order-2 xl:order-1 space-y-6">
            {activeDay && (
              <div className="bg-white p-4 sm:p-6 rounded-lg border border-[#E0E0E0] shadow-sm">
                  <div className="pb-3 mb-4 border-b border-gray-200"><h2 className="font-semibold text-lg ">Day {days.findIndex(d => d.id === activeDay.id) + 1}: {activeDay.date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</h2></div>
                      <div className="flex items-center gap-2 pb-4 flex-wrap border-b border-gray-200">
                            {days.map((day, index) => ( <button key={day.id} onClick={() => setActiveDayId(day.id)} className={`px-4 py-2 text-sm rounded-md font-semibold transition-colors ${activeDay?.id === day.id ? 'bg-[#10A4B0] text-white shadow-sm' : 'bg-white hover:bg-gray-100 border'}`}>Day {index + 1}</button> ))}
                            <button onClick={handleAddDay} className="flex items-center gap-2 px-4 py-2 text-sm rounded-md font-semibold transition-colors bg-white hover:bg-gray-100 border text-[#10A4B0]"><Plus className="w-4 h-4" /><span>Add Day</span></button>
                          </div>
                  <div className="py-2 mb-4 border-b border-gray-200 flex flex-wrap gap-x-6 gap-y-3">
                      {activityTabs.map(tab => (
                          <div key={tab} className="flex items-center gap-2 cursor-pointer" onClick={() => handleUpdateDay(activeDay.id, 'activeTab', tab)}>
                              <div className={`w-3 h-3 rounded-full flex items-center justify-center transition-all ${activeDay.activeTab === tab ? 'bg-[#01B613]' : 'bg-gray-400'}`}>{activeDay.activeTab === tab && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}</div>
                              <span className={`text-sm font-medium ${activeDay.activeTab === tab ? 'text-black' : 'text-gray-500'}`}>{tab}</span>
                          </div>
                      ))}
                  </div>
                  {renderActiveForm()}
                  <div className="mt-8 flex justify-center"><button onClick={handleSave} className="bg-[#10A4B0] text-white font-raleway font-medium text-sm px-10 py-2 rounded-md hover:bg-opacity-90 transition-colors">Save Itinerary</button></div>
              </div>
            )}
          </div>
          <div className="w-full xl:flex-[1] order-1 xl:order-2 xl:sticky xl:top-8">
            <div className="bg-white p-4 rounded-lg border border-[#E0E0E0]">
              <h2 className="text-xl font-semibold text-[#717182] font-raleway mb-4">Live Preview</h2>
              {activeDay && <MemoizedDayPreviewCard day={activeDay} onDelete={handleDeleteDay} onImageLayoutToggle={handleImageLayoutToggle} isDeleteDisabled={days.length <= 1} />}
            </div>
          </div>
        </main>
      </div>

      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh]">
            <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-bold text-[#10A4B0]">Complete Itinerary Preview</h2>
              <button onClick={() => setIsPreviewOpen(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors"><X className="w-6 h-6 text-gray-600" /></button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)]">
              {days.map((day, index) => (
                <div key={day.id} className="mb-8 last:mb-0">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 pb-2 border-b-2 border-[#10A4B0]">Day {index + 1}: {day.title} ({day.date.toLocaleString('en-US', { month: 'short', day: 'numeric' })})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <img src={day.image} alt={day.title} className="w-full h-48 rounded-lg md:col-span-1 bg-gray-200" style={{objectFit: day.imageLayout}}/>
                    <div className="md:col-span-2"><p className="text-gray-700 mb-3">{day.description}</p><div className="text-sm text-gray-600 mt-2 bg-gray-50 p-3 rounded-md prose" dangerouslySetInnerHTML={{ __html: day.remark }} /></div>
                  </div>
                  {day.sightseeing.length > 0 && <div className="mt-4"><h4 className="font-semibold text-lg text-gray-700 mb-2">Sightseeing</h4><div className="space-y-4">{day.sightseeing.map(item => (<div key={item.id} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg"><img src={item.image} alt={item.name} className="w-24 h-20 object-cover rounded-md flex-shrink-0" /><div><p className="font-semibold">{item.name}</p><p className="text-xs text-gray-500">{item.time}</p><p className="text-sm mt-1">{item.description}</p>{item.ticketsIncluded && <p className="text-xs font-bold text-green-600 mt-1">✓ Tickets Included</p>}</div></div>))}</div></div>}
                  {day.transfers.length > 0 && <div className="mt-4"><h4 className="font-semibold text-lg text-gray-700 mb-2">Transfers</h4><div className="space-y-2">{day.transfers.map(item => (<div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg text-sm"><Car className="w-5 h-5 text-[#10A4B0] flex-shrink-0"/><p><span className="font-semibold">{item.from}</span> to <span className="font-semibold">{item.to}</span> via {item.mode} at {item.pickupTime}</p></div>))}</div></div>}
                  {day.meals.length > 0 && <div className="mt-4"><h4 className="font-semibold text-lg text-gray-700 mb-2">Meals</h4><div className="space-y-4">{day.meals.map(item => (<div key={item.id} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg"><img src={item.image} alt={item.location} className="w-24 h-20 object-cover rounded-md flex-shrink-0" /><div><p><span className="font-semibold">{item.type}</span> at <span className="font-semibold">{item.location}</span></p><p className="text-sm mt-1">{item.inclusions}</p>{item.mealIncluded && <p className="text-xs font-bold text-green-600 mt-1">✓ Meal Included</p>}</div></div>))}</div></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <style>{`
        .quill-editor .ql-toolbar { border-top-left-radius: 0.375rem; border-top-right-radius: 0.375rem; border-color: #d1d5db; background-color: #f9fafb; }
        .quill-editor .ql-container { border-bottom-left-radius: 0.375rem; border-bottom-right-radius: 0.375rem; border-color: #d1d5db; min-height: 8rem; font-size: 0.875rem; }
        .prose { max-width: none; } .prose p { margin: 0; } .prose strong { font-weight: 600; }
        .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default DayWiseItineraryPage;