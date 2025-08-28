// src/types/vehicle.ts
export interface Vehicle {
  vehicle_id: string;
  make: string;
  model: string;
  year: number;
  type: string;
  seats: number;
  transmission: string;
  fuel_type: string;
  mileage: number;
  registration_no: string;
  status: string;
  location: string;
  daily_rate: number;
  features: string[];
  last_serviced: string; // ISO Date string
}
