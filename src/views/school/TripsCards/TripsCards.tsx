"use client";
import { TripsCard } from "@/components";
import { useTrips } from "@/hooks/useTrips";

export default function TripsCards() {
  const { data: completed } = useTrips("approved", 1);
  const { data: scheduled } = useTrips("pending", 1);
  const { data: canceled } = useTrips("rejected", 1);

  const TRIPS_CARDS = [
    {
      href: "/school/trips/completed",
      type: "previous",
      info: completed?.data?.total?.toString() ?? "-",
    },
    {
      href: "/school/trips/scheduled",
      type: "scheduled",
      info: scheduled?.data?.total?.toString() ?? "-",
    },
    {
      href: "/school/trips/canceled",
      type: "canceled",
      info: canceled?.data?.total?.toString() ?? "-",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
      {TRIPS_CARDS.map((trip) => (
        <TripsCard key={trip.href} {...trip} />
      ))}
    </div>
  );
}
