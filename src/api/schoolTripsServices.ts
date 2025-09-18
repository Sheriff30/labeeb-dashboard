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
