// v2

// src/components/Header/Header.tsx
import React from 'react';
import { Bell, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Generate greeting based on role and name
  // const greeting = user
  //   ? `Hello ${user.role === 'ADMIN' ? user.name : user.name}`
  //   : 'Hello User';
  const greeting = 'Hello Prachi Singh';

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Menu and greeting */}
        <div className="flex items-center space-x-4">
          <Menu className="w-6 h-6 text-gray-600" />
          <h1 className="text-xl font-semibold text-gray-800">{greeting}</h1>
        </div>

        {/* Right side - Notifications, profile, logout */}
        <div className="flex items-center space-x-6">
          {/* Notifications */}
          <button
            className="relative p-2 text-gray-600 hover:text-gray-800"
            aria-label="Notifications"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">

                {/*Added symbol for showcase*/}
              <span className="text-sm font-medium text-gray-600">P</span>
              {/* <span className="text-sm font-medium text-gray-600">
                {user
                  ? user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                  : 'NA'}
              </span> */}


            </div>
            <div className="text-sm">

              {/*Changed super admin to prachi singh*/}
              {/* <p className="font-medium text-gray-800">{user?.name ?? 'User Name'}</p>
              <p className="text-gray-500">{user?.role ?? 'Role'}</p> */}
              <p className="font-medium text-gray-800">Prachi Singh</p>

            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 text-red-600 hover:text-red-800 font-medium"
            aria-label="Logout"
          >
            <LogOut className="w-3 h-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;


















// ...............................................

//v1
// import React from 'react';
// import { Search, Bell, Menu } from 'lucide-react';

// const Header: React.FC = () => {
//   return (
//     <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
//       <div className="flex items-center justify-between">
//         {/* Left side - Menu and greeting */}
//         <div className="flex items-center space-x-4">
//           <Menu className="w-6 h-6 text-gray-600" />
//           <h1 className="text-xl font-semibold text-gray-800">Hello Aditya</h1>
//         </div>

//         {/* Right side - Search, notifications, profile */}
//         <div className="flex items-center space-x-4">
//           {/* Search */}
//           {/* <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="dont Search Here..."
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-64"
//             />
//           </div> */}

//           {/* Notifications */}
//           <button className="relative p-2 text-gray-600 hover:text-gray-800">
//             <Bell className="w-6 h-6" />
//             <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
//           </button>

//           {/* Profile */}
//           <div className="flex items-center space-x-3">
//             <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
//               <span className="text-sm font-medium text-gray-600">AS</span>
//             </div>
//             <div className="text-sm">
//               <p className="font-medium text-gray-800">Aditya Soni</p>
//               <p className="text-gray-500">Admin</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;