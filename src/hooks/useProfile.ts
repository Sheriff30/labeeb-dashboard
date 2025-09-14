import { profile } from "@/api/authServices";
import { useQuery } from "@tanstack/react-query";

function useProfile() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return useQuery({
    queryKey: ["profile"],
    queryFn: profile,
    enabled: !!token,
  });
}

export default useProfile;
