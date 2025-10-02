"use client";
import { Button, Input, Select, SelectableCheckboxGroup } from "@/components";
import { useCreateDestination } from "@/hooks/Destinations";
import { cn } from "@/lib";
import { validators } from "@/lib/constants/validation";
import { useForm } from "@tanstack/react-form";
import Image from "next/image";
import React, { useRef, useState } from "react";

export default function Page() {
  const [selectedImages, setSelectedImages] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const fileInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [step, setStep] = useState(1);

  const handleImageClick = (idx: number) => {
    fileInputRefs[idx].current?.click();
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setSelectedImages((prev) => {
          const updated = [...prev];
          updated[idx] = imageData;
          return updated;
        });
        // Update form images array
        const currentImages = form.getFieldValue("images") || [];
        const updatedImages = [...currentImages];
        updatedImages[idx] = imageData;
        form.setFieldValue("images", updatedImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const { mutate } = useCreateDestination();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      google_maps_link: "",
      email: "",
      phone: "",
      contact_person_name: "",
      type: "",
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
      packages: [
        {
          name: "",
          price: "",
          benefits: [] as string[],
          status: "active" as const,
        },
      ],
    },

    onSubmit: (values) => {
      console.log(values.value);
      mutate(values.value);
    },
  });

  return (
    <div className="overflow-auto h-full no-scrollbar">
      <form className="grid gap-6 ">
        <div>
          <h1 className="text-[#6E1946] text-4xl font-arabic-bold mb-[14px]">
            الوجهات
          </h1>
          <div className="flex justify-between items-center">
            <h2 className="text-4xl text-primary  font-arabic-bold  ">
              إضافة وجهة
            </h2>
            <div
              className="text-2xl text-navy cursor-pointer"
              onClick={() => setStep(step > 1 ? step - 1 : 1)}
            >
              {" "}
              الرجوع للقائمة السابقة
            </div>
          </div>
        </div>
        {step === 1 && (
          <>
            {/* Image upload */}
            <div className="flex gap-2 flex-col ">
              <div className="font-arabic-light text-3xl">أضف صور للوجهة</div>

              <div className="flex gap-[18px]">
                {selectedImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="py-[42px] px-[30px] flex justify-center items-center flex-col gap-1 shadow-lg rounded-xl w-fit cursor-pointer"
                    onClick={() => handleImageClick(idx)}
                  >
                    {img ? (
                      <Image
                        src={img}
                        width={100}
                        height={100}
                        alt={`uploaded-${idx}`}
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <>
                        <Image
                          src="/images/upload.svg"
                          width={32}
                          height={32}
                          alt="upload"
                        />
                        <p className="text-navy text-xl">قم برفع صورة للوجهة</p>
                        <p className="text-gray text-xl">Png , Jpg</p>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      ref={fileInputRefs[idx]}
                      onChange={(e) => handleFileChange(e, idx)}
                      style={{ display: "none" }}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Destination name */}
            <form.Field
              name="name"
              validators={validators.required("اسم الوجهة")}
            >
              {(field) => (
                <div className="flex flex-col gap-2 max-w-[800px]">
                  <p className="text-3xl font-arabic-light text-navy">
                    اسم الوجهة
                  </p>
                  <Input
                    placeholder="مثال : مركز لبيب التعليمي"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <div className="text-red-500">
                      {field.state.meta.errors[0]}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
            {/* Destination description */}
            <form.Field
              name="description"
              validators={validators.required("وصف الوجهة")}
            >
              {(field) => (
                <div className="flex flex-col gap-2 max-w-[800px]">
                  <p className="text-3xl font-arabic-light text-navy">
                    وصف الوجهة
                  </p>
                  <Input
                    className="h-[228px]"
                    placeholder="ادخل وصف للوجهة"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <div className="text-red-500">
                      {field.state.meta.errors[0]}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
            {/*Destination link  */}
            <form.Field
              name="google_maps_link"
              validators={validators.required("رابط موقع الوجهة")}
            >
              {(field) => (
                <div className="flex flex-col gap-2 max-w-[800px]">
                  <p className="text-3xl font-arabic-light text-navy">
                    رابط موقع الوجهة
                  </p>
                  <Input
                    placeholder="مثال لنص افتراضى"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <div className="text-red-500">
                      {field.state.meta.errors[0]}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
          </>
        )}

        {step === 2 && (
          <>
            {/* email */}
            <form.Field name="email" validators={validators.email()}>
              {(field) => (
                <div className="flex flex-col gap-2 max-w-[800px]">
                  <p className="text-3xl font-arabic-light text-navy">
                    البريد الإلكتروني
                  </p>
                  <Input
                    placeholder="ادخل البريد الإلكتروني"
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <div className="text-red-500">
                      {field.state.meta.errors[0]}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
            {/* phone */}
            <form.Field name="phone" validators={validators.phone()}>
              {(field) => (
                <div className="flex flex-col gap-2 max-w-[800px]">
                  <p className="text-3xl font-arabic-light text-navy">
                    رقم الجوال
                  </p>
                  <Input
                    placeholder=" ادخل رقم الجوال"
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <div className="text-red-500">
                      {field.state.meta.errors[0]}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
            {/* account supervisor */}
            <form.Field
              name="contact_person_name"
              validators={validators.name("اسم المسؤول")}
            >
              {(field) => (
                <div className="flex flex-col gap-2 max-w-[800px]">
                  <p className="text-3xl font-arabic-light text-navy">
                    اسم المسؤول
                  </p>
                  <Input
                    placeholder=" ادخل اسم المسؤول"
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <div className="text-red-500">
                      {field.state.meta.errors[0]}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
            <div className="flex gap-10">
              <form.Field
                name="type"
                validators={validators.required("نوع الوجهة")}
              >
                {(field) => (
                  <div className="flex flex-col gap-2 ">
                    <p className="text-3xl font-arabic-light text-navy">
                      نوع الوجهة
                    </p>
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
                      <div className="text-red-500">
                        {field.state.meta.errors[0]}
                      </div>
                    )}
                  </div>
                )}
              </form.Field>
              <form.Field
                name="city"
                validators={validators.required("المدينة")}
              >
                {(field) => (
                  <div className="flex flex-col gap-2 ">
                    <p className="text-3xl font-arabic-light text-navy">
                      المدينة
                    </p>
                    <Select
                      variant="secondary"
                      options={[{ label: "Riyadh", value: "Riyadh" }]}
                      placeholder=" مثال : المدينه المنوره"
                      value={field.state.value}
                      onChange={(value) => field.handleChange(value)}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <div className="text-red-500">
                        {field.state.meta.errors[0]}
                      </div>
                    )}
                  </div>
                )}
              </form.Field>
              <form.Field
                name="gender"
                validators={validators.required("الفئة")}
              >
                {(field) => (
                  <div className="flex flex-col gap-2 ">
                    <p className="text-3xl font-arabic-light text-navy">
                      الفئة
                    </p>
                    <Select
                      variant="secondary"
                      options={[{ label: "educational", value: "educational" }]}
                      placeholder=" مثال : بنين "
                      value={field.state.value}
                      onChange={(value) => field.handleChange(value)}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <div className="text-red-500">
                        {field.state.meta.errors[0]}
                      </div>
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
                    <p className="text-3xl font-arabic-light text-navy">
                      العمولة
                    </p>
                    <Input
                      placeholder=" العمولة بالنسبة المئوية "
                      type="number"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <div className="text-red-500">
                        {field.state.meta.errors[0]}
                      </div>
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
                      <div className="text-red-500">
                        {field.state.meta.errors[0]}
                      </div>
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
                    <div className="text-red-500">
                      {field.state.meta.errors}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
            <form.Field name="payment_method">
              {(field) => (
                <div className="flex flex-col gap-2 ">
                  <p className="text-3xl font-arabic-light text-navy">
                    إختر طريقة الدفع
                  </p>
                  <Select
                    variant="secondary"
                    className="max-w-[500px]"
                    options={[
                      { label: "دفع كاش", value: "cash" },
                      { label: "الدفع الإلكتروني", value: "e-pay" },
                    ]}
                    placeholder="  طريقة الدفع المتاحة للوجهة"
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
                  />
                  {field.state.meta.errors && (
                    <div className="text-red-500">
                      {field.state.meta.errors}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
          </>
        )}

        {step === 3 && (
          <>
            <div className="text-primary font-arabic-medium text-4xl">
              إضافة باقة{" "}
            </div>
            <div className="text-2xl text-gray">
              يجب اضافة باقة واحدة على الأقل للوجهة
            </div>
            <form.Field name="packages[0].name">
              {(field) => (
                <div className="flex flex-col gap-2 max-w-[800px]">
                  <p className="text-3xl font-arabic-light text-navy">
                    اسم الباقة
                  </p>
                  <Input
                    placeholder=" مثال : الباقة المميزة"
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors && (
                    <div className="text-red-500">
                      {field.state.meta.errors}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
            <form.Field name="packages[0].price">
              {(field) => (
                <div className="flex flex-col gap-2 max-w-[800px]">
                  <p className="text-3xl font-arabic-light text-navy">
                    سعر الباقة
                  </p>
                  <Input
                    placeholder=" ادخل سعر الباقة هنا"
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors && (
                    <div className="text-red-500">
                      {field.state.meta.errors}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
            <form.Field name="packages[0].benefits">
              {(field) => (
                <div className="flex gap-10 max-w-[800px]">
                  <SelectableCheckboxGroup
                    options={[
                      { label: "وجبة خفيفة", value: "light_meal" },
                      { label: "سلطة", value: "salad" },
                      { label: "وجبة الافطار", value: "breakfast" },
                      { label: "سناك", value: "snack" },
                      { label: "تحلية", value: "dessert" },
                      { label: "طبق رئيسي", value: "main_dish" },
                      { label: "دخولية", value: "entrance" },
                    ]}
                    label="إختر مميزات الباقة"
                    value={field.state.value}
                    onChange={(values) => field.handleChange(values)}
                    type="primary"
                  />
                  {field.state.meta.errors && (
                    <div className="text-red-500">
                      {field.state.meta.errors}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
          </>
        )}
        <div className="flex justify-end flex-col items-end mt-10">
          <div className="flex items-center flex-col gap-3">
            <Button
              text={step === 3 ? "تأكيد إضافة الوجهة" : "الخطوة التالية"}
              className="w-fit"
              onClick={() => {
                if (step < 3) {
                  setStep(step + 1);
                } else {
                  form.handleSubmit();
                }
              }}
            />
            <div className="gap-2 flex mx-auto">
              <div
                className={cn(
                  step >= 1 ? "bg-primary " : " bg-[#D9D9D9]",
                  "h-[8px] w-[56px] rounded-[16px]"
                )}
              ></div>
              <div
                className={cn(
                  step >= 2 ? "bg-primary " : " bg-[#D9D9D9]",
                  "h-[8px] w-[56px] rounded-[16px]"
                )}
              ></div>
              <div
                className={cn(
                  step === 3 ? "bg-primary " : " bg-[#D9D9D9]",
                  "h-[8px] w-[56px] rounded-[16px]"
                )}
              ></div>
            </div>
          </div>
        </div>
      </form>{" "}
    </div>
  );
}
