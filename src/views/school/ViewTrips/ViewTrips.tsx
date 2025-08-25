"use client";

import { Input, Select } from "@/components";
import React, { useState } from "react";
import { useDestinations } from "@/hooks/useDestinations";
import { destination } from "@/types";
import Destinations from "../Destinations/Destinations";

const TRIPS_OPTIONS = [
  { label: "ثقافي", value: "ثقافي" },
  { label: "ترفيهي", value: "ترفيهي" },
  { label: "اخرى", value: "اخرى" },
  { label: "الكل", value: "الكل" },
];

export default function ViewTrips() {
  const [selectedTrip, setSelectedTrip] = useState("");
  const [tripName, setTripName] = useState("");
  const { data: destinations = [], isLoading } = useDestinations();

  const filtereddestinations = destinations.filter(
    (destination: destination) => {
      const matchesTripType =
        selectedTrip === "" ||
        selectedTrip === "الكل" ||
        destination.type === selectedTrip;
      const matchesTripName =
        tripName === "" ||
        destination.name.toLowerCase().includes(tripName.toLowerCase());
      return matchesTripType && matchesTripName;
    }
  );

  return (
    <div className="flex flex-col gap-3 overflow-y-auto ">
      {/* Title */}
      <div className="text-3xl text-primary-3 font-arabic-bold">
        الرحلات المدرسية
      </div>

      {/* Trip Form */}
      <div className="flex  gap-[76px] mb-5">
        <div className="flex gap-3 items-center text-2xl max-w-[415px] w-full ">
          <div className="text-nowrap">اسم الوجهة</div>
          <div className="w-full">
            <Input
              placeholder="مثال: مركز لبيب التعليمي"
              value={tripName || ""}
              onChange={(e) => setTripName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-3 items-center text-2xl max-w-[300px] w-full ">
          <div className="text-nowrap">نوع الرحلة</div>
          <div className="w-full">
            <Select
              options={TRIPS_OPTIONS}
              value={selectedTrip}
              placeholder=" مثال : ترفيهية"
              className="w-full"
              variant="secondary"
              onChange={(value) => setSelectedTrip(value)}
            />
          </div>
        </div>{" "}
      </div>

      {/* destination */}
      <Destinations destinations={filtereddestinations} isLoading={isLoading} />
    </div>
  );
}
