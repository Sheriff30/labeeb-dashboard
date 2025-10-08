/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, FormField } from "@/components";
import { useCreateCategory } from "@/hooks/Content";
import { cn } from "@/lib";
import { useForm } from "@tanstack/react-form";
import React, { useState } from "react";

export default function CreateCategory() {
  const { mutate, isPending } = useCreateCategory();
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },

    onSubmit: ({ value }) => {
      setErrors({});

      mutate(
        { ...value },
        {
          onError: (err: any) => {
            setErrors(err);
          },
        }
      );
    },
  });
  return (
    <div>
      <div className="text-3xl font-arabic-bold text-primary">
        إنشاء تصنيف للمدونة
      </div>

      <form
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5"
        onSubmit={async (e) => {
          e.preventDefault();
          const isValid = await form.validateAllFields("submit");
          if (isValid) {
            form.handleSubmit();
          }
        }}
      >
        {/* Category Name */}
        <form.Field name="name">
          {(field) => (
            <FormField field={field} className="flex gap-2 flex-col">
              <div className="text-2xl">اسم التصنيف</div>
              <input
                className="py-1.5 border-gray border-2 rounded-[14px] px-3 w-full"
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="أدخل اسم التصنيف"
              />
              {errors.name && (
                <div className="text-red-500 text-sm">
                  {errors.name.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
            </FormField>
          )}
        </form.Field>

        {/* Slug */}
        <form.Field name="slug">
          {(field) => (
            <FormField field={field} className="flex gap-2 flex-col">
              <div className="text-2xl">المُعرّف (Slug)</div>
              <input
                className="py-1.5 border-gray border-2 rounded-[14px] px-3 w-full"
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="category-slug"
              />
              {errors.slug && (
                <div className="text-red-500 text-sm">
                  {errors.slug.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
            </FormField>
          )}
        </form.Field>

        {/* Description */}
        <form.Field name="description">
          {(field) => (
            <FormField
              field={field}
              className="flex gap-2 flex-col lg:col-span-2"
            >
              <div className="text-2xl">وصف التصنيف</div>
              <textarea
                className="py-1.5 border-gray border-2 rounded-[14px] px-3 w-full h-24"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="أدخل وصف للتصنيف (اختياري)"
              />
              {errors.description && (
                <div className="text-red-500 text-sm">
                  {errors.description.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
            </FormField>
          )}
        </form.Field>

        {/* Display general errors */}
        {Object.keys(errors).length > 0 && (
          <div className="">
            {Object.entries(errors).map(([field, fieldErrors]) => (
              <div key={field} className="mb-2">
                <ul className="list-disc list-inside text-red-600">
                  {fieldErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="lg:col-span-2 flex justify-end">
          <Button
            type="submit"
            text={isPending ? "جاري الإنشاء..." : "إنشاء التصنيف"}
            className={cn("!text-2xl w-fit disabled:opacity-50")}
            disabled={isPending}
          />
        </div>
      </form>
    </div>
  );
}
