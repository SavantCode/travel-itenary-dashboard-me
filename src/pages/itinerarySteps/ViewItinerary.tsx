// src/pages/itinerarySteps/ViewItinerary.tsx

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar, MapPin, Users, Clock, ArrowLeft, Download, Share2, 
  Edit3, RefreshCw, CheckCircle, AlertCircle, Eye, EyeOff,
  Plane, Hotel, Camera, Utensils, Car, Star
} from 'lucide-react';

interface ItineraryData {
  itinerary?: {
    title?: string;
    destination?: string;
    duration?: string;
    totalDays?: number;
    days?: Array<{
      day: number;
      date?: string;
      activities?: Array<{
        time?: string;
        activity?: string;
        location?: string;
        description?: string;
        type?: string;
      }>;
    }>;
  };
  generatedAt?: string;
  payload?: {
    traveler?: string;
    travelerType?: string;
    travelBasics?: {
      from?: { city: string; country: string };
      to?: { city: string; country: string };
      startDate?: string;
      endDate?: string;
      totalTravelers?: number;
    };
    tripOverviewDetails?: string;
  };
}

interface ActivityIconProps {
  type?: string;
  className?: string;
}

const ActivityIcon: React.FC<ActivityIconProps> = ({ type, className = "w-4 h-4" }) => {
  const getIcon = () => {
    if (!type) return <Clock className={className} />;
    
    const lowerType = type.toLowerCase();
    if (lowerType.includes('food') || lowerType.includes('dining') || lowerType.includes('restaurant')) {
      return <Utensils className={className} />;
    }
    if (lowerType.includes('hotel') || lowerType.includes('accommodation') || lowerType.includes('check')) {
      return <Hotel className={className} />;
    }
    if (lowerType.includes('transport') || lowerType.includes('travel') || lowerType.includes('flight')) {
      return <Car className={className} />;
    }
    if (lowerType.includes('sightseeing') || lowerType.includes('attraction') || lowerType.includes('visit')) {
      return <Camera className={className} />;
    }
    return <MapPin className={className} />;
  };

  return getIcon();
};

const ViewItinerary: React.FC = () => {
  const navigate = useNavigate();
  const [itineraryData, setItineraryData] = useState<ItineraryData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRawData, setShowRawData] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const loadItinerary = () => {
      try {
        setLoading(true);
        const storedData = sessionStorage.getItem('generatedItinerary');
        
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          console.log('📄 Loaded itinerary data:', parsedData);
          setItineraryData(parsedData);
        } else {
          setError('No itinerary data found. Please generate one first.');
        }
      } catch (e) {
        console.error('Failed to parse itinerary from session storage:', e);
        setError('Could not load itinerary data. The data might be corrupted.');
      } finally {
        setLoading(false);
      }
    };

    loadItinerary();
  }, []);

  const handleDownload = async () => {
    if (!itineraryData) return;
    
    setIsDownloading(true);
    
    try {
      // Create a formatted text version of the itinerary
      let content = '';
      
      if (itineraryData.itinerary?.title) {
        content += `${itineraryData.itinerary.title}\n`;
        content += '='.repeat(itineraryData.itinerary.title.length) + '\n\n';
      }
      
      if (itineraryData.payload) {
        const { payload } = itineraryData;
        content += `Traveler: ${payload.traveler || 'N/A'}\n`;
        content += `Travel Type: ${payload.travelerType || 'N/A'}\n`;
        content += `Destination: ${payload.travelBasics?.to?.city}, ${payload.travelBasics?.to?.country}\n`;
        content += `Dates: ${payload.travelBasics?.startDate} to ${payload.travelBasics?.endDate}\n`;
        content += `Travelers: ${payload.travelBasics?.totalTravelers}\n\n`;
      }
      
      if (itineraryData.itinerary?.days) {
        content += 'DAILY ITINERARY\n';
        content += '-'.repeat(16) + '\n\n';
        
        itineraryData.itinerary.days.forEach((day) => {
          content += `Day ${day.day}${day.date ? ` - ${day.date}` : ''}\n`;
          content += '-'.repeat(20) + '\n';
          
          if (day.activities) {
            day.activities.forEach((activity, index) => {
              content += `${index + 1}. `;
              if (activity.time) content += `${activity.time} - `;
              content += `${activity.activity || 'Activity'}\n`;
              if (activity.location) content += `   Location: ${activity.location}\n`;
              if (activity.description) content += `   Description: ${activity.description}\n`;
              content += '\n';
            });
          }
          content += '\n';
        });
      }
      
      // Add raw data if requested
      if (showRawData) {
        content += '\n\nRAW DATA\n';
        content += '========\n';
        content += JSON.stringify(itineraryData, null, 2);
      }
      
      // Create and download the file
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `itinerary-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (err) {
      console.error('Download failed:', err);
      alert('Failed to download itinerary');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share && itineraryData) {
      try {
        await navigator.share({
          title: itineraryData.itinerary?.title || 'My Travel Itinerary',
          text: `Check out my travel itinerary for ${itineraryData.payload?.travelBasics?.to?.city}!`,
          url: window.location.href,
        });
      } catch (err) {
        // Fallback to copy to clipboard
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (itineraryData) {
      const text = JSON.stringify(itineraryData, null, 2);
      navigator.clipboard.writeText(text).then(() => {
        alert('Itinerary copied to clipboard!');
      }).catch(() => {
        alert('Failed to copy to clipboard');
      });
    }
  };

  const regenerateItinerary = () => {
    navigate('/my-itinerary/create', { 
      state: { regenerate: true, previousData: itineraryData } 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F6FA] flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-[#10A4B0] mx-auto mb-4" />
          <p className="text-gray-600">Loading your itinerary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F6FA] p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/my-itinerary/create/travel-basic')}
              className="flex items-center space-x-2 text-gray-600 hover:text-[#10A4B0] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Create</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowRawData(!showRawData)}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              {showRawData ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="text-sm">{showRawData ? 'Hide' : 'Show'} Raw Data</span>
            </button>
            
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </button>
            
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center space-x-2 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">{isDownloading ? 'Downloading...' : 'Download'}</span>
            </button>
            
            <button
              onClick={regenerateItinerary}
              className="flex items-center space-x-2 px-3 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm">Regenerate</span>
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-white rounded-lg border border-red-200 p-6 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">No Itinerary Found</h3>
                <p className="text-red-600 mb-4">{error}</p>
                <Link 
                  to="/my-itinerary/create" 
                  className="inline-flex items-center space-x-2 bg-[#10A4B0] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Create New Itinerary</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Success State */}
        {itineraryData && (
          <div className="space-y-6">
            {/* Success Banner */}
            <div className="bg-white rounded-lg border border-green-200 p-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <h3 className="font-semibold text-green-800">✨ Itinerary Generated Successfully!</h3>
                  <p className="text-sm text-green-600">
                    Generated on {itineraryData.generatedAt ? new Date(itineraryData.generatedAt).toLocaleString() : 'Unknown date'}
                  </p>
                </div>
              </div>
            </div>

            {/* Trip Overview */}
            {itineraryData.payload && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {itineraryData.itinerary?.title || 'Your Travel Itinerary'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-[#10A4B0]" />
                    <div>
                      <p className="text-sm text-gray-500">Destination</p>
                      <p className="font-medium">
                        {itineraryData.payload.travelBasics?.to?.city}, {itineraryData.payload.travelBasics?.to?.country}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-[#10A4B0]" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">
                        {itineraryData.payload.travelBasics?.startDate} to {itineraryData.payload.travelBasics?.endDate}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-[#10A4B0]" />
                    <div>
                      <p className="text-sm text-gray-500">Travelers</p>
                      <p className="font-medium">
                        {itineraryData.payload.travelBasics?.totalTravelers} {itineraryData.payload.travelerType}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Plane className="w-5 h-5 text-[#10A4B0]" />
                    <div>
                      <p className="text-sm text-gray-500">Traveler</p>
                      <p className="font-medium">{itineraryData.payload.traveler}</p>
                    </div>
                  </div>
                </div>

                {itineraryData.payload.tripOverviewDetails && (
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-500 mb-2">Trip Overview</p>
                    <p className="text-gray-700">{itineraryData.payload.tripOverviewDetails}</p>
                  </div>
                )}
              </div>
            )}

            {/* Daily Itinerary */}
            {itineraryData.itinerary?.days && itineraryData.itinerary.days.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Daily Itinerary</h3>
                
                <div className="space-y-6">
                  {itineraryData.itinerary.days.map((day) => (
                    <div key={day.day} className="border border-gray-100 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-[#10A4B0] text-white rounded-full flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800">Day {day.day}</h4>
                          {day.date && <p className="text-sm text-gray-500">{day.date}</p>}
                        </div>
                      </div>
                      
                      {day.activities && day.activities.length > 0 ? (
                        <div className="space-y-3 ml-13">
                          {day.activities.map((activity, activityIndex) => (
                            <div key={activityIndex} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                              <ActivityIcon type={activity.type} className="w-5 h-5 text-[#10A4B0] mt-1 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    {activity.time && (
                                      <p className="text-sm text-gray-500 mb-1">{activity.time}</p>
                                    )}
                                    <h5 className="font-medium text-gray-800 mb-1">
                                      {activity.activity || 'Activity'}
                                    </h5>
                                    {activity.location && (
                                      <p className="text-sm text-gray-600 mb-2">📍 {activity.location}</p>
                                    )}
                                    {activity.description && (
                                      <p className="text-sm text-gray-600">{activity.description}</p>
                                    )}
                                  </div>
                                  {activity.type && (
                                    <span className="ml-2 px-2 py-1 bg-[#10A4B0] text-white text-xs rounded-full flex-shrink-0">
                                      {activity.type}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic ml-13">No activities planned for this day.</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Raw Data Display */}
            {showRawData && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Raw Generated Data</h3>
                <p className="text-gray-600 mb-4">
                  This is the complete JSON response from the AI generator. You can use this data for further processing or integration.
                </p>
                <pre className="bg-gray-900 text-white p-6 rounded-lg overflow-x-auto text-sm max-h-96 overflow-y-auto">
                  <code>{JSON.stringify(itineraryData, null, 2)}</code>
                </pre>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => navigate('/my-itinerary/create/arrival-departure')}
                className="flex items-center space-x-2 bg-[#10A4B0] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span>Continue Editing</span>
              </button>
              
              <Link
                to="/my-itinerary"
                className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to My Itineraries</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewItinerary;
