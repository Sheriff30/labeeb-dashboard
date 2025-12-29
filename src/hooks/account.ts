import { useQueryClient } from "@tanstack/react-query";
// Hook to invalidate the 'current-user' query
export const useInvalidateCurrentUser = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["current-user"] });
};
import { updateSchoolProfile, UpdateSchoolProfilePayload } from "@/api/account";
import { useMutation } from "@tanstack/react-query";

export const useUpdateSchoolProfile = () => {
  return useMutation({
    mutationKey: ["update-school-profile"],
    mutationFn: (payload: UpdateSchoolProfilePayload) =>
      updateSchoolProfile(payload),
    onSuccess: useInvalidateCurrentUser(),
  });
};
