"use client";
import {
  Button,
  FloatLabelInput,
  FormField,
  Select,
  SelectableCheckboxGroup,
} from "@/components";

import { FieldInfo } from "@/components/shared/FieldInfo";
import useOTP from "@/hooks/useOTP";
import useRegister from "@/hooks/useRegister";
import {
  CATEGORY_OPTIONS,
  CITY_OPTIONS,
  DISTRICT_OPTIONS,
  SCHOOL_STAGE_OPTIONS,
} from "@/lib";
import { validators } from "@/lib/constants/validation";
import { useForm } from "@tanstack/react-form";
import { AxiosError } from "axios";
import { useState } from "react";

type RegisterFormProps = {
  setOtpDuration: (val: number) => void;
  handleOtpFormShow: () => void;
  setPhoneNumber: (val: string) => void;
};

export default function RegisterForm({
  setOtpDuration,
  handleOtpFormShow,
  setPhoneNumber,
}: RegisterFormProps) {
  const { mutate, isPending } = useRegister();
  const { mutate: otpMutate } = useOTP();
  const [error, setError] = useState<string[]>([]);

  const registerForm = useForm({
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
      if (value) {
        const payload = {
          name: value.name,
          email: value.email,
          mobile: value.phoneNumber,
          role: "school",
          educational_stages: value.schoolStage,
          organization_name: value.accountName,
          city: value.city,
          district: value.district,
          gender: value.category,
        };
        mutate(payload, {
          onSuccess() {
            otpMutate(
              { mobile: payload.mobile },
              {
                onSuccess(data) {
                  setOtpDuration(Number(data.data.expires_in));
                  setPhoneNumber(payload.mobile);
                  handleOtpFormShow();
                },
              }
            );
          },
          onError(error) {
            if (error instanceof AxiosError) {
              const errorMessages = Object.values(
                error.response?.data.errors as string[]
              ).flat();
              setError(errorMessages);
            }
          },
        });
      }
    },
  });

  const clearErrors = () => {
    if (error.length > 0) {
      setError([]);
    }
  };

  return (
    <form
      className="flex flex-col gap-7  max-w-[700px]"
      onSubmit={async (e) => {
        e.preventDefault();
        const isValid = await registerForm.validateAllFields("submit");
        if (isValid) {
          registerForm.handleSubmit();
        }
      }}
    >
      {/* School name */}
      <registerForm.Field
        name="name"
        validators={validators.length("اسم المدرسة", 2, 50)}
      >
        {(field) => {
          return (
            <FormField field={field} className="md:max-w-[573px]">
              <FloatLabelInput
                label="اسم المدرسة"
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                  clearErrors();
                }}
                minLength={2}
                maxLength={50}
              />
            </FormField>
          );
        }}
      </registerForm.Field>

      {/* Group selector */}

      <div className="flex gap-4 md:gap-15 flex-col md:flex-row w-full ">
        <registerForm.Field
          name="city"
          validators={validators.required("المدينة")}
        >
          {(field) => {
            return (
              <FormField field={field}>
                <Select
                  placeholder="المدينة"
                  value={field.state.value}
                  onChange={(val) => {
                    clearErrors();
                    field.handleChange(val);
                  }}
                  options={CITY_OPTIONS}
                />
              </FormField>
            );
          }}
        </registerForm.Field>
        <registerForm.Field
          name="district"
          validators={validators.required("الحي")}
        >
          {(field) => {
            return (
              <FormField field={field}>
                <Select
                  placeholder="الحي"
                  value={field.state.value}
                  onChange={(val) => {
                    clearErrors();
                    field.handleChange(val);
                  }}
                  options={DISTRICT_OPTIONS}
                />
              </FormField>
            );
          }}
        </registerForm.Field>
        <registerForm.Field
          name="category"
          validators={validators.required("الفئة")}
        >
          {(field) => {
            return (
              <FormField field={field}>
                <Select
                  placeholder="الفئة"
                  value={field.state.value}
                  onChange={(val) => {
                    clearErrors();
                    field.handleChange(val);
                  }}
                  options={CATEGORY_OPTIONS}
                />
              </FormField>
            );
          }}
        </registerForm.Field>
      </div>

      {/* School stage */}
      <registerForm.Field
        name="schoolStage"
        validators={validators.requiredArray("المرحلة الدراسية")}
      >
        {(field) => {
          return (
            <div className="flex flex-col gap-1 w-full">
              <SelectableCheckboxGroup
                options={SCHOOL_STAGE_OPTIONS}
                value={field.state.value}
                onChange={(val) => {
                  clearErrors();
                  field.handleChange(val);
                }}
                label="المرحلة الدراسية"
              />
              <FieldInfo field={field} />
            </div>
          );
        }}
      </registerForm.Field>

      {/* Group inputs */}
      <div className="flex gap-8 flex-col md:flex-row">
        <registerForm.Field name="phoneNumber" validators={validators.phone()}>
          {(field) => (
            <FormField field={field}>
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
                  clearErrors();
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
          )}
        </registerForm.Field>

        <registerForm.Field
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
                    onChange={(e) => {
                      clearErrors();
                      field.handleChange(e.target.value);
                    }}
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
        </registerForm.Field>
      </div>

      {/* Email  */}

      <registerForm.Field name="email" validators={validators.email()}>
        {(field) => (
          <FormField field={field} className="max-w-[573px]">
            <FloatLabelInput
              label="البريد الإلكتروني"
              value={field.state.value}
              onChange={(e) => {
                clearErrors();
                field.handleChange(e.target.value);
              }}
              type="email"
              maxLength={254}
            />
          </FormField>
        )}
      </registerForm.Field>

      <Button
        disabled={isPending}
        type="submit"
        text={isPending ? "جاري الإنشاء..." : "إنشاء حساب"}
        variant="primary"
      />
      {error.length > 0 && (
        <ul className="text-red-500 bg-red-500/10 px-2 py-4  text-md rounded-xl list-disc list-inside duration-200">
          {error.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </form>
  );
}
