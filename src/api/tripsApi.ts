import { axiosInstance } from "./axiosInstance";

type TripData = {
  destination_id: string;
  package_id: string;
  student_ids: string[];
  trip_date: string;
  time_slot: string;
};

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

export const bookTrip = async (tripData: TripData) => {
  try {
    const response = await axiosInstance.post("/school/trips", tripData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error booking trip");
  }
};
