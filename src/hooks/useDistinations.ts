import { getDestination, getDistinations } from "@/api/distinationsApi";
import { useQuery } from "@tanstack/react-query";

export const useDistinations = () => {
  return useQuery({
    queryKey: ["distinations"],
    queryFn: getDistinations,
  });
};

export const useDistination = (id: string | number) => {
  return useQuery({
    queryKey: ["distination", id],
    queryFn: () => getDestination(id),
  });
};
