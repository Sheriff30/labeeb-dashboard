"use client";
import { Tabs } from "@/components";
import { cn } from "@/lib";
import { subAdmin } from "@/types/types";
import { SubAdminForm } from "@/views/SubAdmin";
import { SubAdminTable } from "@/views/SubAdmin/SubAdminTable";
import React, { useState } from "react";

export default function Page() {
  const [isActive, setIsActive] = useState(true);
  const [subAdminData, setSubAdminData] = useState<subAdmin[]>([]);

  const handleAddSubAdmin = (subAdmin: subAdmin) => {
    setSubAdminData([...subAdminData, subAdmin]);
  };

  const handleDeleteSubAdmin = (id: number) => {
    setSubAdminData(subAdminData.filter((subAdmin) => subAdmin.id !== id));
  };

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
        {isActive && <SubAdminForm setSubAdmin={handleAddSubAdmin} />}
        {!isActive && (
          <SubAdminTable
            subAdmin={subAdminData}
            handleDelete={handleDeleteSubAdmin}
          />
        )}
      </div>
    </div>
  );
}
