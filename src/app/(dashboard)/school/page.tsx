import { TripsCards } from "@/views/school";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-2 text-3xl">
        <Image src="/images/wave.svg" alt="wave" width={34} height={35} />
        <div className="flex gap-2 text-primary-3">
          <span className="font-arabic-bold"> مــرحــباً ,</span>
          اسم المدرسة
        </div>
      </div>
      <TripsCards />
    </div>
  );
}
