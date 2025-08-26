"use client";
import React, { useState } from "react";
import { file } from "@/types/types";
import { useModal } from "@/Context/ModalContext";
import { Button } from "@/components/shared/Button";
import { useFiles } from "@/hooks/useFiles";
import { ModalWrapper } from "../ModalWrapper";

interface FileSelectionModalProps {
  onFileSelect: (selectedFile: string) => void;
  title?: string;
  onClose?: () => void;
}

export const FileSelectionModal: React.FC<FileSelectionModalProps> = ({
  onFileSelect,
  onClose,
}) => {
  const { closeModal } = useModal();
  const [selectedFile, setSelectedFile] = useState("");
  const [error, setError] = useState<string>("");
  const { data: files, isLoading } = useFiles();

  const handleFileSelect = (file: string) => {
    setError("");
    setSelectedFile(file);
  };
  const handleConfirm = () => {
    if (!selectedFile) {
      setError("من فضلك اختر ملفاً قبل المتابعة");
      return;
    }
    onFileSelect(selectedFile);
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
          {files.map((file: file) => {
            return (
              <div
                key={file.id}
                onClick={() => handleFileSelect(file.filePath)}
                className="border-2 border-primary cursor-pointer py-3 px-7 max-w-[455px] rounded-xl flex items-center gap-6"
              >
                <input
                  type="checkbox"
                  className="h-6 w-6 cursor-pointer appearance-none border-black border-[2.5px] rounded-[7px] checked:border-primary"
                  readOnly
                  checked={selectedFile === file.filePath}
                />
                <div className="flex flex-col gap-2 text-xl text-gray w-full">
                  <div className="text-2xl text-primary">{file.title}</div>
                  <div className="flex  justify-between items-center font-arabic-light gap-1">
                    <div>
                      <span className="font-roboto">{file.students}</span> طالب
                    </div>
                    <div className="flex gap-3">
                      {file.gender.map((gender: string, index) => {
                        return <span key={index}>{gender} </span>;
                      })}
                    </div>
                    <div className="flex gap-3">
                      {file.levels.map((gender: string, index) => {
                        return <span key={index}>{gender} </span>;
                      })}
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
