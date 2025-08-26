"use client";
import { useParams } from "next/navigation";
import { useDestination } from "@/hooks/useDestinations";
import { Destination } from "@/views/Destination";
import { Button, Currency, FormField, Input } from "@/components";
import { useField, useForm } from "@tanstack/react-form";
import { validators } from "@/lib/constants/validation";
import { useModal } from "@/Context";
import { useState } from "react";

const FEES = 120;

export default function Page() {
  const params = useParams();
  const id: string = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id ?? "";
  const { data: destination, isLoading } = useDestination(id);
  const { openModal } = useModal();
  const [showRequestInfo, setShowRequestInfo] = useState(false);

  const form = useForm({
    defaultValues: {
      numberOfStudents: "",
      tripDate: "",
      tripTime: "",
      file: "",
      package: "",
    },

    onSubmit: ({ value }) => {
      if (
        value.numberOfStudents &&
        value.tripDate &&
        value.tripTime &&
        value.file &&
        value.package
      ) {
        console.log("Done");
      }
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

  const handlePackageSelect = (selectedPackage: string) => {
    if (selectedPackage) {
      form.setFieldValue("package", selectedPackage);
      setShowRequestInfo(true);
    }
  };

  const handleFileSelect = (selectedFile: string) => {
    if (selectedFile) {
      form.setFieldValue("file", selectedFile);
      setTimeout(() => {
        openModal("PACKAGES", {
          onPackageSelect: handlePackageSelect,
        });
      }, 0);
    }
  };

  async function HandleShowFilesModal() {
    await form.handleSubmit();
    if (!form.state.isValid) return;

    openModal("FILE_SELECTION", { onFileSelect: handleFileSelect });
  }

  const formatTime = (timeValue: string) => {
    if (!timeValue) return "";

    const [hours, minutes] = timeValue.split(":");
    const hour = parseInt(hours);

    if (hour < 12) {
      return `${hour}:${minutes} صباحا`; // AM with minutes
    } else if (hour === 12) {
      return `12:${minutes} ظهرا`; // Noon with minutes
    } else {
      return `${hour - 12}:${minutes} مساء`; // PM with minutes
    }
  };

  const calculateTotal = () => {
    const numberOfStudents = parseInt(form.state.values.numberOfStudents) || 0;
    const packagePrice = form.state.values.package;

    return Number(packagePrice) * numberOfStudents + FEES;
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {!showRequestInfo ? (
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
      ) : (
        <>
          <div className="text-4xl font-arabic-bold mb-8">
            بيانات حجز الرحلة
          </div>
          <div className="flex justify-between gap-1 items-center mb-4">
            <div className="text-3xl font-arabic-bold text-primary">
              ملخص الطلب
            </div>
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
          <div>
            <div className="text-3xl mb-2">{destination.name}</div>
            <div className="flex gap-2 max-w-[900px] justify-between mb-6">
              <div className="text-2xl">
                <div className="text-2xl mb-1">عدد الطلاب</div>
                <div className="border border-primary-blue py-2 px-4 text-primary-blue rounded-xl  w-full">
                  {form.state.values.numberOfStudents}{" "}
                  {Number(form.state.values.numberOfStudents) < 10
                    ? "طلاب"
                    : "طالبا"}
                </div>
              </div>
              <div className="text-2xl">
                <div className="text-2xl mb-1">وقت الرحلة</div>
                <div className="border border-primary-blue py-2 px-4 text-primary-blue rounded-xl  w-full">
                  {formatTime(form.state.values.tripTime)}{" "}
                </div>
              </div>
              <div className="text-2xl">
                <div className="text-2xl mb-1">تاريخ الرحلة</div>
                <div className="border border-primary-blue py-2 px-4 text-primary-blue rounded-xl  w-full font-roboto">
                  {form.state.values.tripDate}{" "}
                </div>
              </div>
            </div>
            <div>
              <div className="text-3xl font-arabic-bold text-primary mb-2">
                الفاتورة{" "}
              </div>
              <div className="py-4 px-2 bg-primary-blue-2 max-w-[355px] flex gap-1 flex-col rounded-2xl">
                <div className="flex  gap-10 items-center">
                  <div className="text-xl">عدد الطلاب</div>
                  <div className="flex gap-2.5 text-xl items-center">
                    <span className="font-roboto text-2xl">
                      {form.state.values.numberOfStudents}
                    </span>
                    طالب
                  </div>
                </div>
                <div className="flex  gap-10 items-center">
                  <div className="text-xl">سعر الباقة المختارة</div>
                  <div className="flex gap-2.5 text-xl items-center">
                    <span className="font-roboto text-2xl">
                      {form.state.values.package}
                    </span>
                    <Currency className="w-[30px] h-[30px]" />{" "}
                  </div>
                </div>
                <div className="flex  gap-10 items-center mb-4">
                  <div className="text-xl">رسوم الحجز</div>
                  <div className="flex gap-2.5 text-xl items-center">
                    <span className="font-roboto text-2xl">{FEES}</span>
                    <Currency className="w-[30px] h-[30px]" />{" "}
                  </div>
                </div>
                <div className="flex  gap-10 items-center text-primary-blue">
                  <div className="text-2xl font-arabic-bold">
                    إجمالى الفاتورة
                  </div>
                  <div className="flex gap-2.5 text-xl items-center">
                    <span className="font-roboto font-bold text-2xl">
                      {calculateTotal()}
                    </span>
                    <Currency className="w-[30px] h-[30px]" />{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button text="إحجز الآن" className="!mt-auto" type="submit" />
        </>
      )}
    </form>
  );
}
