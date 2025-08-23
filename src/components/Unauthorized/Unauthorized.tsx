// src/pages/Unauthorized.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full text-center">
        <div className="flex justify-center mb-6">
          <ExclamationTriangleIcon className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-4">
          You do not have the necessary permissions to view this page.
        </p>
        <p className="text-gray-500 text-sm mb-6">
          This may be because your user role does not include access to this section, or your session has expired. Please check with your administrator or log in with the appropriate credentials.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleGoHome}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-5 rounded transition duration-200"
          >
            Go to Homepage
          </button>
          <button
            onClick={() => navigate('/login')}
            className="border border-red-500 text-red-500 hover:bg-red-50 font-medium py-2 px-5 rounded transition duration-200"
          >
            Login with another account
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          If you believe this is a mistake, please{' '}
          <a
            href="/contact"
            className="text-blue-500 hover:underline"
          >
            contact support
          </a>.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
