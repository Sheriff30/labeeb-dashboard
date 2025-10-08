/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createArticle,
  createCategory,
  deleteArticle,
  getArticles,
  getCategories,
  getPage,
  getPages,
  updateArticle,
  updatePage,
} from "@/api/ContentApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usePages = (page = 1, per_page = 10, search = "", type = "") => {
  return useQuery({
    queryKey: ["pages", page, per_page, search, type],
    queryFn: () => getPages({ page, per_page, search, type }),
  });
};
export const useArticles = (
  page = 1,
  per_page = 10,
  search = "",
  type = ""
) => {
  return useQuery({
    queryKey: ["articles", page, per_page, search, type],
    queryFn: () => getArticles({ page, per_page, search, type }),
  });
};
export const usePage = (id: string) => {
  return useQuery({
    queryKey: ["page"],
    queryFn: () => getPage(id),
  });
};
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
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
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createCategory"],
    mutationFn: (payload: any) => createCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createArticle"],
    mutationFn: (payload: any) => createArticle(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteArticle"],
    mutationFn: (id: string) => deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

export const useUpdateArticle = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateArticle", id],
    mutationFn: (payload: any) => updateArticle(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};
