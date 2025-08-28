"use client";
import { Tabs } from "@/components";
import { cn } from "@/lib";
import { SubAdminForm } from "@/views/SubAdmin";
import { SubAdminTable } from "@/views/SubAdmin/SubAdminTable";
import React, { useState } from "react";

export default function Page() {
  const [isActive, setIsActive] = useState(true);
  return (
    <div className={cn(" flex flex-col h-full", isActive ? "gap-10" : "gap-0")}>
      <Tabs
        title="المشرفين"
        activeTab={isActive}
        onTabChange={setIsActive}
        buttonText="إضافة مشرف فرعي"
        buttonText2="المشرفين الحاليين"
      />{" "}
      <div className="h-full overflow-y-auto no-scrollbar">
        {isActive && <SubAdminForm />}
        {!isActive && <SubAdminTable />}
      </div>
    </div>
  );
}
