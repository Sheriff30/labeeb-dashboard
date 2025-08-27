import { axiosInstance } from "./axiosInstance";

export const getTrips = async () => {
  try {
    const data = await axiosInstance.get("/trips.json");
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching trips");
  }
};
