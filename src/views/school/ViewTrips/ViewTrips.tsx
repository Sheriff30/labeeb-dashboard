"use client";

import { Input, Select } from "@/components";
import React, { useState } from "react";
import { useDestinations, useDestinationsTypes } from "@/hooks/Destinations";
import Destinations from "../Destinations/Destinations";
import Pagination from "@/components/shared/Pagination/Pagination";

export default function ViewTrips() {
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { data: types } = useDestinationsTypes();

  const trip_options = types?.data
    ? Object.entries(types.data).map(([key, value]) => ({
        label: value as string,
        value: key,
      }))
    : [];

  const per_page = 10;
  const {
    data: destinations = [],
    isLoading,
    isFetching,
  } = useDestinations(page, per_page, search, type);

  const lastPage = destinations?.meta?.last_page || 1;

  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto] gap-3 overflow-y-auto ">
      {/* Title */}
      <div className="text-3xl text-primary-3 font-arabic-bold">
        الرحلات المدرسية
      </div>

      {/* Trip Form */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-[76px] mb-5">
        <div className="flex flex-col md:flex-row gap-3 md:items-center text-2xl md:max-w-[415px] w-full ">
          <div className="text-nowrap">اسم الوجهة</div>
          <div className="w-full">
            <Input
              placeholder="مثال: مركز لبيب التعليمي"
              value={search || ""}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 md:items-center text-2xl md:max-w-[300px] w-full ">
          <div className="text-nowrap">نوع الرحلة</div>
          <div className="w-full">
            <Select
              options={trip_options}
              value={type}
              placeholder=" مثال : ترفيهية"
              className="w-full"
              variant="secondary"
              onChange={(value) => setType(value)}
            />
          </div>
        </div>{" "}
      </div>

      {/* destination */}
      <Destinations destinations={destinations?.data} isLoading={isLoading} />

      <Pagination
        page={page}
        setPage={setPage}
        lastPage={lastPage}
        isFetching={isFetching}
      />
    </div>
  );
}
