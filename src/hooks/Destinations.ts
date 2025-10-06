import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createDestination,
  deleteDestination,
  getAdminDestinationById,
  getAdminDestinations,
  getDestinationById,
  getDestinations,
  getDestinationsTypes,
  toggleDestinationStatus,
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
export const useAdminDestinations = (
  page = 1,
  per_page = 10,
  search = "",
  type = ""
) => {
  return useQuery({
    queryKey: ["destinations", page, per_page, search, type],
    queryFn: () => getAdminDestinations({ page, per_page, search, type }),
    placeholderData: keepPreviousData,
  });
};

export const useDeleteDestination = () => {
  return useMutation({
    mutationKey: ["destinations"],
    mutationFn: deleteDestination,
  });
};

export const useDestinationById = (id: string) => {
  return useQuery({
    queryKey: ["destination", id],
    queryFn: () => getDestinationById(id),
  });
};
export const useAdminDestinationById = (id: string) => {
  return useQuery({
    queryKey: ["destinations", id],
    queryFn: () => getAdminDestinationById(id),
  });
};
export const useAdminToggleStatusDestination = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["toggleDestinationStatus", id],
    mutationFn: () => toggleDestinationStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["destinations"],
      });
    },
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
