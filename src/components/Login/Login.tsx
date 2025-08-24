//v3
// src/components/Login.tsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/auth_api';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'ADMIN' | 'AGENT'>('AGENT');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  try {
    const response = await api.post('/auth/login', {
      email,
      password,
      role: selectedRole,
    });

    const { user, accessToken } = response.data.data;
    login(user, accessToken);

    if (user.role === 'ADMIN') {
      navigate('/admin/dashboard');
    } else {
      navigate('/agent/dashboard');
    }
  } catch (err: any) {
    setError(err.response?.data?.message || 'Login failed. Please try again.');
  } finally {
    setIsLoading(false);
  }
};

{/*loading animation*/}
  const LoadingDots = () => {
  return (
    <span className="inline-flex items-center">
      Log in
      <span className="ml-1 inline-flex">
        <span className="animate-loadingDot">.</span>
        <span className="animate-loadingDot" style={{ animationDelay: "0.2s" }}>.</span>
        <span className="animate-loadingDot" style={{ animationDelay: "0.4s" }}>.</span>
        <span className="animate-loadingDot" style={{ animationDelay: "0.6s" }}>.</span>
      </span>
    </span>
  );
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
      >

           {/* Logo Section */}
          <div className="flex justify-center mb-8">
          <img 
            src="/images/logo.png" 
            alt="Global Vacations Logo" 
            className="h-24 w-auto object-contain px-4"
          />
        </div>


        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">See more from Global Vacations</h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded-md text-center">
            {error}
          </div>
        )}

        {/* Role Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Login as</label>
          <div className="flex space-x-4">
            {['ADMIN', 'AGENT'].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role as 'ADMIN' | 'AGENT')}
                className={`flex-1 py-2 px-4 rounded-md border text-sm font-medium transition ${
                  selectedRole === role
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
          />
        </div>

        {/* Submit Button */}
      <button
  type="submit"
  disabled={isLoading}
  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
>
  {isLoading ? <LoadingDots /> : "Log in"}
</button>

           {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <a 
            href="/forgot-password" 
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            Forgotten your password?
          </a>
        </div>
        
         {/* Or Divider */}
        <div className="relative mt-6 mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

{/* Additional Options */}
            <div className="space-y-3 flex justify-center">
        <button
          type="button"
          className="inline-flex px-6 py-2 border border-green-600 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
        >
          Create new account
        </button>
      </div>
      </form>
    </div>
  );
};





// // v2
// // src/components/Login.tsx
// import React, { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import api from '../../api/auth_api';
// import { useNavigate } from 'react-router-dom';

// export const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const response = await api.post('/auth/login', { email, password });

//       const { user, accessToken } = response.data.data;

//       login(user, accessToken);

//       if (user.role === 'ADMIN') {
//         navigate('/admin/dashboard');
//       } else {
//         navigate('/agent/dashboard');
//       }
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Login failed. Please try again.');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

//         {error && (
//           <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
//         )}

//         {/* Email Field */}
//         <div className="mb-4">
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//             Email Address
//           </label>
//           <input
//             id="email"
//             type="email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
//             placeholder="Enter your email"
//           />
//         </div>

//         {/* Password Field */}
//         <div className="mb-6">
//           <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//             Password
//           </label>
//           <input
//             id="password"
//             type="password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
//             placeholder="Enter your password"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };
//...........................................................................



//v1
// // src/components/Login.tsx
// import React, { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import api from '../../api/auth_api';
// import { useNavigate } from 'react-router-dom'; // Assuming you use React Router

// export const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const response = await api.post('/auth/login', { email, password });
      
//       // The backend response has a 'data' object with user and accessToken
//       const { user, accessToken } = response.data.data;
      
//       // Use our context to save user and token
//       login(user, accessToken);
      
//       // Redirect based on role
//       if (user.role === 'ADMIN') {
//         navigate('/admin/dashboard');
//       } else {
//         navigate('/agent/dashboard');
//       }
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Login failed. Please try again.');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form onSubmit={handleLogin} className="p-8 bg-white rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//         {/* Email and Password Input fields with TailwindCSS classes */}
//         {/* ... */}
//         <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };