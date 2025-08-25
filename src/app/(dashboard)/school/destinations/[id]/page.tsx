"use client";
import { useParams } from "next/navigation";
import React from "react";
import { useDestination } from "@/hooks/useDestinations";
import { Destination } from "@/views/Destination";

export default function Page() {
  const params = useParams();
  const id: string = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id ?? "";

  const { data: destination, isLoading } = useDestination(id);

  if (isLoading) {
    return <div className="text-2xl text-center">جاري تحميل الوجهة...</div>;
  }

  return (
    <div>
      <Destination destination={destination} />
    </div>
  );
}
