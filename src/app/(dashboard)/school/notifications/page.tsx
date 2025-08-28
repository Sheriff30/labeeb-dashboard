"use client";
import { Notifications, Tabs } from "@/components";
import React, { useState } from "react";

export default function Page() {
  const [isActive, setIsActive] = useState(true);
  return (
    <div className="flex flex-col gap-4 h-full">
      <Tabs
        title="الإشعارات"
        activeTab={isActive}
        onTabChange={setIsActive}
        buttonText="غير مقروءة"
        buttonText2=" مقروءة"
      />
      <div className="h-full overflow-auto no-scrollbar">
        {isActive && (
          <div className="flex flex-col gap-4 max-w-[900px]">
            <div className="flex gap-3 items-center text-primary flex-col text-center md:flex-row md:text-start">
              <Notifications />
              <div>
                <div className="text-3xl">عنوان الإشعار </div>
                <div className="text-xl text-black font-arabic-light">
                  تفاصيل الإشعار تفاصيل الإشعارتفاصيل الإشعارتفاصيل
                  الإشعارتفاصيل الإشعارتفاصيل الإشعارتفاصيل الإشعار
                </div>
              </div>
            </div>
          </div>
        )}
        {!isActive && (
          <div className="flex flex-col gap-4 max-w-[900px]">
            <div className="flex gap-3 items-center text-gray flex-col text-center md:flex-row md:text-start">
              <Notifications />
              <div>
                <div className="text-3xl">عنوان الإشعار </div>
                <div className="text-xl text-black font-arabic-light">
                  تفاصيل الإشعار تفاصيل الإشعارتفاصيل الإشعارتفاصيل
                  الإشعارتفاصيل الإشعارتفاصيل الإشعارتفاصيل الإشعار
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
