import { fetchSchoolTrips } from "@/api/tripsApi";
import { useQuery } from "@tanstack/react-query";

export const useTrips = (
  status?: "pending" | "approved" | "rejected",
  page: number = 1
) => {
  return useQuery({
    queryKey: ["trips", status, page], // Include page in queryKey
    queryFn: ({ queryKey }) => {
      const [, status, page] = queryKey;
      return fetchSchoolTrips(
        status as "pending" | "approved" | "rejected",
        page as number
      );
    },
  });
};
