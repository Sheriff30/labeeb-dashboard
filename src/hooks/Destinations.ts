import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getDestinations, getDestinationsTypes } from "@/api/destinationsApi";

export const useDestinations = (
  page = 1,
  per_page = 10,
  search = "",
  type = ""
) => {
  return useQuery({
    queryKey: ["destinations", page, per_page, search, type],
    queryFn: () => getDestinations({ page, per_page, search, type }),
    placeholderData: keepPreviousData,
  });
};

export const useDestinationsTypes = () => {
  return useQuery({
    queryKey: ["destinationsTypes"],
    queryFn: () => getDestinationsTypes(),
  });
};
