//v2

import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';

// Define the full itinerary data shape
export interface ItineraryData {
  // From TravelBasic
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

  // ✅ FIXED: Added destinations from the modal step
  destinations: {
    country: string;
    city: string;
  }[];

  // From ArrivalDeparture (array for multiple legs)
  journeyLegs: {
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
  }[];

  // Add fields from other steps (e.g., Accommodation, Vehicle, etc.) as you implement them
}

// Defines the shape of the context value
interface ItineraryContextType {
  data: ItineraryData;
  updateData: (newData: Partial<ItineraryData>) => void;
  resetData: () => void;
}

// Defines the initial state for the itinerary data
const defaultData: ItineraryData = {
  clientName: '',
  email: '',
  phone: '',
  nationality: 'Indian',
  startDate: '',
  endDate: '',
  totalTravelers: 1,
  totalDays: 1,
  tripOverviewTitle: '',
  tripOverviewDetails: '',
  destinations: [], // ✅ FIXED: Added default value
  journeyLegs: [],
};

const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

export const ItineraryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ItineraryData>(defaultData);

  // ✅ IMPROVED: Wrapped updateData in useCallback to prevent re-creation on every render.
  const updateData = useCallback((newData: Partial<ItineraryData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  }, []);

  // ✅ IMPROVED: Wrapped resetData in useCallback.
  const resetData = useCallback(() => {
    setData(defaultData);
  }, []);

  // ✅ IMPROVED: Memoized the context value to prevent consumers from re-rendering
  // unless the data object itself has changed.
  const value = useMemo(() => ({
    data,
    updateData,
    resetData,
  }), [data, updateData, resetData]);

  return (
    <ItineraryContext.Provider value={value}>
      {children}
    </ItineraryContext.Provider>
  );
};

// Custom hook for easy access to the context. No changes needed here.
export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (!context) {
    throw new Error('useItinerary must be used within ItineraryProvider');
  }
  return context;
};









//v1

// import React, { createContext, useContext, useState, ReactNode } from 'react';

// // Define the full itinerary data shape (expand as you add more steps)
// interface ItineraryData {
//   // From TravelBasic
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

//   // From ArrivalDeparture (array for multiple legs)
//   journeyLegs: {
//     id: number;
//     modeOfTravel: 'Flight' | 'Train' | 'Bus' | 'Car';
//     fromCity: string;
//     date: string;
//     time: string;
//     airline?: string;
//     flightNo?: string;
//     airport?: string;
//     trainName?: string;
//     trainNo?: string;
//     station?: string;
//     busService?: string;
//     busNo?: string;
//     carType?: string;
//     driverDetails?: string;
//   }[];

//   // Add fields from other steps (e.g., Accommodation, Vehicle, etc.) as you implement them
//   // Example: accommodations: { ... }[];
// }

// interface ItineraryContextType {
//   data: ItineraryData;
//   updateData: (newData: Partial<ItineraryData>) => void;
//   resetData: () => void;
// }

// const defaultData: ItineraryData = {
//   clientName: '',
//   email: '',
//   phone: '',
//   nationality: 'Indian',
//   startDate: '',
//   endDate: '',
//   totalTravelers: 1,
//   totalDays: 1,
//   tripOverviewTitle: '',
//   tripOverviewDetails: '',
//   journeyLegs: [],
//   // Default other steps here...
// };

// const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

// export const ItineraryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [data, setData] = useState<ItineraryData>(defaultData);

//   const updateData = (newData: Partial<ItineraryData>) => {
//     setData((prev) => ({ ...prev, ...newData }));
//   };

//   const resetData = () => setData(defaultData);

//   return (
//     <ItineraryContext.Provider value={{ data, updateData, resetData }}>
//       {children}
//     </ItineraryContext.Provider>
//   );
// };

// export const useItinerary = () => {
//   const context = useContext(ItineraryContext);
//   if (!context) {
//     throw new Error('useItinerary must be used within ItineraryProvider');
//   }
//   return context;
// };