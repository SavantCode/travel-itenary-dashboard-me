import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MapPin, 
  Users, 
  FileText, 
  UserCheck, 
  TrendingUp, 
  UserPlus, 
  Table,
  ChevronDown
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: MapPin, label: 'My Itinerary', path: '/my-itinerary' },
    { icon: Users, label: 'Agent Table', path: '/agent-table' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: UserCheck, label: 'CRM', path: '/crm' },
    { icon: TrendingUp, label: 'My Leads', path: '/my-leads', hasSubmenu: true },
    { icon: UserPlus, label: 'Follow Ups', path: '/follow-ups', hasSubmenu: true },
    { icon: Table, label: 'Customer Table', path: '/customer-table', hasSubmenu: true },
  ];

  return (
    <div className="bg-white w-64 shadow-lg flex flex-col">
      {/* Logo */}
    <div className="p-6 border-b border-gray-200">
  <div className="flex items-center space-x-3">
    <div className="w-8 h-8 rounded-lg flex items-center justify-center">
      <img 
        src="/images/logo.png" 
        alt="Global Vacations Logo" 
        className="w-full h-full object-contain rounded-lg" 
      />
    </div>
    <span className="text-xl font-bold text-teal-500">Global Vacations</span>
  </div>
</div>




      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-teal-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.hasSubmenu && (
                  <ChevronDown className="w-4 h-4" />
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;