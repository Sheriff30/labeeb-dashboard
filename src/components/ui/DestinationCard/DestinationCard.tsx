"use client";

import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { Button } from "@/components/shared";

export default function DestinationCard({ data }) {
  return (
    <div className="max-w-[378px] w-full border-[1.5px] border-black/15 rounded-xl p-3">
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={true}
        loop={true}
        className="destination-swiper max-w-[354px] rounded-xl mb-2"
      >
        <SwiperSlide>
          <Image
            src="/images/destination.png"
            alt="destination"
            width={354}
            height={206}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/destination.png"
            alt="destination"
            width={354}
            height={206}
          />
        </SwiperSlide>
      </Swiper>
      <div className="flex justify-between gap-1 mb-[15px]">
        <div className="text-2xl"> متحف الدينار الاسلامى</div>
        <div className="text-xl text-primary-blue">ثقافى</div>
      </div>
      <div className="flex gap-1 text-primary-blue items-center ">
        <Button
          text="احجز الان"
          type="button"
          variant="primary"
          href="/school"
        />
        <div className="flex items-center gap-1 text-3xl">
          <div className="font-arabic-bold">30</div>
          <Image
            src="/images/currency.svg"
            alt="currency"
            width={37}
            height={41}
          />
          <div className="font-arabic-light">/طالب</div>
        </div>
      </div>
    </div>
  );
}
