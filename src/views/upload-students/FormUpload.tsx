"use client";
import {
  Button,
  FloatLabelInput,
  FormField,
  Select,
  SelectableCheckboxGroup,
  Upload,
} from "@/components";
import {
  CATEGORY_OPTIONS,
  SCHOOL_STAGE_OPTIONS,
} from "@/lib/constants/options";
import { validators } from "@/lib/constants/validation";
import { useForm } from "@tanstack/react-form";
import { useModal } from "@/Context/ModalContext";

export default function FormUpload() {
  const { openModal, closeModal } = useModal();
  const form = useForm({
    defaultValues: {
      name: "",
      gender: "",
      schoolStage: [] as string[],
      file: null as File | null,
    },
    onSubmit: ({ value }) => {
      console.log(value);
      form.reset();
      openModal("CONFIRM", {
        title: "تم رفع الملف بنجاح",
        titleColor: "text-primary-green",

        buttonText: "شكراً",
        onConfirm: () => {
          closeModal();
        },
      });
    },
  });

  return (
    <form
      action=""
      className="flex flex-col gap-10"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field name="name" validators={validators.length("الاسم", 3, 50)}>
        {(field) => {
          return (
            <FormField field={field} className="max-w-[324px]">
              <FloatLabelInput
                label="اسم الملف"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                maxLength={100}
                minLength={3}
              />
            </FormField>
          );
        }}
      </form.Field>
      <form.Field name="gender">
        {(field) => {
          return (
            <FormField field={field} className="max-w-[186px]">
              <Select
                placeholder="الفئة"
                optional={true}
                value={field.state.value}
                onChange={(val) => field.handleChange(val)}
                options={CATEGORY_OPTIONS}
              />
            </FormField>
          );
        }}
      </form.Field>
      <form.Field name="schoolStage">
        {(field) => {
          return (
            <FormField field={field}>
              <SelectableCheckboxGroup
                label="المرحلة الدراسية"
                value={field.state.value}
                optional={true}
                onChange={(val) => field.handleChange(val)}
                options={SCHOOL_STAGE_OPTIONS}
              />
            </FormField>
          );
        }}
      </form.Field>
      <form.Field name="file" validators={validators.file()}>
        {(field) => {
          return (
            <FormField field={field}>
              <div className="relative">
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-2"
                  onChange={(e) =>
                    field.handleChange(e.target.files?.[0] || null)
                  }
                />
                <div className="flex gap-2 flex-wrap items-center">
                  <button className="flex items-center text-2xl gap-3 bg-primary-green-2 py-2 px-4 text-primary border border-dashed rounded-lg border-primary-green">
                    <Upload className="w-[48px] h-[48px]" />
                    <div>
                      <div>قم بإرفاق الملف</div>
                      <div className="text-gray font-roboto"> XCEL , CSV</div>
                    </div>
                  </button>
                  <div>{field.state.value?.name}</div>
                </div>
              </div>
            </FormField>
          );
        }}
      </form.Field>
      <Button type="submit" className="max-w-[336px]" text="تأكيد رفع الملف" />
    </form>
  );
}
