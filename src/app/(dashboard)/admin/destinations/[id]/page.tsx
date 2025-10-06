"use client";
import { Input, Select, SelectableCheckboxGroup } from "@/components";
import { Loading } from "@/components/shared/Loading";
import {
  useAdminDestinationById,
  useAdminToggleStatusDestination,
} from "@/hooks/Destinations";
import { validators } from "@/lib/constants/validation";
import { useForm } from "@tanstack/react-form";
import { ShieldCheck, ShieldOff } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
  const params = useParams();
  const id: string = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id ?? "";
  const {
    data: { data: destination } = {},
    isError,
    isLoading,
  } = useAdminDestinationById(id);

  console.log(destination);

  const { mutate } = useAdminToggleStatusDestination(id);

  const {
    images,
    name,
    description,
    google_maps_link,
    email,
    phone,
    contact_person_name,
    destination_type,
  } = destination || {};

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      google_maps_link: "",
      email: "",
      phone: "",
      contact_person_name: "",
      type: destination_type || "",
      city: "",
      district: "",
      gender: "",
      labeeb_commission_percentage: "",
      capacity: "",
      availability_hours: [{ day: "", from: "", to: "" }],
      availability_days: [] as string[],
      images: [] as string[],
      status: "active" as const,
      payment_method: "",
    },

    onSubmit: (values) => {
      console.log(values.value);
    },
  });

  function handleToggleStatus() {
    mutate();
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div className="text-center text-2xl"> حدث خطأ</div>;
  }

  return (
    <form className="flex flex-col gap-8 overflow-y-auto h-full no-scrollbar ">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold  text-primary">
          {destination?.name}
        </h1>

        {destination.status === "active" ? (
          <div
            className="flex gap-2 text-red-800 text-xl rounded-xl items-center bg-red-50 py-1 px-3 cursor-pointer"
            onClick={() => handleToggleStatus()}
          >
            <ShieldOff />
            <div>تعطيل الوجهة </div>
          </div>
        ) : (
          <div
            className="flex gap-2 text-green-800 text-xl rounded-xl items-center bg-green-50 py-1 px-3 cursor-pointer"
            onClick={() => handleToggleStatus()}
          >
            <ShieldCheck />
            <div>تفعيل الوجهة </div>
          </div>
        )}
      </div>
      {/* images */}
      <div className="flex gap-2 flex-col">
        <div className="text-2xl text-navy font-arabic-light"> صور الوجهة</div>
        <div className="flex gap-4.5">
          {images?.map((img: string, index: number) => {
            return (
              <Image
                width={232}
                height={188}
                key={index}
                src={img}
                alt="image"
                className="rounded-xl shadow-md"
              />
            );
          })}
        </div>
      </div>
      {/* name */}
      <div className="flex gap-2 flex-col w-170">
        <label className="text-2xl text-navy font-arabic-light">
          اسم الوجهة
        </label>
        <Input textSize="text-xl" defaultValue={name} />
      </div>
      {/* description */}
      <div className="flex gap-2 flex-col w-170">
        <label className="text-2xl text-navy font-arabic-light">
          وصف الوجهة
        </label>
        <Input textSize="text-xl" className="h-50" defaultValue={description} />
      </div>
      {/* google_maps_link */}
      <div className="flex gap-2 flex-col w-170">
        <label className="text-2xl text-navy font-arabic-light">
          رابط موقع الوجهة
        </label>
        <Input textSize="text-xl" defaultValue={google_maps_link} />
      </div>
      {/* email */}
      <div className="flex gap-2 flex-col w-170">
        <label className="text-2xl text-navy font-arabic-light">
          البريد الإلكتروني{" "}
        </label>
        <Input
          textSize="text-xl"
          defaultValue={email || " لا يوجد بريد الإلكتروني"}
        />
      </div>
      {/* phone */}
      <div className="flex gap-2 flex-col w-170">
        <label className="text-2xl text-navy font-arabic-light">
          رقم الجوال
        </label>
        <Input textSize="text-xl" defaultValue={phone || " لا يوجد رقم جوال"} />
      </div>
      {/* contact_person_name */}
      <div className="flex gap-2 flex-col w-170">
        <label className="text-2xl text-navy font-arabic-light">
          اسم المسؤول{" "}
        </label>
        <Input textSize="text-xl" defaultValue={contact_person_name} />
      </div>

      <div className="flex gap-10">
        <form.Field name="type" validators={validators.required("نوع الوجهة")}>
          {(field) => (
            <div className="flex flex-col gap-2 ">
              <p className="text-3xl font-arabic-light text-navy">نوع الوجهة</p>
              <Select
                variant="secondary"
                options={[
                  { label: "نوع 1", value: "type1" },
                  { label: "نوع 2", value: "type2" },
                  { label: "نوع 3", value: "type3" },
                ]}
                placeholder=" مثال : ترفيهية"
                value={field.state.value}
                onChange={(value) => field.handleChange(value)}
              />
              {field.state.meta.errors.length > 0 && (
                <div className="text-red-500">{field.state.meta.errors[0]}</div>
              )}
            </div>
          )}
        </form.Field>
        <form.Field name="city" validators={validators.required("المدينة")}>
          {(field) => (
            <div className="flex flex-col gap-2 ">
              <p className="text-3xl font-arabic-light text-navy">المدينة</p>
              <Select
                variant="secondary"
                options={[{ label: "Riyadh", value: "Riyadh" }]}
                placeholder=" مثال : المدينه المنوره"
                value={field.state.value}
                onChange={(value) => field.handleChange(value)}
              />
              {field.state.meta.errors.length > 0 && (
                <div className="text-red-500">{field.state.meta.errors[0]}</div>
              )}
            </div>
          )}
        </form.Field>
        <form.Field name="gender" validators={validators.required("الفئة")}>
          {(field) => (
            <div className="flex flex-col gap-2 ">
              <p className="text-3xl font-arabic-light text-navy">الفئة</p>
              <Select
                variant="secondary"
                options={[{ label: "educational", value: "educational" }]}
                placeholder=" مثال : بنين "
                value={field.state.value}
                onChange={(value) => field.handleChange(value)}
              />
              {field.state.meta.errors.length > 0 && (
                <div className="text-red-500">{field.state.meta.errors[0]}</div>
              )}
            </div>
          )}
        </form.Field>
        <form.Field
          name="labeeb_commission_percentage"
          validators={validators.number()}
        >
          {(field) => (
            <div className="flex flex-col gap-2 max-w-[245px] w-full ">
              <p className="text-3xl font-arabic-light text-navy">العمولة</p>
              <Input
                placeholder=" العمولة بالنسبة المئوية "
                type="number"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.length > 0 && (
                <div className="text-red-500">{field.state.meta.errors[0]}</div>
              )}
            </div>
          )}
        </form.Field>
      </div>

      <div className="flex gap-30">
        <form.Field
          name="capacity"
          validators={validators.capacity("القدرة الاستيعابية", 1000)}
        >
          {(field) => (
            <div className="flex flex-col gap-2 w-full max-w-[300px]">
              <p className="text-3xl font-arabic-light text-navy">
                القدرة الاستيعابية
              </p>
              <div className="flex w-full  items-center gap-4">
                <div className="w-full">
                  <Input
                    placeholder=" ادخل عدد الطلاب هنا "
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
                <div className="text-primary-blue text-2xl">طالب</div>
              </div>
              {field.state.meta.errors.length > 0 && (
                <div className="text-red-500">{field.state.meta.errors[0]}</div>
              )}
            </div>
          )}
        </form.Field>
        <div className="flex flex-col gap-2">
          <p className="text-3xl font-arabic-light text-navy">
            الساعات المتاحة
          </p>
          <div className="flex  items-center gap-4">
            <form.Field
              name="availability_hours[0].from"
              validators={validators.required("الوقت من")}
            >
              {(field) => (
                <div>
                  <Input
                    type="time"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <div className="text-red-500 text-sm mt-1">
                      {field.state.meta.errors[0]}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
            <div className="text-primary-blue text-2xl">حتي</div>
            <form.Field
              name="availability_hours[0].to"
              validators={validators.required("الوقت إلى")}
            >
              {(field) => (
                <div>
                  <Input
                    type="time"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <div className="text-red-500 text-sm mt-1">
                      {field.state.meta.errors[0]}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
          </div>
        </div>
      </div>
      <form.Field name="availability_days">
        {(field) => (
          <div className="flex gap-10">
            <SelectableCheckboxGroup
              options={[
                { label: "السبت", value: "saturday" },
                { label: "الأحد", value: "sunday" },
                { label: "الإثنين", value: "monday" },
                { label: "الثلاثاء", value: "tuesday" },
                { label: "الأربعاء", value: "wednesday" },
                { label: "الخميس", value: "thursday" },
                { label: "الجمعة", value: "friday" },
              ]}
              label="الايام المتاحة"
              value={field.state.value}
              onChange={(values) => field.handleChange(values)}
              type="primary"
            />
            {field.state.meta.errors && (
              <div className="text-red-500">{field.state.meta.errors}</div>
            )}
          </div>
        )}
      </form.Field>
    </form>
  );
}
