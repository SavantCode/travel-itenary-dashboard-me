// import React, { useState, useMemo } from 'react';

// // ==============================
// // ========== ICONS ============
// // ==============================
// // Using memo for static icons to prevent re-renders
// const CalendarIcon = React.memo(() => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25M3 18.75h18" />
//   </svg>
// ));

// const ClockIcon = React.memo(() => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// ));

// const TrashIcon = React.memo(() => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
//   </svg>
// ));

// const EditIcon = React.memo(() => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
//     </svg>
// ));

// const LocationPinIcon = React.memo(() => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
//         <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
//     </svg>
// ));


// // ==============================
// // ======== TYPES ==============
// // ==============================

// type DriveType = 'self-drive' | 'with-driver';

// interface VehicleDetails {
//   id: string;
//   driveType: DriveType;
//   vehicleType: string;
//   vehicleNumber?: string;
//   numVehicles: number;
//   pickUpDate: string;
//   pickUpLocation: string;
//   dropOffDate: string;
//   dropOffLocation: string;
//   vehicleBrand?: string;
//   pickUpTime?: string;
//   dropOffTime?: string;
//   remark?: string;
// }

// // ==============================
// // ======== HELPERS =============
// // ==============================

// // Generates a default state for a new vehicle form
// const createInitialVehicleState = (): VehicleDetails => {
//     const today = new Date().toISOString().split('T')[0];
//     return {
//         id: `v_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//         driveType: 'with-driver',
//         vehicleType: 'Carnival (Kia)',
//         vehicleNumber: '',
//         numVehicles: 1,
//         pickUpDate: today,
//         pickUpLocation: '',
//         dropOffDate: today,
//         dropOffLocation: '',
//         pickUpTime: '',
//         dropOffTime: '',
//         vehicleBrand: '',
//         remark: ''
//     };
// };

// // ==============================
// // ========== MAIN =============
// // ==============================

// const VehicleBooking: React.FC = () => {
//   // State for the list of all saved vehicles
//   const [savedVehicles, setSavedVehicles] = useState<VehicleDetails[]>([]);
//   // State for the vehicle currently being edited or added in the form
//   const [currentVehicle, setCurrentVehicle] = useState<VehicleDetails>(createInitialVehicleState());
//   // State to track the ID of the vehicle being edited. Null means we are adding a new one.
//   const [editingId, setEditingId] = useState<string | null>(null);
//   // State for showing a success message
//   const [successMessage, setSuccessMessage] = useState<string>('');

//   // A derived state to determine if the form is in "edit mode"
//   const isEditing = useMemo(() => editingId !== null, [editingId]);

//   // Shows a message that fades out after 3 seconds
//   const showTemporaryMessage = (message: string) => {
//     setSuccessMessage(message);
//     setTimeout(() => {
//         setSuccessMessage('');
//     }, 3000);
//   };

//   // Handles changes in any form input and updates the current vehicle state
//   const handleInputChange = (field: keyof VehicleDetails, value: string | number) => {
//     setCurrentVehicle(prev => ({ ...prev, [field]: value }));
//   };

//   // Saves the current vehicle (either new or edited) to the list
//   const handleSaveVehicle = () => {
//     // Basic validation
//     if (!currentVehicle.pickUpLocation || !currentVehicle.dropOffLocation || !currentVehicle.vehicleType) {
//         alert("Please fill in all required fields: Vehicle Type, Pick Up Location, and Drop Off Location.");
//         return;
//     }

//     if (isEditing) {
//         // Find the vehicle by its ID and update it
//         setSavedVehicles(prev => prev.map(v => v.id === editingId ? currentVehicle : v));
//         showTemporaryMessage("Booking updated successfully!");
//     } else {
//         // Add the new vehicle to the list
//         setSavedVehicles(prev => [...prev, currentVehicle]);
//         showTemporaryMessage("Booking added successfully!");
//     }
//     // Reset the form for the next entry
//     setEditingId(null);
//     setCurrentVehicle(createInitialVehicleState());
//   };
  
//   // Sets up the form to edit a previously saved vehicle
//   const handleEditVehicle = (id: string) => {
//       const vehicleToEdit = savedVehicles.find(v => v.id === id);
//       if (vehicleToEdit) {
//           setEditingId(id);
//           setCurrentVehicle(vehicleToEdit);
//           window.scrollTo({ top: 0, behavior: 'smooth' });
//       }
//   };

//   // Deletes a vehicle from the saved list
//   const handleDeleteVehicle = (id: string) => {
//       if (confirm("Are you sure you want to delete this booking?")) {
//         setSavedVehicles(prev => prev.filter(v => v.id !== id));
//         // If the deleted vehicle was being edited, reset the form
//         if (editingId === id) {
//             setEditingId(null);
//             setCurrentVehicle(createInitialVehicleState());
//         }
//         showTemporaryMessage("Booking deleted.");
//       }
//   };

//   // Clears the form to add a new vehicle
//   const handleAddNew = () => {
//       setEditingId(null);
//       setCurrentVehicle(createInitialVehicleState());
//   };

//   // Final submission action
//   const handleFinalSubmit = () => {
//     if (savedVehicles.length === 0) {
//         alert("No bookings to submit. Please add at least one vehicle booking.");
//         return;
//     }
//     console.log("===== FINAL SUBMITTED BOOKINGS =====");
//     console.log(JSON.stringify(savedVehicles, null, 2));
//     alert(`${savedVehicles.length} booking(s) have been submitted. See the console for details.`);
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen p-4 font-sans text-sm">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-xl font-semibold text-gray-800 mb-4">Vehicle Booking</h1>
        
//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
//           {/* Left Form Panel */}
//           <div className="lg:col-span-3 bg-white border border-gray-200 rounded-lg p-5 space-y-4 shadow-sm">
//             <div className="flex justify-between items-center">
//                 <h2 className="font-semibold text-base text-gray-800">{isEditing ? `Editing Booking for: ${currentVehicle.vehicleType}` : 'Add New Vehicle Booking'}</h2>
//                 {savedVehicles.length > 0 && (
//                     <button onClick={handleAddNew} className="text-xs font-medium text-[#10A4B0] hover:underline disabled:text-gray-400 disabled:no-underline" disabled={!isEditing}>
//                         + Add New Booking
//                     </button>
//                 )}
//             </div>
            
//             <hr className="border-gray-200"/>

//             {/* Drive Type */}
//             <div className="pt-2">
//               <div className="flex items-center gap-6">
//                 {['self-drive', 'with-driver'].map((type) => (
//                   <label key={type} className="flex items-center gap-2 cursor-pointer text-xs font-medium">
//                     <input
//                       type="radio"
//                       name="driveType"
//                       value={type}
//                       checked={currentVehicle.driveType === type}
//                       onChange={() => handleInputChange('driveType', type)}
//                       className="h-3.5 w-3.5 accent-[#10A4B0]"
//                     />
//                     {type === 'self-drive' ? 'Self Drive' : 'Vehicle with Driver'}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Vehicle Type and Count */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <SelectField
//                 label="Vehicle Type*"
//                 value={currentVehicle.vehicleType}
//                 options={['Carnival (Kia)', 'Toyota Alphard', 'Hyundai Staria', 'Mercedes V-Class', 'Mini Bus', 'Coach']}
//                 onChange={e => handleInputChange('vehicleType', e.target.value)}
//               />
//               <InputField
//                 label="No. of Vehicles"
//                 type="number"
//                 value={currentVehicle.numVehicles}
//                 min={1}
//                 onChange={e => handleInputChange('numVehicles', Math.max(1, parseInt(e.target.value) || 1))}
//               />
//             </div>

//             <InputField
//               label="Vehicle Number (Optional)"
//               placeholder="e.g. SGX1234Z"
//               value={currentVehicle.vehicleNumber}
//               onChange={e => handleInputChange('vehicleNumber', e.target.value)}
//             />

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <InputField
//                 label="Pick Up Date"
//                 type="date"
//                 value={currentVehicle.pickUpDate}
//                 onChange={e => handleInputChange('pickUpDate', e.target.value)}
//                 icon={<CalendarIcon />}
//               />
//               <InputField
//                 label="Pick Up Location*"
//                 placeholder="Enter Address..."
//                 value={currentVehicle.pickUpLocation}
//                 onChange={e => handleInputChange('pickUpLocation', e.target.value)}
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <InputField
//                 label="Drop Off Date"
//                 type="date"
//                 value={currentVehicle.dropOffDate}
//                 onChange={e => handleInputChange('dropOffDate', e.target.value)}
//                 icon={<CalendarIcon />}
//               />
//               <InputField
//                 label="Drop Off Location*"
//                 placeholder="Enter Address..."
//                 value={currentVehicle.dropOffLocation}
//                 onChange={e => handleInputChange('dropOffLocation', e.target.value)}
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <InputField
//                 label="Vehicle Brand (Optional)"
//                 placeholder="Type here"
//                 value={currentVehicle.vehicleBrand}
//                 onChange={e => handleInputChange('vehicleBrand', e.target.value)}
//               />
//               <InputField
//                 label="Pick Up Time (Optional)"
//                 type="time"
//                 value={currentVehicle.pickUpTime}
//                 onChange={e => handleInputChange('pickUpTime', e.target.value)}
//                 icon={<ClockIcon />}
//               />
//               <InputField
//                 label="Drop Off Time (Optional)"
//                 type="time"
//                 value={currentVehicle.dropOffTime}
//                 onChange={e => handleInputChange('dropOffTime', e.target.value)}
//                 icon={<ClockIcon />}
//               />
//             </div>

//             <div>
//               <label className="text-xs font-medium text-gray-700 block mb-1">Remark (Optional)</label>
//               <textarea
//                 value={currentVehicle.remark}
//                 onChange={e => handleInputChange('remark', e.target.value)}
//                 placeholder="Enter a short overview..."
//                 className="w-full h-20 p-2 text-xs bg-white rounded-md border border-gray-300 focus:ring-1 focus:ring-[#10A4B0] focus:border-[#10A4B0] transition"
//               />
//             </div>

//             <div className="flex justify-end items-center gap-4 pt-2">
//                 {isEditing && (
//                     <button
//                         onClick={handleAddNew}
//                         className="px-6 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md font-semibold text-xs hover:bg-gray-200 transition-colors"
//                     >
//                         Cancel
//                     </button>
//                 )}
//               <button
//                 onClick={handleSaveVehicle}
//                 className="px-8 py-2 bg-[#10A4B0] text-white rounded-md font-semibold text-xs hover:bg-[#0d8a95] transition-colors shadow-sm"
//               >
//                 {isEditing ? 'Update Booking' : '+ Add Booking'}
//               </button>
//             </div>
//           </div>

//           {/* Right Summary Panel */}
//           <div className="lg:col-span-2">
//             <div className="bg-white border border-gray-200 rounded-lg sticky top-4 shadow-sm">
//               <div className="p-4 border-b border-gray-200">
//                 <h2 className="text-base font-semibold text-gray-800">Saved Bookings ({savedVehicles.length})</h2>
//               </div>
//               <div className="p-3 space-y-3 max-h-[65vh] overflow-y-auto bg-gray-50/50">
//                 {savedVehicles.length > 0 ? (
//                     savedVehicles.map((vehicle) => (
//                         <SavedVehicleCard 
//                             key={vehicle.id} 
//                             vehicle={vehicle} 
//                             onEdit={() => handleEditVehicle(vehicle.id)}
//                             onDelete={() => handleDeleteVehicle(vehicle.id)}
//                             isBeingEdited={editingId === vehicle.id}
//                         />
//                     ))
//                 ) : (
//                     <div className="text-center py-10 text-gray-500 text-xs">
//                         <p className="font-medium text-base mb-2">No Bookings Yet</p>
//                         <p>Your saved bookings will appear here.</p>
//                     </div>
//                 )}
//               </div>
//               {savedVehicles.length > 0 && (
//                 <div className="p-3 border-t border-gray-200 bg-white">
//                     <button 
//                         onClick={handleFinalSubmit}
//                         className="w-full bg-green-600 text-white py-2 rounded-md font-semibold text-xs hover:bg-green-700 transition-colors shadow-sm"
//                     >
//                         Submit All Bookings
//                     </button>
//                 </div>
//               )}
//             </div>
//             {successMessage && (
//                 <div className="mt-4 p-3 bg-green-100 border border-green-300 text-green-800 text-xs rounded-lg animate-fade-in-out shadow-sm">
//                     {successMessage}
//                 </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==============================
// // ==== Saved Vehicle Card ======
// // ==============================
// interface SavedVehicleCardProps {
//     vehicle: VehicleDetails;
//     onEdit: () => void;
//     onDelete: () => void;
//     isBeingEdited: boolean;
// }

// const SavedVehicleCard: React.FC<SavedVehicleCardProps> = ({ vehicle, onEdit, onDelete, isBeingEdited }) => {
//     return (
//         <div className={`rounded-lg text-xs transition-all shadow-sm ${isBeingEdited ? 'border-2 border-[#10A4B0] bg-white' : 'border border-gray-200 bg-white'}`}>
//             <div className={`p-2.5 rounded-t-lg flex justify-between items-center border-b ${isBeingEdited ? 'bg-[#10A4B0]/5 border-b-[#10A4B0]/20' : 'bg-gray-50 border-b-gray-200'}`}>
//                 <h3 className="font-bold text-gray-800 text-sm">{vehicle.vehicleType}</h3>
//                 <div className="flex items-center gap-2">
//                     <button onClick={onEdit} className="p-1 text-gray-500 hover:text-[#10A4B0] rounded-full hover:bg-gray-200 transition-colors"><EditIcon /></button>
//                     <button onClick={onDelete} className="p-1 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-100 transition-colors"><TrashIcon /></button>
//                 </div>
//             </div>
//             <div className="p-3 space-y-3">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div className="space-y-1.5 text-gray-600">
//                         <p><span className="font-semibold text-gray-800 w-24 inline-block">Vehicle #:</span> {vehicle.vehicleNumber || 'N/A'}</p>
//                         <p><span className="font-semibold text-gray-800 w-24 inline-block"># of Vehicles:</span> {vehicle.numVehicles}</p>
//                         <p><span className="font-semibold text-gray-800 w-24 inline-block">Drive Type:</span> {vehicle.driveType === 'self-drive' ? 'Self Drive' : 'With Driver'}</p>
//                     </div>
//                     <div className="space-y-3">
//                         <div className="flex gap-2">
//                             <LocationPinIcon />
//                             <div>
//                                 <p className="font-bold text-gray-800">Pick up</p>
//                                 <p className="text-gray-600">{new Date(vehicle.pickUpDate).toLocaleDateString('en-GB')} at {vehicle.pickUpTime || 'N/A'}</p>
//                                 <p className="text-gray-600">{vehicle.pickUpLocation}</p>
//                             </div>
//                         </div>
//                         <div className="flex gap-2">
//                             <LocationPinIcon />
//                             <div>
//                                 <p className="font-bold text-gray-800">Drop Off</p>
//                                 <p className="text-gray-600">{new Date(vehicle.dropOffDate).toLocaleDateString('en-GB')} at {vehicle.dropOffTime || 'N/A'}</p>
//                                 <p className="text-gray-600">{vehicle.dropOffLocation}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 {vehicle.remark && (
//                     <div>
//                         <hr className="border-gray-200/80 my-2"/>
//                         <p className="font-bold text-gray-800 mb-1">Remark:</p>
//                         <p className="text-gray-600 pl-2 text-xs bg-gray-50 p-2 rounded-md border border-gray-200 whitespace-pre-wrap">{vehicle.remark}</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };


// // ==============================
// // ==== InputField Helper ======
// // ==============================

// interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label: string;
//   icon?: React.ReactNode;
// }

// const InputField: React.FC<InputFieldProps> = ({ label, icon, ...props }) => (
//   <div>
//     <label htmlFor={label} className="text-xs font-medium text-gray-700 block mb-1">{label}</label>
//     <div className="relative">
//       <input
//         id={label}
//         {...props}
//         className="w-full px-2.5 py-1.5 bg-white rounded-md text-xs border border-gray-300 focus:ring-1 focus:ring-[#10A4B0] focus:border-[#10A4B0] transition pr-8"
//       />
//       {icon && (
//         <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
//           {icon}
//         </div>
//       )}
//     </div>
//   </div>
// );

// // ==============================
// // ===== Select Field Helper ====
// // ==============================

// interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
//   label: string;
//   options: string[];
// }

// const SelectField: React.FC<SelectFieldProps> = ({ label, options, ...props }) => (
//   <div>
//     <label htmlFor={label} className="text-xs font-medium text-gray-700 block mb-1">{label}</label>
//     <select
//       id={label}
//       {...props}
//       className="w-full px-2.5 py-1.5 bg-white rounded-md text-xs border border-gray-300 focus:ring-1 focus:ring-[#10A4B0] focus:border-[#10A4B0] transition appearance-none bg-no-repeat bg-right pr-8"
//       style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em'}}
//     >
//       {options.map(opt => (
//         <option key={opt} value={opt}>{opt}</option>
//       ))}
//     </select>
//   </div>
// );

// export default VehicleBooking;



import React, { useState, useMemo } from 'react';

// ==============================
// ========== ICONS ============
// ==============================
// Using memo for static icons to prevent re-renders
const CalendarIcon = React.memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25M3 18.75h18" />
  </svg>
));

const ClockIcon = React.memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
));

const TrashIcon = React.memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
));

const EditIcon = React.memo(() => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
));

const LocationPinIcon = React.memo(() => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
));


// ==============================
// ======== TYPES ==============
// ==============================

type DriveType = 'self-drive' | 'with-driver';

interface VehicleDetails {
  id: string;
  driveType: DriveType;
  vehicleType: string;
  vehicleNumber?: string;
  numVehicles: number;
  pickUpDate: string;
  pickUpLocation: string;
  dropOffDate: string;
  dropOffLocation: string;
  vehicleBrand?: string;
  pickUpTime?: string;
  dropOffTime?: string;
  remark?: string;
}

// ==============================
// ======== HELPERS =============
// ==============================

// Generates a default state for a new vehicle form
const createInitialVehicleState = (): VehicleDetails => {
    const today = new Date().toISOString().split('T')[0];
    return {
        id: `v_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        driveType: 'with-driver',
        vehicleType: 'Carnival (Kia)',
        vehicleNumber: '',
        numVehicles: 1,
        pickUpDate: today,
        pickUpLocation: '',
        dropOffDate: today,
        dropOffLocation: '',
        pickUpTime: '',
        dropOffTime: '',
        vehicleBrand: '',
        remark: ''
    };
};

// ==============================
// ========== MAIN =============
// ==============================

const VehicleBooking: React.FC = () => {
  // State for the list of all saved vehicles
  const [savedVehicles, setSavedVehicles] = useState<VehicleDetails[]>([]);
  // State for the vehicle currently being edited or added in the form
  const [currentVehicle, setCurrentVehicle] = useState<VehicleDetails>(createInitialVehicleState());
  // State to track the ID of the vehicle being edited. Null means we are adding a new one.
  const [editingId, setEditingId] = useState<string | null>(null);
  // State for showing a success message
  const [successMessage, setSuccessMessage] = useState<string>('');

  // A derived state to determine if the form is in "edit mode"
  const isEditing = useMemo(() => editingId !== null, [editingId]);

  // Shows a message that fades out after 3 seconds
  const showTemporaryMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => {
        setSuccessMessage('');
    }, 3000);
  };

  // Handles changes in any form input and updates the current vehicle state
  const handleInputChange = (field: keyof VehicleDetails, value: string | number) => {
    setCurrentVehicle(prev => ({ ...prev, [field]: value }));
  };

  // Saves the current vehicle (either new or edited) to the list
  const handleSaveVehicle = () => {
    // Basic validation
    if (!currentVehicle.pickUpLocation || !currentVehicle.dropOffLocation || !currentVehicle.vehicleType) {
        alert("Please fill in all required fields: Vehicle Type, Pick Up Location, and Drop Off Location.");
        return;
    }

    if (isEditing) {
        // Find the vehicle by its ID and update it
        setSavedVehicles(prev => prev.map(v => v.id === editingId ? currentVehicle : v));
        showTemporaryMessage("Booking updated successfully!");
    } else {
        // Add the new vehicle to the list
        setSavedVehicles(prev => [...prev, currentVehicle]);
        showTemporaryMessage("Booking added successfully!");
    }
    // Reset the form for the next entry
    setEditingId(null);
    setCurrentVehicle(createInitialVehicleState());
  };
  
  // Sets up the form to edit a previously saved vehicle
  const handleEditVehicle = (id: string) => {
      const vehicleToEdit = savedVehicles.find(v => v.id === id);
      if (vehicleToEdit) {
          setEditingId(id);
          setCurrentVehicle(vehicleToEdit);
          window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  };

  // Deletes a vehicle from the saved list
  const handleDeleteVehicle = (id: string) => {
      if (confirm("Are you sure you want to delete this booking?")) {
        setSavedVehicles(prev => prev.filter(v => v.id !== id));
        // If the deleted vehicle was being edited, reset the form
        if (editingId === id) {
            setEditingId(null);
            setCurrentVehicle(createInitialVehicleState());
        }
        showTemporaryMessage("Booking deleted.");
      }
  };

  // Clears the form to add a new vehicle
  const handleAddNew = () => {
      setEditingId(null);
      setCurrentVehicle(createInitialVehicleState());
  };

  // Final submission action
  const handleFinalSubmit = () => {
    if (savedVehicles.length === 0) {
        alert("No bookings to submit. Please add at least one vehicle booking.");
        return;
    }
    console.log("===== FINAL SUBMITTED BOOKINGS =====");
    console.log(JSON.stringify(savedVehicles, null, 2));
    alert(`${savedVehicles.length} booking(s) have been submitted. See the console for details.`);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 font-sans sm:p-6 lg:p-2 ">
      
      <div className="w-full">
        <h1 className="text-xl font-semibold text-teal-500 mb-4">Vehicle Booking</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Form Panel */}
          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-lg p-5 space-y-4 shadow-sm">
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-base text-gray-800">{isEditing ? `Editing Booking for: ${currentVehicle.vehicleType}` : 'Add New Vehicle Booking'}</h2>
                {savedVehicles.length > 0 && (
                    <button onClick={handleAddNew} className="text-xs font-medium text-[#10A4B0] hover:underline disabled:text-gray-400 disabled:no-underline" disabled={!isEditing}>
                        + Add New Booking
                    </button>
                )}
            </div>
            
            <hr className="border-gray-200"/>

            {/* Drive Type */}
            <div className="pt-2">
              <div className="flex items-center gap-6">
                {['self-drive', 'with-driver'].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer text-xs font-medium">
                    <input
                      type="radio"
                      name="driveType"
                      value={type}
                      checked={currentVehicle.driveType === type}
                      onChange={() => handleInputChange('driveType', type)}
                      className="h-3.5 w-3.5 accent-[#10A4B0]"
                    />
                    {type === 'self-drive' ? 'Self Drive' : 'Vehicle with Driver'}
                  </label>
                ))}
              </div>
            </div>

            {/* Vehicle Type and Count */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="Vehicle Type*"
                value={currentVehicle.vehicleType}
                options={['Carnival (Kia)', 'Toyota Alphard', 'Hyundai Staria', 'Mercedes V-Class', 'Mini Bus', 'Coach']}
                onChange={e => handleInputChange('vehicleType', e.target.value)}
              />
              <InputField
                label="No. of Vehicles"
                type="number"
                value={currentVehicle.numVehicles}
                min={1}
                onChange={e => handleInputChange('numVehicles', Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>

            <InputField
              label="Vehicle Number (Optional)"
              placeholder="e.g. SGX1234Z"
              value={currentVehicle.vehicleNumber}
              onChange={e => handleInputChange('vehicleNumber', e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Pick Up Date"
                type="date"
                value={currentVehicle.pickUpDate}
                onChange={e => handleInputChange('pickUpDate', e.target.value)}
                icon={<CalendarIcon />}
              />
              <InputField
                label="Pick Up Location*"
                placeholder="Enter Address..."
                value={currentVehicle.pickUpLocation}
                onChange={e => handleInputChange('pickUpLocation', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Drop Off Date"
                type="date"
                value={currentVehicle.dropOffDate}
                onChange={e => handleInputChange('dropOffDate', e.target.value)}
                icon={<CalendarIcon />}
              />
              <InputField
                label="Drop Off Location*"
                placeholder="Enter Address..."
                value={currentVehicle.dropOffLocation}
                onChange={e => handleInputChange('dropOffLocation', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="Vehicle Brand (Optional)"
                placeholder="Type here"
                value={currentVehicle.vehicleBrand}
                onChange={e => handleInputChange('vehicleBrand', e.target.value)}
              />
              <InputField
                label="Pick Up Time (Optional)"
                type="time"
                value={currentVehicle.pickUpTime}
                onChange={e => handleInputChange('pickUpTime', e.target.value)}
                icon={<ClockIcon />}
              />
              <InputField
                label="Drop Off Time (Optional)"
                type="time"
                value={currentVehicle.dropOffTime}
                onChange={e => handleInputChange('dropOffTime', e.target.value)}
                icon={<ClockIcon />}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">Remark (Optional)</label>
              <textarea
                value={currentVehicle.remark}
                onChange={e => handleInputChange('remark', e.target.value)}
                placeholder="Enter a short overview..."
                className="w-full h-20 p-2 text-xs bg-white rounded-md border border-gray-300 focus:ring-1 focus:ring-[#10A4B0] focus:border-[#10A4B0] transition"
              />
            </div>

            <div className="flex justify-end items-center gap-4 pt-2">
                {isEditing && (
                    <button
                        onClick={handleAddNew}
                        className="px-6 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md font-semibold text-xs hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                )}
              <button
                onClick={handleSaveVehicle}
                className="px-8 py-2 bg-[#10A4B0] text-white rounded-md font-semibold text-xs hover:bg-[#0d8a95] transition-colors shadow-sm"
              >
                {isEditing ? 'Update Booking' : '+ Add Booking'}
              </button>
            </div>
          </div>

          {/* Right Summary Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg sticky top-4 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-teal-500 rounded-t-lg">
                <h2 className="text-base font-semibold text-white">Saved Bookings ({savedVehicles.length})</h2>
              </div>
              <div className="p-3 space-y-3 max-h-[65vh] overflow-y-auto bg-gray-50/50">
                {savedVehicles.length > 0 ? (
                    savedVehicles.map((vehicle) => (
                        <SavedVehicleCard 
                            key={vehicle.id} 
                            vehicle={vehicle} 
                            onEdit={() => handleEditVehicle(vehicle.id)}
                            onDelete={() => handleDeleteVehicle(vehicle.id)}
                            isBeingEdited={editingId === vehicle.id}
                        />
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500 text-xs">
                        <p className="font-medium text-base mb-2">No Bookings Yet</p>
                        <p>Your saved bookings will appear here.</p>
                    </div>
                )}
              </div>
              {savedVehicles.length > 0 && (
                <div className="p-3 border-t border-gray-200 bg-white">
                    <button 
                        onClick={handleFinalSubmit}
                        className="w-full bg-green-600 text-white py-2 rounded-md font-semibold text-xs hover:bg-green-700 transition-colors shadow-sm"
                    >
                        Submit All Bookings
                    </button>
                </div>
              )}
            </div>
            {successMessage && (
                <div className="mt-4 p-3 bg-green-100 border border-green-300 text-green-800 text-xs rounded-lg animate-fade-in-out shadow-sm">
                    {successMessage}
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==============================
// ==== Saved Vehicle Card ======
// ==============================
interface SavedVehicleCardProps {
    vehicle: VehicleDetails;
    onEdit: () => void;
    onDelete: () => void;
    isBeingEdited: boolean;
}

const SavedVehicleCard: React.FC<SavedVehicleCardProps> = ({ vehicle, onEdit, onDelete, isBeingEdited }) => {
    return (
        <div className={`rounded-lg text-xs transition-all shadow-sm ${isBeingEdited ? 'border-2 border-[#10A4B0] bg-white' : 'border border-gray-200 bg-white'}`}>
            <div className={`p-2.5 rounded-t-lg flex justify-between items-center border-b ${isBeingEdited ? 'bg-[#10A4B0]/5 border-b-[#10A4B0]/20' : 'bg-gray-50 border-b-gray-200'}`}>
                <h3 className="font-bold text-gray-800 text-sm">{vehicle.vehicleType}</h3>
                <div className="flex items-center gap-2">
                    <button onClick={onEdit} className="p-1 text-gray-500 hover:text-[#10A4B0] rounded-full hover:bg-gray-200 transition-colors"><EditIcon /></button>
                    <button onClick={onDelete} className="p-1 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-100 transition-colors"><TrashIcon /></button>
                </div>
            </div>
            <div className="p-3 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-gray-600">
                        <p><span className="font-semibold text-gray-800 w-24 inline-block">Vehicle #:</span> {vehicle.vehicleNumber || 'N/A'}</p>
                        <p><span className="font-semibold text-gray-800 w-24 inline-block"># of Vehicles:</span> {vehicle.numVehicles}</p>
                        <p><span className="font-semibold text-gray-800 w-24 inline-block">Drive Type:</span> {vehicle.driveType === 'self-drive' ? 'Self Drive' : 'With Driver'}</p>
                    </div>
                    <div className="space-y-3">
                        <div className="flex gap-2">
                            <LocationPinIcon />
                            <div>
                                <p className="font-bold text-gray-800">Pick up</p>
                                <p className="text-gray-600">{new Date(vehicle.pickUpDate).toLocaleDateString('en-GB')} at {vehicle.pickUpTime || 'N/A'}</p>
                                <p className="text-gray-600">{vehicle.pickUpLocation}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <LocationPinIcon />
                            <div>
                                <p className="font-bold text-gray-800">Drop Off</p>
                                <p className="text-gray-600">{new Date(vehicle.dropOffDate).toLocaleDateString('en-GB')} at {vehicle.dropOffTime || 'N/A'}</p>
                                <p className="text-gray-600">{vehicle.dropOffLocation}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {vehicle.remark && (
                    <div>
                        <hr className="border-gray-200/80 my-2"/>
                        <p className="font-bold text-gray-800 mb-1">Remark:</p>
                        <p className="text-gray-600 pl-2 text-xs bg-gray-50 p-2 rounded-md border border-gray-200 whitespace-pre-wrap">{vehicle.remark}</p>
                    </div>
                )}
            </div>
        </div>
    );
};


// ==============================
// ==== InputField Helper ======
// ==============================

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({ label, icon, ...props }) => (
  <div>
    <label htmlFor={label} className="text-xs font-medium text-gray-700 block mb-1">{label}</label>
    <div className="relative">
      <input
        id={label}
        {...props}
        className="w-full px-2.5 py-1.5 bg-white rounded-md text-xs border border-gray-300 focus:ring-1 focus:ring-[#10A4B0] focus:border-[#10A4B0] transition pr-8"
      />
      {icon && (
        <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
    </div>
  </div>
);

// ==============================
// ===== Select Field Helper ====
// ==============================

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

const SelectField: React.FC<SelectFieldProps> = ({ label, options, ...props }) => (
  <div>
    <label htmlFor={label} className="text-xs font-medium text-gray-700 block mb-1">{label}</label>
    <select
      id={label}
      {...props}
      className="w-full px-2.5 py-1.5 bg-white rounded-md text-xs border border-gray-300 focus:ring-1 focus:ring-[#10A4B0] focus:border-[#10A4B0] transition appearance-none bg-no-repeat bg-right pr-8"
      style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em'}}
    >
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default VehicleBooking;
