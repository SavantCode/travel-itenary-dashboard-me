export interface Hotel {
  id: number;
  name: string;
  location: {
    country: string;
    city: string;
  };
  rating: number;
  images: string[];
}
