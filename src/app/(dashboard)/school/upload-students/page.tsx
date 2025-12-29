"use client";
import { Tabs, Button } from "@/components";
import { useDownloadStudentListTemplate } from "@/hooks/useFiles";

import { FormUpload, UploadedFiles } from "@/views/upload-students";
import React, { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState<boolean>(true);
  const { mutate: downloadTemplate, isPending } =
    useDownloadStudentListTemplate();

  const handleDownload = () => {
    downloadTemplate();
  };

  return (
    <div className="flex flex-col overflow-auto h-full no-scrollbar gap-10">
      <div className="flex items-center gap-4 justify-between">
        <Tabs
          title="رفع بيانات الطلاب"
          activeTab={activeTab}
          onTabChange={setActiveTab}
          buttonText="رفع بيانات الطلاب"
          buttonText2="بيانات تم رفعها"
        />
        <Button
          text={isPending ? "جاري التحميل..." : "تحميل  قائمة الطلاب"}
          onClick={handleDownload}
          variant="secondary"
          disabled={isPending}
          className="mb-6"
        />
      </div>
      {activeTab ? <FormUpload /> : <UploadedFiles />}
    </div>
  );
}
