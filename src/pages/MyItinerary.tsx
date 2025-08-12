import React from "react";
import { MapPin, Calendar, Edit, MoreHorizontal } from "lucide-react";

const tripData = [
  {
    id: 1,
    image: "https://i.pinimg.com/736x/a0/b6/6d/a0b66deb616586c844dd785978773c46.jpg",
    location: "Thailand Trip Plan",
    createdOn: "March 14, 2025"
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/1446624/pexels-photo-1446624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    location: "Paris Getaway",
    createdOn: "February 20, 2025"
  },
  {
    id: 3,
    image: "https://travelbird-images.imgix.net/95/28/9528449f8ede7c002cecb00c7af115c0?auto=compress%2Cformat&crop=faces%2Cedges%2Ccenter&fit=crop&h=414&w=736",
    location: "Bali Escape",
    createdOn: "January 5, 2025"
  },
  {
    id: 4,
    image: "https://i.pinimg.com/736x/a0/b6/6d/a0b66deb616586c844dd785978773c46.jpg",
    location: "Swiss Alps Adventure",
    createdOn: "December 15, 2024"
  },
  {
    id: 5,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY6bCAa_usTA6PSU4vF1Gyh56wAT3Zs3gHpXg7rkS-UKAlpL7n6EbZ6S974oYwsApNLzE&usqp=CAU",
    location: "New York City Tour",
    createdOn: "November 2, 2024"
  },
  {
    id: 6,
    image: "https://i.pinimg.com/736x/a0/b6/6d/a0b66deb616586c844dd785978773c46.jpg",
    location: "Tokyo Highlights",
    createdOn: "October 18, 2024"
  },
  {
    id: 7,
    image: "https://i.pinimg.com/736x/a0/b6/6d/a0b66deb616586c844dd785978773c46.jpg",
    location: "Rome Cultural Tour",
    createdOn: "September 10, 2024"
  },
  {
    id: 8,
    image: "https://i.pinimg.com/736x/a0/b6/6d/a0b66deb616586c844dd785978773c46.jpg",
    location: "Dubai Luxury Trip",
    createdOn: "August 25, 2024"
  },
  {
    id: 9,
    image: "https://i.pinimg.com/736x/a0/b6/6d/a0b66deb616586c844dd785978773c46.jpg",
    location: "Maldives Honeymoon",
    createdOn: "July 12, 2024"
  },
  {
    id: 10,
    image: "https://i.pinimg.com/736x/a0/b6/6d/a0b66deb616586c844dd785978773c46.jpg",
    location: "Maldives Honeymoon",
    createdOn: "July 12, 2024"
  },
  {
    id: 11,
    image: "https://i.pinimg.com/736x/a0/b6/6d/a0b66deb616586c844dd785978773c46.jpg",
    location: "Maldives Honeymoon",
    createdOn: "July 12, 2024"
  },
  {
    id: 12,
    image: "https://i.pinimg.com/736x/a0/b6/6d/a0b66deb616586c844dd785978773c46.jpg",
    location: "Maldives Honeymoon",
    createdOn: "July 12, 2024"
  },
  {
    id: 13,
    image: "https://i.pinimg.com/736x/a0/b6/6d/a0b66deb616586c844dd785978773c46.jpg",
    location: "Maldives Honeymoon",
    createdOn: "July 12, 2024"
  },
  {
    id: 14,
    image: "https://i.pinimg.com/736x/a0/b6/6d/a0b66deb616586c844dd785978773c46.jpg",
    location: "Maldives Honeymoon",
    createdOn: "July 12, 2024"
  },
  {
    id: 15,
    image: "https://i.pinimg.com/736x/a0/b6/6d/a0b66deb616586c844dd785978773c46.jpg",
    location: "Maldives Honeymoon",
    createdOn: "July 12, 2024"
  }
];


const ItineraryContainer = () => {
  return (
    <div className="flex space-x-6 p-6 pt-2 bg-gray-50 min-h-screen">
      {/* Left: Previous Trips */}
      <div className="flex-1 overflow-y-auto max-h-[calc(100vh-3rem)]">
        
        
        <h2 className="text-2xl font-bold mb-4 sticky top-0 bg-gray-50 z-10 py-2">
          My Itinerary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tripData.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-md shadow-sm overflow-hidden relative text-sm"
            >
              {/* Image */}
              <img
                src={trip.image}
                alt={trip.location}
                className="w-full h-28 object-cover" // 🔽 Reduced height
              />

              {/* Blue Strip */}
              <div className="bg-blue-600 text-white p-2 flex flex-col space-y-1 relative">
                <div className="flex items-center space-x-1 text-xs">
                  <MapPin className="w-3 h-3" />
                  <span className="font-semibold">{trip.location}</span>
                </div>
                <div className="flex items-center space-x-1 text-[11px] opacity-90">
                  <Calendar className="w-3 h-3" />
                  <span>Created on {trip.createdOn}</span>
                </div>

                {/* Edit Corner */}
                <div className="absolute top-0 right-0 bg-white text-blue-600 rounded-bl-2xl px-2 py-1 shadow cursor-pointer flex items-center space-x-1">
                  <Edit className="w-3 h-3" />
                  <span className="text-[10px] font-medium">Edit</span>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>

      {/* Right: Notes Section */}
      <div className="w-80 flex-shrink-0">
        <h2 className="text-xl font-bold mb-2">NOTE</h2>
        <hr className="border-gray-300 mb-4" />

        <div className="border border-gray-300 rounded-lg overflow-hidden">
          {/* Sightseeing Header */}
          <div className="bg-blue-600 text-white flex items-center justify-between px-4 py-2">
            <span className="font-semibold">Sightseeing</span>
            <MoreHorizontal className="w-5 h-5 cursor-pointer" />
          </div>

          {/* Content */}
          <div className="p-4 text-sm text-gray-700 space-y-2">
            <ul className="list-disc pl-5 space-y-1">
              <li>Use this itinerary as a template for planning your own trip.</li>
              <li>Update destinations based on your travel goals.</li>
              <li>Adjust the travel dates to match your schedule.</li>
              <li>
                Customize activities for each day (sightseeing, leisure, meals, etc.).
              </li>
              <li>Edit accommodations to reflect your hotel or stay preferences.</li>
              <li>Helps you stay organized and plan each day efficiently.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryContainer;
