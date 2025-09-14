import { verifyOtp } from "@/api/authServices";
import { useMutation } from "@tanstack/react-query";

function useVerifyOtp() {
  return useMutation({
    mutationKey: ["verifyOtp"],
    mutationFn: verifyOtp,
  });
}

export default useVerifyOtp;
