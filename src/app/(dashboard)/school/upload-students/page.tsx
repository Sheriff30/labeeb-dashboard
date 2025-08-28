"use client";
import { Tabs } from "@/components";

import { FormUpload, UploadedFiles } from "@/views/upload-students";
import React, { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState<boolean>(true);

  return (
    <div className="flex flex-col overflow-auto h-full no-scrollbar gap-10">
      <Tabs
        title="رفع بيانات الطلاب"
        activeTab={activeTab}
        onTabChange={setActiveTab}
        buttonText="رفع بيانات الطلاب"
        buttonText2="بيانات تم رفعها"
      />
      {activeTab ? <FormUpload /> : <UploadedFiles />}
    </div>
  );
}
