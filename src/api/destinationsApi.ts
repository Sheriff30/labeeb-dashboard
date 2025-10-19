import { axiosInstance } from "./axiosInstance";

export const getDestinations = async (name = "", type = "", page = 1) => {
  try {
    const data = await axiosInstance.get(
      `/destinations/search?name=${name}&type=${type}&page=${page}`
    );
    return data.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching destinations");
  }
};
