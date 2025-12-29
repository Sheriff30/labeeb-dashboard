import { axiosInstance } from "./axiosInstance";

export interface CreateSupportTicketPayload {
  category_id: string | number;
  subject: string;
  message: string;
  priority?: "low" | "medium" | "high" | "urgent";
  attachments?: File[];
}

export const createSupportTicket = async (
  payload: CreateSupportTicketPayload
) => {
  const formData = new FormData();
  formData.append("category_id", String(payload.category_id));
  formData.append("subject", payload.subject);
  formData.append("message", payload.message);
  if (payload.priority) {
    formData.append("priority", payload.priority);
  }
  if (payload.attachments) {
    payload.attachments.forEach((file) => {
      formData.append("attachments[]", file);
    });
  }
  const res = await axiosInstance.post("/school/support/tickets", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
