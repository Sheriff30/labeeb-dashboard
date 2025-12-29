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

export const getFileById = async (id: string) => {
  try {
    const data = await axiosInstance.get(`/school/student-lists/${id}`);
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching file by ID");
  }
};

export const downloadStudentListTemplate = async (): Promise<Blob> => {
  const response = await axiosInstance.get("/school/student-lists/template", {
    responseType: "blob",
  });
  return response.data;
};
