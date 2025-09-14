import { otp } from "@/api/authServices";
import { useMutation } from "@tanstack/react-query";

function useOTP() {
  return useMutation({
    mutationKey: ["otp"],
    mutationFn: otp,
  });
}

export default useOTP;
