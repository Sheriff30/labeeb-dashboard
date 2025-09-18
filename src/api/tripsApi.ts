import { SchoolTrip } from "@/types";
import axiosInstance from "./axiosInstance";

export const getTripsStatistics = async () => {
  try {
    const res = await axiosInstance.get("/school/trips/statistics");
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createSchoolTrip = async (payload: SchoolTrip) => {
  try {
    const res = await axiosInstance.post("/school/trips", payload);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
