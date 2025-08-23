//v2

// src/components/Layout/Layout.tsx

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ItinerarySidebar from './ItinerarySidebar';
import Header from './Header';
import { useSidebar } from '../../context/SidebarContext';
import { useAuth } from '../../context/AuthContext'; // ✅ Import auth context

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { sidebar } = useSidebar();
  const { isAuthenticated } = useAuth(); // ✅ Access auth status

  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const handleBackToItinerary = () => {
    console.log('Back to itinerary');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* ✅ Only show sidebars if user is authenticated */}
      {isAuthenticated && (
        sidebar === 'itinerary' ? (
          <ItinerarySidebar
            currentStep={currentStep}
            onStepClick={handleStepClick}
            onBackToItinerary={handleBackToItinerary}
          />
        ) : (
          <Sidebar />
        )
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ✅ Only show header if authenticated */}
        {isAuthenticated && <Header />}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;








//v1
// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import ItinerarySidebar from './ItinerarySidebar';
// import Header from './Header';
// import { useSidebar } from '../../context/SidebarContext'; // ✅ Corrected import

// interface LayoutProps {
//   children: React.ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const { sidebar } = useSidebar();

//   // ✅ Add local state for itinerary sidebar
//   const [currentStep, setCurrentStep] = useState<number>(1);

//   const handleStepClick = (step: number) => {
//     setCurrentStep(step);
//   };

//   const handleBackToItinerary = () => {
//     console.log('Back to itinerary');
//     // optionally switch sidebar or do other logic
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {sidebar === 'itinerary' ? (
//         <ItinerarySidebar
//           currentStep={currentStep}
//           onStepClick={handleStepClick}
//           onBackToItinerary={handleBackToItinerary}
//         />
//       ) : (
//         <Sidebar />
//       )}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header />
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;
