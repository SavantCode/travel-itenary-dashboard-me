//v4- robust data saving final
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Trash2, PlusCircle, DollarSign, CreditCard, Landmark } from 'lucide-react';

// --- TYPE DEFINITIONS ---
interface PriceRow {
  id: string;
  paxType: string;
  noOfPax: number;
  costPerPerson: number;
}

interface BankDetails {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

interface PricingPackage {
  id: string;
  packageName: string;
  priceDetails: PriceRow[];
  inclusions: string;
  totalCost?: number;
}

// --- RICH TEXT EDITOR COMPONENT ---
interface RichTextEditorProps {
  content: string;
  onUpdate: (html: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onUpdate, placeholder }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const handleInput = useCallback(() => {
    if (editorRef.current) onUpdate(editorRef.current.innerHTML);
  }, [onUpdate]);

  const execCommand = (command: string) => {
    document.execCommand(command, false);
    editorRef.current?.focus();
    handleInput();
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-[#F6F6FA]">
      <div className="flex items-center flex-wrap gap-1 p-2 bg-white border-b border-gray-200">
        <button type="button" onClick={() => execCommand('bold')} className="p-2 rounded hover:bg-gray-100" title="Bold"><Bold className="w-4 h-4 text-gray-600" /></button>
        <button type="button" onClick={() => execCommand('italic')} className="p-2 rounded hover:bg-gray-100" title="Italic"><Italic className="w-4 h-4 text-gray-600" /></button>
        <button type="button" onClick={() => execCommand('underline')} className="p-2 rounded hover:bg-gray-100" title="Underline"><Underline className="w-4 h-4 text-gray-600" /></button>
        <button type="button" onClick={() => execCommand('insertUnorderedList')} className="p-2 rounded hover:bg-gray-100" title="Bullet List"><List className="w-4 h-4 text-gray-600" /></button>
        <button type="button" onClick={() => execCommand('insertOrderedList')} className="p-2 rounded hover:bg-gray-100" title="Numbered List"><ListOrdered className="w-4 h-4 text-gray-600" /></button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="prose w-full max-w-none p-3 text-sm min-h-[120px] focus:outline-none"
        onInput={handleInput}
        suppressContentEditableWarning={true}
        data-placeholder={placeholder}
      />
      <style>{`
        [contenteditable]:empty::before { content: attr(data-placeholder); color: #9CA3AF; pointer-events: none; }
        .prose ul, .prose ol { padding-left: 20px; margin-left: 0; }
      `}</style>
    </div>
  );
};

// --- MAIN PRICING PAGE COMPONENT ---
export default function PricingPage() {
    const [pricingPackages, setPricingPackages] = useState<PricingPackage[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<string>('Credit Card, Bank Transfer, UPI');
    const [paymentTerms, setPaymentTerms] = useState<string>('<p><b>50% advance payment</b> required to confirm the booking.</p><p>Remaining 50% to be paid 15 days prior to the travel date.</p>');
    const [bankDetails, setBankDetails] = useState<BankDetails>({ bankName: "", accountNumber: "", ifscCode: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');
    const [isLoaded, setIsLoaded] = useState(false);

    // **IMPROVEMENT**: Load data from the correct top-level 'pricingDetails' field.
    useEffect(() => {
        try {
            const savedItineraryString = sessionStorage.getItem('editedItinerary');
            if (savedItineraryString) {
                const savedItinerary = JSON.parse(savedItineraryString);
                
                // Prioritize loading from the new, correct top-level structure.
                let pricingDetails = savedItinerary.pricingDetails;

                // Fallback for old data structure for backward compatibility.
                if (!pricingDetails && Array.isArray(savedItinerary) && savedItinerary[0]?.PricingDetails) {
                    pricingDetails = savedItinerary[0].PricingDetails;
                }

                if (pricingDetails) {
                    setPricingPackages(pricingDetails.pricingPackages || []);
                    setPaymentMethods(pricingDetails.paymentMethods || 'Credit Card, Bank Transfer, UPI');
                    setPaymentTerms(pricingDetails.paymentTerms || '<p><b>50% advance payment</b> required...</p>');
                    setBankDetails(pricingDetails.bankDetails || { bankName: "", accountNumber: "", ifscCode: "" });
                    setIsLoaded(true);
                    return;
                }
            }
        } catch (error) {
            console.error("Failed to load pricing data from sessionStorage:", error);
        }

        // Fallback to starter template if no data is found
        const starterTemplate: PricingPackage[] = [
            {
                id: crypto.randomUUID(),
                packageName: 'Economy Saver: Paris & Rome',
                priceDetails: [
                    { id: crypto.randomUUID(), paxType: 'Adult Twin Sharing', noOfPax: 2, costPerPerson: 85000 },
                    { id: crypto.randomUUID(), paxType: 'Child With Bed', noOfPax: 1, costPerPerson: 60000 },
                ],
                inclusions: '<ul><li>Return flight tickets.</li><li>3-star hotel stay with breakfast.</li><li>Airport transfers.</li></ul>'
            }
        ];
        setPricingPackages(starterTemplate);
        setIsLoaded(true);
    }, []);

    const handlePriceChange = (pkgIndex: number, rowIndex: number, field: keyof PriceRow, value: string | number) => {
        const newPackages = [...pricingPackages];
        const targetRow = newPackages[pkgIndex].priceDetails[rowIndex];
        if (field === 'noOfPax' || field === 'costPerPerson') {
            (targetRow as any)[field] = Number(value) < 0 ? 0 : Number(value);
        } else {
            (targetRow as any)[field] = value;
        }
        setPricingPackages(newPackages);
    };

    const addPriceRow = (pkgIndex: number) => {
        const newPackages = [...pricingPackages];
        newPackages[pkgIndex].priceDetails.push({ id: crypto.randomUUID(), paxType: 'Adult Extra Bed', noOfPax: 1, costPerPerson: 0 });
        setPricingPackages(newPackages);
    };

    const removePriceRow = (pkgIndex: number, rowIndex: number) => {
        const newPackages = [...pricingPackages];
        if (newPackages[pkgIndex].priceDetails.length > 1) {
            newPackages[pkgIndex].priceDetails.splice(rowIndex, 1);
            setPricingPackages(newPackages);
        } else {
            alert("Each package must have at least one price row.");
        }
    };
    
    const calculateTotal = (pkg: PricingPackage) => {
        const totalPax = pkg.priceDetails.reduce((sum, row) => sum + Number(row.noOfPax || 0), 0);
        const totalCost = pkg.priceDetails.reduce((sum, row) => sum + (Number(row.noOfPax || 0) * Number(row.costPerPerson || 0)), 0);
        return { totalPax, totalCost };
    };
    
    const addPackage = () => {
        const newPackage: PricingPackage = {
            id: crypto.randomUUID(),
            packageName: 'New Custom Package',
            priceDetails: [{ id: crypto.randomUUID(), paxType: 'Adult', noOfPax: 2, costPerPerson: 0 }],
            inclusions: '<ul><li></li></ul>'
        };
        setPricingPackages([...pricingPackages, newPackage]);
    };
    
    const removePackage = (pkgIndex: number) => {
        if (pricingPackages.length > 1) {
             setPricingPackages(pricingPackages.filter((_, index) => index !== pkgIndex));
        } else {
            alert("You must have at least one pricing package.");
        }
    };

    // **CRITICAL BUG FIX & IMPROVEMENT**: Updated saving logic to be robust and structured.
    const handleSubmit = () => {
        setIsSubmitting(true);
        
        const packagesToSave = pricingPackages.map(pkg => {
            const { totalCost } = calculateTotal(pkg);
            return { ...pkg, totalCost };
        });

        const allPricingData = {
            pricingPackages: packagesToSave,
            paymentMethods,
            paymentTerms,
            bankDetails
        };

        try {
            const savedItineraryString = sessionStorage.getItem('editedItinerary');
            let currentItinerary: any = {};

            if (savedItineraryString) {
                const parsedData = JSON.parse(savedItineraryString);
                // Handle both old (array) and new (object) formats for compatibility
                if (Array.isArray(parsedData)) {
                    currentItinerary = { days: parsedData }; // Convert old array format to new object format
                } else {
                    currentItinerary = parsedData;
                }
            }
            
            // **IMPROVEMENT**: Save pricing details to a separate, top-level field.
            const updatedItinerary = {
                ...currentItinerary,
                pricingDetails: allPricingData
            };

            sessionStorage.setItem('editedItinerary', JSON.stringify(updatedItinerary));
            console.log("Updated Itinerary with Pricing Details:", updatedItinerary);

            setTimeout(() => {
                setIsSubmitting(false);
                setSubmitStatus('success');
                setTimeout(() => setSubmitStatus('idle'), 3000);
            }, 1000);

        } catch (error) {
            console.error("Failed to save pricing data:", error);
            alert("An error occurred while saving the data.");
            setIsSubmitting(false);
        }
    };
    
    const handleViewAndBook = (packageName: string) => {
        alert(`The "View Online and Book" button for the "${packageName}" package was clicked. This would typically lead to a booking page.`);
    };

    if (!isLoaded) {
        return <div className="flex justify-center items-center h-screen bg-[#F6F6FA]">Loading Pricing Details...</div>;
    }

    return (
        <div className="bg-[#F6F6FA] min-h-screen p-4 sm:p-6 lg:p-2 font-raleway">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-semibold text-[#10A4B0] mb-6">Package Price Details</h1>
                
                {pricingPackages.map((pkg, pkgIndex) => {
                    const { totalPax, totalCost } = calculateTotal(pkg);
                    return (
                        <div key={pkg.id} className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8 overflow-hidden relative">
                             <button type="button" onClick={() => removePackage(pkgIndex)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 z-10" title="Delete Package">
                                <Trash2 className="w-5 h-5"/>
                            </button>
                            <div className="p-6">
                                <input type="text" value={pkg.packageName} onChange={(e) => {
                                  const newPkgs = [...pricingPackages]; newPkgs[pkgIndex].packageName = e.target.value; setPricingPackages(newPkgs);
                                }} className="text-xl font-semibold text-gray-800 w-full border-none focus:ring-2 focus:ring-[#10A4B0] rounded p-2 -m-2 pr-12"/>
                            </div>

                            <div className="px-6 pb-6">
                                <h3 className="text-base font-medium text-gray-700 mb-4">Price Details</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left text-gray-600">
                                        <thead className="text-xs text-gray-700 uppercase bg-[#F6F6FA]">
                                            <tr>
                                                <th scope="col" className="px-4 py-3 font-medium min-w-[200px]">Pax Type</th>
                                                <th scope="col" className="px-4 py-3 font-medium">No of Pax</th>
                                                <th scope="col" className="px-4 py-3 font-medium">Cost Per Person (INR)</th>
                                                <th scope="col" className="px-4 py-3 font-medium">Total Cost (INR)</th>
                                                <th scope="col" className="px-4 py-3"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pkg.priceDetails.map((row, rowIndex) => (
                                                <tr key={row.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                                    <td className="px-4 py-2"><input type="text" value={row.paxType} onChange={(e) => handlePriceChange(pkgIndex, rowIndex, 'paxType', e.target.value)} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/></td>
                                                    <td className="px-4 py-2"><input type="number" value={row.noOfPax} onChange={(e) => handlePriceChange(pkgIndex, rowIndex, 'noOfPax', e.target.value)} className="w-24 p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/></td>
                                                    <td className="px-4 py-2"><input type="number" value={row.costPerPerson} onChange={(e) => handlePriceChange(pkgIndex, rowIndex, 'costPerPerson', e.target.value)} className="w-36 p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/></td>
                                                    <td className="px-4 py-2 font-medium text-gray-900">{(Number(row.noOfPax) * Number(row.costPerPerson)).toLocaleString('en-IN')}</td>
                                                    <td className="px-4 py-2 text-right"><button type="button" onClick={() => removePriceRow(pkgIndex, rowIndex)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4"/></button></td>
                                                </tr>
                                            ))}
                                            <tr className="font-semibold bg-[#F6F6FA]">
                                                <td className="px-4 py-3">Total Cost</td>
                                                <td className="px-4 py-3">{totalPax}</td>
                                                <td className="px-4 py-3"></td>
                                                <td className="px-4 py-3 text-gray-900">{totalCost.toLocaleString('en-IN')}</td>
                                                <td className="px-4 py-3"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <button type="button" onClick={() => addPriceRow(pkgIndex)} className="flex items-center gap-2 mt-4 text-sm text-[#10A4B0] hover:text-teal-700 font-semibold"><PlusCircle className="w-4 h-4"/> Add Row</button>
                            </div>
                            
                            <div className="bg-white px-6 py-6 border-t border-gray-200">
                                <div>
                                    <h3 className="text-base font-medium text-gray-700 mb-4">Inclusions</h3>
                                    <RichTextEditor content={pkg.inclusions} onUpdate={(html) => {
                                        const newPkgs = [...pricingPackages]; newPkgs[pkgIndex].inclusions = html; setPricingPackages(newPkgs);
                                    }} placeholder="Add inclusions for this package..." />
                                </div>
                            </div>

                            <div className="px-6 py-4 bg-gray-50 flex flex-wrap justify-end items-center gap-4 border-t border-gray-200">
                                <span className="text-lg font-bold text-gray-800">Total Package Cost: INR {totalCost.toLocaleString('en-IN')}</span>
                                <button onClick={() => handleViewAndBook(pkg.packageName)} className="px-6 py-2 bg-[#10A4B0] text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors">View Online and Book</button>
                            </div>
                        </div>
                    );
                })}
                
                <div className="flex justify-center mb-8">
                     <button type="button" onClick={addPackage} className="px-6 py-2 bg-white text-[#10A4B0] border border-[#10A4B0] font-semibold rounded-lg hover:bg-teal-50 flex items-center gap-2 transition-colors"><PlusCircle className="w-5 h-5"/> Add Another Package</button>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-[#10A4B0]"/> Available Payment Methods</h3>
                         <input type="text" value={paymentMethods} onChange={(e) => setPaymentMethods(e.target.value)} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent" placeholder="e.g. Credit Card, UPI"/>
                        <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5 text-[#10A4B0]"/> Payment Terms</h3>
                        <RichTextEditor content={paymentTerms} onUpdate={setPaymentTerms} placeholder="Enter payment terms..."/>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2"><Landmark className="w-5 h-5 text-[#10A4B0]"/> Bank Details for Transfer</h3>
                        <div className="space-y-4">
                             <div><label className="block text-xs font-medium text-gray-700 mb-1">Bank & Branch Name</label><input type="text" value={bankDetails.bankName} onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/></div>
                             <div><label className="block text-xs font-medium text-gray-700 mb-1">Account No.</label><input type="text" value={bankDetails.accountNumber} onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/></div>
                             <div><label className="block text-xs font-medium text-gray-700 mb-1">IFSC Code</label><input type="text" value={bankDetails.ifscCode} onChange={(e) => setBankDetails({...bankDetails, ifscCode: e.target.value})} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/></div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button type="button" onClick={handleSubmit} disabled={isSubmitting} className={`px-8 py-3 text-white font-semibold rounded-lg transition-colors text-base ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#10A4B0] hover:bg-teal-700'}`}>
                        {isSubmitting ? 'Saving...' : 'Confirm & Save All Details'}
                    </button>
                </div>
                 {submitStatus === 'success' && <p className="text-green-600 text-center font-medium text-sm mt-4">All pricing details have been saved successfully!</p>}
            </div>
        </div>
    );
}


// //saving data v3 - 
// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { Bold, Italic, Underline, List, ListOrdered, Trash2, PlusCircle, DollarSign, CreditCard, Landmark } from 'lucide-react';

// // --- TYPE DEFINITIONS ---
// interface PriceRow {
//   id: string;
//   paxType: string;
//   noOfPax: number;
//   costPerPerson: number;
// }

// interface BankDetails {
//   bankName: string;
//   accountNumber: string;
//   ifscCode: string;
// }

// interface PricingPackage {
//   id: string;
//   packageName: string;
//   priceDetails: PriceRow[];
//   inclusions: string;
//   totalCost?: number;
// }

// // --- RICH TEXT EDITOR COMPONENT ---
// interface RichTextEditorProps {
//   content: string;
//   onUpdate: (html: string) => void;
//   placeholder?: string;
// }

// const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onUpdate, placeholder }) => {
//   const editorRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (editorRef.current && editorRef.current.innerHTML !== content) {
//       editorRef.current.innerHTML = content;
//     }
//   }, [content]);

//   const handleInput = useCallback(() => {
//     if (editorRef.current) onUpdate(editorRef.current.innerHTML);
//   }, [onUpdate]);

//   const execCommand = (command: string) => {
//     document.execCommand(command, false);
//     editorRef.current?.focus();
//     handleInput();
//   };

//   return (
//     <div className="border border-gray-200 rounded-lg overflow-hidden bg-[#F6F6FA]">
//       <div className="flex items-center flex-wrap gap-1 p-2 bg-white border-b border-gray-200">
//         <button type="button" onClick={() => execCommand('bold')} className="p-2 rounded hover:bg-gray-100" title="Bold"><Bold className="w-4 h-4 text-gray-600" /></button>
//         <button type="button" onClick={() => execCommand('italic')} className="p-2 rounded hover:bg-gray-100" title="Italic"><Italic className="w-4 h-4 text-gray-600" /></button>
//         <button type="button" onClick={() => execCommand('underline')} className="p-2 rounded hover:bg-gray-100" title="Underline"><Underline className="w-4 h-4 text-gray-600" /></button>
//         <button type="button" onClick={() => execCommand('insertUnorderedList')} className="p-2 rounded hover:bg-gray-100" title="Bullet List"><List className="w-4 h-4 text-gray-600" /></button>
//         <button type="button" onClick={() => execCommand('insertOrderedList')} className="p-2 rounded hover:bg-gray-100" title="Numbered List"><ListOrdered className="w-4 h-4 text-gray-600" /></button>
//       </div>
//       <div
//         ref={editorRef}
//         contentEditable
//         className="prose w-full max-w-none p-3 text-sm min-h-[120px] focus:outline-none"
//         onInput={handleInput}
//         suppressContentEditableWarning={true}
//         data-placeholder={placeholder}
//       />
//       <style>{`
//         [contenteditable]:empty::before { content: attr(data-placeholder); color: #9CA3AF; pointer-events: none; }
//         .prose ul, .prose ol { padding-left: 20px; margin-left: 0; }
//       `}</style>
//     </div>
//   );
// };

// // --- MAIN PRICING PAGE COMPONENT ---
// export default function PricingPage() {
//     const [pricingPackages, setPricingPackages] = useState<PricingPackage[]>([]);
//     const [paymentMethods, setPaymentMethods] = useState<string>('Credit Card, Bank Transfer, UPI');
//     const [paymentTerms, setPaymentTerms] = useState<string>('<p><b>50% advance payment</b> required to confirm the booking.</p><p>Remaining 50% to be paid 15 days prior to the travel date.</p>');
//     const [bankDetails, setBankDetails] = useState<BankDetails>({ bankName: "", accountNumber: "", ifscCode: "" });
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');
//     const [isLoaded, setIsLoaded] = useState(false);

//     // *** MODIFIED LOGIC ***
//     // Load existing data from 'editedItinerary' in sessionStorage on mount.
//     useEffect(() => {
//         try {
//             const savedItineraryString = sessionStorage.getItem('editedItinerary');
//             if (savedItineraryString) {
//                 const savedItinerary = JSON.parse(savedItineraryString);
//                 const pricingDetails = savedItinerary[0]?.PricingDetails;

//                 if (pricingDetails) {
//                     setPricingPackages(pricingDetails.pricingPackages || []);
//                     setPaymentMethods(pricingDetails.paymentMethods || 'Credit Card, Bank Transfer, UPI');
//                     setPaymentTerms(pricingDetails.paymentTerms || '<p><b>50% advance payment</b> required...</p>');
//                     setBankDetails(pricingDetails.bankDetails || { bankName: "", accountNumber: "", ifscCode: "" });
//                     setIsLoaded(true);
//                     return;
//                 }
//             }
//         } catch (error) {
//             console.error("Failed to load pricing data from sessionStorage:", error);
//         }

//         // Fallback to starter template if no data is found
//         const starterTemplate: PricingPackage[] = [
//             {
//                 id: crypto.randomUUID(),
//                 packageName: 'Economy Saver: Paris & Rome',
//                 priceDetails: [
//                     { id: crypto.randomUUID(), paxType: 'Adult Twin Sharing', noOfPax: 2, costPerPerson: 85000 },
//                     { id: crypto.randomUUID(), paxType: 'Child With Bed', noOfPax: 1, costPerPerson: 60000 },
//                 ],
//                 inclusions: '<ul><li>Return flight tickets.</li><li>3-star hotel stay with breakfast.</li><li>Airport transfers.</li></ul>'
//             }
//         ];
//         setPricingPackages(starterTemplate);
//         setIsLoaded(true);
//     }, []);

//     const handlePriceChange = (pkgIndex: number, rowIndex: number, field: keyof PriceRow, value: string | number) => {
//         const newPackages = [...pricingPackages];
//         const targetRow = newPackages[pkgIndex].priceDetails[rowIndex];
//         if (field === 'noOfPax' || field === 'costPerPerson') {
//             (targetRow as any)[field] = Number(value) < 0 ? 0 : Number(value);
//         } else {
//             (targetRow as any)[field] = value;
//         }
//         setPricingPackages(newPackages);
//     };

//     const addPriceRow = (pkgIndex: number) => {
//         const newPackages = [...pricingPackages];
//         newPackages[pkgIndex].priceDetails.push({ id: crypto.randomUUID(), paxType: 'Adult Extra Bed', noOfPax: 1, costPerPerson: 0 });
//         setPricingPackages(newPackages);
//     };

//     const removePriceRow = (pkgIndex: number, rowIndex: number) => {
//         const newPackages = [...pricingPackages];
//         if (newPackages[pkgIndex].priceDetails.length > 1) {
//             newPackages[pkgIndex].priceDetails.splice(rowIndex, 1);
//             setPricingPackages(newPackages);
//         } else {
//             alert("Each package must have at least one price row.");
//         }
//     };
    
//     const calculateTotal = (pkg: PricingPackage) => {
//         const totalPax = pkg.priceDetails.reduce((sum, row) => sum + Number(row.noOfPax || 0), 0);
//         const totalCost = pkg.priceDetails.reduce((sum, row) => sum + (Number(row.noOfPax || 0) * Number(row.costPerPerson || 0)), 0);
//         return { totalPax, totalCost };
//     };
    
//     const addPackage = () => {
//         const newPackage: PricingPackage = {
//             id: crypto.randomUUID(),
//             packageName: 'New Custom Package',
//             priceDetails: [{ id: crypto.randomUUID(), paxType: 'Adult', noOfPax: 2, costPerPerson: 0 }],
//             inclusions: '<ul><li></li></ul>'
//         };
//         setPricingPackages([...pricingPackages, newPackage]);
//     };
    
//     const removePackage = (pkgIndex: number) => {
//         if (pricingPackages.length > 1) {
//              setPricingPackages(pricingPackages.filter((_, index) => index !== pkgIndex));
//         } else {
//             alert("You must have at least one pricing package.");
//         }
//     };

//     // *** MODIFIED LOGIC ***
//     // This logic now creates a new itinerary object if one doesn't already exist.
//     const handleSubmit = () => {
//         setIsSubmitting(true);
        
//         const packagesToSave = pricingPackages.map(pkg => {
//             const { totalCost } = calculateTotal(pkg);
//             return { ...pkg, totalCost };
//         });

//         const allPricingData = {
//             pricingPackages: packagesToSave,
//             paymentMethods,
//             paymentTerms,
//             bankDetails
//         };

//         try {
//             const savedItineraryString = sessionStorage.getItem('editedItinerary');
//             let fullItinerary: any[] = [];

//             if (savedItineraryString) {
//                 try {
//                     fullItinerary = JSON.parse(savedItineraryString);
//                     if (!Array.isArray(fullItinerary)) fullItinerary = [{}];
//                 } catch (e) {
//                     console.error("Error parsing existing itinerary, starting fresh.", e);
//                     fullItinerary = [{}];
//                 }
//             } else {
//                 fullItinerary = [{}];
//             }

//             if (fullItinerary.length === 0) {
//                 fullItinerary.push({});
//             }
            
//             const updatedDayData = {
//                 ...fullItinerary[0],
//                 "PricingDetails": allPricingData
//             };

//             const updatedItinerary = [updatedDayData, ...fullItinerary.slice(1)];
//             sessionStorage.setItem('editedItinerary', JSON.stringify(updatedItinerary));
//             console.log("Saved Data to editedItinerary:", updatedItinerary);

//             setTimeout(() => {
//                 setIsSubmitting(false);
//                 setSubmitStatus('success');
//                 setTimeout(() => setSubmitStatus('idle'), 3000);
//             }, 1000);

//         } catch (error) {
//             console.error("Failed to save pricing data:", error);
//             alert("An error occurred while saving the data.");
//             setIsSubmitting(false);
//         }
//     };
    
//     const handleViewAndBook = (packageName: string) => {
//         alert(`The "View Online and Book" button for the "${packageName}" package was clicked. This would typically lead to a booking page.`);
//     };

//     if (!isLoaded) {
//         return <div className="flex justify-center items-center h-screen bg-[#F6F6FA]">Loading Pricing Details...</div>;
//     }

//     return (
//         <div className="bg-[#F6F6FA] min-h-screen p-4 sm:p-6 lg:p-2 font-raleway">
//             <div className="max-w-6xl mx-auto">
//                 <h1 className="text-2xl font-semibold text-[#10A4B0] mb-6">Package Price Details</h1>
                
//                 {pricingPackages.map((pkg, pkgIndex) => {
//                     const { totalPax, totalCost } = calculateTotal(pkg);
//                     return (
//                         <div key={pkg.id} className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8 overflow-hidden relative">
//                              <button type="button" onClick={() => removePackage(pkgIndex)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 z-10" title="Delete Package">
//                                 <Trash2 className="w-5 h-5"/>
//                             </button>
//                             <div className="p-6">
//                                 <input type="text" value={pkg.packageName} onChange={(e) => {
//                                   const newPkgs = [...pricingPackages]; newPkgs[pkgIndex].packageName = e.target.value; setPricingPackages(newPkgs);
//                                 }} className="text-xl font-semibold text-gray-800 w-full border-none focus:ring-2 focus:ring-[#10A4B0] rounded p-2 -m-2 pr-12"/>
//                             </div>

//                             <div className="px-6 pb-6">
//                                 <h3 className="text-base font-medium text-gray-700 mb-4">Price Details</h3>
//                                 <div className="overflow-x-auto">
//                                     <table className="w-full text-sm text-left text-gray-600">
//                                         <thead className="text-xs text-gray-700 uppercase bg-[#F6F6FA]">
//                                             <tr>
//                                                 <th scope="col" className="px-4 py-3 font-medium min-w-[200px]">Pax Type</th>
//                                                 <th scope="col" className="px-4 py-3 font-medium">No of Pax</th>
//                                                 <th scope="col" className="px-4 py-3 font-medium">Cost Per Person (INR)</th>
//                                                 <th scope="col" className="px-4 py-3 font-medium">Total Cost (INR)</th>
//                                                 <th scope="col" className="px-4 py-3"></th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {pkg.priceDetails.map((row, rowIndex) => (
//                                                 <tr key={row.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
//                                                     <td className="px-4 py-2"><input type="text" value={row.paxType} onChange={(e) => handlePriceChange(pkgIndex, rowIndex, 'paxType', e.target.value)} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/></td>
//                                                     <td className="px-4 py-2"><input type="number" value={row.noOfPax} onChange={(e) => handlePriceChange(pkgIndex, rowIndex, 'noOfPax', e.target.value)} className="w-24 p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/></td>
//                                                     <td className="px-4 py-2"><input type="number" value={row.costPerPerson} onChange={(e) => handlePriceChange(pkgIndex, rowIndex, 'costPerPerson', e.target.value)} className="w-36 p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/></td>
//                                                     <td className="px-4 py-2 font-medium text-gray-900">{(Number(row.noOfPax) * Number(row.costPerPerson)).toLocaleString('en-IN')}</td>
//                                                     <td className="px-4 py-2 text-right"><button type="button" onClick={() => removePriceRow(pkgIndex, rowIndex)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4"/></button></td>
//                                                 </tr>
//                                             ))}
//                                             <tr className="font-semibold bg-[#F6F6FA]">
//                                                 <td className="px-4 py-3">Total Cost</td>
//                                                 <td className="px-4 py-3">{totalPax}</td>
//                                                 <td className="px-4 py-3"></td>
//                                                 <td className="px-4 py-3 text-gray-900">{totalCost.toLocaleString('en-IN')}</td>
//                                                 <td className="px-4 py-3"></td>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 </div>
//                                 <button type="button" onClick={() => addPriceRow(pkgIndex)} className="flex items-center gap-2 mt-4 text-sm text-[#10A4B0] hover:text-teal-700 font-semibold"><PlusCircle className="w-4 h-4"/> Add Row</button>
//                             </div>
                            
//                             <div className="bg-white px-6 py-6 border-t border-gray-200">
//                                 <div>
//                                     <h3 className="text-base font-medium text-gray-700 mb-4">Inclusions</h3>
//                                     <RichTextEditor content={pkg.inclusions} onUpdate={(html) => {
//                                         const newPkgs = [...pricingPackages]; newPkgs[pkgIndex].inclusions = html; setPricingPackages(newPkgs);
//                                     }} placeholder="Add inclusions for this package..." />
//                                 </div>
//                             </div>

//                             <div className="px-6 py-4 bg-gray-50 flex flex-wrap justify-end items-center gap-4 border-t border-gray-200">
//                                 <span className="text-lg font-bold text-gray-800">Total Package Cost: INR {totalCost.toLocaleString('en-IN')}</span>
//                                 <button onClick={() => handleViewAndBook(pkg.packageName)} className="px-6 py-2 bg-[#10A4B0] text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors">View Online and Book</button>
//                             </div>
//                         </div>
//                     );
//                 })}
                
//                 <div className="flex justify-center mb-8">
//                      <button type="button" onClick={addPackage} className="px-6 py-2 bg-white text-[#10A4B0] border border-[#10A4B0] font-semibold rounded-lg hover:bg-teal-50 flex items-center gap-2 transition-colors"><PlusCircle className="w-5 h-5"/> Add Another Package</button>
//                 </div>

//                 <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 grid md:grid-cols-2 gap-8 mb-8">
//                     <div>
//                         <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-[#10A4B0]"/> Available Payment Methods</h3>
//                          <input type="text" value={paymentMethods} onChange={(e) => setPaymentMethods(e.target.value)} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent" placeholder="e.g. Credit Card, UPI"/>
//                         <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5 text-[#10A4B0]"/> Payment Terms</h3>
//                         <RichTextEditor content={paymentTerms} onUpdate={setPaymentTerms} placeholder="Enter payment terms..."/>
//                     </div>
//                      <div>
//                         <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2"><Landmark className="w-5 h-5 text-[#10A4B0]"/> Bank Details for Transfer</h3>
//                         <div className="space-y-4">
//                              <div><label className="block text-xs font-medium text-gray-700 mb-1">Bank & Branch Name</label><input type="text" value={bankDetails.bankName} onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/></div>
//                              <div><label className="block text-xs font-medium text-gray-700 mb-1">Account No.</label><input type="text" value={bankDetails.accountNumber} onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/></div>
//                              <div><label className="block text-xs font-medium text-gray-700 mb-1">IFSC Code</label><input type="text" value={bankDetails.ifscCode} onChange={(e) => setBankDetails({...bankDetails, ifscCode: e.target.value})} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/></div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="flex justify-center">
//                     <button type="button" onClick={handleSubmit} disabled={isSubmitting} className={`px-8 py-3 text-white font-semibold rounded-lg transition-colors text-base ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#10A4B0] hover:bg-teal-700'}`}>
//                         {isSubmitting ? 'Saving...' : 'Confirm & Save All Details'}
//                     </button>
//                 </div>
//                  {submitStatus === 'success' && <p className="text-green-600 text-center font-medium text-sm mt-4">All pricing details have been saved successfully!</p>}
//             </div>
//         </div>
//     );
// }




// //saving data v2
// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { Bold, Italic, Underline, List, ListOrdered, Trash2, PlusCircle, DollarSign, CreditCard, Landmark } from 'lucide-react';

// // --- TYPE DEFINITIONS ---
// interface PriceRow {
//   id: string;
//   paxType: string;
//   noOfPax: number;
//   costPerPerson: number;
// }

// interface BankDetails {
//   bankName: string;
//   accountNumber: string;
//   ifscCode: string;
// }

// interface PricingPackage {
//   id: string;
//   packageName: string;
//   priceDetails: PriceRow[];
//   inclusions: string;
//   totalCost?: number; // Added totalCost to the interface
// }

// // --- RICH TEXT EDITOR COMPONENT ---
// interface RichTextEditorProps {
//   content: string;
//   onUpdate: (html: string) => void;
//   placeholder?: string;
// }

// const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onUpdate, placeholder }) => {
//   const editorRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (editorRef.current && editorRef.current.innerHTML !== content) {
//       editorRef.current.innerHTML = content;
//     }
//   }, [content]);

//   const handleInput = useCallback(() => {
//     if (editorRef.current) onUpdate(editorRef.current.innerHTML);
//   }, [onUpdate]);

//   const execCommand = (command: string) => {
//     document.execCommand(command, false);
//     editorRef.current?.focus();
//     handleInput();
//   };

//   return (
//     <div className="border border-gray-200 rounded-lg overflow-hidden bg-[#F6F6FA]">
//       <div className="flex items-center flex-wrap gap-1 p-2 bg-white border-b border-gray-200">
//         <button type="button" onClick={() => execCommand('bold')} className="p-2 rounded hover:bg-gray-100" title="Bold"><Bold className="w-4 h-4 text-gray-600" /></button>
//         <button type="button" onClick={() => execCommand('italic')} className="p-2 rounded hover:bg-gray-100" title="Italic"><Italic className="w-4 h-4 text-gray-600" /></button>
//         <button type="button" onClick={() => execCommand('underline')} className="p-2 rounded hover:bg-gray-100" title="Underline"><Underline className="w-4 h-4 text-gray-600" /></button>
//         <button type="button" onClick={() => execCommand('insertUnorderedList')} className="p-2 rounded hover:bg-gray-100" title="Bullet List"><List className="w-4 h-4 text-gray-600" /></button>
//         <button type="button" onClick={() => execCommand('insertOrderedList')} className="p-2 rounded hover:bg-gray-100" title="Numbered List"><ListOrdered className="w-4 h-4 text-gray-600" /></button>
//       </div>
//       <div
//         ref={editorRef}
//         contentEditable
//         className="prose w-full max-w-none p-3 text-sm min-h-[120px] focus:outline-none"
//         onInput={handleInput}
//         suppressContentEditableWarning={true}
//         data-placeholder={placeholder}
//       />
//       <style>{`
//         [contenteditable]:empty::before { content: attr(data-placeholder); color: #9CA3AF; pointer-events: none; }
//         .prose ul, .prose ol { padding-left: 20px; margin-left: 0; }
//       `}</style>
//     </div>
//   );
// };

// // --- MAIN PRICING PAGE COMPONENT ---
// export default function PricingPage() {
//     const [pricingPackages, setPricingPackages] = useState<PricingPackage[]>([]);
//     const [paymentMethods, setPaymentMethods] = useState<string>('Credit Card, Bank Transfer, UPI');
//     const [paymentTerms, setPaymentTerms] = useState<string>('<p><b>50% advance payment</b> required to confirm the booking.</p><p>Remaining 50% to be paid 15 days prior to the travel date.</p>');
//     const [bankDetails, setBankDetails] = useState<BankDetails>({ bankName: "", accountNumber: "", ifscCode: "" });
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');
//     const [isLoaded, setIsLoaded] = useState(false);

//     // Load existing data from sessionStorage on mount, or initialize with a template.
//     useEffect(() => {
//         try {
//             const savedDataString = sessionStorage.getItem('pricingDetails');
//             if (savedDataString) {
//                 const savedData = JSON.parse(savedDataString);
//                 setPricingPackages(savedData.pricingPackages || []);
//                 setPaymentMethods(savedData.paymentMethods || 'Credit Card, Bank Transfer, UPI');
//                 setPaymentTerms(savedData.paymentTerms || '<p><b>50% advance payment</b> required...</p>');
//                 setBankDetails(savedData.bankDetails || { bankName: "", accountNumber: "", ifscCode: "" });
//                 setIsLoaded(true);
//                 return;
//             }
//         } catch (error) {
//             console.error("Failed to load pricing data from sessionStorage:", error);
//         }

//         // Fallback to starter template if no data is found
//         const starterTemplate: PricingPackage[] = [
//             {
//                 id: crypto.randomUUID(),
//                 packageName: 'Economy Saver: Paris & Rome',
//                 priceDetails: [
//                     { id: crypto.randomUUID(), paxType: 'Adult Twin Sharing', noOfPax: 2, costPerPerson: 85000 },
//                     { id: crypto.randomUUID(), paxType: 'Child With Bed', noOfPax: 1, costPerPerson: 60000 },
//                 ],
//                 inclusions: '<ul><li>Return flight tickets.</li><li>3-star hotel stay with breakfast.</li><li>Airport transfers.</li></ul>'
//             }
//         ];
//         setPricingPackages(starterTemplate);
//         setIsLoaded(true);
//     }, []);

//     const handlePriceChange = (pkgIndex: number, rowIndex: number, field: keyof PriceRow, value: string | number) => {
//         const newPackages = [...pricingPackages];
//         const targetRow = newPackages[pkgIndex].priceDetails[rowIndex];
//         if (field === 'noOfPax' || field === 'costPerPerson') {
//             (targetRow as any)[field] = Number(value) < 0 ? 0 : Number(value);
//         } else {
//             (targetRow as any)[field] = value;
//         }
//         setPricingPackages(newPackages);
//     };

//     const addPriceRow = (pkgIndex: number) => {
//         const newPackages = [...pricingPackages];
//         newPackages[pkgIndex].priceDetails.push({ id: crypto.randomUUID(), paxType: 'Adult Extra Bed', noOfPax: 1, costPerPerson: 0 });
//         setPricingPackages(newPackages);
//     };

//     const removePriceRow = (pkgIndex: number, rowIndex: number) => {
//         const newPackages = [...pricingPackages];
//         if (newPackages[pkgIndex].priceDetails.length > 1) {
//             newPackages[pkgIndex].priceDetails.splice(rowIndex, 1);
//             setPricingPackages(newPackages);
//         } else {
//             alert("Each package must have at least one price row.");
//         }
//     };
    
//     const calculateTotal = (pkg: PricingPackage) => {
//         const totalPax = pkg.priceDetails.reduce((sum, row) => sum + Number(row.noOfPax || 0), 0);
//         const totalCost = pkg.priceDetails.reduce((sum, row) => sum + (Number(row.noOfPax || 0) * Number(row.costPerPerson || 0)), 0);
//         return { totalPax, totalCost };
//     };
    
//     const addPackage = () => {
//         const newPackage: PricingPackage = {
//             id: crypto.randomUUID(),
//             packageName: 'New Custom Package',
//             priceDetails: [{ id: crypto.randomUUID(), paxType: 'Adult', noOfPax: 2, costPerPerson: 0 }],
//             inclusions: '<ul><li></li></ul>'
//         };
//         setPricingPackages([...pricingPackages, newPackage]);
//     };
    
//     const removePackage = (pkgIndex: number) => {
//         if (pricingPackages.length > 1) {
//              setPricingPackages(pricingPackages.filter((_, index) => index !== pkgIndex));
//         } else {
//             alert("You must have at least one pricing package.");
//         }
//     };

//     const handleSubmit = () => {
//         setIsSubmitting(true);
        
//         // Create a new array of packages that includes the calculated total cost for saving
//         const packagesToSave = pricingPackages.map(pkg => {
//             const { totalCost } = calculateTotal(pkg);
//             return {
//                 ...pkg,
//                 totalCost: totalCost // Explicitly add the calculated totalCost
//             };
//         });

//         const allPricingData = {
//             pricingPackages: packagesToSave, // Use the new array with totalCost
//             paymentMethods,
//             paymentTerms,
//             bankDetails
//         };

//         try {
//             sessionStorage.setItem('pricingDetails', JSON.stringify(allPricingData));
//             console.log("Saved Data:", allPricingData);
            
//             setTimeout(() => {
//                 setIsSubmitting(false);
//                 setSubmitStatus('success');
//                 setTimeout(() => setSubmitStatus('idle'), 3000);
//             }, 1000);

//         } catch (error) {
//             console.error("Failed to save pricing data:", error);
//             alert("An error occurred while saving the data.");
//             setIsSubmitting(false);
//         }
//     };
    
//     const handleViewAndBook = (packageName: string) => {
//         alert(`The "View Online and Book" button for the "${packageName}" package was clicked. This would typically lead to a booking page.`);
//     };

//     if (!isLoaded) {
//         return <div className="flex justify-center items-center h-screen bg-[#F6F6FA]">Loading Pricing Details...</div>;
//     }

//     return (
//         <div className="bg-[#F6F6FA] min-h-screen p-4 sm:p-6 lg:p-2 font-raleway">
//             <div className="max-w-6xl mx-auto">
//                 <h1 className="text-2xl font-semibold text-[#10A4B0] mb-6">Package Price Details</h1>
                
//                 {pricingPackages.map((pkg, pkgIndex) => {
//                     const { totalPax, totalCost } = calculateTotal(pkg);
//                     return (
//                         <div key={pkg.id} className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8 overflow-hidden relative">
//                              <button type="button" onClick={() => removePackage(pkgIndex)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 z-10" title="Delete Package">
//                                 <Trash2 className="w-5 h-5"/>
//                             </button>
//                             <div className="p-6">
//                                 <input type="text" value={pkg.packageName} onChange={(e) => {
//                                   const newPkgs = [...pricingPackages]; newPkgs[pkgIndex].packageName = e.target.value; setPricingPackages(newPkgs);
//                                 }} className="text-xl font-semibold text-gray-800 w-full border-none focus:ring-2 focus:ring-[#10A4B0] rounded p-2 -m-2 pr-12"/>
//                             </div>

//                             <div className="px-6 pb-6">
//                                 <h3 className="text-base font-medium text-gray-700 mb-4">Price Details</h3>
//                                 <div className="overflow-x-auto">
//                                     <table className="w-full text-sm text-left text-gray-600">
//                                         <thead className="text-xs text-gray-700 uppercase bg-[#F6F6FA]">
//                                             <tr>
//                                                 <th scope="col" className="px-4 py-3 font-medium min-w-[200px]">Pax Type</th>
//                                                 <th scope="col" className="px-4 py-3 font-medium">No of Pax</th>
//                                                 <th scope="col" className="px-4 py-3 font-medium">Cost Per Person (INR)</th>
//                                                 <th scope="col" className="px-4 py-3 font-medium">Total Cost (INR)</th>
//                                                 <th scope="col" className="px-4 py-3"></th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {pkg.priceDetails.map((row, rowIndex) => (
//                                                 <tr key={row.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
//                                                     <td className="px-4 py-2"><input type="text" value={row.paxType} onChange={(e) => handlePriceChange(pkgIndex, rowIndex, 'paxType', e.target.value)} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/></td>
//                                                     <td className="px-4 py-2"><input type="number" value={row.noOfPax} onChange={(e) => handlePriceChange(pkgIndex, rowIndex, 'noOfPax', e.target.value)} className="w-24 p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/></td>
//                                                     <td className="px-4 py-2"><input type="number" value={row.costPerPerson} onChange={(e) => handlePriceChange(pkgIndex, rowIndex, 'costPerPerson', e.target.value)} className="w-36 p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/></td>
//                                                     <td className="px-4 py-2 font-medium text-gray-900">{(Number(row.noOfPax) * Number(row.costPerPerson)).toLocaleString('en-IN')}</td>
//                                                     <td className="px-4 py-2 text-right"><button type="button" onClick={() => removePriceRow(pkgIndex, rowIndex)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4"/></button></td>
//                                                 </tr>
//                                             ))}
//                                             <tr className="font-semibold bg-[#F6F6FA]">
//                                                 <td className="px-4 py-3">Total Cost</td>
//                                                 <td className="px-4 py-3">{totalPax}</td>
//                                                 <td className="px-4 py-3"></td>
//                                                 <td className="px-4 py-3 text-gray-900">{totalCost.toLocaleString('en-IN')}</td>
//                                                 <td className="px-4 py-3"></td>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 </div>
//                                 <button type="button" onClick={() => addPriceRow(pkgIndex)} className="flex items-center gap-2 mt-4 text-sm text-[#10A4B0] hover:text-teal-700 font-semibold"><PlusCircle className="w-4 h-4"/> Add Row</button>
//                             </div>
                            
//                             <div className="bg-white px-6 py-6 border-t border-gray-200">
//                                 <div>
//                                     <h3 className="text-base font-medium text-gray-700 mb-4">Inclusions</h3>
//                                     <RichTextEditor content={pkg.inclusions} onUpdate={(html) => {
//                                         const newPkgs = [...pricingPackages]; newPkgs[pkgIndex].inclusions = html; setPricingPackages(newPkgs);
//                                     }} placeholder="Add inclusions for this package..." />
//                                 </div>
//                             </div>

//                             <div className="px-6 py-4 bg-gray-50 flex flex-wrap justify-end items-center gap-4 border-t border-gray-200">
//                                 <span className="text-lg font-bold text-gray-800">Total Package Cost: INR {totalCost.toLocaleString('en-IN')}</span>
//                                 <button onClick={() => handleViewAndBook(pkg.packageName)} className="px-6 py-2 bg-[#10A4B0] text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors">View Online and Book</button>
//                             </div>
//                         </div>
//                     );
//                 })}
                
//                 <div className="flex justify-center mb-8">
//                      <button type="button" onClick={addPackage} className="px-6 py-2 bg-white text-[#10A4B0] border border-[#10A4B0] font-semibold rounded-lg hover:bg-teal-50 flex items-center gap-2 transition-colors"><PlusCircle className="w-5 h-5"/> Add Another Package</button>
//                 </div>

//                 <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 grid md:grid-cols-2 gap-8 mb-8">
//                     <div>
//                         <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-[#10A4B0]"/> Available Payment Methods</h3>
//                          <input type="text" value={paymentMethods} onChange={(e) => setPaymentMethods(e.target.value)} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent" placeholder="e.g. Credit Card, UPI"/>
//                         <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5 text-[#10A4B0]"/> Payment Terms</h3>
//                         <RichTextEditor content={paymentTerms} onUpdate={setPaymentTerms} placeholder="Enter payment terms..."/>
//                     </div>
//                      <div>
//                         <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2"><Landmark className="w-5 h-5 text-[#10A4B0]"/> Bank Details for Transfer</h3>
//                         <div className="space-y-4">
//                              <div><label className="block text-xs font-medium text-gray-700 mb-1">Bank & Branch Name</label><input type="text" value={bankDetails.bankName} onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/></div>
//                              <div><label className="block text-xs font-medium text-gray-700 mb-1">Account No.</label><input type="text" value={bankDetails.accountNumber} onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/></div>
//                              <div><label className="block text-xs font-medium text-gray-700 mb-1">IFSC Code</label><input type="text" value={bankDetails.ifscCode} onChange={(e) => setBankDetails({...bankDetails, ifscCode: e.target.value})} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/></div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="flex justify-center">
//                     <button type="button" onClick={handleSubmit} disabled={isSubmitting} className={`px-8 py-3 text-white font-semibold rounded-lg transition-colors text-base ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#10A4B0] hover:bg-teal-700'}`}>
//                         {isSubmitting ? 'Saving...' : 'Confirm & Save All Details'}
//                     </button>
//                 </div>
//                  {submitStatus === 'success' && <p className="text-green-600 text-center font-medium text-sm mt-4">All pricing details have been saved successfully!</p>}
//             </div>
//         </div>
//     );
// }



// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { Bold, Italic, Underline, List, ListOrdered, Trash2, PlusCircle, DollarSign, CreditCard, Landmark } from 'lucide-react';

// // --- TYPE DEFINITIONS ---
// interface PriceRow {
//   id: string;
//   paxType: string;
//   noOfPax: number;
//   costPerPerson: number;
// }

// interface BankDetails {
//   bankName: string;
//   accountNumber: string;
//   ifscCode: string;
// }

// interface PricingPackage {
//   id: string;
//   packageName: string;
//   priceDetails: PriceRow[];
//   inclusions: string;
// }

// // --- RICH TEXT EDITOR COMPONENT ---
// interface RichTextEditorProps {
//   content: string;
//   onUpdate: (html: string) => void;
//   placeholder?: string;
// }

// const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onUpdate, placeholder }) => {
//   const editorRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (editorRef.current && editorRef.current.innerHTML !== content) {
//       editorRef.current.innerHTML = content;
//     }
//   }, [content]);

//   const handleInput = useCallback(() => {
//     if (editorRef.current) onUpdate(editorRef.current.innerHTML);
//   }, [onUpdate]);

//   const execCommand = (command: string) => {
//     document.execCommand(command, false);
//     editorRef.current?.focus();
//     handleInput();
//   };

//   return (
//     <div className="border border-gray-200 rounded-lg overflow-hidden bg-[#F6F6FA]">
//       <div className="flex items-center flex-wrap gap-1 p-2 bg-white border-b border-gray-200">
//         <button type="button" onClick={() => execCommand('bold')} className="p-2 rounded hover:bg-gray-100" title="Bold"><Bold className="w-4 h-4 text-gray-600" /></button>
//         <button type="button" onClick={() => execCommand('italic')} className="p-2 rounded hover:bg-gray-100" title="Italic"><Italic className="w-4 h-4 text-gray-600" /></button>
//         <button type="button" onClick={() => execCommand('underline')} className="p-2 rounded hover:bg-gray-100" title="Underline"><Underline className="w-4 h-4 text-gray-600" /></button>
//         <button type="button" onClick={() => execCommand('insertUnorderedList')} className="p-2 rounded hover:bg-gray-100" title="Bullet List"><List className="w-4 h-4 text-gray-600" /></button>
//         <button type="button" onClick={() => execCommand('insertOrderedList')} className="p-2 rounded hover:bg-gray-100" title="Numbered List"><ListOrdered className="w-4 h-4 text-gray-600" /></button>
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
//         [contenteditable]:empty::before { content: attr(data-placeholder); color: #9CA3AF; pointer-events: none; }
//         .prose ul, .prose ol { padding-left: 20px; margin-left: 0; }
//       `}</style>
//     </div>
//   );
// };

// // --- MAIN PRICING PAGE COMPONENT ---
// export default function App() {
//     const [pricingPackages, setPricingPackages] = useState<PricingPackage[]>([]);
//     const [paymentMethods, setPaymentMethods] = useState<string>('Credit Card, Bank Transfer, UPI');
//     const [paymentTerms, setPaymentTerms] = useState<string>('<p><b>50% advance payment</b> required to confirm the booking.</p><p>Remaining 50% to be paid 15 days prior to the travel date.</p>');
//     const [bankDetails, setBankDetails] = useState<BankDetails>({ bankName: "", accountNumber: "", ifscCode: "" });
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');

//     useEffect(() => {
//         // Initialize with a high-quality starter template
//         const starterTemplate: PricingPackage[] = [
//             {
//                 id: crypto.randomUUID(),
//                 packageName: 'Economy Saver: Paris & Rome',
//                 priceDetails: [
//                     { id: crypto.randomUUID(), paxType: 'Adult Twin Sharing', noOfPax: 2, costPerPerson: 85000 },
//                     { id: crypto.randomUUID(), paxType: 'Child With Bed', noOfPax: 1, costPerPerson: 60000 },
//                 ],
//                 inclusions: '<ul><li>Return flight tickets.</li><li>3-star hotel stay with breakfast.</li><li>Airport transfers.</li></ul>'
//             },
//             {
//                 id: crypto.randomUUID(),
//                 packageName: 'Premium All-Inclusive: London',
//                 priceDetails: [
//                     { id: crypto.randomUUID(), paxType: 'Adult Twin Sharing', noOfPax: 2, costPerPerson: 150000 },
//                 ],
//                 inclusions: '<ul><li>Business class flight tickets.</li><li>5-star hotel stay with all meals.</li><li>Private airport transfers.</li><li>City tour included.</li></ul>'
//             }
//         ];
//         setPricingPackages(starterTemplate);
//     }, []);

//     const handlePriceChange = (pkgIndex: number, rowIndex: number, field: keyof PriceRow, value: string | number) => {
//         const newPackages = [...pricingPackages];
//         const targetRow = newPackages[pkgIndex].priceDetails[rowIndex];
//         if (field === 'noOfPax' || field === 'costPerPerson') {
//             (targetRow as any)[field] = Number(value) < 0 ? 0 : Number(value);
//         } else {
//             (targetRow as any)[field] = value;
//         }
//         setPricingPackages(newPackages);
//     };

//     const addPriceRow = (pkgIndex: number) => {
//         const newPackages = [...pricingPackages];
//         newPackages[pkgIndex].priceDetails.push({ id: crypto.randomUUID(), paxType: 'Adult Extra Bed', noOfPax: 1, costPerPerson: 0 });
//         setPricingPackages(newPackages);
//     };

//     const removePriceRow = (pkgIndex: number, rowIndex: number) => {
//         const newPackages = [...pricingPackages];
//         if (newPackages[pkgIndex].priceDetails.length > 1) {
//             newPackages[pkgIndex].priceDetails.splice(rowIndex, 1);
//             setPricingPackages(newPackages);
//         } else {
//             alert("Each package must have at least one price row.");
//         }
//     };
    
//     const calculateTotal = (pkg: PricingPackage) => {
//         const totalPax = pkg.priceDetails.reduce((sum, row) => sum + Number(row.noOfPax || 0), 0);
//         const totalCost = pkg.priceDetails.reduce((sum, row) => sum + (Number(row.noOfPax || 0) * Number(row.costPerPerson || 0)), 0);
//         return { totalPax, totalCost };
//     };
    
//     const addPackage = () => {
//         const newPackage: PricingPackage = {
//             id: crypto.randomUUID(),
//             packageName: 'New Custom Package',
//             priceDetails: [{ id: crypto.randomUUID(), paxType: 'Adult', noOfPax: 2, costPerPerson: 0 }],
//             inclusions: '<ul><li></li></ul>'
//         };
//         setPricingPackages([...pricingPackages, newPackage]);
//     };
    
//     const removePackage = (pkgIndex: number) => {
//         if (pricingPackages.length > 1) {
//              setPricingPackages(pricingPackages.filter((_, index) => index !== pkgIndex));
//         } else {
//             alert("You must have at least one pricing package.");
//         }
//     };


//     const handleSubmit = () => {
//         setIsSubmitting(true);
//         console.log("Submitting Data:", { pricingPackages, paymentMethods, paymentTerms, bankDetails });
//         setTimeout(() => {
//             setIsSubmitting(false);
//             setSubmitStatus('success');
//             setTimeout(() => setSubmitStatus('idle'), 3000);
//         }, 1500);
//     };

//     if (pricingPackages.length === 0) {
//         return <div className="flex justify-center items-center h-screen bg-[#F6F6FA]">Loading Pricing Details...</div>;
//     }

//     return (
//         <div className="bg-[#F6F6FA] min-h-screen p-4 sm:p-6 lg:p-2 font-raleway">
//             <div className="max-w-6xl mx-auto">
//                 <h1 className="text-2xl font-semibold text-[#10A4B0] mb-6">Package Price Details</h1>
                
//                 {pricingPackages.map((pkg, pkgIndex) => {
//                     const { totalPax, totalCost } = calculateTotal(pkg);
//                     return (
//                         <div key={pkg.id} className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8 overflow-hidden relative">
//                              <button onClick={() => removePackage(pkgIndex)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 z-10" title="Delete Package">
//                                 <Trash2 className="w-5 h-5"/>
//                             </button>
//                             <div className="p-6">
//                                 <input type="text" value={pkg.packageName} onChange={(e) => {
//                                   const newPkgs = [...pricingPackages]; newPkgs[pkgIndex].packageName = e.target.value; setPricingPackages(newPkgs);
//                                 }} className="text-xl font-semibold text-gray-800 w-full border-none focus:ring-2 focus:ring-[#10A4B0] rounded p-2 -m-2 pr-12"/>
//                             </div>

//                             {/* Price Details Table */}
//                             <div className="px-6 pb-6">
//                                 <h3 className="text-base font-medium text-gray-700 mb-4">Price Details</h3>
//                                 <div className="overflow-x-auto">
//                                     <table className="w-full text-sm text-left text-gray-600">
//                                         <thead className="text-xs text-gray-700 uppercase bg-[#F6F6FA]">
//                                             <tr>
//                                                 <th scope="col" className="px-4 py-3 font-medium min-w-[200px]">Pax Type</th>
//                                                 <th scope="col" className="px-4 py-3 font-medium">No of Pax</th>
//                                                 <th scope="col" className="px-4 py-3 font-medium">Cost Per Person (INR)</th>
//                                                 <th scope="col" className="px-4 py-3 font-medium">Total Cost (INR)</th>
//                                                 <th scope="col" className="px-4 py-3"></th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {pkg.priceDetails.map((row, rowIndex) => (
//                                                 <tr key={row.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
//                                                     <td className="px-4 py-2"><input type="text" value={row.paxType} onChange={(e) => handlePriceChange(pkgIndex, rowIndex, 'paxType', e.target.value)} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/></td>
//                                                     <td className="px-4 py-2"><input type="number" value={row.noOfPax} onChange={(e) => handlePriceChange(pkgIndex, rowIndex, 'noOfPax', e.target.value)} className="w-24 p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/></td>
//                                                     <td className="px-4 py-2"><input type="number" value={row.costPerPerson} onChange={(e) => handlePriceChange(pkgIndex, rowIndex, 'costPerPerson', e.target.value)} className="w-36 p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/></td>
//                                                     <td className="px-4 py-2 font-medium text-gray-900">{(Number(row.noOfPax) * Number(row.costPerPerson)).toLocaleString('en-IN')}</td>
//                                                     <td className="px-4 py-2 text-right"><button onClick={() => removePriceRow(pkgIndex, rowIndex)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4"/></button></td>
//                                                 </tr>
//                                             ))}
//                                             <tr className="font-semibold bg-[#F6F6FA]">
//                                                 <td className="px-4 py-3">Total Cost</td>
//                                                 <td className="px-4 py-3">{totalPax}</td>
//                                                 <td className="px-4 py-3"></td>
//                                                 <td className="px-4 py-3 text-gray-900">{totalCost.toLocaleString('en-IN')}</td>
//                                                 <td className="px-4 py-3"></td>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 </div>
//                                 <button onClick={() => addPriceRow(pkgIndex)} className="flex items-center gap-2 mt-4 text-sm text-[#10A4B0] hover:text-teal-700 font-semibold"><PlusCircle className="w-4 h-4"/> Add Row</button>
//                             </div>
                            
//                             <div className="bg-white px-6 py-6 border-t border-gray-200">
//                                 <div>
//                                     <h3 className="text-base font-medium text-gray-700 mb-4">Inclusions</h3>
//                                     <RichTextEditor content={pkg.inclusions} onUpdate={(html) => {
//                                         const newPkgs = [...pricingPackages]; newPkgs[pkgIndex].inclusions = html; setPricingPackages(newPkgs);
//                                     }} placeholder="Add inclusions for this package..." />
//                                 </div>
//                             </div>

//                             <div className="px-6 py-4 bg-gray-50 flex flex-wrap justify-end items-center gap-4 border-t border-gray-200">
//                                 <span className="text-lg font-bold text-gray-800">Total Package Cost: INR {totalCost.toLocaleString('en-IN')}</span>
//                                 {/* <button className="px-6 py-2 bg-[#10A4B0] text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors">View Online and Book</button> */}
//                             </div>
//                         </div>
//                     );
//                 })}
                
//                 <div className="flex justify-center mb-8">
//                      <button onClick={addPackage} className="px-6 py-2 bg-white text-[#10A4B0] border border-[#10A4B0] font-semibold rounded-lg hover:bg-teal-50 flex items-center gap-2 transition-colors"><PlusCircle className="w-5 h-5"/> Add Another Package</button>
//                 </div>

//                  {/* Payment & Bank Details */}
//                 <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 grid md:grid-cols-2 gap-8 mb-8">
//                     <div>
//                         <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-[#10A4B0]"/> Available Payment Methods</h3>
//                          <input type="text" value={paymentMethods} onChange={(e) => setPaymentMethods(e.target.value)} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent" placeholder="e.g. Credit Card, UPI"/>
//                         <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5 text-[#10A4B0]"/> Payment Terms</h3>
//                         <RichTextEditor content={paymentTerms} onUpdate={setPaymentTerms} placeholder="Enter payment terms..."/>
//                     </div>
//                      <div>
//                         <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2"><Landmark className="w-5 h-5 text-[#10A4B0]"/> Bank Details for Transfer</h3>
//                         <div className="space-y-4">
//                              <div><label className="block text-xs font-medium text-gray-700 mb-1">Bank & Branch Name</label><input type="text" value={bankDetails.bankName} onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/></div>
//                              <div><label className="block text-xs font-medium text-gray-700 mb-1">Account No.</label><input type="text" value={bankDetails.accountNumber} onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/></div>
//                              <div><label className="block text-xs font-medium text-gray-700 mb-1">IFSC Code</label><input type="text" value={bankDetails.ifscCode} onChange={(e) => setBankDetails({...bankDetails, ifscCode: e.target.value})} className="w-full p-2 bg-[#F6F6FA] rounded-md text-sm border border-gray-200 focus:ring-2 focus:ring-[#10A4B0] focus:border-transparent"/></div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="flex justify-center">
//                     <button onClick={handleSubmit} disabled={isSubmitting} className={`px-8 py-3 text-white font-semibold rounded-lg transition-colors text-base ${isSubmitting ? 'bg-gray-400' : 'bg-[#10A4B0] hover:bg-teal-700'}`}>
//                         {isSubmitting ? 'Submitting...' : 'Confirm & Save All Details'}
//                     </button>
//                 </div>
//                  {submitStatus === 'success' && <p className="text-green-600 text-center font-medium text-sm mt-4">All pricing details have been saved successfully!</p>}
//             </div>
//         </div>
//     );
// }




// ///v2 fetch from createdItinerary
// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { Bold, Italic, Underline, List, ListOrdered, Trash2, PlusCircle, DollarSign, CreditCard, Landmark } from 'lucide-react';

// // --- TYPE DEFINITIONS ---
// interface PriceRow {
//   id: string;
//   paxType: string;
//   noOfPax: number;
//   costPerPerson: number;
// }

// interface BankDetails {
//   bankName: string;
//   accountNumber: string;
//   ifscCode: string;
// }

// interface PricingPackage {
//   id: string;
//   packageName: string;
//   priceDetails: PriceRow[];
//   inclusions: string;
// }

// // --- RICH TEXT EDITOR COMPONENT ---
// interface RichTextEditorProps {
//   content: string;
//   onUpdate: (html: string) => void;
//   placeholder?: string;
// }

// const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onUpdate, placeholder }) => {
//   const editorRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (editorRef.current && editorRef.current.innerHTML !== content) {
//       editorRef.current.innerHTML = content;
//     }
//   }, [content]);

//   const handleInput = useCallback(() => {
//     if (editorRef.current) onUpdate(editorRef.current.innerHTML);
//   }, [onUpdate]);

//   const execCommand = (command: string) => {
//     document.execCommand(command, false);
//     editorRef.current?.focus();
//     handleInput();
//   };

//   return (
//     <div className="border border-gray-300 rounded-lg overflow-hidden">
//       <div className="flex items-center flex-wrap gap-1 p-2 bg-gray-50 border-b">
//         <button type="button" onClick={() => execCommand('bold')} className="p-2 rounded hover:bg-gray-200" title="Bold"><Bold className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('italic')} className="p-2 rounded hover:bg-gray-200" title="Italic"><Italic className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('underline')} className="p-2 rounded hover:bg-gray-200" title="Underline"><Underline className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('insertUnorderedList')} className="p-2 rounded hover:bg-gray-200" title="Bullet List"><List className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('insertOrderedList')} className="p-2 rounded hover:bg-gray-200" title="Numbered List"><ListOrdered className="w-4 h-4" /></button>
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
//         [contenteditable]:empty::before { content: attr(data-placeholder); color: #9CA3AF; pointer-events: none; }
//         .prose ul, .prose ol { padding-left: 20px; margin-left: 0; }
//       `}</style>
//     </div>
//   );
// };

// // --- MAIN PRICING PAGE COMPONENT ---
// export default function App() {
//     const [pricingPackages, setPricingPackages] = useState<PricingPackage[]>([]);
//     const [paymentMethods, setPaymentMethods] = useState<string>('Credit Card, Bank Transfer, UPI');
//     const [paymentTerms, setPaymentTerms] = useState<string>('<p>50% advance payment required to confirm the booking.</p><p>Remaining 50% to be paid 15 days prior to the travel date.</p>');
//     const [bankDetails, setBankDetails] = useState<BankDetails>({ bankName: "", accountNumber: "", ifscCode: "" });
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');

//     useEffect(() => {
//         // Initialize with a high-quality starter template
//         const starterTemplate: PricingPackage[] = [
//             {
//                 id: crypto.randomUUID(),
//                 packageName: 'Economy Saver: Paris & Rome',
//                 priceDetails: [
//                     { id: crypto.randomUUID(), paxType: 'Adult Twin Sharing', noOfPax: 2, costPerPerson: 85000 },
//                     { id: crypto.randomUUID(), paxType: 'Child With Bed', noOfPax: 1, costPerPerson: 60000 },
//                 ],
//                 inclusions: '<ul><li>Return flight tickets.</li><li>3-star hotel stay with breakfast.</li><li>Airport transfers.</li></ul>'
//             },
//             {
//                 id: crypto.randomUUID(),
//                 packageName: 'Premium All-Inclusive: London',
//                 priceDetails: [
//                     { id: crypto.randomUUID(), paxType: 'Adult Twin Sharing', noOfPax: 2, costPerPerson: 150000 },
//                 ],
//                 inclusions: '<ul><li>Business class flight tickets.</li><li>5-star hotel stay with all meals.</li><li>Private airport transfers.</li><li>City tour included.</li></ul>'
//             }
//         ];
//         setPricingPackages(starterTemplate);
//     }, []);

//     const handlePriceChange = (pkgIndex: number, rowIndex: number, field: keyof PriceRow, value: string | number) => {
//         const newPackages = [...pricingPackages];
//         const targetRow = newPackages[pkgIndex].priceDetails[rowIndex];
//         if (field === 'noOfPax' || field === 'costPerPerson') {
//             (targetRow as any)[field] = Number(value) < 0 ? 0 : Number(value);
//         } else {
//             (targetRow as any)[field] = value;
//         }
//         setPricingPackages(newPackages);
//     };

//     const addPriceRow = (pkgIndex: number) => {
//         const newPackages = [...pricingPackages];
//         newPackages[pkgIndex].priceDetails.push({ id: crypto.randomUUID(), paxType: 'Adult Extra Bed', noOfPax: 1, costPerPerson: 0 });
//         setPricingPackages(newPackages);
//     };

//     const removePriceRow = (pkgIndex: number, rowIndex: number) => {
//         const newPackages = [...pricingPackages];
//         if (newPackages[pkgIndex].priceDetails.length > 1) {
//             newPackages[pkgIndex].priceDetails.splice(rowIndex, 1);
//             setPricingPackages(newPackages);
//         } else {
//             alert("Each package must have at least one price row.");
//         }
//     };
    
//     const calculateTotal = (pkg: PricingPackage) => {
//         const totalPax = pkg.priceDetails.reduce((sum, row) => sum + Number(row.noOfPax || 0), 0);
//         const totalCost = pkg.priceDetails.reduce((sum, row) => sum + (Number(row.noOfPax || 0) * Number(row.costPerPerson || 0)), 0);
//         return { totalPax, totalCost };
//     };
    
//     const addPackage = () => {
//         const newPackage: PricingPackage = {
//             id: crypto.randomUUID(),
//             packageName: 'New Custom Package',
//             priceDetails: [{ id: crypto.randomUUID(), paxType: 'Adult', noOfPax: 2, costPerPerson: 0 }],
//             inclusions: '<ul><li></li></ul>'
//         };
//         setPricingPackages([...pricingPackages, newPackage]);
//     };
    
//     const removePackage = (pkgIndex: number) => {
//         if (pricingPackages.length > 1) {
//              setPricingPackages(pricingPackages.filter((_, index) => index !== pkgIndex));
//         } else {
//             alert("You must have at least one pricing package.");
//         }
//     };


//     const handleSubmit = () => {
//         setIsSubmitting(true);
//         console.log("Submitting Data:", { pricingPackages, paymentMethods, paymentTerms, bankDetails });
//         setTimeout(() => {
//             setIsSubmitting(false);
//             setSubmitStatus('success');
//             setTimeout(() => setSubmitStatus('idle'), 3000);
//         }, 1500);
//     };

//     if (pricingPackages.length === 0) {
//         return <div className="flex justify-center items-center h-screen bg-gray-100">Loading Pricing Details...</div>;
//     }

//     return (
//         <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
//             <div className="max-w-6xl mx-auto">
//                 <h1 className="text-3xl font-bold text-teal-700 mb-6">Package Price Details</h1>
                
//                 {pricingPackages.map((pkg, pkgIndex) => {
//                     const { totalPax, totalCost } = calculateTotal(pkg);
//                     return (
//                         <div key={pkg.id} className="bg-white shadow-lg rounded-xl mb-8 overflow-hidden relative">
//                              <button onClick={() => removePackage(pkgIndex)} className="absolute top-4 right-4 text-gray-400 hover:text-red-600 z-10" title="Delete Package">
//                                 <Trash2 className="w-5 h-5"/>
//                             </button>
//                             <div className="p-6">
//                                 <input type="text" value={pkg.packageName} onChange={(e) => {
//                                   const newPkgs = [...pricingPackages]; newPkgs[pkgIndex].packageName = e.target.value; setPricingPackages(newPkgs);
//                                 }} className="text-2xl font-semibold text-gray-800 w-full border-none focus:ring-2 focus:ring-teal-200 rounded p-1 -m-1 pr-10"/>
//                             </div>

//                             {/* Price Details Table */}
//                             <div className="px-6 pb-6">
//                                 <h3 className="text-lg font-semibold text-gray-700 mb-4">Price Details</h3>
//                                 <div className="overflow-x-auto">
//                                     <table className="w-full text-sm text-left text-gray-600">
//                                         <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                                             <tr>
//                                                 <th scope="col" className="px-4 py-3 min-w-[200px]">Pax Type</th>
//                                                 <th scope="col" className="px-4 py-3">No of Pax</th>
//                                                 <th scope="col" className="px-4 py-3">Cost Per Person (INR)</th>
//                                                 <th scope="col" className="px-4 py-3">Total Cost (INR)</th>
//                                                 <th scope="col" className="px-4 py-3"></th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {pkg.priceDetails.map((row, rowIndex) => (
//                                                 <tr key={row.id} className="bg-white border-b hover:bg-gray-50">
//                                                     <td className="px-4 py-2"><input type="text" value={row.paxType} onChange={(e) => handlePriceChange(pkgIndex, rowIndex, 'paxType', e.target.value)} className="w-full p-2 border rounded-md"/></td>
//                                                     <td className="px-4 py-2"><input type="number" value={row.noOfPax} onChange={(e) => handlePriceChange(pkgIndex, rowIndex, 'noOfPax', e.target.value)} className="w-24 p-2 border rounded-md"/></td>
//                                                     <td className="px-4 py-2"><input type="number" value={row.costPerPerson} onChange={(e) => handlePriceChange(pkgIndex, rowIndex, 'costPerPerson', e.target.value)} className="w-36 p-2 border rounded-md"/></td>
//                                                     <td className="px-4 py-2 font-medium text-gray-900">{(Number(row.noOfPax) * Number(row.costPerPerson)).toLocaleString('en-IN')}</td>
//                                                     <td className="px-4 py-2 text-right"><button onClick={() => removePriceRow(pkgIndex, rowIndex)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4"/></button></td>
//                                                 </tr>
//                                             ))}
//                                             <tr className="font-semibold bg-gray-50">
//                                                 <td className="px-4 py-3">Total Cost</td>
//                                                 <td className="px-4 py-3">{totalPax}</td>
//                                                 <td className="px-4 py-3"></td>
//                                                 <td className="px-4 py-3 text-gray-900">{totalCost.toLocaleString('en-IN')}</td>
//                                                 <td className="px-4 py-3"></td>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 </div>
//                                 <button onClick={() => addPriceRow(pkgIndex)} className="flex items-center gap-2 mt-4 text-sm text-teal-600 hover:text-teal-800 font-medium"><PlusCircle className="w-4 h-4"/> Add Row</button>
//                             </div>
                            
//                             <div className="bg-blue-50/50 px-6 py-6 border-t">
//                                 {/* Inclusions */}
//                                 <div>
//                                     <h3 className="text-lg font-semibold text-gray-700 mb-4">Inclusions</h3>
//                                     <RichTextEditor content={pkg.inclusions} onUpdate={(html) => {
//                                         const newPkgs = [...pricingPackages]; newPkgs[pkgIndex].inclusions = html; setPricingPackages(newPkgs);
//                                     }} placeholder="Add inclusions for this package..." />
//                                 </div>
//                             </div>

//                             <div className="px-6 py-4 bg-gray-100 flex justify-end items-center gap-4">
//                                 <span className="text-lg font-bold text-gray-800">Total Package Cost: INR {totalCost.toLocaleString('en-IN')}</span>
//                                 <button className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700">View Online and Book</button>
//                             </div>
//                         </div>
//                     );
//                 })}
                
//                 <div className="flex justify-center mb-8">
//                      <button onClick={addPackage} className="px-6 py-2 bg-white text-teal-600 border border-teal-500 font-semibold rounded-lg hover:bg-teal-50 flex items-center gap-2"><PlusCircle className="w-5 h-5"/> Add Another Package</button>
//                 </div>

//                  {/* Payment & Bank Details */}
//                 <div className="bg-white shadow-lg rounded-xl p-6 grid md:grid-cols-2 gap-8 mb-8">
//                     <div>
//                         <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-teal-600"/> Available Payment Methods</h3>
//                          <input type="text" value={paymentMethods} onChange={(e) => setPaymentMethods(e.target.value)} className="w-full p-2 border rounded-lg" placeholder="e.g. Credit Card, UPI"/>
//                         <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5 text-teal-600"/> Payment Terms</h3>
//                         <RichTextEditor content={paymentTerms} onUpdate={setPaymentTerms} placeholder="Enter payment terms..."/>
//                     </div>
//                      <div>
//                         <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2"><Landmark className="w-5 h-5 text-teal-600"/> Bank Details for Transfer</h3>
//                         <div className="space-y-4">
//                              <div><label className="block text-sm font-medium text-gray-700 mb-1">Bank & Branch Name</label><input type="text" value={bankDetails.bankName} onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})} className="w-full p-2 border rounded-lg"/></div>
//                              <div><label className="block text-sm font-medium text-gray-700 mb-1">Account No.</label><input type="text" value={bankDetails.accountNumber} onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})} className="w-full p-2 border rounded-lg"/></div>
//                              <div><label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label><input type="text" value={bankDetails.ifscCode} onChange={(e) => setBankDetails({...bankDetails, ifscCode: e.target.value})} className="w-full p-2 border rounded-lg"/></div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="flex justify-center">
//                     <button onClick={handleSubmit} disabled={isSubmitting} className={`px-8 py-3 text-white font-semibold rounded-lg transition-colors ${isSubmitting ? 'bg-gray-400' : 'bg-teal-600 hover:bg-teal-700'}`}>
//                         {isSubmitting ? 'Submitting...' : 'Confirm & Save All Details'}
//                     </button>
//                 </div>
//                  {submitStatus === 'success' && <p className="text-green-600 text-center text-sm mt-4">All pricing details have been saved successfully!</p>}
//             </div>
//         </div>
//     );
// }





//v1
// import React, { useState, useCallback, useEffect, useRef } from 'react';
// import { Bold, Italic, Underline, Link, Image, List, ListOrdered, Trash2, Plane } from 'lucide-react';

// // --- TYPE DEFINITIONS ---
// interface FlightDetails {
//   airline: string;
//   flightNumber: string;
//   departure: { city: string; date: string; time: string; };
//   arrival: { city: string; date: string; time: string; };
// }

// interface BankDetails {
//   bankName: string;
//   accountNumber: string;
//   ifscCode: string;
// }

// interface PricingPackage {
//   id: string;
//   packagePricingText: string;
//   flightDetails: FlightDetails;
// }

// interface SavedData {
//     packages: PricingPackage[];
//     bankDetails: BankDetails;
// }


// // --- INITIAL DATA ---
// const initialPackage: PricingPackage = {
//     id: crypto.randomUUID(),
//     packagePricingText: '<h3>Standard Package</h3><p>Includes flights, 4-star hotel accommodation, and daily breakfast. Price: <b>$1200 per person</b>.</p>',
//     flightDetails: {
//         airline: "Singapore Airlines",
//         flightNumber: "SQ 421",
//         departure: { city: "Mumbai (India)", date: "18 Feb 2024", time: "12:50 AM" },
//         arrival: { city: "Singapore (Singapore)", date: "19 Feb 2024", time: "12:50 PM" }
//     }
// };

// // --- RICH TEXT EDITOR COMPONENT ---
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
//       <div className="flex items-center gap-1 border border-b-0 border-gray-300 p-1 rounded-t-md bg-white">
//         <button type="button" onClick={() => execCommand('bold')} className="p-2 rounded hover:bg-gray-100 text-gray-600" title="Bold"><Bold className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('italic')} className="p-2 rounded hover:bg-gray-100 text-gray-600" title="Italic"><Italic className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('underline')} className="p-2 rounded hover:bg-gray-100 text-gray-600" title="Underline"><Underline className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('insertUnorderedList')} className="p-2 rounded hover:bg-gray-100 text-gray-600" title="Bullet List"><List className="w-4 h-4" /></button>
//         <button type="button" onClick={() => execCommand('insertOrderedList')} className="p-2 rounded hover:bg-gray-100 text-gray-600" title="Numbered List"><ListOrdered className="w-4 h-4" /></button>
//         <button type="button" onClick={setLink} className="p-2 rounded hover:bg-gray-100 text-gray-600" title="Add Link"><Link className="w-4 h-4" /></button>
//         <button type="button" onClick={addImage} className="p-2 rounded hover:bg-gray-100 text-gray-600" title="Add Image"><Image className="w-4 h-4" /></button>
//       </div>
//       <div
//         ref={editorRef}
//         contentEditable
//         className="prose w-full max-w-none border border-gray-300 p-3 text-sm min-h-[120px] rounded-b-md focus:outline-none focus:ring-2 focus:ring-teal-300"
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
//       `}</style>
//     </div>
//   );
// };


// // --- MAIN PRICING PAGE COMPONENT ---
// export default function App() {
//   const [pricingPackages, setPricingPackages] = useState<PricingPackage[]>([initialPackage]);
//   const [bankDetails, setBankDetails] = useState<BankDetails>({ bankName: "", accountNumber: "", ifscCode: "" });
//   const [savedData, setSavedData] = useState<SavedData | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

//   // --- PACKAGE MANAGEMENT ---
//   const updatePackage = (index: number, updatedPackage: Partial<PricingPackage>) => {
//     setPricingPackages(prev =>
//       prev.map((pkg, i) => (i === index ? { ...pkg, ...updatedPackage } : pkg))
//     );
//   };
  
//   const updateFlightDetail = (pkgIndex: number, fieldPath: string, value: string) => {
//       const updatedPackages = JSON.parse(JSON.stringify(pricingPackages));
//       const flight = updatedPackages[pkgIndex].flightDetails;
//       const path = fieldPath.split('.');
//       if (path.length === 2) {
//           flight[path[0]][path[1]] = value;
//       } else {
//           flight[path[0]] = value;
//       }
//       setPricingPackages(updatedPackages);
//   };


//   const addPackage = () => {
//     const newPackage: PricingPackage = {
//       id: crypto.randomUUID(),
//       packagePricingText: '',
//       flightDetails: {
//         airline: "", flightNumber: "",
//         departure: { city: "", date: "", time: "" },
//         arrival: { city: "", date: "", time: "" }
//       }
//     };
//     setPricingPackages(prev => [...prev, newPackage]);
//   };

//   const removePackage = (index: number) => {
//     if (pricingPackages.length > 1) {
//       setPricingPackages(prev => prev.filter((_, i) => i !== index));
//     }
//   };

//   // --- BANK DETAILS MANAGEMENT ---
//   const updateBankDetails = (field: keyof BankDetails, value: string) => {
//     setBankDetails(prev => ({ ...prev, [field]: value }));
//   };

//   // --- FORM SUBMISSION ---
//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     setSubmitStatus('idle');
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       const dataToSave = { packages: pricingPackages, bankDetails };
//       setSavedData(dataToSave);
//       console.log('Submitting Data:', dataToSave);
//       setSubmitStatus('success');
//       setTimeout(() => setSubmitStatus('idle'), 3000);
//     } catch (error) {
//       setSubmitStatus('error');
//       console.error('Submission Error:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="bg-[#F6F6FA] min-h-screen p-4 sm:p-6 lg:p-2 font-sans">
//       <h1 className="text-2xl font-semibold text-teal-600 mb-4 ml-2">Pricing</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Form Section */}
//         <div className="lg:col-span-2 space-y-6">
//           {pricingPackages.map((pkg, index) => (
//             <div key={pkg.id} className="bg-white shadow rounded-xl p-4 space-y-4">
//               {/* Package Header */}
//               <div className="flex justify-between items-center">
//                 <label className="block text-gray-700 font-medium text-sm">
//                   Add Package Pricing <span className="text-red-500">*</span>
//                 </label>
//                 {pricingPackages.length > 1 && (
//                   <button onClick={() => removePackage(index)} className="text-gray-500 hover:text-red-500" title="Remove Package">
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>

//               {/* Rich Text Editor for Package Details */}
//               <RichTextEditor
//                 content={pkg.packagePricingText}
//                 onUpdate={(html) => updatePackage(index, { packagePricingText: html })}
//                 placeholder="Enter package description, pricing, inclusions, etc."
//               />

//               {/* Flight Details for this Package */}
//               <div className="border rounded-lg p-4">
//                 <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-teal-600 font-medium mb-3 gap-2">
//                   <input type="text" value={`Flight: ${pkg.flightDetails.airline}`} onChange={(e) => updateFlightDetail(index, 'airline', e.target.value.replace('Flight: ', ''))} className="p-1 -m-1 rounded focus:outline-none focus:bg-teal-50" />
//                   <input type="text" value={`Flight No. ${pkg.flightDetails.flightNumber}`} onChange={(e) => updateFlightDetail(index, 'flightNumber', e.target.value.replace('Flight No. ', ''))} className="p-1 -m-1 rounded text-right focus:outline-none focus:bg-teal-50" />
//                 </div>
//                 <div className="flex items-center justify-between text-gray-700 font-medium text-sm mb-4">
//                   <input type="text" value={pkg.flightDetails.departure.city} onChange={(e) => updateFlightDetail(index, 'departure.city', e.target.value)} className="p-1 -m-1 w-2/5 rounded focus:outline-none focus:bg-gray-100" />
//                   <div className="flex-grow flex items-center mx-2">
//                       <div className="w-full border-t border-teal-300 border-dashed"></div>
//                       <Plane className="w-4 h-4 text-teal-500 mx-2 transform -rotate-45" />
//                       <div className="w-full border-t border-teal-300 border-dashed"></div>
//                   </div>
//                   <input type="text" value={pkg.flightDetails.arrival.city} onChange={(e) => updateFlightDetail(index, 'arrival.city', e.target.value)} className="p-1 -m-1 w-2/5 rounded text-right focus:outline-none focus:bg-gray-100" />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
//                     {['departure', 'arrival'].map(type => (
//                         <div key={type} className="space-y-1">
//                             <label className="text-gray-500">Date</label>
//                             <input type="text" value={pkg.flightDetails[type as 'departure' | 'arrival'].date} onChange={(e) => updateFlightDetail(index, `${type}.date`, e.target.value)} className="text-xs bg-gray-50 border rounded px-2 py-1 w-full" />
//                             <label className="text-gray-500 pt-1 block">Time</label>
//                             <input type="text" value={pkg.flightDetails[type as 'departure' | 'arrival'].time} onChange={(e) => updateFlightDetail(index, `${type}.time`, e.target.value)} className="text-xs bg-gray-50 border rounded px-2 py-1 w-full" />
//                         </div>
//                     ))}
//                 </div>
//               </div>
//             </div>
//           ))}

//           <div className="flex justify-center">
//             <button onClick={addPackage} className="px-4 py-2 bg-teal-500 text-white text-sm rounded-lg hover:bg-teal-600">
//               Add Another Package Pricing Section
//             </button>
//           </div>

//           {/* Bank Details (Global) */}
//           <div className="bg-white shadow rounded-xl p-4 space-y-4">
//             <label className="block text-gray-700 font-medium text-sm">Bank & Branch Name</label>
//             <input type="text" placeholder="Type here" value={bankDetails.bankName} onChange={(e) => updateBankDetails('bankName', e.target.value)} className="w-full border rounded-lg p-2 text-sm focus:ring focus:ring-teal-300" />
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-gray-700 font-medium text-xs mb-1">Account No.</label>
//                 <input type="text" placeholder="Type here" value={bankDetails.accountNumber} onChange={(e) => updateBankDetails('accountNumber', e.target.value)} className="w-full border rounded-lg p-2 text-sm focus:ring focus:ring-teal-300" />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-medium text-xs mb-1">IFSC Code</label>
//                 <input type="text" placeholder="Type here" value={bankDetails.ifscCode} onChange={(e) => updateBankDetails('ifscCode', e.target.value)} className="w-full border rounded-lg p-2 text-sm focus:ring focus:ring-teal-300" />
//               </div>
//             </div>
//           </div>
          
//            {/* Submit Button */}
//             <div className="bg-white shadow rounded-xl p-4">
//                  <button onClick={handleSubmit} disabled={isSubmitting} className={`w-full text-white text-sm font-semibold py-2.5 rounded-lg transition-colors ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'}`}>
//                     {isSubmitting ? 'Saving...' : 'Save All Details'}
//                 </button>
//                  {submitStatus === 'success' && <p className="text-green-600 text-center text-sm mt-2">Details saved successfully!</p>}
//                  {submitStatus === 'error' && <p className="text-red-600 text-center text-sm mt-2">Error saving details. Please try again.</p>}
//             </div>

//         </div>

//         {/* Right Preview Section */}
//         <div className="lg:col-span-1 sticky top-6">
//           <div className="bg-white p-4 rounded-lg border border-[#E0E0E0]">
//             <h2 className="text-xl font-semibold text-[#717182] mb-4">Save Details</h2>
//             <div className="border border-[#E0E0E0] rounded-lg">
//               <div className="bg-[#10A4B0] text-white flex justify-between items-center px-3 py-3 rounded-t-lg">
//                 <h3 className="font-medium text-lg">Pricing Preview</h3>
//               </div>
//               <div className="p-4 text-sm space-y-4 max-h-[70vh] overflow-y-auto">
//                 {!savedData && <p className="text-gray-500 text-center py-4">Submit the form to see a preview of your saved details here.</p>}
                
//                 {savedData?.packages.map((pkg, index) => (
//                     <div key={pkg.id} className="pb-4 border-b last:border-b-0">
//                          <h4 className="font-bold text-base mb-2 text-gray-800">Package {index + 1}</h4>
//                          <div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: pkg.packagePricingText || '<p>No description provided.</p>' }} />
                         
//                          <div className="mt-3 pt-3 border-t border-gray-200">
//                            <p className="font-medium text-gray-800 mb-1">Flight Details:</p>
//                            <p className="text-xs text-teal-600 font-semibold">{pkg.flightDetails.airline} - {pkg.flightDetails.flightNumber}</p>
//                            <p className="text-xs text-gray-700">{pkg.flightDetails.departure.city} → {pkg.flightDetails.arrival.city}</p>
//                            <p className="text-xs text-gray-500">{pkg.flightDetails.departure.date} {pkg.flightDetails.departure.time} - {pkg.flightDetails.arrival.date} {pkg.flightDetails.arrival.time}</p>
//                          </div>
//                     </div>
//                 ))}

//                 {savedData && (
//                     <div className="mt-4 pt-4 border-t-2 border-dashed">
//                         <h4 className="font-bold text-base mb-2 text-gray-800">Bank Details</h4>
//                         <p><span className="font-medium">Bank:</span> {savedData.bankDetails.bankName || 'N/A'}</p>
//                         <p><span className="font-medium">Account No.:</span> {savedData.bankDetails.accountNumber || 'N/A'}</p>
//                         <p><span className="font-medium">IFSC Code:</span> {savedData.bankDetails.ifscCode || 'N/A'}</p>
//                     </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
