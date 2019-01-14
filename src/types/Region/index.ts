export interface Location {
  city: string;
  country: string;
  address2: string;
  address3: string;
  state: string;
  address1: string;
  zip_code: string;
}

export interface GeoData {
  latitude: number;
  longitude: number;
}

export interface RegionData {
  center: GeoData;
}
