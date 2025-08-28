import React, { useState, useEffect, useCallback } from 'react';
// import api from '../services/api'; // Your configured Axios instance

import api from '../../api/auth_api';

// 1. TYPE DEFINITIONS FOR DATA
// =================================================================================
// Defines the structure for an Agent user
interface Agent {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
}

// Defines the structure for an Itinerary as seen by an Admin
// It includes the populated agent information.
interface AdminItinerary {
  _id: string;
  title: string;
  destination: string;
  agent: {
    _id: string;
    name: string;
    email: string;
  };
  duration: {
    startDate: string;
    endDate: string;
  };
  createdAt: string;
}

type ActiveTab = 'agents' | 'itineraries';

// =================================================================================
// ADMIN DASHBOARD COMPONENT
// =================================================================================
export const AdminDashboard = () => {
  // 2. STATE MANAGEMENT
  // =================================================================================
  const [agents, setAgents] = useState<Agent[]>([]);
  const [itineraries, setItineraries] = useState<AdminItinerary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('agents');

  // 3. DATA FETCHING LOGIC
  // =================================================================================
  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch agents and itineraries in parallel for better performance
      const [agentsResponse, itinerariesResponse] = await Promise.all([
        api.get('/admin/agents'),
        api.get('/admin/itineraries'),
      ]);
      setAgents(agentsResponse.data.data);
      setItineraries(itinerariesResponse.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // 4. ADMIN ACTIONS
  // =================================================================================
  const handleToggleAgentStatus = async (agentId: string, currentStatus: boolean) => {
    // Optimistic UI update: change the state immediately for a fast user experience.
    setAgents(currentAgents =>
      currentAgents.map(agent =>
        agent._id === agentId ? { ...agent, isActive: !currentStatus } : agent
      )
    );

    try {
      // Make the API call to the backend
      await api.patch(`/admin/agents/${agentId}/status`, {
        isActive: !currentStatus,
      });
    } catch (err) {
      // If the API call fails, revert the change and show an error.
      alert('Failed to update agent status. Please try again.');
      setAgents(currentAgents =>
        currentAgents.map(agent =>
          agent._id === agentId ? { ...agent, isActive: currentStatus } : agent
        )
      );
    }
  };

  // 5. RENDERING LOGIC
  // =================================================================================
  if (isLoading) {
    return <div className="p-8 text-center">Loading Admin Dashboard...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500 bg-red-100 rounded-lg">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-2 bg-gray-50 font-raleway min-h-screen">
      <h1 className="text-2xl font-bold text-teal-600 mb-6">Admin Dashboard</h1>
       {/* Underline */}
        <div className="border-b border-gray-700 w-full mb-6 mt-7"></div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700">Total Agents</h2>
          <p className="text-3xl font-bold text-blue-500">{agents.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700">Total Itineraries</h2>
          <p className="text-3xl font-bold text-green-500">{itineraries.length}</p>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('agents')}
              className={`${
                activeTab === 'agents'
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Manage Agents
            </button>
            <button
              onClick={() => setActiveTab('itineraries')}
              className={`${
                activeTab === 'itineraries'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              View All Itineraries
            </button>
          </nav>
        </div>
      </div>

      {/* Conditional Content Based on Tab */}
      <div>
        {activeTab === 'agents' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Agents List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {agents.map(agent => (
                    <tr key={agent._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{agent.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agent.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          agent.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {agent.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => handleToggleAgentStatus(agent._id, agent.isActive)}
                          className={`font-bold py-1 px-3 rounded text-white ${
                            agent.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                          }`}
                        >
                          {agent.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'itineraries' && (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itineraries.map(item => (
              <div key={item._id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.destination}</p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500">
                    <strong>Created By:</strong> {item.agent.name} ({item.agent.email})
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Travel Dates:</strong> {new Date(item.duration.startDate).toLocaleDateString()} - {new Date(item.duration.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};