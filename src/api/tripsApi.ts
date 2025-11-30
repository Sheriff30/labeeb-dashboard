import { axiosInstance } from "./axiosInstance";

type TripData = {
  destination_id: string;
  package_id: string;
  student_ids: string[];
  trip_date: string;
  time_slot: string;
};

export const getTrips = async () => {
  try {
    const data = await axiosInstance.get("/trips.json");
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching trips");
  }
};

export const bookTrip = async (tripData: TripData) => {
  try {
    const response = await axiosInstance.post("/school/trips", tripData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error booking trip");
  }
};
