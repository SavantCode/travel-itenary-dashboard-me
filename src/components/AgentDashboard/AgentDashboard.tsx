// src/components/AgentDashboard/AgentDashboard.tsx

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; // Adjust path as needed
import api from '../../api/auth_api';
import { useNavigate } from 'react-router-dom';

interface Itinerary {
  _id: string;
  title: string;
  destination: string;
  customer: {
    name: string;
    email: string;
  };
  duration: {
    startDate: string;
    endDate: string;
  };
  details: string;
  createdAt: string;
}

export const AgentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItineraries = async () => {
      if (!user) {
        setError('User not authenticated.');
        setIsLoading(false);
        return;
      }

      try {
        setError(null);
        setIsLoading(true);

        let response;

        if (user.role === 'ADMIN') {
          response = await api.get(`/admin/itineraries?agentId=${user._id}`);
        } else {
          response = await api.get('/itineraries');
        }

        setItineraries(response.data.data);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            'An unexpected error occurred while fetching itineraries.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchItineraries();
  }, [user]);

  const handleCreateNew = () => {
    navigate('/agent/create-basic-itinerary');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Loading your itineraries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-teal-500">Agent Itneraries ✈️</h1>
        <button
          onClick={handleCreateNew}
          className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-300"
        >
          + Create New
        </button>
      </div>

      {itineraries.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow">
          <p className="text-gray-500">You haven't created any itineraries yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itineraries.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.destination}</p>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-500">
                  <strong>Customer:</strong> {item.customer.name}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Dates:</strong>{' '}
                  {new Date(item.duration.startDate).toLocaleDateString()} -{' '}
                  {new Date(item.duration.endDate).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <button className="text-sm text-blue-500 hover:underline">Edit</button>
                <button className="text-sm text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
