"use client";
import {
  Button,
  FloatLabelInput,
  OtpInput,
  Select,
  SelectableCheckboxGroup,
  Timer,
} from "@/components";
import { cn } from "@/lib/utils";
import { useForm, useField } from "@tanstack/react-form";
import Link from "next/link";
import React, { useState } from "react";

export default function Page() {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const handleSendOtp = () => {
    setIsOtpSent(true);
    setIsTimerRunning(true);
  };

  const handleTimerComplete = () => {
    setIsTimerRunning(false);
  };

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
      otp: "",
    },
    onSubmit: async ({ value }) => {
      const {
        name,
        city,
        district,
        category,
        schoolStage,
        phoneNumber,
        accountName,
        email,
        otp,
      } = value;

      console.log(
        name,
        city,
        district,
        category,
        schoolStage,
        phoneNumber,
        accountName,
        email,
        otp
      );
    },
  });

  const field = useField({ name: "email", form });
  const otpDisabled = !field.state.value || !!field.state.meta.errors?.length;

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
                    label="رقم الجوال"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9+]{10,15}"
                    minLength={10}
                    maxLength={20}
                    format="05XXXXXXXX"
                    formatLang="en"
                    onChange={(e) => {
                      const arabicNums = "٠١٢٣٤٥٦٧٨٩";
                      const englishNums = "0123456789";

                      // حوّل الأرقام العربية → إنجليزية
                      let val = e.target.value.replace(/[٠-٩]/g, (d) => {
                        return englishNums[arabicNums.indexOf(d)];
                      });

                      // خليه يسمح بس بـ أرقام +
                      val = val.replace(/[^0-9+]/g, "");

                      field.handleChange(val);
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

        {/* Email  */}
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              if (!value) return "البريد الإلكتروني مطلوب";

              // Simple email regex pattern
              const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

              if (!emailPattern.test(value)) {
                return "البريد الإلكتروني غير صالح";
              }

              return undefined;
            },
          }}
        >
          {(field) => {
            return (
              <div className="flex flex-col gap-6 ">
                <div className="flex flex-col gap-1 max-w-[573px]">
                  <FloatLabelInput
                    label="البريد الإلكتروني"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="email"
                    maxLength={254}
                  />
                  {field.state.meta.errors && (
                    <span className="text-red-500 text-sm">
                      {field.state.meta.errors}
                    </span>
                  )}
                </div>
              </div>
            );
          }}
        </form.Field>

        {/* OTP */}
        <Button
          type="button"
          variant="tertiary"
          text={isOtpSent ? "إرسال الرمز مرة أخرى" : "إرسال الرمز"}
          className="w-fit"
          onClick={handleSendOtp}
          disabled={otpDisabled || isTimerRunning}
        />

        <div
          className={cn(
            "text-2xl transition-all duration-300",
            !isOtpSent
              ? "opacity-0 pointer-events-none invisible"
              : "opacity-100 pointer-events-auto"
          )}
        >
          <p className="text-2xl text-primary mb-[6px]">ادخل الكود المرسل لك</p>
          <p className="text-gray flex items-center gap-2 mb-[14px]">
            <span className="text-gray">لم تستلم الرمز ؟ </span>
            <span>إعادة إرسال الرمز </span>
            <Timer onComplete={handleTimerComplete} isActive={isTimerRunning} />
          </p>
          <form.Field
            name="otp"
            validators={{
              onChange: ({ value }) => {
                if (!value) return "الكود مطلوب";
                if (value.length < 6) {
                  return "الكود يجب أن يكون 6 أرقام";
                }
                return undefined;
              },
            }}
          >
            {(field) => {
              return (
                <div className="flex flex-col gap-1 ">
                  <OtpInput onComplete={field.handleChange} />{" "}
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

        <Button type="submit" text="إنشاء حساب" variant="primary" />
        <div className="text-2xl">
          <span>هل يوجد لديك حساب للمدرسة ؟</span>
          <Link href="/login" className="text-primary">
            {" "}
            سجل دخول
          </Link>
        </div>
      </form>
    </div>
  );
}
