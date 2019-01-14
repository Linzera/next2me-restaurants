import { RegionData, GeoData, Location } from "../Region";

interface Categories {
  alias: string;
  title: string;
}

export interface Business {
  rating: number;
  price: string;
  phone: string;
  id: string;
  alias: string;
  is_closed: boolean;
  categories: [Categories];
  review_count: number;
  name: string;
  url: string;
  coordinates: GeoData;
  image_url: string;
  location: Location;
  distance: number;
  transactions: [string];
}

export interface BusinessFetchData {
  total: number;
  businesses: [Business];
  region: RegionData;
}
