"use client";
import {
  Button,
  FloatLabelInput,
  FormField,
  Select,
  SelectableCheckboxGroup,
} from "@/components";
import { FieldInfo } from "@/components/shared/FieldInfo";
import { useModal } from "@/Context/ModalContext";
import {
  CATEGORY_OPTIONS,
  CITY_OPTIONS,
  DISTRICT_OPTIONS,
  SCHOOL_STAGE_OPTIONS,
} from "@/lib";
import { validators } from "@/lib/constants/validation";
import { useField, useForm } from "@tanstack/react-form";

import React from "react";

export default function Page() {
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
      console.log("FormData", formData);
      form.reset();
      openModal("CONFIRM", {
        title: "تم تعديل البيانات بنجاح",
        buttonText: "شكراً",
        onConfirm: () => {
          closeModal();
        },
      });
    },
  });

  const emailField = useField({
    name: "email",
    form,
    validators: validators.email(),
  });

  return (
    <div className="flex flex-col gap-11 h-full  overflow-auto no-scrollbar">
      {/* Header */}
      <h1 className="text-4xl  font-arabic-bold ">
        مراجعة و تعديل بيانات حساب المدرسة
      </h1>

      {/* Form */}
      <form
        className="flex flex-col gap-6 max-w-[700px] h-full"
        onSubmit={async (e) => {
          e.preventDefault();
          const isValid = await form.validateAllFields("submit");
          if (isValid) {
            form.handleSubmit();
          }
        }}
      >
        {/* School name */}
        <form.Field
          name="name"
          validators={validators.length("اسم المدرسة", 2, 50)}
        >
          {(field) => {
            return (
              <FormField field={field} className="md:max-w-[573px]">
                <FloatLabelInput
                  label="اسم المدرسة"
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

        <FormField field={emailField} className="max-w-[573px]">
          <FloatLabelInput
            label="البريد الإلكتروني"
            value={emailField.state.value}
            onChange={(e) => emailField.handleChange(e.target.value)}
            type="email"
            maxLength={254}
          />
        </FormField>

        {/* Group selector */}

        <div className="flex gap-4 md:gap-15 flex-col md:flex-row w-full ">
          <form.Field name="city" validators={validators.required("المدينة")}>
            {(field) => {
              return (
                <FormField field={field}>
                  <Select
                    placeholder="المدينة"
                    value={field.state.value}
                    onChange={(val) => field.handleChange(val)}
                    options={CITY_OPTIONS}
                  />
                </FormField>
              );
            }}
          </form.Field>
          <form.Field name="district" validators={validators.required("الحي")}>
            {(field) => {
              return (
                <FormField field={field}>
                  <Select
                    placeholder="الحي"
                    value={field.state.value}
                    onChange={(val) => field.handleChange(val)}
                    options={DISTRICT_OPTIONS}
                  />
                </FormField>
              );
            }}
          </form.Field>
          <form.Field name="category" validators={validators.required("الفئة")}>
            {(field) => {
              return (
                <FormField field={field}>
                  <Select
                    placeholder="الفئة"
                    value={field.state.value}
                    onChange={(val) => field.handleChange(val)}
                    options={CATEGORY_OPTIONS}
                  />
                </FormField>
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

        {/* Account name */}
        <form.Field
          name="accountName"
          validators={validators.required("اسم مسؤول الحساب")}
        >
          {(field) => {
            return (
              <div className="w-full max-w-[324px]">
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
        {/* Number of students */}
        <form.Field name="numberOfStudents" validators={validators.number()}>
          {(field) => {
            return (
              <div className=" flex items-end gap-2 flex-wrap">
                <div className="flex flex-col  gap-1 w-full max-w-[324px]">
                  <FloatLabelInput
                    label="عدد طلاب المدرسة "
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="number"
                  />
                  {field.state.meta.errors && (
                    <span className="text-red-500 text-sm">
                      {field.state.meta.errors}
                    </span>
                  )}
                </div>
                <div className="text-gray text-xl">( إختياري )</div>
              </div>
            );
          }}
        </form.Field>
        {/* Number of branches */}
        <form.Field name="numberOfBranches" validators={validators.number()}>
          {(field) => {
            return (
              <div className=" flex items-end gap-2 flex-wrap">
                <div className="flex flex-col gap-1 w-full max-w-[324px]">
                  <FloatLabelInput
                    label="عدد أفرع المدرسة "
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="number"
                  />
                  {field.state.meta.errors && (
                    <span className="text-red-500 text-sm">
                      {field.state.meta.errors}
                    </span>
                  )}
                </div>{" "}
                <div className="text-gray text-xl">( إختياري )</div>
              </div>
            );
          }}
        </form.Field>
        <Button
          type="submit"
          text="حفظ التعديلات"
          variant="primary"
          className="max-w-[336px] w-full my-auto"
        />
      </form>
    </div>
  );
}
