export interface DeleteNotificationResponse {
  success: boolean;
  message: string;
}

export async function deleteSchoolNotification(
  id: string
): Promise<DeleteNotificationResponse> {
  const response = await axiosInstance.delete<DeleteNotificationResponse>(
    `/school/notifications/${id}`
  );
  return response.data;
}
export interface MarkAllNotificationsReadResponse {
  success: boolean;
  message: string;
  data: {
    marked_count: number;
  };
}

export async function markAllSchoolNotificationsAsRead(): Promise<MarkAllNotificationsReadResponse> {
  const response = await axiosInstance.post<MarkAllNotificationsReadResponse>(
    "/school/notifications/read-all"
  );
  return response.data;
}
export interface MarkNotificationReadResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    read_at: string;
  };
}

export async function markSchoolNotificationAsRead(
  id: string
): Promise<MarkNotificationReadResponse> {
  const response = await axiosInstance.post<MarkNotificationReadResponse>(
    `/school/notifications/${id}/read`
  );
  return response.data;
}
export interface SchoolUnreadNotificationsResponse {
  success: boolean;
  data: {
    unread_count: number;
  };
}

export async function getSchoolUnreadNotificationsCount(): Promise<SchoolUnreadNotificationsResponse> {
  const response = await axiosInstance.get<SchoolUnreadNotificationsResponse>(
    "/school/notifications/unread-count"
  );
  return response.data;
}
import { axiosInstance } from "./axiosInstance";

export interface SchoolNotification {
  id: string;
  type: "ticket_status_changed" | "ticket_reply";
  title: string;
  body: string;
  data: {
    ticket_id: number;
    ticket_number: string;
    old_status?: string;
    new_status?: string;
    [key: string]: string | number | undefined;
  };
  read_at: string | null;
  created_at: string;
}

export interface SchoolNotificationsResponse {
  success: boolean;
  data: {
    unread_count: number;
    notifications: {
      current_page: number;
      data: SchoolNotification[];
      total: number;
    };
  };
}

export type SchoolNotificationsParams = {
  status?: "unread" | "read";
  type?: "ticket_status_changed" | "ticket_reply";
  per_page?: number;
};

export async function getSchoolNotifications(
  params: SchoolNotificationsParams = {}
): Promise<SchoolNotificationsResponse> {
  const response = await axiosInstance.get<SchoolNotificationsResponse>(
    "/school/notifications",
    { params }
  );
  return response.data;
}
