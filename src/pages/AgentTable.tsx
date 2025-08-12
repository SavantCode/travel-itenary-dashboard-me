import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, MoreVertical } from 'lucide-react';
import agentsData from '../data/agentsData.json';
import AddAgentModal from '../components/AgentTable/AddAgentModal';

const ITEMS_PER_PAGE = 5;

const AgentTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'assigned' | 'unassigned'>('all');
  const [agents, setAgents] = useState(agentsData.agents);
  const [selectedAgents, setSelectedAgents] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtering logic
  const filteredAgents = useMemo(() => {
    return agents.filter(agent => {
      const matchesSearch = [agent.name, agent.email]
        .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || agent.status.toLowerCase() === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [agents, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredAgents.length / ITEMS_PER_PAGE);
  const paginatedAgents = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAgents.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAgents, currentPage]);

  const handleSelectAgent = (agentId: number) => {
    setSelectedAgents(prev =>
      prev.includes(agentId) ? prev.filter(id => id !== agentId) : [...prev, agentId]
    );
  };

  const handleSelectAllOnPage = () => {
    const idsOnPage = paginatedAgents.map(a => a.id);
    const allSelected = idsOnPage.every(id => selectedAgents.includes(id));
    setSelectedAgents(prev =>
      allSelected ? prev.filter(id => !idsOnPage.includes(id)) : [...new Set([...prev, ...idsOnPage])]
    );
  };

  const handleAddAgent = (newAgent: Omit<typeof agents[0], 'id' | 'performance' | 'totalSales' | 'activeClients'>) => {
    const newId = agents.length ? Math.max(...agents.map(a => a.id)) + 1 : 1;
    setAgents(prev => [
      ...prev,
      { id: newId, performance: 0, totalSales: 0, activeClients: 0, ...newAgent }
    ]);
    setIsModalOpen(false);
    setCurrentPage(totalPages); // Optional: jump to last page to see the new entry
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Agent Table</h1>
      </div>

      {/* Controls */}
      <div className="flex items-center flex-wrap justify-between bg-white p-4 rounded-lg shadow border gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring focus:ring-teal-300 w-64"
          />
        </div>

        <div className="flex items-center space-x-3">
          {/* Status Filter */}
          <div className="relative">
            <button className="flex items-center px-4 py-2 border rounded hover:bg-gray-50">
              <span className="capitalize">{statusFilter}</span>
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            {/* Dropdown menu (you may implement using contextual UI library) */}
            <div className="absolute mt-1 bg-white border rounded shadow-md z-10">
              {['all', 'assigned', 'unassigned'].map(opt => (
                <div
                  key={opt}
                  onClick={() => setStatusFilter(opt as any)}
                  className="px-4 py-2 hover:bg-gray-100 capitalize cursor-pointer"
                >
                  {opt}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            + Add New Agent
          </button>
        </div>
      </div>

      {/* Agent Table */}
      <div className="overflow-x-auto bg-white rounded shadow border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">
                <input
                  type="checkbox"
                  checked={paginatedAgents.length > 0 && paginatedAgents.every(a => selectedAgents.includes(a.id))}
                  onChange={handleSelectAllOnPage}
                  className="w-4 h-4 text-teal-600 rounded focus:ring"
                />
              </th>
              {['Agent Name', 'Email', 'Phone', 'Role', 'Team', 'Status', 'Actions'].map(h => (
                <th key={h} className="p-4 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedAgents.map(agent => (
              <tr key={agent.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedAgents.includes(agent.id)}
                    onChange={() => handleSelectAgent(agent.id)}
                    className="w-4 h-4 text-teal-600 rounded focus:ring"
                  />
                </td>
                <td className="flex items-center gap-3 p-4">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm text-gray-600">{agent.avatar}</span>
                  </div>
                  <span>{agent.name}</span>
                </td>
                <td className="p-4">{agent.email}</td>
                <td className="p-4">{agent.phone}</td>
                <td className="p-4">{agent.role}</td>
                <td className="p-4">{agent.team}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    agent.status === 'Assigned' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {agent.status}
                  </span>
                </td>
                <td className="p-4">
                  <button className="p-2 rounded hover:bg-gray-100"><MoreVertical /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-gray-600 text-sm">
        <div>
          Showing {filteredAgents.length === 0
            ? '0 agents'
            : `${(currentPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(currentPage * ITEMS_PER_PAGE, filteredAgents.length)} of ${filteredAgents.length}`}
        </div>
        <div className="space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded ${currentPage === idx + 1
                ? 'bg-teal-500 text-white'
                : 'border rounded hover:bg-gray-50'}`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Add Agent Modal */}
      {isModalOpen && (
        <AddAgentModal onClose={() => setIsModalOpen(false)} onSubmit={handleAddAgent} />
      )}
    </div>
  );
};

export default AgentTable;
