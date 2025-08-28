// src/pages/CreateItinerary.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/auth_api';

export const BasicCreateItinerary = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    customerName: '',
    customerEmail: '',
    startDate: '',
    endDate: '',
    details: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      title: formData.title,
      destination: formData.destination,
      customer: {
        name: formData.customerName,
        email: formData.customerEmail,
      },
      duration: {
        startDate: formData.startDate,
        endDate: formData.endDate,
      },
      details: formData.details,
    };

    try {
      await api.post('/itineraries', payload);
      navigate('/agent/dashboard'); // Redirect after creation
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create itinerary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow mt-10 font-raleway">
      <h2 className="text-2xl font-bold mb-4 text-teal-600">Create New Itinerary</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Trip Title"
          required
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="text"
          name="destination"
          placeholder="Destination"
          required
          value={formData.destination}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          required
          value={formData.customerName}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="email"
          name="customerEmail"
          placeholder="Customer Email"
          required
          value={formData.customerEmail}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <div className="flex space-x-4">
          <input
            type="date"
            name="startDate"
            required
            value={formData.startDate}
            onChange={handleChange}
            className="w-1/2 border rounded px-3 py-2"
          />
          <input
            type="date"
            name="endDate"
            required
            value={formData.endDate}
            onChange={handleChange}
            className="w-1/2 border rounded px-3 py-2"
          />
        </div>

        <textarea
          name="details"
          placeholder="Trip Details"
          rows={4}
          required
          value={formData.details}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Itinerary'}
        </button>
      </form>
    </div>
  );
};
