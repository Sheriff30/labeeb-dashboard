import { axiosInstance } from "./axiosInstance";

export interface UpdateSchoolProfilePayload {
  name?: string;
  city?: string;
  district?: string;
  gender?: "male" | "female" | "mixed";
  type?: "kindergarten" | "elementary" | "middle_school" | "high_school";
  representative_name?: string;
  representative_phone?: string;
  email?: string;
}

export const updateSchoolProfile = async (
  payload: UpdateSchoolProfilePayload
) => {
  try {
    const res = await axiosInstance.put("/school/profile", payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};
