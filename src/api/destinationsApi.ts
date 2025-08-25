import { destination } from "@/types";
import { axiosInstance } from "./axiosInstance";

export const getDestinations = async () => {
  try {
    const data = await axiosInstance.get("/destination.json");
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching destinations");
  }
};

export const getDestination = async (id: string | number) => {
  try {
    const response = await axiosInstance.get("/destination.json");
    return response.data.find((d: destination) => String(d.id) === id);
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching destination by id");
  }
};
