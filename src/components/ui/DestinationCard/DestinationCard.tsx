/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { Button } from "@/components/shared";

export const IMAGE_BASE_URL = "https://s3.eu-north-1.amazonaws.com/labeb.sa/";

export default function DestinationCard({ data }: { data: any }) {
  console.log(data);
  return (
    <div className="w-full border-[1.5px] border-black/15 rounded-xl p-3">
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={true}
        loop={true}
        className="destination-swiper  rounded-xl mb-2"
      >
        {data?.images?.map((image: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="relative h-51.5 ">
              <Image
                src={`${IMAGE_BASE_URL}${image.image_path}`}
                alt="destination"
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-between gap-1 mb-[15px]">
        <div className="text-2xl"> {data?.name}</div>
        <div className="text-xl text-primary-blue">
          {data?.destination_type?.name}
        </div>
      </div>
      <div className="flex gap-2 text-primary-blue items-center ">
        <Button
          text="احجز الان"
          type="button"
          variant="primary"
          href={`/school/destinations/${data?.id}`}
        />
        <div className="flex items-center gap-1 text-3xl">
          <div className="font-arabic-bold">{data?.pricePerStudent}</div>
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
