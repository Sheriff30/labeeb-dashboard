import axiosInstance from "./axiosInstance";

type register = {
  name: string;
  email: string;
  mobile: string;
  role: string;
  organization_name: string;
  city: string;
  district: string;
  gender: string;
  schoolStage?: string[];
};
type otp = {
  mobile: string;
};
type otpVerify = {
  mobile: string;
  otp: string;
};

export const register = async (payload: register) => {
  try {
    const res = await axiosInstance.post("/auth/register", payload);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const otp = async (payload: otp) => {
  try {
    const res = await axiosInstance.post("/auth/send-otp", payload);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const verifyOtp = async (payload: otpVerify) => {
  try {
    const res = await axiosInstance.post("/auth/verify-otp", payload);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
