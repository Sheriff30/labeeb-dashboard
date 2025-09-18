"use client";
import { TripsCard } from "@/components";
import { Loading } from "@/components/shared/Loading";
import useTripsStatistics from "@/hooks/useTripsStatistics";
import React from "react";

export default function TripsCards() {
  const { data, isLoading } = useTripsStatistics();

  const trips_cards = [
    {
      href: "/school/trips/completed",
      type: "previous",
      info: data?.overview?.completed_trips,
    },
    {
      href: "/school/trips/scheduled",
      type: "scheduled",
      info: data?.overview?.upcoming_trips,
    },
    {
      href: "/school/trips/canceled",
      type: "canceled",
      info: data?.overview?.cancelled_trips,
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xl:gap-10">
      {trips_cards.map((trip) => (
        <TripsCard key={trip.href} {...trip} />
      ))}
    </div>
  );
}
