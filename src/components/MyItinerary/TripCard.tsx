import React from 'react';
import { MapPin, Calendar, Edit } from 'lucide-react';

// Define the Trip type locally in this file
type Trip = {
  image: string;
  location: string;
  createdOn: string;
};

// Use the Trip type as props
type TripCardProps = Trip;

const TripCard: React.FC<TripCardProps> = ({ image, location, createdOn }) => {
  return (
    <div className="bg-white rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)] overflow-hidden relative font-inter">
      <img
        src={image}
        alt={location}
        className="w-full h-[153px] object-cover"
      />
      <div className="bg-primary text-white px-3 py-2 h-[54px] flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" />
          <span className="font-medium text-[11px]">{location}</span>
        </div>
        <div className="flex items-center gap-1.5 mt-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span className="text-[10px] font-light">Created on: {createdOn}</span>
        </div>
      </div>
      <button className="absolute top-[141px] right-0 bg-white text-primary rounded-tl-xl px-4 py-1.5 text-xs font-medium flex items-center gap-1.5 hover:bg-gray-100 transition-colors">
        <Edit className="w-3 h-3" />
        <span className="text-[11px] font-normal">Edit</span>
      </button>
    </div>
  );
};

export default TripCard;
