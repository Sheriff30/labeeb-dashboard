import { bookTrip, getTrips } from "@/api/tripsApi";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useTrips = () => {
  return useQuery({
    queryKey: ["trips"],
    queryFn: getTrips,
  });
};

export const useBookTrip = () => {
  return useMutation({
    mutationFn: bookTrip,
  });
};
