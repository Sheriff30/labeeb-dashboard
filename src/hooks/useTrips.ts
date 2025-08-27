import { getTrips } from "@/api/tripsApi";
import { useQuery } from "@tanstack/react-query";

export const useTrips = () => {
  return useQuery({
    queryKey: ["trips"],
    queryFn: getTrips,
  });
};
