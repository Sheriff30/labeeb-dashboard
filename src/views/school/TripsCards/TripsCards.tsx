import { TripsCard } from "@/components";
import React from "react";
const TRIPS_CARDS = [
  {
    href: "/school/previous-trips",
    type: "previous",
    info: "10",
  },
  {
    href: "/school/canceled-trips",
    type: "canceled",
    info: "10",
  },

  {
    href: "/school/scheduled-trips",
    type: "scheduled",
    info: "10",
  },
];

export default function TripsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {TRIPS_CARDS.map((trip) => (
        <TripsCard key={trip.href} {...trip} />
      ))}
    </div>
  );
}
