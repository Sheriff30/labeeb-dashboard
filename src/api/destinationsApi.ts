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

export const getDestinationsTypes = async () => {
  try {
    const data = await axiosInstance.get("/school/destinations/types");
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
