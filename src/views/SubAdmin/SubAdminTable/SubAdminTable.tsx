/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDeleteSupervisor, useSupervisors } from "@/hooks/supervisors";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function SubAdminTable() {
  const { data: supervisors, isLoading } = useSupervisors();
  const { mutate: deleteSupervisor } = useDeleteSupervisor();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setDeletingId(id);
    deleteSupervisor(id, {
      onSuccess: () => {
        setDeletingId(null);
      },
      onError: (err: any) => {
        toast.error(err.response.data.message);
        setDeletingId(null);
      },
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}/${month}/${day}`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center text-2xl">
        جاري التحميل...
      </div>
    );
  }

  if (!supervisors || supervisors.length === 0) {
    return (
      <div className="flex justify-center items-center text-2xl">
        لا يوجد مشرفين فرعيين .
      </div>
    );
  }

  return (
    <table className="w-full text-right min-w-[1263px] overflow-x-auto">
      <thead className="text-xl">
        <tr>
          <th>اسم المشرف</th>
          <th className="!px-0">تاريخ الإضافة</th>
          <th className="!px-0">رقم الجوال</th>
          <th className="!px-0">البريد الإلكترونى</th>
        </tr>
      </thead>
      <tbody>
        {supervisors?.map((admin: any) => (
          <tr key={admin.id} className="text-2xl">
            <td>
              <span className="line-clamp-1 max-w-[400px]">{admin.name}</span>
            </td>
            <td className="font-roboto">{formatDate(admin.created_at)}</td>
            <td className="font-roboto">{admin.phone}</td>
            <td className="font-roboto underline">{admin.email}</td>
            <td>{admin.city}</td>
            <td>
              <div
                className="flex justify-end ml-3 items-center"
                onClick={() => handleDelete(admin.id)}
              >
                <div className="flex items-center gap-2 py-1 px-1 border-2 w-fit rounded-sm border-error cursor-pointer">
                  {deletingId === admin.id ? (
                    <div className="text-error">جاري الحذف...</div>
                  ) : (
                    <>
                      <Image
                        src="/images/delete.svg"
                        alt="delete"
                        width={33}
                        height={33}
                      />
                      <div className="text-error">إزالة المشرف</div>
                    </>
                  )}
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
