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

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-itinerary" element={<MyItinerary />} />
          <Route path="/agent-table" element={<AgentTable />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/my-leads" element={<MyLeads />} />
          <Route path="/follow-ups" element={<FollowUps />} />
          <Route path="/customer-table" element={<CustomerTable />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;