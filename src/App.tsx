import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext'; // Adjust path as needed



import { Login } from './components/Login/Login';
import { AdminDashboard } from './components/AdminDashboard/AdminDashboard';
import { AgentDashboard } from './components/AgentDashboard/AgentDashboard';
import { BasicCreateItinerary } from './components/BasicCreateItinerary/BasicCreateItinerary';

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

import Unauthorized from './components/Unauthorized/Unauthorized';
import HomeLogin from './components/HomeLogin/HomeLogin';




// 👇 Split AppRoutes out so we can check auth inside
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  // 🔒 Not authenticated → show only login & unauthorized
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<HomeLogin />} />

        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }
}








function App() {
  return (
    <Router>

      <AuthProvider>

        <ItineraryProvider>  {/* Add this */}
          <SidebarProvider>
            <Layout>
              <Routes>

                {/* Public Routes */}
                <Route path="/" element={<HomeLogin />} />

                <Route path="/login" element={<Login />} />
                <Route path="/unauthorized" element={<Unauthorized />} />


                {/* Admin Protected Routes */}
                <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  {/* Add other admin routes here */}
                  <Route path="/customer-table" element={<CustomerTable />} />
                  {/* <Route path="/api-admin-dashboard" element={<Dashboard />} /> */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/agent-table" element={<AgentTable />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/crm" element={<CRM />} />


                </Route>





                {/* Agent Protected Routes */}
                <Route element={<ProtectedRoute allowedRoles={['AGENT']} />}>
                  <Route path="/agent/dashboard" element={<AgentDashboard />} />
                  <Route path="/agent/create-basic-itinerary" element={<BasicCreateItinerary />} />

                  {/* Add other agent routes here: 7steps */}
                  {/* NEW: Itinerary Step Routes */}


                  <Route path="/my-itinerary" element={<MyItinerary />} />
                  <Route path="/my-itinerary/create" element={<CreateItinerary />} />


                  <Route path="/my-itinerary/create/travel-basic" element={<TravelBasic />} />
                  <Route path="/my-itinerary/create/arrival-departure" element={<ArrivalDeparture />} />
                  <Route path="/my-itinerary/create/accommodation" element={<Accommodation />} />
                  <Route path="/my-itinerary/create/vehicle" element={<Vehicle />} />
                  <Route path="/my-itinerary/create/day-wise-itinerary" element={<DayWiseItinerary />} />
                  <Route path="/my-itinerary/create/pricing" element={<Pricing />} />
                  <Route path="/my-itinerary/create/trip-information" element={<TripInformation />} />
                  <Route path="/follow-ups" element={<FollowUps />} />
                  <Route path="/my-leads" element={<MyLeads />} />
                </Route>








                {/* Existing Routes */}




              </Routes>
            </Layout>
          </SidebarProvider>
        </ItineraryProvider>
      </AuthProvider>

    </Router>
  );
}

export default App;
