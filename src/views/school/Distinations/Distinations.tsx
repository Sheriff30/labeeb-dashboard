import { DestinationCard } from "@/components";
import React from "react";

type distination = {
  id: number;
  name: string;
  type: string;
  images: string[];
  pricePerStudent: number;
};

export default function Distinations({
  distinations,
}: {
  distinations: distination[];
}) {
  if (!distinations.length) {
    return (
      <div className="flex  justify-center items-center text-2xl">
        لا توجد وجهات متاحة
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-y-8 gap-x-10 overflow-y-auto pb-5 no-scrollbar">
      {distinations.map((distination) => (
        <DestinationCard key={distination.id} data={distination} />
      ))}
    </div>
  );
}
