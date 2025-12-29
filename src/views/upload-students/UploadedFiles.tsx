import { useModal } from "@/Context/ModalContext";
import { useFiles } from "@/hooks/useFiles";
import { confirmModalProps } from "@/types";
import Image from "next/image";
import React from "react";

export default function UploadedFiles() {
  const { data: files, isLoading } = useFiles();
  const { openModal, closeModal } = useModal();

  const confirmAction = (options: confirmModalProps) => {
    return new Promise<boolean>((resolve) => {
      openModal("CONFIRM", {
        ...options,
        onConfirm: () => {
          closeModal();
          resolve(true);
        },
        onCancel: () => {
          closeModal();
          resolve(false);
        },
      });
    });
  };

  const handleDelete = async () => {
    const confirmed = await confirmAction({
      title: "هل أنت متأكد من حذف الملف؟",
      type: "delete",
      buttonText: "حذف",
    });

    if (confirmed) {
      await confirmAction({
        title: "تم حذف الملف بنجاح",
        buttonText: "شكراً",
      });
    }
  };

  if (isLoading) {
    return <div className="text-2xl text-center">جاري تحميل الملفات...</div>;
  }
  type FileListItem = {
    id?: string | number;
    name: string;
    students_count?: number;
    total_students?: number;
    students?: unknown[];
    created_at?: string;
    file_path?: string;
  };
  const fileList: FileListItem[] = Array.isArray(files?.data)
    ? files.data
    : Array.isArray(files)
    ? files
    : [];
  if (!fileList.length) {
    return (
      <div className="text-2xl text-center">لا توجد ملفات مرفوعة بعد.</div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1000px] w-full">
      {fileList.map((file) => {
        const key =
          file.id ?? file.file_path ?? `${file.name}-${file.created_at ?? ""}`;
        return (
          <div
            key={key}
            className="p-[18px] border-2 rounded-xl border-gray grid gap-1 w-full "
          >
            <div className="flex gap-6 text-xl">
              <div>اسم الملف</div>
              <div className="font-roboto">{file.name}</div>
            </div>
            <div className="flex gap-6 text-xl items-center">
              <div>عدد الطلاب</div>
              <div className="font-roboto">
                {file.students_count ??
                  file.total_students ??
                  (file.students ? file.students.length : 0)}
              </div>
            </div>
            <div className="flex gap-6 text-xl items-center">
              <div>تاريخ الإضافة</div>
              <div className="font-roboto">
                {file.created_at
                  ? new Date(file.created_at).toLocaleDateString()
                  : "-"}
              </div>
            </div>

            <div
              className="border-error border-2 flex gap-2 items-center justify-center py-1 rounded-lg cursor-pointer"
              onClick={() => handleDelete()}
            >
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
