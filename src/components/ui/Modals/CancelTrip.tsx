"use client";
import React from "react";
import { ModalWrapper } from "../ModalWrapper";
import Image from "next/image";
import { Button, FormField, Input } from "@/components";
import { useField, useForm } from "@tanstack/react-form";
import { validators } from "@/lib/constants/validation";
import { cn } from "@/lib/utils";

const reasons = [
  {
    id: "1",
    name: "حجز عن طريق الخطاء",
  },
  {
    id: "2",
    name: "ظروف قاهرة",
  },
  {
    id: "3",
    name: "أسباب متعلقة بالطقس",
  },

  {
    id: 4,
    name: "أسباب أخرى",
  },
];
export default function CancelTrip({
  onConfirm,
  onClose,
}: {
  onConfirm: (reason: string) => void;
  onClose: () => void;
}) {
  const form = useForm({
    defaultValues: {
      reason: "",
      reason_manual: "",
    },
    onSubmit: ({ value }) => {
      if (reasonField.state.value === "4") {
        onConfirm(value.reason_manual);
        console.log(value.reason_manual);
      } else {
        const reason = reasons.find(
          (reason) => reason.id === value.reason
        )?.name;
        onConfirm(reason as string);
        console.log(reason);
      }
    },
  });

  const reasonField = useField({
    name: "reason",
    form,
    validators: validators.required("سبب"),
  });

  return (
    <ModalWrapper onClose={onClose}>
      <div className="w-full grid gap-2">
        <div className="flex items-center justify-between ">
          <div className="text-4xl font-arabic-bold text-primary">
            إلغاء الرحلة
          </div>
          <div
            className="flex items-center gap-2 text-2xl text-gray cursor-pointer"
            onClick={onClose}
          >
            رجوع للخلف
            <Image
              src="/images/arrow-grey.svg"
              alt="arrow"
              width={9}
              height={14}
            />
          </div>
        </div>{" "}
        <form
          className="flex gap-8 flex-col"
          onSubmit={async (e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="flex flex-col gap-2">
            <div className="text-xl">إختر سبب</div>

            <div className="flex gap-4 w-full flex-col ">
              <FormField field={reasonField} className="flex  flex-col w-full">
                <div className="flex flex-col gap-4">
                  {reasons.map((reason) => (
                    <label
                      key={reason.id}
                      htmlFor={reason.name}
                      className="w-full flex gap-2 items-center text-2xl cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        name="message-type"
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          reasonField.handleChange(selectedValue);

                          if (selectedValue !== "4") {
                            form.setFieldValue("reason_manual", "");
                            form.setFieldMeta("reason_manual", (prev) => ({
                              ...prev,
                              errorMap: {},
                            }));
                          }
                        }}
                        checked={
                          reasonField.state.value === reason.id.toString()
                        }
                        id={reason.name}
                        value={reason.id}
                        className="h-6 w-6 appearance-none border-black border-[2.5px] rounded-[7px] checked:border-primary"
                      />
                      <span>{reason.name}</span>
                    </label>
                  ))}
                </div>
              </FormField>
            </div>
          </div>
          <div>
            <form.Field
              name="reason_manual"
              validators={
                reasonField.state.value === "4"
                  ? validators.required("سبب يدوياً")
                  : undefined
              }
            >
              {(field) => {
                return (
                  <FormField field={field}>
                    <div
                      className={cn(
                        "text-xl text-black",
                        reasonField.state.value !== "4" && "opacity-50"
                      )}
                    >
                      أضف سبب يدوياً الإلغاء
                    </div>
                    <Input
                      disabled={reasonField.state.value !== "4"}
                      className={cn(
                        "text-black",
                        reasonField.state.value !== "4" && "opacity-50"
                      )}
                      onChange={(e) => field.handleChange(e.target.value)}
                      value={field.state.value}
                    />
                  </FormField>
                );
              }}
            </form.Field>
          </div>
          <Button
            type="submit"
            text="تاكيد إرسال طلب إلغاء"
            className="!bg-navy !text-2xl"
          />
        </form>
      </div>
    </ModalWrapper>
  );
}
