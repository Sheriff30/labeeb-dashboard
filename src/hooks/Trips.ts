import { createSchoolTrip, getTripsStatistics } from "@/api/tripsApi";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useTripsStatistics = () => {
  return useQuery({
    queryKey: ["tripsStatistics"],
    queryFn: getTripsStatistics,
  });
};

export const useCreateTrip = () => {
  return useMutation({
    mutationKey: ["createTrip"],
    mutationFn: createSchoolTrip,
  });
};
