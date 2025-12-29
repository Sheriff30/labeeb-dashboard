"use client";
import { Pagination } from "@/components/shared/Pagination";
import { useTrips } from "@/hooks/useTrips";
import { formatDateArabic } from "@/lib/utils/dateFormatter";
import { Trip } from "@/types";
import { useState } from "react";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: tripsData,
    isLoading,
    error,
  } = useTrips("approved", currentPage);

  const trips = tripsData?.data?.data || [];
  const paginationInfo = tripsData?.data || {};

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
      <div className="text-4xl mb-6 font-arabic-bold">
        {" "}
        الرحلات الموافق عليها
      </div>

      {isLoading && <div className="text-2xl text-center">جاري التحميل...</div>}

      {error && (
        <div className="text-2xl text-center text-red-500">
          حدث خطأ أثناء التحميل
        </div>
      )}

      {trips.length === 0 && !isLoading && (
        <div className="text-2xl text-center">لا يوجد رحلات مكتملة</div>
      )}

      {trips.length > 0 && (
        <>
          <div className="overflow-x-auto w-full text-right">
            <table className="w-full min-w-[1263px]">
              {/* Table Header */}
              <thead className="text-2xl">
                <tr>
                  <th>اسم الوجهة</th>
                  <th className="text-center">تاريخ الرحلة</th>
                  <th className="text-center">الوقت</th>
                  <th className="text-center">عدد الطلاب</th>
                  <th className="text-center">حالة الرحلة</th>
                  <th className="text-center">رابط الدفع</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {trips.map((trip: Trip) => (
                  <tr key={trip.id} className="text-xl">
                    <td>{trip.destination.name}</td>
                    <td className="text-center font-roboto">
                      {formatDateArabic(trip.trip_date)}
                    </td>
                    <td className="text-center font-roboto">
                      {trip.time_slot}
                    </td>
                    <td className="text-center font-roboto">
                      {trip.total_students}
                    </td>
                    <td className="text-center">{trip.status_label}</td>
                    <td className="text-center">
                      <a
                        href={trip.payment_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        رابط الدفع
                      </a>
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
