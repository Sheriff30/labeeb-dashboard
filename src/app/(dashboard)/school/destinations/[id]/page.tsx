"use client";
import { useParams } from "next/navigation";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { useDestination } from "@/hooks/useDestinations";

export default function Page() {
  const params = useParams();
  const id: string = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id ?? "";

  const { data: destination, isLoading } = useDestination(id);

  if (isLoading) {
    return <div className="text-2xl text-center">جاري تحميل الوجهة...</div>;
  }

  return (
    <form className="grid gap-3 grid-cols-[31.6rem_1fr]">
      <div className="grid gap-2">
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={true}
          loop={true}
          className="destination-swiper rounded-xl mb-2 w-full"
        >
          {destination?.images?.map((image: string, index: number) => (
            <SwiperSlide key={index}>
              <div className="relative h-102.5">
                <Image
                  src={image}
                  alt="destination"
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>{" "}
        <div className="grid gap-3 grid-cols-3">
          {destination?.images?.map((image: string, index: number) => (
            <div
              className="relative h-32.5 rounded-sm overflow-hidden"
              key={index}
            >
              <Image
                src={image}
                alt="destination"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div>
          <div>
            <img src="/images/destination-type.svg" alt="" />
            {destination.type}
          </div>
          <div>{destination.place}</div>
        </div>
      </div>
    </form>
  );
}
