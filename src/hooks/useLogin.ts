import { login } from "@/api/authServices";
import { useMutation } from "@tanstack/react-query";

function useLogin() {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });
}

export default useLogin;
