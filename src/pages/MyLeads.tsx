import React, { useState } from 'react';
import { Search, Filter, Plus, Phone, Mail, Calendar, TrendingUp, User, MapPin } from 'lucide-react';
import leadsData from '../data/leadsData.json';

const MyLeads: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<any>(null);

  const filteredLeads = leadsData.leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hot':
        return 'bg-red-100 text-red-800';
      case 'Warm':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cold':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Website':
        return 'bg-green-100 text-green-800';
      case 'Social Media':
        return 'bg-purple-100 text-purple-800';
      case 'Referral':
        return 'bg-blue-100 text-blue-800';
      case 'Google Ads':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div> 
      <div className="flex items-center justify-between font-roboto">
        <h1 className="text-2xl font-semibold text-teal-600 font-raleway">My Leads</h1>
        <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-raleway flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Lead</span>
        </button>
      </div>
        <div className="border-b border-gray-700 w-full mb-6 mt-3"></div>
        </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-raleway">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{leadsData.leads.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hot Leads</p>
              <p className="text-2xl font-bold text-gray-900">{leadsData.leads.filter(l => l.status === 'Hot').length}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Warm Leads</p>
              <p className="text-2xl font-bold text-gray-900">{leadsData.leads.filter(l => l.status === 'Warm').length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cold Leads</p>
              <p className="text-2xl font-bold text-gray-900">{leadsData.leads.filter(l => l.status === 'Cold').length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
    
        <div className="flex items-center space-x-4 font-raleway">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 " />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-64"
            />
          </div>

  <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-full"
          >
            <option value="all">All Status</option>
            <option value="hot">Hot</option>
            <option value="warm">Warm</option>
            <option value="cold">Cold</option>
          </select>

          {/* Filter Button */}
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        
      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold font-raleway text-gray-900">Leads List</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full table-fixed divide-y divide-gray-200 text-sm font-inter">
                <thead className="font-roboto ">
                  <tr>
                    <th className="min-w-[180px] px-6 py-3 text-left font-raleway font-semibold text-[12px]  tracking-wider text-gray-700 bg-[#F6F6FA] whitespace-nowrap">
                      Customer Name
                    </th>
                    <th className="w-[180px] px-6 py-3 text-left font-raleway font-semibold text-[12px]  tracking-wider text-gray-700 bg-[#F6F6FA] whitespace-nowrap">
                      Email
                    </th>
                    <th className="w-[140px] px-6 py-3 text-left font-raleway font-semibold text-[12px]  tracking-wider text-gray-700 bg-[#F6F6FA] whitespace-nowrap">
                      Interested In
                    </th>
                    <th className="w-[110px] px-6 py-3 text-center font-raleway font-semibold text-[12px] tracking-wider text-gray-700 bg-[#F6F6FA]">
                      Status
                    </th>
                    <th className="w-[120px] px-6 py-3 text-right font-raleway font-semibold text-[12px]  tracking-wider text-gray-700 bg-[#F6F6FA]">
                      Budget
                    </th>
                    <th className="w-[110px] px-6 py-3 text-center font-raleway font-semibold text-[12px]  tracking-wider text-gray-700 bg-[#F6F6FA]">
                      Source
                    </th>
                    <th className="w-[140px] px-6 py-3 text-left font-raleway font-semibold text-[12px] tracking-wider text-gray-700 bg-[#F6F6FA] whitespace-nowrap">
                      Assigned To
                    </th>
                    <th className="w-[120px] px-6 py-3 text-center font-raleway font-semibold text-[12px]  tracking-wider text-gray-700 bg-[#F6F6FA]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-roboto">
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className={`cursor-pointer transition-colors ${selectedLead?.id === lead.id ? 'bg-gray-100 border-l-4 border-teal-500' : 'hover:bg-gray-50'}`}
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="min-w-[180px] px-6 py-3 font-roboto font-semibold text-[11px] text-[#22223B] whitespace-nowrap truncate align-middle">
                        {lead.name}
                      </td>
                      <td className="w-[180px] px-6 py-3 font-inter text-[12px] text-gray-700 whitespace-nowrap align-middle">
                        {lead.email}
                      </td>
                      <td className="w-[140px] px-6 py-3 font-inter text-[12px] text-gray-700 whitespace-nowrap align-middle">
                        {lead.interestedIn}
                      </td>
                      <td className="w-[110px] px-6 py-3 text-center align-middle">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="w-[120px] px-6 py-3 text-right font-inter text-[12px] text-gray-900 align-middle">
                        ₹{lead.budget.toLocaleString()}
                      </td>
                      <td className="w-[110px] px-6 py-3 text-center align-middle">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getSourceColor(lead.source)}`}>
                          {lead.source}
                        </span>
                      </td>
                      <td className="w-[140px] px-6 py-3 font-inter text-[12px] text-gray-700 whitespace-nowrap align-middle">
                        {lead.assignedTo}
                      </td>
                      <td className="w-[120px] px-6 py-3 text-center align-middle">
                        <button className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-xs font-semibold transition-colors">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredLeads.length === 0 && (
                <div className="text-center py-12">
                  <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
                  <p className="text-gray-600 mb-4">Add a new lead to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lead Details */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-6">
            {selectedLead ? (
              <div>
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Lead Details</h2>
                </div>
                <div className="p-4 space-y-4">
                  {/* Lead Info */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <User className="w-8 h-8 text-gray-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedLead.name}</h3>
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedLead.status)}`}>
                        {selectedLead.status}
                      </span>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getSourceColor(selectedLead.source)}`}>
                        {selectedLead.source}
                      </span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedLead.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedLead.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedLead.interestedIn}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Assigned to: {selectedLead.assignedTo}</span>
                    </div>
                  </div>

                  {/* Budget & Dates */}
                  <div className="grid grid-cols-1 gap-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">₹{selectedLead.budget.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Budget</p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Created:</span>
                      <span className="text-sm font-medium text-gray-900">{new Date(selectedLead.createdDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Last Contact:</span>
                      <span className="text-sm font-medium text-gray-900">{new Date(selectedLead.lastContact).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Notes</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedLead.notes}</p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 space-y-2">
                    <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                      Contact Lead
                    </button>
                    <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                      Schedule Follow-up
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Lead</h3>
                <p className="text-gray-600">Choose a lead from the list to view their details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLeads;