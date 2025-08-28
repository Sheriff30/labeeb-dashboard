"use client";

import { Button, FormField, Input } from "@/components";
import { validators } from "@/lib/constants/validation";
import { useForm } from "@tanstack/react-form";
import React from "react";

export default function Page() {
  const form = useForm({
    defaultValues: {
      messageType: "",
      message: "",
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div className="h-full overflow-auto no-scrollbar">
      <div className="mb-10 text-4xl font-arabic-bold">تواصل معنا</div>
      <form
        action=""
        onSubmit={async (e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="text-3xl font-arabic-bold text-primary mb-[10px]">
          إختر نوع الرسالة
        </div>

        <div className="flex  gap-4 max-w-[671px] w-full mb-6">
          <form.Field
            name="messageType"
            validators={validators.required("نوع الرسالة")}
          >
            {(field) => {
              return (
                <FormField field={field} className="flex  flex-col w-full">
                  <div className="flex gap-2 w-full flex-col md:flex-row">
                    <label
                      htmlFor="enquiry"
                      className="w-full flex gap-2 items-center text-2xl"
                    >
                      <input
                        type="checkbox"
                        name="message-type"
                        onChange={(e) => field.handleChange(e.target.value)}
                        checked={field.state.value === "enquiry"}
                        id="enquiry"
                        value="enquiry"
                        className="h-6 w-6 appearance-none border-black border-[2.5px] rounded-[7px] checked:border-primary"
                      />
                      <span>استفسار</span>
                    </label>
                    <label
                      htmlFor="complaint"
                      className="w-full flex gap-2 items-center text-2xl"
                    >
                      <input
                        type="checkbox"
                        name="message-type"
                        onChange={(e) => field.handleChange(e.target.value)}
                        checked={field.state.value === "complaint"}
                        id="complaint"
                        value="complaint"
                        className="h-6 w-6 appearance-none border-black border-[2.5px] rounded-[7px] checked:border-primary"
                      />
                      <span>شكوى</span>
                    </label>
                    <label
                      htmlFor="suggestion"
                      className="w-full flex gap-2 items-center text-2xl"
                    >
                      <input
                        type="checkbox"
                        name="message-type"
                        onChange={(e) => field.handleChange(e.target.value)}
                        checked={field.state.value === "suggestion"}
                        id="suggestion"
                        value="suggestion"
                        className="h-6 w-6 appearance-none border-black border-[2.5px] rounded-[7px] checked:border-primary"
                      />
                      <span>اقتراح</span>
                    </label>
                    <label
                      htmlFor="other"
                      className="w-full flex gap-2 items-center text-2xl"
                    >
                      <input
                        type="checkbox"
                        name="message-type"
                        onChange={(e) => field.handleChange(e.target.value)}
                        checked={field.state.value === "other"}
                        id="other"
                        value="other"
                        className="h-6 w-6 appearance-none border-black border-[2.5px] rounded-[7px] checked:border-primary"
                      />
                      <span>اخرى</span>
                    </label>
                  </div>
                </FormField>
              );
            }}
          </form.Field>
        </div>

        <form.Field name="message" validators={validators.message()}>
          {(field) => {
            return (
              <FormField field={field} className="mb-8">
                <Input
                  type="text"
                  placeholder=" اكتب رسالتك هنا...."
                  className="!max-w-[888px]"
                  onChange={(e) => field.handleChange(e.target.value)}
                  value={field.state.value}
                  minLength={10}
                  maxLength={1000}
                />
              </FormField>
            );
          }}
        </form.Field>

        <Button
          text="إرسال"
          className="!max-w-[336px] mb-8 !w-full"
          variant="primary"
          type="submit"
        />
      </form>
    </div>
  );
}
