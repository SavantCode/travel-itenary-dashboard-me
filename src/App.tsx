import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import AgentTable from './pages/AgentTable';
import Reports from './pages/Reports';
import MyItinerary from './pages/MyItinerary';
import CRM from './pages/CRM';
import MyLeads from './pages/MyLeads';
import FollowUps from './pages/FollowUps';
import CustomerTable from './pages/CustomerTable';
import CreateItinerary from './pages/CreateItinerary';

import TravelBasic from './pages/itinerarySteps/TravelBasic';
import ArrivalDeparture from './pages/itinerarySteps/ArrivalDeparture';
import Accommodation from './pages/itinerarySteps/Accommodation';
import Vehicle from './pages/itinerarySteps/Vehicle';
import DayWiseItinerary from './pages/itinerarySteps/DayWiseItinerary';
import Pricing from './pages/itinerarySteps/Pricing';
import TripInformation from './pages/itinerarySteps/TripInformation';

import { SidebarProvider } from "./context/SidebarContext";
import { ItineraryProvider } from "./context/ItineraryContext"; // Import the ItineraryProvider

function App() {
  return (
    <Router>
      <ItineraryProvider>  {/* Add this */}
      <SidebarProvider>
        <Layout>
          <Routes>
            {/* Existing Routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-itinerary" element={<MyItinerary />} />
            <Route path="/my-itinerary/create" element={<CreateItinerary />} />
            <Route path="/agent-table" element={<AgentTable />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/my-leads" element={<MyLeads />} />
            <Route path="/follow-ups" element={<FollowUps />} />
            <Route path="/customer-table" element={<CustomerTable />} />

            {/* NEW: Itinerary Step Routes */}
            <Route path="/my-itinerary/create/travel-basic" element={<TravelBasic />} />
            <Route path="/my-itinerary/create/arrival-departure" element={<ArrivalDeparture />} />
            <Route path="/my-itinerary/create/accommodation" element={<Accommodation />} />
            <Route path="/my-itinerary/create/vehicle" element={<Vehicle />} />
            <Route path="/my-itinerary/create/day-wise-itinerary" element={<DayWiseItinerary />} />
            <Route path="/my-itinerary/create/pricing" element={<Pricing />} />
            <Route path="/my-itinerary/create/trip-information" element={<TripInformation />} />
          </Routes>
        </Layout>
      </SidebarProvider>
      </ItineraryProvider>  
    </Router>
  );
}

export default App;
