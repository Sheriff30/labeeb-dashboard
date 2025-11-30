import { getFileById, getFiles } from "@/api/filesApi";
import { useQuery } from "@tanstack/react-query";

export const useFiles = () => {
  return useQuery({
    queryKey: ["files"],
    queryFn: getFiles,
  });
};

export const useFile = (id: string) => {
  return useQuery({
    queryKey: ["file", id],
    queryFn: () => getFileById(id),
  });
};
