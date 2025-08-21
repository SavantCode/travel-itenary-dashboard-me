// src/services/vehicleService.ts
import { Vehicle } from '../types/vehicle';

const API_URL = 'http://localhost:5000/api/vehicles';

interface Filters {
  [key: string]: string | number;
}

export const fetchVehicles = async (filters: Filters = {}): Promise<Vehicle[]> => {
  const queryParams = new URLSearchParams(
    Object.entries(filters).map(([key, val]) => [key, val.toString()])
  ).toString();

  const url = queryParams ? `${API_URL}?${queryParams}` : API_URL;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch vehicles');
  }
  const data: Vehicle[] = await response.json();
  return data;
};
