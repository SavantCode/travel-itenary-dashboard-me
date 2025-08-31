// src/components/ViewFInal/ViewFInal.tsx

import React, { useState, useEffect, useMemo } from 'react';
import {
  MapPin, Phone, Plane, Car, Camera, BedDouble, Sun, Moon, Users, CalendarDays, Wallet,
  Save, Loader, AlertCircle, CheckCircle, Utensils, ShieldCheck, Banknote, Star, Ticket, Clock
} from 'lucide-react';
import { saveItinerary } from '../../api/itinerary_api';

//================================================================//
// 1. TYPE DEFINITIONS
//================================================================//
interface DayPlan {
  id: string | number;
  day: number;
  date: string;
  title: string;
  description: string;
  image: string;
  sightseeing: { name: string; description: string; image: string; time: string; ticketsIncluded: boolean }[];
  meals: { type: string; location: string; mealIncluded: boolean }[];
  transfers: { from: string; to: string; mode: string; pickupTime: string }[];
}
interface Flight {
  modeOfTravel: string; date: string; airline: string; flightNo: string; fromCity: string; toCity: string; airport: string; time: string;
}
interface AccommodationBooking {
  hotelName: string; city: string; checkIn: string; checkOut: string; nights: number; rooms: number; image: string;
  rating: number; amenities: string[]; roomDetails: { roomType: string; mealType: string }[]; remark: string;
}
interface VehicleBooking {
  id: string; vehicleType: string; driveType: string; numVehicles: number; pickUpDate: string; pickUpLocation: string;
  dropOffDate: string; dropOffLocation: string; remark: string;
}
interface PriceDetail { paxType: string; count: number; costPerPerson: number; totalCost: number; }
interface PricingInfo {
  packageName: string; pax: PriceDetail[]; totalPackageCost: number;
}
interface TripInfoSection { title: string; content: string; }
interface PaymentDetails {
  terms: string; methods: string; bankDetails: { bankName: string; accountNumber: string; ifscCode: string; };
}
interface ItineraryData {
  tripTitle: string; tripImage: string; tripDescription: string;
  paxCount: number; duration: { days: number, nights: number }; destinations: string[];
  dayByDayItinerary: DayPlan[];
  allFlights: Flight[];
  allAccommodations: AccommodationBooking[];
  allVehicles: VehicleBooking[];
  pricing?: PricingInfo;
  tripInfoSections: TripInfoSection[];
  paymentDetails?: PaymentDetails;
  contactInfo: { companyName: string; email: string; phone: string; website: string; };
}

//================================================================//
// 2. HELPER & UI COMPONENTS
//================================================================//
const SectionWrapper: React.FC<{ id: string; title: string; children: React.ReactNode; icon: React.ElementType }> = ({ id, title, children, icon: Icon }) => (
  <section id={id} className="py-10 animate-fade-in">
    <div className="flex items-center gap-4 mb-6">
      <div className="bg-[#10A4B0] text-white p-3 rounded-lg shadow-md"><Icon size={24} /></div>
      <h2 className="text-2xl md:text-3xl font-bold font-raleway text-gray-800">{title}</h2>
    </div>
    <div className="pl-4 border-l-4 border-[#10A4B0]/30">{children}</div>
  </section>
);

const InfoCard: React.FC<{ icon: React.ElementType; label: string; value: string | number; }> = ({ icon: Icon, label, value }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border flex flex-col items-center text-center">
    <div className="text-[#10A4B0] mb-2"><Icon size={28} /></div>
    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{label}</p>
    <p className="text-lg font-bold text-gray-800">{value}</p>
  </div>
);

const Alert: React.FC<{ type: 'success' | 'error'; message: string; onClose: () => void }> = ({ type, message, onClose }) => {
  const styles = { success: 'bg-green-100 text-green-800', error: 'bg-red-100 text-red-800' };
  const Icon = type === 'success' ? CheckCircle : AlertCircle;
  return (
    <div className={`p-3 rounded-lg flex items-center gap-3 text-sm ${styles[type]}`}>
      <Icon size={20} />
      <span className="flex-grow">{message}</span>
      <button onClick={onClose} className="font-bold">X</button>
    </div>
  );
};

const HotelRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={16} className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
    ))}
  </div>
);

//================================================================//
// 3. PAGE-SPECIFIC COMPONENTS
//================================================================//
const Sidebar: React.FC<{ onNavigate: (id: string) => void; onSave: () => void; isSaving: boolean; }> = ({ onNavigate, onSave, isSaving }) => {
  const navItems = [
    { id: 'overview', label: 'Trip Overview', icon: Sun },
    { id: 'itinerary', label: 'Daily Itinerary', icon: CalendarDays },
    { id: 'bookings', label: 'Travel & Stays', icon: Plane },
    { id: 'policies', label: 'Policies & Pricing', icon: Wallet },
    { id: 'contact', label: 'Contact Us', icon: Phone },
  ];
  return (
    <aside className="w-full lg:w-64 bg-gray-50 lg:bg-white lg:border-r lg:p-6 lg:sticky top-0 h-auto lg:h-screen flex flex-col">
      <h1 className="text-2xl font-bold font-raleway text-[#10A4B0] mb-8 hidden lg:block">Your Itinerary</h1>
      <nav className="flex-grow">
        <ul className="flex flex-row lg:flex-col justify-around lg:justify-start lg:space-y-2 border-b lg:border-none py-2 lg:py-0">
          {navItems.map(item => <li key={item.id}><button onClick={() => onNavigate(item.id)} className="flex flex-col lg:flex-row items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-[#10A4B0]/10 hover:text-[#10A4B0] transition-colors w-full text-center lg:text-left"><item.icon size={20} /><span className="text-xs lg:text-base font-medium">{item.label}</span></button></li>)}
        </ul>
      </nav>
      <div className="p-4 lg:p-0"><button onClick={onSave} disabled={isSaving} className="w-full bg-[#10A4B0] text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-3 hover:bg-teal-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">{isSaving ? <Loader size={20} className="animate-spin" /> : <Save size={20} />}<span>{isSaving ? 'Saving...' : 'Save Itinerary'}</span></button></div>
    </aside>
  );
};

const HeroSection: React.FC<{ title: string; image: string }> = ({ title, image }) => (
  <div className="relative h-64 md:h-80 bg-cover bg-center rounded-b-2xl overflow-hidden shadow-xl" style={{ backgroundImage: `url(${image})` }}>
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
    <h1 className="absolute bottom-6 left-6 text-3xl md:text-5xl font-bold font-raleway text-white tracking-wide">{title}</h1>
  </div>
);

const DayDetailCard: React.FC<{ dayPlan: DayPlan }> = ({ dayPlan }) => (
  <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-500">
    <div className="relative"><img src={dayPlan.image} alt={dayPlan.title} className="w-full h-56 object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div><div className="absolute bottom-0 left-0 p-6"><p className="text-sm font-semibold text-gray-200">{dayPlan.date}</p><h3 className="text-3xl font-bold font-raleway text-white mt-1">{dayPlan.title}</h3></div></div>
    <div className="p-6 space-y-8">
      <p className="text-gray-600 text-sm leading-relaxed">{dayPlan.description}</p>
      {dayPlan.sightseeing.length > 0 && <div><h4 className="text-xl font-semibold text-gray-800 flex items-center gap-3 mb-4"><Camera size={22} /> Sightseeing Activities</h4><div className="grid grid-cols-1 lg:grid-cols-2 gap-4">{dayPlan.sightseeing.map(item => <div key={item.name} className="bg-gray-50 rounded-lg border overflow-hidden flex items-center group"><img src={item.image} alt={item.name} className="w-28 h-28 object-cover flex-shrink-0" /><div className="p-4 text-sm"><h5 className="font-semibold text-gray-800 group-hover:text-[#10A4B0]">{item.name}</h5><p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5"><Clock size={12}/>{item.time}</p><p className="text-xs text-gray-600 mt-2 line-clamp-2">{item.description}</p>{item.ticketsIncluded && <p className="text-xs font-bold text-green-600 mt-1.5 flex items-center gap-1.5"><Ticket size={12}/> Tickets Included</p>}</div></div>)}</div></div>}
      {(dayPlan.meals.length > 0 || dayPlan.transfers.length > 0) && <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t"><div className="space-y-3">{dayPlan.meals.length > 0 && <><h4 className="font-semibold text-gray-700 flex items-center gap-2"><Utensils size={18} /> Meals</h4>{dayPlan.meals.map((meal, i) => <div key={i} className={`text-sm p-3 rounded-lg ${meal.mealIncluded ? 'bg-green-50 text-green-800' : 'bg-gray-100 text-gray-700'}`}><strong>{meal.type}</strong> at {meal.location} {meal.mealIncluded && "(Included)"}</div>)}</>}</div><div className="space-y-3">{dayPlan.transfers.length > 0 && <><h4 className="font-semibold text-gray-700 flex items-center gap-2"><Car size={18} /> Transfers</h4>{dayPlan.transfers.map((t, i) => <div key={i} className="text-sm p-3 rounded-lg bg-blue-50 text-blue-800"><strong>{t.mode}</strong>: {t.from} to {t.to} at {t.pickupTime}</div>)}</>}</div></div>}
    </div>
  </div>
);

const FlightInfoCard: React.FC<{ flight: Flight }> = ({ flight }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border"><div className="flex justify-between items-center mb-3"><span className="text-sm font-bold text-blue-600">{flight.modeOfTravel}</span><span className="text-xs text-gray-500">{flight.date}</span></div><div className="flex items-center text-center"><div className="w-2/5"><p className="font-bold text-lg">{flight.fromCity}</p><p className="text-sm text-gray-500">{flight.time || 'N/A'}</p></div><div className="w-1/5 flex justify-center text-gray-400"><Plane size={24} /></div><div className="w-2/5"><p className="font-bold text-lg">{flight.toCity}</p><p className="text-sm text-gray-500">{flight.time || 'N/A'}</p></div></div><div className="text-center text-xs text-gray-400 mt-2 border-t pt-2">{flight.airline} - {flight.flightNo} {flight.airport && `(${flight.airport})`}</div></div>
);

const AccommodationInfoCard: React.FC<{ booking: AccommodationBooking }> = ({ booking }) => (
  <div className="bg-white rounded-lg shadow-sm border overflow-hidden flex flex-col md:flex-row"><img src={booking.image} alt={booking.hotelName} className="w-full md:w-1/3 h-48 md:h-auto object-cover" /><div className="p-4 flex flex-col justify-between flex-grow"><div className="flex justify-between items-start"><div className="flex-grow"><p className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full inline-block">{booking.city}</p><h4 className="font-bold text-lg text-gray-800 mt-2">{booking.hotelName}</h4></div><HotelRating rating={booking.rating} /></div><div className="text-xs text-gray-500 mt-2"><strong>Amenities:</strong> {booking.amenities.slice(0, 3).join(', ')}{booking.amenities.length > 3 ? '...' : ''}</div><div className="flex flex-wrap gap-x-4 gap-y-2 text-sm mt-3 border-t pt-3"><p><strong>Check-in:</strong> {booking.checkIn}</p><p><strong>Check-out:</strong> {booking.checkOut}</p><p><strong>Nights:</strong> {booking.nights}</p><p><strong>Rooms:</strong> {booking.rooms}</p></div>{booking.remark && <p className="text-xs mt-2 bg-yellow-50 p-2 rounded-md"><strong>Remark:</strong> {booking.remark}</p>}</div></div>
);

const VehicleInfoCard: React.FC<{ vehicle: VehicleBooking }> = ({ vehicle }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border"><div className="flex items-center gap-3 mb-3"><div className="bg-green-100 text-green-800 p-2 rounded-full"><Car size={20}/></div><div><h4 className="font-bold text-gray-800">{vehicle.vehicleType}</h4><p className="text-xs text-gray-500">{vehicle.driveType} | {vehicle.numVehicles} Vehicle(s)</p></div></div><div className="text-xs space-y-1 border-t pt-2"><p><strong>Pickup:</strong> {vehicle.pickUpLocation} on {vehicle.pickUpDate}</p><p><strong>Dropoff:</strong> {vehicle.dropOffLocation} on {vehicle.dropOffDate}</p></div>{vehicle.remark && <p className="text-xs mt-2 bg-yellow-50 p-2 rounded-md"><strong>Remark:</strong> {vehicle.remark}</p>}</div>
);

//================================================================//
// 4. MAIN DASHBOARD COMPONENT
//================================================================//
export const ViewFinal: React.FC = () => {
    const [itineraryData, setItineraryData] = useState<ItineraryData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeDayId, setActiveDayId] = useState<string | number | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [saveMessage, setSaveMessage] = useState('');

    useEffect(() => {
        try {
            const sourceStr = sessionStorage.getItem('editedItinerary');
            if (!sourceStr) throw new Error("No itinerary data found in session storage.");
            const sourceData = JSON.parse(sourceStr);
            if (!sourceData || typeof sourceData !== 'object' || !sourceData.days) throw new Error("Invalid itinerary data format.");
            
            const days: DayPlan[] = sourceData.days.map((d: any, i: number) => ({
                id: d.id, day: i + 1,
                date: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
                title: d.title, description: d.description, image: d.image,
                sightseeing: d.sightseeing || [], meals: d.meals || [], transfers: d.transfers || [],
            }));
            if (days.length > 0) setActiveDayId(days[0].id);

            const allAccommodations: AccommodationBooking[] = (sourceData.accommodation || []).map((acc: any) => ({
                hotelName: acc.hotel?.name || 'N/A', city: acc.hotel?.location?.city || 'N/A', rating: acc.hotel?.rating || 0, amenities: acc.hotel?.amenities || [],
                checkIn: acc.checkInDate ? new Date(acc.checkInDate).toLocaleDateString() : 'N/A', 
                checkOut: acc.checkOutDate ? new Date(acc.checkOutDate).toLocaleDateString() : 'N/A',
                nights: acc.checkInDate && acc.checkOutDate ? Math.ceil((new Date(acc.checkOutDate).getTime() - new Date(acc.checkInDate).getTime()) / (1000 * 3600 * 24)) : 0,
                rooms: acc.numRooms || 0, image: acc.hotel?.images?.[0] || '', roomDetails: acc.roomDetails || [], remark: acc.remark || '',
            }));
            
            const pricing = sourceData.pricingDetails;
            const mappedData: ItineraryData = {
                tripTitle: sourceData.banner?.title || "Your Amazing Trip",
                tripImage: sourceData.banner?.image || '', tripDescription: sourceData.banner?.description || '',
                paxCount: pricing?.pricingPackages?.[0]?.priceDetails.reduce((s: number, p: any) => s + (p.noOfPax || 0), 0) || 0,
                duration: { days: sourceData.days.length, nights: sourceData.days.length > 0 ? sourceData.days.length - 1 : 0 },
                destinations: [...new Set(allAccommodations.map((a: AccommodationBooking) => a.city))],
                dayByDayItinerary: days,
                allFlights: sourceData.arrivalDeparture || [],
                allAccommodations,
                allVehicles: sourceData.selectedVehicles || [],
                pricing: pricing?.pricingPackages?.[0] ? {
                    packageName: pricing.pricingPackages[0].packageName,
                    pax: pricing.pricingPackages[0].priceDetails.map((p: any) => ({ paxType: p.paxType, count: p.noOfPax, costPerPerson: p.costPerPerson, totalCost: p.noOfPax * p.costPerPerson })),
                    totalPackageCost: pricing.pricingPackages[0].totalCost
                } : undefined,
                tripInfoSections: sourceData.tripInformation || [],
                paymentDetails: pricing ? { terms: pricing.paymentTerms, methods: pricing.paymentMethods, bankDetails: pricing.bankDetails } : undefined,
                contactInfo: { companyName: "Vogue Tourism LLP", email: "prashant@voguetourism.com", phone: "+91 95096 16188", website: "https://www.voguetourism.com/" }
            };
            setItineraryData(mappedData);
        } catch (e: any) { setError(e.message); } finally { setIsLoading(false); }
    }, []);

    const activeDayData = useMemo(() => itineraryData?.dayByDayItinerary.find(d => d.id === activeDayId), [activeDayId, itineraryData]);
    const handleNavigation = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // ✅ **FIXED & SIMPLIFIED**: The handleSaveItinerary function now correctly structures the payload.
    const handleSaveItinerary = async () => {
        setIsSaving(true);
        setSaveStatus('idle');
        try {
            const rawItineraryString = sessionStorage.getItem('editedItinerary');
            if (!rawItineraryString) {
                throw new Error("Could not find itinerary data in session to save.");
            }
            
            const itineraryData = JSON.parse(rawItineraryString);
            if (!itineraryData || typeof itineraryData !== 'object') {
                throw new Error("Invalid itinerary data found in session storage.");
            }

            // The API expects the entire object from sessionStorage.
            // We just need to add the management fields (itineraryId, status, customer) to it.
            const payload = {
                ...itineraryData, // Spread the entire itinerary object here
                itineraryId: itineraryData.itineraryId || crypto.randomUUID(), // Use existing ID or create new
                status: "draft",
                // Customer details are now part of travelBasics within the main object
                customer: {
                    name: itineraryData.travelBasics?.clientName || 'N/A',
                    email: itineraryData.travelBasics?.email || 'N/A',
                    phone: itineraryData.travelBasics?.phone || 'N/A',
                }
            };
            
            const result = await saveItinerary(payload);
            setSaveStatus('success');
            setSaveMessage(result.message || 'Itinerary saved successfully!');
        } catch (err: any) {
            setSaveStatus('error');
            setSaveMessage(err.message || 'An unknown error occurred while saving.');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="flex h-screen items-center justify-center text-lg font-semibold">Loading Your Itinerary...</div>;
    if (error) return <div className="flex h-screen items-center justify-center text-red-500 p-8"><strong>Error:</strong> {error}</div>;
    if (!itineraryData) return <div className="flex h-screen items-center justify-center">No itinerary data available.</div>;

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="flex flex-col lg:flex-row">
                <Sidebar onNavigate={handleNavigation} onSave={handleSaveItinerary} isSaving={isSaving} />
                <main className="flex-1 p-4 md:p-8">
                    {saveStatus !== 'idle' && <div className="mb-6"><Alert type={saveStatus} message={saveMessage} onClose={() => setSaveStatus('idle')} /></div>}
                    <HeroSection title={itineraryData.tripTitle} image={itineraryData.tripImage} />
                    
                    <SectionWrapper id="overview" title="Trip Overview" icon={Sun}>
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <InfoCard icon={CalendarDays} label="Duration" value={`${itineraryData.duration.days} Days`} />
                            <InfoCard icon={Moon} label="Nights" value={itineraryData.duration.nights} />
                            <InfoCard icon={Users} label="Travelers" value={itineraryData.paxCount} />
                            <InfoCard icon={MapPin} label="Destinations" value={itineraryData.destinations.join(', ')} />
                        </div>
                        <p className="text-gray-600 leading-relaxed bg-white p-6 rounded-lg shadow-sm border">{itineraryData.tripDescription}</p>
                    </SectionWrapper>

                    <SectionWrapper id="itinerary" title="Daily Itinerary" icon={CalendarDays}>
                        <div className="flex flex-wrap gap-2 mb-6">{itineraryData.dayByDayItinerary.map(day => <button key={day.id} onClick={() => setActiveDayId(day.id)} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${activeDayId === day.id ? 'bg-[#10A4B0] text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-200 border'}`}>Day {day.day}</button>)}</div>
                        {activeDayData && <DayDetailCard dayPlan={activeDayData} />}
                    </SectionWrapper>

                    <SectionWrapper id="bookings" title="Travel & Stays" icon={BedDouble}>
                        <div className="space-y-8">
                            {itineraryData.allFlights.length > 0 && <div><h3 className="text-xl font-semibold font-raleway text-gray-700 mb-4">Flight Details</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{itineraryData.allFlights.map((flight, i) => <FlightInfoCard key={i} flight={flight} />)}</div></div>}
                            {itineraryData.allAccommodations.length > 0 && <div><h3 className="text-xl font-semibold font-raleway text-gray-700 mb-4">Accommodation Details</h3><div className="grid grid-cols-1 gap-6">{itineraryData.allAccommodations.map((booking, i) => <AccommodationInfoCard key={i} booking={booking} />)}</div></div>}
                            {itineraryData.allVehicles.length > 0 && <div><h3 className="text-xl font-semibold font-raleway text-gray-700 mb-4">Vehicle Details</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{itineraryData.allVehicles.map(vehicle => <VehicleInfoCard key={vehicle.id} vehicle={vehicle} />)}</div></div>}
                        </div>
                    </SectionWrapper>
                    
                    <SectionWrapper id="policies" title="Policies & Pricing" icon={Wallet}>
                        {itineraryData.pricing && <div className="bg-white p-6 rounded-lg shadow-sm border mb-8"><h3 className="text-xl font-semibold font-raleway text-gray-700 mb-4">{itineraryData.pricing.packageName}</h3><table className="w-full text-left text-sm"><thead><tr className="border-b bg-gray-50"><th className="p-2">Pax Type</th><th className="p-2 text-center">Count</th><th className="p-2 text-right">Cost/Person</th><th className="p-2 text-right">Total</th></tr></thead><tbody>{itineraryData.pricing.pax.map(p => <tr key={p.paxType} className="border-b"><td className="p-2">{p.paxType}</td><td className="p-2 text-center">{p.count}</td><td className="p-2 text-right">₹{p.costPerPerson.toLocaleString()}</td><td className="p-2 text-right">₹{p.totalCost.toLocaleString()}</td></tr>)}</tbody><tfoot><tr><td colSpan={3} className="p-2 font-bold text-right">Grand Total</td><td className="p-2 font-bold text-right text-lg text-[#10A4B0]">₹{itineraryData.pricing.totalPackageCost.toLocaleString()}</td></tr></tfoot></table></div>}
                        {itineraryData.paymentDetails && <div className="bg-white p-6 rounded-lg shadow-sm border mb-8"><h3 className="text-xl font-semibold font-raleway text-gray-700 mb-4 flex items-center gap-3"><Banknote/>Payment Details</h3><p className="text-sm text-gray-500 mb-2"><strong>Methods:</strong> {itineraryData.paymentDetails.methods}</p><div className="text-sm prose prose-sm max-w-none mb-4" dangerouslySetInnerHTML={{ __html: itineraryData.paymentDetails.terms }} /><div className="text-xs bg-gray-100 p-3 rounded-md"><strong>Bank:</strong> {itineraryData.paymentDetails.bankDetails.bankName}<br/><strong>A/C:</strong> {itineraryData.paymentDetails.bankDetails.accountNumber}<br/><strong>IFSC:</strong> {itineraryData.paymentDetails.bankDetails.ifscCode}</div></div>}
                        <div className="space-y-8">{itineraryData.tripInfoSections.map(section => <div key={section.title} className="bg-white p-6 rounded-lg shadow-sm border"><h3 className="text-xl font-semibold font-raleway text-gray-700 mb-4 flex items-center gap-3"><ShieldCheck/>{section.title}</h3><div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: section.content }} /></div>)}</div>
                    </SectionWrapper>
                    
                    <SectionWrapper id="contact" title="Contact Us" icon={Phone}>
                         <div className="bg-white p-6 rounded-lg shadow-sm border text-sm text-gray-700 space-y-3">
                           <p><strong>Company:</strong> {itineraryData.contactInfo.companyName}</p>
                           <p><strong>Email:</strong> <a href={`mailto:${itineraryData.contactInfo.email}`} className="text-[#10A4B0] underline">{itineraryData.contactInfo.email}</a></p>
                           <p><strong>Phone:</strong> <a href={`tel:${itineraryData.contactInfo.phone}`} className="text-[#10A4B0] underline">{itineraryData.contactInfo.phone}</a></p>
                           <p><strong>Website:</strong> <a href={itineraryData.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-[#10A4B0] underline">{itineraryData.contactInfo.website}</a></p>
                         </div>
                    </SectionWrapper>
                </main>
            </div>
        </div>
    );
};

export default ViewFinal;

//v2 its working 
// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   MapPin, Phone, Mail, Globe, Plane, Car, Camera,
//   BedDouble, Sun, Moon, Users, CalendarDays, Wallet, Save, Loader, AlertCircle, CheckCircle
// } from 'lucide-react';
// import { saveItinerary } from '../../api/itinerary_api'; // 1. IMPORT THE API FUNCTION

// //================================================================//
// // 1. TYPE DEFINITIONS (EXPANDED FOR MORE DETAIL)
// //================================================================//
// interface DayPlan {
//   id: string | number;
//   day: number;
//   date: string;
//   title: string;
//   description: string;
//   image: string;
//   sightseeing: { name: string; description: string; image: string }[];
//   accommodation: any[]; // Raw accommodation data for this day
//   vehicles: any[]; // Raw vehicle data for this day
//   meals: any[]; // Raw meal data for this day
// }

// interface Flight {
//   type: 'Departure' | 'Return';
//   date: string;
//   airline: string;
//   flightNo: string;
//   from: { time: string; city: string };
//   to: { time: string; city: string };
// }

// interface AccommodationBooking {
//   hotelName: string;
//   city: string;
//   checkIn: string;
//   checkOut: string;
//   nights: number;
//   rooms: number;
//   image: string;
//   roomDetails: { roomType: string; mealType: string }[];
// }

// interface PriceDetail {
//   paxType: string;
//   count: number;
//   costPerPerson: number;
//   totalCost: number;
// }

// interface ItineraryData {
//   tripTitle: string;
//   tripImage: string;
//   tripDescription: string;
//   paxCount: number;
//   duration: { days: number, nights: number };
//   destinations: string[];
//   dayByDayItinerary: DayPlan[];
//   allFlights: Flight[];
//   allAccommodations: AccommodationBooking[];
//   pricing?: {
//     packageName: string;
//     pax: PriceDetail[];
//     totalPackageCost: number;
//   };
//   notes?: {
//     inclusions: string;
//     exclusions: string;
//   };
//   cancellationPolicy?: string;
//   paymentTerms?: {
//     terms: string;
//     bankDetails: {
//       bankName: string;
//       accountNumber: string;
//       ifscCode: string;
//     };
//   };
//   contactInfo: {
//     companyName: string;
//     email: string;
//     phone: string;
//     website: string;
//   };
// }

// //================================================================//
// // 2. HELPER & UI COMPONENTS
// //================================================================//

// const SectionWrapper: React.FC<{ id: string; title: string; children: React.ReactNode; icon: React.ElementType }> = ({ id, title, children, icon: Icon }) => (
//   <section id={id} className="py-10">
//     <div className="flex items-center gap-4 mb-6">
//       <div className="bg-[#10A4B0] text-white p-3 rounded-lg shadow-md">
//         <Icon size={24} />
//       </div>
//       <h2 className="text-2xl md:text-3xl font-bold font-raleway text-gray-800">{title}</h2>
//     </div>
//     <div className="pl-4 border-l-4 border-[#10A4B0]/30">{children}</div>
//   </section>
// );

// const InfoCard: React.FC<{ icon: React.ElementType; label: string; value: string | number; className?: string }> = ({ icon: Icon, label, value, className }) => (
//   <div className={`bg-white p-4 rounded-lg shadow-sm border flex flex-col items-center text-center ${className}`}>
//     <div className="text-[#10A4B0] mb-2"><Icon size={28} /></div>
//     <p className="text-xs text-gray-500 font-semibold uppercase">{label}</p>
//     <p className="text-lg font-bold text-gray-800">{value}</p>
//   </div>
// );

// const Alert: React.FC<{ type: 'success' | 'error'; message: string; onClose: () => void }> = ({ type, message, onClose }) => {
//   const baseClasses = 'p-3 rounded-lg flex items-center gap-3 text-sm';
//   const typeClasses = {
//     success: 'bg-green-100 text-green-800',
//     error: 'bg-red-100 text-red-800',
//   };
//   const Icon = type === 'success' ? CheckCircle : AlertCircle;
//   return (
//     <div className={`${baseClasses} ${typeClasses[type]}`}>
//       <Icon size={20} />
//       <span className="flex-grow">{message}</span>
//       <button onClick={onClose} className="font-bold">X</button>
//     </div>
//   );
// };


// //================================================================//
// // 3. PAGE-SPECIFIC COMPONENTS (NEW & IMPROVED)
// //================================================================//

// const Sidebar: React.FC<{ onNavigate: (id: string) => void; onSave: () => void; isSaving: boolean; }> = ({ onNavigate, onSave, isSaving }) => {
//   const navItems = [
//     { id: 'overview', label: 'Trip Overview', icon: Sun },
//     { id: 'itinerary', label: 'Daily Itinerary', icon: CalendarDays },
//     { id: 'bookings', label: 'Travel & Stays', icon: Plane },
//     { id: 'pricing', label: 'Pricing & Notes', icon: Wallet },
//     { id: 'contact', label: 'Contact Us', icon: Phone },
//   ];
//   return (
//     <aside className="w-full lg:w-64 bg-gray-50 lg:bg-white lg:border-r lg:p-6 lg:sticky top-0 h-auto lg:h-screen flex flex-col">
//       <h1 className="text-2xl font-bold font-raleway text-[#10A4B0] mb-8 hidden lg:block">Your Itinerary</h1>
//       <nav className="flex-grow">
//         <ul className="flex flex-row lg:flex-col justify-around lg:justify-start lg:space-y-2 border-b lg:border-none py-2 lg:py-0">
//           {navItems.map(item => (
//             <li key={item.id}>
//               <button
//                 onClick={() => onNavigate(item.id)}
//                 className="flex flex-col lg:flex-row items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-[#10A4B0]/10 hover:text-[#10A4B0] transition-colors w-full text-center lg:text-left"
//               >
//                 <item.icon size={20} />
//                 <span className="text-xs lg:text-base font-medium">{item.label}</span>
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>
//       <div className="p-4 lg:p-0">
//         <button
//           onClick={onSave}
//           disabled={isSaving}
//           className="w-full bg-[#10A4B0] text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-3 hover:bg-teal-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//         >
//           {isSaving ? (
//             <Loader size={20} className="animate-spin" />
//           ) : (
//             <Save size={20} />
//           )}
//           <span>{isSaving ? 'Saving...' : 'Save Itinerary'}</span>
//         </button>
//       </div>
//     </aside>
//   );
// };

// const HeroSection: React.FC<{ title: string; image: string }> = ({ title, image }) => (
//   <div className="relative h-64 md:h-80 bg-cover bg-center rounded-b-2xl overflow-hidden" style={{ backgroundImage: `url(${image})` }}>
//     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//     <h1 className="absolute bottom-6 left-6 text-3xl md:text-5xl font-bold font-raleway text-white">{title}</h1>
//   </div>
// );

// const SightseeingCard: React.FC<{ item: { name: string; description: string; image: string } }> = ({ item }) => (
//     <div className="bg-white rounded-lg shadow-sm border overflow-hidden flex items-center group transform hover:scale-105 hover:shadow-lg transition-all duration-300">
//         <img src={item.image} alt={item.name} className="w-24 h-24 object-cover flex-shrink-0" />
//         <div className="p-3">
//             <h5 className="font-semibold text-gray-800 group-hover:text-[#10A4B0] transition-colors">{item.name}</h5>
//             <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.description}</p>
//         </div>
//     </div>
// );


// const DayDetailCard: React.FC<{ dayPlan: DayPlan }> = ({ dayPlan }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in">
//         <div className="relative">
//             <img src={dayPlan.image} alt={dayPlan.title} className="w-full h-56 object-cover" />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
//             <div className="absolute bottom-0 left-0 p-6">
//                 <p className="text-sm font-semibold text-gray-200">{dayPlan.date}</p>
//                 <h3 className="text-3xl font-bold font-raleway text-white mt-1">{dayPlan.title}</h3>
//             </div>
//         </div>
//         <div className="p-6">
//             <p className="text-gray-600 text-sm leading-relaxed mb-8">{dayPlan.description}</p>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
//                 {dayPlan.accommodation.length > 0 && (
//                     <div>
//                         <h4 className="font-semibold text-gray-700 flex items-center gap-2 mb-2"><BedDouble size={18} /> Accommodation</h4>
//                         <div className="text-sm font-medium p-3 rounded-lg bg-blue-50 text-blue-800">
//                             {dayPlan.accommodation[0].hotel?.name} in {dayPlan.accommodation[0].hotel?.location?.city}
//                         </div>
//                     </div>
//                 )}
//                 {dayPlan.vehicles.length > 0 && (
//                     <div>
//                         <h4 className="font-semibold text-gray-700 flex items-center gap-2 mb-2"><Car size={18} /> Transport</h4>
//                         <div className="text-sm font-medium p-3 rounded-lg bg-green-50 text-green-800">
//                             {dayPlan.vehicles[0].numVehicles} x {dayPlan.vehicles[0].vehicleType} ({dayPlan.vehicles[0].driveType})
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {dayPlan.sightseeing.length > 0 && (
//                 <div>
//                     <h4 className="text-xl font-semibold text-gray-800 flex items-center gap-3 mb-4"><Camera size={22} /> Today's Activities</h4>
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                         {dayPlan.sightseeing.map(item => (
//                             <SightseeingCard key={item.name} item={item} />
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     </div>
//   );
// };

// const FlightInfoCard: React.FC<{ flight: Flight }> = ({ flight }) => (
//     <div className="bg-white p-4 rounded-lg shadow-sm border">
//         <div className="flex justify-between items-center mb-3">
//             <span className={`text-sm font-bold ${flight.type === 'Departure' ? 'text-blue-600' : 'text-green-600'}`}>{flight.type}</span>
//             <span className="text-xs text-gray-500">{flight.date}</span>
//         </div>
//         <div className="flex items-center text-center">
//             <div className="w-2/5">
//                 <p className="font-bold text-lg">{flight.from.city}</p>
//                 <p className="text-sm text-gray-500">{flight.from.time}</p>
//             </div>
//             <div className="w-1/5 flex justify-center text-gray-400">
//                 <Plane size={24} />
//             </div>
//             <div className="w-2/5">
//                 <p className="font-bold text-lg">{flight.to.city}</p>
//                 <p className="text-sm text-gray-500">{flight.to.time}</p>
//             </div>
//         </div>
//         <div className="text-center text-xs text-gray-400 mt-2 border-t pt-2">{flight.airline} - {flight.flightNo}</div>
//     </div>
// );

// const AccommodationInfoCard: React.FC<{ booking: AccommodationBooking }> = ({ booking }) => (
//     <div className="bg-white rounded-lg shadow-sm border overflow-hidden flex flex-col md:flex-row">
//         <img src={booking.image} alt={booking.hotelName} className="w-full md:w-1/3 h-48 md:h-auto object-cover" />
//         <div className="p-4 flex flex-col justify-between">
//             <div>
//                 <p className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full inline-block">{booking.city}</p>
//                 <h4 className="font-bold text-lg text-gray-800 mt-2">{booking.hotelName}</h4>
//             </div>
//             <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm mt-3">
//                 <span><strong>Nights:</strong> {booking.nights}</span>
//                 <span><strong>Rooms:</strong> {booking.rooms}</span>
//             </div>
//             <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm mt-3 border-t pt-3">
//                 <p><strong>Check-in:</strong> {booking.checkIn}</p>
//                 <p><strong>Check-out:</strong> {booking.checkOut}</p>
//             </div>
//         </div>
//     </div>
// );


// //================================================================//
// // 4. MAIN DASHBOARD COMPONENT
// //================================================================//
// export const ViewFinal: React.FC = () => {
//     const [itineraryData, setItineraryData] = useState<ItineraryData | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [activeDayId, setActiveDayId] = useState<string | number | null>(null);
    
//     // State for save functionality
//     const [isSaving, setIsSaving] = useState(false);
//     const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
//     const [saveMessage, setSaveMessage] = useState('');

//     useEffect(() => {
//         try {
//             const savedItineraryString = sessionStorage.getItem('editedItinerary');
//             if (!savedItineraryString) throw new Error("No itinerary data found.");

//             const sourceData = JSON.parse(savedItineraryString);
//             if (!Array.isArray(sourceData) || sourceData.length === 0) throw new Error("Invalid data format.");
            
//             const firstDay = sourceData[0];
            
//             // --- DATA MAPPING ---
//             const days: DayPlan[] = sourceData.map((day: any, index: number) => ({
//                 id: day.id,
//                 day: index + 1,
//                 date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }),
//                 title: day.title,
//                 description: day.description,
//                 image: day.image,
//                 sightseeing: day.sightseeing || [],
//                 accommodation: day.accommodation || [],
//                 vehicles: day.selectedVehicles || [],
//                 meals: day.meals || [],
//             }));
            
//             if (days.length > 0) setActiveDayId(days[0].id);

//             const mappedData: ItineraryData = {
//                 tripTitle: firstDay.title || "Your Amazing Trip",
//                 tripImage: firstDay.image || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
//                 tripDescription: firstDay.description || "An unforgettable journey awaits.",
//                 paxCount: firstDay.PricingDetails?.pricingPackages?.[0]?.priceDetails.reduce((sum: number, p: any) => sum + p.noOfPax, 0) || 0,
//                 duration: { days: sourceData.length, nights: sourceData.length > 0 ? sourceData.length - 1 : 0 },
//                 destinations: [firstDay.ArrivalandDeparture?.[0]?.fromCity, ...new Set(sourceData.map((d: any) => d.ArrivalandDeparture?.[0]?.toCity).filter(Boolean))],
//                 dayByDayItinerary: days,
//                 allFlights: firstDay.ArrivalandDeparture?.map((f: any, i: number) => ({
//                     type: i === 0 ? 'Departure' : 'Return',
//                     date: new Date(f.date).toLocaleDateString(),
//                     airline: f.airline,
//                     flightNo: f.flightNo,
//                     from: { time: f.time, city: f.fromCity },
//                     to: { time: f.time, city: f.toCity },
//                 })) || [],
//                 allAccommodations: firstDay.accommodation?.map((acc: any) => ({
//                      hotelName: acc.hotel.name,
//                      city: acc.hotel.location.city,
//                      checkIn: new Date(acc.checkInDate).toLocaleDateString(),
//                      checkOut: new Date(acc.checkOutDate).toLocaleDateString(),
//                      nights: Math.ceil((new Date(acc.checkOutDate).getTime() - new Date(acc.checkInDate).getTime()) / (1000 * 3600 * 24)),
//                      rooms: acc.numRooms,
//                      image: acc.hotel.images[0],
//                      roomDetails: acc.roomDetails,
//                 })) || [],
//                 pricing: firstDay.PricingDetails ? {
//                     packageName: firstDay.PricingDetails.pricingPackages[0].packageName,
//                     pax: firstDay.PricingDetails.pricingPackages[0].priceDetails.map((p: any) => ({
//                         paxType: p.paxType, count: p.noOfPax, costPerPerson: p.costPerPerson, totalCost: p.noOfPax * p.costPerPerson,
//                     })),
//                     totalPackageCost: firstDay.PricingDetails.pricingPackages[0].totalCost
//                 } : undefined,
//                 notes: {
//                     inclusions: firstDay['Trip Information']?.find((i: any) => i.title === "Inclusions")?.content || "",
//                     exclusions: firstDay['Trip Information']?.find((i: any) => i.title === "Exclusions")?.content || "",
//                 },
//                 cancellationPolicy: firstDay['Trip Information']?.find((i: any) => i.title === "Cancellation Policy")?.content,
//                 paymentTerms: firstDay.PricingDetails ? {
//                     terms: firstDay.PricingDetails.paymentTerms,
//                     bankDetails: firstDay.PricingDetails.bankDetails,
//                 } : undefined,
//                 contactInfo: {
//                     companyName: "Vogue Tourism LLP",
//                     email: "prashant@voguetourism.com", phone: "+91 95096 16188", website: "https://www.voguetourism.com/",
//                 }
//             };
//             setItineraryData(mappedData);
//         } catch (e: any) {
//             setError(e.message);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     const activeDayData = useMemo(() => {
//         return itineraryData?.dayByDayItinerary.find(d => d.id === activeDayId);
//     }, [activeDayId, itineraryData]);

//     const handleNavigation = (id: string) => {
//         document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     };

//     // 2. THIS IS THE MAIN API INTEGRATION FUNCTION
//     const handleSaveItinerary = async () => {
//         setIsSaving(true);
//         setSaveStatus('idle');
//         setSaveMessage('');

//         try {
//             // Retrieve the raw, complete itinerary data from session storage
//             const rawItineraryDataString = sessionStorage.getItem('editedItinerary');
//             if (!rawItineraryDataString) {
//                 throw new Error("Could not find itinerary data in session to save.");
//             }
//             const itineraryData = JSON.parse(rawItineraryDataString);

//             // Retrieve customer details from the initial form step (travelBasic)
//             const travelBasicDataString = sessionStorage.getItem('travelBasicData');
//             const travelBasicData = travelBasicDataString ? JSON.parse(travelBasicDataString) : {};
            
//             const customer = {
//                 name: travelBasicData.clientName || 'N/A',
//                 email: travelBasicData.email || 'N/A',
//                 phone: travelBasicData.phone || 'N/A',
//             };

//             // Construct the final payload that matches the backend controller's expectations
//             const payload = {
//                 itineraryId: crypto.randomUUID(),
//                 status: "draft",
//                 customer,
//                 itineraryData, // Send the full, unaltered itinerary object
//             };

//             // Call the dedicated API function from itinerary_api.js
//             const result = await saveItinerary(payload);
            
//             setSaveStatus('success');
//             setSaveMessage(result.message || 'Itinerary saved successfully!');

//         } catch (err: any) {
//             setSaveStatus('error');
//             setSaveMessage(err.message || 'An unknown error occurred.');
//         } finally {
//             setIsSaving(false);
//         }
//     };


//     if (isLoading) return <div className="flex h-screen items-center justify-center">Loading Itinerary...</div>;
//     if (error) return <div className="flex h-screen items-center justify-center text-red-500">Error: {error}</div>;
//     if (!itineraryData) return <div className="flex h-screen items-center justify-center">No data available.</div>;

//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <div className="flex flex-col lg:flex-row">
//                 <Sidebar onNavigate={handleNavigation} onSave={handleSaveItinerary} isSaving={isSaving} />
//                 <main className="flex-1 p-4 md:p-8">
//                     {saveStatus !== 'idle' && (
//                         <div className="mb-6">
//                             <Alert 
//                                 type={saveStatus} 
//                                 message={saveMessage} 
//                                 onClose={() => setSaveStatus('idle')}
//                             />
//                         </div>
//                     )}
//                     <HeroSection title={itineraryData.tripTitle} image={itineraryData.tripImage} />
                    
//                     {/* --- Overview Section --- */}
//                     <SectionWrapper id="overview" title="Trip Overview" icon={Sun}>
//                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//                             <InfoCard icon={CalendarDays} label="Duration" value={`${itineraryData.duration.days} Days`} />
//                             <InfoCard icon={Moon} label="Nights" value={itineraryData.duration.nights} />
//                             <InfoCard icon={Users} label="Pax Count" value={itineraryData.paxCount} />
//                             <InfoCard icon={MapPin} label="Destination" value={itineraryData.destinations.slice(-1)[0]} />
//                         </div>
//                         <p className="text-gray-600 leading-relaxed bg-white p-6 rounded-lg shadow-sm border">{itineraryData.tripDescription}</p>
//                     </SectionWrapper>

//                     {/* --- Itinerary Section --- */}
//                     <SectionWrapper id="itinerary" title="Daily Itinerary" icon={CalendarDays}>
//                         <div className="flex flex-wrap gap-2 mb-6">
//                             {itineraryData.dayByDayItinerary.map(day => (
//                                 <button key={day.id} onClick={() => setActiveDayId(day.id)}
//                                     className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${activeDayId === day.id ? 'bg-[#10A4B0] text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-200'}`}>
//                                     Day {day.day}
//                                 </button>
//                             ))}
//                         </div>
//                         {activeDayData && <DayDetailCard dayPlan={activeDayData} />}
//                     </SectionWrapper>

//                     {/* --- Bookings Section --- */}
//                     <SectionWrapper id="bookings" title="Travel & Stays" icon={Plane}>
//                         <div className="space-y-8">
//                             {itineraryData.allFlights.length > 0 && (
//                                 <div>
//                                     <h3 className="text-xl font-semibold font-raleway text-gray-700 mb-4">Flight Details</h3>
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                         {itineraryData.allFlights.map((flight, i) => <FlightInfoCard key={i} flight={flight} />)}
//                                     </div>
//                                 </div>
//                             )}
//                              {itineraryData.allAccommodations.length > 0 && (
//                                 <div>
//                                     <h3 className="text-xl font-semibold font-raleway text-gray-700 mb-4">Accommodation Details</h3>
//                                     <div className="grid grid-cols-1 gap-6">
//                                         {itineraryData.allAccommodations.map((booking, i) => <AccommodationInfoCard key={i} booking={booking} />)}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </SectionWrapper>
                    
//                     {/* --- Pricing Section --- */}
//                     <SectionWrapper id="pricing" title="Pricing & Notes" icon={Wallet}>
//                         {itineraryData.pricing && (
//                           <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
//                             <h3 className="text-xl font-semibold font-raleway text-gray-700 mb-4">{itineraryData.pricing.packageName}</h3>
//                              <table className="w-full text-left text-sm">
//                                 <thead className="bg-gray-100"><tr className="border-b"><th className="p-2">Pax Type</th><th className="p-2 text-center">Count</th><th className="p-2 text-right">Cost/Person</th><th className="p-2 text-right">Total</th></tr></thead>
//                                 <tbody>
//                                   {itineraryData.pricing.pax.map(p => <tr key={p.paxType} className="border-b"><td className="p-2">{p.paxType}</td><td className="p-2 text-center">{p.count}</td><td className="p-2 text-right">₹{p.costPerPerson.toLocaleString()}</td><td className="p-2 text-right">₹{p.totalCost.toLocaleString()}</td></tr>)}
//                                 </tbody>
//                                 <tfoot><tr><td colSpan={3} className="p-2 font-bold text-right">Total Cost</td><td className="p-2 font-bold text-right text-lg text-[#10A4B0]">₹{itineraryData.pricing.totalPackageCost.toLocaleString()}</td></tr></tfoot>
//                             </table>
//                           </div>
//                         )}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                           {itineraryData.notes?.inclusions && <div className="bg-white p-6 rounded-lg shadow-sm border">
//                             <h3 className="text-xl font-semibold font-raleway text-green-700 mb-4">Inclusions</h3>
//                             <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: itineraryData.notes.inclusions }} />
//                           </div>}
//                           {itineraryData.notes?.exclusions && <div className="bg-white p-6 rounded-lg shadow-sm border">
//                             <h3 className="text-xl font-semibold font-raleway text-red-700 mb-4">Exclusions</h3>
//                             <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: itineraryData.notes.exclusions }} />
//                           </div>}
//                         </div>
//                     </SectionWrapper>
                    
//                      {/* --- Contact Section --- */}
//                     <SectionWrapper id="contact" title="Contact Us" icon={Phone}>
//                          <div className="bg-white p-6 rounded-lg shadow-sm border text-sm text-gray-700 space-y-3">
//                            <p><strong>Company:</strong> {itineraryData.contactInfo.companyName}</p>
//                            <p><strong>Email:</strong> {itineraryData.contactInfo.email}</p>
//                            <p><strong>Phone:</strong> {itineraryData.contactInfo.phone}</p>
//                            <p><strong>Website:</strong> <a href={itineraryData.contactInfo.website} className="text-[#10A4B0] underline">{itineraryData.contactInfo.website}</a></p>
//                          </div>
//                     </SectionWrapper>
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default ViewFinal;


//v1

// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   MapPin, Phone, Mail, Globe, Plane, Car, Camera,
//   BedDouble, Sun, Moon, Users, CalendarDays, Wallet, Save, Loader, AlertCircle, CheckCircle
// } from 'lucide-react';

// //================================================================//
// // 1. TYPE DEFINITIONS (EXPANDED FOR MORE DETAIL)
// //================================================================//
// interface DayPlan {
//   id: string | number;
//   day: number;
//   date: string;
//   title: string;
//   description: string;
//   image: string;
//   sightseeing: { name: string; description: string; image: string }[];
//   accommodation: any[]; // Raw accommodation data for this day
//   vehicles: any[]; // Raw vehicle data for this day
//   meals: any[]; // Raw meal data for this day
// }

// interface Flight {
//   type: 'Departure' | 'Return';
//   date: string;
//   airline: string;
//   flightNo: string;
//   from: { time: string; city: string };
//   to: { time: string; city: string };
// }

// interface AccommodationBooking {
//   hotelName: string;
//   city: string;
//   checkIn: string;
//   checkOut: string;
//   nights: number;
//   rooms: number;
//   image: string;
//   roomDetails: { roomType: string; mealType: string }[];
// }

// interface PriceDetail {
//   paxType: string;
//   count: number;
//   costPerPerson: number;
//   totalCost: number;
// }

// interface ItineraryData {
//   tripTitle: string;
//   tripImage: string;
//   tripDescription: string;
//   paxCount: number;
//   duration: { days: number, nights: number };
//   destinations: string[];
//   dayByDayItinerary: DayPlan[];
//   allFlights: Flight[];
//   allAccommodations: AccommodationBooking[];
//   pricing?: {
//     packageName: string;
//     pax: PriceDetail[];
//     totalPackageCost: number;
//   };
//   notes?: {
//     inclusions: string;
//     exclusions: string;
//   };
//   cancellationPolicy?: string;
//   paymentTerms?: {
//     terms: string;
//     bankDetails: {
//       bankName: string;
//       accountNumber: string;
//       ifscCode: string;
//     };
//   };
//   contactInfo: {
//     companyName: string;
//     email: string;
//     phone: string;
//     website: string;
//   };
// }

// //================================================================//
// // 2. HELPER & UI COMPONENTS
// //================================================================//

// const SectionWrapper: React.FC<{ id: string; title: string; children: React.ReactNode; icon: React.ElementType }> = ({ id, title, children, icon: Icon }) => (
//   <section id={id} className="py-10">
//     <div className="flex items-center gap-4 mb-6">
//       <div className="bg-[#10A4B0] text-white p-3 rounded-lg shadow-md">
//         <Icon size={24} />
//       </div>
//       <h2 className="text-2xl md:text-3xl font-bold font-raleway text-gray-800">{title}</h2>
//     </div>
//     <div className="pl-4 border-l-4 border-[#10A4B0]/30">{children}</div>
//   </section>
// );

// const InfoCard: React.FC<{ icon: React.ElementType; label: string; value: string | number; className?: string }> = ({ icon: Icon, label, value, className }) => (
//   <div className={`bg-white p-4 rounded-lg shadow-sm border flex flex-col items-center text-center ${className}`}>
//     <div className="text-[#10A4B0] mb-2"><Icon size={28} /></div>
//     <p className="text-xs text-gray-500 font-semibold uppercase">{label}</p>
//     <p className="text-lg font-bold text-gray-800">{value}</p>
//   </div>
// );

// const Alert: React.FC<{ type: 'success' | 'error'; message: string; onClose: () => void }> = ({ type, message, onClose }) => {
//   const baseClasses = 'p-3 rounded-lg flex items-center gap-3 text-sm';
//   const typeClasses = {
//     success: 'bg-green-100 text-green-800',
//     error: 'bg-red-100 text-red-800',
//   };
//   const Icon = type === 'success' ? CheckCircle : AlertCircle;
//   return (
//     <div className={`${baseClasses} ${typeClasses[type]}`}>
//       <Icon size={20} />
//       <span className="flex-grow">{message}</span>
//       <button onClick={onClose} className="font-bold">X</button>
//     </div>
//   );
// };


// //================================================================//
// // 3. PAGE-SPECIFIC COMPONENTS (NEW & IMPROVED)
// //================================================================//

// const Sidebar: React.FC<{ onNavigate: (id: string) => void; onSave: () => void; isSaving: boolean; }> = ({ onNavigate, onSave, isSaving }) => {
//   const navItems = [
//     { id: 'overview', label: 'Trip Overview', icon: Sun },
//     { id: 'itinerary', label: 'Daily Itinerary', icon: CalendarDays },
//     { id: 'bookings', label: 'Travel & Stays', icon: Plane },
//     { id: 'pricing', label: 'Pricing & Notes', icon: Wallet },
//     { id: 'contact', label: 'Contact Us', icon: Phone },
//   ];
//   return (
//     <aside className="w-full lg:w-64 bg-gray-50 lg:bg-white lg:border-r lg:p-6 lg:sticky top-0 h-auto lg:h-screen flex flex-col">
//       <h1 className="text-2xl font-bold font-raleway text-[#10A4B0] mb-8 hidden lg:block">Your Itinerary</h1>
//       <nav className="flex-grow">
//         <ul className="flex flex-row lg:flex-col justify-around lg:justify-start lg:space-y-2 border-b lg:border-none py-2 lg:py-0">
//           {navItems.map(item => (
//             <li key={item.id}>
//               <button
//                 onClick={() => onNavigate(item.id)}
//                 className="flex flex-col lg:flex-row items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-[#10A4B0]/10 hover:text-[#10A4B0] transition-colors w-full text-center lg:text-left"
//               >
//                 <item.icon size={20} />
//                 <span className="text-xs lg:text-base font-medium">{item.label}</span>
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>
//       <div className="p-4 lg:p-0">
//         <button
//           onClick={onSave}
//           disabled={isSaving}
//           className="w-full bg-[#10A4B0] text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-3 hover:bg-teal-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//         >
//           {isSaving ? (
//             <Loader size={20} className="animate-spin" />
//           ) : (
//             <Save size={20} />
//           )}
//           <span>{isSaving ? 'Saving...' : 'Save Itinerary'}</span>
//         </button>
//       </div>
//     </aside>
//   );
// };

// const HeroSection: React.FC<{ title: string; image: string }> = ({ title, image }) => (
//   <div className="relative h-64 md:h-80 bg-cover bg-center rounded-b-2xl overflow-hidden" style={{ backgroundImage: `url(${image})` }}>
//     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//     <h1 className="absolute bottom-6 left-6 text-3xl md:text-5xl font-bold font-raleway text-white">{title}</h1>
//   </div>
// );

// const SightseeingCard: React.FC<{ item: { name: string; description: string; image: string } }> = ({ item }) => (
//     <div className="bg-white rounded-lg shadow-sm border overflow-hidden flex items-center group transform hover:scale-105 hover:shadow-lg transition-all duration-300">
//         <img src={item.image} alt={item.name} className="w-24 h-24 object-cover flex-shrink-0" />
//         <div className="p-3">
//             <h5 className="font-semibold text-gray-800 group-hover:text-[#10A4B0] transition-colors">{item.name}</h5>
//             <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.description}</p>
//         </div>
//     </div>
// );


// const DayDetailCard: React.FC<{ dayPlan: DayPlan }> = ({ dayPlan }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in">
//         <div className="relative">
//             <img src={dayPlan.image} alt={dayPlan.title} className="w-full h-56 object-cover" />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
//             <div className="absolute bottom-0 left-0 p-6">
//                 <p className="text-sm font-semibold text-gray-200">{dayPlan.date}</p>
//                 <h3 className="text-3xl font-bold font-raleway text-white mt-1">{dayPlan.title}</h3>
//             </div>
//         </div>
//         <div className="p-6">
//             <p className="text-gray-600 text-sm leading-relaxed mb-8">{dayPlan.description}</p>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
//                 {dayPlan.accommodation.length > 0 && (
//                     <div>
//                         <h4 className="font-semibold text-gray-700 flex items-center gap-2 mb-2"><BedDouble size={18} /> Accommodation</h4>
//                         <div className="text-sm font-medium p-3 rounded-lg bg-blue-50 text-blue-800">
//                             {dayPlan.accommodation[0].hotel?.name} in {dayPlan.accommodation[0].hotel?.location?.city}
//                         </div>
//                     </div>
//                 )}
//                 {dayPlan.vehicles.length > 0 && (
//                     <div>
//                         <h4 className="font-semibold text-gray-700 flex items-center gap-2 mb-2"><Car size={18} /> Transport</h4>
//                         <div className="text-sm font-medium p-3 rounded-lg bg-green-50 text-green-800">
//                             {dayPlan.vehicles[0].numVehicles} x {dayPlan.vehicles[0].vehicleType} ({dayPlan.vehicles[0].driveType})
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {dayPlan.sightseeing.length > 0 && (
//                 <div>
//                     <h4 className="text-xl font-semibold text-gray-800 flex items-center gap-3 mb-4"><Camera size={22} /> Today's Activities</h4>
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                         {dayPlan.sightseeing.map(item => (
//                             <SightseeingCard key={item.name} item={item} />
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     </div>
//   );
// };

// const FlightInfoCard: React.FC<{ flight: Flight }> = ({ flight }) => (
//     <div className="bg-white p-4 rounded-lg shadow-sm border">
//         <div className="flex justify-between items-center mb-3">
//             <span className={`text-sm font-bold ${flight.type === 'Departure' ? 'text-blue-600' : 'text-green-600'}`}>{flight.type}</span>
//             <span className="text-xs text-gray-500">{flight.date}</span>
//         </div>
//         <div className="flex items-center text-center">
//             <div className="w-2/5">
//                 <p className="font-bold text-lg">{flight.from.city}</p>
//                 <p className="text-sm text-gray-500">{flight.from.time}</p>
//             </div>
//             <div className="w-1/5 flex justify-center text-gray-400">
//                 <Plane size={24} />
//             </div>
//             <div className="w-2/5">
//                 <p className="font-bold text-lg">{flight.to.city}</p>
//                 <p className="text-sm text-gray-500">{flight.to.time}</p>
//             </div>
//         </div>
//         <div className="text-center text-xs text-gray-400 mt-2 border-t pt-2">{flight.airline} - {flight.flightNo}</div>
//     </div>
// );

// const AccommodationInfoCard: React.FC<{ booking: AccommodationBooking }> = ({ booking }) => (
//     <div className="bg-white rounded-lg shadow-sm border overflow-hidden flex flex-col md:flex-row">
//         <img src={booking.image} alt={booking.hotelName} className="w-full md:w-1/3 h-48 md:h-auto object-cover" />
//         <div className="p-4 flex flex-col justify-between">
//             <div>
//                 <p className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full inline-block">{booking.city}</p>
//                 <h4 className="font-bold text-lg text-gray-800 mt-2">{booking.hotelName}</h4>
//             </div>
//             <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm mt-3">
//                 <span><strong>Nights:</strong> {booking.nights}</span>
//                 <span><strong>Rooms:</strong> {booking.rooms}</span>
//             </div>
//             <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm mt-3 border-t pt-3">
//                 <p><strong>Check-in:</strong> {booking.checkIn}</p>
//                 <p><strong>Check-out:</strong> {booking.checkOut}</p>
//             </div>
//         </div>
//     </div>
// );


// //================================================================//
// // 4. MAIN DASHBOARD COMPONENT
// //================================================================//
// export const ViewFinal: React.FC = () => {
//     const [itineraryData, setItineraryData] = useState<ItineraryData | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [activeDayId, setActiveDayId] = useState<string | number | null>(null);
    
//     // State for save functionality
//     const [isSaving, setIsSaving] = useState(false);
//     const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
//     const [saveMessage, setSaveMessage] = useState('');

//     useEffect(() => {
//         try {
//             const savedItineraryString = sessionStorage.getItem('editedItinerary');
//             if (!savedItineraryString) throw new Error("No itinerary data found.");

//             const sourceData = JSON.parse(savedItineraryString);
//             if (!Array.isArray(sourceData) || sourceData.length === 0) throw new Error("Invalid data format.");
            
//             const firstDay = sourceData[0];
            
//             // --- DATA MAPPING ---
//             const days: DayPlan[] = sourceData.map((day: any, index: number) => ({
//                 id: day.id,
//                 day: index + 1,
//                 date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }),
//                 title: day.title,
//                 description: day.description,
//                 image: day.image,
//                 sightseeing: day.sightseeing || [],
//                 accommodation: day.accommodation || [],
//                 vehicles: day.selectedVehicles || [],
//                 meals: day.meals || [],
//             }));
            
//             if (days.length > 0) setActiveDayId(days[0].id);

//             const mappedData: ItineraryData = {
//                 tripTitle: firstDay.title || "Your Amazing Trip",
//                 tripImage: firstDay.image || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
//                 tripDescription: firstDay.description || "An unforgettable journey awaits.",
//                 paxCount: firstDay.PricingDetails?.pricingPackages?.[0]?.priceDetails.reduce((sum: number, p: any) => sum + p.noOfPax, 0) || 0,
//                 duration: { days: sourceData.length, nights: sourceData.length > 0 ? sourceData.length - 1 : 0 },
//                 destinations: [firstDay.ArrivalandDeparture?.[0]?.fromCity, ...new Set(sourceData.map((d: any) => d.ArrivalandDeparture?.[0]?.toCity).filter(Boolean))],
//                 dayByDayItinerary: days,
//                 allFlights: firstDay.ArrivalandDeparture?.map((f: any, i: number) => ({
//                     type: i === 0 ? 'Departure' : 'Return',
//                     date: new Date(f.date).toLocaleDateString(),
//                     airline: f.airline,
//                     flightNo: f.flightNo,
//                     from: { time: f.time, city: f.fromCity },
//                     to: { time: f.time, city: f.toCity },
//                 })) || [],
//                 allAccommodations: firstDay.accommodation?.map((acc: any) => ({
//                      hotelName: acc.hotel.name,
//                      city: acc.hotel.location.city,
//                      checkIn: new Date(acc.checkInDate).toLocaleDateString(),
//                      checkOut: new Date(acc.checkOutDate).toLocaleDateString(),
//                      nights: Math.ceil((new Date(acc.checkOutDate).getTime() - new Date(acc.checkInDate).getTime()) / (1000 * 3600 * 24)),
//                      rooms: acc.numRooms,
//                      image: acc.hotel.images[0],
//                      roomDetails: acc.roomDetails,
//                 })) || [],
//                 pricing: firstDay.PricingDetails ? {
//                     packageName: firstDay.PricingDetails.pricingPackages[0].packageName,
//                     pax: firstDay.PricingDetails.pricingPackages[0].priceDetails.map((p: any) => ({
//                         paxType: p.paxType, count: p.noOfPax, costPerPerson: p.costPerPerson, totalCost: p.noOfPax * p.costPerPerson,
//                     })),
//                     totalPackageCost: firstDay.PricingDetails.pricingPackages[0].totalCost
//                 } : undefined,
//                 notes: {
//                     inclusions: firstDay['Trip Information']?.find((i: any) => i.title === "Inclusions")?.content || "",
//                     exclusions: firstDay['Trip Information']?.find((i: any) => i.title === "Exclusions")?.content || "",
//                 },
//                 cancellationPolicy: firstDay['Trip Information']?.find((i: any) => i.title === "Cancellation Policy")?.content,
//                 paymentTerms: firstDay.PricingDetails ? {
//                     terms: firstDay.PricingDetails.paymentTerms,
//                     bankDetails: firstDay.PricingDetails.bankDetails,
//                 } : undefined,
//                 contactInfo: {
//                     companyName: "Vogue Tourism LLP",
//                     email: "prashant@voguetourism.com", phone: "+91 95096 16188", website: "https://www.voguetourism.com/",
//                 }
//             };
//             setItineraryData(mappedData);
//         } catch (e: any) {
//             setError(e.message);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     const activeDayData = useMemo(() => {
//         return itineraryData?.dayByDayItinerary.find(d => d.id === activeDayId);
//     }, [activeDayId, itineraryData]);

//     const handleNavigation = (id: string) => {
//         document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     };

//     const handleSaveItinerary = async () => {
//         setIsSaving(true);
//         setSaveStatus('idle');
//         setSaveMessage('');

//         try {
//             const rawItineraryData = sessionStorage.getItem('editedItinerary');
//             if (!rawItineraryData) {
//                 throw new Error("Could not find itinerary data to save.");
//             }

//             // This would typically come from your auth context
//             const agentId = "agent-123-xyz"; 

//             const payload = {
//                 itineraryId: crypto.randomUUID(),
//                 agentId: agentId,
//                 status: "draft",
//                 createdAt: new Date().toISOString(),
//                 itineraryData: JSON.parse(rawItineraryData),
//             };

//             const response = await fetch('http://localhost:5000/api/itineraries', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(payload),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Failed to save itinerary.');
//             }

//             const result = await response.json();
//             setSaveStatus('success');
//             setSaveMessage(`Itinerary saved successfully! (ID: ${result.itineraryId})`);

//         } catch (err: any) {
//             setSaveStatus('error');
//             setSaveMessage(err.message || 'An unknown error occurred.');
//         } finally {
//             setIsSaving(false);
//         }
//     };


//     if (isLoading) return <div className="flex h-screen items-center justify-center">Loading Itinerary...</div>;
//     if (error) return <div className="flex h-screen items-center justify-center text-red-500">Error: {error}</div>;
//     if (!itineraryData) return <div className="flex h-screen items-center justify-center">No data available.</div>;

//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <div className="flex flex-col lg:flex-row">
//                 <Sidebar onNavigate={handleNavigation} onSave={handleSaveItinerary} isSaving={isSaving} />
//                 <main className="flex-1 p-4 md:p-8">
//                     {saveStatus !== 'idle' && (
//                         <div className="mb-6">
//                             <Alert 
//                                 type={saveStatus} 
//                                 message={saveMessage} 
//                                 onClose={() => setSaveStatus('idle')}
//                             />
//                         </div>
//                     )}
//                     <HeroSection title={itineraryData.tripTitle} image={itineraryData.tripImage} />
                    
//                     {/* --- Overview Section --- */}
//                     <SectionWrapper id="overview" title="Trip Overview" icon={Sun}>
//                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//                             <InfoCard icon={CalendarDays} label="Duration" value={`${itineraryData.duration.days} Days`} />
//                             <InfoCard icon={Moon} label="Nights" value={itineraryData.duration.nights} />
//                             <InfoCard icon={Users} label="Pax Count" value={itineraryData.paxCount} />
//                             <InfoCard icon={MapPin} label="Destination" value={itineraryData.destinations.slice(-1)[0]} />
//                         </div>
//                         <p className="text-gray-600 leading-relaxed bg-white p-6 rounded-lg shadow-sm border">{itineraryData.tripDescription}</p>
//                     </SectionWrapper>

//                     {/* --- Itinerary Section --- */}
//                     <SectionWrapper id="itinerary" title="Daily Itinerary" icon={CalendarDays}>
//                         <div className="flex flex-wrap gap-2 mb-6">
//                             {itineraryData.dayByDayItinerary.map(day => (
//                                 <button key={day.id} onClick={() => setActiveDayId(day.id)}
//                                     className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${activeDayId === day.id ? 'bg-[#10A4B0] text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-200'}`}>
//                                     Day {day.day}
//                                 </button>
//                             ))}
//                         </div>
//                         {activeDayData && <DayDetailCard dayPlan={activeDayData} />}
//                     </SectionWrapper>

//                     {/* --- Bookings Section --- */}
//                     <SectionWrapper id="bookings" title="Travel & Stays" icon={Plane}>
//                         <div className="space-y-8">
//                             {itineraryData.allFlights.length > 0 && (
//                                 <div>
//                                     <h3 className="text-xl font-semibold font-raleway text-gray-700 mb-4">Flight Details</h3>
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                         {itineraryData.allFlights.map((flight, i) => <FlightInfoCard key={i} flight={flight} />)}
//                                     </div>
//                                 </div>
//                             )}
//                              {itineraryData.allAccommodations.length > 0 && (
//                                 <div>
//                                     <h3 className="text-xl font-semibold font-raleway text-gray-700 mb-4">Accommodation Details</h3>
//                                     <div className="grid grid-cols-1 gap-6">
//                                         {itineraryData.allAccommodations.map((booking, i) => <AccommodationInfoCard key={i} booking={booking} />)}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </SectionWrapper>
                    
//                     {/* --- Pricing Section --- */}
//                     <SectionWrapper id="pricing" title="Pricing & Notes" icon={Wallet}>
//                         {itineraryData.pricing && (
//                           <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
//                             <h3 className="text-xl font-semibold font-raleway text-gray-700 mb-4">{itineraryData.pricing.packageName}</h3>
//                              <table className="w-full text-left text-sm">
//                                 <thead className="bg-gray-100"><tr className="border-b"><th className="p-2">Pax Type</th><th className="p-2 text-center">Count</th><th className="p-2 text-right">Cost/Person</th><th className="p-2 text-right">Total</th></tr></thead>
//                                 <tbody>
//                                   {itineraryData.pricing.pax.map(p => <tr key={p.paxType} className="border-b"><td className="p-2">{p.paxType}</td><td className="p-2 text-center">{p.count}</td><td className="p-2 text-right">₹{p.costPerPerson.toLocaleString()}</td><td className="p-2 text-right">₹{p.totalCost.toLocaleString()}</td></tr>)}
//                                 </tbody>
//                                 <tfoot><tr><td colSpan={3} className="p-2 font-bold text-right">Total Cost</td><td className="p-2 font-bold text-right text-lg text-[#10A4B0]">₹{itineraryData.pricing.totalPackageCost.toLocaleString()}</td></tr></tfoot>
//                             </table>
//                           </div>
//                         )}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                           {itineraryData.notes?.inclusions && <div className="bg-white p-6 rounded-lg shadow-sm border">
//                             <h3 className="text-xl font-semibold font-raleway text-green-700 mb-4">Inclusions</h3>
//                             <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: itineraryData.notes.inclusions }} />
//                           </div>}
//                           {itineraryData.notes?.exclusions && <div className="bg-white p-6 rounded-lg shadow-sm border">
//                             <h3 className="text-xl font-semibold font-raleway text-red-700 mb-4">Exclusions</h3>
//                             <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: itineraryData.notes.exclusions }} />
//                           </div>}
//                         </div>
//                     </SectionWrapper>
                    
//                      {/* --- Contact Section --- */}
//                     <SectionWrapper id="contact" title="Contact Us" icon={Phone}>
//                          <div className="bg-white p-6 rounded-lg shadow-sm border text-sm text-gray-700 space-y-3">
//                            <p><strong>Company:</strong> {itineraryData.contactInfo.companyName}</p>
//                            <p><strong>Email:</strong> {itineraryData.contactInfo.email}</p>
//                            <p><strong>Phone:</strong> {itineraryData.contactInfo.phone}</p>
//                            <p><strong>Website:</strong> <a href={itineraryData.contactInfo.website} className="text-[#10A4B0] underline">{itineraryData.contactInfo.website}</a></p>
//                          </div>
//                     </SectionWrapper>
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default ViewFinal;

