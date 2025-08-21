import axiosInstance from '../utils/axiosInstance';
import { Hotel } from '../types/hotel';



export const getHotels = async (country?: string, city?: string): Promise<Hotel[]> => {
  const params: Record<string, string> = {};
  if (country) params.country = country;
  if (city) params.city = city;

  const response = await axiosInstance.get<Hotel[]>('/hotels', { params });
  return response.data;
};
