import { getDestination, getDestinations } from "@/api/destinationsApi";
import { useQuery } from "@tanstack/react-query";

export const useDestinations = () => {
  return useQuery({
    queryKey: ["destinations"],
    queryFn: getDestinations,
  });
};

export const useDestination = (id: string | number) => {
  return useQuery({
    queryKey: ["destination", id],
    queryFn: () => getDestination(id),
  });
};
