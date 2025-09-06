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
};

export default function SuccessModal({
  title,
  message,
  onConfirm,
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
          src="/images/formSuccess.svg"
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
      <Button
        onClick={onConfirm}
        text={buttonText}
        variant="primary"
        type="button"
        className="w-full"
      />
    </ModalWrapper>
  );
}
