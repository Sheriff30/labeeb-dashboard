import { createSchoolTrip, getTrips, getTripsStatistics } from "@/api/tripsApi";
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

export const useTrips = (type = "", page = 1, per_page = 10) => {
  return useQuery({
    queryKey: ["trips", type, page, per_page],
    queryFn: () => getTrips(type, page, per_page),
  });
};
