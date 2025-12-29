"use client";
import { Button } from "@/components";
import { Pagination } from "@/components/shared/Pagination";
import { useTrips } from "@/hooks/useTrips";
import { formatDateArabic } from "@/lib/utils/dateFormatter";
import { canceledTrip } from "@/types";
import { useState } from "react";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: canceledTripsData,
    isLoading,
    error,
  } = useTrips("rejected", currentPage);

  const canceledTrips = canceledTripsData?.data?.data || [];
  const paginationInfo = canceledTripsData?.data || {};

  const handleNextPage = () => {
    if (paginationInfo.current_page < paginationInfo.last_page) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (paginationInfo.current_page > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="overflow-y-auto h-full no-scrollbar">
      <div className="text-4xl mb-6 font-arabic-bold">الرحلات الملغية</div>

      {isLoading && <div className="text-2xl text-center">جاري التحميل...</div>}

      {error && (
        <div className="text-2xl text-center text-red-500">
          حدث خطأ أثناء التحميل
        </div>
      )}

      {canceledTrips.length === 0 && !isLoading && (
        <div className="text-2xl text-center">لا يوجد رحلات ملغية</div>
      )}

      {canceledTrips.length > 0 && (
        <>
          <div className="overflow-x-auto w-full text-right">
            <table className="w-full min-w-[1263px]">
              {/* Table Header */}
              <thead className="text-2xl">
                <tr>
                  <th>اسم الوجهة</th>
                  <th className="text-center">تاريخ الإلغاء</th>
                  <th className="text-center">حالة الإسترداد </th>
                  <th className="text-center">عدد الطلاب</th>
                  <th className="text-center">سبب الإلغاء</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {canceledTrips.map((trip: canceledTrip) => (
                  <tr key={trip.id} className="text-xl">
                    <td>{trip.destination.name}</td>
                    <td className="text-center font-roboto">
                      {formatDateArabic(trip.updated_at)}
                    </td>
                    <td className="text-center">{trip.status_label}</td>
                    <td className="text-center font-roboto">
                      {trip.total_students}
                    </td>
                    <td className="text-center">
                      <div className="truncate max-w-[200px]">
                        {trip.rejection_reason || "غير متوفر"}
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="flex gap-4 items-center">
                        <Button
                          text="موقع الرحلة"
                          className="!text-xl !py-0.5 !px-1.5"
                          href={trip.destination.google_maps_link}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Component */}
          <Pagination
            currentPage={paginationInfo.current_page}
            lastPage={paginationInfo.last_page}
            total={paginationInfo.total}
            from={paginationInfo.from}
            to={paginationInfo.to}
            hasNextPage={!!paginationInfo.next_page_url}
            hasPrevPage={!!paginationInfo.prev_page_url}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
            className="mt-6"
          />
        </>
      )}
    </div>
  );
}
