import { profile } from "@/api/authServices";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

function useProfile() {
  const token = Cookies.get("token");
  return useQuery({
    queryKey: ["profile"],
    queryFn: profile,
    enabled: !!token,
  });
}

export default useProfile;
