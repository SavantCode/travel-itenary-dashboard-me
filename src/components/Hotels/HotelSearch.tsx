import React, { useState } from 'react';

import { useHotels } from '../../hooks/useHotels';
import { Hotel } from '../../types/hotel';

interface Props {
  onSelect: (hotel: Hotel) => void;
}

const HotelSearch: React.FC<Props> = ({ onSelect }) => {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const { hotels, loading, error } = useHotels(country, city);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-2">
        {hotels.map((hotel) => (
          <li
            key={hotel.id}
            className="border p-2 rounded cursor-pointer hover:bg-gray-100"
            onClick={() => onSelect(hotel)}
          >
            <p className="font-bold">{hotel.name}</p>
            <p className="text-sm">{hotel.location.city}, {hotel.location.country}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelSearch;
