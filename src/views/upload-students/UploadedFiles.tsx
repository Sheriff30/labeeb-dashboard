import { useFiles } from "@/hooks/useFiles";
import { file } from "@/types";
import Image from "next/image";
import React from "react";

export default function UploadedFiles() {
  const { data: files, isLoading } = useFiles();

  if (isLoading) {
    return <div className="text-2xl text-center">جاري تحميل الرحلات...</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1000px] w-full">
      {files.map((file: file) => {
        return (
          <div
            key={file.id}
            className="p-[18px] border-2 rounded-xl border-gray grid gap-1 w-full "
          >
            <div className="text-2xl text-primary">{file.title}</div>
            <div className="flex gap-6 text-xl">
              <div>تاريخ الإضافة</div>
              <div className="font-roboto">{file.date}</div>
            </div>
            <div className="flex gap-6 text-xl items-center">
              <div>المرحلة</div>
              <div className="flex gap-2 flex-col">
                {file.levels.map((level, index) => {
                  return <div key={index}>{level}</div>;
                })}
              </div>
            </div>
            <div className="flex gap-6 text-xl items-center">
              <div>الفئة</div>
              <div className="flex gap-2 flex-col">
                {file.gender.map((gender, index) => {
                  return <div key={index}>{gender}</div>;
                })}
              </div>
            </div>
            <div className="flex gap-6 text-xl items-center">
              <div>عدد الطلاب</div>
              <div className="font-roboto">{file.students}</div>
            </div>

            <div className="border-error border-2 flex gap-2 items-center justify-center py-1 rounded-lg cursor-pointer">
              <Image
                src="/images/delete.svg"
                alt="delete"
                width={32}
                height={32}
              />
              <div className="text-error text-2xl">حذف الملف</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
