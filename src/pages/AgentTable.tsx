import React, { useEffect, useMemo, useRef, useState } from "react";

// =====================================================================================
// 0. TYPES AND DUMMY DATA
// =====================================================================================
export type AgentTeam = "Assigned" | "Unassigned";
export type Agent = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  team: AgentTeam;
  audioUrl?: string;
};

// Utilities
function classNames(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function teamPillClasses(team: AgentTeam) {
  switch (team) {
    case "Assigned":
      return "bg-green-100 text-green-800";
    case "Unassigned":
    default:
      return "bg-red-100 text-red-800";
  }
}

// Dummy dataset
const INITIAL_AGENTS: Agent[] = [
  { id: '1', name: 'Priya Patel', email: 'priya.patel@example.com', phone: '+1 (555) 012-3456', role: 'Sales Lead', team: 'Unassigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: '2', name: 'Arjun Sharma', email: 'arjun.sharma@example.com', phone: '+1 (555) 123-4567', role: 'Support Agent', team: 'Assigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: '3', name: 'Kavita Singh', email: 'kavita.singh@example.com', phone: '+1 (555) 234-5678', role: 'Senior Agent', team: 'Unassigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: '4', name: 'Rohan Mehta', email: 'rohan.mehta@example.com', phone: '+1 (555) 345-6789', role: 'Sales Agent', team: 'Assigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: '5', name: 'Anjali Gupta', email: 'anjali.gupta@example.com', phone: '+1 (555) 456-7890', role: 'Support Lead', team: 'Unassigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
  { id: '6', name: 'Neha Verma', email: 'neha.verma@example.com', phone: '+1 (555) 567-8901', role: 'Sales Agent', team: 'Assigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: '7', name: 'Amit Joshi', email: 'amit.joshi@example.com', phone: '+1 (555) 678-9012', role: 'Support Agent', team: 'Unassigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: '8', name: 'Sneha Rao', email: 'sneha.rao@example.com', phone: '+1 (555) 789-0123', role: 'Senior Agent', team: 'Assigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: '9', name: 'Vikram Malhotra', email: 'vikram.malhotra@example.com', phone: '+1 (555) 890-1234', role: 'Support Lead', team: 'Unassigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: '10', name: 'Divya Nair', email: 'divya.nair@example.com', phone: '+1 (555) 901-2345', role: 'Sales Lead', team: 'Assigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
  { id: '11', name: 'Rahul Iyer', email: 'rahul.iyer@example.com', phone: '+1 (555) 234-5670', role: 'Support Agent', team: 'Unassigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: '12', name: 'Pooja Batra', email: 'pooja.batra@example.com', phone: '+1 (555) 345-6781', role: 'Sales Agent', team: 'Assigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: '13', name: 'Manish Kapoor', email: 'manish.kapoor@example.com', phone: '+1 (555) 456-7892', role: 'Support Lead', team: 'Unassigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: '14', name: 'Ritika Das', email: 'ritika.das@example.com', phone: '+1 (555) 567-8903', role: 'Senior Agent', team: 'Assigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: '15', name: 'Karan Thakur', email: 'karan.thakur@example.com', phone: '+1 (555) 678-9014', role: 'Support Agent', team: 'Unassigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
];

// =====================================================================================
// 1. CONFIGURATION AND HELPERS
// =====================================================================================
const ALL_COLUMNS = [
  { key: "checkbox", label: "", minW: 48 },
  { key: "name", label: "Agent Name", minW: 240 },
  { key: "email", label: "Email", minW: 220 },
  { key: "phone", label: "Phone", minW: 200 },
  { key: "role", label: "Role", minW: 180 },
  { key: "team", label: "Team", minW: 180 },
  { key: "audio", label: "Audio", minW: 160 },
  { key: "actions", label: "Action", minW: 180 },
] as const;

type SortKey = keyof Agent;
function sortAgents(list: Agent[], sortKey: SortKey, direction: "asc" | "desc") {
  const mult = direction === "asc" ? 1 : -1;
  return [...list].sort((a, b) => {
    const av = (a as any)[sortKey];
    const bv = (b as any)[sortKey];
    return String(av).localeCompare(String(bv)) * mult;
  });
}

const Icons = {
  Search: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" /><path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>),
  ChevronDown: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>),
  Eye: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="2" fill="none" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" /></svg>),
  Pencil: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 20h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z" stroke="currentColor" strokeWidth="2" fill="none" /></svg>),
  Trash: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18" stroke="currentColor" strokeWidth="2" /><path d="M8 6v14h8V6" stroke="currentColor" strokeWidth="2" /><path d="M10 6V4h4v2" stroke="currentColor" strokeWidth="2" /></svg>),
  Wave: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block"><path d="M3 12h2m2 0h2m2 0h2m2 0h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>),
  Mic: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line></svg>),
  Close: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>),
  Plus: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>),
};

// =====================================================================================
// 2. MAIN COMPONENT
// =====================================================================================
export default function AgentTable() {
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState({
    roles: [] as string[],
    teams: [] as AgentTeam[],
  });
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({
    key: "name",
    dir: "asc",
  });
  const [columns, setColumns] = useState<Record<string, boolean>>(() => {
    const obj: Record<string, boolean> = {};
    ALL_COLUMNS.forEach((c) => (obj[c.key] = true));
    return obj;
  });
  const [showFilter, setShowFilter] = useState(false);
  const [showColumn, setShowColumn] = useState(false);
  const [showAction, setShowAction] = useState(false);
  const [newAgentOpen, setNewAgentOpen] = useState(false);
  const [editAgent, setEditAgent] = useState<Agent | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setShowFilter(false);
        setShowColumn(false);
        setShowAction(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const roles = useMemo(() => Array.from(new Set(INITIAL_AGENTS.map((l) => l.role))).sort(), []);
  const teams: AgentTeam[] = ["Assigned", "Unassigned"];

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    let list = agents.filter((agent) => {
      const inSearch = !s ? true : (agent.name + agent.email + agent.phone + agent.role).toLowerCase().includes(s);
      const roleOk = filters.roles.length ? filters.roles.includes(agent.role) : true;
      const teamOk = filters.teams.length ? filters.teams.includes(agent.team) : true;
      return inSearch && roleOk && teamOk;
    });
    return sortAgents(list, sort.key, sort.dir);
  }, [agents, search, filters, sort]);

  const allSelected = filtered.length > 0 && filtered.every((r) => selectedIds.has(r.id));
  const toggleAll = (checked: boolean) => {
    const next = new Set(selectedIds);
    if (checked) filtered.forEach((r) => next.add(r.id));
    else filtered.forEach((r) => next.delete(r.id));
    setSelectedIds(next);
  };
  const toggleSelect = (id: string, checked: boolean) => {
    const next = new Set(selectedIds);
    if (checked) next.add(id);
    else next.delete(id);
    setSelectedIds(next);
  };

  const removeAgent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      setAgents((lst) => lst.filter((l) => l.id !== id));
      setSelectedIds(ids => {
        const newIds = new Set(ids);
        newIds.delete(id);
        return newIds;
      });
    }
  };
  const updateAgent = (payload: Partial<Agent> & { id: string }) =>
    setAgents((lst) => lst.map((l) => (l.id === payload.id ? { ...l, ...payload } : l)));
  const addAgent = (payload: Omit<Agent, "id">) => {
    const nextId = `${Date.now()}`;
    setAgents((lst) => [{ id: nextId, ...payload }, ...lst]);
  };
  const deleteSelected = () => {
    if (selectedIds.size === 0 || !window.confirm(`Are you sure you want to delete ${selectedIds.size} selected agent(s)?`)) return;
    setAgents((lst) => lst.filter((l) => !selectedIds.has(l.id)));
    setSelectedIds(new Set());
  };

  const toggleColumn = (key: string) => setColumns((c) => ({ ...c, [key]: !c[key] }));

  const headerCell = (key: SortKey, label: string, minW = 160) => (
    <th
      key={String(key)}
      style={{ minWidth: minW }}
      onClick={() => setSort((s) => ({ key, dir: s.key === key && s.dir === "asc" ? "desc" : "asc" }))}
      className="sticky top-0 z-10 bg-[#F6F6FA] border-b border-gray-200 text-[16px] font-normal text-gray-600 px-4 py-3 select-none whitespace-nowrap cursor-pointer text-left"
    >
      <span className="inline-flex items-center gap-1.5">
        {label}
        <span className="text-gray-400">{sort.key === key ? (sort.dir === "asc" ? "▲" : "▼") : ""}</span>
      </span>
    </th>
  );

  return (
    <div className="w-full bg-[#F6F6FA] p-4 md:p-2 font-roboto lg:p-1">
      <div>
        {/* Header Row */}
        <div className="flex flex-wrap items-center font-raleway justify-between gap-4 mb-2">
          <h1 className="text-2xl font-semibold text-[#10A4B0]">
            Agents
          </h1>

          <button
            onClick={() => setNewAgentOpen(true)}
            className="flex items-center gap-2 h-10 font-raleway px-5 rounded-full bg-[#10A4B0] text-white font-semibold hover:bg-[#0D8A94] transition-colors"
          >
            <Icons.Plus />
            <span>Add Agent</span>
          </button>
        </div>

        {/* Underline */}
        <div className="border-b border-gray-700 w-full mb-6 mt-3"></div>
      </div>


      <div className="flex flex-wrap items-center font-raleway gap-3 mb-4">
        <div className="flex items-center gap-2 rounded-full border border-gray-300 h-10 px-4 bg-white focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500">
          <Icons.Search />
          <input
            className="outline-none text-sm placeholder-gray-500 w-full bg-transparent"
            placeholder="Search agents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>




        <div ref={menuRef} className="flex items-center  gap-3">
          {/* Action Dropdown */}
          <div className="relative text-sm">
            <button
              onClick={() => setShowAction(v => !v)}
              className="flex items-center gap-2  h-10 px-4 rounded-full border border-gray-400 bg-white text-gray-700 font-medium hover:bg-gray-50"
            >
              <span>Action</span>
              <Icons.ChevronDown />
            </button>
            {showAction && (
              <div className="absolute mt-2 w-56 rounded-xl border bg-white shadow-lg z-20">
                <button onClick={deleteSelected} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 rounded-xl">Delete Selected</button>
              </div>
            )}
          </div>
          {/* Create Column Dropdown */}
          <div className="relative text-sm">
            <button
              onClick={() => setShowColumn(v => !v)}
              className="flex items-center gap-2 h-10 px-4 rounded-full border border-gray-400 bg-white text-gray-700 font-medium hover:bg-gray-50"
            >
              <span>Columns</span>
              <Icons.ChevronDown />
            </button>
            {showColumn && (
              <div className="absolute mt-2 w-64 rounded-xl border bg-white shadow-lg z-20 p-2">
                <div className="text-xs text-gray-500 px-2 pb-2">Toggle column visibility</div>
                <div className="max-h-60 overflow-y-auto pr-2">
                  {ALL_COLUMNS.filter(c => c.key !== "checkbox").map(c => (
                    <label key={c.key} className="flex items-center justify-between gap-2 px-2 py-1.5 hover:bg-gray-50 rounded-md cursor-pointer">
                      <span className="text-sm text-gray-700">{c.label}</span>
                      <input type="checkbox" checked={columns[c.key]} onChange={() => toggleColumn(c.key)} className="h-4 w-4 rounded accent-teal-600" />
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Filter Dropdown */}
          <div className="relative text-sm">
            <button
              onClick={() => setShowFilter(v => !v)}
              className="flex items-center gap-2 h-10 px-4 rounded-full border border-gray-400 bg-white text-gray-700 font-medium hover:bg-gray-50"
            >
              <span>Filter</span>
              <Icons.ChevronDown />
            </button>
            {showFilter && (
              <div className="absolute mt-2 w-[400px] max-w-[90vw] rounded-xl border bg-white shadow-lg z-20 p-4">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Role</div>
                    <div className="flex flex-wrap gap-2">
                      {roles.map(r => (<button key={r} onClick={() => setFilters(f => ({ ...f, roles: f.roles.includes(r) ? f.roles.filter(x => x !== r) : [...f.roles, r] }))} className={classNames("px-3 py-1 rounded-full text-sm border", filters.roles.includes(r) ? "bg-teal-600 text-white border-teal-600" : "bg-white text-gray-700 border-gray-300")}>{r}</button>))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Team Status</div>
                    <div className="flex flex-wrap gap-2">
                      {teams.map(t => (<button key={t} onClick={() => setFilters(f => ({ ...f, teams: f.teams.includes(t) ? f.teams.filter(x => x !== t) : [...f.teams, t] }))} className={classNames("px-3 py-1 rounded-full text-sm border", filters.teams.includes(t) ? "bg-teal-600 text-white border-teal-600" : "bg-white text-gray-700 border-gray-300")}>{t}</button>))}
                    </div>
                  </div>
                </div>
                <button onClick={() => setFilters({ roles: [], teams: [] })} className="text-sm text-teal-600 hover:text-teal-800 mt-4 w-full text-right font-medium">Clear All Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-1 flex flex-wrap gap-2">
        {filters.roles.map(r => (<span key={r} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-sm">Role: {r}<button onClick={() => setFilters(f => ({ ...f, roles: f.roles.filter(x => x !== r) }))} className="ml-1"><Icons.Close /></button></span>))}
        {filters.teams.map(t => (<span key={t} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-sm">Team: {t}<button onClick={() => setFilters(f => ({ ...f, teams: f.teams.filter(x => x !== t) }))} className="ml-1"><Icons.Close /></button></span>))}
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="min-w-[1400px] w-full text-sm">
          <thead>
            <tr className="text-left">
              {columns.checkbox && <th className="sticky top-0 z-10 bg-[#F6F6FA] border-b border-gray-200 px-3 py-3"><input type="checkbox" className="h-4 w-4 rounded accent-teal-600" checked={allSelected} onChange={(e) => toggleAll(e.target.checked)} aria-label="Select all" /></th>}
              {columns.name && headerCell("name", "Agent Name", 220)}
              {columns.email && headerCell("email", "Email", 220)}
              {columns.phone && headerCell("phone", "Phone", 200)}
              {columns.role && headerCell("role", "Role", 180)}
              {columns.team && headerCell("team", "Team", 180)}
              {columns.audio && <th className="sticky top-0 z-10 bg-[#F6F6FA] border-b border-gray-200 px-4 py-3 text-[16px] font-normal text-gray-600 text-left" style={{ minWidth: 160 }}>Audio</th>}
              {columns.actions && <th className="sticky top-0 z-10 bg-[#F6F6FA] border-b border-gray-200 px-4 py-3 text-[16px] font-normal text-gray-600 text-left" style={{ minWidth: 180 }}>Action</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                {columns.checkbox && <td className="px-3 py-3"><input type="checkbox" className="h-4 w-4 rounded accent-teal-600" checked={selectedIds.has(row.id)} onChange={(e) => toggleSelect(row.id, e.target.checked)} aria-label={`Select ${row.name}`} /></td>}
                {columns.name && <td className="px-4 py-3 whitespace-nowrap"><div className="text-gray-800 font-medium">{row.name}</div></td>}
                {columns.email && <td className="px-4 py-3  text-gray-600">{row.email}</td>}
                {columns.phone && <td className="px-4 py-3 font-sans text-gray-600">{row.phone}</td>}
                {columns.role && <td className="px-4 py-3 text-gray-600">{row.role}</td>}
                {columns.team && <td className="px-4 py-3"><span className={classNames("inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold", teamPillClasses(row.team))}>{row.team}</span></td>}
                {columns.audio && <td className="px-4 py-3">{row.audioUrl ? <AudioPlayer audioUrl={row.audioUrl} /> : <span className="text-gray-400">No Audio</span>}</td>}
                {columns.actions && <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button title="View" onClick={() => setEditAgent(row)} className="p-2 rounded-xl bg-violet-50 text-violet-700 hover:bg-violet-100"><Icons.Eye /></button>
                    <button title="Edit" onClick={() => setEditAgent(row)} className="p-2 rounded-xl bg-teal-50 text-teal-700 hover:bg-teal-100"><Icons.Pencil /></button>
                    <button title="Delete" onClick={() => removeAgent(row.id)} className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100"><Icons.Trash /></button>
                  </div>
                </td>}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={ALL_COLUMNS.length} className="text-center text-gray-500 py-12">No matching agents found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {newAgentOpen && <AgentForm title="Add New Agent" onClose={() => setNewAgentOpen(false)} onSubmit={(values) => { addAgent(values); setNewAgentOpen(false); }} />}
      {editAgent && <AgentForm title="Edit Agent Details" initial={editAgent} onClose={() => setEditAgent(null)} onSubmit={(values) => { updateAgent({ id: editAgent.id, ...values }); setEditAgent(null); }} />}
    </div>
  );
}

// =====================================================================================
// 3. HELPER COMPONENTS (FORM, AUDIO PLAYER, RECORDER)
// =====================================================================================
function AgentForm({ title, initial, onClose, onSubmit }: { title: string; initial?: Agent; onClose: () => void; onSubmit: (values: Omit<Agent, "id">) => void; }) {
  const [form, setForm] = useState<Omit<Agent, "id">>({
    name: initial?.name || "",
    email: initial?.email || "",
    phone: initial?.phone || "",
    role: initial?.role || "",
    team: initial?.team || "Unassigned",
    audioUrl: initial?.audioUrl || undefined,
  });
  const [showRecorder, setShowRecorder] = useState(false);
  const handleAudioSave = (audioBlob: Blob) => {
    const audioUrl = URL.createObjectURL(audioBlob);
    setForm(f => ({ ...f, audioUrl }));
    setShowRecorder(false);
  };

  const FormLabel = ({ children, required = false }: { children: React.ReactNode, required?: boolean }) => (
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );

  const commonInputClass = "w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500";

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800"><Icons.Close /></button>
        </div>
        {showRecorder ? (
          <div className="p-6"><AudioRecorder onSave={handleAudioSave} onCancel={() => setShowRecorder(false)} /></div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div className="md:col-span-2">
                <FormLabel required>Agent Name</FormLabel>
                <input type="text" placeholder="Enter full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={commonInputClass} />
              </div>
              <div>
                <FormLabel required>Email</FormLabel>
                <input type="email" placeholder="agent@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={commonInputClass} />
              </div>
              <div>
                <FormLabel required>Phone Number</FormLabel>
                <input type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={commonInputClass} />
              </div>
              <div>
                <FormLabel required>Role</FormLabel>
                <input type="text" placeholder="e.g., Sales Lead" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={commonInputClass} />
              </div>
              <div>
                <FormLabel required>Team</FormLabel>
                <select value={form.team} onChange={(e) => setForm({ ...form, team: e.target.value as AgentTeam })} className={commonInputClass}>
                  {(["Assigned", "Unassigned"] as AgentTeam[]).map((s) => (<option key={s} value={s}>{s}</option>))}
                </select>
              </div>
              <div className="md:col-span-2 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <FormLabel>Record Greeting</FormLabel>
                    <span className="text-xs text-gray-500">Add a pre-recorded audio greeting.</span>
                  </div>
                  <button type="button" onClick={() => setShowRecorder(true)} className="flex items-center gap-2 h-9 px-4 rounded-md bg-red-500 text-white font-semibold text-sm hover:bg-red-600">
                    <Icons.Mic />
                    <span>{form.audioUrl ? 'Record New' : 'Click here'}</span>
                  </button>
                </div>
                {form.audioUrl && <div className="mt-3 border-t pt-3"><AudioPlayer audioUrl={form.audioUrl} isCompact /></div>}
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-6 mt-2 border-t border-gray-200">
              <button type="button" onClick={onClose} className="h-10 px-5 rounded-lg border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50">Cancel</button>
              <button type="submit" className="h-10 px-5 rounded-lg bg-[#10A4B0] text-white font-semibold hover:bg-[#0D8A94]">Submit</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function AudioPlayer({ audioUrl, isCompact = false }: { audioUrl: string, isCompact?: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Rewind on pause
    }
  };

  return (
    <div className="flex items-center">
      <button type="button" onClick={togglePlay} className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
        <span>Listen</span>
        <Icons.Wave />
      </button>
      {/* The audio element is hidden but controlled by the button */}
      <audio ref={audioRef} src={audioUrl} className="hidden" />
    </div>
  );
}

function AudioRecorder({ onSave, onCancel }: { onSave: (audioBlob: Blob) => void; onCancel: () => void; }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      mediaRecorder.ondataavailable = (event) => chunksRef.current.push(event.data);
      mediaRecorder.onstop = () => {
        onSave(new Blob(chunksRef.current, { type: 'audio/webm' }));
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => setRecordingTime(prev => prev + 1), 1000);
    } catch (error) {
      console.error("Microphone access error:", error);
      alert("Microphone access denied. Please allow microphone access in your browser settings.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const formatTime = (seconds: number) => `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
    mediaRecorderRef.current?.stream?.getTracks().forEach(track => track.stop());
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4 p-4 font-raleway bg-gray-50 rounded-lg">
      <div className="text-3xl font-mono text-gray-700">{formatTime(recordingTime)}</div>
      {isRecording && <div className="text-red-500 animate-pulse font-semibold">Recording...</div>}
      <div className="flex items-center gap-4">
        <button type="button" onClick={isRecording ? stopRecording : startRecording}
          className={classNames("flex items-center gap-2 h-10 px-5 rounded-lg text-white font-semibold w-40 justify-center", isRecording ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700")}>
          <Icons.Mic />
          {isRecording ? "Stop & Save" : "Start Recording"}
        </button>
        <button type="button" onClick={onCancel} className="h-10 px-5 rounded-lg border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50">Cancel</button>
      </div>
    </div>
  );
}