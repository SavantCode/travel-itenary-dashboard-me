import React, { useState } from 'react';
import { Plus, Calendar, MapPin, Users, Clock, Filter, Search } from 'lucide-react';

interface Itinerary {
  id: number;
  title: string;
  destination: string;
  duration: string;
  travelers: number;
  startDate: string;
  endDate: string;
  status: 'Draft' | 'Active' | 'Completed';
  budget: number;
  activities: string[];
}

const MyItinerary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const itineraries: Itinerary[] = [
    {
      id: 1,
      title: 'European Adventure',
      destination: 'Paris, Rome, Barcelona',
      duration: '14 days',
      travelers: 2,
      startDate: '2024-06-15',
      endDate: '2024-06-29',
      status: 'Active',
      budget: 85000,
      activities: ['Sightseeing', 'Museums', 'Food Tours']
    },
    {
      id: 2,
      title: 'Tropical Paradise',
      destination: 'Maldives',
      duration: '7 days',
      travelers: 2,
      startDate: '2024-07-10',
      endDate: '2024-07-17',
      status: 'Draft',
      budget: 120000,
      activities: ['Beach', 'Snorkeling', 'Spa']
    },
    {
      id: 3,
      title: 'Cultural Heritage Tour',
      destination: 'Rajasthan, India',
      duration: '10 days',
      travelers: 4,
      startDate: '2024-03-01',
      endDate: '2024-03-11',
      status: 'Completed',
      budget: 65000,
      activities: ['Palaces', 'Desert Safari', 'Local Cuisine']
    },
    {
      id: 4,
      title: 'Mountain Expedition',
      destination: 'Nepal Himalayas',
      duration: '21 days',
      travelers: 6,
      startDate: '2024-09-15',
      endDate: '2024-10-06',
      status: 'Draft',
      budget: 95000,
      activities: ['Trekking', 'Mountain Views', 'Local Culture']
    }
  ];

  const filteredItineraries = itineraries.filter(itinerary => {
    const matchesSearch = itinerary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         itinerary.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || itinerary.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Itinerary</h1>
        <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Create New Itinerary</span>
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search itineraries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-64"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="completed">Completed</option>
          </select>

          {/* Filter Button */}
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Itinerary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItineraries.map((itinerary) => (
          <div key={itinerary.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Card Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{itinerary.title}</h3>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(itinerary.status)}`}>
                  {itinerary.status}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{itinerary.destination}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{itinerary.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{itinerary.travelers} travelers</span>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(itinerary.startDate).toLocaleDateString()} - {new Date(itinerary.endDate).toLocaleDateString()}</span>
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  ₹{itinerary.budget.toLocaleString()}
                </div>
              </div>

              {/* Activities */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Activities</h4>
                <div className="flex flex-wrap gap-2">
                  {itinerary.activities.map((activity, index) => (
                    <span key={index} className="inline-flex px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                  View Details
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItineraries.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No itineraries found</h3>
          <p className="text-gray-600 mb-4">Create your first itinerary to get started</p>
          <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 mx-auto transition-colors">
            <Plus className="w-4 h-4" />
            <span>Create New Itinerary</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MyItinerary;