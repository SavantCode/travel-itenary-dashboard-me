import React, { useState } from 'react';
import { Search, Download, Calendar } from 'lucide-react';

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('leads');
  const [dateRange, setDateRange] = useState('27-12-2024 To 27-12-2024');

  const tabs = [
    { id: 'leads', label: 'Leads', active: true },
    { id: 'customers', label: 'Customers' },
    { id: 'revenue', label: 'Revenue' },
    { id: 'agents', label: 'Agents' }
  ];

  const reportData = [
    {
      id: 1,
      customerName: 'Priya Patel',
      email: 'Priya.patel@example.com',
      phone: '+1 (555) 012-3456',
      address: 'abcdabcd',
      owner: 'rashmi singh'
    },
    {
      id: 2,
      customerName: 'Priya Patel',
      email: 'Priya.patel@example.com',
      phone: '+1 (555) 012-3456',
      address: 'abcdabcd',
      owner: 'rashmi singh'
    },
    {
      id: 3,
      customerName: 'Priya Patel',
      email: 'Priya.patel@example.com',
      phone: '+1 (555) 012-3456',
      address: 'abcdabcd',
      owner: 'rashmi singh'
    },
    {
      id: 4,
      customerName: 'Priya Patel',
      email: 'Priya.patel@example.com',
      phone: '+1 (555) 012-3456',
      address: 'abcdabcd',
      owner: 'rashmi singh'
    },
    {
      id: 5,
      customerName: 'Priya Patel',
      email: 'Priya.patel@example.com',
      phone: '+1 (555) 012-3456',
      address: 'abcdabcd',
      owner: 'rashmi singh'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Here..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-64"
            />
          </div>
          {/* Download Reports Button */}
          <button className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Download Reports</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-teal-500 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Date Range and Report Type */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Lead Performance Reports</span>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>FROM 27-12-2024</span>
            <span>To 27-12-2024</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Customer Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Email</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Address</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Owner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reportData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.customerName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.address}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table Footer */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Showing {reportData.length} of {reportData.length} records</span>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Previous</button>
          <button className="px-3 py-1 bg-teal-500 text-white rounded">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Reports;