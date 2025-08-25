import { DestinationCard } from "@/components";
import { destination } from "@/types";
import React from "react";

export default function Destinations({
  destinations,
  isLoading,
}: {
  destinations: destination[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center text-2xl">
        جاري تحميل الوجهات...
      </div>
    );
  }

  if (!destinations.length) {
    return (
      <div className="flex  justify-center items-center text-2xl">
        لا توجد وجهات متاحة
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-y-8 gap-x-10 overflow-y-auto pb-5 no-scrollbar">
      {destinations.map((destination) => (
        <DestinationCard key={destination.id} data={destination} />
      ))}
    </div>
  );
}
