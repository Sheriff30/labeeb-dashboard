"use client";
import { useParams } from "next/navigation";
// import React, { useState } from "react";
import { useDestination } from "@/hooks/useDestinations";
import { Destination } from "@/views/Destination";
import { Button, FormField, Input } from "@/components";
import { useField, useForm } from "@tanstack/react-form";
import { validators } from "@/lib/constants/validation";
import { useModal } from "@/Context";
import { file } from "@/types";

export default function Page() {
  const params = useParams();
  const id: string = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id ?? "";
  const { data: destination, isLoading } = useDestination(id);
  const { openModal } = useModal();

  const form = useForm({
    defaultValues: {
      numberOfStudents: "",
      tripDate: "",
      tripTime: "",
    },

    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  const numberOfStudents = useField({
    name: "numberOfStudents",
    form,
    validators: validators.capacity("عدد الطلاب", destination?.capacity),
  });
  const tripDate = useField({
    name: "tripDate",
    form,
    validators: validators.required("تاريخ الرحلة"),
  });
  const tripTime = useField({
    name: "tripTime",
    form,
    validators: validators.required("وقت الرحلة"),
  });

  if (isLoading) {
    return <div className="text-2xl text-center">جاري تحميل الوجهة...</div>;
  }
  const handleFileSelect = (selectedFile: file) => {
    console.log("Selected file:", selectedFile);
    // Do something with the selected file
  };

  function HandleShowFilesModal() {
    form.handleSubmit();
    if (
      numberOfStudents.state.value ||
      tripDate.state.value ||
      tripTime.state.value
    ) {
      openModal("FILE_SELECTION", {
        onFileSelect: handleFileSelect,
      });
    }
  }

  return (
    <form>
      <div className="flex flex-col gap-13">
        <Destination destination={destination} />
        <div className="flex flex-col gap-2">
          <div className="text-3xl text-primary font-arabic-bold">
            بيانات حجز الرحلة
          </div>
          {/* input groups */}
          <div className="flex gap-10 items-end">
            {/* input group */}
            <div className="grid grid-rows-[auto_53px]">
              <div className="text-2xl">عدد الطلاب</div>
              <FormField field={numberOfStudents}>
                <Input
                  placeholder="مثال : 70"
                  type="number"
                  onChange={(e) =>
                    numberOfStudents.handleChange(e.target.value)
                  }
                />
              </FormField>
            </div>{" "}
            {/* input group */}
            <div className="grid grid-rows-[auto_53px]">
              <div className="text-2xl">تاريخ الرحلة</div>

              <FormField field={tripDate}>
                <Input
                  placeholder="اختر اليوم"
                  type="date"
                  onChange={(e) => tripDate.handleChange(e.target.value)}
                />
              </FormField>
            </div>{" "}
            {/* input group */}
            <div className="grid grid-rows-[auto_53px]">
              <div className="text-2xl">وقت الرحلة</div>

              <FormField field={tripTime}>
                <Input
                  placeholder="مثال:11ص"
                  type="time"
                  onChange={(e) => tripTime.handleChange(e.target.value)}
                />
              </FormField>
            </div>{" "}
            {/* button */}
            <div className="grid grid-rows-[auto_53px] w-full max-w-[426px]">
              <span></span>
              <Button
                text="حجز الرحلة"
                variant="secondary"
                onClick={HandleShowFilesModal}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
