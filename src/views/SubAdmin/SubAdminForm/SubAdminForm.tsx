"use client";
import { Button, FloatLabelInput, FormField, Select } from "@/components";
import { useModal } from "@/Context/ModalContext";

import { validators } from "@/lib/constants/validation";
import { useForm } from "@tanstack/react-form";

import React from "react";
export default function SubAdminForm() {
  const { openModal, closeModal } = useModal();
  const form = useForm({
    defaultValues: {
      name: "",
      city: "",
      district: "",
      category: "",
      schoolStage: [] as string[],
      accountName: "",
      email: "",
      phoneNumber: "",
      numberOfStudents: "",
      numberOfBranches: "",
    },
    onSubmit: async ({ value }) => {
      const {
        name,
        city,
        district,
        category,
        schoolStage,
        accountName,
        email,
        numberOfStudents,
        numberOfBranches,
      } = value;

      const formData = {
        name,
        city,
        district,
        category,
        schoolStage,
        numberOfStudents,
        numberOfBranches,
        accountName,
        email,
      };
      form.reset();

      openModal("CONFIRM", {
        title: "تم إضافة الحساب بنجاح",
        message:
          "بإمكانه الآن تسجيل الدخول عبر رقم الجوال أو البريد الإلكتروني الخاص بحسابه",
        buttonText: "شكراً",
        onConfirm: () => {
          closeModal();
        },
      });
    },
  });

  return (
    <form
      className="flex flex-col gap-10 max-w-[441px] overflow-auto no-scrollbar h-full"
      onSubmit={async (e) => {
        e.preventDefault();
        const isValid = await form.validateAllFields("submit");
        if (isValid) {
          form.handleSubmit();
        }
      }}
    >
      {/* School name */}
      <form.Field name="name" validators={validators.name("اسم المشرف")}>
        {(field) => {
          return (
            <FormField field={field} className="">
              <FloatLabelInput
                label="اسم المشرف"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                minLength={2}
                maxLength={50}
              />
            </FormField>
          );
        }}
      </form.Field>

      {/* Email  */}
      <form.Field name="email" validators={validators.email()}>
        {(field) => {
          return (
            <FormField field={field} className="max-w-[573px]">
              <FloatLabelInput
                label="البريد الإلكتروني"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                type="email"
                maxLength={254}
              />
            </FormField>
          );
        }}
      </form.Field>

      {/* Phone Number */}
      <form.Field name="phoneNumber" validators={validators.phone()}>
        {(field) => {
          return (
            <FormField field={field} className="max-w-[573px]">
              <FloatLabelInput
                label="رقم الجوال"
                value={field.state.value}
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
                  let val = e.target.value.replace(/[٠-٩]/g, (d) => {
                    return englishNums[arabicNums.indexOf(d)];
                  });
                  val = val.replace(/[^0-9+]/g, "");
                  field.handleChange(val);
                }}
              />
            </FormField>
          );
        }}
      </form.Field>

      <form.Field
        name="city"
        validators={validators.required("موقع المشرف / الفرع")}
      >
        {(field) => {
          return (
            <FormField field={field}>
              <div className="flex gap-4  md:items-center flex-col md:flex-row ">
                <div className="text-2xl flex-shrink-0 ">
                  موقع المشرف / الفرع
                </div>
                <Select
                  options={[
                    {
                      label: "الرياض",
                      value: "الرياض",
                    },
                    {
                      label: "جدة",
                      value: "جدة",
                    },
                    {
                      label: "مكة",
                      value: "مكة",
                    },

                    {
                      label: "المدينة المنورة",
                      value: "المدينة المنورة",
                    },
                  ]}
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value)}
                  variant="secondary"
                  placeholder="اختر المدينة"
                />
              </div>
            </FormField>
          );
        }}
      </form.Field>
      <Button
        type="submit"
        text="تأكيد الإضافة"
        variant="primary"
        className="max-w-[336px] w-full my-auto"
      />
    </form>
  );
}
