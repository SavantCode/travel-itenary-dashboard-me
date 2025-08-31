{/* // import React from 'react';

// const ViewItinerary: React.FC = () => {
//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <h1 className="text-2xl font-semibold text-gray-700">
//         Will show Itinerary here
//       </h1>
//     </div>
//   );
// };

// export default ViewItinerary; */}







// import React from "react";

// interface Activity {
//   time: string;
//   activity: string;
//   details: string;
//   image?: string;
// }

// interface DayPlan {
//   day: number;
//   title: string;
//   summary: string;
//   activities: Activity[];
// }

// interface Trip {
//   traveler: string;
//   from: { country: string; city: string };
//   to: { country: string; city: string };
//   tripDuration: string;
//   startDate: string;
//   endDate: string;
//   itinerary: DayPlan[];
// }

// const tripData: Trip = {
//   "traveler": "ganesha",
//   "from": {
//     "country": "India",
//     "city": "Mumbai"
//   },
//   "to": {
//     "country": "Japan",
//     "city": "Tokyo"
//   },
//   "tripDuration": "3 Days",
//   "startDate": "2025-08-29",
//   "endDate": "2025-08-31",
//   "itinerary": [
//     {
//       "day": 1,
//       "title": "Tokyo Tech & Treats: A Whirlwind Adventure",
//       "summary": "Dive into Tokyo's vibrant tech scene and indulge in delicious family-friendly meals, with a touch of playful exploration.",
//       "activities": [
//         {
//           "time": "6:00 AM",
//           "activity": "Wake Up & Gentle Stroll",
//           "details": "Start your day with a peaceful stroll around your hotel neighbourhood, enjoying the quiet Tokyo morning."
//         },
//         {
//           "time": "7:00 AM",
//           "activity": "Breakfast at a Local Café",
//           "details": "Enjoy a delightful Japanese breakfast at a charming local café near your hotel. Try some traditional treats!",
//           "image": "https://pixabay.com/get/g919050562e114dc9da5bcac63b38514ebad46c60c6d76a92071d830c5e0f92e0c9c9e06485f2a448c88524b2f56b9bb749f05cc60db50c9578b922e733b6e1b7_640.jpg"
//         },
//         {
//           "time": "8:00 AM",
//           "activity": "Akihabara Electric Town Exploration",
//           "details": "Immerse yourselves in the electric excitement of Akihabara! Explore gaming arcades, anime shops, and marvel at the latest tech gadgets. A true wonderland for all ages.",
//           "image": "https://pixabay.com/get/gda3aa756ad4dde750ed648bb1a1cba4a7249143a47eed002c46b078d9e7526388d683ae8b9b5265c4d7c03e8958838952f92392e78b24eafe7d29c3ccd2a6d32_640.jpg"
//         },
//         {
//           "time": "12:00 PM",
//           "activity": "Lunch at a Family-Friendly Restaurant",
//           "details": "Enjoy a delicious and kid-friendly lunch at a family restaurant in Akihabara.  Plenty of options to choose from!",
//           "image": "https://pixabay.com/get/g30ee937baf92be1c2c6f0f9d95a61167495b1a7e0c7c46bc8f29cf996f5f3ee352b62217775af357c700b5006a143f17c6b2cb2f9a18641c25898ac50d13f9e9_640.jpg"
//         },
//         {
//           "time": "1:30 PM",
//           "activity": "TeamLab Borderless Interactive Museum",
//           "details": "Prepare for an unforgettable sensory experience at the TeamLab Borderless museum.  Interactive digital art installations will amaze the whole family.",
//           "image": "https://pixabay.com/get/gd82f683a0ede96c8792303874f57dc31ba9b4e93729d50ac1a7cffca89ed724384238745b6c0284a6034787c6264ec9e_640.jpg"
//         },
//         {
//           "time": "4:30 PM",
//           "activity": "Ueno Park Relaxation",
//           "details": "Relax and unwind at Ueno Park. Enjoy the greenery, spot some wildlife, and let your child run around and enjoy the playground.",
//           "image": "https://pixabay.com/get/gc4a998eb7f3f12462c30ea0e4019c6d7eb3025f02499c8a18672f3b2df337b979e827eca9745dbde11bf062f46b45daf882101cbf47e059e76510cd834eb2e5f_640.jpg"
//         },
//         {
//           "time": "6:30 PM",
//           "activity": "Dinner with a View",
//           "details": "Indulge in a delicious dinner at a restaurant with a stunning view of the Tokyo skyline. A perfect romantic end to the day.",
//           "image": "https://pixabay.com/get/gdcafe551e1579ec816ff93fbf110961c72cd2f539a5300974d09fd6899d55a5c9eb195320bcceabe968660e7e5d7cdd8a24b313ce9a2fcc59fec1d801f218b2f_640.jpg"
//         },
//         {
//           "time": "8:00 PM",
//           "activity": "Evening Stroll & Surprise",
//           "details": "Take a leisurely evening stroll through a quieter neighborhood, maybe discovering a hidden gem like a small, local shrine. A surprise awaits!"
//         },
//         {
//           "time": "10:00 PM",
//           "activity": "Rest & Sleep",
//           "details": "Get a good night's rest to prepare for more adventures!"
//         }
//       ]
//     },
//     {
//       "day": 2,
//       "title": "Cultural Immersion & Sensational Views",
//       "summary": "Discover Tokyo's rich culture, enjoy breathtaking views, and savor authentic Japanese cuisine.",
//       "activities": [
//         {
//           "time": "6:00 AM",
//           "activity": "Morning Calm & Breakfast",
//           "details": "Enjoy a quiet morning with a simple breakfast at your hotel, preparing for a day of exploration."
//         },
//         {
//           "time": "7:30 AM",
//           "activity": "Tsukiji Outer Market Food Tour",
//           "details": "Embark on a culinary adventure through the vibrant Tsukiji Outer Market. Sample fresh seafood, local delicacies, and enjoy the bustling atmosphere.",
//           "image": "https://pixabay.com/get/g264168047ec213d3e305013c9706ae39e9e28871f65117d78567723c377cba7bd6857398de0a8f7fc8af49c397b13ef8be276adb1a86f6c70a79512dd65d7277_640.jpg"
//         },
//         {
//           "time": "10:00 AM",
//           "activity": "Sensō-ji Temple Exploration",
//           "details": "Explore Tokyo's oldest temple, Sensō-ji, and immerse yourselves in its rich history and serene atmosphere.  Let your child enjoy the unique sights and sounds.",
//           "image": "https://pixabay.com/get/gca5584bf4262f6ee517905a822562c1002a647313cbf75be05cfc9cc76ea4ff41c75f434c810e9ee53d44a8ac644a1d1809c4e3527acddb83a2f71c3ef3b9aea_640.jpg"
//         },
//         {
//           "time": "12:00 PM",
//           "activity": "Lunch near Senso-ji",
//           "details": "Find a local restaurant near Senso-ji for a delicious and authentic Japanese lunch.",
//           "image": "https://pixabay.com/get/ge223874fed3521fb1df60cefff0b16f0ec38c2fb75f5b3758f1c36419d1eb0a6f241066495d5950036b28ff89ca7e92ef37648b98716e0a137e3ba5d38b06030_640.jpg"
//         },
//         {
//           "time": "1:30 PM",
//           "activity": "Tokyo Skytree Ascend",
//           "details": "Ascend the Tokyo Skytree for breathtaking panoramic views of the city. Capture unforgettable photos and enjoy the stunning cityscape.",
//           "image": "https://pixabay.com/get/g407fa1a5ace5aacd594bb8f591cf370cbae2785edf3d5bdd713cd316d30212857e4b19b3408bef04dc1773e0c2d0172442eb761acbedc40b22a36d7d73c4a5a1_640.jpg"
//         },
//         {
//           "time": "3:30 PM",
//           "activity": "Sumida River Cruise",
//           "details": "Enjoy a relaxing Sumida River cruise, offering unique perspectives of the city's landmarks and bridges. A perfect way to unwind.",
//           "image": "https://pixabay.com/get/gf923ae0b018ad70a40a385f283aaa20560cb98f6c3b333bca1f2d0255ab82de816eaf3ef5ca600a3376de0bdf5f791d4e4cbce103650cfe4bcadfe6fbb7620fd_640.jpg"
//         },
//         {
//           "time": "5:00 PM",
//           "activity": "Shibuya Crossing Observation",
//           "details": "Witness the iconic Shibuya Crossing, the world's busiest intersection. A truly unique Tokyo experience.",
//           "image": "https://pixabay.com/get/gf5f24c427ed4bf7c574e0984fdcc8a304058e4900259ebe1d2b9e6947e3e4425053b8759bb55201495874b41349758badc77d92aeb616ab0876fe3f936ebab99_640.jpg"
//         },
//         {
//           "time": "6:30 PM",
//           "activity": "Dinner in Shibuya",
//           "details": "Enjoy dinner in the trendy Shibuya district, choosing from a wide array of restaurants to suit your preferences.",
//           "image": "https://pixabay.com/get/g05d19ac881959dea7163afba14c32013f5401cf333ae822bb8e46169e10ed7ef25190e6a0be75c84a650b936f6562e574a5dda8d04b132934de54ecb0e8c0370_640.jpg"
//         },
//         {
//           "time": "8:00 PM",
//           "activity": "Relax and prepare for tomorrow",
//           "details": "Enjoy some downtime at your hotel, preparing for the next day’s adventures.",
//           "image": "https://pixabay.com/get/gf088b7d588ef3a12ea284d897466148763460eff64bd87c88a847f4d448532c7c416e21f943e4e7492fcee13aa69a7bf_640.jpg"
//         },
//         {
//           "time": "10:00 PM",
//           "activity": "Rest & Sleep",
//           "details": "Sweet dreams!"
//         }
//       ]
//     },
//     {
//       "day": 3,
//       "title": "Ghibli Magic & Farewell Feast",
//       "summary": "Experience the enchanting world of Studio Ghibli and conclude your Tokyo adventure with a memorable farewell dinner.",
//       "activities": [
//         {
//           "time": "6:00 AM",
//           "activity": "Morning Relaxation",
//           "details": "Enjoy a leisurely morning at your hotel, savouring your last moments in Tokyo.",
//           "image": "https://pixabay.com/get/g7ec761b308ecba98ebf1696c1790cd3f78444d185a2e8ffeec88cc3fc9df92749022d34b680bbc08bbcb4e38d4eabf79f01f715ba5d93ce24765fab0a1132031_640.jpg"
//         },
//         {
//           "time": "7:30 AM",
//           "activity": "Breakfast at the Hotel",
//           "details": "Enjoy a final Japanese breakfast at your hotel.",
//           "image": "https://pixabay.com/get/g29f5b2583d46c05292f181bf178954624d37d6c3d00772fe525a23cd79522bf031b30bb85d616f804ec04537caf39918232c5e87b17c7a1be21f5b1cb46c6714_640.jpg"
//         },
//         {
//           "time": "8:30 AM",
//           "activity": "Ghibli Museum (Pre-booked Tickets Essential!)",
//           "details": "Immerse yourselves in the magical world of Studio Ghibli at the Ghibli Museum (remember to book tickets well in advance!). Explore the whimsical exhibits and enjoy the enchanting atmosphere."
//         },
//         {
//           "time": "12:00 PM",
//           "activity": "Lunch near Ghibli Museum",
//           "details": "Enjoy lunch at a cafe near the Ghibli Museum.",
//           "image": "https://pixabay.com/get/gca7d47b63f8f7f87762d84768fa515d61557c1c552042b4a0f824ac72cd68c709d6727a12ddff3519572a8f287f4d5eecc91479faf797e8f1edde1a9f43d2802_640.jpg"
//         },
//         {
//           "time": "1:30 PM",
//           "activity": "Shopping for Souvenirs",
//           "details": "Spend some time shopping for souvenirs to remember your amazing Tokyo trip. Inokashira Park near the museum is also great for a final stroll.",
//           "image": "https://pixabay.com/get/g5371a89c9cdc445ad711357130774aeff88eb269736b6e4801e02ee74ad368d90ce28bc1dcdba58186c91781e4234baac9d25b1f20430f4f4ee0cc088c4ba420_640.jpg"
//         },
//         {
//           "time": "4:00 PM",
//           "activity": "Return to Hotel & Relax",
//           "details": "Head back to the hotel to relax and freshen up before your final dinner."
//         },
//         {
//           "time": "6:00 PM",
//           "activity": "Farewell Dinner",
//           "details": "Enjoy a special farewell dinner at a restaurant of your choice, celebrating your unforgettable Tokyo adventure.",
//           "image": "https://pixabay.com/get/g883ced500111119604cb9ac0a39c15fa17a5a48f8efc2b70f7988399a5db2af7826d7caa5e3b41e592f320e6ced5d93ecd794e7544f27bedbef66f16561a1f10_640.jpg"
//         },
//         {
//           "time": "8:00 PM",
//           "activity": "Pack & Prepare for Departure",
//           "details": "Pack your bags and prepare for your departure, reminiscing about your incredible journey."
//         },
//         {
//           "time": "10:00 PM",
//           "activity": "Rest & Sleep",
//           "details": "Get a good night’s sleep before heading to the airport."
//         }
//       ]
//     }
//   ],
// }; // paste your JSON

// const TripHeader: React.FC<{ data: Trip }> = ({ data }) => (
//   <div className="p-6 text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl mb-8 shadow-lg">
//     <h1 className="text-3xl font-bold mb-2">
//       {data.from.city} → {data.to.city}
//     </h1>
//     <p className="text-lg">
//       {data.tripDuration} | {data.startDate} → {data.endDate}
//     </p>
//     <p className="mt-2 text-sm">Traveler: {data.traveler}</p>
//   </div>
// );

// const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => (
//   <div className="flex items-start gap-4 p-4 border rounded-2xl shadow mb-4 bg-white">
//     {activity.image && (
//       <img
//         src={activity.image}
//         alt={activity.activity}
//         className="w-32 h-24 object-cover rounded-xl"
//       />
//     )}
//     <div>
//       <p className="text-sm text-gray-500">{activity.time}</p>
//       <h3 className="font-semibold text-lg">{activity.activity}</h3>
//       <p className="text-gray-600 text-sm">{activity.details}</p>
//     </div>
//   </div>
// );

// const DayCard: React.FC<{ day: DayPlan }> = ({ day }) => (
//   <div className="p-6 mb-8 bg-blue-50 rounded-2xl shadow-lg">
//     <h2 className="text-2xl font-bold mb-2">Day {day.day}: {day.title}</h2>
//     <p className="mb-4 text-gray-700 italic">{day.summary}</p>
//     {day.activities.map((act, idx) => (
//       <ActivityCard key={idx} activity={act} />
//     ))}
//   </div>
// );

// const TripPage: React.FC = () => {
//   return (
//     <div className="max-w-4xl mx-auto font-sans p-6">
//       <TripHeader data={tripData} />
//       {tripData.itinerary.map((day) => (
//         <DayCard key={day.day} day={day} />
//       ))}
//     </div>
//   );
// };

// export default TripPage;




import React, { useState, useEffect } from 'react';

// Type definitions for the JSON data to ensure type safety
interface Activity {
  time: string;
  activity: string;
  details: string;
  image?: string;
}

interface ItineraryDay {
  day: number;
  title: string;
  summary: string;
  activities: Activity[];
}

interface TripData {
  traveler: string;
  from: { city: string; country: string; };
  to: { city: string; country: string; };
  tripDuration: string;
  startDate: string;
  endDate: string;
  itinerary: ItineraryDay[];
  generatedAt: string;
}

// A mock API response to simulate data coming from a server
const mockApiResponse: TripData = {
  "traveler": "ganesha",
  "from": {
    "country": "India",
    "city": "Mumbai"
  },
  "to": {
    "country": "Japan",
    "city": "Tokyo"
  },
  "tripDuration": "3 Days",
  "startDate": "2025-08-29",
  "endDate": "2025-08-31",
  "itinerary": [
    {
      "day": 1,
      "title": "Tokyo Tech & Treats: A Whirlwind Adventure",
      "summary": "Dive into Tokyo's vibrant tech scene and indulge in delicious family-friendly meals, with a touch of playful exploration.",
      "activities": [
        { "time": "6:00 AM", "activity": "Wake Up & Gentle Stroll", "details": "Start your day with a peaceful stroll around your hotel neighbourhood." },
        { "time": "7:00 AM", "activity": "Breakfast at a Local Café", "details": "Enjoy a delightful Japanese breakfast.", "image": "https://pixabay.com/get/g919050562e114dc9da5bcac63b38514ebad46c60c6d76a92071d830c5e0f92e0c9c9e06485f2a448c88524b2f56b9bb749f05cc60db50c9578b922e733b6e1b7_640.jpg" },
        { "time": "8:00 AM", "activity": "Akihabara Electric Town Exploration", "details": "Immerse yourselves in the electric excitement of Akihabara!", "image": "https://pixabay.com/get/gda3aa756ad4dde750ed648bb1a1cba4a7249143a47eed002c46b078d9e7526388d683ae8b9b5265c4d7c03e8958838952f92392e78b24eafe7d29c3ccd2a6d32_640.jpg" },
        { "time": "12:00 PM", "activity": "Lunch at a Family-Friendly Restaurant", "details": "Enjoy a delicious and kid-friendly lunch.", "image": "https://pixabay.com/get/g30ee937baf92be1c2c6f0f9d95a61167495b1a7e0c7c46bc8f29cf996f5f3ee352b62217775af357c700b5006a143f17c6b2cb2f9a18641c25898ac50d13f9e9_640.jpg" }
      ]
    },
    {
      "day": 2,
      "title": "Cultural Immersion & Sensational Views",
      "summary": "Discover Tokyo's rich culture, enjoy breathtaking views, and savor authentic Japanese cuisine.",
      "activities": [
        { "time": "6:00 AM", "activity": "Morning Calm & Breakfast", "details": "Enjoy a quiet morning with a simple breakfast at your hotel." },
        { "time": "7:30 AM", "activity": "Tsukiji Outer Market Food Tour", "details": "Embark on a culinary adventure through the vibrant Tsukiji Outer Market.", "image": "https://pixabay.com/get/g264168047ec213d3e305013c9706ae39e9e28871f65117d78567723c377cba7bd6857398de0a8f7fc8af49c397b13ef8be276adb1a86f6c70a79512dd65d7277_640.jpg" },
        { "time": "10:00 AM", "activity": "Sensō-ji Temple Exploration", "details": "Explore Tokyo's oldest temple, Sensō-ji, and immerse yourselves in its rich history.", "image": "https://pixabay.com/get/gca5584bf4262f6ee517905a822562c1002a647313cbf75be05cfc9cc76ea4ff41c75f434c810e9ee53d44a8ac644a1d1809c4e3527acddb83a2f71c3ef3b9aea_640.jpg" }
      ]
    },
  ],
  "generatedAt": "2025-08-28T17:57:07.763Z"
};

// Styles object to mimic the provided design
const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: { fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f2f5', display: 'flex', justifyContent: 'center', padding: '20px' },
  contentContainer: { backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '90%', maxWidth: '800px', padding: '30px', boxSizing: 'border-box' },
  header: { textAlign: 'center', marginBottom: '30px' },
  headerTitle: { fontSize: '2.5em', color: '#006494', marginBottom: '10px' },
  headerSubtitle: { fontSize: '1.2em', color: '#333', marginBottom: '20px' },
  tripDetails: { display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', marginBottom: '40px', padding: '20px', backgroundColor: '#e1f5fe', borderRadius: '10px' },
  detailItem: { textAlign: 'center', margin: '10px' },
  detailLabel: { fontSize: '0.9em', color: '#0077b6' },
  detailValue: { fontSize: '1.1em', fontWeight: 'bold', color: '#006494' },
  sectionHeading: { fontSize: '1.5em', fontWeight: 'bold', color: '#006494', borderBottom: '2px solid #006494', paddingBottom: '10px', marginBottom: '20px' },
  itineraryList: { position: 'relative', paddingLeft: '20px' },
  dayCard: { display: 'flex', flexDirection: 'column', marginBottom: '40px', padding: '20px', backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'relative', border: '1px solid #ddd' },
  dayHeader: { display: 'flex', alignItems: 'center', marginBottom: '20px' },
  dayNumber: { backgroundColor: '#0077b6', color: '#fff', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginRight: '15px', flexShrink: 0 },
  dayTitle: { fontSize: '1.3em', color: '#006494', fontWeight: 'bold' },
  activityList: { display: 'flex', flexDirection: 'column', gap: '20px' },
  activityItem: { display: 'flex', alignItems: 'flex-start', backgroundColor: '#f9f9f9', borderRadius: '10px', padding: '15px', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)' },
  activityImage: { width: '120px', height: '100px', objectFit: 'cover', borderRadius: '8px', marginRight: '15px', flexShrink: 0 },
  activityContent: { display: 'flex', flexDirection: 'column' },
  activityTime: { fontWeight: 'bold', color: '#006494', marginBottom: '5px' },
  activityName: { fontWeight: 'bold', fontSize: '1.1em', marginBottom: '5px' },
  activityDetails: { fontSize: '0.9em', color: '#555', lineHeight: 1.5 },
  horizontalLine: { height: '1px', backgroundColor: '#ccc', margin: '30px 0' },
  message: { textAlign: 'center', fontSize: '1.2em', color: '#555', padding: '50px' }
};

const ItineraryPage: React.FC = () => {
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data from an API
    // In a real app, you would use: fetch('your-api-endpoint.com/data')
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Simulate a 2-second network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Use a real fetch call here:
        // const response = await fetch('your-api-endpoint.com/data');
        // if (!response.ok) {
        //   throw new Error('Failed to fetch data');
        // }
        // const data = await response.json();
        // setTripData(data);

        setTripData(mockApiResponse); // Using mock data for demonstration

      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to format dates as "Day, Month dd, yyyy"
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Conditional Rendering based on state
  if (isLoading) {
    return <div style={styles.message}>Loading itinerary...</div>;
  }

  if (error) {
    return <div style={styles.message}>Error: {error}</div>;
  }

  if (!tripData) {
    return <div style={styles.message}>No trip data available.</div>;
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentContainer}>
        {/* Header Section */}
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>{tripData.to.city}: {tripData.itinerary[0].title}</h1>
          <p style={styles.headerSubtitle}>{tripData.itinerary[0].summary}</p>
        </div>
        
        {/* Trip Details Section */}
        <div style={styles.tripDetails}>
          <div style={styles.detailItem}>
            <div style={styles.detailLabel}>From</div>
            <div style={styles.detailValue}>{tripData.from.city}</div>
          </div>
          <div style={styles.detailItem}>
            <div style={styles.detailLabel}>To</div>
            <div style={styles.detailValue}>{tripData.to.city}</div>
          </div>
          <div style={styles.detailItem}>
            <div style={styles.detailLabel}>Trip Duration</div>
            <div style={styles.detailValue}>{tripData.tripDuration}</div>
          </div>
          <div style={styles.detailItem}>
            <div style={styles.detailLabel}>Dates</div>
            <div style={styles.detailValue}>
              {formatDate(tripData.startDate)} - {formatDate(tripData.endDate)}
            </div>
          </div>
        </div>

        {/* Package Itinerary Section */}
        <h2 style={styles.sectionHeading}>Package Itinerary</h2>
        
        <div style={styles.itineraryList}>
          {tripData.itinerary.map((day, index) => (
            <React.Fragment key={day.day}>
              {/* Day Card */}
              <div style={styles.dayCard}>
                <div style={styles.dayHeader}>
                  <div style={styles.dayNumber}>Day {day.day}</div>
                  <h3 style={styles.dayTitle}>{day.title}</h3>
                </div>
                <p style={styles.activityDetails}>{day.summary}</p>
                <div style={styles.horizontalLine}></div>
                <div style={styles.activityList}>
                  {day.activities.map((activity, activityIndex) => (
                    <div key={activityIndex} style={styles.activityItem}>
                      {activity.image && (
                        <img
                          src={activity.image}
                          alt={activity.activity}
                          style={styles.activityImage}
                        />
                      )}
                      <div style={styles.activityContent}>
                        <div style={styles.activityTime}>{activity.time}</div>
                        <div style={styles.activityName}>{activity.activity}</div>
                        <p style={styles.activityDetails}>{activity.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* The connecting line and airplane icon from the images can be implemented here with CSS or SVG. */}
              {index < tripData.itinerary.length - 1 && (
                <div style={{
                  position: 'relative',
                  height: '50px',
                  width: '2px',
                  backgroundColor: '#006494',
                  margin: '0 auto',
                  marginBottom: '10px'
                }}>
                  <span style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                    border: '2px solid #006494',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#006494'
                  }}>✈️</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItineraryPage;
