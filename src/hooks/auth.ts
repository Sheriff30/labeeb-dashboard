import {
  getCurrentUser,
  login,
  logout,
  register,
  requestLoginOtp,
  requestOtp,
  updateSchool,
} from "@/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useRequestOtp = () => {
  return useMutation({
    mutationKey: ["request-otp"],
    mutationFn: requestOtp,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: register,
  });
};

export const useRequestLoginOtp = () => {
  return useMutation({
    mutationKey: ["request-login-otp"],
    mutationFn: requestLoginOtp,
  });
};
export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });
};
export const useLogout = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });
};

export const useUpdateSchool = () => {
  return useMutation({
    mutationKey: ["update-school"],
    mutationFn: updateSchool,
  });
};
