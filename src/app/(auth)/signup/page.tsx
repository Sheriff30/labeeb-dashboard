"use client";
import { FloatLabelInput, Select, SelectableCheckboxGroup } from "@/components";
import { useForm } from "@tanstack/react-form";
import React from "react";

export default function Page() {
  const form = useForm({
    defaultValues: {
      name: "",
      city: "",
      district: "",
      category: "",
      schoolStage: [] as string[],
      phoneNumber: "",
      accountName: "",
      email: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-2 ">
        <h1 className="text-6xl text-primary font-arabic-bold ">إنشاء حساب</h1>
        <p className="text-2xl text-gray">
          يرجى تعبئة البيانات لإنشاء حسابكم في المنصة
        </p>
      </div>
      {/* Form */}
      <form
        className="flex flex-col gap-7 max-w-[700px]"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        {/* School name */}
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "اسم المدرسة مطلوب"
                : value.length < 2
                ? "اسم المدرسة يجب أن يكون على الأقل 2 أحرف"
                : value.length > 50
                ? "اسم المدرسة يجب أن يكون على اقل 50 حرف"
                : undefined,
          }}
        >
          {(field) => {
            return (
              <>
                <div className="flex flex-col gap-1 max-w-[573px]">
                  <FloatLabelInput
                    label="اسم المدرسة"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    minLength={2}
                    maxLength={50}
                  />
                  {field.state.meta.errors && (
                    <span className="text-red-500 text-sm">
                      {field.state.meta.errors}
                    </span>
                  )}
                </div>{" "}
              </>
            );
          }}
        </form.Field>

        {/* Group selector */}

        <div className="flex gap-15 w-full">
          <form.Field
            name="city"
            validators={{
              onChange: ({ value }) => (!value ? "المدينة مطلوبة" : undefined),
            }}
          >
            {(field) => {
              return (
                <div className="flex flex-col gap-1 w-full">
                  <Select
                    placeholder="المدينة"
                    value={field.state.value}
                    onChange={(val) => field.handleChange(val)}
                    options={[
                      { value: "makkah", label: "مكة المكرمة" },
                      { value: "madinah", label: "المدينة المنورة" },
                      { value: "riyadh", label: "الرياض" },
                      { value: "jeddah", label: "جدة" },
                      { value: "dammam", label: "الدمام" },
                      { value: "taif", label: "الطائف" },
                    ]}
                  />
                  {field.state.meta.errors && (
                    <span className="text-red-500 text-sm">
                      {field.state.meta.errors}
                    </span>
                  )}
                </div>
              );
            }}
          </form.Field>
          <form.Field
            name="district"
            validators={{
              onChange: ({ value }) => (!value ? "الحي مطلوب" : undefined),
            }}
          >
            {(field) => {
              return (
                <div className="flex flex-col gap-1 w-full">
                  <Select
                    placeholder="الحي"
                    value={field.state.value}
                    onChange={(val) => field.handleChange(val)}
                    options={[
                      { value: "alaziziyah", label: "العزيزية" },
                      { value: "alsharafiyah", label: "الشرقية" },
                      { value: "alsalam", label: "السلام" },
                      { value: "alrawdah", label: "الروضة" },
                      { value: "alnaseem", label: "النسيم" },
                    ]}
                  />
                  {field.state.meta.errors && (
                    <span className="text-red-500 text-sm">
                      {field.state.meta.errors}
                    </span>
                  )}
                </div>
              );
            }}
          </form.Field>
          <form.Field
            name="category"
            validators={{
              onChange: ({ value }) => (!value ? "الفئة مطلوبة" : undefined),
            }}
          >
            {(field) => {
              return (
                <div className="flex flex-col gap-1 w-full">
                  <Select
                    placeholder="الفئة"
                    value={field.state.value}
                    onChange={(val) => field.handleChange(val)}
                    options={[
                      { value: "boys", label: "بنين" },
                      { value: "girls", label: "بنات" },
                      { value: "both", label: "كلاهم" },
                    ]}
                  />
                  {field.state.meta.errors && (
                    <span className="text-red-500 text-sm">
                      {field.state.meta.errors}
                    </span>
                  )}
                </div>
              );
            }}
          </form.Field>
        </div>

        {/* School stage */}
        <form.Field
          name="schoolStage"
          validators={{
            onChange: ({ value }) =>
              !value.length || value.length < 1
                ? "المرحلة الدراسية مطلوبة"
                : undefined,
          }}
        >
          {(field) => {
            return (
              <div className="flex flex-col gap-1 w-full">
                <SelectableCheckboxGroup
                  options={[
                    { value: "kindergarten", label: "رياض الأطفال" },
                    { value: "primary", label: "الابتدائية" },
                    { value: "middle", label: "الإعدادية" },
                    { value: "secondary", label: "الثانوية" },
                  ]}
                  value={field.state.value}
                  onChange={(val) => field.handleChange(val)}
                  label="المرحلة الدراسية"
                />
                {field.state.meta.errors && (
                  <span className="text-red-500 text-sm">
                    {field.state.meta.errors}
                  </span>
                )}
              </div>
            );
          }}
        </form.Field>

        {/* Group inputs */}
        <div className="flex gap-8 ">
          <form.Field
            name="phoneNumber"
            validators={{
              onChange: ({ value }) => {
                if (!value) return "رقم الجوال مطلوب";

                const cleanValue = value.replace(/\s+/g, "");

                // Saudi format: 05XXXXXXXX (10 digits)
                const saudiRegex = /^05\d{8}$/;

                // International format: +9665XXXXXXXX (13 digits)
                const intlRegex = /^\+9665\d{8}$/;

                if (
                  !saudiRegex.test(cleanValue) &&
                  !intlRegex.test(cleanValue)
                ) {
                  return "رقم الجوال غير صالح، اكتبه بصيغة 05XXXXXXXX أو +9665XXXXXXXX";
                }

                return "";
              },
            }}
          >
            {(field) => (
              <div className="w-full">
                <div className="flex flex-col gap-1">
                  <FloatLabelInput
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    label="رقم الجوال"
                    type="tel"
                    pattern="[0-9+ ]{10,15}"
                    minLength={10}
                    maxLength={20}
                    inputMode="numeric"
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.value = target.value.replace(/[^0-9+ ]/g, "");
                    }}
                  />
                  {field.state.meta.errors && (
                    <span className="text-red-500 text-sm">
                      {field.state.meta.errors[0]
                        ?.split(/(05XXXXXXXX|\+9665XXXXXXXX)/)
                        .map((part, i) =>
                          part === "05XXXXXXXX" || part === "+9665XXXXXXXX" ? (
                            <span
                              key={i}
                              className="font-mono text-red-600 "
                              dir="ltr"
                            >
                              {part}
                            </span>
                          ) : (
                            part
                          )
                        )}
                    </span>
                  )}
                </div>
              </div>
            )}
          </form.Field>

          <form.Field
            name="accountName"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "اسم مسؤول الحساب مطلوب"
                  : value.length < 2
                  ? "اسم مسؤول الحساب يجب أن يكون على الأقل 2 أحرف"
                  : value.length > 50
                  ? "اسم مسؤول الحساب يجب أن يكون على اقل 50 حرف"
                  : undefined,
            }}
          >
            {(field) => {
              return (
                <div className="w-full">
                  <div className="flex flex-col gap-1 ">
                    <FloatLabelInput
                      label="اسم مسؤول الحساب"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      minLength={2}
                      maxLength={50}
                    />
                    {field.state.meta.errors && (
                      <span className="text-red-500 text-sm">
                        {field.state.meta.errors}
                      </span>
                    )}
                  </div>{" "}
                </div>
              );
            }}
          </form.Field>
        </div>

        <button className="submit">Submit</button>
      </form>
    </div>
  );
}
