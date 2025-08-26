"use client";
import React, { useState } from "react";
import { useModal } from "@/Context/ModalContext";
import { Button } from "@/components/shared/Button";
import { usePackages } from "@/hooks/usePackages";
import { ModalWrapper } from "../ModalWrapper";

interface PackagesProps {
  onPackageSelect: (selectedPackage: string) => void;
  title?: string;
  onClose?: () => void;
}

export const PackagesModal: React.FC<PackagesProps> = ({
  onPackageSelect,
  onClose,
}) => {
  const { closeModal } = useModal();
  const [selectedPackage, setSelectedPackage] = useState("");
  const [error, setError] = useState<string>("");
  const { data: packages, isLoading } = usePackages();

  const handlePackageSelect = (p: string) => {
    setError("");
    setSelectedPackage(p);
  };
  const handleConfirm = () => {
    if (!selectedPackage) {
      setError("من فضلك اختر الباقة قبل المتابعة");
      return;
    }
    onPackageSelect(selectedPackage);
    closeModal();
  };

  console.log("lol");

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
      packages
    </ModalWrapper>
  );
};
