import { axiosInstance } from "./axiosInstance";

export const getPackages = async () => {
  try {
    const data = await axiosInstance.get("/packages.json");
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching packages");
  }
};
