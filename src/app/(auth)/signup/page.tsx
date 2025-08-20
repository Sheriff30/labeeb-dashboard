"use client";
import {
  Button,
  FloatLabelInput,
  OtpInput,
  Select,
  SelectableCheckboxGroup,
  Timer,
} from "@/components";
import { FieldInfo } from "@/components/shared/FieldInfo";
import {
  CATEGORY_OPTIONS,
  CITY_OPTIONS,
  DISTRICT_OPTIONS,
  SCHOOL_STAGE_OPTIONS,
} from "@/lib";
import { validators } from "@/lib/constants/validation";
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

      console.log("FormData", {
        name,
        city,
        district,
        category,
        schoolStage,
        phoneNumber,
        accountName,
        email,
      });

      console.log("OTP", otp);
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
          validators={validators.length("اسم المدرسة", 2, 50)}
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
                  <FieldInfo field={field} />
                </div>{" "}
              </>
            );
          }}
        </form.Field>

        {/* Group selector */}

        <div className="flex gap-15 w-full">
          <form.Field name="city" validators={validators.required("المدينة")}>
            {(field) => {
              return (
                <div className="flex flex-col gap-1 w-full">
                  <Select
                    placeholder="المدينة"
                    value={field.state.value}
                    onChange={(val) => field.handleChange(val)}
                    options={CITY_OPTIONS}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          </form.Field>
          <form.Field name="district" validators={validators.required("الحي")}>
            {(field) => {
              return (
                <div className="flex flex-col gap-1 w-full">
                  <Select
                    placeholder="الحي"
                    value={field.state.value}
                    onChange={(val) => field.handleChange(val)}
                    options={DISTRICT_OPTIONS}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          </form.Field>
          <form.Field name="category" validators={validators.required("الفئة")}>
            {(field) => {
              return (
                <div className="flex flex-col gap-1 w-full">
                  <Select
                    placeholder="الفئة"
                    value={field.state.value}
                    onChange={(val) => field.handleChange(val)}
                    options={CATEGORY_OPTIONS}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          </form.Field>
        </div>

        {/* School stage */}
        <form.Field
          name="schoolStage"
          validators={validators.requiredArray("المرحلة الدراسية")}
        >
          {(field) => {
            return (
              <div className="flex flex-col gap-1 w-full">
                <SelectableCheckboxGroup
                  options={SCHOOL_STAGE_OPTIONS}
                  value={field.state.value}
                  onChange={(val) => field.handleChange(val)}
                  label="المرحلة الدراسية"
                />
                <FieldInfo field={field} />
              </div>
            );
          }}
        </form.Field>

        {/* Group inputs */}
        <div className="flex gap-8 ">
          <form.Field name="phoneNumber" validators={validators.phone()}>
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
            validators={validators.required("اسم مسؤول الحساب")}
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
        <form.Field name="email" validators={validators.email()}>
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
                  <FieldInfo field={field} />
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
                  <FieldInfo field={field} />
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
