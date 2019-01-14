import { Business, BusinessFetchData } from "../types/Business";

export const getRegion = (lat: number, lon: number, distance: number) => {
  distance = distance / 2;
  const circumference = 12075;
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
  const angularDistance = distance / circumference;

  const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
  const longitudeDelta = Math.abs(
    Math.atan2(
      Math.sin(angularDistance) * Math.cos(lat),
      Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)
    )
  );

  return {
    latitude: lat,
    longitude: lon,
    latitudeDelta,
    longitudeDelta
  };
};

export const organizeByDistance = (
  restaurants: BusinessFetchData
): BusinessFetchData => {
  restaurants.businesses.sort(
    (a: Business, b: Business) => a.distance - b.distance
  );

  return restaurants;
};
