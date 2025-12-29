import {
  getFileById,
  getFiles,
  downloadStudentListTemplate,
} from "@/api/filesApi";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useDownloadStudentListTemplate = () => {
  return useMutation({
    mutationKey: ["download-student-list-template"],
    mutationFn: downloadStudentListTemplate,
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "student_list_template.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    },
  });
};

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
