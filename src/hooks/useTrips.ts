import { bookTrip, fetchSchoolTrips } from "@/api/tripsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTrips = (
  status?: "pending" | "approved" | "rejected",
  page: number = 1
) => {
  return useQuery({
    queryKey: ["trips", status, page],
    queryFn: ({ queryKey }) => {
      const [, status, page] = queryKey;
      return fetchSchoolTrips(
        status as "pending" | "approved" | "rejected",
        page as number
      );
    },
  });
};

export const useBookTrip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bookTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
};
