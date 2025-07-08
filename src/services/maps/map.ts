import { MapPoint } from "@/_common/interfaces/MapPoint";

export const getMapPoints = async (): Promise<MapPoint[]> => {
  try {
    const res = await fetch("/api/maps");

    if (!res.ok) {
      throw new Error(`Failed to fetch map points: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching map points:", error);
    throw error;
  }
};