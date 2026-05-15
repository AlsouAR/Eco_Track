export type LocationType = "recycle" | "bike" | "event";

export type EcoLocation = {
  id: number;
  name: string;
  type: LocationType;
  lat: number;
  lng: number;
  address: string;
  hours: string;
  description: string;
};
