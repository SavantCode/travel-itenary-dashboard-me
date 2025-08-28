// import React, { useState, useEffect, useCallback } from 'react';

// //-=================================-//
// //-============[ ICONS ]============-//
// //-=================================-//

// const SearchIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
//   </svg>
// );

// const ChevronDownIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
//   </svg>
// );

// const CalendarIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M5.25 12h13.5" />
//     </svg>
// );

// const StarIcon = ({ filled }: { filled: boolean }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? "#FFC107" : "none"} stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-yellow-500">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
//   </svg>
// );

// const TrashIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600 hover:text-red-500">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
//     </svg>
// );

// const MoreHorizontalIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//     </svg>
// );

// const PlusIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//     </svg>
// );

// const MinusIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
//     </svg>
// );

// //-=================================-//
// //-========[ DATA & TYPES ]=========//
// //-=================================-//

// interface Hotel {
//   id: number;
//   name: string;
//   location: {
//     country: string;
//     city: string;
//   };
//   rating: number;
//   images: string[];
//   price_per_night: number;
//   available_rooms: number;
//   amenities: string[];
//   description: string;
// }

// interface RoomDetails {
//   roomType: string;
//   mealType: string;
// }

// interface BookedHotel {
//   id: string;
//   hotel: Hotel;
//   numRooms: number;
//   checkInDate: string;
//   checkOutDate: string;
//   roomDetails: RoomDetails[];
//   remark: string;
//   bookedAt: string;
// }

// interface BookingResult {
//   bookings: BookedHotel[];
//   totalHotels: number;
//   totalRooms: number;
//   summary: string;
// }

// // Mock hotel data for demo purposes (when API is unavailable)
// const mockHotels: Hotel[] = [
//   {
//     id: 1,
//     name: "Grand Plaza Hotel",
//     location: { country: "India", city: "Delhi" },
//     rating: 4,
//     images: ["https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400"],
//     price_per_night: 150,
//     available_rooms: 20,
//     amenities: ["WiFi", "Pool", "Gym"],
//     description: "Luxury hotel in the heart of Delhi"
//   },
//   {
//     id: 2,
//     name: "Ocean View Resort",
//     location: { country: "India", city: "Goa" },
//     rating: 5,
//     images: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400"],
//     price_per_night: 200,
//     available_rooms: 15,
//     amenities: ["Beach Access", "Spa", "Restaurant"],
//     description: "Beachfront resort with stunning ocean views"
//   },
//   {
//     id: 3,
//     name: "Mountain View Lodge",
//     location: { country: "India", city: "Manali" },
//     rating: 4,
//     images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400"],
//     price_per_night: 120,
//     available_rooms: 25,
//     amenities: ["Mountain Views", "Fireplace", "Hiking"],
//     description: "Cozy lodge with beautiful mountain scenery"
//   },
//   {
//     id: 4,
//     name: "City Center Hotel",
//     location: { country: "USA", city: "New York" },
//     rating: 4,
//     images: ["https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?w=400"],
//     price_per_night: 300,
//     available_rooms: 50,
//     amenities: ["Business Center", "WiFi", "Restaurant"],
//     description: "Modern hotel in downtown Manhattan"
//   },
//   {
//     id: 5,
//     name: "Sunset Beach Hotel",
//     location: { country: "Thailand", city: "Phuket" },
//     rating: 5,
//     images: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400"],
//     price_per_night: 180,
//     available_rooms: 30,
//     amenities: ["Beach Access", "Pool", "Spa", "Restaurant"],
//     description: "Beautiful beachfront hotel with sunset views"
//   }
// ];

// const roomTypeOptions = ['Standard', 'Deluxe', 'Suite', 'Family Room', 'Presidential Suite', 'Executive Room'];
// const mealTypeOptions = ['Room Only', 'Breakfast', 'Half Board', 'Full Board', 'All Inclusive'];

// //-=================================-//
// //-======[ MAIN COMPONENT ]=========//
// //-=================================-//

// const Accommodation: React.FC = () => {
//     // State for API data and filters
//     const [allHotels, setAllHotels] = useState<Hotel[]>(mockHotels);
//     const [cityFilter, setCityFilter] = useState('');
//     const [countryFilter, setCountryFilter] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     // State for search and hotel selection
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
//     const [availableHotels, setAvailableHotels] = useState<Hotel[]>([]);
    
//     // State for current booking form
//     const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
//     const [numRooms, setNumRooms] = useState(1);
//     const [checkInDate, setCheckInDate] = useState('');
//     const [checkOutDate, setCheckOutDate] = useState('');
//     const [roomDetails, setRoomDetails] = useState<RoomDetails[]>([{ roomType: 'Standard', mealType: 'Breakfast' }]);
//     const [remark, setRemark] = useState('');

//     // State for managing multiple hotel bookings
//     const [bookedHotels, setBookedHotels] = useState<BookedHotel[]>([]);
//     const [showBookingResult, setShowBookingResult] = useState(false);
//     const [bookingResult, setBookingResult] = useState<BookingResult | null>(null);

//     // Get today's date for minimum date validation
//     const today = new Date().toISOString().split('T')[0];

//     /**
//      * Fetches hotels from API or shows available hotels based on filters
//      */
//     const fetchHotels = useCallback(async () => {
//         if (!countryFilter && !cityFilter) {
//             setAvailableHotels([]);
//             return;
//         }

//         setIsLoading(true);
//         setError(null);

//         try {
//             // Try API first, fallback to mock data
//             const params = new URLSearchParams();
//             if (countryFilter) params.append('country', countryFilter);
//             if (cityFilter) params.append('city', cityFilter);
            
//             try {
//                 const response = await fetch(`http://localhost:5000/api/hotels?${params.toString()}`);
//                 if (!response.ok) throw new Error('API not available');
//                 const data: Hotel[] = await response.json();
//                 setAllHotels(data);
//             } catch {
//                 // Fallback to mock data with filtering
//                 const filtered = mockHotels.filter(hotel => {
//                     const countryMatch = !countryFilter || 
//                         hotel.location.country.toLowerCase().includes(countryFilter.toLowerCase());
//                     const cityMatch = !cityFilter || 
//                         hotel.location.city.toLowerCase().includes(cityFilter.toLowerCase());
//                     return countryMatch && cityMatch;
//                 });
//                 setAllHotels(filtered);
//             }
            
//             // Set available hotels for display
//             const filtered = allHotels.filter(hotel => {
//                 const countryMatch = !countryFilter || 
//                     hotel.location.country.toLowerCase().includes(countryFilter.toLowerCase());
//                 const cityMatch = !cityFilter || 
//                     hotel.location.city.toLowerCase().includes(cityFilter.toLowerCase());
//                 return countryMatch && cityMatch;
//             });
            
//             setAvailableHotels(filtered);
            
//         } catch (err) {
//             setError('Failed to load hotels. Using demo data.');
//             setAvailableHotels(mockHotels);
//         } finally {
//             setIsLoading(false);
//         }
//     }, [countryFilter, cityFilter, allHotels]);

//     useEffect(() => {
//         fetchHotels();
//     }, [countryFilter, cityFilter]);

//     /**
//      * Client-side search filtering
//      */
//     useEffect(() => {
//         if (searchQuery.trim() === '') {
//             setFilteredHotels([]);
//         } else {
//             const lowercasedQuery = searchQuery.toLowerCase();
//             const results = availableHotels.filter(
//                 (hotel) => hotel.name.toLowerCase().includes(lowercasedQuery)
//             );
//             setFilteredHotels(results);
//         }
//     }, [searchQuery, availableHotels]);

//     /**
//      * Update room details when number of rooms changes
//      */
//     useEffect(() => {
//         setRoomDetails((prevDetails) => {
//             const newDetails = [...prevDetails];
//             while (newDetails.length < numRooms) {
//                 newDetails.push({ roomType: 'Standard', mealType: 'Breakfast' });
//             }
//             return newDetails.slice(0, numRooms);
//         });
//     }, [numRooms]);

//     /**
//      * Handle hotel selection
//      */
//     const handleSelectHotel = (hotel: Hotel) => {
//         setSelectedHotel(hotel);
//         setSearchQuery('');
//         setFilteredHotels([]);
//     };

//     /**
//      * Add/Remove rooms with unlimited capability
//      */
//     const addRoom = () => {
//         setNumRooms(prev => prev + 1);
//     };

//     const removeRoom = () => {
//         if (numRooms > 1) {
//             setNumRooms(prev => prev - 1);
//         }
//     };

//     /**
//      * Update room details
//      */
//     const updateRoomDetail = (index: number, field: keyof RoomDetails, value: string) => {
//         const newDetails = [...roomDetails];
//         newDetails[index] = { ...newDetails[index], [field]: value };
//         setRoomDetails(newDetails);
//     };

//     /**
//      * Add current hotel to bookings
//      */
//     const addToBookings = () => {
//         if (!selectedHotel || !checkInDate || !checkOutDate) {
//             alert('Please fill in all required fields.');
//             return;
//         }

//         if (new Date(checkInDate) >= new Date(checkOutDate)) {
//             alert('Check-out date must be after check-in date.');
//             return;
//         }

//         const booking: BookedHotel = {
//             id: `booking-${Date.now()}-${Math.random()}`,
//             hotel: selectedHotel,
//             numRooms,
//             checkInDate,
//             checkOutDate,
//             roomDetails: [...roomDetails],
//             remark,
//             bookedAt: new Date().toISOString()
//         };

//         setBookedHotels(prev => [...prev, booking]);
        
//         // Clear current form
//         setSelectedHotel(null);
//         setSearchQuery('');
//         setNumRooms(1);
//         setCheckInDate('');
//         setCheckOutDate('');
//         setRoomDetails([{ roomType: 'Standard', mealType: 'Breakfast' }]);
//         setRemark('');

//         alert(`Hotel "${selectedHotel.name}" added to bookings!`);
//     };

//     /**
//      * Remove booking
//      */
//     const removeBooking = (bookingId: string) => {
//         setBookedHotels(prev => prev.filter(booking => booking.id !== bookingId));
//     };

//     /**
//      * Final submission - generate JSON result
//      */
//     const finalSubmit = () => {
//         if (bookedHotels.length === 0) {
//             alert('Please add at least one hotel booking before final submission.');
//             return;
//         }

//         const result: BookingResult = {
//             bookings: bookedHotels,
//             totalHotels: bookedHotels.length,
//             totalRooms: bookedHotels.reduce((sum, booking) => sum + booking.numRooms, 0),
//             summary: `Successfully booked ${bookedHotels.length} hotel(s) with a total of ${bookedHotels.reduce((sum, booking) => sum + booking.numRooms, 0)} room(s)`
//         };

//         setBookingResult(result);
//         setShowBookingResult(true);
//         console.log('Final Booking Result:', JSON.stringify(result, null, 2));
//     };

//     /**
//      * Clear all data
//      */
//     const handleDelete = () => {
//         setSelectedHotel(null);
//         setSearchQuery('');
//         setNumRooms(1);
//         setCheckInDate('');
//         setCheckOutDate('');
//         setRoomDetails([{ roomType: 'Standard', mealType: 'Breakfast' }]);
//         setRemark('');
//         setBookedHotels([]);
//         setBookingResult(null);
//         setShowBookingResult(false);
//         alert('All data cleared!');
//     };

//     /**
//      * Calculate days between dates
//      */
//     const calculateNights = (checkIn: string, checkOut: string) => {
//         const start = new Date(checkIn);
//         const end = new Date(checkOut);
//         const diffTime = Math.abs(end.getTime() - start.getTime());
//         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//         return diffDays > 0 ? diffDays : 0;
//     };

//     return (
//         <div className="bg-[#F6F6FA] min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
//             <div className="max-w-7xl mx-auto">
//                 <h1 className="text-2xl font-semibold text-[#10A4B0] mb-2">Accommodation Booking System*</h1>
//                 <hr className="border-gray-300 mb-6" />

//                 {/* Show booking result if available */}
//                 {showBookingResult && bookingResult && (
//                     <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
//                         <h2 className="text-xl font-semibold text-green-800 mb-4">Booking Successful!</h2>
//                         <div className="bg-white p-4 rounded-md">
//                             <h3 className="font-medium mb-2">Booking Summary:</h3>
//                             <p className="text-sm text-gray-600 mb-4">{bookingResult.summary}</p>
//                             <div className="bg-gray-100 p-3 rounded text-xs overflow-auto">
//                                 <pre>{JSON.stringify(bookingResult, null, 2)}</pre>
//                             </div>
//                         </div>
//                         <button 
//                             onClick={() => setShowBookingResult(false)}
//                             className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                         >
//                             Continue Booking
//                         </button>
//                     </div>
//                 )}

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     {/* Main Content */}
//                     <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-4 sm:p-6 space-y-6">
//                         {/* Search Section */}
//                         <div>
//                             <h3 className="text-sm font-medium text-gray-800 mb-2">Search Hotels</h3>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//                                 <div>
//                                     <label className="text-xs font-medium text-gray-700 block mb-1">Country</label>
//                                     <input 
//                                         type="text" 
//                                         value={countryFilter} 
//                                         onChange={(e) => setCountryFilter(e.target.value)} 
//                                         placeholder="e.g., India, USA, Thailand" 
//                                         className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent" 
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="text-xs font-medium text-gray-700 block mb-1">City</label>
//                                     <input 
//                                         type="text" 
//                                         value={cityFilter} 
//                                         onChange={(e) => setCityFilter(e.target.value)} 
//                                         placeholder="e.g., Delhi, New York, Phuket" 
//                                         className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent" 
//                                     />
//                                 </div>
//                             </div>

//                             {/* Available Hotels Display */}
//                             {availableHotels.length > 0 && (
//                                 <div className="mb-4">
//                                     <h4 className="text-sm font-medium text-gray-700 mb-2">Available Hotels ({availableHotels.length})</h4>
//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-40 overflow-y-auto">
//                                         {availableHotels.map((hotel) => (
//                                             <div 
//                                                 key={hotel.id} 
//                                                 onClick={() => handleSelectHotel(hotel)}
//                                                 className="p-3 border border-gray-200 rounded-lg hover:border-[#10A4B0] cursor-pointer transition-colors flex items-center gap-3"
//                                             >
//                                                 <img 
//                                                     src={hotel.images[0]} 
//                                                     alt={hotel.name} 
//                                                     className="w-12 h-12 object-cover rounded" 
//                                                     onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=100'; }} 
//                                                 />
//                                                 <div className="flex-1 min-w-0">
//                                                     <p className="font-medium text-sm truncate">{hotel.name}</p>
//                                                     <p className="text-xs text-gray-500">{hotel.location.city}, {hotel.location.country}</p>
//                                                     <div className="flex items-center mt-1">
//                                                         {Array.from({ length: 5 }).map((_, i) => (
//                                                             <StarIcon key={i} filled={i < hotel.rating} />
//                                                         ))}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Hotel Name Search */}
//                             <div className="relative">
//                                 <label className="text-xs font-medium text-gray-700 block mb-1">Search by Hotel Name</label>
//                                 <div className="relative">
//                                     <input 
//                                         type="text" 
//                                         value={searchQuery} 
//                                         onChange={(e) => setSearchQuery(e.target.value)} 
//                                         placeholder="Type hotel name to search..." 
//                                         className="w-full pl-10 pr-10 py-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"
//                                     />
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <SearchIcon />
//                                     </div>
//                                 </div>
//                                 {filteredHotels.length > 0 && (
//                                     <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
//                                         {filteredHotels.map((hotel) => (
//                                             <div 
//                                                 key={hotel.id} 
//                                                 onClick={() => handleSelectHotel(hotel)} 
//                                                 className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-4"
//                                             >
//                                                 <img 
//                                                     src={hotel.images[0]} 
//                                                     alt={hotel.name} 
//                                                     className="w-16 h-16 object-cover rounded-md" 
//                                                     onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=100'; }} 
//                                                 />
//                                                 <div>
//                                                     <p className="font-semibold">{hotel.name}</p>
//                                                     <p className="text-sm text-gray-500">{hotel.location.city}, {hotel.location.country}</p>
//                                                     <div className="flex items-center mt-1">
//                                                         {Array.from({ length: 5 }).map((_, i) => (
//                                                             <StarIcon key={i} filled={i < hotel.rating} />
//                                                         ))}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Loading and Error States */}
//                         {isLoading && <p className="text-center text-gray-500">Loading hotels...</p>}
//                         {error && <p className="text-center text-orange-600">{error}</p>}

//                         {/* Selected Hotel Display */}
//                         {selectedHotel && (
//                             <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
//                                 <div className="flex items-center gap-4">
//                                     <img 
//                                         src={selectedHotel.images[0]} 
//                                         alt={selectedHotel.name} 
//                                         className="w-24 h-24 object-cover rounded-md" 
//                                         onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=100'; }}
//                                     />
//                                     <div className="flex-1">
//                                         <p className="font-bold text-lg">{selectedHotel.name}</p>
//                                         <p className="text-sm text-gray-600">{selectedHotel.location.city}, {selectedHotel.location.country}</p>
//                                         <div className="flex items-center mt-1">
//                                             {Array.from({ length: 5 }).map((_, i) => (
//                                                 <StarIcon key={i} filled={i < selectedHotel.rating} />
//                                             ))}
//                                         </div>
//                                         <p className="text-sm text-gray-600 mt-1">${selectedHotel.price_per_night}/night</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         <hr className="border-gray-200" />

//                         {/* Room Details Section */}
//                         <div>
//                             <h3 className="text-sm font-medium text-gray-800 mb-4">Booking Details</h3>
//                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
//                                 <div>
//                                     <label className="text-xs font-medium text-gray-700 block mb-1">Number of Rooms</label>
//                                     <div className="flex items-center gap-2">
//                                         <button 
//                                             onClick={removeRoom}
//                                             disabled={numRooms <= 1}
//                                             className="p-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                                         >
//                                             <MinusIcon />
//                                         </button>
//                                         <input 
//                                             type="number" 
//                                             min="1"
//                                             value={numRooms} 
//                                             onChange={(e) => setNumRooms(Math.max(1, parseInt(e.target.value) || 1))} 
//                                             className="w-20 p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 text-center"
//                                         />
//                                         <button 
//                                             onClick={addRoom}
//                                             className="p-1 border border-gray-300 rounded hover:bg-gray-100"
//                                         >
//                                             <PlusIcon />
//                                         </button>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label className="text-xs font-medium text-gray-700 block mb-1">Check In</label>
//                                     <div className="relative">
//                                         <input 
//                                             type="date" 
//                                             min={today}
//                                             value={checkInDate} 
//                                             onChange={e => setCheckInDate(e.target.value)} 
//                                             className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 pr-8" 
//                                         />
//                                         <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
//                                             <CalendarIcon />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label className="text-xs font-medium text-gray-700 block mb-1">Check Out</label>
//                                     <div className="relative">
//                                         <input 
//                                             type="date" 
//                                             min={checkInDate || today}
//                                             value={checkOutDate} 
//                                             onChange={e => setCheckOutDate(e.target.value)} 
//                                             className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 pr-8" 
//                                         />
//                                         <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
//                                             <CalendarIcon />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Room Specific Details */}
//                         <div className="space-y-4">
//                             <h4 className="text-sm font-medium text-gray-800">Room Configuration</h4>
//                             {Array.from({ length: numRooms }).map((_, index) => (
//                                 <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
//                                     <div className="sm:col-span-3">
//                                         <p className="text-xs font-medium text-gray-800 mb-2">Room {index + 1}</p>
//                                     </div>
//                                     <div>
//                                         <label className="text-xs font-medium text-gray-700 block mb-1">Room Type</label>
//                                         <select 
//                                             value={roomDetails[index]?.roomType || 'Standard'} 
//                                             onChange={(e) => updateRoomDetail(index, 'roomType', e.target.value)} 
//                                             className="w-full p-2 bg-white rounded-md text-sm border border-gray-200"
//                                         >
//                                             {roomTypeOptions.map(type => (
//                                                 <option key={type} value={type}>{type}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                     <div>
//                                         <label className="text-xs font-medium text-gray-700 block mb-1">Meal Type</label>
//                                         <select 
//                                             value={roomDetails[index]?.mealType || 'Breakfast'} 
//                                             onChange={(e) => updateRoomDetail(index, 'mealType', e.target.value)} 
//                                             className="w-full p-2 bg-white rounded-md text-sm border border-gray-200"
//                                         >
//                                             {mealTypeOptions.map(type => (
//                                                 <option key={type} value={type}>{type}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         <hr className="border-gray-200" />

//                         {/* Remarks Section */}
//                         <div>
//                             <div className="flex justify-between items-center mb-2">
//                                 <h3 className="text-sm font-medium text-gray-800">Additional Remarks</h3>
//                             </div>
//                             <textarea 
//                                 value={remark} 
//                                 onChange={(e) => setRemark(e.target.value)} 
//                                 placeholder="Enter any special requests or remarks..." 
//                                 className="w-full h-24 p-3 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent" 
//                             />
//                         </div>

//                         <hr className="border-gray-200" />

//                         {/* Action Buttons */}
//                         <div className="flex justify-center gap-4 flex-wrap">
//                             <button 
//                                 onClick={handleDelete} 
//                                 className="px-8 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md font-semibold text-sm hover:bg-gray-200 transition-colors"
//                             >
//                                 Clear All
//                             </button>
//                             <button 
//                                 onClick={addToBookings} 
//                                 disabled={!selectedHotel}
//                                 className="px-8 py-2 bg-blue-600 text-white rounded-md font-semibold text-sm hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//                             >
//                                 Add to Booking
//                             </button>
//                             <button 
//                                 onClick={finalSubmit} 
//                                 disabled={bookedHotels.length === 0}
//                                 className="px-8 py-2 bg-[#10A4B0] text-white rounded-md font-semibold text-sm hover:bg-[#0d8a95] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//                             >
//                                 Final Submit ({bookedHotels.length})
//                             </button>
//                         </div>
//                     </div>

//                     {/* Right Sidebar */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white border border-gray-200 rounded-lg">
//                             <div className="p-4 border-b border-gray-200">
//                                 <h2 className="text-xl font-semibold text-gray-600">Booking Summary</h2>
//                             </div>
//                             <div className="p-4 space-y-4">
//                                 {/* Current Selection */}
//                                 {selectedHotel && (
//                                     <div className="border border-gray-200 rounded-lg">
//                                         <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
//                                             <h3 className="font-semibold">Current Selection</h3>
//                                         </div>
//                                         <div className="p-4 space-y-3">
//                                             <div>
//                                                 <p className="font-bold">{selectedHotel.name}</p>
//                                                 <div className="flex items-center">
//                                                     {Array.from({ length: 5 }).map((_, i) => (
//                                                         <StarIcon key={i} filled={i < selectedHotel.rating} />
//                                                     ))}
//                                                 </div>
//                                                 <p className="text-sm text-gray-600">{selectedHotel.location.city}, {selectedHotel.location.country}</p>
//                                                 <p className="text-sm font-medium">{numRooms} Room(s)</p>
//                                             </div>
//                                             {checkInDate && checkOutDate && (
//                                                 <>
//                                                     <hr />
//                                                     <div className="flex justify-between items-center text-sm">
//                                                         <div>
//                                                             <p className="text-gray-600">Check In:</p>
//                                                             <p className="font-bold">{new Date(checkInDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
//                                                         </div>
//                                                         <div className="flex items-center">
//                                                             <div className="w-16 h-px bg-blue-600"></div>
//                                                             <div className="bg-blue-600 text-white text-xs rounded-full h-6 w-8 flex items-center justify-center font-bold">
//                                                                 {calculateNights(checkInDate, checkOutDate)}N
//                                                             </div>
//                                                             <div className="w-16 h-px bg-blue-600"></div>
//                                                         </div>
//                                                         <div className="text-right">
//                                                             <p className="text-gray-600">Check Out:</p>
//                                                             <p className="font-bold">{new Date(checkOutDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
//                                                         </div>
//                                                     </div>
//                                                 </>
//                                             )}
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* Booked Hotels */}
//                                 {bookedHotels.length > 0 && (
//                                     <div>
//                                         <h3 className="font-semibold text-gray-800 mb-3">Booked Hotels ({bookedHotels.length})</h3>
//                                         <div className="space-y-3 max-h-96 overflow-y-auto">
//                                             {bookedHotels.map((booking, index) => (
//                                                 <div key={booking.id} className="border border-gray-200 rounded-lg">
//                                                     <div className="bg-[#10A4B0] text-white p-3 rounded-t-lg flex justify-between items-center">
//                                                         <h4 className="font-semibold text-sm">Booking #{index + 1}</h4>
//                                                         <button 
//                                                             onClick={() => removeBooking(booking.id)}
//                                                             className="text-white hover:text-red-200"
//                                                         >
//                                                             <TrashIcon />
//                                                         </button>
//                                                     </div>
//                                                     <div className="p-3 space-y-2">
//                                                         <div>
//                                                             <p className="font-bold text-sm">{booking.hotel.name}</p>
//                                                             <div className="flex items-center">
//                                                                 {Array.from({ length: 5 }).map((_, i) => (
//                                                                     <StarIcon key={i} filled={i < booking.hotel.rating} />
//                                                                 ))}
//                                                             </div>
//                                                             <p className="text-xs text-gray-600">{booking.hotel.location.city}, {booking.hotel.location.country}</p>
//                                                             <p className="text-xs font-medium">{booking.numRooms} Room(s)</p>
//                                                         </div>
//                                                         <hr />
//                                                         <div className="flex justify-between text-xs">
//                                                             <div>
//                                                                 <p className="text-gray-600">Check In:</p>
//                                                                 <p className="font-medium">{new Date(booking.checkInDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
//                                                             </div>
//                                                             <div className="flex items-center">
//                                                                 <div className="w-8 h-px bg-[#10A4B0]"></div>
//                                                                 <div className="bg-[#10A4B0] text-white text-xs rounded-full h-5 w-6 flex items-center justify-center font-bold">
//                                                                     {calculateNights(booking.checkInDate, booking.checkOutDate)}N
//                                                                 </div>
//                                                                 <div className="w-8 h-px bg-[#10A4B0]"></div>
//                                                             </div>
//                                                             <div className="text-right">
//                                                                 <p className="text-gray-600">Check Out:</p>
//                                                                 <p className="font-medium">{new Date(booking.checkOutDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                         <div className="mt-4 p-3 bg-gray-100 rounded-lg">
//                                             <p className="text-sm font-medium text-gray-800">
//                                                 Total: {bookedHotels.length} Hotel(s), {bookedHotels.reduce((sum, booking) => sum + booking.numRooms, 0)} Room(s)
//                                             </p>
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* Empty State */}
//                                 {!selectedHotel && bookedHotels.length === 0 && (
//                                     <div className="text-center text-gray-500 p-8">
//                                         <p>No hotels selected.</p>
//                                         <p className="text-sm">Search and select hotels to start booking.</p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Accommodation;


























//.......................................................................................................................................................

// import React, { useState, useEffect, useCallback } from 'react';

// //-=================================-//
// //-============[ ICONS ]============-//
// //-=================================-//

// // Simple SVG icon components used in the UI.
// const SearchIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
//   </svg>
// );

// const ChevronDownIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
//   </svg>
// );

// const CalendarIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h22.5" />
//     </svg>
// );

// const StarIcon = ({ filled }: { filled: boolean }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? "#FFC107" : "none"} stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-yellow-500">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
//   </svg>
// );

// const TrashIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600 hover:text-red-500">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
//     </svg>
// );

// const MoreHorizontalIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//     </svg>
// );


// //-=================================-//
// //-========[ DATA & TYPES ]=========//
// //-=================================-//

// // Interface for a single hotel object, matching the backend structure.
// interface Hotel {
//   id: number;
//   name: string;
//   location: {
//     country: string;
//     city: string;
//   };
//   rating: number;
//   images: string[];
//   // Adding other fields from your backend data for completeness
//   price_per_night: number;
//   available_rooms: number;
//   amenities: string[];
//   description: string;
// }

// // Interface for details of a single room.
// interface RoomDetails {
//   roomType: string;
//   mealType: string;
// }

// // Options for various dropdowns in the form.
// const roomCountOptions = [1, 2, 3, 4, 5];
// const roomTypeOptions = ['Standard', 'Deluxe', 'Suite', 'Family Room'];
// const mealTypeOptions = ['Room Only', 'Breakfast', 'Half Board', 'Full Board'];


// //-=================================-//
// //-======[ MAIN COMPONENT ]=========//
// //-=================================-//

// /**
//  * Accommodation component that allows users to search for hotels,
//  * add room details, and view a summary.
//  */
// const Accommodation: React.FC = () => {
//     // State for API data and filters
//     const [allHotels, setAllHotels] = useState<Hotel[]>([]);
//     const [cityFilter, setCityFilter] = useState('');
//     const [countryFilter, setCountryFilter] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     // State for the search query and filtered results for the dropdown.
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
    
//     // State for the main form data
//     const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
//     const [numRooms, setNumRooms] = useState(1);
//     const [checkInDate, setCheckInDate] = useState('2024-02-18');
//     const [checkOutDate, setCheckOutDate] = useState('2024-02-20');
//     const [roomDetails, setRoomDetails] = useState<RoomDetails[]>([{ roomType: 'Standard', mealType: 'Breakfast' }]);
//     const [remark, setRemark] = useState('');

//     /**
//      * Fetches hotels from the backend API based on current filters.
//      */
//     const fetchHotels = useCallback(async () => {
//         setIsLoading(true);
//         setError(null);
//         console.log(`Fetching hotels with Country: '${countryFilter}', City: '${cityFilter}'`);

//         // Construct query parameters
//         const params = new URLSearchParams();
//         if (countryFilter) params.append('country', countryFilter);
//         if (cityFilter) params.append('city', cityFilter);
        
//         try {
//             // Assuming the backend is running on port 5000
//             const response = await fetch(`http://localhost:5000/api/hotels?${params.toString()}`);
//             if (!response.ok) {
//                 throw new Error(`Network response was not ok (${response.status})`);
//             }
//             const data: Hotel[] = await response.json();
//             console.log('API Response:', data);
//             setAllHotels(data);
//             if (data.length > 0) {
//                 // If there's no selected hotel OR the selected one is not in the new list, select the first one.
//                 const isSelectedHotelInList = selectedHotel && data.some(h => h.id === selectedHotel.id);
//                 if (!isSelectedHotelInList) {
//                     setSelectedHotel(data[0]);
//                 }
//             } else {
//                 setSelectedHotel(null);
//             }
//         } catch (err) {
//             console.error('Failed to fetch hotels:', err);
//             setError('Failed to load hotel data. Ensure the backend server is running and allows CORS requests.');
//             setAllHotels([]);
//         } finally {
//             setIsLoading(false);
//         }
//     }, [countryFilter, cityFilter]); // FIX: Removed selectedHotel from dependencies to prevent infinite loops.

//     // Effect to fetch hotels when filters change.
//     useEffect(() => {
//         fetchHotels();
//     }, [fetchHotels]);


//     /**
//      * Effect to perform client-side filtering for the search dropdown
//      * based on the `searchQuery` and the `allHotels` list from the API.
//      */
//     useEffect(() => {
//         if (searchQuery.trim() === '') {
//             setFilteredHotels([]);
//         } else {
//             const lowercasedQuery = searchQuery.toLowerCase();
//             const results = allHotels.filter(
//                 (hotel) => hotel.name.toLowerCase().includes(lowercasedQuery)
//             );
//             setFilteredHotels(results);
//         }
//     }, [searchQuery, allHotels]);

//     /**
//      * Effect to update the roomDetails array when the number of rooms changes.
//      */
//     useEffect(() => {
//         setRoomDetails((prevDetails) => {
//             const newDetails = [...prevDetails];
//             while (newDetails.length < numRooms) {
//                 newDetails.push({ roomType: 'Standard', mealType: 'Breakfast' });
//             }
//             return newDetails.slice(0, numRooms);
//         });
//     }, [numRooms]);

//     /**
//      * Handles selecting a hotel from the search results dropdown.
//      */
//     const handleSelectHotel = (hotel: Hotel) => {
//         console.log('Selected hotel:', hotel);
//         setSelectedHotel(hotel);
//         setSearchQuery(''); // Clear search query to hide dropdown and show selected hotel card
//         setFilteredHotels([]);
//     };
    
//     const handleSubmit = () => {
//         if (!selectedHotel || !checkInDate || !checkOutDate) {
//             alert('Please fill in all required fields.');
//             return;
//         }
//         const submissionData = { hotel: selectedHotel, rooms: numRooms, checkIn: checkInDate, checkOut: checkOutDate, roomDetails, remark };
//         console.log('Form Submitted:', submissionData);
//         alert('Accommodation details submitted! Check the console for the data.');
//     };

//     const handleDelete = () => {
//         setSelectedHotel(null);
//         setSearchQuery('');
//         setNumRooms(1);
//         setCheckInDate('');
//         setCheckOutDate('');
//         setRoomDetails([{ roomType: 'Standard', mealType: 'Breakfast' }]);
//         setRemark('');
//         alert('Form cleared!');
//     };

//     return (
//         <div className="bg-[#F6F6FA] min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
//             <div className="max-w-7xl mx-auto">
//                 <h1 className="text-2xl font-semibold text-[#10A4B0] mb-2">Accommodation*</h1>
//                 <hr className="border-gray-300 mb-6" />

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     {/* Main Content: Search and Details Form */}
//                     <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-4 sm:p-6 space-y-6">
//                         {/* Filters and Search Section */}
//                         <div>
//                              <h3 className="text-sm font-medium text-gray-800 mb-2">Search Accommodation from database</h3>
//                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//                                 <div>
//                                     <label htmlFor="country-filter" className="text-xs font-medium text-gray-700 block mb-1">Country</label>
//                                     <input id="country-filter" type="text" value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} placeholder="e.g., India" className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200" />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="city-filter" className="text-xs font-medium text-gray-700 block mb-1">City</label>
//                                     <input id="city-filter" type="text" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} placeholder="e.g., Delhi" className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200" />
//                                 </div>
//                              </div>
//                             <div className="relative">
//                                 <label htmlFor="search-accommodation" className="text-xs font-medium text-gray-700 block mb-1">
//                                     Hotel Name
//                                 </label>
//                                 <div className="relative">
//                                     <input id="search-accommodation" type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by hotel name..." className="w-full pl-10 pr-10 py-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/>
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><SearchIcon /></div>
//                                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center"><ChevronDownIcon /></div>
//                                 </div>
//                                 {filteredHotels.length > 0 && (
//                                     <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
//                                         {filteredHotels.map((hotel) => (
//                                             <div key={hotel.id} onClick={() => handleSelectHotel(hotel)} className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-4">
//                                                 <img src={hotel.images[0]} alt={hotel.name} className="w-16 h-16 object-cover rounded-md" onError={(e) => { e.currentTarget.src = 'https://placehold.co/64x64/EEE/31343C?text=No+Image'; }} />
//                                                 <div>
//                                                     <p className="font-semibold">{hotel.name}</p>
//                                                     <p className="text-sm text-gray-500">{hotel.location.city}, {hotel.location.country}</p>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Loading and Error States */}
//                         {isLoading && <p className="text-center text-gray-500">Loading hotels...</p>}
//                         {error && <p className="text-center text-red-500">{error}</p>}

//                         {/* Selected Hotel Display */}
//                         {selectedHotel && !searchQuery && (
//                              <div className="p-3 border border-gray-200 rounded-lg flex items-center gap-4">
//                                 <img src={selectedHotel.images[0]} alt={selectedHotel.name} className="w-24 h-24 object-cover rounded-md" onError={(e) => { e.currentTarget.src = 'https://placehold.co/96x96/EEE/31343C?text=No+Image'; }}/>
//                                 <div>
//                                     <p className="font-bold text-lg">{selectedHotel.name}</p>
//                                     <p className="text-sm text-gray-600">{selectedHotel.location.city}, {selectedHotel.location.country}</p>
//                                     <div className="flex items-center mt-1">
//                                         {Array.from({ length: 5 }).map((_, i) => (
//                                             <StarIcon key={i} filled={i < selectedHotel.rating} />
//                                         ))}
//                                     </div>
//                                     <a href="#" className="text-sm text-blue-600 underline mt-1 block">View on Map</a>
//                                 </div>
//                             </div>
//                         )}

//                         <hr className="border-gray-200" />

//                         {/* Add Room Details Section */}
//                         <div>
//                             <h3 className="text-sm font-medium text-gray-800 mb-4">Add Room Details</h3>
//                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                                 <div>
//                                     <label className="text-xs font-medium text-gray-700 block mb-1">No. of Rooms</label>
//                                     <select value={numRooms} onChange={(e) => setNumRooms(parseInt(e.target.value))} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200">
//                                         {roomCountOptions.map(count => <option key={count} value={count}>{count}</option>)}
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="text-xs font-medium text-gray-700 block mb-1">Check In</label>
//                                     <div className="relative">
//                                         <input type="date" value={checkInDate} onChange={e => setCheckInDate(e.target.value)} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 pr-8" />
//                                         <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none"><CalendarIcon /></div>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label className="text-xs font-medium text-gray-700 block mb-1">Check Out</label>
//                                     <div className="relative">
//                                         <input type="date" value={checkOutDate} onChange={e => setCheckOutDate(e.target.value)} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 pr-8" />
//                                         <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none"><CalendarIcon /></div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                          {/* Room Specific Details */}
//                         <div className="space-y-4">
//                             {Array.from({ length: numRooms }).map((_, index) => (
//                                 <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
//                                     <p className="text-xs font-medium text-gray-800 sm:col-span-1">Room {index + 1} :</p>
//                                     <div className="sm:col-span-1">
//                                         <label className="text-xs font-medium text-gray-700 block mb-1">Room Type</label>
//                                         <select value={roomDetails[index]?.roomType || ''} onChange={(e) => { const newDetails = [...roomDetails]; newDetails[index].roomType = e.target.value; setRoomDetails(newDetails); }} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200">
//                                             {roomTypeOptions.map(type => <option key={type} value={type}>{type}</option>)}
//                                         </select>
//                                     </div>
//                                     <div className="sm:col-span-1">
//                                         <label className="text-xs font-medium text-gray-700 block mb-1">Meal Type</label>
//                                         <select value={roomDetails[index]?.mealType || ''} onChange={(e) => { const newDetails = [...roomDetails]; newDetails[index].mealType = e.target.value; setRoomDetails(newDetails); }} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200">
//                                             {mealTypeOptions.map(type => <option key={type} value={type}>{type}</option>)}
//                                         </select>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         <hr className="border-gray-200" />

//                         {/* Add Image & Remark Section */}
//                         <div>
//                             <div className="flex justify-between items-center mb-2">
//                                 <h3 className="text-sm font-medium text-gray-800">Add Image & Remark</h3>
//                                 <button><TrashIcon /></button>
//                             </div>
//                             <div className="border border-gray-300 rounded-md">
//                                 <div className="bg-gray-100 p-2 border-b border-gray-300">
//                                     <div className="flex gap-2"><button className="p-1 border border-gray-400 rounded">B</button><button className="p-1 border border-gray-400 rounded italic">I</button><button className="p-1 border border-gray-400 rounded underline">U</button></div>
//                                 </div>
//                                 <textarea value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="Enter a short overview" className="w-full h-24 p-2 text-sm bg-white rounded-b-md focus:outline-none" />
//                             </div>
//                         </div>

//                         <hr className="border-gray-200" />

//                         {/* Action Buttons */}
//                         <div className="flex justify-center gap-4">
//                             <button onClick={handleDelete} className="px-10 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md font-semibold text-sm hover:bg-gray-200 transition-colors">Delete</button>
//                             <button onClick={handleSubmit} className="px-10 py-2 bg-[#10A4B0] text-white rounded-md font-semibold text-sm hover:bg-[#0d8a95] transition-colors">Submit</button>
//                         </div>
//                     </div>

//                     {/* Right Sidebar: Save Details */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white border border-gray-200 rounded-lg">
//                             <div className="p-4 border-b border-gray-200"><h2 className="text-xl font-semibold text-gray-600">Save Details</h2></div>
//                             <div className="p-4 space-y-4">
//                                 {selectedHotel ? (
//                                     <div className="border border-gray-200 rounded-lg">
//                                         <div className="bg-[#10A4B0] text-white p-3 rounded-t-lg flex justify-between items-center"><h3 className="font-semibold">Accommodation</h3><button><MoreHorizontalIcon /></button></div>
//                                         <div className="p-4 space-y-3">
//                                             <div>
//                                                 <p className="font-bold">{selectedHotel.name}</p>
//                                                 <div className="flex items-center">{Array.from({ length: 5 }).map((_, i) => (<StarIcon key={i} filled={i < selectedHotel.rating} />))}</div>
//                                                 <p className="text-sm text-gray-600">{selectedHotel.location.city} ({selectedHotel.location.country})</p>
//                                             </div>
//                                             <hr />
//                                             <div className="flex justify-between items-center text-sm">
//                                                 <div>
//                                                     <p className="text-gray-600">Check In:</p>
//                                                     <p className="font-bold">{new Date(checkInDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
//                                                 </div>
//                                                 <div className="flex items-center">
//                                                      <div className="w-16 h-px bg-[#10A4B0]"></div>
//                                                      <div className="bg-[#10A4B0] text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
//                                                          {(() => { const start = new Date(checkInDate); const end = new Date(checkOutDate); const diffTime = Math.abs(end.getTime() - start.getTime()); const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); return diffDays > 0 ? `${diffDays}N` : '...'; })()}
//                                                      </div>
//                                                      <div className="w-16 h-px bg-[#10A4B0]"></div>
//                                                 </div>
//                                                 <div className="text-right">
//                                                     <p className="text-gray-600">Check Out:</p>
//                                                     <p className="font-bold">{new Date(checkOutDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="p-4"><button className="w-full bg-[#10A4B0] text-white py-2 rounded-md font-semibold text-sm hover:bg-[#0d8a95] transition-colors">Edit</button></div>
//                                     </div>
//                                 ) : (
//                                     <div className="text-center text-gray-500 p-8">
//                                         <p>No accommodation selected.</p>
//                                         <p className="text-sm">Please select filters to find hotels.</p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Accommodation;
// --------------------------------
// import React, { useState, useEffect, useCallback } from 'react';

// //-=================================-//
// //-============[ ICONS ]============-//
// //-=================================-//

// const SearchIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
//   </svg>
// );

// const ChevronDownIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
//   </svg>
// );

// const CalendarIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M5.25 12h13.5" />
//     </svg>
// );

// const StarIcon = ({ filled }: { filled: boolean }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? "#FFC107" : "none"} stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-yellow-500">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
//   </svg>
// );

// const TrashIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600 hover:text-red-500">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
//     </svg>
// );

// const MoreHorizontalIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//     </svg>
// );

// const PlusIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//     </svg>
// );

// const MinusIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
//     </svg>
// );

// //-=================================-//
// //-========[ DATA & TYPES ]=========//
// //-=================================-//

// interface Hotel {
//   id: number;
//   name: string;
//   location: {
//     country: string;
//     city: string;
//   };
//   rating: number;
//   images: string[];
//   price_per_night: number;
//   available_rooms: number;
//   amenities: string[];
//   description: string;
// }

// interface RoomDetails {
//   roomType: string;
//   mealType: string;
// }

// interface BookedHotel {
//   id: string;
//   hotel: Hotel;
//   numRooms: number;
//   checkInDate: string;
//   checkOutDate: string;
//   roomDetails: RoomDetails[];
//   remark: string;
//   bookedAt: string;
// }

// interface BookingResult {
//   bookings: BookedHotel[];
//   totalHotels: number;
//   totalRooms: number;
//   summary: string;
// }

// // Mock hotel data for demo purposes (when API is unavailable)
// const mockHotels: Hotel[] = [
//   {
//     id: 1,
//     name: "Grand Plaza Hotel",
//     location: { country: "India", city: "Delhi" },
//     rating: 4,
//     images: ["https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400"],
//     price_per_night: 150,
//     available_rooms: 20,
//     amenities: ["WiFi", "Pool", "Gym"],
//     description: "Luxury hotel in the heart of Delhi"
//   },
//   {
//     id: 2,
//     name: "Ocean View Resort",
//     location: { country: "India", city: "Goa" },
//     rating: 5,
//     images: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400"],
//     price_per_night: 200,
//     available_rooms: 15,
//     amenities: ["Beach Access", "Spa", "Restaurant"],
//     description: "Beachfront resort with stunning ocean views"
//   },
//   {
//     id: 3,
//     name: "Mountain View Lodge",
//     location: { country: "India", city: "Manali" },
//     rating: 4,
//     images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400"],
//     price_per_night: 120,
//     available_rooms: 25,
//     amenities: ["Mountain Views", "Fireplace", "Hiking"],
//     description: "Cozy lodge with beautiful mountain scenery"
//   },
//   {
//     id: 4,
//     name: "City Center Hotel",
//     location: { country: "USA", city: "New York" },
//     rating: 4,
//     images: ["https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?w=400"],
//     price_per_night: 300,
//     available_rooms: 50,
//     amenities: ["Business Center", "WiFi", "Restaurant"],
//     description: "Modern hotel in downtown Manhattan"
//   },
//   {
//     id: 5,
//     name: "Sunset Beach Hotel",
//     location: { country: "Thailand", city: "Phuket" },
//     rating: 5,
//     images: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400"],
//     price_per_night: 180,
//     available_rooms: 30,
//     amenities: ["Beach Access", "Pool", "Spa", "Restaurant"],
//     description: "Beautiful beachfront hotel with sunset views"
//   }
// ];

// const roomTypeOptions = ['Standard', 'Deluxe', 'Suite', 'Family Room', 'Presidential Suite', 'Executive Room'];
// const mealTypeOptions = ['Room Only', 'Breakfast', 'Half Board', 'Full Board', 'All Inclusive'];

// //-=================================-//
// //-======[ MAIN COMPONENT ]=========//
// //-=================================-//

// const Accommodation: React.FC = () => {
//     // State for API data and filters
//     const [allHotels, setAllHotels] = useState<Hotel[]>(mockHotels);
//     const [cityFilter, setCityFilter] = useState('');
//     const [countryFilter, setCountryFilter] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     // State for search and hotel selection
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
//     const [availableHotels, setAvailableHotels] = useState<Hotel[]>([]);
    
//     // State for current booking form
//     const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
//     const [numRooms, setNumRooms] = useState(1);
//     const [checkInDate, setCheckInDate] = useState('');
//     const [checkOutDate, setCheckOutDate] = useState('');
//     const [roomDetails, setRoomDetails] = useState<RoomDetails[]>([{ roomType: 'Standard', mealType: 'Breakfast' }]);
//     const [remark, setRemark] = useState('');

//     // State for managing multiple hotel bookings
//     const [bookedHotels, setBookedHotels] = useState<BookedHotel[]>([]);
//     const [showBookingResult, setShowBookingResult] = useState(false);
//     const [bookingResult, setBookingResult] = useState<BookingResult | null>(null);

//     // Get today's date for minimum date validation
//     const today = new Date().toISOString().split('T')[0];

//     /**
//      * Fetches hotels from API or shows available hotels based on filters
//      */
//     const fetchHotels = useCallback(async () => {
//         if (!countryFilter && !cityFilter) {
//             setAvailableHotels([]);
//             return;
//         }

//         setIsLoading(true);
//         setError(null);

//         try {
//             // Try API first, fallback to mock data
//             const params = new URLSearchParams();
//             if (countryFilter) params.append('country', countryFilter);
//             if (cityFilter) params.append('city', cityFilter);
            
//             try {
//                 const response = await fetch(`http://localhost:5000/api/hotels?${params.toString()}`);
//                 if (!response.ok) throw new Error('API not available');
//                 const data: Hotel[] = await response.json();
//                 setAllHotels(data);
//             } catch {
//                 // Fallback to mock data with filtering
//                 const filtered = mockHotels.filter(hotel => {
//                     const countryMatch = !countryFilter || 
//                         hotel.location.country.toLowerCase().includes(countryFilter.toLowerCase());
//                     const cityMatch = !cityFilter || 
//                         hotel.location.city.toLowerCase().includes(cityFilter.toLowerCase());
//                     return countryMatch && cityMatch;
//                 });
//                 setAllHotels(filtered);
//             }
            
//             // Set available hotels for display
//             const filtered = allHotels.filter(hotel => {
//                 const countryMatch = !countryFilter || 
//                     hotel.location.country.toLowerCase().includes(countryFilter.toLowerCase());
//                 const cityMatch = !cityFilter || 
//                     hotel.location.city.toLowerCase().includes(cityFilter.toLowerCase());
//                 return countryMatch && cityMatch;
//             });
            
//             setAvailableHotels(filtered);
            
//         } catch (err) {
//             setError('Failed to load hotels. Using demo data.');
//             setAvailableHotels(mockHotels);
//         } finally {
//             setIsLoading(false);
//         }
//     }, [countryFilter, cityFilter, allHotels]);

//     useEffect(() => {
//         fetchHotels();
//     }, [countryFilter, cityFilter]);

//     /**
//      * Client-side search filtering
//      */
//     useEffect(() => {
//         if (searchQuery.trim() === '') {
//             setFilteredHotels([]);
//         } else {
//             const lowercasedQuery = searchQuery.toLowerCase();
//             const results = availableHotels.filter(
//                 (hotel) => hotel.name.toLowerCase().includes(lowercasedQuery)
//             );
//             setFilteredHotels(results);
//         }
//     }, [searchQuery, availableHotels]);

//     /**
//      * Update room details when number of rooms changes
//      */
//     useEffect(() => {
//         setRoomDetails((prevDetails) => {
//             const newDetails = [...prevDetails];
//             while (newDetails.length < numRooms) {
//                 newDetails.push({ roomType: 'Standard', mealType: 'Breakfast' });
//             }
//             return newDetails.slice(0, numRooms);
//         });
//     }, [numRooms]);

//     /**
//      * Handle hotel selection
//      */
//     const handleSelectHotel = (hotel: Hotel) => {
//         setSelectedHotel(hotel);
//         setSearchQuery('');
//         setFilteredHotels([]);
//     };

//     /**
//      * Add/Remove rooms with unlimited capability
//      */
//     const addRoom = () => {
//         setNumRooms(prev => prev + 1);
//     };

//     const removeRoom = () => {
//         if (numRooms > 1) {
//             setNumRooms(prev => prev - 1);
//         }
//     };

//     /**
//      * Update room details
//      */
//     const updateRoomDetail = (index: number, field: keyof RoomDetails, value: string) => {
//         const newDetails = [...roomDetails];
//         newDetails[index] = { ...newDetails[index], [field]: value };
//         setRoomDetails(newDetails);
//     };

//     /**
//      * Add current hotel to bookings
//      */
//     const addToBookings = () => {
//         if (!selectedHotel || !checkInDate || !checkOutDate) {
//             alert('Please fill in all required fields.');
//             return;
//         }

//         if (new Date(checkInDate) >= new Date(checkOutDate)) {
//             alert('Check-out date must be after check-in date.');
//             return;
//         }

//         const booking: BookedHotel = {
//             id: `booking-${Date.now()}-${Math.random()}`,
//             hotel: selectedHotel,
//             numRooms,
//             checkInDate,
//             checkOutDate,
//             roomDetails: [...roomDetails],
//             remark,
//             bookedAt: new Date().toISOString()
//         };

//         setBookedHotels(prev => [...prev, booking]);
        
//         // Clear current form
//         setSelectedHotel(null);
//         setSearchQuery('');
//         setNumRooms(1);
//         setCheckInDate('');
//         setCheckOutDate('');
//         setRoomDetails([{ roomType: 'Standard', mealType: 'Breakfast' }]);
//         setRemark('');

//         alert(`Hotel "${selectedHotel.name}" added to bookings!`);
//     };

//     /**
//      * Remove booking
//      */
//     const removeBooking = (bookingId: string) => {
//         setBookedHotels(prev => prev.filter(booking => booking.id !== bookingId));
//     };

//     /**
//      * Final submission - generate JSON result
//      */
//     const finalSubmit = () => {
//         if (bookedHotels.length === 0) {
//             alert('Please add at least one hotel booking before final submission.');
//             return;
//         }

//         const result: BookingResult = {
//             bookings: bookedHotels,
//             totalHotels: bookedHotels.length,
//             totalRooms: bookedHotels.reduce((sum, booking) => sum + booking.numRooms, 0),
//             summary: `Successfully booked ${bookedHotels.length} hotel(s) with a total of ${bookedHotels.reduce((sum, booking) => sum + booking.numRooms, 0)} room(s)`
//         };

//         setBookingResult(result);
//         setShowBookingResult(true);
//         console.log('Final Booking Result:', JSON.stringify(result, null, 2));
//     };

//     /**
//      * Clear all data
//      */
//     const handleDelete = () => {
//         setSelectedHotel(null);
//         setSearchQuery('');
//         setNumRooms(1);
//         setCheckInDate('');
//         setCheckOutDate('');
//         setRoomDetails([{ roomType: 'Standard', mealType: 'Breakfast' }]);
//         setRemark('');
//         setBookedHotels([]);
//         setBookingResult(null);
//         setShowBookingResult(false);
//         alert('All data cleared!');
//     };

//     /**
//      * Calculate days between dates
//      */
//     const calculateNights = (checkIn: string, checkOut: string) => {
//         const start = new Date(checkIn);
//         const end = new Date(checkOut);
//         const diffTime = Math.abs(end.getTime() - start.getTime());
//         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//         return diffDays > 0 ? diffDays : 0;
//     };

//     return (
//         <div className="bg-[#F6F6FA] min-h-screen p-4 sm:p-6 lg:p-2 font-sans">
//             <div className="w-full">
               
//         <header className="flex justify-between items-center mb-4">
//                 <h1 className="text-xl font-semibold text-[#10A4B0] font-raleway">Accommodation Booking System</h1>
// </header>


//                 {/* Show booking result if available */}
//                 {showBookingResult && bookingResult && (
//                     <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
//                         <h2 className="text-xl font-semibold text-green-800 mb-4">Booking Successful!</h2>
//                         <div className="bg-white p-4 rounded-md">
//                             <h3 className="font-medium mb-2">Booking Summary:</h3>
//                             <p className="text-sm text-gray-600 mb-4">{bookingResult.summary}</p>
//                             <div className="bg-gray-100 p-3 rounded text-xs overflow-auto">
//                                 <pre>{JSON.stringify(bookingResult, null, 2)}</pre>
//                             </div>
//                         </div>
//                         <button 
//                             onClick={() => setShowBookingResult(false)}
//                             className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                         >
//                             Continue Booking
//                         </button>
//                     </div>
//                 )}

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     {/* Main Content */}
//                     <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-4 sm:p-6 space-y-6">
//                         {/* Search Section */}
//                         <div>
//                             <h3 className="text-sm font-medium text-gray-800 mb-2">Search Hotels</h3>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//                                 <div>
//                                     <label className="text-xs font-medium text-gray-700 block mb-1">Country</label>
//                                     <input 
//                                         type="text" 
//                                         value={countryFilter} 
//                                         onChange={(e) => setCountryFilter(e.target.value)} 
//                                         placeholder="e.g., India, USA, Thailand" 
//                                         className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent" 
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="text-xs font-medium text-gray-700 block mb-1">City</label>
//                                     <input 
//                                         type="text" 
//                                         value={cityFilter} 
//                                         onChange={(e) => setCityFilter(e.target.value)} 
//                                         placeholder="e.g., Delhi, New York, Phuket" 
//                                         className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent" 
//                                     />
//                                 </div>
//                             </div>

//                             {/* Available Hotels Display */}
//                             {availableHotels.length > 0 && (
//                                 <div className="mb-4">
//                                     <h4 className="text-sm font-medium text-gray-700 mb-2">Available Hotels ({availableHotels.length})</h4>
//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-40 overflow-y-auto">
//                                         {availableHotels.map((hotel) => (
//                                             <div 
//                                                 key={hotel.id} 
//                                                 onClick={() => handleSelectHotel(hotel)}
//                                                 className="p-3 border border-gray-200 rounded-lg hover:border-[#10A4B0] cursor-pointer transition-colors flex items-center gap-3"
//                                             >
//                                                 <img 
//                                                     src={hotel.images[0]} 
//                                                     alt={hotel.name} 
//                                                     className="w-12 h-12 object-cover rounded" 
//                                                     onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=100'; }} 
//                                                 />
//                                                 <div className="flex-1 min-w-0">
//                                                     <p className="font-medium text-sm truncate">{hotel.name}</p>
//                                                     <p className="text-xs text-gray-500">{hotel.location.city}, {hotel.location.country}</p>
//                                                     <div className="flex items-center mt-1">
//                                                         {Array.from({ length: 5 }).map((_, i) => (
//                                                             <StarIcon key={i} filled={i < hotel.rating} />
//                                                         ))}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Hotel Name Search */}
//                             <div className="relative">
//                                 <label className="text-xs font-medium text-gray-700 block mb-1">Search by Hotel Name</label>
//                                 <div className="relative">
//                                     <input 
//                                         type="text" 
//                                         value={searchQuery} 
//                                         onChange={(e) => setSearchQuery(e.target.value)} 
//                                         placeholder="Type hotel name to search..." 
//                                         className="w-full pl-10 pr-10 py-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"
//                                     />
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <SearchIcon />
//                                     </div>
//                                 </div>
//                                 {filteredHotels.length > 0 && (
//                                     <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
//                                         {filteredHotels.map((hotel) => (
//                                             <div 
//                                                 key={hotel.id} 
//                                                 onClick={() => handleSelectHotel(hotel)} 
//                                                 className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-4"
//                                             >
//                                                 <img 
//                                                     src={hotel.images[0]} 
//                                                     alt={hotel.name} 
//                                                     className="w-16 h-16 object-cover rounded-md" 
//                                                     onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=100'; }} 
//                                                 />
//                                                 <div>
//                                                     <p className="font-semibold">{hotel.name}</p>
//                                                     <p className="text-sm text-gray-500">{hotel.location.city}, {hotel.location.country}</p>
//                                                     <div className="flex items-center mt-1">
//                                                         {Array.from({ length: 5 }).map((_, i) => (
//                                                             <StarIcon key={i} filled={i < hotel.rating} />
//                                                         ))}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Loading and Error States */}
//                         {isLoading && <p className="text-center text-gray-500">Loading hotels...</p>}
//                         {error && <p className="text-center text-orange-600">{error}</p>}

//                         {/* Selected Hotel Display */}
//                         {selectedHotel && (
//                             <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
//                                 <div className="flex items-center gap-4">
//                                     <img 
//                                         src={selectedHotel.images[0]} 
//                                         alt={selectedHotel.name} 
//                                         className="w-24 h-24 object-cover rounded-md" 
//                                         onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=100'; }}
//                                     />
//                                     <div className="flex-1">
//                                         <p className="font-bold text-lg">{selectedHotel.name}</p>
//                                         <p className="text-sm text-gray-600">{selectedHotel.location.city}, {selectedHotel.location.country}</p>
//                                         <div className="flex items-center mt-1">
//                                             {Array.from({ length: 5 }).map((_, i) => (
//                                                 <StarIcon key={i} filled={i < selectedHotel.rating} />
//                                             ))}
//                                         </div>
//                                         <p className="text-sm text-gray-600 mt-1">${selectedHotel.price_per_night}/night</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         <hr className="border-gray-200" />

//                         {/* Room Details Section */}
//                         <div>
//                             <h3 className="text-sm font-medium text-gray-800 mb-4">Booking Details</h3>
//                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
//                                 <div>
//                                     <label className="text-xs font-medium text-gray-700 block mb-1">Number of Rooms</label>
//                                     <div className="flex items-center gap-2">
//                                         <button 
//                                             onClick={removeRoom}
//                                             disabled={numRooms <= 1}
//                                             className="p-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                                         >
//                                             <MinusIcon />
//                                         </button>
//                                         <input 
//                                             type="number" 
//                                             min="1"
//                                             value={numRooms} 
//                                             onChange={(e) => setNumRooms(Math.max(1, parseInt(e.target.value) || 1))} 
//                                             className="w-20 p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 text-center"
//                                         />
//                                         <button 
//                                             onClick={addRoom}
//                                             className="p-1 border border-gray-300 rounded hover:bg-gray-100"
//                                         >
//                                             <PlusIcon />
//                                         </button>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label className="text-xs font-medium text-gray-700 block mb-1">Check In</label>
//                                     <div className="relative">
//                                         <input 
//                                             type="date" 
//                                             min={today}
//                                             value={checkInDate} 
//                                             onChange={e => setCheckInDate(e.target.value)} 
//                                             className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 pr-8" 
//                                         />
//                                         <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
//                                             <CalendarIcon />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label className="text-xs font-medium text-gray-700 block mb-1">Check Out</label>
//                                     <div className="relative">
//                                         <input 
//                                             type="date" 
//                                             min={checkInDate || today}
//                                             value={checkOutDate} 
//                                             onChange={e => setCheckOutDate(e.target.value)} 
//                                             className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 pr-8" 
//                                         />
//                                         <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
//                                             <CalendarIcon />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Room Specific Details */}
//                         <div className="space-y-4">
//                             <h4 className="text-sm font-medium text-gray-800">Room Configuration</h4>
//                             {Array.from({ length: numRooms }).map((_, index) => (
//                                 <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
//                                     <div className="sm:col-span-3">
//                                         <p className="text-xs font-medium text-gray-800 mb-2">Room {index + 1}</p>
//                                     </div>
//                                     <div>
//                                         <label className="text-xs font-medium text-gray-700 block mb-1">Room Type</label>
//                                         <select 
//                                             value={roomDetails[index]?.roomType || 'Standard'} 
//                                             onChange={(e) => updateRoomDetail(index, 'roomType', e.target.value)} 
//                                             className="w-full p-2 bg-white rounded-md text-sm border border-gray-200"
//                                         >
//                                             {roomTypeOptions.map(type => (
//                                                 <option key={type} value={type}>{type}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                     <div>
//                                         <label className="text-xs font-medium text-gray-700 block mb-1">Meal Type</label>
//                                         <select 
//                                             value={roomDetails[index]?.mealType || 'Breakfast'} 
//                                             onChange={(e) => updateRoomDetail(index, 'mealType', e.target.value)} 
//                                             className="w-full p-2 bg-white rounded-md text-sm border border-gray-200"
//                                         >
//                                             {mealTypeOptions.map(type => (
//                                                 <option key={type} value={type}>{type}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         <hr className="border-gray-200" />

//                         {/* Remarks Section */}
//                         <div>
//                             <div className="flex justify-between items-center mb-2">
//                                 <h3 className="text-sm font-medium text-gray-800">Additional Remarks</h3>
//                             </div>
//                             <textarea 
//                                 value={remark} 
//                                 onChange={(e) => setRemark(e.target.value)} 
//                                 placeholder="Enter any special requests or remarks..." 
//                                 className="w-full h-24 p-3 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent" 
//                             />
//                         </div>

//                         <hr className="border-gray-200" />

//                         {/* Action Buttons */}
//                         <div className="flex justify-center gap-4 flex-wrap">
//                             <button 
//                                 onClick={handleDelete} 
//                                 className="px-8 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md font-semibold text-sm hover:bg-gray-200 transition-colors"
//                             >
//                                 Clear All
//                             </button>
//                             <button 
//                                 onClick={addToBookings} 
//                                 disabled={!selectedHotel}
//                                 className="px-8 py-2 bg-blue-600 text-white rounded-md font-semibold text-sm hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//                             >
//                                 Add to Booking
//                             </button>
//                             <button 
//                                 onClick={finalSubmit} 
//                                 disabled={bookedHotels.length === 0}
//                                 className="px-8 py-2 bg-[#10A4B0] text-white rounded-md font-semibold text-sm hover:bg-[#0d8a95] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//                             >
//                                 Final Submit ({bookedHotels.length})
//                             </button>
//                         </div>
//                     </div>

//                     {/* Right Sidebar */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white border border-gray-200 rounded-lg">
//                             <div className="p-4 border-b bg-teal-500 rounded-t-lg border border-[#E0E0E0]">
//                                 <h2 className="text-xl font-Raleway text-white">Booking Summary</h2>
//                             </div>
//                             <div className="p-4 space-y-4">
//                                 {/* Current Selection */}
//                                 {selectedHotel && (
//                                     <div className="border border-gray-200 rounded-lg">
//                                         <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
//                                             <h3 className="font-semibold">Current Selection</h3>
//                                         </div>
//                                         <div className="p-4 space-y-3">
//                                             <div>
//                                                 <p className="font-bold">{selectedHotel.name}</p>
//                                                 <div className="flex items-center">
//                                                     {Array.from({ length: 5 }).map((_, i) => (
//                                                         <StarIcon key={i} filled={i < selectedHotel.rating} />
//                                                     ))}
//                                                 </div>
//                                                 <p className="text-sm text-gray-600">{selectedHotel.location.city}, {selectedHotel.location.country}</p>
//                                                 <p className="text-sm font-medium">{numRooms} Room(s)</p>
//                                             </div>
//                                             {checkInDate && checkOutDate && (
//                                                 <>
//                                                     <hr />
//                                                     <div className="flex justify-between items-center text-sm">
//                                                         <div>
//                                                             <p className="text-gray-600">Check In:</p>
//                                                             <p className="font-bold">{new Date(checkInDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
//                                                         </div>
//                                                         <div className="flex items-center">
//                                                             <div className="w-16 h-px bg-blue-600"></div>
//                                                             <div className="bg-blue-600 text-white text-xs rounded-full h-6 w-8 flex items-center justify-center font-bold">
//                                                                 {calculateNights(checkInDate, checkOutDate)}N
//                                                             </div>
//                                                             <div className="w-16 h-px bg-blue-600"></div>
//                                                         </div>
//                                                         <div className="text-right">
//                                                             <p className="text-gray-600">Check Out:</p>
//                                                             <p className="font-bold">{new Date(checkOutDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
//                                                         </div>
//                                                     </div>
//                                                 </>
//                                             )}
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* Booked Hotels */}
//                                 {bookedHotels.length > 0 && (
//                                     <div>
//                                         <h3 className="font-semibold text-gray-800 mb-3">Booked Hotels ({bookedHotels.length})</h3>
//                                         <div className="space-y-3 max-h-96 overflow-y-auto">
//                                             {bookedHotels.map((booking, index) => (
//                                                 <div key={booking.id} className="border border-gray-200 rounded-lg">
//                                                     <div className="bg-[#10A4B0] text-white p-3 rounded-t-lg flex justify-between items-center">
//                                                         <h4 className="font-semibold text-sm">Booking #{index + 1}</h4>
//                                                         <button 
//                                                             onClick={() => removeBooking(booking.id)}
//                                                             className="text-white hover:text-red-200"
//                                                         >
//                                                             <TrashIcon />
//                                                         </button>
//                                                     </div>
//                                                     <div className="p-3 space-y-2">
//                                                         <div>
//                                                             <p className="font-bold text-sm">{booking.hotel.name}</p>
//                                                             <div className="flex items-center">
//                                                                 {Array.from({ length: 5 }).map((_, i) => (
//                                                                     <StarIcon key={i} filled={i < booking.hotel.rating} />
//                                                                 ))}
//                                                             </div>
//                                                             <p className="text-xs text-gray-600">{booking.hotel.location.city}, {booking.hotel.location.country}</p>
//                                                             <p className="text-xs font-medium">{booking.numRooms} Room(s)</p>
//                                                         </div>
//                                                         <hr />
//                                                         <div className="flex justify-between text-xs">
//                                                             <div>
//                                                                 <p className="text-gray-600">Check In:</p>
//                                                                 <p className="font-medium">{new Date(booking.checkInDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
//                                                             </div>
//                                                             <div className="flex items-center">
//                                                                 <div className="w-8 h-px bg-[#10A4B0]"></div>
//                                                                 <div className="bg-[#10A4B0] text-white text-xs rounded-full h-5 w-6 flex items-center justify-center font-bold">
//                                                                     {calculateNights(booking.checkInDate, booking.checkOutDate)}N
//                                                                 </div>
//                                                                 <div className="w-8 h-px bg-[#10A4B0]"></div>
//                                                             </div>
//                                                             <div className="text-right">
//                                                                 <p className="text-gray-600">Check Out:</p>
//                                                                 <p className="font-medium">{new Date(booking.checkOutDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                         <div className="mt-4 p-3 bg-gray-100 rounded-lg">
//                                             <p className="text-sm font-medium text-gray-800">
//                                                 Total: {bookedHotels.length} Hotel(s), {bookedHotels.reduce((sum, booking) => sum + booking.numRooms, 0)} Room(s)
//                                             </p>
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* Empty State */}
//                                 {!selectedHotel && bookedHotels.length === 0 && (
//                                     <div className="text-center text-gray-500 p-8">
//                                         <p>No hotels selected.</p>
//                                         <p className="text-sm">Search and select hotels to start booking.</p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Accommodation;


























// //.......................................................................................................................................................

// // import React, { useState, useEffect, useCallback } from 'react';

// // //-=================================-//
// // //-============[ ICONS ]============-//
// // //-=================================-//

// // // Simple SVG icon components used in the UI.
// // const SearchIcon = () => (
// //   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
// //     <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
// //   </svg>
// // );

// // const ChevronDownIcon = () => (
// //   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
// //     <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
// //   </svg>
// // );

// // const CalendarIcon = () => (
// //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
// //         <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h22.5" />
// //     </svg>
// // );

// // const StarIcon = ({ filled }: { filled: boolean }) => (
// //   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? "#FFC107" : "none"} stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-yellow-500">
// //     <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
// //   </svg>
// // );

// // const TrashIcon = () => (
// //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600 hover:text-red-500">
// //         <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
// //     </svg>
// // );

// // const MoreHorizontalIcon = () => (
// //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
// //         <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
// //     </svg>
// // );


// // //-=================================-//
// // //-========[ DATA & TYPES ]=========//
// // //-=================================-//

// // // Interface for a single hotel object, matching the backend structure.
// // interface Hotel {
// //   id: number;
// //   name: string;
// //   location: {
// //     country: string;
// //     city: string;
// //   };
// //   rating: number;
// //   images: string[];
// //   // Adding other fields from your backend data for completeness
// //   price_per_night: number;
// //   available_rooms: number;
// //   amenities: string[];
// //   description: string;
// // }

// // // Interface for details of a single room.
// // interface RoomDetails {
// //   roomType: string;
// //   mealType: string;
// // }

// // // Options for various dropdowns in the form.
// // const roomCountOptions = [1, 2, 3, 4, 5];
// // const roomTypeOptions = ['Standard', 'Deluxe', 'Suite', 'Family Room'];
// // const mealTypeOptions = ['Room Only', 'Breakfast', 'Half Board', 'Full Board'];


// // //-=================================-//
// // //-======[ MAIN COMPONENT ]=========//
// // //-=================================-//

// // /**
// //  * Accommodation component that allows users to search for hotels,
// //  * add room details, and view a summary.
// //  */
// // const Accommodation: React.FC = () => {
// //     // State for API data and filters
// //     const [allHotels, setAllHotels] = useState<Hotel[]>([]);
// //     const [cityFilter, setCityFilter] = useState('');
// //     const [countryFilter, setCountryFilter] = useState('');
// //     const [isLoading, setIsLoading] = useState(false);
// //     const [error, setError] = useState<string | null>(null);

// //     // State for the search query and filtered results for the dropdown.
// //     const [searchQuery, setSearchQuery] = useState('');
// //     const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
    
// //     // State for the main form data
// //     const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
// //     const [numRooms, setNumRooms] = useState(1);
// //     const [checkInDate, setCheckInDate] = useState('2024-02-18');
// //     const [checkOutDate, setCheckOutDate] = useState('2024-02-20');
// //     const [roomDetails, setRoomDetails] = useState<RoomDetails[]>([{ roomType: 'Standard', mealType: 'Breakfast' }]);
// //     const [remark, setRemark] = useState('');

// //     /**
// //      * Fetches hotels from the backend API based on current filters.
// //      */
// //     const fetchHotels = useCallback(async () => {
// //         setIsLoading(true);
// //         setError(null);
// //         console.log(`Fetching hotels with Country: '${countryFilter}', City: '${cityFilter}'`);

// //         // Construct query parameters
// //         const params = new URLSearchParams();
// //         if (countryFilter) params.append('country', countryFilter);
// //         if (cityFilter) params.append('city', cityFilter);
        
// //         try {
// //             // Assuming the backend is running on port 5000
// //             const response = await fetch(`http://localhost:5000/api/hotels?${params.toString()}`);
// //             if (!response.ok) {
// //                 throw new Error(`Network response was not ok (${response.status})`);
// //             }
// //             const data: Hotel[] = await response.json();
// //             console.log('API Response:', data);
// //             setAllHotels(data);
// //             if (data.length > 0) {
// //                 // If there's no selected hotel OR the selected one is not in the new list, select the first one.
// //                 const isSelectedHotelInList = selectedHotel && data.some(h => h.id === selectedHotel.id);
// //                 if (!isSelectedHotelInList) {
// //                     setSelectedHotel(data[0]);
// //                 }
// //             } else {
// //                 setSelectedHotel(null);
// //             }
// //         } catch (err) {
// //             console.error('Failed to fetch hotels:', err);
// //             setError('Failed to load hotel data. Ensure the backend server is running and allows CORS requests.');
// //             setAllHotels([]);
// //         } finally {
// //             setIsLoading(false);
// //         }
// //     }, [countryFilter, cityFilter]); // FIX: Removed selectedHotel from dependencies to prevent infinite loops.

// //     // Effect to fetch hotels when filters change.
// //     useEffect(() => {
// //         fetchHotels();
// //     }, [fetchHotels]);


// //     /**
// //      * Effect to perform client-side filtering for the search dropdown
// //      * based on the `searchQuery` and the `allHotels` list from the API.
// //      */
// //     useEffect(() => {
// //         if (searchQuery.trim() === '') {
// //             setFilteredHotels([]);
// //         } else {
// //             const lowercasedQuery = searchQuery.toLowerCase();
// //             const results = allHotels.filter(
// //                 (hotel) => hotel.name.toLowerCase().includes(lowercasedQuery)
// //             );
// //             setFilteredHotels(results);
// //         }
// //     }, [searchQuery, allHotels]);

// //     /**
// //      * Effect to update the roomDetails array when the number of rooms changes.
// //      */
// //     useEffect(() => {
// //         setRoomDetails((prevDetails) => {
// //             const newDetails = [...prevDetails];
// //             while (newDetails.length < numRooms) {
// //                 newDetails.push({ roomType: 'Standard', mealType: 'Breakfast' });
// //             }
// //             return newDetails.slice(0, numRooms);
// //         });
// //     }, [numRooms]);

// //     /**
// //      * Handles selecting a hotel from the search results dropdown.
// //      */
// //     const handleSelectHotel = (hotel: Hotel) => {
// //         console.log('Selected hotel:', hotel);
// //         setSelectedHotel(hotel);
// //         setSearchQuery(''); // Clear search query to hide dropdown and show selected hotel card
// //         setFilteredHotels([]);
// //     };
    
// //     const handleSubmit = () => {
// //         if (!selectedHotel || !checkInDate || !checkOutDate) {
// //             alert('Please fill in all required fields.');
// //             return;
// //         }
// //         const submissionData = { hotel: selectedHotel, rooms: numRooms, checkIn: checkInDate, checkOut: checkOutDate, roomDetails, remark };
// //         console.log('Form Submitted:', submissionData);
// //         alert('Accommodation details submitted! Check the console for the data.');
// //     };

// //     const handleDelete = () => {
// //         setSelectedHotel(null);
// //         setSearchQuery('');
// //         setNumRooms(1);
// //         setCheckInDate('');
// //         setCheckOutDate('');
// //         setRoomDetails([{ roomType: 'Standard', mealType: 'Breakfast' }]);
// //         setRemark('');
// //         alert('Form cleared!');
// //     };

// //     return (
// //         <div className="bg-[#F6F6FA] min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
// //             <div className="max-w-7xl mx-auto">
// //                 <h1 className="text-2xl font-semibold text-[#10A4B0] mb-2">Accommodation*</h1>
// //                 <hr className="border-gray-300 mb-6" />

// //                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //                     {/* Main Content: Search and Details Form */}
// //                     <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-4 sm:p-6 space-y-6">
// //                         {/* Filters and Search Section */}
// //                         <div>
// //                              <h3 className="text-sm font-medium text-gray-800 mb-2">Search Accommodation from database</h3>
// //                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
// //                                 <div>
// //                                     <label htmlFor="country-filter" className="text-xs font-medium text-gray-700 block mb-1">Country</label>
// //                                     <input id="country-filter" type="text" value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} placeholder="e.g., India" className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200" />
// //                                 </div>
// //                                 <div>
// //                                     <label htmlFor="city-filter" className="text-xs font-medium text-gray-700 block mb-1">City</label>
// //                                     <input id="city-filter" type="text" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} placeholder="e.g., Delhi" className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200" />
// //                                 </div>
// //                              </div>
// //                             <div className="relative">
// //                                 <label htmlFor="search-accommodation" className="text-xs font-medium text-gray-700 block mb-1">
// //                                     Hotel Name
// //                                 </label>
// //                                 <div className="relative">
// //                                     <input id="search-accommodation" type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by hotel name..." className="w-full pl-10 pr-10 py-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/>
// //                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><SearchIcon /></div>
// //                                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center"><ChevronDownIcon /></div>
// //                                 </div>
// //                                 {filteredHotels.length > 0 && (
// //                                     <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
// //                                         {filteredHotels.map((hotel) => (
// //                                             <div key={hotel.id} onClick={() => handleSelectHotel(hotel)} className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-4">
// //                                                 <img src={hotel.images[0]} alt={hotel.name} className="w-16 h-16 object-cover rounded-md" onError={(e) => { e.currentTarget.src = 'https://placehold.co/64x64/EEE/31343C?text=No+Image'; }} />
// //                                                 <div>
// //                                                     <p className="font-semibold">{hotel.name}</p>
// //                                                     <p className="text-sm text-gray-500">{hotel.location.city}, {hotel.location.country}</p>
// //                                                 </div>
// //                                             </div>
// //                                         ))}
// //                                     </div>
// //                                 )}
// //                             </div>
// //                         </div>

// //                         {/* Loading and Error States */}
// //                         {isLoading && <p className="text-center text-gray-500">Loading hotels...</p>}
// //                         {error && <p className="text-center text-red-500">{error}</p>}

// //                         {/* Selected Hotel Display */}
// //                         {selectedHotel && !searchQuery && (
// //                              <div className="p-3 border border-gray-200 rounded-lg flex items-center gap-4">
// //                                 <img src={selectedHotel.images[0]} alt={selectedHotel.name} className="w-24 h-24 object-cover rounded-md" onError={(e) => { e.currentTarget.src = 'https://placehold.co/96x96/EEE/31343C?text=No+Image'; }}/>
// //                                 <div>
// //                                     <p className="font-bold text-lg">{selectedHotel.name}</p>
// //                                     <p className="text-sm text-gray-600">{selectedHotel.location.city}, {selectedHotel.location.country}</p>
// //                                     <div className="flex items-center mt-1">
// //                                         {Array.from({ length: 5 }).map((_, i) => (
// //                                             <StarIcon key={i} filled={i < selectedHotel.rating} />
// //                                         ))}
// //                                     </div>
// //                                     <a href="#" className="text-sm text-blue-600 underline mt-1 block">View on Map</a>
// //                                 </div>
// //                             </div>
// //                         )}

// //                         <hr className="border-gray-200" />

// //                         {/* Add Room Details Section */}
// //                         <div>
// //                             <h3 className="text-sm font-medium text-gray-800 mb-4">Add Room Details</h3>
// //                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
// //                                 <div>
// //                                     <label className="text-xs font-medium text-gray-700 block mb-1">No. of Rooms</label>
// //                                     <select value={numRooms} onChange={(e) => setNumRooms(parseInt(e.target.value))} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200">
// //                                         {roomCountOptions.map(count => <option key={count} value={count}>{count}</option>)}
// //                                     </select>
// //                                 </div>
// //                                 <div>
// //                                     <label className="text-xs font-medium text-gray-700 block mb-1">Check In</label>
// //                                     <div className="relative">
// //                                         <input type="date" value={checkInDate} onChange={e => setCheckInDate(e.target.value)} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 pr-8" />
// //                                         <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none"><CalendarIcon /></div>
// //                                     </div>
// //                                 </div>
// //                                 <div>
// //                                     <label className="text-xs font-medium text-gray-700 block mb-1">Check Out</label>
// //                                     <div className="relative">
// //                                         <input type="date" value={checkOutDate} onChange={e => setCheckOutDate(e.target.value)} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 pr-8" />
// //                                         <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none"><CalendarIcon /></div>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         </div>

// //                          {/* Room Specific Details */}
// //                         <div className="space-y-4">
// //                             {Array.from({ length: numRooms }).map((_, index) => (
// //                                 <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
// //                                     <p className="text-xs font-medium text-gray-800 sm:col-span-1">Room {index + 1} :</p>
// //                                     <div className="sm:col-span-1">
// //                                         <label className="text-xs font-medium text-gray-700 block mb-1">Room Type</label>
// //                                         <select value={roomDetails[index]?.roomType || ''} onChange={(e) => { const newDetails = [...roomDetails]; newDetails[index].roomType = e.target.value; setRoomDetails(newDetails); }} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200">
// //                                             {roomTypeOptions.map(type => <option key={type} value={type}>{type}</option>)}
// //                                         </select>
// //                                     </div>
// //                                     <div className="sm:col-span-1">
// //                                         <label className="text-xs font-med






// src/components/Accommodation.tsx
import React, { useState, useEffect, useCallback } from 'react';

//-=================================-//
//-============[ ICONS ]============-//
//-=================================-//

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M5.25 12h13.5" />
    </svg>
);

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? "#FFC107" : "none"} stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-yellow-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600 hover:text-red-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

const MoreHorizontalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

const MinusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
);

//-=================================-//
//-========[ DATA & TYPES ]=========//
//-=================================-//

interface Hotel {
  id: number;
  name: string;
  location: {
    country: string;
    city: string;
  };
  rating: number;
  images: string[];
  price_per_night: number;
  available_rooms: number;
  amenities: string[];
  description: string;
}

interface RoomDetails {
  roomType: string;
  mealType: string;
}

interface BookedHotel {
  id: string;
  hotel: Hotel;
  numRooms: number;
  checkInDate: string;
  checkOutDate: string;
  roomDetails: RoomDetails[];
  remark: string;
  bookedAt: string;
}

interface BookingResult {
  bookings: BookedHotel[];
  totalHotels: number;
  totalRooms: number;
  summary: string;
}

// Mock hotel data for demo purposes (when API is unavailable)
const mockHotels: Hotel[] = [
  {
    id: 1,
    name: "Grand Plaza Hotel",
    location: { country: "India", city: "Delhi" },
    rating: 4,
    images: ["https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1600&q=80"],
    price_per_night: 150,
    available_rooms: 20,
    amenities: ["WiFi", "Pool", "Gym"],
    description: "Luxury hotel in the heart of Delhi"
  },
  {
    id: 2,
    name: "Ocean View Resort",
    location: { country: "India", city: "Goa" },
    rating: 5,
    images: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=80"],
    price_per_night: 200,
    available_rooms: 15,
    amenities: ["Beach Access", "Spa", "Restaurant"],
    description: "Beachfront resort with stunning ocean views"
  },
  {
    id: 3,
    name: "Mountain View Lodge",
    location: { country: "India", city: "Manali" },
    rating: 4,
    images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80"],
    price_per_night: 120,
    available_rooms: 25,
    amenities: ["Mountain Views", "Fireplace", "Hiking"],
    description: "Cozy lodge with beautiful mountain scenery"
  },
  {
    id: 4,
    name: "City Center Hotel",
    location: { country: "USA", city: "New York" },
    rating: 4,
    images: ["https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?w=1600&q=80"],
    price_per_night: 300,
    available_rooms: 50,
    amenities: ["Business Center", "WiFi", "Restaurant"],
    description: "Modern hotel in downtown Manhattan"
  },
  {
    id: 5,
    name: "Sunset Beach Hotel",
    location: { country: "Thailand", city: "Phuket" },
    rating: 5,
    images: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=80"],
    price_per_night: 180,
    available_rooms: 30,
    amenities: ["Beach Access", "Pool", "Spa", "Restaurant"],
    description: "Beautiful beachfront hotel with sunset views"
  }
];

const roomTypeOptions = ['Standard', 'Deluxe', 'Suite', 'Family Room', 'Presidential Suite', 'Executive Room'];
const mealTypeOptions = ['Room Only', 'Breakfast', 'Half Board', 'Full Board', 'All Inclusive'];

//-=================================-//
//-======[ MAIN COMPONENT ]=========//
//-=================================-//

const Accommodation: React.FC = () => {
    // State for API data and filters
    const [allHotels, setAllHotels] = useState<Hotel[]>(mockHotels);
    const [cityFilter, setCityFilter] = useState('');
    const [countryFilter, setCountryFilter] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // State for search and hotel selection
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
    const [availableHotels, setAvailableHotels] = useState<Hotel[]>([]);
    
    // State for current booking form
    const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
    const [numRooms, setNumRooms] = useState(1);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [roomDetails, setRoomDetails] = useState<RoomDetails[]>([{ roomType: 'Standard', mealType: 'Breakfast' }]);
    const [remark, setRemark] = useState('');

    // State for managing multiple hotel bookings
    const [bookedHotels, setBookedHotels] = useState<BookedHotel[]>([]);
    const [showBookingResult, setShowBookingResult] = useState(false);
    const [bookingResult, setBookingResult] = useState<BookingResult | null>(null);

    // Get today's date for minimum date validation
    const today = new Date().toISOString().split('T')[0];

    /**
     * Fetches hotels from API or shows available hotels based on filters
     */
    const fetchHotels = useCallback(async () => {
        if (!countryFilter && !cityFilter) {
            setAvailableHotels([]);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Try API first, fallback to mock data
            const params = new URLSearchParams();
            if (countryFilter) params.append('country', countryFilter);
            if (cityFilter) params.append('city', cityFilter);
            
            try {
                const response = await fetch(`http://localhost:5000/api/hotels?${params.toString()}`);
                if (!response.ok) throw new Error('API not available');
                const data: Hotel[] = await response.json();
                setAllHotels(data);
            } catch {
                // Fallback to mock data with filtering
                const filtered = mockHotels.filter(hotel => {
                    const countryMatch = !countryFilter || 
                        hotel.location.country.toLowerCase().includes(countryFilter.toLowerCase());
                    const cityMatch = !cityFilter || 
                        hotel.location.city.toLowerCase().includes(cityFilter.toLowerCase());
                    return countryMatch && cityMatch;
                });
                setAllHotels(filtered);
            }
            
            // Set available hotels for display
            const filtered = allHotels.filter(hotel => {
                const countryMatch = !countryFilter || 
                    hotel.location.country.toLowerCase().includes(countryFilter.toLowerCase());
                const cityMatch = !cityFilter || 
                    hotel.location.city.toLowerCase().includes(cityFilter.toLowerCase());
                return countryMatch && cityMatch;
            });
            
            setAvailableHotels(filtered);
            
        } catch (err) {
            setError('Failed to load hotels. Using demo data.');
            setAvailableHotels(mockHotels);
        } finally {
            setIsLoading(false);
        }
    }, [countryFilter, cityFilter, allHotels]);

    useEffect(() => {
        fetchHotels();
    }, [countryFilter, cityFilter]);

    /**
     * Client-side search filtering
     */
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredHotels([]);
        } else {
            const lowercasedQuery = searchQuery.toLowerCase();
            const results = availableHotels.filter(
                (hotel) => hotel.name.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredHotels(results);
        }
    }, [searchQuery, availableHotels]);

    /**
     * Update room details when number of rooms changes
     */
    useEffect(() => {
        setRoomDetails((prevDetails) => {
            const newDetails = [...prevDetails];
            while (newDetails.length < numRooms) {
                newDetails.push({ roomType: 'Standard', mealType: 'Breakfast' });
            }
            return newDetails.slice(0, numRooms);
        });
    }, [numRooms]);

    /**
     * Handle hotel selection
     */
    const handleSelectHotel = (hotel: Hotel) => {
        setSelectedHotel(hotel);
        setSearchQuery('');
        setFilteredHotels([]);
    };

    /**
     * Add/Remove rooms with unlimited capability
     */
    const addRoom = () => {
        setNumRooms(prev => prev + 1);
    };

    const removeRoom = () => {
        if (numRooms > 1) {
            setNumRooms(prev => prev - 1);
        }
    };

    /**
     * Update room details
     */
    const updateRoomDetail = (index: number, field: keyof RoomDetails, value: string) => {
        const newDetails = [...roomDetails];
        newDetails[index] = { ...newDetails[index], [field]: value };
        setRoomDetails(newDetails);
    };

    /**
     * Add current hotel to bookings
     */
    const addToBookings = () => {
        if (!selectedHotel || !checkInDate || !checkOutDate) {
            alert('Please fill in all required fields.');
            return;
        }

        if (new Date(checkInDate) >= new Date(checkOutDate)) {
            alert('Check-out date must be after check-in date.');
            return;
        }

        const booking: BookedHotel = {
            id: `booking-${Date.now()}-${Math.random()}`,
            hotel: selectedHotel,
            numRooms,
            checkInDate,
            checkOutDate,
            roomDetails: [...roomDetails],
            remark,
            bookedAt: new Date().toISOString()
        };

        setBookedHotels(prev => [...prev, booking]);
        
        // Clear current form
        setSelectedHotel(null);
        setSearchQuery('');
        setNumRooms(1);
        setCheckInDate('');
        setCheckOutDate('');
        setRoomDetails([{ roomType: 'Standard', mealType: 'Breakfast' }]);
        setRemark('');

        alert(`Hotel "${selectedHotel.name}" added to bookings!`);
    };

    /**
     * Remove booking
     */
    const removeBooking = (bookingId: string) => {
        setBookedHotels(prev => prev.filter(booking => booking.id !== bookingId));
    };

    /**
     * Final submission - generate JSON result
     */
    const finalSubmit = () => {
        if (bookedHotels.length === 0) {
            alert('Please add at least one hotel booking before final submission.');
            return;
        }

        const result: BookingResult = {
            bookings: bookedHotels,
            totalHotels: bookedHotels.length,
            totalRooms: bookedHotels.reduce((sum, booking) => sum + booking.numRooms, 0),
            summary: `Successfully booked ${bookedHotels.length} hotel(s) with a total of ${bookedHotels.reduce((sum, booking) => sum + booking.numRooms, 0)} room(s)`
        };

        setBookingResult(result);
        setShowBookingResult(true);
        console.log('Final Booking Result:', JSON.stringify(result, null, 2));
    };

    /**
     * Clear all data
     */
    const handleDelete = () => {
        setSelectedHotel(null);
        setSearchQuery('');
        setNumRooms(1);
        setCheckInDate('');
        setCheckOutDate('');
        setRoomDetails([{ roomType: 'Standard', mealType: 'Breakfast' }]);
        setRemark('');
        setBookedHotels([]);
        setBookingResult(null);
        setShowBookingResult(false);
        alert('All data cleared!');
    };

    /**
     * Calculate days between dates
     */
    const calculateNights = (checkIn: string, checkOut: string) => {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    return (
        <div className="bg-[#F6F6FA] min-h-screen font-raleway text-sm">
            {/* PAGE CONTAINER: left padding to simulate sidebar (like screenshot) */}
            <div className="min-h-screen  px-4 md:px-8 lg:p-2">
                {/* TOP HEADER */}
                <header className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                       
                        <h1 className="text-xl font-semibold font- text-[#10A4B0]">Accommodation</h1>
                    </div>

                   
                </header>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Primary Content (wide center column) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Card: Travel Basic like banner + content */}
                        <div className="bg-white border p-4 border-gray-200 rounded-lg shadow-sm overflow-hidden">
                            {/* Banner image */}
                            <div className="w-full h-44 md:h-48 bg-gray-200 rounded overflow-hidden">
                                <img
                                    src={selectedHotel?.images?.[0] || 'https://plus.unsplash.com/premium_photo-1661963123153-5471a95b7042?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bHV4dXJ5JTIwaG90ZWwlMjBoZCUyMHF1YWxpdHl8ZW58MHx8MHx8fDA%3D'}
                                    alt="banner"
                                    className="w-full h-full object-cover"
                                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504268449039-8b4c8f8f18f0?w=1600&q=80'; }}
                                />
                            </div>

                            <div className="pt-2 pl-4 pr-4  space-y-6 mt-4 border rounded">
                                <h2 className="text-lg font-medium text-gray-800 p-0">Search Accomodation from database</h2>

                                {/* Search & Filters */}
                                <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
                                    <div className="space-y-3">
                                        <label className="text-xs font-medium text-gray-700 block">Country</label>
                                        <input
                                            type="text"
                                            value={countryFilter}
                                            onChange={(e) => setCountryFilter(e.target.value)}
                                            placeholder="e.g., India, USA, Thailand"
                                            className="w-full p-1 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-medium text-gray-700 block">City</label>
                                        <input
                                            type="text"
                                            value={cityFilter}
                                            onChange={(e) => setCityFilter(e.target.value)}
                                            placeholder="e.g., Delhi, New York, Phuket"
                                            className="w-full p-1 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Available Hotels */}
                                {availableHotels.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 mb-3">Available Hotels ({availableHotels.length})</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-44 overflow-y-auto pr-2">
                                            {availableHotels.map((hotel) => (
                                                <div
                                                    key={hotel.id}
                                                    onClick={() => handleSelectHotel(hotel)}
                                                    className="p-1 border border-gray-200 rounded-lg hover:shadow-md transition-shadow flex items-center gap-3 cursor-pointer bg-white"
                                                >
                                                    <img
                                                        src={hotel.images[0]}
                                                        alt={hotel.name}
                                                        className="w-14 h-14 object-cover rounded"
                                                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=100'; }}
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-sm truncate">{hotel.name}</p>
                                                        <p className="text-xs text-gray-500">{hotel.location.city}, {hotel.location.country}</p>
                                                        <div className="flex items-center mt-1">
                                                            {Array.from({ length: 5 }).map((_, i) => (
                                                                <StarIcon key={i} filled={i < hotel.rating} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-semibold">${hotel.price_per_night}</p>
                                                        <p className="text-xs text-gray-400">/night</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Hotel Name Search */}
                                <div className="relative">
                                    <label className="text-xs font-medium text-gray-700 block mb-2">Search by Hotel Name</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Type hotel name to search..."
                                            className="w-full pl-10 pr-10 py-1 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"
                                        />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <SearchIcon />
                                        </div>
                                    </div>

                                    {filteredHotels.length > 0 && (
                                        <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-72 overflow-y-auto">
                                            {filteredHotels.map((hotel) => (
                                                <div
                                                    key={hotel.id}
                                                    onClick={() => handleSelectHotel(hotel)}
                                                    className="p-1 hover:bg-gray-50 cursor-pointer flex items-center gap-4"
                                                >
                                                    <img
                                                        src={hotel.images[0]}
                                                        alt={hotel.name}
                                                        className="w-16 h-16 object-cover rounded-md"
                                                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=100'; }}
                                                    />
                                                    <div>
                                                        <p className="font-semibold">{hotel.name}</p>
                                                        <p className="text-sm text-gray-500">{hotel.location.city}, {hotel.location.country}</p>
                                                        <div className="flex items-center mt-1">
                                                            {Array.from({ length: 5 }).map((_, i) => (
                                                                <StarIcon key={i} filled={i < hotel.rating} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Loading and Error */}
                                <div>
                                    {isLoading && <p className="text-center text-gray-500">Loading hotels...</p>}
                                    {error && <p className="text-center text-orange-600">{error}</p>}
                                </div>

                                <hr className="border-gray-200" />

                                {/* Selected Hotel preview */}
                                {selectedHotel && (
                                    <div className="p-1 border border-gray-200 rounded-lg bg-gray-50">
                                        <div className="flex items-start gap-4">
                                            <img
                                                src={selectedHotel.images[0]}
                                                alt={selectedHotel.name}
                                                className="w-28 h-20 object-cover rounded-md"
                                                onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=100'; }}
                                            />
                                            <div className="flex-1">
                                                <p className="font-bold text-lg">{selectedHotel.name}</p>
                                                <p className="text-sm text-gray-600">{selectedHotel.location.city}, {selectedHotel.location.country}</p>
                                                <div className="flex items-center mt-1">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <StarIcon key={i} filled={i < selectedHotel.rating} />
                                                    ))}
                                                </div>
                                                <p className="text-sm text-gray-600 mt-2">${selectedHotel.price_per_night}/night</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Booking Details */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-800 mb-3">Booking Details</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label className="text-xs font-medium text-gray-700 block mb-2">Number of Rooms</label>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={removeRoom}
                                                    disabled={numRooms <= 1}
                                                    className="p-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <MinusIcon />
                                                </button>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={numRooms}
                                                    onChange={(e) => setNumRooms(Math.max(1, parseInt(e.target.value) || 1))}
                                                    className="w-20 p-1 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 text-center"
                                                />
                                                <button
                                                    onClick={addRoom}
                                                    className="p-1 border border-gray-300 rounded hover:bg-gray-100"
                                                >
                                                    <PlusIcon />
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-700 block mb-2">Check In</label>
                                            <div className="relative">
                                                <input
                                                    type="date"
                                                    min={today}
                                                    value={checkInDate}
                                                    onChange={e => setCheckInDate(e.target.value)}
                                                    className="w-full p-1 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 pr-8"
                                                />
                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                    <CalendarIcon />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-700 block mb-2">Check Out</label>
                                            <div className="relative">
                                                <input
                                                    type="date"
                                                    min={checkInDate || today}
                                                    value={checkOutDate}
                                                    onChange={e => setCheckOutDate(e.target.value)}
                                                    className="w-full p-1 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 pr-8"
                                                />
                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                    <CalendarIcon />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Room Configuration */}
                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium text-gray-800">Room Configuration</h4>
                                    {Array.from({ length: numRooms }).map((_, index) => (
                                        <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                                            <div className="sm:col-span-3">
                                                <p className="text-xs font-medium text-gray-800 mb-2">Room {index + 1}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-gray-700 block mb-1">Room Type</label>
                                                <select
                                                    value={roomDetails[index]?.roomType || 'Standard'}
                                                    onChange={(e) => updateRoomDetail(index, 'roomType', e.target.value)}
                                                    className="w-full p-1 bg-white rounded-md text-sm border border-gray-200"
                                                >
                                                    {roomTypeOptions.map(type => (
                                                        <option key={type} value={type}>{type}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-gray-700 block mb-1">Meal Type</label>
                                                <select
                                                    value={roomDetails[index]?.mealType || 'Breakfast'}
                                                    onChange={(e) => updateRoomDetail(index, 'mealType', e.target.value)}
                                                    className="w-full p-1 bg-white rounded-md text-sm border border-gray-200"
                                                >
                                                    {mealTypeOptions.map(type => (
                                                        <option key={type} value={type}>{type}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <hr className="border-gray-200" />

                                {/* Remarks */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-800 mb-2">Additional Remarks</h3>
                                    <textarea
                                        value={remark}
                                        onChange={(e) => setRemark(e.target.value)}
                                        placeholder="Enter any special requests or remarks..."
                                        className="w-full h-28 p-1 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"
                                    />
                                </div>

                                <hr className="border-gray-200" />

                                {/* Actions */}
                                <div className="flex flex-wrap justify-center gap-4">
                                    <button
                                        onClick={handleDelete}
                                        className="px-8 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md font-semibold text-sm hover:bg-gray-200 transition-colors"
                                    >
                                        Clear All
                                    </button>
                                    <button
                                        onClick={addToBookings}
                                        disabled={!selectedHotel}
                                        className="px-8 py-2 bg-teal-500 text-white rounded-md font-semibold text-sm hover:bg-teal-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Add to Booking
                                    </button>
                                    <button
                                        onClick={finalSubmit}
                                        disabled={bookedHotels.length === 0}
                                        className="px-8 py-2 bg-[#10A4B0] text-white rounded-md font-semibold text-sm hover:bg-teal-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Final Submit ({bookedHotels.length})
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Booking result (keeps unchanged) */}
                        {showBookingResult && bookingResult && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                <h2 className="text-xl font-semibold text-green-800 mb-4">Booking Successful!</h2>
                                <div className="bg-white p-4 rounded-md">
                                    <h3 className="font-medium mb-2">Booking Summary:</h3>
                                    <p className="text-sm text-gray-600 mb-4">{bookingResult.summary}</p>
                                    <div className="bg-gray-100 p-3 rounded text-xs overflow-auto">
                                        <pre>{JSON.stringify(bookingResult, null, 2)}</pre>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowBookingResult(false)}
                                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Continue Booking
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <div className="bg-white p-4 flex items-center justify-between border-b">
                                <h2 className="text-xl font-raleway font-medium font-semibold text-gray-600">Save Details</h2>
                               
                            </div>

                            <div className="p-3">
                              
                                

                                {/* Current Selection & Bookings list */}
                                <div className="mt-1 space-y-4">
                                    {selectedHotel && (
                                        <div className="border border-gray-200 rounded-md overflow-hidden">
                                            <div className="bg-[#10A4B0] p-3 text-white">Current Selection</div>
                                            <div className="p-3">
                                                <p className="font-bold">{selectedHotel.name}</p>
                                                <div className="flex items-center mt-1">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <StarIcon key={i} filled={i < selectedHotel.rating} />
                                                    ))}
                                                </div>
                                                <p className="text-xs text-gray-500">{selectedHotel.location.city}, {selectedHotel.location.country}</p>
                                                <p className="text-xs font-medium mt-2">{numRooms} Room(s)</p>
                                                {checkInDate && checkOutDate && (
                                                    <div className="mt-3">
                                                        <div className="flex justify-between items-center text-sm">
                                                            <div>
                                                                <p className="text-gray-600">Check In:</p>
                                                                <p className="font-bold">{new Date(checkInDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <div className="bg-[#10A4B0] text-white text-xs rounded-full h-6 w-8 flex items-center justify-center font-bold">
                                                                    {calculateNights(checkInDate, checkOutDate)}N
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-gray-600">Check Out:</p>
                                                                <p className="font-bold">{new Date(checkOutDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {bookedHotels.length > 0 && (
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700 mb-3">Booked Hotels ({bookedHotels.length})</h4>
                                            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                                                {bookedHotels.map((booking, index) => (
                                                    <div key={booking.id} className="border border-gray-200 rounded-md overflow-hidden">
                                                        <div className="bg-[#10A4B0] text-white p-3 flex justify-between items-center">
                                                            <h5 className="font-semibold text-sm">Booking #{index + 1}</h5>
                                                            <button onClick={() => removeBooking(booking.id)} className="text-white hover:text-red-200"><TrashIcon /></button>
                                                        </div>
                                                        <div className="p-3 text-xs space-y-2">
                                                            <p className="font-semibold text-sm">{booking.hotel.name}</p>
                                                            <div className="flex items-center">
                                                                {Array.from({ length: 5 }).map((_, i) => (
                                                                    <StarIcon key={i} filled={i < booking.hotel.rating} />
                                                                ))}
                                                            </div>
                                                            <p className="text-gray-500">{booking.hotel.location.city}, {booking.hotel.location.country}</p>
                                                            <div className="flex justify-between">
                                                                <div>
                                                                    <p className="text-gray-600">Check In</p>
                                                                    <p className="font-medium">{new Date(booking.checkInDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <div className="bg-[#10A4B0] text-white text-xs rounded-full h-5 w-6 flex items-center justify-center font-bold">
                                                                        {calculateNights(booking.checkInDate, booking.checkOutDate)}N
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <p className="text-gray-600">Check Out</p>
                                                                    <p className="font-medium">{new Date(booking.checkOutDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm">
                                                <p className="font-medium text-gray-800">
                                                    Total: {bookedHotels.length} Hotel(s), {bookedHotels.reduce((sum, booking) => sum + booking.numRooms, 0)} Room(s)
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {!selectedHotel && bookedHotels.length === 0 && (
                                        <div className="text-center text-gray-500 p-6">
                                            <p>No hotels selected.</p>
                                            <p className="text-sm">Search and select hotels to start booking.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Accommodation;
