"use client";
import { useParams } from "next/navigation";
import React from "react";
import { useDestination } from "@/hooks/useDestinations";
import { Destination } from "@/views/Destination";
import { useModal } from "@/Context";
import { useRouter } from "next/navigation";

export default function Page() {
  const params = useParams();
  const id: string = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id ?? "";

  const { data: destination, isLoading } = useDestination(id);
  const router = useRouter();

  const { openModal, closeModal } = useModal();

  function handlemodal() {
    openModal("SUCCESS", {
      title: "تم تقديم الطلب بنجاح وسيتم تفعيل حسابكم في مدة أقصاها 24 ساعة",
      buttonText: " شكراً",
      onConfirm: () => {
        router.push("/login");
        closeModal();
      },
    });
  }

  if (isLoading) {
    return <div className="text-2xl text-center">جاري تحميل الوجهة...</div>;
  }

  return (
    <div>
      <Destination destination={destination} />
      <button onClick={handlemodal}>lol</button>
    </div>
  );
}
