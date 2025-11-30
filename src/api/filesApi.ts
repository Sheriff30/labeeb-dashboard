import { axiosInstance } from "./axiosInstance";

export const getFiles = async () => {
  try {
    const data = await axiosInstance.get("/school/student-lists");
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching files");
  }
};
