import React, { useState } from 'react';
import { Search, Filter, Plus, Calendar, Clock, User, Phone, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import followUpsData from '../data/followUpsData.json';

const FollowUps: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredFollowUps = followUpsData.followUps.filter(followUp => {
    const matchesSearch = followUp.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         followUp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || followUp.status.toLowerCase() === statusFilter;
    const matchesPriority = priorityFilter === 'all' || followUp.priority.toLowerCase() === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Sales Follow-up':
        return 'bg-purple-100 text-purple-800';
      case 'Information Follow-up':
        return 'bg-blue-100 text-blue-800';
      case 'Interest Check':
        return 'bg-orange-100 text-orange-800';
      case 'Booking Follow-up':
        return 'bg-green-100 text-green-800';
      case 'Proposal Follow-up':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = (date: string) => {
    return new Date(date) < new Date();
  };

  const getDaysUntilFollowUp = (date: string) => {
    const today = new Date();
    const followUpDate = new Date(date);
    const diffTime = followUpDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-[#F6F6FA] min-h-screen p-4 sm:p-6 lg:p-1 font-roboto text-sm">
      
      <div className="space-y-6">
        {/* Header */}
        <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#10A4B0] font-raleway">Follow Ups</h1>
          <button className="bg-[#10A4B0] hover:bg-[#0e8a97] text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors font-raleway font-medium text-sm">
            <Plus className="w-4 h-4" />
            <span>Schedule Follow-up</span>
          </button>
        </div>
          <div className="border-b border-gray-700 w-full mb-6 mt-3"></div>
          </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 font-raleway">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Follow-ups</p>
                <p className="text-2xl font-bold text-gray-900">{followUpsData.followUps.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{followUpsData.followUps.filter(f => f.status === 'Pending').length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{followUpsData.followUps.filter(f => f.status === 'Completed').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-gray-900">
                  {followUpsData.followUps.filter(f => isOverdue(f.nextFollowUp) && f.status !== 'Completed').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
      
          <div className="flex items-center font-raleway space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search follow-ups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-2 py-2 border border-gray-300  rounded-full focus:outline-none focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent w-64 font-inter text-sm"
              />
            </div>

  <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#10A4B0] font-inter text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="in progress">In Progress</option>
            </select>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#10A4B0] font-inter text-sm"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            {/* Filter Button */}
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300  hover:bg-gray-50 rounded-full text-sm font-medium">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>


          </div>
          
        

        {/* Follow-ups List */}
        <div className="bg-white rounded-lg shadow-sm border  border-[#E0E0E0]">
          <div className="p-4 border-b  border-[#E0E0E0]">
            <h2 className="text-lg font-semibold text-[#22223B]  font-raleway mb-0">Follow-up Schedule</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed divide-y bg- divide-gray-200 font-roboto">
              <thead className='bg-slate-50'>
                <tr className='bg-slate-50' >
                  <th className="min-w-[220px] px-6 py-3 text-left bg-[#F6F6FA] font-roboto font-semibold text-[12px]  tracking-wider text-[#22223B]  whitespace-nowrap">
                    Customer Name
                  </th>
                  <th className="w-[180px] px-6 py-3 text-left font-roboto font-semibold text-[12px]  tracking-wider text-[#22223B] bg-[#F6F6FA] whitespace-nowrap">
                    Email
                  </th>
                  <th className="w-[130px] px-6 py-3 text-left font-roboto font-semibold text-[12px]  tracking-wider text-[#22223B] bg-[#F6F6FA] whitespace-nowrap">
                    Phone
                  </th>
                  <th className="w-[140px] px-6 py-3 text-left font-roboto font-semibold text-[12px]  tracking-wider text-[#22223B] bg-[#F6F6FA] whitespace-nowrap">
                    Assigned To
                  </th>
                  <th className="w-[110px] px-6 py-3 text-center font-roboto font-semibold text-[12px] tracking-wider text-[#22223B] bg-[#F6F6FA]">
                    Status
                  </th>
                  <th className="w-[110px] px-6 py-3 text-center font-roboto font-semibold text-[12px] tracking-wider text-[#22223B] bg-[#F6F6FA]">
                    Priority
                  </th>
                  <th className="w-[140px] px-6 py-3 text-center font-roboto font-semibold text-[12px]  tracking-wider text-[#22223B] bg-[#F6F6FA]">
                    Type
                  </th>
                  <th className="w-[120px] px-6 py-3 text-center font-roboto font-semibold text-[12px]  tracking-wider text-[#22223B] bg-[#F6F6FA] whitespace-nowrap">
                    Last Contact
                  </th>
                  <th className="w-[150px] px-6 py-3 text-center font-roboto font-semibold text-[12px]  tracking-wider text-[#22223B] bg-[#F6F6FA] whitespace-nowrap">
                    Next Follow-up
                  </th>
                  <th className="w-[200px] px-6 py-3 text-left font-roboto font-semibold text-[12px]  tracking-wider text-[#22223B] bg-[#F6F6FA]">
                    Notes
                  </th>
                  <th className="w-[180px] px-6 py-3 text-center font-roboto font-semibold text-[12px]  tracking-wider text-[#22223B] bg-[#F6F6FA]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-roboto">
                {filteredFollowUps.map((followUp) => {
                  const daysUntil = getDaysUntilFollowUp(followUp.nextFollowUp);
                  const overdue = isOverdue(followUp.nextFollowUp) && followUp.status == 'Completed';
                  return (
                    <tr key={followUp.id} className={overdue ? 'bg-gray-0' : 'hover:bg-gray-50'}>
                      <td className="min-w-[220px] px-6 py-3 font-roboto font-medium text-[12px] text-[#22223B] align-middle whitespace-nowrap truncate">
                        {followUp.customerName}
                      </td>
                      <td className="w-[180px] px-6 py-3 font-roboto font-normal text-[12px] text-[#22223B] align-middle whitespace-nowrap">
                        {followUp.email}
                      </td>
                      <td className="w-[130px] px-6 py-3 font-roboto font-normal text-[12px] text-[#22223B] align-middle whitespace-nowrap">
                        {followUp.phone}
                      </td>
                      <td className="w-[140px] px-6 py-3 font-roboto font-normal text-[12px] text-[#22223B] align-middle whitespace-nowrap">
                        {followUp.assignedTo}
                      </td>
                      <td className="w-[110px] px-6 py-3 align-middle text-center">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(followUp.status)}`}>
                          {followUp.status}
                        </span>
                      </td>
                      <td className="w-[110px] px-6 py-3 align-middle text-center">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(followUp.priority)}`}>
                          {followUp.priority}
                        </span>
                      </td>
                      <td className="w-[140px] px-6 py-3 align-middle text-center">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(followUp.type)}`}>
                          {followUp.type}
                        </span>
                      </td>
                      <td className="w-[120px] px-6 py-3 font-roboto font-normal text-[12px] text-[#22223B] align-middle text-center whitespace-nowrap">
                        {new Date(followUp.lastContact).toLocaleDateString()}
                      </td>
                      <td className={`w-[150px] px-6 py-3 font-roboto font-normal text-[12px] align-middle text-center whitespace-nowrap ${overdue ? 'text-red-600 font-semibold' : 'text-[#22223B]'}`}>
                        {new Date(followUp.nextFollowUp).toLocaleDateString()}
                        {overdue ? ' (Overdue)' : daysUntil === 0 ? ' (Today)' : daysUntil === 1 ? ' (Tomorrow)' : ` (${daysUntil} days)`}
                      </td>
                      <td className="w-[200px] px-6 py-3 font-roboto font-normal text-[12px] text-[#22223B] align-middle max-w-xs truncate">
                        {followUp.notes}
                      </td>
                      <td className="w-[180px] px-6 py-3 align-middle text-center whitespace-nowrap">
                        <div className="flex items-center justify-center space-x-2">
                          {followUp.status !== 'Completed' && (
                            <button className="bg-[#10A4B0] hover:bg-[#0e8a97] text-white px-3 py-1 rounded text-xs font-semibold transition-colors font-roboto">
                              Complete
                            </button>
                          )}
                          <button className="border border-gray-300 hover:bg-gray-50 text-[#22223B] px-3 py-1 rounded text-xs font-semibold transition-colors font-roboto">
                            Reschedule
                          </button>
                          <button className="border border-gray-300 hover:bg-gray-50 text-[#22223B] px-3 py-1 rounded text-xs font-semibold transition-colors font-roboto">
                            Contact
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredFollowUps.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-[#22223B] mb-2 font-roboto">No follow-ups found</h3>
                <p className="text-[#22223B] mb-4 font-roboto">Schedule your first follow-up to get started</p>
                <button className="bg-[#10A4B0] hover:bg-[#0e8a97] text-white px-4 py-2 rounded-lg flex items-center space-x-2 mx-auto transition-colors font-roboto font-medium text-sm">
                  <Plus className="w-4 h-4" />
                  <span>Schedule Follow-up</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUps;