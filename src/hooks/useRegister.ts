import { register } from "@/api/authServices";
import { useMutation } from "@tanstack/react-query";

function useRegister() {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: register,
  });
}

export default useRegister;
