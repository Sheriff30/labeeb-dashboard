import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  createDestination,
  getDestinationById,
  getDestinations,
  getDestinationsTypes,
} from "@/api/destinationsApi";

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

export const useDestinationById = (id: string) => {
  return useQuery({
    queryKey: ["destination", id],
    queryFn: () => getDestinationById(id),
  });
};

export const useDestinationsTypes = () => {
  return useQuery({
    queryKey: ["destinationsTypes"],
    queryFn: () => getDestinationsTypes(),
  });
};

export const useCreateDestination = () => {
  return useMutation({
    mutationKey: ["destination"],
    mutationFn: createDestination,
  });
};
