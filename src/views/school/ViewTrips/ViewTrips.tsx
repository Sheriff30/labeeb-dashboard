"use client";

import { Input, Select } from "@/components";
import React, { useState } from "react";

const TRIPS_OPTIONS = [
  { label: "ثقافية", value: "cultural" },
  { label: "ترفيهية", value: "entertainment" },
  { label: "صناعية", value: "health" },
  { label: "اخرى", value: "other" },
];

export default function ViewTrips() {
  const [selectedTrip, setSelectedTrip] = useState("all");
  const [tripName, setTripName] = useState("");

  return (
    <div>
      <div className="flex flex-col gap-3 ">
        {/* Title */}
        <div className="text-3xl text-primary-3 font-arabic-bold">
          الرحلات المدرسية
        </div>

        {/* Trip Form */}
        <div className="flex  gap-[76px] ">
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

        {/* Distination */}
      </div>
    </div>
  );
}
