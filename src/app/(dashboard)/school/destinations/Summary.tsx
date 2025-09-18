/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import SummaryInput from "./SummaryInput";
import { formatTime } from "@/lib/utils/timeFormatter";
import InvoiceInput from "./InvoiceInput";
import { Button } from "@/components";

type Props = {
  setShowRequestInfo: React.Dispatch<React.SetStateAction<boolean>>;
  form: any;
  fees: number;
  name: string;
  calculateTotal: () => number;
};

export default function Summary({
  setShowRequestInfo,
  form,
  fees,
  name,
  calculateTotal,
}: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="text-4xl font-arabic-bold mb-8">بيانات حجز الرحلة</div>
      <div className="flex justify-between gap-1 items-center mb-4">
        <div className="text-3xl font-arabic-bold text-primary">ملخص الطلب</div>
        <div
          className="text-gray text-xl cursor-pointer "
          onClick={() => {
            form.reset();
            setShowRequestInfo(false);
          }}
        >
          رجوع للخلف
        </div>
      </div>
      <div className="mb-10">
        <div className="text-3xl mb-2">{name}</div>
        <div className="flex flex-col md:flex-row gap-2 max-w-[900px] justify-between mb-6">
          <SummaryInput title="عدد الطلاب">
            {form.state.values.numberOfStudents}{" "}
            {Number(form.state.values.numberOfStudents) < 10 ? "طلاب" : "طالبا"}
          </SummaryInput>
          <SummaryInput title="وقت الرحلة">
            {" "}
            {formatTime(form.state.values.tripTime)}{" "}
          </SummaryInput>
          <SummaryInput title="تاريخ الرحلة">
            {" "}
            {form.state.values.tripDate}{" "}
          </SummaryInput>
        </div>
        <div>
          <div className="text-3xl font-arabic-bold text-primary mb-2">
            الفاتورة{" "}
          </div>
          <div className="py-4 px-2 bg-primary-blue-2 max-w-[355px] flex gap-1 flex-col rounded-2xl">
            <InvoiceInput
              title="عدد الطلاب"
              value={form.state.values.numberOfStudents}
            />
            <InvoiceInput
              title="سعر الباقة المختارة"
              value={form.state.values.package}
              currency
            />
            <InvoiceInput title="رسوم الحجز" value={fees} currency />
            <InvoiceInput
              title="  إجمالى الفاتورة"
              value={calculateTotal()}
              currency
              total
            />
          </div>
        </div>
      </div>
      <div className="mt-auto mb-auto  max-w-[426px] w-full">
        <Button text="إحجز الآن" type="submit" className="w-full" />
      </div>
    </div>
  );
}
