"use client";

import { Input, Select } from "@/components";
import React, { useState } from "react";
import { Distinations } from "@/views/school";

const TRIPS_OPTIONS = [
  { label: "ثقافي", value: "ثقافي" },
  { label: "ترفيهي", value: "ترفيهي" },
  { label: "اخرى", value: "اخرى" },
  { label: "الكل", value: "الكل" },
];

export default function ViewTrips() {
  const [selectedTrip, setSelectedTrip] = useState("");
  const [tripName, setTripName] = useState("");

  const distinations = [
    {
      id: 1,
      name: "مركز لبيب التعليمي",
      type: "ثقافي",
      images: [
        "/images/destination.png",
        "/images/destination.png",
        "/images/destination.png",
      ],
      pricePerStudent: 30,
    },
    {
      id: 2,
      name: "مدينة الملك عبدالله الرياضية",
      type: "ترفيهي",
      images: [
        "/images/destination.png",
        "/images/destination.png",
        "/images/destination.png",
      ],
      pricePerStudent: 50,
    },
    {
      id: 3,
      name: "متحف الفن الحديث",
      type: "ثقافي",
      images: [
        "/images/destination.png",
        "/images/destination.png",
        "/images/destination.png",
      ],
      pricePerStudent: 40,
    },
    {
      id: 4,
      name: "حديقة الحيوانات",
      type: "ترفيهي",
      images: [
        "/images/destination.png",
        "/images/destination.png",
        "/images/destination.png",
      ],
      pricePerStudent: 60,
    },
    {
      id: 5,
      name: "مركز العلوم والتكنولوجيا",
      type: "اخرى",
      images: [
        "/images/destination.png",
        "/images/destination.png",
        "/images/destination.png",
      ],
      pricePerStudent: 45,
    },
  ];

  const filteredDistinations = distinations.filter((distination) => {
    const matchesTripType =
      selectedTrip === "" ||
      selectedTrip === "الكل" ||
      distination.type === selectedTrip;
    const matchesTripName =
      tripName === "" ||
      distination.name.toLowerCase().includes(tripName.toLowerCase());
    return matchesTripType && matchesTripName;
  });

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

      {/* Distination */}
      <Distinations distinations={filteredDistinations} />
    </div>
  );
}
