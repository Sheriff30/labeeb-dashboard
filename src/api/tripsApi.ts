import { axiosInstance } from "./axiosInstance";

export const fetchSchoolTrips = async (
  status?: "pending" | "approved" | "rejected",
  page: number = 1
) => {
  try {
    const response = await axiosInstance.get("/school/trips", {
      params: {
        status,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching school trips:", error);
    throw error;
  }
};
