import React from 'react';

interface TabProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const Tabs: React.FC<TabProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? 'bg-teal-600 text-white'
              : 'text-gray-700 hover:text-gray-900'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
