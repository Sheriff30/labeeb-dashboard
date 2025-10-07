/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "./axiosInstance";

export const getPages = async ({
  page = 1,
  per_page = 10,
  search = "",
  type = "",
}) => {
  try {
    const data = await axiosInstance.get("/admin/content/pages", {
      params: { page, per_page, search, type },
    });
    return data.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching pages");
  }
};
export const getPage = async (id: string) => {
  try {
    const data = await axiosInstance.get(`/admin/content/pages/${id}`);
    return data.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching pages");
  }
};

export const updatePage = async (id: string, payload: any) => {
  try {
    const data = await axiosInstance.put(
      `/admin/content/pages/${id} `,
      payload
    );
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Error creating destination");
  }
};
