import React, { useState, useMemo, useEffect, FC, ChangeEvent, useCallback, useRef } from 'react';
import { Search, Download, ChevronRight, Eye, Trash2, Star, Pencil, X } from 'lucide-react';

// --- HELPER ICONS (Updated Audio Wave Icon) ---
const AudioWaveIcon: FC<{ className?: string }> = ({ className = "w-5 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M7 9V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M17 9V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);


// --- TYPE DEFINITIONS ---
interface Lead {
  id: number;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  owner: string;
  customerRating: number;
  sourcePerson: string;
  serviceType: string;
  leadStatus: 'Contacted' | 'Approved' | 'Pending' | 'Rejected';
  date: string;
}

interface Customer {
  id: number;
  date: string;
  customerName: string;
  status: 'Active' | 'Inactive';
  lastContact: string;
  totalSpent: string;
}

interface Revenue {
  id: number;
  date: string;
  transactionId: string;
  amount: number;
  product: string;
  paymentMethod: 'Credit Card' | 'PayPal' | 'Bank Transfer' | 'UPI' | 'Debit Card';
}

interface Agent {
  id: number;
  date: string;
  agentName: string;
  leadsClosed: number;
  totalSales: string;
  commission: string;
}

type ReportData = Lead | Customer | Revenue | Agent;
type TabId = 'leads' | 'customers' | 'revenue' | 'agents';


// --- MOCK DATA ---
const leadsData: Lead[] = [
  { id: 1, date: '2024-12-27', customerName: 'Priya Patel', email: 'priya.patel@example.com', phone: '+1 (555) 012-3456', address: '123 Mango Grove, Mumbai', owner: 'Rashmi Singh', customerRating: 4.5, sourcePerson: 'Referral', serviceType: 'Currency Exchange', leadStatus: 'Contacted' },
  { id: 2, date: '2024-12-26', customerName: 'Aarav Mehta', email: 'aarav.mehta@example.com', phone: '+1 (555) 102-2345', address: '456 Elm St, Delhi', owner: 'Nikhil Sharma', customerRating: 4.5, sourcePerson: 'Website', serviceType: 'Currency Exchange', leadStatus: 'Approved' },
  { id: 3, date: '2024-12-25', customerName: 'Fatima Khan', email: 'fatima.khan@example.com', phone: '+1 (555) 103-2345', address: '789 Oak St, Bangalore', owner: 'Rashmi Singh', customerRating: 4.5, sourcePerson: 'Social Media', serviceType: 'Currency Exchange', leadStatus: 'Pending' },
  { id: 4, date: '2024-12-24', customerName: 'Liam O’Connor', email: 'liam.oconnor@example.com', phone: '+1 (555) 104-2345', address: '321 Pine St, Chennai', owner: 'Ravi Kapoor', customerRating: 4.5, sourcePerson: 'Cold Call', serviceType: 'Currency Exchange', leadStatus: 'Rejected' },
  { id: 5, date: '2024-12-23', customerName: 'Emily Zhang', email: 'emily.zhang@example.com', phone: '+1 (555) 105-2345', address: '654 Cedar St, Kolkata', owner: 'Rashmi Singh', customerRating: 4.5, sourcePerson: 'Email Campaign', serviceType: 'Currency Exchange', leadStatus: 'Pending' },
  { id: 6, date: '2024-11-20', customerName: 'Carlos Rivera', email: 'carlos.rivera@example.com', phone: '+1 (555) 106-2345', address: '987 Birch St, Hyderabad', owner: 'Nikhil Sharma', customerRating: 4.0, sourcePerson: 'Referral', serviceType: 'Money Transfer', leadStatus: 'Approved' },
  { id: 7, date: '2024-11-15', customerName: 'Grace Kim', email: 'grace.kim@example.com', phone: '+1 (555) 107-2345', address: '246 Maple St, Pune', owner: 'Rashmi Singh', customerRating: 5.0, sourcePerson: 'Website', serviceType: 'Travel Card', leadStatus: 'Contacted' },
];

const customersData: Customer[] = [
  { id: 1, date: '2024-12-20', customerName: 'John Doe', status: 'Active', lastContact: '2024-12-15', totalSpent: '$5,400' },
  { id: 2, date: '2024-12-18', customerName: 'Jane Smith', status: 'Active', lastContact: '2024-12-10', totalSpent: '$12,300' },
  { id: 3, date: '2024-11-30', customerName: 'Sam Wilson', status: 'Inactive', lastContact: '2024-09-01', totalSpent: '$1,200' },
];

const revenueData: Revenue[] = [
  { id: 1, date: '2024-12-27', transactionId: 'TRX-001', amount: 1500, product: 'Premium Package', paymentMethod: 'Credit Card' },
  { id: 2, date: '2024-12-26', transactionId: 'TRX-002', amount: 750, product: 'Standard Package', paymentMethod: 'PayPal' },
  { id: 3, date: '2024-12-25', transactionId: 'TRX-003', amount: 2500, product: 'Enterprise Solution', paymentMethod: 'Bank Transfer' },
];

const agentsData: Agent[] = [
  { id: 1, date: '2024-12-01', agentName: 'Rashmi Singh', leadsClosed: 25, totalSales: '$55,000', commission: '$5,500' },
  { id: 2, date: '2024-12-01', agentName: 'Nikhil Sharma', leadsClosed: 18, totalSales: '$42,000', commission: '$4,200' },
  { id: 3, date: '2024-12-01', agentName: 'Ravi Kapoor', leadsClosed: 32, totalSales: '$71,000', commission: '$7,100' },
];


// --- CONFIGURATION CONSTANTS ---
const allData: Record<TabId, ReportData[]> = { leads: leadsData, customers: customersData, revenue: revenueData, agents: agentsData };
const TABS: { id: TabId; label: string }[] = [ { id: 'leads', label: 'Leads' }, { id: 'customers', label: 'Customers' }, { id: 'revenue', label: 'Revenue' }, { id: 'agents', label: 'Agents' } ];
const HEADERS: Record<TabId, string[]> = {
  leads: ['Customer Name', 'Email', 'Phone', 'Address', 'Owner', 'Customer Rating', 'Source Person', 'Service Type', 'Lead Status', 'Audio', 'Action'],
  customers: ['Date', 'Customer Name', 'Status', 'Last Contact', 'Total Spent', 'Action'],
  revenue: ['Date', 'Transaction ID', 'Amount', 'Product', 'Payment Method', 'Action'],
  agents: ['Date', 'Agent Name', 'Leads Closed', 'Total Sales', 'Commission', 'Action'],
};

// --- Helper component props ---
interface TableRowProps {
  item: ReportData;
  activeTab: TabId;
  onPlayAudio: () => void;
  onViewDetails: (item: ReportData) => void;
  onEditDetails: (item: ReportData) => void;
  onDeleteItem: (id: number) => void;
}

// --- Helper component for rendering table cells ---
const TableRow: FC<TableRowProps> = ({ item, activeTab, onPlayAudio, onViewDetails, onEditDetails, onDeleteItem }) => {
  const cellClass = "px-6 py-3 text-sm text-gray-700 whitespace-nowrap";

  const getStatusClass = (status: Lead['leadStatus']) => {
    switch (status) {
      case 'Approved': return 'bg-[#34B53A]';
      case 'Contacted': return 'bg-[#80CAFF]';
      case 'Pending': return 'bg-[#FFB200]';
      case 'Rejected': return 'bg-[#FF3A29]';
      default: return 'bg-gray-400';
    }
  };
  
  const actionButtons = (
      <td className={cellClass}>
        <div className="flex items-center space-x-2">
            <button onClick={() => onViewDetails(item)} title="View Details" className="p-1.5 rounded-md bg-blue-100 hover:bg-blue-200"><Eye size={18} className="text-blue-600" /></button>
            <button onClick={() => onEditDetails(item)} title="Edit Details" className="p-1.5 rounded-md bg-green-100 hover:bg-green-200"><Pencil size={18} className="text-green-600" /></button>
            <button onClick={() => onDeleteItem(item.id)} title="Delete Item" className="p-1.5 rounded-md bg-red-100 hover:bg-red-200"><Trash2 size={18} className="text-red-600" /></button>
        </div>
      </td>
  );

  switch (activeTab) {
    case 'leads':
      const lead = item as Lead;
      return (
        <>
          <td className={cellClass}>{lead.customerName}</td>
          <td className={cellClass}>{lead.email}</td>
          <td className={cellClass}>{lead.phone}</td>
          <td className={cellClass}>{lead.address}</td>
          <td className={cellClass}>{lead.owner}</td>
          <td className={cellClass}>
            <div className='flex items-center gap-1.5'>
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{lead.customerRating}</span>
            </div>
          </td>
          <td className={cellClass}>{lead.sourcePerson}</td>
          <td className={cellClass}>{lead.serviceType}</td>
          <td className={cellClass}>
            <span className={`px-4 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${getStatusClass(lead.leadStatus)}`}>
              {lead.leadStatus}
            </span>
          </td>
          <td className={cellClass}>
             <button onClick={onPlayAudio} className="flex items-center justify-center gap-2 w-[110px] h-[30px] rounded-full bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors">
                <span>Listen</span>
                <AudioWaveIcon className="w-5 h-4 text-white" />
             </button>
          </td>
          {actionButtons}
        </>
      );
    case 'customers':
      const customer = item as Customer;
      return (
        <>
          <td className={cellClass}>{customer.date}</td>
          <td className={cellClass}>{customer.customerName}</td>
          <td className={cellClass}>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {customer.status}
            </span>
          </td>
          <td className={cellClass}>{customer.lastContact}</td>
          <td className={cellClass}>{customer.totalSpent}</td>
          {actionButtons}
        </>
      );
    case 'revenue':
      const revenue = item as Revenue;
      return (
        <>
          <td className={cellClass}>{revenue.date}</td>
          <td className={cellClass}>{revenue.transactionId}</td>
          <td className={cellClass}>${revenue.amount.toLocaleString()}</td>
          <td className={cellClass}>{revenue.product}</td>
          <td className={cellClass}>{revenue.paymentMethod}</td>
          {actionButtons}
        </>
      );
    case 'agents':
      const agent = item as Agent;
      return (
        <>
          <td className={cellClass}>{agent.date}</td>
          <td className={cellClass}>{agent.agentName}</td>
          <td className={cellClass}>{agent.leadsClosed}</td>
          <td className={cellClass}>{agent.totalSales}</td>
          <td className={cellClass}>{agent.commission}</td>
          {actionButtons}
        </>
      );
    default:
      return null;
  }
};


// --- MAIN COMPONENT ---
const ReportsPage: FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('leads');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState<Record<TabId, ReportData[]>>(allData);
  const [modalState, setModalState] = useState<{ mode: 'view' | 'edit'; item: ReportData } | null>(null);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(0);
  const [thumbLeft, setThumbLeft] = useState(0);

  const filteredData = useMemo(() => {
    let data: ReportData[] = reportData[activeTab] || [];
    if (searchQuery) { data = data.filter(item => Object.values(item).some(value => String(value).toLowerCase().includes(searchQuery.toLowerCase()))); }
    if (startDate && endDate) {
      try {
        const start = new Date(startDate); start.setHours(0, 0, 0, 0);
        const end = new Date(endDate); end.setHours(23, 59, 59, 999);
        data = data.filter(item => { const itemDate = new Date(item.date); return itemDate >= start && itemDate <= end; });
      } catch (error) { console.error("Invalid date format", error); }
    }
    return data;
  }, [activeTab, searchQuery, startDate, endDate, reportData]);
  
  const handleClearFilters = () => { setSearchQuery(''); setStartDate(''); setEndDate(''); };
  
  useEffect(() => { setSelectedRows([]); handleClearFilters(); }, [activeTab]);

  const handleTabClick = (tabId: TabId) => { setActiveTab(tabId); };
  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => { setSelectedRows(e.target.checked ? filteredData.map(item => item.id) : []); };
  const handleSelectRow = (id: number) => { setSelectedRows(prev => prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]); };
  
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
    } catch (error) { console.error("Failed to play audio:", error); }
  };
  
  const handleViewDetails = (item: ReportData) => setModalState({ mode: 'view', item });
  const handleEditDetails = (item: ReportData) => setModalState({ mode: 'edit', item });
  
  const handleDeleteItem = (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setReportData(prev => ({ ...prev, [activeTab]: prev[activeTab].filter(item => item.id !== id) }));
    }
  };
  
  const handleUpdateItem = (updatedItem: ReportData) => {
    setReportData(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(item => item.id === updatedItem.id ? updatedItem : item)
    }));
    setModalState(null);
  };
  
  const updateScrollbar = useCallback(() => {
    const container = tableContainerRef.current;
    if (container) {
      const { scrollWidth, clientWidth, scrollLeft } = container;
      const hasScrollbar = scrollWidth > clientWidth;
      setThumbWidth(hasScrollbar ? (clientWidth / scrollWidth) * 100 : 0);
      setThumbLeft(hasScrollbar ? (scrollLeft / scrollWidth) * 100 : 0);
    }
  }, []);

  useEffect(() => {
    const container = tableContainerRef.current;
    if (!container) return;
    updateScrollbar();
    const handleResize = () => updateScrollbar();
    const handleScroll = () => updateScrollbar();
    window.addEventListener('resize', handleResize);
    container.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('scroll', handleScroll);
    };
  }, [updateScrollbar, activeTab, filteredData]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tableContainerRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollLeftStart(tableContainerRef.current.scrollLeft);
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !tableContainerRef.current || !scrollbarRef.current) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX);
    const scrollbarTrackWidth = scrollbarRef.current.clientWidth;
    const tableScrollWidth = tableContainerRef.current.scrollWidth;
    const scrollRatio = tableScrollWidth / scrollbarTrackWidth;
    tableContainerRef.current.scrollLeft = scrollLeftStart + walk * scrollRatio;
  }, [isDragging, startX, scrollLeftStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      <div className="bg-[#F6F6FA] min-h-screen p-4 md:p-2 font-raleway lg:p-1">
        <div className="space-y-6">
            <div >
            
          <div className="flex flex-col md:flex-row md:items-center  md:justify-between gap-4">
              <h1 className="text-2xl font-bold text-[#10A4B0]">Reports</h1>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <button className="flex-shrink-0 flex items-center justify-center gap-2 h-10 px-5 rounded-full bg-[#10A4B0] text-white font-semibold hover:bg-[#0D8A94] transition-colors w-full sm:w-auto">
                  <Download className="w-4 h-4" />
                  <span>Download Reports</span>
                </button>
              </div>
          </div>

          {/* Underline */}
          <div className="border-b border-gray-700 w-full mb-6 mt-3"></div>
        </div>

          <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto pb-2">
           
           <div className="flex flex-col sm:flex-row items-center gap-4 p-1 w-full md:w-auto">
<div className="flex items-center gap-2 rounded-full border border-gray-300 h-10 px-4 bg-white focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500">
                  <Search className="w-5 h-5 text-gray-500" />
                  <input
                    className="outline-none text-sm placeholder-gray-500 w-full bg-transparent"
                    placeholder="Search Here..."
                    value={searchQuery}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  />
                </div>
           
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex-shrink-0 flex items-center justify-center px-3 sm:px-4 h-9 w-auto gap-2 rounded-md border text-sm font-medium transition-colors
                    ${isActive
                      ? 'bg-[#10A4B0] text-white border-transparent'
                      : 'bg-white text-[#717182] border border-[#717182] hover:text-[#10A4B0]'}`
                  }
                >
                  <span>{tab.label}</span>
                  {!isActive && <ChevronRight className={`w-4 h-4 text-[#717182]`} />}
                </button>
              );
            })}
          </div>
</div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-semibold text-gray-800 text-lg whitespace-nowrap">
              {TABS.find(t => t.id === activeTab)?.label} Performance Reports
            </span>
            <div className="flex flex-wrap items-center gap-4">
               <div className="flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs">
                   <span className="font-medium text-gray-400">FROM</span>
                   <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-transparent focus:outline-none text-gray-600 p-1"/>
                   <span className="text-gray-300">|</span>
                   <span className="font-medium text-gray-400">TO</span>
                   <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="bg-transparent focus:outline-none text-gray-600 p-1"/>
              </div>
              {(startDate || endDate || searchQuery) && (
                <button onClick={handleClearFilters} className="text-sm text-gray-600 hover:text-red-500 font-semibold transition-colors">
                    Clear Filters
                </button>
              )}
            </div>
          </div>
            
          <div ref={tableContainerRef} className="overflow-x-auto bg-white rounded-xl border border-gray-200 hide-scrollbar">
            <table className="min-w-full" style={{ tableLayout: 'auto' }}>
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 sticky left-0 bg-gray-50 z-20">
                    <input type="checkbox" checked={filteredData.length > 0 && selectedRows.length === filteredData.length} onChange={handleSelectAll} className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500"/>
                  </th>
                  {HEADERS[activeTab].map(header => (
                    <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr key={item.id} className={`group ${selectedRows.includes(item.id) ? 'bg-teal-50' : 'hover:bg-gray-50'}`}>
                      <td className={`px-6 py-4 sticky left-0 z-10 ${selectedRows.includes(item.id) ? 'bg-teal-50' : 'bg-white group-hover:bg-gray-50'}`}>
                        <input type="checkbox" checked={selectedRows.includes(item.id)} onChange={() => handleSelectRow(item.id)} className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500"/>
                      </td>
                      <TableRow 
                        item={item} 
                        activeTab={activeTab} 
                        onPlayAudio={playBeep}
                        onViewDetails={handleViewDetails}
                        onEditDetails={handleEditDetails}
                        onDeleteItem={handleDeleteItem}
                      />
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={HEADERS[activeTab].length + 2} className="text-center py-10 text-gray-500">No data available for the selected filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
            
          {thumbWidth > 0 && (
            <div ref={scrollbarRef} className="w-full bg-gray-200 rounded-full h-2.5 relative cursor-pointer mt-4">
              <div className="bg-gray-400 h-2.5 rounded-full absolute top-0 cursor-grab" style={{ width: `${thumbWidth}%`, left: `${thumbLeft}%` }} onMouseDown={handleMouseDown}/>
            </div>
          )}
        </div>
      </div>
      
      {modalState && (
        <ReportDetailsModal
          mode={modalState.mode}
          item={modalState.item}
          activeTab={activeTab}
          onClose={() => setModalState(null)}
          onSubmit={handleUpdateItem}
        />
      )}
    </>
  );
};


// --- DETAILS MODAL COMPONENT ---
interface ReportDetailsModalProps {
  mode: 'view' | 'edit';
  item: ReportData;
  activeTab: TabId;
  onClose: () => void;
  onSubmit: (updatedItem: ReportData) => void;
}

interface FormFieldDefinition {
  label: string;
  value: any;
  field: string;
  type?: 'text' | 'date' | 'email' | 'number' | 'select';
  readOnly?: boolean;
  options?: string[];
}

const ReportDetailsModal: FC<ReportDetailsModalProps> = ({ mode, item, activeTab, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<ReportData>(item);
  const isViewMode = mode === 'view';
  
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  const renderFields = (): FormFieldDefinition[] => {
    switch (activeTab) {
      case 'leads':
        const lead = formData as Lead;
        return [
          { label: 'ID', value: lead.id, field: 'id', type: 'text', readOnly: true },
          { label: 'Date', value: lead.date, field: 'date', type: 'date' },
          { label: 'Customer Name', value: lead.customerName, field: 'customerName', type: 'text' },
          { label: 'Email', value: lead.email, field: 'email', type: 'email' },
          { label: 'Phone', value: lead.phone, field: 'phone', type: 'text' },
          { label: 'Address', value: lead.address, field: 'address', type: 'text' },
          { label: 'Owner', value: lead.owner, field: 'owner', type: 'text' },
          { label: 'Rating', value: lead.customerRating, field: 'customerRating', type: 'number' },
          { label: 'Source', value: lead.sourcePerson, field: 'sourcePerson', type: 'text' },
          { label: 'Service', value: lead.serviceType, field: 'serviceType', type: 'text' },
          { label: 'Status', value: lead.leadStatus, field: 'leadStatus', type: 'select', options: ['Contacted', 'Approved', 'Pending', 'Rejected'] },
        ];
      case 'customers':
        const customer = formData as Customer;
        return [
          { label: 'ID', value: customer.id, field: 'id', type: 'text', readOnly: true },
          { label: 'Date', value: customer.date, field: 'date', type: 'date' },
          { label: 'Customer Name', value: customer.customerName, field: 'customerName', type: 'text' },
          { label: 'Status', value: customer.status, field: 'status', type: 'select', options: ['Active', 'Inactive'] },
          { label: 'Last Contact', value: customer.lastContact, field: 'lastContact', type: 'date' },
          { label: 'Total Spent', value: customer.totalSpent, field: 'totalSpent', type: 'text' },
        ];
      case 'revenue':
        const revenue = formData as Revenue;
        return [
            { label: 'ID', value: revenue.id, field: 'id', type: 'text', readOnly: true },
            { label: 'Date', value: revenue.date, field: 'date', type: 'date' },
            { label: 'Transaction ID', value: revenue.transactionId, field: 'transactionId', type: 'text' },
            { label: 'Amount', value: revenue.amount, field: 'amount', type: 'number' },
            { label: 'Product', value: revenue.product, field: 'product', type: 'text' },
            { label: 'Payment Method', value: revenue.paymentMethod, field: 'paymentMethod', type: 'select', options: ['Credit Card', 'PayPal', 'Bank Transfer', 'UPI', 'Debit Card'] },
        ];
      case 'agents':
        const agent = formData as Agent;
        return [
            { label: 'ID', value: agent.id, field: 'id', type: 'text', readOnly: true },
            { label: 'Date', value: agent.date, field: 'date', type: 'date' },
            { label: 'Agent Name', value: agent.agentName, field: 'agentName', type: 'text' },
            { label: 'Leads Closed', value: agent.leadsClosed, field: 'leadsClosed', type: 'number' },
            { label: 'Total Sales', value: agent.totalSales, field: 'totalSales', type: 'text' },
            { label: 'Commission', value: agent.commission, field: 'commission', type: 'text' },
        ];
      default:
        return Object.entries(formData).map(([key, value]): FormFieldDefinition => ({
            label: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
            value: value,
            field: key,
            type: typeof value === 'number' ? 'number' : 'text',
            readOnly: key === 'id'
        }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">{isViewMode ? 'View Details' : 'Edit Details'}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderFields().map(f => (
                <div key={f.field}>
                    <label className="block text-sm font-medium text-gray-600 mb-1">{f.label}</label>
                     {f.type === 'select' && f.options ? (
                        <select
                          value={f.value}
                          onChange={(e) => handleChange(f.field, e.target.value)}
                          disabled={isViewMode || f.readOnly}
                          className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 disabled:bg-gray-200 disabled:cursor-not-allowed"
                        >
                          {f.options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    ) : (
                        <input
                            type={f.type || 'text'}
                            value={f.value}
                            onChange={(e) => handleChange(f.field, f.type === 'number' ? parseFloat(e.target.value) : e.target.value)}
                            disabled={isViewMode || f.readOnly}
                            className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 disabled:bg-gray-200 disabled:cursor-not-allowed"
                        />
                    )}
                </div>
            ))}
          </div>
          {!isViewMode && (
            <div className="flex justify-end p-4 border-t bg-gray-50">
              <button type="button" onClick={onClose} className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
              <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[#10A4B0] border border-transparent rounded-md hover:bg-[#0D8A94]">Save Changes</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReportsPage;