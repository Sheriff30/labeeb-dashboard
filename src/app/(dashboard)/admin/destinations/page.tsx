"use client";
import { Loading } from "@/components/shared/Loading";
import Pagination from "@/components/shared/Pagination/Pagination";
import { useModal } from "@/Context";
import {
  useAdminDestinations,
  useDeleteDestination,
} from "@/hooks/Destinations";
import { CirclePlus, Eye, Trash } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function Page() {
  const [page, setPage] = useState(1);
  const { openModal, closeModal } = useModal();

  const per_page = 10;
  const { data, isFetching, isError, isLoading } = useAdminDestinations(
    page,
    per_page
  );
  const lastPage = data?.meta?.last_page || 1;

  const { mutate } = useDeleteDestination();

  function handleDelete(id: string) {
    openModal("CONFIRM", {
      title: "هل أنت متأكد من حذف الوجهة؟",
      type: "delete",
      buttonText: "حذف",
      onConfirm: () => {
        mutate(id, {
          onSuccess: () => {
            closeModal();
          },
        });
      },
    });
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div className="text-center text-2xl"> حدث خطأ</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold  text-primary">الوجهات</h1>

        <Link
          href="/admin/destinations/add"
          className="flex gap-2 text-primary-blue text-2xl items-center"
        >
          <div>اضافة وجهة </div> <CirclePlus />
        </Link>
      </div>
      <div className="overflow-x-auto no-scrollbar w-full text-right">
        <table className="w-full min-w-[1263px]">
          <thead className="text-2xl">
            <tr>
              <th>اسم الوجهة</th>
              <th>رقم الجوال</th>
              <th>المدينة</th>
              <th>العمولة</th>
              <th>إيرادات الوجهة</th>
              <th>مرات الحجز</th>
              <th>نوع الوجهة</th>
              <th className="text-center"> الحالة</th>
              <th className="text-center">تاريخ الإضافة</th>
              <th> الاجراءات</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((destination: any) => (
              <tr key={destination.id}>
                <td>{destination.name}</td>
                <td>{destination.contact_phone}</td>
                <td>{destination.city}</td>
                <td>{destination.labeeb_commission_percentage}</td>
                <td>-</td>
                <td>-</td>
                <td>{destination.destination_type}</td>
                <td>
                  <div className="flex justify-center">
                    {destination.status === "active" ? (
                      <div className="text-green-600 bg-green-50 w-fit py-1 px-2 rounded-lg border-green-600 border">
                        مفعلة
                      </div>
                    ) : (
                      <div className="text-red-600 bg-red-50 w-fit py-1 px-2 rounded-lg border-red-600 border">
                        غير مفعلة
                      </div>
                    )}
                  </div>
                </td>
                <td className="text-center">
                  {new Date(destination.created_at).toLocaleDateString()}
                </td>
                <td>
                  <div className="flex gap-2 items-center text-primary ">
                    <Trash
                      className="cursor-pointer"
                      onClick={() => handleDelete(destination.id)}
                    />
                    <Link href={`/admin/destinations/${destination.id}`}>
                      <Eye className="cursor-pointer" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          page={page}
          setPage={setPage}
          lastPage={lastPage}
          isFetching={isFetching}
        />
      </div>
    </div>
  );
}
