"use client";
import { Button } from "@/components";
import { useModal } from "@/Context/ModalContext";
import { cn } from "@/lib/utils";
import { scheduledTrip } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [isPaid, setIsPaid] = useState(true);
  const [showData, setShowData] = useState<number | null>(null);
  const { openModal, closeModal } = useModal();
  const [scheduledTrips, setScheduledTrips] = useState<scheduledTrip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const scheduledTrips = JSON.parse(
      localStorage.getItem("scheduledTrips") || "[]"
    );
    setScheduledTrips(scheduledTrips);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="text-2xl text-center">جاري تحميل الرحلات...</div>;
  }

  const handleCancelTrip = () => {
    openModal("CONFIRM", {
      title: "تم تقديم طلب إلغاء الرحلة",
      buttonText: "شكراً",
      onConfirm: () => {
        closeModal();
      },
    });
  };

  return (
    <div className="overflow-y-auto h-full no-scrollbar">
      <div className="text-4xl mb-6 font-arabic-bold">الرحلات المجدولة</div>

      {scheduledTrips.length === 0 && (
        <div className="text-2xl text-center">لا يوجد رحلات مجدولة</div>
      )}
      {scheduledTrips.length > 0 && (
        <div className="overflow-x-auto w-full text-right">
          <table className="w-full min-w-[1263px]">
            {/* table header */}
            <thead className="text-2xl">
              <tr>
                <th>اسم الوجهة</th>
                <th className="text-center">حالة الرحلة</th>
                <th className="text-center">تاريخ / يوم الرحلة</th>
                <th className="text-center">وقت الرحلة</th>
                <th className="text-center">عدد الطلاب</th>
                <th className="text-center">تم الدفع </th>
                <th className="text-center text-error">لم يتم الدفع</th>
              </tr>
            </thead>
            {/* table body */}
            <tbody>
              {/* table row */}
              {scheduledTrips?.map((trip: scheduledTrip) => {
                return (
                  <React.Fragment key={trip.id}>
                    <tr className="text-xl">
                      <td> {trip.name} </td>
                      <td className="text-center">{trip.status}</td>
                      <td className="text-center">
                        <span className="font-roboto"> {trip.date}</span>
                      </td>
                      <td className="text-center font-roboto">{trip.time}</td>
                      <td className="text-center font-roboto">
                        {trip.total_students}
                      </td>
                      <td className="text-center font-roboto">
                        {trip.paid_count}
                      </td>
                      <td className="text-center text-error font-roboto">
                        {trip.unpaid_count}
                      </td>
                      <td className="text-center">
                        <div className="flex gap-4 items-center">
                          <Button
                            text="موقع الرحلة"
                            className="!text-xl !py-0.5 !px-1.5"
                            href={`https://www.google.com/maps/search/?api=1&query=${trip.name}`}
                          />
                          <Button
                            text="الغاء الرحلة"
                            className="!text-xl !py-0.5 !px-1.5 !bg-error "
                            onClick={handleCancelTrip}
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
                              setShowData(
                                showData === trip.id ? null : trip.id
                              );
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
                              text="تم الدفع"
                              className={cn(
                                "!px-15 !rounded-xl",
                                isPaid
                                  ? "!text-white !bg-navy border-2 !border-navy !text-2xl"
                                  : "!text-navy !bg-white border-2 !border-navy !text-2xl"
                              )}
                            />
                            <Button
                              onClick={() => setIsPaid(false)}
                              text="لم يتم الدفع"
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
                                {trip.students.unpaid.map((student) => {
                                  return (
                                    <div
                                      key={student.name}
                                      className="flex py-2 px-10 justify-between  text-2xl border-navy rounded-xl border-2"
                                    >
                                      <div>{student.name}</div>
                                      <div className="font-roboto">
                                        {student.phone}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                            {isPaid && (
                              <div className="flex flex-col gap-4">
                                {trip.students.paid.map((student) => {
                                  return (
                                    <div
                                      key={student.name}
                                      className="flex py-2 px-10 justify-between  text-2xl border-navy rounded-xl border-2"
                                    >
                                      <div>{student.name}</div>
                                      <div className="font-roboto">
                                        {student.phone}
                                      </div>
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
      )}
    </div>
  );
}
