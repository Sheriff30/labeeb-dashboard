import {
  login,
  logout,
  register,
  requestLoginOtp,
  requestOtp,
} from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

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
