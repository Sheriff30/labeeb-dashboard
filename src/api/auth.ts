import { axiosInstance } from "./axiosInstance";

interface SchoolRegistration {
  school_name: string;
  city: string;
  district: string;
  gender: "male" | "female" | "mixed";
  school_type: "kindergarten" | "elementary" | "middle_school" | "high_school";
  representative_name: string;
  representative_phone: string;
  email: string;
  password: string;
  password_confirmation: string;
  otp: string;
}

interface LoginOtp {
  identifier: string;
  type: "email" | "phone";
}

interface Login {
  identifier: string;
  otp: string;
}

export const requestOtp = async (representative_phone: string) => {
  try {
    const res = await axiosInstance.post("/school/register/request-otp", {
      representative_phone,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (payload: SchoolRegistration) => {
  try {
    const res = await axiosInstance.post("/school/register", payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const requestLoginOtp = async (payload: LoginOtp) => {
  try {
    const res = await axiosInstance.post("/school/login/request-otp", payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (payload: Login) => {
  try {
    const res = await axiosInstance.post("/school/login", payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const logout = async () => {
  try {
    const res = await axiosInstance.post("/school/logout");
    return res.data;
  } catch (error) {
    throw error;
  }
};
