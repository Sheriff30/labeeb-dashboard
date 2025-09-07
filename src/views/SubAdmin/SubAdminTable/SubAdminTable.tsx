import Image from "next/image";
import React from "react";
import { subAdmin } from "@/types/types";

type SubAdminTableProps = {
  subAdmin: subAdmin[];
  handleDelete: (id: number) => void;
};
export default function SubAdminTable({
  subAdmin,
  handleDelete,
}: SubAdminTableProps) {
  if (subAdmin.length === 0) {
    return (
      <div className="flex justify-center  h-full">
        <div className="text-2xl">لا يوجد مشرفين مسجلين حالياً</div>
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
          <th className="!px-0">المدينة</th>
        </tr>
      </thead>
      <tbody>
        {subAdmin.map((admin, index) => (
          <tr key={index} className="text-2xl">
            <td>{admin.name}</td>
            <td className="font-roboto"> {admin.date}</td>
            <td className="font-roboto"> {admin.phoneNumber}</td>
            <td className="font-roboto underline"> {admin.email}</td>
            <td> {admin.city}</td>
            <td>
              <div
                className="flex justify-end ml-3 items-center"
                onClick={() => handleDelete(admin.id)}
              >
                <div className="flex items-center gap-2  py-1 px-1 border-2 w-fit rounded-sm border-error cursor-pointer ">
                  <Image
                    src="/images/delete.svg"
                    alt="delete"
                    width={33}
                    height={33}
                  />
                  <div className="text-error">إزالة المشرف</div>
                </div>{" "}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
