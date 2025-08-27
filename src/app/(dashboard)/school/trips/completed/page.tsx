"use client";
import { Button, Currency } from "@/components";
import { useTrips } from "@/hooks/useTrips";
import { cn } from "@/lib/utils";
import { trip } from "@/types";
import Image from "next/image";
import React, { useState } from "react";

export default function Page() {
  const { data: trips, isLoading } = useTrips();
  const [isPaid, setIsPaid] = useState(true);
  const [showData, setShowData] = useState<number | null>(null);

  const completedTrips = trips?.filter(
    (trip: trip) => trip.status === "completed"
  );

  if (isLoading) {
    return <div className="text-2xl text-center">جاري تحميل الرحلات...</div>;
  }
  return (
    <div className="overflow-y-auto h-full no-scrollbar">
      <div className="text-4xl mb-6 font-arabic-bold">الرحلات المكتملة</div>

      <div className="overflow-x-auto w-full text-right">
        <table className="w-full min-w-[1263px]">
          {/* table header */}
          <thead className="text-2xl">
            <tr>
              <th>اسم الوجهة</th>
              <th className="text-center">تاريخ / يوم الرحلة</th>
              <th className="text-center">وقت الرحلة</th>
              <th className="text-center">عدد الطلاب</th>
              <th className="text-center">العدد الفعلي </th>
              <th className="text-center">سعر الرحلة</th>
            </tr>
          </thead>
          {/* table body */}
          <tbody>
            {/* table row */}
            {completedTrips?.map((trip: trip) => {
              return (
                <React.Fragment key={trip.id}>
                  <tr className="text-xl">
                    <td> {trip.destination} </td>

                    <td className="text-center">
                      {" "}
                      {trip.day} / {trip.date}
                    </td>
                    <td className="text-center">{trip.time}</td>
                    <td className="text-center">{trip.total_students}</td>
                    <td className="text-center">{trip.paid_count}</td>
                    <td className="text-center">
                      <div className="flex  items-center justify-center">
                        {trip.trip_price}

                        <Currency className="w-10 h-8" />
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="flex gap-4 items-center">
                        <Button
                          text="موقع الرحلة"
                          className="!text-xl !py-0.5 !px-1.5"
                          href={`https://www.google.com/maps/search/?api=1&query=${trip.location}`}
                        />

                        <Image
                          src="/images/table-arrow.svg"
                          alt="arrow"
                          width={20}
                          height={20}
                          className={cn(
                            "transition-all duration-300 cursor-pointer",
                            showData === trip.id && "rotate-270"
                          )}
                          onClick={() => {
                            setShowData(showData === trip.id ? null : trip.id);
                            setIsPaid(true);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                  {showData === trip.id && (
                    <tr>
                      <td colSpan={8} className="!border-none !p-0">
                        <div className="flex gap-10 items-center mb-6">
                          <div className="text-3xl text-primary-3 font-arabic-bold">
                            بيانات السداد
                          </div>
                          <Button
                            onClick={() => setIsPaid(true)}
                            text="الطلاب المسددين"
                            className={cn(
                              "!px-15 !rounded-xl",
                              isPaid
                                ? "!text-white !bg-navy border-2 !border-navy !text-2xl"
                                : "!text-navy !bg-white border-2 !border-navy !text-2xl"
                            )}
                          />
                          <Button
                            onClick={() => setIsPaid(false)}
                            text="الطلاب غير المسددين"
                            className={cn(
                              "!px-15 !rounded-xl",
                              isPaid
                                ? "!text-navy !bg-white border-2 !border-navy !text-2xl"
                                : "!text-white !bg-navy border-2 !border-navy !text-2xl"
                            )}
                          />
                        </div>
                        <div className="max-w-[565px] flex flex-col gap-4">
                          <div className="flex justify-between  pr-10 pl-34 text-xl">
                            <div>اسم الطالب</div>
                            <div>رقم الجوال </div>
                          </div>
                          {!isPaid && (
                            <div className="flex flex-col gap-4">
                              {trip.students.unpaid.map((student, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="flex py-2 px-10 justify-between  text-2xl border-navy rounded-xl border-2"
                                  >
                                    <div>{student.name}</div>
                                    <div>{student.phone}</div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                          {isPaid && (
                            <div className="flex flex-col gap-4">
                              {trip.students.paid.map((student, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="flex py-2 px-10 justify-between  text-2xl border-navy rounded-xl border-2"
                                  >
                                    <div>{student.name}</div>
                                    <div>{student.phone}</div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
