import {
  createSupervisor,
  deleteSupervisors,
  supervisors,
} from "@/api/supervisors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateSupervisor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["supervisors"],
    mutationFn: createSupervisor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supervisors"] });
    },
  });
};

export const useSupervisors = () => {
  return useQuery({
    queryKey: ["supervisors"],
    queryFn: supervisors,
  });
};

export const useDeleteSupervisor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteSupervisor"],
    mutationFn: (id: string) => deleteSupervisors(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supervisors"] });
    },
  });
};
