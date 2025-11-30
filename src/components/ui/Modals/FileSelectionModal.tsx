"use client";
import React, { useState } from "react";
import { file } from "@/types/types";
import { useModal } from "@/Context/ModalContext";
import { Button } from "@/components/shared/Button";
import { useFiles } from "@/hooks/useFiles";
import { ModalWrapper } from "../ModalWrapper";

interface FileSelectionModalProps {
  onFileSelect: (selectedFile: file) => void; // Updated to pass the whole file object
  title?: string;
  onClose?: () => void;
}

export const FileSelectionModal: React.FC<FileSelectionModalProps> = ({
  onFileSelect,
  onClose,
}) => {
  const { closeModal } = useModal();
  const [selectedFile, setSelectedFile] = useState<file | null>(null); // Updated to store the whole file object
  const [error, setError] = useState<string>("");
  const { data: files, isLoading } = useFiles();

  const handleFileSelect = (file: file) => {
    console.log("Selected file:", file);
    setError("");
    setSelectedFile(file); // Store the whole file object
  };

  const handleConfirm = () => {
    if (!selectedFile) {
      setError("من فضلك اختر ملفاً قبل المتابعة");
      return;
    }
    console.log("Confirmed file:", selectedFile);
    onFileSelect(selectedFile); // Pass the whole file object to the parent
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  if (isLoading) {
    return (
      <ModalWrapper onClose={onClose || (() => {})}>
        <div className="text-center text-2xl">جاري التحميل...</div>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper onClose={onClose || (() => {})} className="!max-w-[815px]">
      <div className="w-full grid gap-3">
        <div className="flex justify-between ">
          <div className="text-3xl font-arabic-bold text-primary">
            إختر ملف الطلاب
          </div>
          <div
            className="text-xl text-error cursor-pointer"
            onClick={handleCancel}
          >
            رجوع للخلف
          </div>
        </div>
        <div className="flex flex-col gap-2 max-h-[540px] overflow-y-scroll no-scrollbar">
          {files.data?.map((file: file) => {
            return (
              <div
                key={file.id}
                onClick={() => handleFileSelect(file)} // Pass the whole file object
                className="border-2 border-primary cursor-pointer py-1.5 lg:py-3 px-3 lg:px-7 max-w-[455px] rounded-xl flex items-center gap-3 lg:gap-6"
              >
                <input
                  type="checkbox"
                  className="h-6 w-6 cursor-pointer appearance-none border-black border-[2.5px] rounded-[7px] checked:border-primary"
                  readOnly
                  checked={selectedFile?.id === file.id} // Compare by file ID
                />
                <div className="flex flex-col gap-2 text-xl text-gray w-full">
                  <div className="text-2xl text-primary">{file.name}</div>
                  <div className="flex items-center font-arabic-light gap-4 flex-wrap">
                    <div>
                      <span className="font-roboto">{file.students_count}</span>{" "}
                      طالب
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {error && <div className="text-error text-sm ">{error}</div>}{" "}
        <Button
          text="تأكيد اختيار الملف"
          variant="secondary"
          className="w-fit !text-2xl"
          onClick={handleConfirm}
        />
      </div>
    </ModalWrapper>
  );
};
