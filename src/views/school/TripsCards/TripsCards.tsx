import { TripsCard } from "@/components";
import React from "react";
const TRIPS_CARDS = [
  {
    href: "/school/trips/completed",
    type: "previous",
    info: "10",
  },
  {
    href: "/school/trips/scheduled",
    type: "scheduled",
    info: "10",
  },
  {
    href: "/school/trips/canceled",
    type: "canceled",
    info: "10",
  },
];

export default function TripsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
      {TRIPS_CARDS.map((trip) => (
        <TripsCard key={trip.href} {...trip} />
      ))}
    </div>
  );
}
