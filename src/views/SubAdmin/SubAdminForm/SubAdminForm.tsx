"use client";
import { Button, FloatLabelInput, FormField } from "@/components";
import { useModal } from "@/Context/ModalContext";
import { validators } from "@/lib/constants/validation";
import { useForm } from "@tanstack/react-form";
import React from "react";
import { useCreateSupervisor } from "@/hooks/supervisors";

interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
      errors?: Record<string, string[]>;
    };
  };
}

export default function SubAdminForm({
  setIsActive,
}: {
  setIsActive?: (active: boolean) => void;
}) {
  const { openModal, closeModal } = useModal();

  const { mutate, isPending, isError, error } = useCreateSupervisor();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "pasword1234",
      password_confirmation: "pasword1234",
    },
    onSubmit: async ({ value }) => {
      const { name, email, phone, password, password_confirmation } = value;

      const formdata = {
        name,
        email,
        phone,
        password,
        password_confirmation,
      };

      mutate(formdata, {
        onSuccess: () => {
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
          setIsActive?.(false);
        },
      });
    },
  });

  return (
    <div className="flex gap-10 flex-col max-w-[441px]">
      {isError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>خطأ في التسجيل: </strong>
          {(error as ApiError)?.response?.data?.message || "حدث خطأ غير متوقع"}
          {(error as ApiError)?.response?.data?.errors && (
            <ul className="mt-2 list-disc list-inside">
              {Object.entries((error as ApiError).response!.data!.errors!).map(
                ([field, errors]) => (
                  <li key={field}>
                    {Array.isArray(errors) ? errors.join(", ") : String(errors)}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      )}
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
        <form.Field name="phone" validators={validators.phone()}>
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

        <Button
          type="submit"
          text={isPending ? "جاري الإضافة..." : "إضافة مشرف فرعي"}
          disabled={isPending}
          variant="primary"
          className="max-w-[336px] w-full "
        />
      </form>{" "}
    </div>
  );
}
