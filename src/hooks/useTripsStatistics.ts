import { getTripsStatistics } from "@/api/schoolTripsServices";
import { useQuery } from "@tanstack/react-query";

function useTripsStatistics() {
  return useQuery({
    queryKey: ["tripsStatistics"],
    queryFn: getTripsStatistics,
  });
}

export default useTripsStatistics;
