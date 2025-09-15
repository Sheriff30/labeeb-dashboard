import { logout } from "@/api/authServices";
import { useMutation } from "@tanstack/react-query";

function useLogout() {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
  });
}

export default useLogout;
