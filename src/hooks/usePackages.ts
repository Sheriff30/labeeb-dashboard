import { getPackages } from "@/api/packagesApi";
import { useQuery } from "@tanstack/react-query";

export const usePackages = () => {
  return useQuery({
    queryKey: ["packages"],
    queryFn: getPackages,
  });
};
