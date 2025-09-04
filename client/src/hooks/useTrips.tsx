import { useState, useEffect } from "react";
import { getPhotoByLocation } from "../utilities/utilities";
import { Trip } from "../types/Trip";

export const useTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTrips = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch("/api/trips");
      const data = await response.json();
      setTrips(data);
    } catch (error) {
      setError("Failed to fetch trips");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addTrip = async (trip: Trip): Promise<void> => {
    try {
      let img = await getPhotoByLocation(trip.location);
      let results = await fetch("/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...trip, img })
      });
      let data = await results.json();
      setTrips(data);
    } catch (error) {
      setError("Failed to add trip");
      console.log(error);
    }
  };

  const deleteTrip = async (id: number): Promise<void> => {
    try {
      let results = await fetch(`/api/trips/${id}`, {
        method: "DELETE"
      });
      let data = await results.json();
      setTrips(data);
    } catch (error) {
      setError("Failed to delete trip");
      console.log(error);
    }
  };

  const markTripDone = async (id: number): Promise<void> => {
    try {
      let results = await fetch(`/api/trips/${id}`, {
        method: "PUT"
      });
      let data = await results.json();
      setTrips(data);
    } catch (error) {
      setError("Failed to mark trip as done");
      console.log(error);
    }
  };

  useEffect(() => {
    getTrips();
  }, []);

  return {
    trips,
    loading,
    error,
    getTrips,
    addTrip,
    deleteTrip,
    markTripDone
  };
};
