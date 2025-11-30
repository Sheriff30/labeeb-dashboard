"use client";
import React, { useState } from "react";
import { useModal } from "@/Context/ModalContext";
import { Button } from "@/components/shared/Button";
import { ModalWrapper } from "../ModalWrapper";
import { packageType } from "@/types";
import { Currency } from "@/components/shared";
import Image from "next/image";
import { cn } from "@/lib";
import { useDestination } from "@/hooks/useDestinations";
import { useParams } from "next/navigation";

interface PackagesProps {
  onPackageSelect: (selectedPackage: { id: string; price: string }) => void; // Updated to accept an object
  title?: string;
  onClose?: () => void;
}
export const PackagesModal: React.FC<PackagesProps> = ({
  onPackageSelect,
  onClose,
}) => {
  const { closeModal } = useModal();
  const [selectedPackage, setSelectedPackage] = useState<{
    id: string;
    price: string;
  } | null>(null);
  const [error, setError] = useState<string>("");

  const params = useParams();
  const id: string = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id ?? "";
  const { data: destination, isLoading } = useDestination(id);

  const handlePackageSelect = (p: { id: string; price: string }) => {
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

  if (isLoading) {
    return (
      <ModalWrapper onClose={onClose || (() => {})}>
        <div className="text-center text-2xl">جاري التحميل...</div>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper
      onClose={onClose || (() => {})}
      className="!max-w-[1055px] ml-auto  "
    >
      <div className=" w-full">
        <div className="text-primary text-5xl mb-8  ">
          إختر الباقة المناسبة{" "}
        </div>
        <div className="flex gap-9 items-start mb-4 flex-col lg:flex-row">
          {destination?.packages?.map((p: packageType) => {
            return (
              <div
                key={p.name}
                className={cn(
                  "w-full bg-white-2 p-[18px] rounded-xl flex flex-col gap-3 cursor-pointer ",
                  selectedPackage?.id === p.id ? "ring-2 ring-primary" : "" // Add selection styling
                )}
                onClick={() =>
                  handlePackageSelect({ id: p.id, price: p.price })
                }
              >
                <div className="flex flex-col gap-1">
                  <div className="text-2xl">{p.name}</div>
                  <div className="text-primary flex gap-1 items-center">
                    <span className="font-roboto text-5xl font-bold ">
                      {p.price}
                    </span>
                    <Currency />
                    <span className="text-2xl">طالب / ة</span>
                  </div>
                  <div className="text-xl text-gray">تشمل الأتى</div>
                  <div>
                    {p?.benefits?.map(
                      (benefit: { id: number; name: string }) => (
                        <div
                          key={benefit.id}
                          className="text-lg text-primary-blue flex gap-2"
                        >
                          <Image
                            src="/images/list-point.svg"
                            width={18}
                            height={18}
                            alt="list point"
                          />{" "}
                          {benefit.name}
                        </div>
                      )
                    )}
                  </div>
                </div>
                <Button
                  text="إختر الباقة"
                  variant="secondary"
                  className={cn(
                    "!text-black !border-black !text-2xl",
                    selectedPackage?.id === p.id ? "bg-black !text-white" : ""
                  )}
                />
              </div>
            );
          })}
        </div>
        {error && <div className="text-error mb-17">{error}</div>}
        <div className="max-w-[426px]">
          <Button text="إحجز الآن" className="w-full" onClick={handleConfirm} />
        </div>
      </div>
    </ModalWrapper>
  );
};
