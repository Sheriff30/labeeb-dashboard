import { DestinationCard } from "@/components";
import { Loading } from "@/components/shared/Loading";
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
    return <Loading />;
  }

  if (!destinations.length) {
    return (
      <div className="flex  justify-center items-center text-2xl">
        لا توجد وجهات متاحة
      </div>
    );
  }

  return (
    <div className="grid   grid-cols-1 md:grid-cols-2 min-[1550px]:!grid-cols-3 gap-4   xl-max-h-auto overflow-y-auto  no-scrollbar ">
      {destinations.map((destination) => (
        <DestinationCard key={destination.id} data={destination} />
      ))}
    </div>
  );
}
