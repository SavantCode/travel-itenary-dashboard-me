import { useState, useEffect } from 'react';
import { Hotel } from '../types/hotel';
import { getHotels } from '../api/hotels';

export const useHotels = (searchCountry?: string, searchCity?: string) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const data = await getHotels(searchCountry, searchCity);
        setHotels(data);
        setError(null);
      } catch (err) {
        setError('Failed to load hotels.');
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [searchCountry, searchCity]);

  return { hotels, loading, error };
};
