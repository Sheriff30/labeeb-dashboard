import { loginOtp } from "@/api/authServices";
import { useMutation } from "@tanstack/react-query";

function useLoginOtp() {
  return useMutation({
    mutationKey: ["otp"],
    mutationFn: loginOtp,
  });
}

export default useLoginOtp;
