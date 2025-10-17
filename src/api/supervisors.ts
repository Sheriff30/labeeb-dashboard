import { axiosInstance } from "./axiosInstance";

interface CreateUserRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

export const createSupervisor = async (payload: CreateUserRequest) => {
  try {
    const res = await axiosInstance.post("/users", payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const supervisors = async () => {
  try {
    const res = await axiosInstance.get("/users");
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSupervisors = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/users/${id}`);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
