// AgentTable.tsx
import React, { useMemo, useState, useEffect } from "react";
import {
  Search,
  Eye,
  Edit2,
  Trash2,
  Volume2,
  ChevronDown,
} from "lucide-react";

type Agent = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  team: string;
  status: "Assigned" | "Unassigned";
  avatar?: string;
};

const ITEMS_PER_PAGE = 7;

const initialAgents: Agent[] = [
  { id: 1, name: "Priya Patel", email: "priya.patel@example.com", phone: "+1 (555) 012-3456", role: "Senior Agent", team: "Sales Team", status: "Unassigned" },
  { id: 2, name: "Rahul Sharma", email: "rahul.sharma@example.com", phone: "+1 (555) 012-3457", role: "Junior Agent", team: "Support Team", status: "Assigned" },
  { id: 3, name: "Anita Kumar", email: "anita.kumar@example.com", phone: "+1 (555) 012-3458", role: "Team Lead", team: "Sales Team", status: "Unassigned" },
  { id: 4, name: "Vikram Singh", email: "vikram.singh@example.com", phone: "+1 (555) 012-3459", role: "Senior Agent", team: "Marketing Team", status: "Assigned" },
  { id: 5, name: "Deepika Joshi", email: "deepika.joshi@example.com", phone: "+1 (555) 012-3460", role: "Agent", team: "Support Team", status: "Unassigned" },
  { id: 6, name: "Amit Verma", email: "amit.verma@example.com", phone: "+1 (555) 012-3461", role: "Senior Agent", team: "Sales Team", status: "Assigned" },
  { id: 7, name: "Sneha Gupta", email: "sneha.gupta@example.com", phone: "+1 (555) 012-3462", role: "Agent", team: "Support Team", status: "Unassigned" },
];

const AgentTable: React.FC = () => {
  // data + UI state
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "assigned" | "unassigned">("all");
  const [selectedAgents, setSelectedAgents] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false); // for recording in agentForm for adding "add new customer table form"

  const [newAgent, setNewAgent] = useState<Omit<Agent, "id">>({
    name: "",
    email: "",
    phone: "",
    role: "",
    team: "",
    status: "Unassigned",
  });

  // filter logic (search + status)
  const filteredAgents = useMemo(() => {
    return agents.filter(agent => {
      const matchesSearch = [agent.name, agent.email, agent.phone, agent.role, agent.team]
        .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === "all"
        ? true
        : agent.status.toLowerCase() === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [agents, searchTerm, statusFilter]);

  // pagination
  useEffect(() => {
    // reset page when filters change
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredAgents.length / ITEMS_PER_PAGE));
  const paginatedAgents = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAgents.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAgents, currentPage]);

  // selection (checkboxes)
  const toggleSelectOne = (id: number) => {
    setSelectedAgents(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  const toggleSelectAllVisible = () => {
    const visibleIds = paginatedAgents.map(a => a.id);
    const allSelected = visibleIds.every(id => selectedAgents.includes(id));
    if (allSelected) setSelectedAgents(prev => prev.filter(id => !visibleIds.includes(id)));
    else setSelectedAgents(prev => Array.from(new Set([...prev, ...visibleIds])));
  };

  // actions
  const handleDeleteAgent = (id: number) => {
    setAgents(prev => prev.filter(agent => agent.id !== id));
    setSelectedAgents(prev => prev.filter(x => x !== id));
  };

  const handleAddAgent = () => {
    const { name, email, phone, role, team } = newAgent;
    if (!name || !email || !phone || !role || !team) return; // quick validation
    const newId = agents.length ? Math.max(...agents.map(a => a.id)) + 1 : 1;
    setAgents(prev => [...prev, { ...newAgent, id: newId }]);
    setNewAgent({ name: "", email: "", phone: "", role: "", team: "", status: "Unassigned" });
    setIsModalOpen(false);
  };

  // small helpers for display counts
  const showingFrom = filteredAgents.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const showingTo = Math.min(currentPage * ITEMS_PER_PAGE, filteredAgents.length);

  // to "RECORDING in Add new custoemr table"
  const handleRecordClick = () => {
    setIsRecording((prev) => !prev);
    if (!isRecording) {
      console.log("Recording started...");
    } else {
      console.log("Recording stopped.");
    }
  };
  //   const handleRecordClick = async () => {
  //   if (!isRecording) {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  //       const mediaRecorder = new MediaRecorder(stream);
  //       mediaRecorderRef.current = mediaRecorder;
  //       audioChunksRef.current = [];

  //       mediaRecorder.ondataavailable = (event) => {
  //         if (event.data.size > 0) {
  //           audioChunksRef.current.push(event.data);
  //         }
  //       };

  //       mediaRecorder.onstop = () => {
  //         const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
  //         const url = URL.createObjectURL(audioBlob);
  //         setAudioURL(url);

  //         console.log("Recording saved:", url);
  //         // Optional: send `audioBlob` to your backend or upload service
  //       };

  //       mediaRecorder.start();
  //       setIsRecording(true);
  //       console.log("Recording started...");
  //     } catch (err) {
  //       console.error("Microphone access denied or error occurred:", err);
  //     }
  //   } else {
  //     mediaRecorderRef.current?.stop();
  //     setIsRecording(false);
  //     console.log("Recording stopped.");
  //   }
  // };



  return (
    <div className="min-h-screen bg-[#F6F6FA] p-6 flex justify-center">
      <div className="w-full max-w-[1114px]">
        {/* Top control bar (per Figma): search + action pills + teal Add button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search (rounded pill) */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search Here..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-full border border-[rgba(113,113,130,0.4)] text-sm bg-white placeholder:text-[#727171] focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#727171]" />
            </div>

            {/* Action, Create Column, Filter (UI only; mirror Figma) */}
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-[#727171] rounded-full text-sm">
              Action <ChevronDown className="w-4 h-4" />
            </button>
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-[#727171] rounded-full text-sm">
              Create Column <ChevronDown className="w-4 h-4" />
            </button>
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-[#727171] rounded-full text-sm">
              Filter <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Status filter (replicates original dropdown) */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 border rounded text-sm bg-white"
            >
              <option value="all">All</option>
              <option value="assigned">Assigned</option>
              <option value="unassigned">Unassigned</option>
            </select>

            {/* Add Agent (teal pill like Figma) */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Agent
            </button>
          </div>
        </div>

        {/* Card container (white rounded box with border) */}
        <div className="bg-white border border-[#E0E0E0] rounded-[10px] overflow-hidden">
          {/* Table header row */}
          <div className="hidden md:grid grid-cols-[40px_1fr_1fr_1fr_1fr_160px_140px] items-center bg-[#F6F6FA] px-4 py-3 text-sm text-[#495057] border-b border-[#F2F2F2]">
            {/* select all checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={paginatedAgents.length > 0 && paginatedAgents.every(a => selectedAgents.includes(a.id))}
                onChange={toggleSelectAllVisible}
                className="w-4 h-4"
                aria-label="Select visible"
              />
            </div>
            <div>Agent Name</div>
            <div>Email</div>
            <div>Phone</div>
            <div>Role</div>
            <div>Team</div>
            <div>Audio</div>
            <div>Actions</div>
            <div className="text-right">Action</div>
          </div>

          {/* Table body - responsive rows */}
          <div className="divide-y divide-[#F2F2F2]">
            {paginatedAgents.length === 0 ? (
              <div className="p-6 text-center text-sm text-[#727171]">No agents found.</div>
            ) : (
              paginatedAgents.map(agent => (
                <div key={agent.id} className="flex flex-col md:flex-row md:items-center md:gap-0 px-4 py-4 md:px-0 md:py-0">
                  {/* Row layout: use a grid for md+ and stacked info for mobile */}
                  <div className="w-full md:grid md:grid-cols-[40px_1fr_1fr_1fr_1fr_160px_140px] md:items-center md:px-4 md:py-4">
                    {/* checkbox */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAgents.includes(agent.id)}
                        onChange={() => toggleSelectOne(agent.id)}
                        className="w-4 h-4"
                      />
                    </div>

                    {/* name */}
                    <div className="py-3 md:py-0 text-[#717182] text-base">
                      <div className="font-medium text-[#1E1E1E]">{agent.name}</div>
                    </div>

                    {/* email */}
                    <div className="py-3 md:py-0 text-sm text-[#717182]">{agent.email}</div>

                    {/* phone */}
                    <div className="py-3 md:py-0 text-sm text-[#717182]">{agent.phone}</div>

                    {/* role */}
                    <div className="py-3 md:py-0 text-sm text-[#717182]">{agent.role}</div>

                    {/* team + status stacked for mobile */}
                    <div className="py-3 md:py-0 flex md:items-center md:justify-start gap-3">
                      <div className="text-sm text-[#717182]">{agent.team}</div>
                      {/* status pill */}
                      <div>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium ${agent.status === "Assigned" ? "bg-[#34B53A] text-white" : "bg-[#FF3A29] text-white"
                            }`}
                        >
                          {agent.status}
                        </span>
                      </div>
                    </div>

                    {/* Audio + actions */}
                    <div className="py-3 md:py-0 flex items-center justify-end gap-3">
                      {/* Listen button (blue pill) */}
                      <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0088FE] text-white text-xs">
                        <span className="hidden md:inline">Listen</span>
                        <Volume2 className="w-4 h-4" />
                      </button>

                      {/* icon action buttons (Eye, Edit, Trash) — match Figma colors & small rounded boxes */}
                      <div className="flex items-center gap-2">
                        <button
                          aria-label="view"
                          className="p-2 rounded-lg bg-[#F0EFFF] hover:opacity-90"
                          style={{ border: "2px solid transparent" }}
                        >
                          <Eye className="w-5 h-5 text-[#6C5FFC]" />
                        </button>
                        <button
                          aria-label="edit"
                          className="p-2 rounded-lg bg-[#E8F8F5] hover:opacity-90"
                        >
                          <Edit2 className="w-5 h-5 text-[#63BF9C]" />
                        </button>
                        <button
                          aria-label="delete"
                          onClick={() => handleDeleteAgent(agent.id)}
                          className="p-2 rounded-lg bg-[#FFE2DF] hover:opacity-90"
                        >
                          <Trash2 className="w-5 h-5 text-[#FF3A29]" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* collapse info for small screens: show status pill prominently */}
                  <div className="md:hidden px-4 pb-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium ${agent.status === "Assigned" ? "bg-[#34B53A] text-white" : "bg-[#FF3A29] text-white"
                            }`}
                        >
                          {agent.status}
                        </span>
                      </div>
                      <div className="ml-auto flex gap-2">
                        <button className="p-2 rounded-lg bg-[#F0EFFF]"><Eye className="w-5 h-5 text-[#6C5FFC]" /></button>
                        <button className="p-2 rounded-lg bg-[#E8F8F5]"><Edit2 className="w-5 h-5 text-[#63BF9C]" /></button>
                        <button onClick={() => handleDeleteAgent(agent.id)} className="p-2 rounded-lg bg-[#FFE2DF]"><Trash2 className="w-5 h-5 text-[#FF3A29]" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pagination footer */}
        <div className="flex items-center justify-between mt-4 text-sm text-[#495057]">
          <div>
            Showing {showingFrom}–{showingTo} of {filteredAgents.length}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <div className="px-3 py-1 border rounded">{currentPage} / {totalPages}</div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Agent Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-4xl bg-white rounded-[10px] p-6 relative shadow-xl">

            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border-2 border-[#1E1E1E] rounded-full text-[#1E1E1E] hover:bg-gray-100"
              aria-label="Close"
            >
              ×
            </button>

            {/* Header */}
            <h2 className="text-[20px] font-semibold text-[#1E1E1E] mb-6 font-raleway">Add New Customer Table</h2>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-[12px] text-[#495057] font-medium font-raleway">

              {/* Agent Name */}
              <div>
                <label className="block mb-1">Agent Name*</label>
                <div className="flex items-center border border-[#E0E0E0] rounded-[5px] px-3 py-2">
                  <input
                    type="text"
                    placeholder="Customer Name"
                    value={newAgent.name}
                    onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                    className="w-full text-[10px] text-[#717182] font-medium outline-none"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block mb-1">Phone Number*</label>
                <div className="flex items-center border border-[#E0E0E0] rounded-[5px] px-3 py-2">
                  <input
                    type="tel"
                    placeholder="type here"
                    value={newAgent.phone}
                    onChange={(e) => setNewAgent({ ...newAgent, phone: e.target.value })}
                    className="w-full text-[10px] text-[#717182] font-medium outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1">Email*</label>
                <div className="flex items-center border border-[#E0E0E0] rounded-[5px] px-3 py-2">
                  <input
                    type="email"
                    placeholder="type here"
                    value={newAgent.email}
                    onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
                    className="w-full text-[10px] text-[#717182] font-medium outline-none"
                  />
                </div>
              </div>

              {/* Team */}
              <div>
                <label className="block mb-1">Team*</label>
                <div className="flex items-center border border-[#E0E0E0] rounded-[5px] px-3 py-2">
                  <input
                    type="text"
                    placeholder="type here"
                    value={newAgent.team}
                    onChange={(e) => setNewAgent({ ...newAgent, team: e.target.value })}
                    className="w-full text-[10px] text-[#717182] font-medium outline-none"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block mb-1">Role*</label>
                <div className="flex items-center border border-[#E0E0E0] rounded-[5px] px-3 py-2">
                  <input
                    type="text"
                    placeholder="type here"
                    value={newAgent.role}
                    onChange={(e) => setNewAgent({ ...newAgent, role: e.target.value })}
                    className="w-full text-[10px] text-[#717182] font-medium outline-none"
                  />
                </div>
              </div>

              {/* Record (Mic) */}
              <div>
                <label className="block mb-1">Record</label>
                <button
                  onClick={handleRecordClick}
                  className="flex items-center gap-2 bg-[#FF4D3E] text-white text-[10px] font-medium px-3 py-2 rounded-[5px]"
                >
                  <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
                    <path d="M12 14a3 3 0 003-3V5a3 3 0 10-6 0v6a3 3 0 003 3zm5-3a5 5 0 01-10 0H5a7 7 0 0014 0h-2zm-5 9a7 7 0 007-7h-2a5 5 0 01-10 0H5a7 7 0 007 7z" />
                  </svg>
                  Click here
                </button>
              </div>
            </div>

            {/* Submit/Cancel */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-200 text-[10px] font-medium text-black px-4 py-2 rounded-[5px] font-raleway"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAgent}
                className="bg-[#10A4B0] text-white text-[10px] font-medium px-4 py-2 rounded-[5px] font-raleway"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AgentTable;
