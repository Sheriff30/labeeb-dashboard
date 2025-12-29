import { createSupportTicket, CreateSupportTicketPayload } from "@/api/support";
import { useMutation } from "@tanstack/react-query";

export const useCreateSupportTicket = () => {
  return useMutation({
    mutationKey: ["create-support-ticket"],
    mutationFn: (payload: CreateSupportTicketPayload) =>
      createSupportTicket(payload),
  });
};
