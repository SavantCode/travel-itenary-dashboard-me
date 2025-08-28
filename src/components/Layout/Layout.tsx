//v4


// src/components/Layout/Layout.tsx

import { useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import ItinerarySidebar from './ItinerarySidebar';
import Header from './Header';

import { useSidebar } from '../../context/SidebarContext';
import { useAuth } from '../../context/AuthContext';

const Layout = () => {
  const { sidebar } = useSidebar();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const handleBackToItinerary = () => {
    console.log('Back to itinerary');
  };

  // Routes where layout should be hidden
  const noLayoutRoutes = ['/', '/login', '/unauthorized'];
  const shouldHideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <div className="flex h-screen bg-gray-50">
      {!shouldHideLayout && isAuthenticated && (
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
        {!shouldHideLayout && isAuthenticated && <Header />}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Outlet /> {/* 👈 React Router will inject matched child route here */}
        </main>
      </div>
    </div>
  );
};

export default Layout;


















//......................................................................................................................

// //v3



// // src/components/Layout/Layout.tsx

// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';

// import Sidebar from './Sidebar';
// import ItinerarySidebar from './ItinerarySidebar';
// import Header from './Header';

// import { useSidebar } from '../../context/SidebarContext';
// import { useAuth } from '../../context/AuthContext';

// interface LayoutProps {
//   children: React.ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const { sidebar } = useSidebar();
//   const { isAuthenticated } = useAuth();
//   const location = useLocation();

//   const [currentStep, setCurrentStep] = useState<number>(1);

//   const handleStepClick = (step: number) => {
//     setCurrentStep(step);
//   };

//   const handleBackToItinerary = () => {
//     console.log('Back to itinerary');
//   };

//   // 🔒 List of routes where you want to hide sidebar and header
//   const noLayoutRoutes = ['/', '/login', '/unauthorized'];

//   const shouldHideLayout = noLayoutRoutes.includes(location.pathname);

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* ✅ Show sidebar only when authenticated and not on no-layout routes */}
//       {!shouldHideLayout && isAuthenticated && (
//         sidebar === 'itinerary' ? (
//           <ItinerarySidebar
//             currentStep={currentStep}
//             onStepClick={handleStepClick}
//             onBackToItinerary={handleBackToItinerary}
//           />
//         ) : (
//           <Sidebar />
//         )
//       )}

//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* ✅ Show header only when authenticated and not on no-layout routes */}
//         {!shouldHideLayout && isAuthenticated && <Header />}

//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;



















// //...............................................................................
// // //v2

// // // src/components/Layout/Layout.tsx

// // import React, { useState } from 'react';

// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


// // import Sidebar from './Sidebar';
// // import ItinerarySidebar from './ItinerarySidebar';
// // import Header from './Header';
// // import { useSidebar } from '../../context/SidebarContext';

// // import { useAuth } from '../../context/AuthContext'; // ✅ Import auth context


// // import HomeLogin from '../HomeLogin/HomeLogin';


// // interface LayoutProps {
// //   children: React.ReactNode;
// // }

// // const Layout: React.FC<LayoutProps> = ({ children }) => {
// //   const { sidebar } = useSidebar();
// //   const { isAuthenticated } = useAuth(); // ✅ Access auth status

// //   const [currentStep, setCurrentStep] = useState<number>(1);

// //   const handleStepClick = (step: number) => {
// //     setCurrentStep(step);
// //   };

// //   const handleBackToItinerary = () => {
// //     console.log('Back to itinerary');
// //   };

// //   return (
// //     <div className="flex h-screen bg-gray-50">
      
      

// //       {/* ✅ Only show sidebars if user is authenticated */}
// //       {isAuthenticated && (
// //         sidebar === 'itinerary' ? (
// //           <ItinerarySidebar
// //             currentStep={currentStep}
// //             onStepClick={handleStepClick}
// //             onBackToItinerary={handleBackToItinerary}
// //           />
// //         ) : (
// //           <Sidebar />
// //         )
// //       )}
// //       <div className="flex-1 flex flex-col overflow-hidden">
// //         {/* ✅ Only show header if authenticated */}
// //         {isAuthenticated && <Header />}
// //         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
// //           {children}
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Layout;








// // //v1
// // // import React, { useState } from 'react';
// // // import Sidebar from './Sidebar';
// // // import ItinerarySidebar from './ItinerarySidebar';
// // // import Header from './Header';
// // // import { useSidebar } from '../../context/SidebarContext'; // ✅ Corrected import

// // // interface LayoutProps {
// // //   children: React.ReactNode;
// // // }

// // // const Layout: React.FC<LayoutProps> = ({ children }) => {
// // //   const { sidebar } = useSidebar();

// // //   // ✅ Add local state for itinerary sidebar
// // //   const [currentStep, setCurrentStep] = useState<number>(1);

// // //   const handleStepClick = (step: number) => {
// // //     setCurrentStep(step);
// // //   };

// // //   const handleBackToItinerary = () => {
// // //     console.log('Back to itinerary');
// // //     // optionally switch sidebar or do other logic
// // //   };

// // //   return (
// // //     <div className="flex h-screen bg-gray-50">
// // //       {sidebar === 'itinerary' ? (
// // //         <ItinerarySidebar
// // //           currentStep={currentStep}
// // //           onStepClick={handleStepClick}
// // //           onBackToItinerary={handleBackToItinerary}
// // //         />
// // //       ) : (
// // //         <Sidebar />
// // //       )}
// // //       <div className="flex-1 flex flex-col overflow-hidden">
// // //         <Header />
// // //         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
// // //           {children}
// // //         </main>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Layout;

