import React, { useState, useMemo, useEffect, FC, ChangeEvent } from 'react';
import { Search, Download, ChevronRight } from 'lucide-react';

// --- TYPE DEFINITIONS ---
interface Lead {
  id: number;
  date: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  owner: string;
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
  paymentMethod: 'Credit Card' | 'PayPal' | 'Bank Transfer'| 'UPI' | 'Debit Card';
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
  { id: 1, date: '2024-12-27', customerName: 'Priya Patel', email: 'priya.patel@example.com', phone: '+1 (555) 012-3456', address: 'abcdabcd', owner: 'Rashmi Singh' },
  { id: 2, date: '2024-12-26', customerName: 'Aarav Mehta', email: 'aarav.mehta@example.com', phone: '+1 (555) 102-2345', address: '456 Elm St, Delhi', owner: 'Nikhil Sharma' },
  { id: 3, date: '2024-12-25', customerName: 'Fatima Khan', email: 'fatima.khan@example.com', phone: '+1 (555) 103-2345', address: '789 Oak St, Bangalore', owner: 'Rashmi Singh' },
  { id: 4, date: '2024-12-24', customerName: 'Liam O’Connor', email: 'liam.oconnor@example.com', phone: '+1 (555) 104-2345', address: '321 Pine St, Chennai', owner: 'Ravi Kapoor' },
  { id: 5, date: '2024-12-23', customerName: 'Emily Zhang', email: 'emily.zhang@example.com', phone: '+1 (555) 105-2345', address: '654 Cedar St, Kolkata', owner: 'Rashmi Singh' },
  { id: 6, date: '2024-11-20', customerName: 'Carlos Rivera', email: 'carlos.rivera@example.com', phone: '+1 (555) 106-2345', address: '987 Birch St, Hyderabad', owner: 'Nikhil Sharma' },
  { id: 7, date: '2024-11-15', customerName: 'Grace Kim', email: 'grace.kim@example.com', phone: '+1 (555) 107-2345', address: '246 Maple St, Pune', owner: 'Rashmi Singh' },
  { id: 8, date: '2024-11-10', customerName: 'David Lee', email: 'david.lee@example.com', phone: '+1 (555) 108-2345', address: '102 Walnut St, Mumbai', owner: 'Sunita Patil' },
  { id: 9, date: '2024-11-08', customerName: 'Aisha Banerjee', email: 'aisha.banerjee@example.com', phone: '+1 (555) 109-2345', address: '33 Palm St, Surat', owner: 'Nikhil Sharma' },
  { id: 10, date: '2024-11-05', customerName: 'Kabir Das', email: 'kabir.das@example.com', phone: '+1 (555) 110-2345', address: '50 Neem Rd, Ahmedabad', owner: 'Rashmi Singh' },
  { id: 11, date: '2024-11-03', customerName: 'Sneha Reddy', email: 'sneha.reddy@example.com', phone: '+1 (555) 111-2345', address: '18 Lotus Ln, Kochi', owner: 'Ravi Kapoor' },
  { id: 12, date: '2024-10-29', customerName: 'John Abraham', email: 'john.abraham@example.com', phone: '+1 (555) 112-2345', address: '90 Tulip Ave, Bhopal', owner: 'Nikhil Sharma' },
  { id: 13, date: '2024-10-25', customerName: 'Zara Shaikh', email: 'zara.shaikh@example.com', phone: '+1 (555) 113-2345', address: '77 Rose Rd, Indore', owner: 'Rashmi Singh' },
  { id: 14, date: '2024-10-21', customerName: 'Aman Joshi', email: 'aman.joshi@example.com', phone: '+1 (555) 114-2345', address: '34 Jasmine Ln, Jaipur', owner: 'Ravi Kapoor' },
  { id: 15, date: '2024-10-18', customerName: 'Tanya Verma', email: 'tanya.verma@example.com', phone: '+1 (555) 115-2345', address: '65 Orchid Blvd, Patna', owner: 'Sunita Patil' },
  { id: 16, date: '2024-10-12', customerName: 'Ishaan Roy', email: 'ishaan.roy@example.com', phone: '+1 (555) 116-2345', address: '12 Daffodil Dr, Lucknow', owner: 'Rashmi Singh' },
  { id: 17, date: '2024-10-05', customerName: 'Meera Chopra', email: 'meera.chopra@example.com', phone: '+1 (555) 117-2345', address: '23 Marigold Ct, Goa', owner: 'Ravi Kapoor' },
  { id: 18, date: '2024-10-01', customerName: 'Vikram Nair', email: 'vikram.nair@example.com', phone: '+1 (555) 118-2345', address: '91 Peepal Rd, Nagpur', owner: 'Sunita Patil' },
  { id: 19, date: '2024-09-28', customerName: 'Sofia D’Souza', email: 'sofia.dsouza@example.com', phone: '+1 (555) 119-2345', address: '61 Lotus Ave, Mangalore', owner: 'Rashmi Singh' },
  { id: 20, date: '2024-09-20', customerName: 'Rohan Malhotra', email: 'rohan.malhotra@example.com', phone: '+1 (555) 120-2345', address: '10 Banyan St, Chandigarh', owner: 'Nikhil Sharma' },
];


const customersData: Customer[] = [
  { id: 1, date: '2024-12-20', customerName: 'John Doe', status: 'Active', lastContact: '2024-12-15', totalSpent: '$5,400' },
  { id: 2, date: '2024-12-18', customerName: 'Jane Smith', status: 'Active', lastContact: '2024-12-10', totalSpent: '$12,300' },
  { id: 3, date: '2024-11-30', customerName: 'Sam Wilson', status: 'Inactive', lastContact: '2024-09-01', totalSpent: '$1,200' },
  { id: 4, date: '2024-11-25', customerName: 'Maria Garcia', status: 'Active', lastContact: '2024-11-24', totalSpent: '$8,750' },
  { id: 5, date: '2024-11-15', customerName: 'Ali Khan', status: 'Active', lastContact: '2024-11-12', totalSpent: '$3,000' },
  { id: 6, date: '2024-11-10', customerName: 'Sara Lee', status: 'Inactive', lastContact: '2024-10-01', totalSpent: '$750' },
  { id: 7, date: '2024-10-28', customerName: 'Tom Brown', status: 'Active', lastContact: '2024-10-20', totalSpent: '$6,200' },
  { id: 8, date: '2024-10-15', customerName: 'Rina Das', status: 'Inactive', lastContact: '2024-09-30', totalSpent: '$1,050' },
  { id: 9, date: '2024-10-10', customerName: 'Vijay Menon', status: 'Active', lastContact: '2024-10-05', totalSpent: '$9,100' },
  { id: 10, date: '2024-09-25', customerName: 'Tara Bhatt', status: 'Active', lastContact: '2024-09-22', totalSpent: '$7,300' },
  { id: 11, date: '2024-09-20', customerName: 'Arjun Kapoor', status: 'Inactive', lastContact: '2024-08-15', totalSpent: '$2,450' },
  { id: 12, date: '2024-09-15', customerName: 'Nina Roy', status: 'Active', lastContact: '2024-09-12', totalSpent: '$4,000' },
  { id: 13, date: '2024-09-10', customerName: 'George Mathew', status: 'Active', lastContact: '2024-09-08', totalSpent: '$11,500' },
  { id: 14, date: '2024-09-05', customerName: 'Karishma Singh', status: 'Inactive', lastContact: '2024-08-10', totalSpent: '$2,100' },
  { id: 15, date: '2024-09-01', customerName: 'Abhay Verma', status: 'Active', lastContact: '2024-08-30', totalSpent: '$3,700' },
  { id: 16, date: '2024-08-25', customerName: 'Mehul Shah', status: 'Active', lastContact: '2024-08-20', totalSpent: '$5,900' },
  { id: 17, date: '2024-08-20', customerName: 'Natasha Desai', status: 'Inactive', lastContact: '2024-07-15', totalSpent: '$990' },
  { id: 18, date: '2024-08-15', customerName: 'Omkar Joshi', status: 'Active', lastContact: '2024-08-10', totalSpent: '$6,600' },
  { id: 19, date: '2024-08-10', customerName: 'Lata Prasad', status: 'Active', lastContact: '2024-08-08', totalSpent: '$4,800' },
  { id: 20, date: '2024-08-05', customerName: 'Farhan Ali', status: 'Inactive', lastContact: '2024-06-30', totalSpent: '$1,400' },
];


const revenueData: Revenue[] = [
  { id: 1, date: '2024-12-27', transactionId: 'TRX-001', amount: 1500, product: 'Premium Package', paymentMethod: 'Credit Card' },
  { id: 2, date: '2024-12-26', transactionId: 'TRX-002', amount: 750, product: 'Standard Package', paymentMethod: 'PayPal' },
  { id: 3, date: '2024-12-25', transactionId: 'TRX-003', amount: 2500, product: 'Enterprise Solution', paymentMethod: 'Bank Transfer' },
  { id: 4, date: '2024-11-10', transactionId: 'TRX-004', amount: 1200, product: 'Premium Package', paymentMethod: 'Credit Card' },
  { id: 5, date: '2024-11-05', transactionId: 'TRX-005', amount: 1800, product: 'Basic Package', paymentMethod: 'UPI' },
  { id: 6, date: '2024-10-30', transactionId: 'TRX-006', amount: 900, product: 'Standard Package', paymentMethod: 'Debit Card' },
  { id: 7, date: '2024-10-28', transactionId: 'TRX-007', amount: 1350, product: 'Premium Package', paymentMethod: 'Credit Card' },
  { id: 8, date: '2024-10-25', transactionId: 'TRX-008', amount: 2100, product: 'Enterprise Solution', paymentMethod: 'PayPal' },
  { id: 9, date: '2024-10-20', transactionId: 'TRX-009', amount: 600, product: 'Basic Package', paymentMethod: 'Bank Transfer' },
  { id: 10, date: '2024-10-15', transactionId: 'TRX-010', amount: 3000, product: 'Enterprise Solution', paymentMethod: 'Credit Card' },
  { id: 11, date: '2024-10-12', transactionId: 'TRX-011', amount: 450, product: 'Trial Package', paymentMethod: 'UPI' },
  { id: 12, date: '2024-10-10', transactionId: 'TRX-012', amount: 1750, product: 'Premium Package', paymentMethod: 'Debit Card' },
  { id: 13, date: '2024-10-05', transactionId: 'TRX-013', amount: 800, product: 'Standard Package', paymentMethod: 'PayPal' },
  { id: 14, date: '2024-10-01', transactionId: 'TRX-014', amount: 2200, product: 'Enterprise Solution', paymentMethod: 'Bank Transfer' },
  { id: 15, date: '2024-09-25', transactionId: 'TRX-015', amount: 1250, product: 'Premium Package', paymentMethod: 'Credit Card' },
  { id: 16, date: '2024-09-20', transactionId: 'TRX-016', amount: 980, product: 'Standard Package', paymentMethod: 'Debit Card' },
  { id: 17, date: '2024-09-15', transactionId: 'TRX-017', amount: 1600, product: 'Basic Package', paymentMethod: 'UPI' },
  { id: 18, date: '2024-09-10', transactionId: 'TRX-018', amount: 2750, product: 'Enterprise Solution', paymentMethod: 'Bank Transfer' },
  { id: 19, date: '2024-09-05', transactionId: 'TRX-019', amount: 1450, product: 'Premium Package', paymentMethod: 'Credit Card' },
  { id: 20, date: '2024-09-01', transactionId: 'TRX-020', amount: 600, product: 'Trial Package', paymentMethod: 'PayPal' },
];


const agentsData: Agent[] = [
  { id: 1, date: '2024-12-01', agentName: 'Rashmi Singh', leadsClosed: 25, totalSales: '$55,000', commission: '$5,500' },
  { id: 2, date: '2024-12-01', agentName: 'Nikhil Sharma', leadsClosed: 18, totalSales: '$42,000', commission: '$4,200' },
  { id: 3, date: '2024-12-01', agentName: 'Ravi Kapoor', leadsClosed: 32, totalSales: '$71,000', commission: '$7,100' },
  { id: 4, date: '2024-11-01', agentName: 'Sunita Patil', leadsClosed: 15, totalSales: '$35,000', commission: '$3,500' },
  { id: 5, date: '2024-11-01', agentName: 'Anita Deshmukh', leadsClosed: 22, totalSales: '$50,000', commission: '$5,000' },
  { id: 6, date: '2024-10-15', agentName: 'Rahul Verma', leadsClosed: 28, totalSales: '$60,000', commission: '$6,000' },
  { id: 7, date: '2024-10-15', agentName: 'Sneha Mehta', leadsClosed: 20, totalSales: '$45,000', commission: '$4,500' },
  { id: 8, date: '2024-10-10', agentName: 'Karan Gupta', leadsClosed: 26, totalSales: '$58,000', commission: '$5,800' },
  { id: 9, date: '2024-09-30', agentName: 'Neha Bhatia', leadsClosed: 30, totalSales: '$63,000', commission: '$6,300' },
  { id: 10, date: '2024-09-25', agentName: 'Abhishek Yadav', leadsClosed: 17, totalSales: '$39,000', commission: '$3,900' },
  { id: 11, date: '2024-09-20', agentName: 'Pooja Rani', leadsClosed: 21, totalSales: '$44,000', commission: '$4,400' },
  { id: 12, date: '2024-09-15', agentName: 'Mohit Jain', leadsClosed: 29, totalSales: '$61,000', commission: '$6,100' },
  { id: 13, date: '2024-09-10', agentName: 'Divya Nair', leadsClosed: 16, totalSales: '$38,000', commission: '$3,800' },
  { id: 14, date: '2024-09-05', agentName: 'Amitabh Desai', leadsClosed: 33, totalSales: '$72,000', commission: '$7,200' },
  { id: 15, date: '2024-09-01', agentName: 'Rajeev Pillai', leadsClosed: 19, totalSales: '$43,000', commission: '$4,300' },
  { id: 16, date: '2024-08-28', agentName: 'Harshita Malhotra', leadsClosed: 23, totalSales: '$48,000', commission: '$4,800' },
  { id: 17, date: '2024-08-25', agentName: 'Sameer Saxena', leadsClosed: 27, totalSales: '$59,000', commission: '$5,900' },
  { id: 18, date: '2024-08-20', agentName: 'Ritika Sharma', leadsClosed: 24, totalSales: '$51,000', commission: '$5,100' },
  { id: 19, date: '2024-08-15', agentName: 'Pranav Iyer', leadsClosed: 20, totalSales: '$46,000', commission: '$4,600' },
  { id: 20, date: '2024-08-10', agentName: 'Anjali Desai', leadsClosed: 31, totalSales: '$70,000', commission: '$7,000' },
];


const allData: Record<TabId, ReportData[]> = {
  leads: leadsData,
  customers: customersData,
  revenue: revenueData,
  agents: agentsData,
};

const TABS: { id: TabId; label: string }[] = [
  { id: 'leads', label: 'Leads' },
  { id: 'customers', label: 'Customers' },
  { id: 'revenue', label: 'Revenue' },
  { id: 'agents', label: 'Agents' }
];

const HEADERS: Record<TabId, string[]> = {
  leads: ['Customer Name', 'Email', 'Phone', 'Address', 'Owner'],
  customers: ['Customer Name', 'Status', 'Last Contact', 'Total Spent'],
  revenue: ['Transaction ID', 'Amount', 'Product', 'Payment Method'],
  agents: ['Agent Name', 'Leads Closed', 'Total Sales', 'Commission'],
};

// --- Helper component for rendering table cells ---
const TableRow: FC<{ item: ReportData; activeTab: TabId }> = ({ item, activeTab }) => {
  const cellClass = "px-6 py-4 text-sm text-gray-500 whitespace-nowrap";

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
        </>
      );
    case 'customers':
      const customer = item as Customer;
      return (
        <>
          <td className={cellClass}>{customer.customerName}</td>
          <td className={cellClass}>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {customer.status}
            </span>
          </td>
          <td className={cellClass}>{customer.lastContact}</td>
          <td className={cellClass}>{customer.totalSpent}</td>
        </>
      );
    case 'revenue':
      const revenue = item as Revenue;
      return (
        <>
          <td className={cellClass}>{revenue.transactionId}</td>
          <td className={cellClass}>${revenue.amount.toLocaleString()}</td>
          <td className={cellClass}>{revenue.product}</td>
          <td className={cellClass}>{revenue.paymentMethod}</td>
        </>
      );
    case 'agents':
      const agent = item as Agent;
      return (
        <>
          <td className={cellClass}>{agent.agentName}</td>
          <td className={cellClass}>{agent.leadsClosed}</td>
          <td className={cellClass}>{agent.totalSales}</td>
          <td className={cellClass}>{agent.commission}</td>
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

  // Defaulting to a valid date range for demonstration
  const [startDate, setStartDate] = useState('2024-11-01');
  const [endDate, setEndDate] = useState('2024-12-27');

  const filteredData = useMemo(() => {
    let data: ReportData[] = allData[activeTab];

    // Apply search query filter
    if (searchQuery) {
      data = data.filter((item: ReportData) =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply date range filter
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      // Add 1 day to the end date to make the range inclusive
      end.setDate(end.getDate() + 1);
      data = data.filter((item: ReportData) => {
        const itemDate = new Date(item.date);
        return itemDate >= start && itemDate < end;
      });
    }

    return data;
  }, [activeTab, searchQuery, startDate, endDate]);

  // This useEffect handles the automatic filtering when dates change.
  useEffect(() => {
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      console.error("Start date cannot be after end date.");
    }
    // No need to setAppliedDateRange anymore, filtering is direct.
  }, [startDate, endDate]);

  // Reset selections when filters change
  useEffect(() => {
    setSelectedRows([]);
  }, [activeTab, searchQuery, startDate, endDate]);

  const handleTabClick = (tabId: TabId) => {
    setActiveTab(tabId);
  };

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(filteredData.map((item: ReportData) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  return (

    

      
    <div className="p-8 bg-white min-h-screen font-sans ">
      <div className="space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800" style={{ color: '#008080' }}>Reports</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Here..."
                value={searchQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400 w-64 text-sm"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <button className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-full transition-colors text-sm">
              <Download className="w-4 h-4" />
              <span>Download Reports</span>
            </button>
          </div>
        </header>
        {/* black line */}
        <div className="w-full border-t-2 border-black opacity-100 my-4"></div>


        {/* Tabs */}
        <div className="flex items-center space-x-6 mt-6">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center justify-center px-[6px] h-[30px] w-[133px] gap-[20px] rounded-[5px] border text-sm font-medium transition-colors
          ${isActive
                    ? 'bg-[#10A4B0] text-white border-transparent'
                    : 'bg-white text-[#717182] border border-[#717182] hover:text-[#10A4B0]'}`
                }
              >
                <span className="font-raleway text-[14px] leading-[16px] font-medium">
                  {tab.label}
                </span>
                <ChevronRight
                  className={`w-4 h-4 transform ${isActive ? 'text-white' : 'text-[#717182]'} rotate-90`}
                />
              </button>
            );
          })}
        </div>


        {/* Sub-header with Title and Date Filter */}
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-gray-700 text-sm">
            {TABS.find(t => t.id === activeTab)?.label} Performance Reports
          </span>
          <div className="flex items-center space-x-2 rounded-md border border-gray-200 px-3 py-1 text-xs">
            <span className="font-medium text-gray-400">FROM</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border-0 bg-transparent p-0 text-gray-600 focus:outline-none focus:ring-0"
              style={{ fontFamily: 'Raleway, sans-serif', fontSize: '12px' }}
            />
            <span className="text-gray-300">|</span>
            <span className="font-medium text-gray-400">TO</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border-0 bg-transparent p-0 text-gray-600 focus:outline-none focus:ring-0"
              style={{ fontFamily: 'Raleway, sans-serif', fontSize: '12px' }}
            />
          </div>
        </div>


        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead >
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500"
                  />
                </th>
                {HEADERS[activeTab].map(header => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredData.map((item) => (
                <tr key={item.id} className={`border-b border-gray-200 hover:bg-gray-50 ${selectedRows.includes(item.id) ? 'bg-teal-50' : ''}`}>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => handleSelectRow(item.id)}
                      className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500"
                    />
                  </td>
                  <TableRow item={item} activeTab={activeTab} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Custom Scrollbar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-gray-400 h-2.5 rounded-full" style={{ width: '45%' }}></div>
        </div>
      </div>
    </div>
    
  );
};

export default ReportsPage;
