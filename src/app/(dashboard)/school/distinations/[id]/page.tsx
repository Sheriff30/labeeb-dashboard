"use client";
import { axiosInstance } from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import Image from "next/image";

export default function Page() {
  const { id } = useParams();

  async function getDistination() {
    const { data } = await axiosInstance.get(`/distinations/${id}`);
    return data;
  }

  const { isLoading, data: distination = [] } = useQuery({
    queryKey: ["distinations", id],
    queryFn: getDistination,
  });

  if (isLoading) {
    return <div className="text-2xl text-center">جاري تحميل الوجهة...</div>;
  }

  return (
    <div className="grid grid-cols-[31.6rem_1fr]">
      <div className="grid gap-2">
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={true}
          loop={true}
          className="destination-swiper rounded-xl mb-2 w-full"
        >
          {distination?.images?.map((image: string, index: number) => (
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
          {distination?.images?.map((image: string, index: number) => (
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
      <div></div>
    </div>
  );
}
