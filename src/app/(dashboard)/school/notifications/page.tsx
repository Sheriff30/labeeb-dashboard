"use client";
import { Notifications, Tabs } from "@/components";
import React, { useState } from "react";

import {
  useSchoolNotifications,
  useSchoolUnreadNotificationsCount,
  useMarkSchoolNotificationAsRead,
  useMarkAllSchoolNotificationsAsRead,
  useDeleteSchoolNotification,
} from "@/hooks/notifications";

export default function Page() {
  const [isActive, setIsActive] = useState(true);
  // Fetch notifications based on tab (unread/read)
  const notificationsParams = isActive
    ? { status: "unread" as const }
    : { status: "read" as const };
  const { data, isPending, error } =
    useSchoolNotifications(notificationsParams);
  const { data: unreadCount } = useSchoolUnreadNotificationsCount();
  const markAsRead = useMarkSchoolNotificationAsRead();
  const markAllAsRead = useMarkAllSchoolNotificationsAsRead();
  const deleteNotification = useDeleteSchoolNotification();

  return (
    <div className="flex flex-col gap-4 h-full">
      <Tabs
        title="الإشعارات"
        activeTab={isActive}
        onTabChange={setIsActive}
        buttonText={`غير مقروءة (${unreadCount?.data.unread_count ?? 0})`}
        buttonText2="مقروءة"
      />
      <div className="h-full overflow-auto no-scrollbar">
        {isPending && <div>جاري التحميل...</div>}
        {error && <div>حدث خطأ أثناء جلب الإشعارات</div>}
        {!isPending && data && (
          <div className="flex flex-col gap-4 max-w-[900px]">
            <div className="flex justify-end mb-2">
              {isActive && data.data.notifications.data.length > 0 && (
                <button
                  className="bg-primary text-white px-4 py-2 rounded"
                  onClick={() => markAllAsRead.mutate()}
                  disabled={markAllAsRead.isPending}
                >
                  تحديد الكل كمقروء
                </button>
              )}
            </div>
            {data.data.notifications.data.length === 0 && (
              <div className="text-center text-gray-500">لا توجد إشعارات</div>
            )}
            {data.data.notifications.data.map((notification) => (
              <div
                key={notification.id}
                className={`flex gap-3 items-center flex-col text-center md:flex-row md:text-start ${
                  notification.read_at ? "text-gray" : "text-primary"
                }`}
              >
                <Notifications />
                <div className="flex-1">
                  <div className="text-3xl">{notification.title}</div>
                  <div className="text-xl text-black font-arabic-light">
                    {notification.body}
                  </div>
                  <div className="flex gap-2 mt-2">
                    {!notification.read_at && (
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded"
                        onClick={() => markAsRead.mutate(notification.id)}
                        disabled={markAsRead.isPending}
                      >
                        تحديد كمقروء
                      </button>
                    )}
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => deleteNotification.mutate(notification.id)}
                      disabled={deleteNotification.isPending}
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
