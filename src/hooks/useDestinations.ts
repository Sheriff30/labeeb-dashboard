import { getDestinations } from "@/api/destinationsApi";
import { useQuery } from "@tanstack/react-query";

export const useDestinations = (name = "", type = "", page: number = 1) => {
  return useQuery({
    queryKey: ["destinations", name, type, page],
    queryFn: () => getDestinations(name, type, page),
  });
};
