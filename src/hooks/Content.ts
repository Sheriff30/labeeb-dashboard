/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPage, getPages, updatePage } from "@/api/ContentApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usePages = (page = 1, per_page = 10, search = "", type = "") => {
  return useQuery({
    queryKey: ["pages", page, per_page, search, type],
    queryFn: () => getPages({ page, per_page, search, type }),
  });
};
export const usePage = (id: string) => {
  return useQuery({
    queryKey: ["page"],
    queryFn: () => getPage(id),
  });
};

export const useUpdatePage = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updatePage"],
    mutationFn: (payload: any) => updatePage(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });
};
