// src/api/itinerary_api.ts

// Define the shape of the data this function expects
interface ItineraryPayload {
  traveler: string;
  travelerType: string;
  travelBasics: any; // You can create a more specific type for this
  tripOverviewDetails: string;
}

/**
 * Generates an itinerary using the native fetch API.
 * This function contains the exact logic you confirmed is working.
 * @param payload The data for the trip.
 * @returns The generated itinerary from the server.
 */
export const generateItinerary = async (payload: ItineraryPayload) => {
  // 1. Get the access token from localStorage, just like in your component.
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    // If there's no token, we can throw an error immediately.
    throw new Error("Authentication error: No access token found.");
  }

  try {
    // 2. Make the API call using fetch with the manual headers.
    const response = await fetch('http://localhost:5000/api/v1/itineraries/generate-gemini-itinerary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`, // The crucial header
      },
      body: JSON.stringify(payload),
    });

    // 3. Handle the response, same as in your component.
    if (!response.ok) {
      if (response.status === 401) {
        // Here, we can specifically handle token expiration.
        throw new Error("Your session has expired. Please log in again.");
      }
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorData.error || errorData.message || `Server error (${response.status})`);
    }

    // 4. Return the successful JSON response.
    return await response.json();

  } catch (err: any) {
    // Re-throw the error so the component's catch block can handle it.
    // This catches both network errors and the errors we threw above.
    console.error('❌ API Generation Error:', err);
    throw err;
  }
};