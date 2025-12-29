export const uploadStudentList = async (name: string, file: File) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("file", file);
  const response = await axiosInstance.post("/school/student-lists", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getStudentListById = async (id: string) => {
  const response = await axiosInstance.get(`/school/student-lists/${id}`);
  return response.data;
};
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
