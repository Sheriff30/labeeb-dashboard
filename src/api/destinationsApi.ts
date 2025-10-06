import { DestinationCreate } from "@/types";
import axiosInstance from "./axiosInstance";

export const getDestinations = async ({
  page = 1,
  per_page = 10,
  search = "",
  type = "",
}) => {
  try {
    const data = await axiosInstance.get("/school/destinations", {
      params: { page, per_page, search, type },
    });
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching destinations");
  }
};

export const getAdminDestinations = async ({
  page = 1,
  per_page = 10,
  search = "",
  type = "",
}) => {
  try {
    const data = await axiosInstance.get("/admin/destinations", {
      params: { page, per_page, search, type },
    });
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching destinations");
  }
};

export const deleteDestination = async (id: string) => {
  try {
    const data = await axiosInstance.delete(`/admin/destinations/${id}`);
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting destination");
  }
};

export const toggleDestinationStatus = async (id: string) => {
  try {
    const data = await axiosInstance.patch(
      `/admin/destinations/${id}/toggle-status`
    );
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting destination");
  }
};

export const getDestinationsTypes = async () => {
  try {
    const data = await axiosInstance.get("/school/destinations/types");
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching destinations types");
  }
};
export const getAdminDestinationsCities = async () => {
  try {
    const data = await axiosInstance.get("/admin/destinations/cities");
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching destinations cities");
  }
};
export const getAdminDestinationsTypes = async () => {
  try {
    const data = await axiosInstance.get("/admin/destinations/types");
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching destinations types");
  }
};
export const getAdminDestinationsDistricts = async () => {
  try {
    const data = await axiosInstance.get("/admin/destinations/types");
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching destinations types");
  }
};

export const getDestinationById = async (id: string) => {
  try {
    const data = await axiosInstance.get(`/school/destinations/${id}`);
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching destination by ID");
  }
};
export const getAdminDestinationById = async (id: string) => {
  try {
    const data = await axiosInstance.get(`/admin/destinations/${id}`);
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching destination by ID");
  }
};

export const createDestination = async (payload: DestinationCreate) => {
  try {
    const data = await axiosInstance.post("/admin/destinations", { payload });
    return data.data;
  } catch (err) {
    console.log(err);
    throw new Error("Error creating destination");
  }
};
