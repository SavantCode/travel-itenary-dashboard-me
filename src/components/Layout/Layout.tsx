import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ItinerarySidebar from './ItinerarySidebar';
import Header from './Header';
import { useSidebar } from '../../context/SidebarContext'; // ✅ Corrected import

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { sidebar } = useSidebar();

  // ✅ Add local state for itinerary sidebar
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const handleBackToItinerary = () => {
    console.log('Back to itinerary');
    // optionally switch sidebar or do other logic
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {sidebar === 'itinerary' ? (
        <ItinerarySidebar
          currentStep={currentStep}
          onStepClick={handleStepClick}
          onBackToItinerary={handleBackToItinerary}
        />
      ) : (
        <Sidebar />
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
