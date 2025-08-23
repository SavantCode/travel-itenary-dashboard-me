// src/pages/HomeLogin.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeLogin: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
      <div className="max-w-xl w-full bg-white p-10 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to TripDesk ✈️</h1>
        <p className="text-gray-600 mb-6 text-lg">
          TripDesk is your travel management dashboard for agents and admins to create, manage, and track customer itineraries.
          Please log in to access your personalized dashboard.
        </p>
        <button
          onClick={handleLoginClick}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md text-lg hover:bg-blue-700 transition duration-200"
        >
          Login to Continue
        </button>
      </div>
    </div>
  );
};

export default HomeLogin;
