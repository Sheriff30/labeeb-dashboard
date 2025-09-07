"use client";
import { Button } from "@/components";
import { canceledTrip } from "@/types";
import { useEffect, useState } from "react";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [canceledTrips, setCanceledTrips] = useState<canceledTrip[]>([]);

  useEffect(() => {
    const canceledTrips = JSON.parse(
      localStorage.getItem("canceledTrips") || "[]"
    );
    setCanceledTrips(canceledTrips);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="text-2xl text-center">جاري تحميل الرحلات...</div>;
  }
  return (
    <div className="overflow-y-auto h-full no-scrollbar">
      <div className="text-4xl mb-6 font-arabic-bold">الرحلات الملغية</div>

      {canceledTrips.length === 0 && (
        <div className="text-2xl text-center">لا يوجد رحلات ملغية</div>
      )}

      {canceledTrips.length > 0 && (
        <div className="overflow-x-auto w-full text-right">
          <table className="w-full min-w-[1263px]">
            {/* table header */}
            <thead className="text-2xl">
              <tr>
                <th>اسم الوجهة</th>
                <th className="text-center">تاريخ الإلغاء</th>
                <th className="text-center">حالة الإسترداد </th>
                <th className="text-center">عدد الطلاب</th>
                <th className="text-center">سبب الإلغاء</th>
              </tr>
            </thead>
            {/* table body */}
            <tbody>
              {/* table row */}
              {canceledTrips?.map((trip: canceledTrip) => {
                return (
                  <tr key={trip.id} className="text-xl">
                    <td> {trip.name} </td>
                    <td className="text-center font-roboto">
                      {trip.cancellation_date}
                    </td>
                    <td className="text-center">{trip.status}</td>
                    <td className="text-center font-roboto">
                      {trip.total_students}
                    </td>
                    <td className="text-center ">
                      <div className="truncate max-w-[200px] ">
                        {trip.cancellation_reason}
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="flex gap-4 items-center">
                        <Button
                          text="موقع الرحلة"
                          className="!text-xl !py-0.5 !px-1.5"
                          href={`https://www.google.com/maps/search/?api=1&query=${trip.name}`}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
