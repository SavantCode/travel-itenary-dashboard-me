// v2.2 - Logic Updated with robust saving
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { 
    Bold, Italic, Underline, Link, Image, List, ListOrdered, Trash2, 
    MoreHorizontal, PlusCircle, AlignLeft, AlignCenter, AlignRight, AlignJustify, CheckCircle 
} from 'lucide-react';

// --- TYPE DEFINITIONS ---
interface InfoSection {
  id: string;
  title: string;
  content: string;
}

// --- INITIAL DATA (Used as a fallback) ---
const initialSections: InfoSection[] = [
  {
    id: crypto.randomUUID(),
    title: 'Inclusions',
    content: '<ul><li>Return Flights (DEL – DMK – DEL)</li><li>Baggage: 20kg Check-In + 7kg Hand Baggage</li><li>Airport pickup and drop</li><li>3-star hotel accommodation</li></ul>',
  },
  {
    id: crypto.randomUUID(),
    title: 'Exclusions',
    content: '<ul><li>Travel insurance</li><li>Meals not specified in the inclusions</li><li>Expenses of personal nature</li></ul>',
  },
  {
    id: crypto.randomUUID(),
    title: 'Cancellation Policy',
    content: '<p style="text-align: center;">Cancellations made more than 30 days before departure: <b>80% refund</b>.</p><p>Cancellations less than 15 days before travel: <b>No refund</b>.</p>',
  },
];


// --- RICH TEXT EDITOR COMPONENT (No changes) ---
interface RichTextEditorProps {
  content: string;
  onUpdate: (html: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onUpdate, placeholder = "Enter details..." }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onUpdate(editorRef.current.innerHTML);
    }
  }, [onUpdate]);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
      handleInput();
    }
  };
  
  const setLink = useCallback(() => {
    const url = window.prompt('Enter URL:');
    if (url) execCommand('createLink', url);
  }, []);

  const addImage = useCallback(() => {
    const url = window.prompt('Enter image URL:');
    if (url) execCommand('insertImage', url);
  }, []);

  return (
    <div>
      <div className="flex items-center flex-wrap gap-1 border-t border-gray-200 p-2 bg-gray-50">
        <button type="button" onClick={() => execCommand('bold')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Bold"><Bold className="w-4 h-4" /></button>
        <button type="button" onClick={() => execCommand('italic')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Italic"><Italic className="w-4 h-4" /></button>
        <button type="button" onClick={() => execCommand('underline')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Underline"><Underline className="w-4 h-4" /></button>
        <div className="w-px h-5 bg-gray-300 mx-1"></div>
        <button type="button" onClick={() => execCommand('insertUnorderedList')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Bullet List"><List className="w-4 h-4" /></button>
        <button type="button" onClick={() => execCommand('insertOrderedList')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Numbered List"><ListOrdered className="w-4 h-4" /></button>
        <div className="w-px h-5 bg-gray-300 mx-1"></div>
        <button type="button" onClick={() => execCommand('justifyLeft')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Align Left"><AlignLeft className="w-4 h-4" /></button>
        <button type="button" onClick={() => execCommand('justifyCenter')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Align Center"><AlignCenter className="w-4 h-4" /></button>
        <button type="button" onClick={() => execCommand('justifyRight')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Align Right"><AlignRight className="w-4 h-4" /></button>
        <button type="button" onClick={() => execCommand('justifyFull')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Justify"><AlignJustify className="w-4 h-4" /></button>
        <div className="w-px h-5 bg-gray-300 mx-1"></div>
        <button type="button" onClick={setLink} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Add Link"><Link className="w-4 h-4" /></button>
        <button type="button" onClick={addImage} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Add Image"><Image className="w-4 h-4" /></button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="prose w-full max-w-none p-4 text-sm min-h-[120px] focus:outline-none"
        onInput={handleInput}
        suppressContentEditableWarning={true}
        data-placeholder={placeholder}
      />
    </div>
  );
};


// --- MAIN TRIP INFORMATION COMPONENT ---
export default function App() {
  const [sections, setSections] = useState<InfoSection[]>(initialSections);
  const [savedSections, setSavedSections] = useState<InfoSection[] | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success'>('idle');

  useEffect(() => {
    try {
      const savedItineraryString = sessionStorage.getItem('editedItinerary');
      if (savedItineraryString) {
        const savedItinerary = JSON.parse(savedItineraryString);
        const dayData = savedItinerary[0];

        if (dayData && Array.isArray(dayData['Trip Information']) && dayData['Trip Information'].length > 0) {
          setSections(dayData['Trip Information']);
        }
      }
    } catch (error) {
      console.error("Failed to load or parse 'editedItinerary' from sessionStorage:", error);
    }
  }, []);

  useEffect(() => {
      setSavedSections(sections);
  }, [sections]);

  const updateSectionContent = (id: string, content: string) => {
    setSections(prev => prev.map(sec => sec.id === id ? { ...sec, content } : sec));
  };
  const addSection = () => {
    const title = window.prompt("Enter a title for the new section:", "Terms and Conditions");
    if (title) {
      const newSection: InfoSection = { id: crypto.randomUUID(), title, content: '' };
      setSections(prev => [...prev, newSection]);
    }
  };
  const removeSection = (id: string) => {
    if (sections.length > 1) {
      if (window.confirm("Are you sure you want to delete this section?")) {
        setSections(prev => prev.filter(sec => sec.id !== id));
      }
    } else {
        alert("You cannot delete the last section.");
    }
  };
  
  // *** MODIFIED *** handleSubmit function with robust "Check, Create, and Update" logic
  const handleSubmit = () => {
      try {
          const savedItineraryString = sessionStorage.getItem('editedItinerary');
          let fullItinerary: any[] = [];

          if (savedItineraryString) {
              try {
                  fullItinerary = JSON.parse(savedItineraryString);
                  if (!Array.isArray(fullItinerary)) fullItinerary = [{}];
              } catch (e) {
                  console.error("Error parsing existing itinerary, starting fresh.", e);
                  fullItinerary = [{}];
              }
          } else {
              fullItinerary = [{}];
          }

          if (fullItinerary.length === 0) {
              fullItinerary.push({});
          }
          
          const updatedDayData = {
              ...fullItinerary[0],
              "Trip Information": sections
          };

          const updatedItinerary = [updatedDayData, ...fullItinerary.slice(1)];
          sessionStorage.setItem('editedItinerary', JSON.stringify(updatedItinerary));

          setSaveStatus('success');
          console.log("Successfully merged and saved to 'editedItinerary'.", updatedItinerary);
          setTimeout(() => setSaveStatus('idle'), 3000);
      } catch (error) {
          console.error("Failed to save data to sessionStorage:", error);
          alert("An error occurred while saving the data.");
      }
  };

  // The JSX and styling are UNCHANGED
  return (
    <div className="bg-[#F6F6FA] min-h-screen p-4 sm:p-6 lg:p-2 font-sans">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-[#10A4B0] font-sans font-semibold text-xl">
              Trip Information<span className="text-red-500">*</span>
            </h1>
            {sections.map(section => (
              <div key={section.id} className="border border-gray-300 rounded-md bg-white shadow-sm">
                <div className="flex justify-between items-center border-b border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700">
                  {section.title}
                  <button type="button" onClick={() => removeSection(section.id)} title="Delete Section">
                    <Trash2 className="w-4 h-4 text-gray-500 cursor-pointer hover:text-red-500" />
                  </button>
                </div>
                <RichTextEditor
                  content={section.content}
                  onUpdate={(html) => updateSectionContent(section.id, html)}
                  placeholder={`Enter details for ${section.title}...`}
                />
              </div>
            ))}
            <div className="flex flex-col items-center justify-center gap-4">
                 <button 
                    type="button"
                    onClick={addSection}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-teal-600 border border-teal-500 text-sm rounded-lg hover:bg-teal-50 transition-colors"
                >
                    <PlusCircle className="w-4 h-4" />
                    Add New Section
                </button>
                 <button 
                    type="button"
                    onClick={handleSubmit}
                    className="w-full max-w-xs text-white bg-teal-600 hover:bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors"
                >
                    Submit & Save
                </button>
                {saveStatus === 'success' && (
                    <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span>Data saved successfully to session!</span>
                    </div>
                )}
            </div>
          </div>
          <div className="lg:col-span-1 sticky top-6 self-start">
            <div className="bg-white p-4 rounded-lg border border-[#E0E0E0]">
              <h2 className="text-xl font-semibold text-[#717182] font-sans mb-4">Save Details</h2>
              <div className="border border-[#E0E0E0] rounded-lg">
                <div className="bg-[#10A4B0] text-white flex justify-between items-center px-3 py-3 rounded-t-lg">
                  <h3 className="font-sans font-medium text-lg">Sightseeing</h3>
                  <MoreHorizontal className="w-6 h-6"/>
                </div>
                <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto">
                  {savedSections && savedSections.length > 0 ? (
                    savedSections.map(section => (
                      <div key={section.id}>
                        <h4 className="font-semibold mb-1 font-sans text-sm text-gray-800">{section.title}</h4>
                        <div 
                            className="prose prose-sm max-w-none text-xs text-gray-600"
                            dangerouslySetInnerHTML={{ __html: section.content || "<p>No details entered.</p>" }} 
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">Your details will appear here as you type.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// // v2.1 - Logic Updated for saving to 'editedItinerary'
// import React, { useState, useCallback, useEffect, useRef } from 'react';
// import { 
//     Bold, Italic, Underline, Link, Image, List, ListOrdered, Trash2, 
//     MoreHorizontal, PlusCircle, AlignLeft, AlignCenter, AlignRight, AlignJustify, CheckCircle 
// } from 'lucide-react';

// // --- TYPE DEFINITIONS ---
// interface InfoSection {
//   id: string;
//   title: string;
//   content: string;
// }

// // --- INITIAL DATA (Used as a fallback) ---
// const initialSections: InfoSection[] = [
//   {
//     id: crypto.randomUUID(),
//     title: 'Inclusions',
//     content: '<ul><li>Return Flights (DEL – DMK – DEL)</li><li>Baggage: 20kg Check-In + 7kg Hand Baggage</li><li>Airport pickup and drop</li><li>3-star hotel accommodation</li></ul>',
//   },
//   {
//     id: crypto.randomUUID(),
//     title: 'Exclusions',
//     content: '<ul><li>Travel insurance</li><li>Meals not specified in the inclusions</li><li>Expenses of personal nature</li></ul>',
//   },
//   {
//     id: crypto.randomUUID(),
//     title: 'Cancellation Policy',
//     content: '<p style="text-align: center;">Cancellations made more than 30 days before departure: <b>80% refund</b>.</p><p>Cancellations less than 15 days before travel: <b>No refund</b>.</p>',
//   },
// ];


// // --- RICH TEXT EDITOR COMPONENT (No changes) ---
// interface RichTextEditorProps {
//   content: string;
//   onUpdate: (html: string) => void;
//   placeholder?: string;
// }

// const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onUpdate, placeholder = "Enter details..." }) => {
//   const editorRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (editorRef.current && editorRef.current.innerHTML !== content) {
//       editorRef.current.innerHTML = content;
//     }
//   }, [content]);

//   const handleInput = useCallback(() => {
//     if (editorRef.current) {
//       onUpdate(editorRef.current.innerHTML);
//     }
//   }, [onUpdate]);

//   const execCommand = (command: string, value?: string) => {
//     document.execCommand(command, false, value);
//     if (editorRef.current) {
//       editorRef.current.focus();
//       handleInput();
//     }
//   };
  
//   const setLink = useCallback(() => {
//     const url = window.prompt('Enter URL:');
//     if (url) execCommand('createLink', url);
//   }, []);

//   const addImage = useCallback(() => {
//     const url = window.prompt('Enter image URL:');
//     if (url) execCommand('insertImage', url);
//   }, []);

//   return (
//     <div>
//       <div className="flex items-center flex-wrap gap-1 border-t border-gray-200 p-2 bg-gray-50">
//         <button type="button" onClick={() => execCommand('bold')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Bold"><Bold className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('italic')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Italic"><Italic className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('underline')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Underline"><Underline className="w-4 h-4" /></button>
//         <div className="w-px h-5 bg-gray-300 mx-1"></div>
//         <button type="button" onClick={() => execCommand('insertUnorderedList')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Bullet List"><List className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('insertOrderedList')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Numbered List"><ListOrdered className="w-4 h-4" /></button>
//         <div className="w-px h-5 bg-gray-300 mx-1"></div>
//         <button type="button" onClick={() => execCommand('justifyLeft')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Align Left"><AlignLeft className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('justifyCenter')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Align Center"><AlignCenter className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('justifyRight')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Align Right"><AlignRight className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('justifyFull')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Justify"><AlignJustify className="w-4 h-4" /></button>
//         <div className="w-px h-5 bg-gray-300 mx-1"></div>
//         <button type="button" onClick={setLink} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Add Link"><Link className="w-4 h-4" /></button>
//         <button type="button" onClick={addImage} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Add Image"><Image className="w-4 h-4" /></button>
//       </div>
//       <div
//         ref={editorRef}
//         contentEditable
//         className="prose w-full max-w-none p-4 text-sm min-h-[120px] focus:outline-none"
//         onInput={handleInput}
//         suppressContentEditableWarning={true}
//         data-placeholder={placeholder}
//       />
//     </div>
//   );
// };


// // --- MAIN TRIP INFORMATION COMPONENT ---
// export default function App() {
//   const [sections, setSections] = useState<InfoSection[]>(initialSections);
//   const [savedSections, setSavedSections] = useState<InfoSection[] | null>(null);
//   const [saveStatus, setSaveStatus] = useState<'idle' | 'success'>('idle');

//   // *** MODIFIED *** Load data from 'editedItinerary' in sessionStorage
//   useEffect(() => {
//     try {
//       const savedItineraryString = sessionStorage.getItem('editedItinerary');
//       if (savedItineraryString) {
//         const savedItinerary = JSON.parse(savedItineraryString);
//         const dayData = savedItinerary[0]; // Assuming data is in the first element of the array

//         // Check if "Trip Information" exists and is a valid array
//         if (dayData && Array.isArray(dayData['Trip Information'])) {
//           setSections(dayData['Trip Information']);
//         }
//       }
//     } catch (error) {
//       console.error("Failed to load or parse 'editedItinerary' from sessionStorage:", error);
//     }
//   }, []); // Empty dependency array ensures this runs only once on mount

//   // Update saved details in real-time for live preview (no changes)
//   useEffect(() => {
//       setSavedSections(sections);
//   }, [sections]);

//   // Handler functions for sections (no changes)
//   const updateSectionContent = (id: string, content: string) => {
//     setSections(prev => prev.map(sec => sec.id === id ? { ...sec, content } : sec));
//   };
//   const addSection = () => {
//     const title = window.prompt("Enter a title for the new section:", "Terms and Conditions");
//     if (title) {
//       const newSection: InfoSection = { id: crypto.randomUUID(), title, content: '' };
//       setSections(prev => [...prev, newSection]);
//     }
//   };
//   const removeSection = (id: string) => {
//     if (sections.length > 1) {
//       if (window.confirm("Are you sure you want to delete this section?")) {
//         setSections(prev => prev.filter(sec => sec.id !== id));
//       }
//     } else {
//         alert("You cannot delete the last section.");
//     }
//   };
  
//   // *** MODIFIED *** handleSubmit function to merge and save data
//   const handleSubmit = () => {
//       try {
//           // 1. Get the current full itinerary from session storage
//           const savedItineraryString = sessionStorage.getItem('editedItinerary');
//           if (!savedItineraryString) {
//               alert("Error: Itinerary data not found in session storage. Cannot save.");
//               return;
//           }
//           const fullItinerary = JSON.parse(savedItineraryString);

//           // 2. Ensure it's in the expected format
//           if (!Array.isArray(fullItinerary) || fullItinerary.length === 0) {
//               alert("Error: Invalid itinerary format in session storage.");
//               return;
//           }

//           // 3. Create an updated version of the first day's data by merging the new sections
//           const updatedDayData = {
//             ...fullItinerary[0], // Copy all existing data (title, sightseeing, etc.)
//             "Trip Information": sections // Add/overwrite the "Trip Information" field
//           };

//           // 4. Create the new full itinerary array with the updated day
//           const updatedItinerary = [updatedDayData, ...fullItinerary.slice(1)];
          
//           // 5. Save the complete, updated itinerary back to session storage
//           sessionStorage.setItem('editedItinerary', JSON.stringify(updatedItinerary));

//           setSaveStatus('success');
//           console.log("Successfully merged and saved to 'editedItinerary'.");
//           setTimeout(() => setSaveStatus('idle'), 3000);
//       } catch (error) {
//           console.error("Failed to save data to sessionStorage:", error);
//           alert("Could not save the data. Please check browser permissions.");
//       }
//   };

//   // The JSX and styling are UNCHANGED
//   return (
//     <div className="bg-[#F6F6FA] min-h-screen p-4 sm:p-6 lg:p-2 font-sans">
//       <div className="w-full">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
//           <div className="lg:col-span-2 space-y-6">
//             <h1 className="text-[#10A4B0] font-sans font-semibold text-xl">
//               Trip Information<span className="text-red-500">*</span>
//             </h1>
//             {sections.map(section => (
//               <div key={section.id} className="border border-gray-300 rounded-md bg-white shadow-sm">
//                 <div className="flex justify-between items-center border-b border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700">
//                   {section.title}
//                   <button onClick={() => removeSection(section.id)} title="Delete Section">
//                     <Trash2 className="w-4 h-4 text-gray-500 cursor-pointer hover:text-red-500" />
//                   </button>
//                 </div>
//                 <RichTextEditor
//                   content={section.content}
//                   onUpdate={(html) => updateSectionContent(section.id, html)}
//                   placeholder={`Enter details for ${section.title}...`}
//                 />
//               </div>
//             ))}
//             <div className="flex flex-col items-center justify-center gap-4">
//                  <button 
//                     onClick={addSection}
//                     className="flex items-center gap-2 px-4 py-2 bg-white text-teal-600 border border-teal-500 text-sm rounded-lg hover:bg-teal-50 transition-colors"
//                 >
//                     <PlusCircle className="w-4 h-4" />
//                     Add New Section
//                 </button>
//                  <button 
//                     onClick={handleSubmit}
//                     className="w-full max-w-xs text-white bg-teal-600 hover:bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors"
//                 >
//                     Submit & Save
//                 </button>
//                 {saveStatus === 'success' && (
//                     <div className="flex items-center gap-2 text-green-600">
//                         <CheckCircle className="w-5 h-5" />
//                         <span>Data saved successfully to session!</span>
//                     </div>
//                 )}
//             </div>
//           </div>
//           <div className="lg:col-span-1 sticky top-6 self-start">
//             <div className="bg-white p-4 rounded-lg border border-[#E0E0E0]">
//               <h2 className="text-xl font-semibold text-[#717182] font-sans mb-4">Save Details</h2>
//               <div className="border border-[#E0E0E0] rounded-lg">
//                 <div className="bg-[#10A4B0] text-white flex justify-between items-center px-3 py-3 rounded-t-lg">
//                   <h3 className="font-sans font-medium text-lg">Sightseeing</h3>
//                   <MoreHorizontal className="w-6 h-6"/>
//                 </div>
//                 <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto">
//                   {savedSections && savedSections.length > 0 ? (
//                     savedSections.map(section => (
//                       <div key={section.id}>
//                         <h4 className="font-semibold mb-1 font-sans text-sm text-gray-800">{section.title}</h4>
//                         <div 
//                             className="prose prose-sm max-w-none text-xs text-gray-600"
//                             dangerouslySetInnerHTML={{ __html: section.content || "<p>No details entered.</p>" }} 
//                         />
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-gray-500 text-center py-4">Your details will appear here as you type.</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// //v2
// import React, { useState, useCallback, useEffect, useRef } from 'react';
// import { 
//     Bold, Italic, Underline, Link, Image, List, ListOrdered, Trash2, 
//     MoreHorizontal, PlusCircle, AlignLeft, AlignCenter, AlignRight, AlignJustify, CheckCircle 
// } from 'lucide-react';

// // --- TYPE DEFINITIONS ---
// interface InfoSection {
//   id: string;
//   title: string;
//   content: string;
// }

// // --- INITIAL DATA ---
// const initialSections: InfoSection[] = [
//   {
//     id: crypto.randomUUID(),
//     title: 'Inclusions',
//     content: '<ul><li>Return Flights (DEL – DMK – DEL)</li><li>Baggage: 20kg Check-In + 7kg Hand Baggage</li><li>Airport pickup and drop</li><li>3-star hotel accommodation</li></ul>',
//   },
//   {
//     id: crypto.randomUUID(),
//     title: 'Exclusions',
//     content: '<ul><li>Travel insurance</li><li>Meals not specified in the inclusions</li><li>Expenses of personal nature</li></ul>',
//   },
//   {
//     id: crypto.randomUUID(),
//     title: 'Cancellation Policy',
//     content: '<p style="text-align: center;">Cancellations made more than 30 days before departure: <b>80% refund</b>.</p><p>Cancellations less than 15 days before travel: <b>No refund</b>.</p>',
//   },
// ];


// // --- RICH TEXT EDITOR COMPONENT (Improved) ---
// interface RichTextEditorProps {
//   content: string;
//   onUpdate: (html: string) => void;
//   placeholder?: string;
// }

// const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onUpdate, placeholder = "Enter details..." }) => {
//   const editorRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (editorRef.current && editorRef.current.innerHTML !== content) {
//       editorRef.current.innerHTML = content;
//     }
//   }, [content]);

//   const handleInput = useCallback(() => {
//     if (editorRef.current) {
//       onUpdate(editorRef.current.innerHTML);
//     }
//   }, [onUpdate]);

//   const execCommand = (command: string, value?: string) => {
//     document.execCommand(command, false, value);
//     if (editorRef.current) {
//       editorRef.current.focus();
//       handleInput();
//     }
//   };
  
//   const setLink = useCallback(() => {
//     const url = window.prompt('Enter URL:');
//     if (url) execCommand('createLink', url);
//   }, []);

//   const addImage = useCallback(() => {
//     const url = window.prompt('Enter image URL:');
//     if (url) execCommand('insertImage', url);
//   }, []);

//   return (
//     <div>
//       <div className="flex items-center flex-wrap gap-1 border-t border-gray-200 p-2 bg-gray-50">
//         <button type="button" onClick={() => execCommand('bold')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Bold"><Bold className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('italic')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Italic"><Italic className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('underline')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Underline"><Underline className="w-4 h-4" /></button>
//         <div className="w-px h-5 bg-gray-300 mx-1"></div>
//         <button type="button" onClick={() => execCommand('insertUnorderedList')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Bullet List"><List className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('insertOrderedList')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Numbered List"><ListOrdered className="w-4 h-4" /></button>
//         <div className="w-px h-5 bg-gray-300 mx-1"></div>
//         <button type="button" onClick={() => execCommand('justifyLeft')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Align Left"><AlignLeft className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('justifyCenter')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Align Center"><AlignCenter className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('justifyRight')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Align Right"><AlignRight className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('justifyFull')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Justify"><AlignJustify className="w-4 h-4" /></button>
//         <div className="w-px h-5 bg-gray-300 mx-1"></div>
//         <button type="button" onClick={setLink} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Add Link"><Link className="w-4 h-4" /></button>
//         <button type="button" onClick={addImage} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Add Image"><Image className="w-4 h-4" /></button>
//       </div>
//       <div
//         ref={editorRef}
//         contentEditable
//         className="prose w-full max-w-none p-4 text-sm min-h-[120px] focus:outline-none"
//         onInput={handleInput}
//         suppressContentEditableWarning={true}
//         data-placeholder={placeholder}
//       />
//       <style jsx>{`
//         [contenteditable]:empty::before {
//           content: attr(data-placeholder);
//           color: #9CA3AF;
//           pointer-events: none;
//         }
//         .prose ul, .prose ol {
//           padding-left: 20px;
//           margin-left: 0;
//         }
//         .prose ul {
//           list-style-type: disc;
//         }
//         .prose ol {
//           list-style-type: decimal;
//         }
//       `}</style>
//     </div>
//   );
// };


// // --- MAIN TRIP INFORMATION COMPONENT ---
// export default function App() {
//   const [sections, setSections] = useState<InfoSection[]>(initialSections);
//   const [savedSections, setSavedSections] = useState<InfoSection[] | null>(null);
//   const [saveStatus, setSaveStatus] = useState<'idle' | 'success'>('idle');

//   // Load data from sessionStorage on initial component mount
//   useEffect(() => {
//     try {
//       const savedData = sessionStorage.getItem('tripInformationData');
//       if (savedData) {
//         const parsedData = JSON.parse(savedData);
//         if (Array.isArray(parsedData) && parsedData.length > 0) {
//           setSections(parsedData);
//         }
//       }
//     } catch (error) {
//       console.error("Failed to load or parse data from sessionStorage:", error);
//     }
//   }, []);

//   // Update saved details in real-time for live preview
//   useEffect(() => {
//       setSavedSections(sections);
//   }, [sections]);

//   const updateSectionContent = (id: string, content: string) => {
//     setSections(prev => prev.map(sec => sec.id === id ? { ...sec, content } : sec));
//   };

//   const addSection = () => {
//     const title = window.prompt("Enter a title for the new section:", "Terms and Conditions");
//     if (title) {
//       const newSection: InfoSection = {
//         id: crypto.randomUUID(),
//         title,
//         content: '',
//       };
//       setSections(prev => [...prev, newSection]);
//     }
//   };

//   const removeSection = (id: string) => {
//     if (sections.length > 1) {
//       if (window.confirm("Are you sure you want to delete this section?")) {
//         setSections(prev => prev.filter(sec => sec.id !== id));
//       }
//     } else {
//         alert("You cannot delete the last section.");
//     }
//   };
  
//   const handleSubmit = () => {
//       try {
//           sessionStorage.setItem('tripInformationData', JSON.stringify(sections));
//           setSaveStatus('success');
//           setTimeout(() => setSaveStatus('idle'), 3000); // Reset status after 3 seconds
//       } catch (error) {
//           console.error("Failed to save data to sessionStorage:", error);
//           alert("Could not save the data. Please check browser permissions.");
//       }
//   };

//   return (
//     <div className="bg-[#F6F6FA] min-h-screen p-4 sm:p-6 lg:p-2 font-sans">
//       <div className="w-full">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
//           {/* Left Form Section */}
//           <div className="lg:col-span-2 space-y-6">
//             <h1 className="text-[#10A4B0] font-sans font-semibold text-xl">
//               Trip Information<span className="text-red-500">*</span>
//             </h1>

//             {sections.map(section => (
//               <div key={section.id} className="border border-gray-300 rounded-md bg-white shadow-sm">
//                 <div className="flex justify-between items-center border-b border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700">
//                   {section.title}
//                   <button onClick={() => removeSection(section.id)} title="Delete Section">
//                     <Trash2 className="w-4 h-4 text-gray-500 cursor-pointer hover:text-red-500" />
//                   </button>
//                 </div>
//                 <RichTextEditor
//                   content={section.content}
//                   onUpdate={(html) => updateSectionContent(section.id, html)}
//                   placeholder={`Enter details for ${section.title}...`}
//                 />
//               </div>
//             ))}
            
//             <div className="flex flex-col items-center justify-center gap-4">
//                  <button 
//                     onClick={addSection}
//                     className="flex items-center gap-2 px-4 py-2 bg-white text-teal-600 border border-teal-500 text-sm rounded-lg hover:bg-teal-50 transition-colors"
//                 >
//                     <PlusCircle className="w-4 h-4" />
//                     Add New Section
//                 </button>
//                  <button 
//                     onClick={handleSubmit}
//                     className="w-full max-w-xs text-white bg-teal-600 hover:bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors"
//                 >
//                     Submit & Save
//                 </button>
//                 {saveStatus === 'success' && (
//                     <div className="flex items-center gap-2 text-green-600">
//                         <CheckCircle className="w-5 h-5" />
//                         <span>Data saved successfully to session!</span>
//                     </div>
//                 )}
//             </div>
//           </div>

//           {/* Right Preview Section */}
//           <div className="lg:col-span-1 sticky top-6 self-start">
//             <div className="bg-white p-4 rounded-lg border border-[#E0E0E0]">
//               <h2 className="text-xl font-semibold text-[#717182] font-sans mb-4">Save Details</h2>
//               <div className="border border-[#E0E0E0] rounded-lg">
//                 <div className="bg-[#10A4B0] text-white flex justify-between items-center px-3 py-3 rounded-t-lg">
//                   <h3 className="font-sans font-medium text-lg">Sightseeing</h3>
//                   <MoreHorizontal className="w-6 h-6"/>
//                 </div>
//                 <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto">
//                   {savedSections && savedSections.length > 0 ? (
//                     savedSections.map(section => (
//                       <div key={section.id}>
//                         <h4 className="font-semibold mb-1 font-sans text-sm text-gray-800">{section.title}</h4>
//                         <div 
//                             className="prose prose-sm max-w-none text-xs text-gray-600"
//                             dangerouslySetInnerHTML={{ __html: section.content || "<p>No details entered.</p>" }} 
//                         />
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-gray-500 text-center py-4">Your details will appear here as you type.</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






//v1
// import React, { useState, useCallback, useEffect, useRef } from 'react';
// import { 
//     Bold, Italic, Underline, Link, Image, List, ListOrdered, Trash2, 
//     MoreHorizontal, PlusCircle, AlignLeft, AlignCenter, AlignRight, AlignJustify 
// } from 'lucide-react';

// // --- TYPE DEFINITIONS ---
// interface InfoSection {
//   id: string;
//   title: string;
//   content: string;
// }

// // --- INITIAL DATA ---
// const initialSections: InfoSection[] = [
//   {
//     id: crypto.randomUUID(),
//     title: 'Inclusions',
//     content: '<ul><li>Return Flights (DEL – DMK – DEL)</li><li>Baggage: 20kg Check-In + 7kg Hand Baggage</li><li>Airport pickup and drop</li><li>3-star hotel accommodation</li></ul>',
//   },
//   {
//     id: crypto.randomUUID(),
//     title: 'Exclusions',
//     content: '<ul><li>Travel insurance</li><li>Meals not specified in the inclusions</li><li>Expenses of personal nature</li></ul>',
//   },
//   {
//     id: crypto.randomUUID(),
//     title: 'Cancellation Policy',
//     content: '<p style="text-align: center;">Cancellations made more than 30 days before departure: <b>80% refund</b>.</p><p>Cancellations less than 15 days before travel: <b>No refund</b>.</p>',
//   },
// ];


// // --- RICH TEXT EDITOR COMPONENT (Improved) ---
// interface RichTextEditorProps {
//   content: string;
//   onUpdate: (html: string) => void;
//   placeholder?: string;
// }

// const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onUpdate, placeholder = "Enter details..." }) => {
//   const editorRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (editorRef.current && editorRef.current.innerHTML !== content) {
//       editorRef.current.innerHTML = content;
//     }
//   }, [content]);

//   const handleInput = useCallback(() => {
//     if (editorRef.current) {
//       onUpdate(editorRef.current.innerHTML);
//     }
//   }, [onUpdate]);

//   const execCommand = (command: string, value?: string) => {
//     document.execCommand(command, false, value);
//     if (editorRef.current) {
//       editorRef.current.focus();
//       handleInput();
//     }
//   };
  
//   const setLink = useCallback(() => {
//     const url = window.prompt('Enter URL:');
//     if (url) execCommand('createLink', url);
//   }, []);

//   const addImage = useCallback(() => {
//     const url = window.prompt('Enter image URL:');
//     if (url) execCommand('insertImage', url);
//   }, []);

//   return (
//     <div>
//       <div className="flex items-center flex-wrap gap-1 border-t border-gray-200 p-2 bg-gray-50">
//         <button type="button" onClick={() => execCommand('bold')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Bold"><Bold className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('italic')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Italic"><Italic className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('underline')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Underline"><Underline className="w-4 h-4" /></button>
//         <div className="w-px h-5 bg-gray-300 mx-1"></div>
//         <button type="button" onClick={() => execCommand('insertUnorderedList')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Bullet List"><List className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('insertOrderedList')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Numbered List"><ListOrdered className="w-4 h-4" /></button>
//         <div className="w-px h-5 bg-gray-300 mx-1"></div>
//         <button type="button" onClick={() => execCommand('justifyLeft')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Align Left"><AlignLeft className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('justifyCenter')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Align Center"><AlignCenter className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('justifyRight')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Align Right"><AlignRight className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('justifyFull')} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Justify"><AlignJustify className="w-4 h-4" /></button>
//         <div className="w-px h-5 bg-gray-300 mx-1"></div>
//         <button type="button" onClick={setLink} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Add Link"><Link className="w-4 h-4" /></button>
//         <button type="button" onClick={addImage} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Add Image"><Image className="w-4 h-4" /></button>
//       </div>
//       <div
//         ref={editorRef}
//         contentEditable
//         className="prose w-full max-w-none p-3 text-sm min-h-[120px] focus:outline-none"
//         onInput={handleInput}
//         suppressContentEditableWarning={true}
//         data-placeholder={placeholder}
//       />
//       <style jsx>{`
//         [contenteditable]:empty::before {
//           content: attr(data-placeholder);
//           color: #9CA3AF;
//           pointer-events: none;
//         }
//         .prose ul {
//           list-style-type: disc;
//         }
//         .prose ol {
//           list-style-type: decimal;
//         }
//       `}</style>
//     </div>
//   );
// };


// // --- MAIN TRIP INFORMATION COMPONENT ---
// export default function App() {
//   const [sections, setSections] = useState<InfoSection[]>(initialSections);
//   const [savedSections, setSavedSections] = useState<InfoSection[] | null>(null);

//   const updateSectionContent = (id: string, content: string) => {
//     setSections(prev => prev.map(sec => sec.id === id ? { ...sec, content } : sec));
//   };

//   const addSection = () => {
//     const title = window.prompt("Enter a title for the new section:", "Terms and Conditions");
//     if (title) {
//       const newSection: InfoSection = {
//         id: crypto.randomUUID(),
//         title,
//         content: '',
//       };
//       setSections(prev => [...prev, newSection]);
//     }
//   };

//   const removeSection = (id: string) => {
//     if (sections.length > 1) {
//       if (window.confirm("Are you sure you want to delete this section?")) {
//         setSections(prev => prev.filter(sec => sec.id !== id));
//       }
//     } else {
//         // Using a custom modal/toast is better, but alert for simplicity here
//         alert("You cannot delete the last section.");
//     }
//   };
  
//   // Update saved details in real-time for live preview
//   useEffect(() => {
//       setSavedSections(sections);
//   }, [sections]);

//   return (
//     <div className="bg-[#F6F6FA] min-h-screen p-4 sm:p-6 lg:p-2 font-sans">
//       <div className="w-full">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
//           {/* Left Form Section */}
//           <div className="lg:col-span-2 space-y-6">
//             <h1 className="text-[#10A4B0] font-sans font-semibold text-xl">
//               Trip Information<span className="text-red-500">*</span>
//             </h1>

//             {sections.map(section => (
//               <div key={section.id} className="border border-gray-300 rounded-md bg-white shadow-sm">
//                 <div className="flex justify-between items-center border-b border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700">
//                   {section.title}
//                   <button onClick={() => removeSection(section.id)} title="Delete Section">
//                     <Trash2 className="w-4 h-4 text-gray-500 cursor-pointer hover:text-red-500" />
//                   </button>
//                 </div>
//                 <RichTextEditor
//                   content={section.content}
//                   onUpdate={(html) => updateSectionContent(section.id, html)}
//                   placeholder={`Enter details for ${section.title}...`}
//                 />
//               </div>
//             ))}
            
//             <div className="flex justify-center">
//                  <button 
//                     onClick={addSection}
//                     className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white text-sm rounded-lg hover:bg-teal-600 transition-colors"
//                 >
//                     <PlusCircle className="w-4 h-4" />
//                     Add New Section
//                 </button>
//             </div>
//           </div>

//           {/* Right Preview Section */}
//           <div className="lg:col-span-1 sticky top-6 self-start">
//             <div className="bg-white p-4 rounded-lg border border-[#E0E0E0]">
//               <h2 className="text-xl font-semibold text-[#717182] font-sans mb-4">Save Details</h2>
//               <div className="border border-[#E0E0E0] rounded-lg">
//                 <div className="bg-[#10A4B0] text-white flex justify-between items-center px-3 py-3 rounded-t-lg">
//                   <h3 className="font-sans font-medium text-lg">Sightseeing</h3>
//                   <MoreHorizontal className="w-6 h-6"/>
//                 </div>
//                 <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto">
//                   {savedSections && savedSections.length > 0 ? (
//                     savedSections.map(section => (
//                       <div key={section.id}>
//                         <h4 className="font-semibold mb-1 font-sans text-sm text-gray-800">{section.title}</h4>
//                         <div 
//                             className="prose prose-sm max-w-none text-xs text-gray-600"
//                             dangerouslySetInnerHTML={{ __html: section.content || "<p>No details entered.</p>" }} 
//                         />
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-gray-500 text-center py-4">Your details will appear here as you type.</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

