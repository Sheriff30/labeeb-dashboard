import { getFiles } from "@/api/filesApi";
import { useQuery } from "@tanstack/react-query";

export const useFiles = () => {
  return useQuery({
    queryKey: ["files"],
    queryFn: getFiles,
  });
};
