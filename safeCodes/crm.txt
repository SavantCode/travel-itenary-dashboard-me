import React, { useEffect, useMemo, useRef, useState } from "react";

// ------------------------------------------------------------
// CRM.tsx — Single-file CRM component (React + TS + Tailwind)
// - No sidebar/header — ONLY the CRM section
// - Fully functional search, filters, bulk actions, column toggles
// - Responsive: horizontal scroll table on small screens, sticky header
// - Dummy data is embedded in this file and everything works off of it
// ------------------------------------------------------------

// Types
export type LeadStatus = "Contacted" | "Approved" | "Pending" | "Rejected";

export type Lead = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  owner: string;
  rating: number; // 0–5
  sourcePerson: string;
  serviceType: string;
  status: LeadStatus;
};

// Utilities
function classNames(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function statusPillClasses(status: LeadStatus) {
  switch (status) {
    case "Approved":
      return "bg-green-500 text-white";
    case "Pending":
      return "bg-amber-400 text-white";
    case "Rejected":
      return "bg-red-500 text-white";
    case "Contacted":
    default:
      return "bg-blue-300 text-white";
  }
}

// Dummy dataset — you can replace/extend freely
const INITIAL_LEADS: Lead[] = [
  {
    id: "L-1001",
    customerName: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+1 (555) 012-3456",
    address: "Ahmedabad",
    owner: "Rashmi Singh",
    rating: 4.5,
    sourcePerson: "Neeraj Kapoor",
    serviceType: "Currency Exchange",
    status: "Contacted",
  },
  {
    id: "L-1002",
    customerName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+1 (555) 987-6543",
    address: "Mumbai",
    owner: "Rashmi Singh",
    rating: 4.2,
    sourcePerson: "Neeraj Kapoor",
    serviceType: "Hotel Booking",
    status: "Approved",
  },
  {
    id: "L-1003",
    customerName: "Ishita Mehta",
    email: "ishita.mehta@example.com",
    phone: "+44 20 5555 1111",
    address: "London",
    owner: "Amit Verma",
    rating: 4.8,
    sourcePerson: "Kritika Jain",
    serviceType: "Flight Ticket",
    status: "Pending",
  },
  {
    id: "L-1004",
    customerName: "Rohan Gupta",
    email: "rohan.g@example.com",
    phone: "+91 98 7654 3210",
    address: "Delhi",
    owner: "Amit Verma",
    rating: 3.9,
    sourcePerson: "Saanvi Arora",
    serviceType: "Currency Exchange",
    status: "Rejected",
  },
  {
    id: "L-1005",
    customerName: "Meera Desai",
    email: "meera.d@example.com",
    phone: "+1 (415) 000-2222",
    address: "San Francisco",
    owner: "Zoya Khan",
    rating: 4.7,
    sourcePerson: "Kritika Jain",
    serviceType: "Hotel Booking",
    status: "Pending",
  },
  {
    id: "L-1006",
    customerName: "Kabir Malhotra",
    email: "kabir.m@example.com",
    phone: "+61 2 5555 7777",
    address: "Sydney",
    owner: "Zoya Khan",
    rating: 4.1,
    sourcePerson: "Neeraj Kapoor",
    serviceType: "Currency Exchange",
    status: "Contacted",
  },
  {
    id: "L-1007",
    customerName: "Ananya Rao",
    email: "ananya.rao@example.com",
    phone: "+1 (212) 222-3333",
    address: "New York",
    owner: "Rashmi Singh",
    rating: 4.9,
    sourcePerson: "Saanvi Arora",
    serviceType: "Tour Package",
    status: "Approved",
  },
  {
    id: "L-1008",
    customerName: "Dev Patel",
    email: "dev.patel@example.com",
    phone: "+91 90 1234 5678",
    address: "Pune",
    owner: "Amit Verma",
    rating: 3.6,
    sourcePerson: "Kritika Jain",
    serviceType: "Visa Assistance",
    status: "Pending",
  },
  {
    id: "L-1009",
    customerName: "Simran Kaur",
    email: "simran.k@example.com",
    phone: "+971 50 123 4567",
    address: "Dubai",
    owner: "Zoya Khan",
    rating: 4.4,
    sourcePerson: "Neeraj Kapoor",
    serviceType: "Flight Ticket",
    status: "Contacted",
  },
  {
    id: "L-1010",
    customerName: "Rahul Nair",
    email: "rahul.nair@example.com",
    phone: "+91 98 7654 1000",
    address: "Bangalore",
    owner: "Rashmi Singh",
    rating: 3.8,
    sourcePerson: "Saanvi Arora",
    serviceType: "Hotel Booking",
    status: "Rejected",
  },
  {
    id: "L-1011",
    customerName: "Tanya Bhatt",
    email: "tanya.b@example.com",
    phone: "+1 (408) 123-7799",
    address: "Chicago",
    owner: "Amit Verma",
    rating: 4.3,
    sourcePerson: "Neeraj Kapoor",
    serviceType: "Currency Exchange",
    status: "Approved",
  },
  {
    id: "L-1012",
    customerName: "Vikram Joshi",
    email: "vikram.j@example.com",
    phone: "+1 (617) 444-8899",
    address: "Boston",
    owner: "Zoya Khan",
    rating: 4.0,
    sourcePerson: "Kritika Jain",
    serviceType: "Visa Assistance",
    status: "Pending",
  },
];

// Column configuration
const ALL_COLUMNS = [
  { key: "checkbox", label: "", minW: 48 },
  { key: "customerName", label: "Customer Name", minW: 220 },
  { key: "email", label: "Email", minW: 220 },
  { key: "phone", label: "Phone", minW: 200 },
  { key: "address", label: "Address", minW: 220 },
  { key: "owner", label: "Owner", minW: 220 },
  { key: "rating", label: "Customer Rating", minW: 220 },
  { key: "sourcePerson", label: "Source Person", minW: 220 },
  { key: "serviceType", label: "Service Type", minW: 220 },
  { key: "status", label: "Lead Status", minW: 200 },
  { key: "audio", label: "Audio", minW: 160 },
  { key: "actions", label: "Action", minW: 180 },
] as const;

// Sort helpers
type SortKey = keyof Lead | "rating" | "status";

function sortLeads(list: Lead[], sortKey: SortKey, direction: "asc" | "desc") {
  const mult = direction === "asc" ? 1 : -1;
  return [...list].sort((a, b) => {
    const av = (a as any)[sortKey];
    const bv = (b as any)[sortKey];
    if (typeof av === "number" && typeof bv === "number") {
      return (av - bv) * mult;
    }
    return String(av).localeCompare(String(bv)) * mult;
  });
}

// Small icons as inline SVGs (no external deps)
const Icons = {
  Search: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  ChevronDown: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Eye: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  Pencil: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 20h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  Trash: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6h18" stroke="currentColor" strokeWidth="2" />
      <path d="M8 6v14h8V6" stroke="currentColor" strokeWidth="2" />
      <path d="M10 6V4h4v2" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  Wave: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
      <path d="M3 12h2m2 0h2m2 0h2m2 0h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Star: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="inline-block">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  Close: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Download: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M3 21h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

// Main Component
export default function CRM() {
  // state
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const [filters, setFilters] = useState({
    owners: [] as string[],
    statuses: [] as LeadStatus[],
    services: [] as string[],
    minRating: 0,
  });

  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({
    key: "customerName",
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
  const [newLeadOpen, setNewLeadOpen] = useState(false);
  const [editLead, setEditLead] = useState<Lead | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // close popovers when clicking outside
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) {
        setShowFilter(false);
        setShowColumn(false);
        setShowAction(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // derived lists for filter options
  const owners = useMemo(() => Array.from(new Set(leads.map((l) => l.owner))).sort(), [leads]);
  const statuses: LeadStatus[] = ["Contacted", "Approved", "Pending", "Rejected"];
  const services = useMemo(() => Array.from(new Set(leads.map((l) => l.serviceType))).sort(), [leads]);

  // filtering + search
  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    let list = leads.filter((l) => {
      const inSearch = !s
        ? true
        : [
            l.customerName,
            l.email,
            l.phone,
            l.address,
            l.owner,
            l.sourcePerson,
            l.serviceType,
            l.status,
          ]
            .join(" ")
            .toLowerCase()
            .includes(s);
      const ownerOk = filters.owners.length ? filters.owners.includes(l.owner) : true;
      const statusOk = filters.statuses.length ? filters.statuses.includes(l.status) : true;
      const serviceOk = filters.services.length ? filters.services.includes(l.serviceType) : true;
      const ratingOk = l.rating >= filters.minRating;
      return inSearch && ownerOk && statusOk && serviceOk && ratingOk;
    });

    list = sortLeads(list, sort.key, sort.dir);
    return list;
  }, [leads, search, filters, sort]);

  // select helpers
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

  // audio: generate a small beep so the Listen button is functional
  const audioCtxRef = useRef<AudioContext | null>(null);
  const playBeep = () => {
    try {
      const ctx = (audioCtxRef.current ||= new (window.AudioContext || (window as any).webkitAudioContext)());
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = 880;
      o.connect(g);
      g.connect(ctx.destination);
      g.gain.setValueAtTime(0.001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      o.start();
      o.stop(ctx.currentTime + 0.27);
    } catch {}
  };

  // actions
  const removeLead = (id: string) => setLeads((lst) => lst.filter((l) => l.id !== id));

  const updateLead = (payload: Partial<Lead> & { id: string }) =>
    setLeads((lst) => lst.map((l) => (l.id === payload.id ? { ...l, ...payload } : l)));

  const addLead = (payload: Omit<Lead, "id">) => {
    const nextId = `L-${Math.floor(1000 + Math.random() * 9000)}`;
    setLeads((lst) => [{ id: nextId, ...payload }, ...lst]);
  };

  const approveSelected = () => {
    setLeads((lst) => lst.map((l) => (selectedIds.has(l.id) ? { ...l, status: "Approved" } : l)));
    setSelectedIds(new Set());
  };

  const deleteSelected = () => {
    setLeads((lst) => lst.filter((l) => !selectedIds.has(l.id)));
    setSelectedIds(new Set());
  };

  const exportCSV = () => {
    const rows = (selectedIds.size ? filtered.filter((r) => selectedIds.has(r.id)) : filtered).map((l) => [
      l.id,
      l.customerName,
      l.email,
      l.phone,
      l.address,
      l.owner,
      l.rating,
      l.sourcePerson,
      l.serviceType,
      l.status,
    ]);
    const header = [
      "ID",
      "Customer Name",
      "Email",
      "Phone",
      "Address",
      "Owner",
      "Rating",
      "Source Person",
      "Service Type",
      "Lead Status",
    ];
    const csv = [header, ...rows].map(r => r.map(x => `"${String(x).replace(/"/g, '""')}"`).join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // UI helpers
  const toggleColumn = (key: string) => setColumns((c) => ({ ...c, [key]: !c[key] }));

  const headerCell = (key: SortKey, label: string, minW = 160) => (
    <th
      key={String(key)}
      style={{ minWidth: minW }}
      onClick={() =>
        setSort((s) => ({ key, dir: s.key === key && s.dir === "asc" ? "desc" : "asc" }))
      }
      className="sticky top-0 z-10 bg-[#F6F6FA] border-b border-gray-200 text-[16px] font-normal text-gray-600 px-4 py-3 select-none whitespace-nowrap cursor-pointer"
    >
      <span className="inline-flex items-center gap-1">
        {label}
        <span className="text-gray-400">{sort.key === key ? (sort.dir === "asc" ? "▲" : "▼") : ""}</span>
      </span>
    </th>
  );

  return (
    <div className="w-full bg-[#F6F6FA] p-4 md:p-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="flex items-center gap-2 rounded-full border border-gray-400 h-10 px-4 bg-white">
          <Icons.Search />
          <input
            className="outline-none text-sm placeholder-gray-500 w-56 md:w-72"
            placeholder="Search Here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Action */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setShowAction((v) => !v)}
            className="flex items-center gap-2 h-10 px-4 rounded-full border border-gray-400 bg-white text-gray-600"
          >
            <span className="font-medium">Action</span>
            <Icons.ChevronDown />
          </button>
          {showAction && (
            <div className="absolute mt-2 w-56 rounded-xl border bg-white shadow z-20">
              <button onClick={approveSelected} className="w-full text-left px-4 py-2 hover:bg-gray-50">Mark Approved</button>
              <button onClick={deleteSelected} className="w-full text-left px-4 py-2 hover:bg-gray-50">Delete Selected</button>
              <button onClick={exportCSV} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2">
                <Icons.Download /> Export CSV
              </button>
            </div>
          )}
        </div>

        {/* Create Column */}
        <div className="relative">
          <button
            onClick={() => setShowColumn((v) => !v)}
            className="flex items-center gap-2 h-10 px-4 rounded-full border border-gray-400 bg-white text-gray-600"
          >
            <span className="font-medium">Create Column</span>
            <Icons.ChevronDown />
          </button>
          {showColumn && (
            <div className="absolute mt-2 w-64 rounded-xl border bg-white shadow z-20 p-2">
              <div className="text-xs text-gray-500 px-2 pb-2">Toggle column visibility</div>
              <div className="max-h-60 overflow-auto pr-2">
                {ALL_COLUMNS.filter((c) => c.key !== "checkbox").map((c) => (
                  <label key={c.key} className="flex items-center justify-between gap-2 px-2 py-1 hover:bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">{c.label}</span>
                    <input
                      type="checkbox"
                      checked={columns[c.key]}
                      onChange={() => toggleColumn(c.key)}
                      className="accent-teal-600"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Filter */}
        <div className="relative">
          <button
            onClick={() => setShowFilter((v) => !v)}
            className="flex items-center gap-2 h-10 px-4 rounded-full border border-gray-400 bg-white text-gray-600"
          >
            <span className="font-medium">Filter</span>
            <Icons.ChevronDown />
          </button>
          {showFilter && (
            <div className="absolute mt-2 w-[700px] max-w-[90vw] rounded-xl border bg-white shadow z-20 p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Status */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Lead Status</div>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((s) => (
                    <button
                      key={s}
                      onClick={() =>
                        setFilters((f) => ({
                          ...f,
                          statuses: f.statuses.includes(s)
                            ? f.statuses.filter((x) => x !== s)
                            : [...f.statuses, s],
                        }))
                      }
                      className={classNames(
                        "px-3 py-1 rounded-full text-sm border",
                        filters.statuses.includes(s)
                          ? "bg-teal-600 text-white border-teal-600"
                          : "bg-white text-gray-700 border-gray-300"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Type */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Service Type</div>
                <div className="flex flex-wrap gap-2">
                  {services.map((svc) => (
                    <button
                      key={svc}
                      onClick={() =>
                        setFilters((f) => ({
                          ...f,
                          services: f.services.includes(svc)
                            ? f.services.filter((x) => x !== svc)
                            : [...f.services, svc],
                        }))
                      }
                      className={classNames(
                        "px-3 py-1 rounded-full text-sm border",
                        filters.services.includes(svc)
                          ? "bg-teal-600 text-white border-teal-600"
                          : "bg-white text-gray-700 border-gray-300"
                      )}
                    >
                      {svc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Owner */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Owner</div>
                <div className="flex flex-wrap gap-2">
                  {owners.map((o) => (
                    <button
                      key={o}
                      onClick={() =>
                        setFilters((f) => ({
                          ...f,
                          owners: f.owners.includes(o)
                            ? f.owners.filter((x) => x !== o)
                            : [...f.owners, o],
                        }))
                      }
                      className={classNames(
                        "px-3 py-1 rounded-full text-sm border",
                        filters.owners.includes(o)
                          ? "bg-teal-600 text-white border-teal-600"
                          : "bg-white text-gray-700 border-gray-300"
                      )}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="md:col-span-3 mt-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-700">Min Rating: {filters.minRating.toFixed(1)}</div>
                  <button
                    onClick={() => setFilters({ owners: [], statuses: [], services: [], minRating: 0 })}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Clear All
                  </button>
                </div>
                <input
                  type="range"
                  min={0}
                  max={5}
                  step={0.1}
                  value={filters.minRating}
                  onChange={(e) => setFilters((f) => ({ ...f, minRating: Number(e.target.value) }))}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* New Lead */}
        <button
          onClick={() => setNewLeadOpen(true)}
          className="ml-auto flex items-center gap-2 h-10 px-5 rounded-full bg-[#10A4B0] text-white"
        >
          <Icons.Plus />
          <span className="font-medium">New Lead</span>
          <Icons.ChevronDown />
        </button>
      </div>

      {/* Active filter chips */}
      <div className="mt-3 flex flex-wrap gap-2">
        {filters.statuses.map((s) => (
          <span key={s} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-sm">
            Status: {s}
            <button onClick={() => setFilters((f) => ({ ...f, statuses: f.statuses.filter((x) => x !== s) }))} className="ml-1">
              <Icons.Close />
            </button>
          </span>
        ))}
        {filters.services.map((s) => (
          <span key={s} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-sm">
            Service: {s}
            <button onClick={() => setFilters((f) => ({ ...f, services: f.services.filter((x) => x !== s) }))} className="ml-1">
              <Icons.Close />
            </button>
          </span>
        ))}
        {filters.owners.map((o) => (
          <span key={o} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-sm">
            Owner: {o}
            <button onClick={() => setFilters((f) => ({ ...f, owners: f.owners.filter((x) => x !== o) }))} className="ml-1">
              <Icons.Close />
            </button>
          </span>
        ))}
        {filters.minRating > 0 && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-sm">
            Min Rating: {filters.minRating.toFixed(1)}
            <button onClick={() => setFilters((f) => ({ ...f, minRating: 0 }))} className="ml-1">
              <Icons.Close />
            </button>
          </span>
        )}
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="min-w-[2200px] w-full text-sm">
          <thead>
            <tr className="text-left">
              {/* checkbox header */}
              {columns.checkbox && (
                <th className="sticky top-0 z-10 bg-[#F6F6FA] border-b border-gray-200 px-3 py-3" style={{ minWidth: 48 }}>
                  <input
                    type="checkbox"
                    className="accent-teal-600"
                    checked={allSelected}
                    onChange={(e) => toggleAll(e.target.checked)}
                    aria-label="Select all"
                  />
                </th>
              )}
              {columns.customerName && headerCell("customerName", "Customer Name", 220)}
              {columns.email && headerCell("email", "Email", 220)}
              {columns.phone && headerCell("phone", "Phone", 200)}
              {columns.address && headerCell("address", "Address", 220)}
              {columns.owner && headerCell("owner", "Owner", 220)}
              {columns.rating && headerCell("rating", "Customer Rating", 220)}
              {columns.sourcePerson && headerCell("sourcePerson", "Source Person", 220)}
              {columns.serviceType && headerCell("serviceType", "Service Type", 220)}
              {columns.status && headerCell("status", "Lead Status", 200)}
              {columns.audio && (
                <th className="sticky top-0 z-10 bg-[#F6F6FA] border-b border-gray-200 px-4 py-3" style={{ minWidth: 160 }}>
                  Audio
                </th>
              )}
              {columns.actions && (
                <th className="sticky top-0 z-10 bg-[#F6F6FA] border-b border-gray-200 px-4 py-3" style={{ minWidth: 180 }}>
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                {columns.checkbox && (
                  <td className="px-3 py-4" style={{ minWidth: 48 }}>
                    <input
                      type="checkbox"
                      className="accent-teal-600"
                      checked={selectedIds.has(row.id)}
                      onChange={(e) => toggleSelect(row.id, e.target.checked)}
                      aria-label={`Select ${row.customerName}`}
                    />
                  </td>
                )}
                {columns.customerName && (
                  <td className="px-4 py-4 whitespace-nowrap" style={{ minWidth: 220 }}>
                    <div className="text-gray-700 text-[16px]">{row.customerName}</div>
                  </td>
                )}
                {columns.email && (
                  <td className="px-4 py-4 text-gray-500" style={{ minWidth: 220 }}>
                    {row.email}
                  </td>
                )}
                {columns.phone && (
                  <td className="px-4 py-4 text-gray-500" style={{ minWidth: 200 }}>
                    {row.phone}
                  </td>
                )}
                {columns.address && (
                  <td className="px-4 py-4 text-gray-500" style={{ minWidth: 220 }}>
                    {row.address}
                  </td>
                )}
                {columns.owner && (
                  <td className="px-4 py-4 text-gray-500" style={{ minWidth: 220 }}>
                    {row.owner}
                  </td>
                )}
                {columns.rating && (
                  <td className="px-4 py-4" style={{ minWidth: 220 }}>
                    <span className="inline-flex items-center gap-2 text-gray-600">
                      <span>{row.rating.toFixed(1)}</span>
                      <span className="text-amber-400"><Icons.Star /></span>
                    </span>
                  </td>
                )}
                {columns.sourcePerson && (
                  <td className="px-4 py-4 text-gray-500" style={{ minWidth: 220 }}>
                    {row.sourcePerson}
                  </td>
                )}
                {columns.serviceType && (
                  <td className="px-4 py-4 text-gray-500" style={{ minWidth: 220 }}>
                    {row.serviceType}
                  </td>
                )}
                {columns.status && (
                  <td className="px-4 py-4" style={{ minWidth: 200 }}>
                    <span className={classNames("inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium", statusPillClasses(row.status))}>
                      {row.status}
                    </span>
                  </td>
                )}
                {columns.audio && (
                  <td className="px-4 py-4" style={{ minWidth: 160 }}>
                    <button onClick={playBeep} className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white">
                      Listen <Icons.Wave />
                    </button>
                  </td>
                )}
                {columns.actions && (
                  <td className="px-4 py-4" style={{ minWidth: 180 }}>
                    <div className="flex items-center gap-3">
                      {/* View */}
                      <button
                        title="View"
                        onClick={() => setEditLead(row)}
                        className="p-2 rounded-xl bg-violet-50 text-violet-700 hover:bg-violet-100"
                      >
                        <Icons.Eye />
                      </button>
                      {/* Edit */}
                      <button
                        title="Edit"
                        onClick={() => setEditLead(row)}
                        className="p-2 rounded-xl bg-teal-50 text-teal-700 hover:bg-teal-100"
                      >
                        <Icons.Pencil />
                      </button>
                      {/* Delete */}
                      <button
                        title="Delete"
                        onClick={() => removeLead(row.id)}
                        className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        <Icons.Trash />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={ALL_COLUMNS.length} className="text-center text-gray-500 py-12">
                  No matching leads.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* New Lead modal */}
      {newLeadOpen && (
        <LeadForm
          title="New Lead"
          onClose={() => setNewLeadOpen(false)}
          onSubmit={(values) => {
            addLead(values);
            setNewLeadOpen(false);
          }}
        />
      )}

      {/* View/Edit modal */}
      {editLead && (
        <LeadForm
          title="View / Edit Lead"
          initial={editLead}
          onClose={() => setEditLead(null)}
          onSubmit={(values) => {
            updateLead({ id: editLead.id, ...values });
            setEditLead(null);
          }}
        />
      )}
    </div>
  );
}

// Lead Form Modal (reusable for New and Edit)
function LeadForm({
  title,
  initial,
  onClose,
  onSubmit,
}: {
  title: string;
  initial?: Lead;
  onClose: () => void;
  onSubmit: (values: Omit<Lead, "id">) => void;
}) {
  const [form, setForm] = useState<Omit<Lead, "id">>({
    customerName: initial?.customerName || "",
    email: initial?.email || "",
    phone: initial?.phone || "",
    address: initial?.address || "",
    owner: initial?.owner || "",
    rating: initial?.rating ?? 4.0,
    sourcePerson: initial?.sourcePerson || "",
    serviceType: initial?.serviceType || "Currency Exchange",
    status: initial?.status || "Pending",
  });

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/30 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <Icons.Close />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4"
        >
          <TextField
            label="Customer Name"
            value={form.customerName}
            onChange={(v) => setForm({ ...form, customerName: v })}
            
          />
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
          />
          <TextField
            label="Phone"
            value={form.phone}
            onChange={(v) => setForm({ ...form, phone: v })}
          />
          <TextField
            label="Address"
            value={form.address}
            onChange={(v) => setForm({ ...form, address: v })}
          />
          <TextField
            label="Owner"
            value={form.owner}
            onChange={(v) => setForm({ ...form, owner: v })}
          />
          <TextField
            label="Source Person"
            value={form.sourcePerson}
            onChange={(v) => setForm({ ...form, sourcePerson: v })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
            <select
              value={form.serviceType}
              onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              {[
                "Currency Exchange",
                "Hotel Booking",
                "Flight Ticket",
                "Visa Assistance",
                "Tour Package",
              ].map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lead Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as LeadStatus })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              {(["Contacted", "Approved", "Pending", "Rejected"] as LeadStatus[]).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Rating</label>
            <input
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="h-10 px-4 rounded-xl border border-gray-300">
              Cancel
            </button>
            <button type="submit" className="h-10 px-5 rounded-xl bg-[#10A4B0] text-white">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


function TextField({ label, value, onChange, type = "text" }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-teal-500"
      />
    </div>
  );
}
