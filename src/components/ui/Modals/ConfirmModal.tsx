import React from "react";
import { ModalWrapper } from "../ModalWrapper";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shared";

type SuccessModalProps = {
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  titleColor?: string;
  buttonText?: string;
  type?: "success" | "delete";
};

export default function ConfirmModal({
  title,
  message,
  onConfirm,
  type = "success",
  onClose,
  titleColor,
  buttonText = "تم",
}: SuccessModalProps) {
  return (
    <ModalWrapper onClose={onClose || (() => {})}>
      <Image
        src="/images/close.svg"
        alt="close"
        width={32}
        height={32}
        className="absolute top-4 left-4 cursor-pointer"
        onClick={onClose || (() => {})}
      />
      <div className="flex items-center gap-3">
        <Image
          src={
            type === "delete"
              ? "/images/deleteModal.svg"
              : "/images/formSuccess.svg"
          }
          alt="success"
          width={102}
          height={102}
        />
      </div>
      {title && (
        <h2 className={cn("text-3xl font-bold text-center", titleColor)}>
          {title}
        </h2>
      )}
      {message && <p className="my-4 text-2xl text-center">{message}</p>}
      {type === "delete" && (
        <div className="flex gap-3 flex-col w-full">
          <Button
            onClick={onConfirm}
            text="تأكيد الحذف"
            className="!bg-error"
          />
          <Button onClick={onClose} text="الغاء" className="!bg-navy" />
        </div>
      )}

      {type === "success" && (
        <Button
          onClick={onConfirm}
          text={buttonText}
          variant="primary"
          type="button"
          className="w-full"
        />
      )}
    </ModalWrapper>
  );
}
