/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, FormField, Input } from "@/components";
import React from "react";

type Props = {
  numberOfStudents: any;
  tripDate: any;
  tripTime: any;
  HandleShowFilesModal: () => void;
};

export default function TripForm({
  numberOfStudents,
  tripDate,
  tripTime,
  HandleShowFilesModal,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-3xl text-primary font-arabic-bold">
        بيانات حجز الرحلة
      </div>
      {/* input groups */}
      <div className="grid  lg:grid-cols-4 gap-10 items-end flex-wrap">
        {/* input group */}
        <div className="grid grid-rows-[auto_53px] w-full  ">
          <div className="text-2xl">عدد الطلاب</div>
          <FormField field={numberOfStudents}>
            <Input
              placeholder="مثال : 70"
              type="number"
              onChange={(e) => numberOfStudents.handleChange(e.target.value)}
            />
          </FormField>
        </div>{" "}
        {/* input group */}
        <div className="grid grid-rows-[auto_53px] w-full ">
          <div className="text-2xl">تاريخ الرحلة</div>

          <FormField field={tripDate}>
            <Input
              placeholder="اختر اليوم"
              type="date"
              className="font-roboto"
              onChange={(e) => tripDate.handleChange(e.target.value)}
            />
          </FormField>
        </div>{" "}
        {/* input group */}
        <div className="grid grid-rows-[auto_53px] w-full ">
          <div className="text-2xl">وقت الرحلة</div>

          <FormField field={tripTime}>
            <Input
              placeholder="مثال:11ص"
              type="time"
              onChange={(e) => tripTime.handleChange(e.target.value)}
              className="font-roboto"
            />
          </FormField>
        </div>{" "}
        {/* button */}
        <div className="grid grid-rows-[auto_53px] w-full ">
          <span></span>
          <Button
            text="إحجز الآن"
            variant="secondary"
            onClick={HandleShowFilesModal}
          />
        </div>
      </div>
    </div>
  );
}
