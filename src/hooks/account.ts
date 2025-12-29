import { updateSchoolProfile, UpdateSchoolProfilePayload } from "@/api/account";
import { useMutation } from "@tanstack/react-query";

export const useUpdateSchoolProfile = () => {
  return useMutation({
    mutationKey: ["update-school-profile"],
    mutationFn: (payload: UpdateSchoolProfilePayload) =>
      updateSchoolProfile(payload),
  });
};
