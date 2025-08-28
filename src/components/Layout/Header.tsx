//v4

// src/components/Header/Header.tsx
import React from 'react';
import { Bell, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();      // call backend + clear local state
    navigate('/login');  // redirect to login page
  };

  // Use user data if available, fallback to default values
  const userName = user?.name ?? 'Prachi Singh';
  const userRole = user?.role === 'ADMIN' ? 'Admin' : user?.role ?? 'User';

  // Greeting logic (example: "Hello Admin John" or "Hello John")
  const greeting = `Hello ${userName}`;

  // Extract initials (e.g., "PS" from "Prachi Singh")
  const initials = userName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 ">
      <div className="flex items-center justify-between ">
        {/* Left side - Menu and greeting */}
        <div className="flex items-center space-x-4">
          <Menu className="w-6 h-6 text-gray-600" />
          <h1 className="text-xl font-semibold  font-raleway text-gray-800">{greeting}</h1>
        </div>

        {/* Right side - Notifications, profile, logout */}
        <div className="flex items-center space-x-6">
          {/* Notifications */}
          <button
            className="relative p-2 text-gray-600 hover:text-gray-800"
            aria-label="Notifications"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500  rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center  space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center font-raleway justify-center">
              <span className="text-sm font-medium text-gray-800">{initials}</span>
            </div>
            <div className="text-sm">
              <p className="font-medium  text-gray-800">{userName}</p>
              <p className="font-sans text-gray-500">{userRole}</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 text-red-600 hover:text-red-800 font-semibold"
            aria-label="Logout"
          >
            <LogOut className="w-3   h-3" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;


























// //v3

// import React from 'react';
// import { Bell, Menu, LogOut } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const Header: React.FC = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await logout();      // call backend + clear local state
//     navigate('/login');  // redirect to login page
//   };

//   const greeting = 'Hello Prachi Singh';

//   return (
//     <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
//       <div className="flex items-center justify-between">
//         {/* Left side - Menu and greeting */}
//         <div className="flex items-center space-x-4">
//           <Menu className="w-6 h-6 text-gray-600" />
//           <h1 className="text-xl font-semibold text-gray-800">{greeting}</h1>
//         </div>

//         {/* Right side - Notifications, profile, logout */}
//         <div className="flex items-center space-x-6">
//           {/* Notifications */}
//           <button
//             className="relative p-2 text-gray-600 hover:text-gray-800"
//             aria-label="Notifications"
//           >
//             <Bell className="w-6 h-6" />
//             <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
//           </button>

//           {/* Profile */}
//           <div className="flex items-center space-x-3">
//             <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
//               <span className="text-sm font-medium text-gray-600">P</span>
//             </div>
//             <div className="text-sm">
//               <p className="font-medium text-gray-800">Prachi Singh</p>
//                <p className="text-gray-500">Admin</p> 
//             </div>
//           </div>

//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className="flex items-center space-x-1 text-red-600 hover:text-red-800 font-medium"
//             aria-label="Logout"
//           >
//             <LogOut className="w-3 h-3" />
//             <span>Logout</span>
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;



