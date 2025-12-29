import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSchoolNotifications,
  getSchoolUnreadNotificationsCount,
  markSchoolNotificationAsRead,
  markAllSchoolNotificationsAsRead,
  deleteSchoolNotification,
  SchoolNotificationsParams,
  SchoolNotificationsResponse,
  SchoolUnreadNotificationsResponse,
  MarkNotificationReadResponse,
  MarkAllNotificationsReadResponse,
  DeleteNotificationResponse,
} from "../api/notifications";

// Fetch all notifications
export function useSchoolNotifications(params: SchoolNotificationsParams = {}) {
  return useQuery<SchoolNotificationsResponse, Error>({
    queryKey: ["school-notifications", params],
    queryFn: () => getSchoolNotifications(params),
  });
}

// Fetch unread notifications count
export function useSchoolUnreadNotificationsCount() {
  return useQuery<SchoolUnreadNotificationsResponse, Error>({
    queryKey: ["school-unread-notifications-count"],
    queryFn: getSchoolUnreadNotificationsCount,
  });
}

// Mark a notification as read
export function useMarkSchoolNotificationAsRead() {
  const queryClient = useQueryClient();
  return useMutation<MarkNotificationReadResponse, Error, string>({
    mutationFn: (id: string) => markSchoolNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["school-notifications"] });
      queryClient.invalidateQueries({
        queryKey: ["school-unread-notifications-count"],
      });
    },
  });
}

// Mark all notifications as read
export function useMarkAllSchoolNotificationsAsRead() {
  const queryClient = useQueryClient();
  return useMutation<MarkAllNotificationsReadResponse, Error, void>({
    mutationFn: () => markAllSchoolNotificationsAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["school-notifications"] });
      queryClient.invalidateQueries({
        queryKey: ["school-unread-notifications-count"],
      });
    },
  });
}

// Delete a notification
export function useDeleteSchoolNotification() {
  const queryClient = useQueryClient();
  return useMutation<DeleteNotificationResponse, Error, string>({
    mutationFn: (id: string) => deleteSchoolNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["school-notifications"] });
      queryClient.invalidateQueries({
        queryKey: ["school-unread-notifications-count"],
      });
    },
  });
}
