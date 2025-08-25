import { getDestination, getDistinations } from "@/api/distinationsApi";
import { useQuery } from "@tanstack/react-query";

export const useDestinations = () => {
  return useQuery({
    queryKey: ["distinations"],
    queryFn: getDistinations,
  });
};

export const useDestination = (id: string | number) => {
  return useQuery({
    queryKey: ["distination", id],
    queryFn: () => getDestination(id),
  });
};
