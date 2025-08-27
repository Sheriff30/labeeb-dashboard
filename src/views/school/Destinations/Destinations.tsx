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
    <div className="grid  grid-cols-1 md:grid-cols-2 min-[1550px]:!grid-cols-3 gap-4 min-[1550px]:gap-x-10  min-[1550px]:gap-y-8 max-h-[600px] xl-max-h-auto overflow-y-auto  no-scrollbar ">
      {destinations.map((destination) => (
        <DestinationCard key={destination.id} data={destination} />
      ))}
    </div>
  );
}
