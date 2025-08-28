import Image from "next/image";
import React from "react";

export default function SubAdminTable() {
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
        <tr className="text-2xl">
          <td>محمد احمد السيد على</td>
          <td className="font-roboto"> 1/8/2025</td>
          <td className="font-roboto">01026364250</td>
          <td className="font-roboto underline">m29026753@gmail.com</td>
          <td>مكة</td>
          <td>
            <div className="flex justify-end ml-3 items-center">
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
      </tbody>
    </table>
  );
}
