/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, FormField, Select } from "@/components";
import { Loading } from "@/components/shared/Loading";
import { usePages, useUpdatePage } from "@/hooks/Content";
import { cn } from "@/lib";
import { useForm } from "@tanstack/react-form";
import React, { useEffect, useState } from "react";

type Page = {
  id: string;
  slug: string;
  type: string;
  sections: any[];
};

export default function Page() {
  const { data, isLoading } = usePages();
  const [selectedPageId, setSelectedPageId] = useState("");
  const [selectedSectionId, setSectionPageId] = useState("");
  const { mutate, isPending } = useUpdatePage(selectedPageId);

  const page_selector = data?.data?.map((page: Page) => ({
    label: page.slug,
    value: page.id,
  }));

  const page = data?.data.find((p: Page) => p.id === selectedPageId);

  const section_selector = page?.sections.map((section: any) => {
    return { label: section.section_type, value: section.id };
  });

  const section = page?.sections.find((s: any) => s.id === selectedSectionId);

  useEffect(() => {
    if (page_selector && page_selector.length > 0 && !selectedPageId) {
      setSelectedPageId(page_selector[0].value);
    }

    if (section_selector && section_selector.length > 0 && !selectedSectionId) {
      setSectionPageId(section_selector[0].value);
    }
  }, [page_selector, selectedPageId, selectedSectionId, section_selector]);

  useEffect(() => {
    if (page_selector && page_selector.length > 0 && !selectedPageId) {
      setSelectedPageId(page_selector[0].value);
    }
  }, [page_selector, selectedPageId]);

  useEffect(() => {
    if (selectedPageId && section_selector && section_selector.length > 0) {
      setSectionPageId(section_selector[0].value);
    } else if (selectedPageId) {
      setSectionPageId("");
    }
  }, [selectedPageId, section_selector?.length]);

  const form = useForm({
    defaultValues: {
      title: page?.title_ar || "",
      meta_description_ar: page?.meta_description_ar || "",
      section_content_ar: section?.content || "",
      section_title_ar: section?.title_ar || "",
    },

    onSubmit: ({ value }) => {
      // Get all existing sections
      const allSections =
        page?.sections?.map((existingSection: any) => {
          // If this is the section being edited, use the form values
          if (existingSection.id === selectedSectionId) {
            return {
              id: selectedSectionId,
              section_type: existingSection.section_type,
              title_ar: value.section_title_ar,
              content: value.section_content_ar,
            };
          }
          // Otherwise, keep the existing section data
          return {
            id: existingSection.id,
            section_type: existingSection.section_type,
            title_ar: existingSection.title_ar,
            content: existingSection.content,
          };
        }) || [];

      const payload = {
        title_ar: value.title,
        meta_description_ar: value.meta_description_ar,
        sections: allSections,
      };

      console.log("Sending payload:", payload);
      mutate(payload);
    },
  });

  useEffect(() => {
    if (page) {
      form.setFieldValue("title", page.title_ar || "");
      form.setFieldValue("meta_description_ar", page.meta_description_ar || "");
    }
  }, [page, form]);

  useEffect(() => {
    if (section) {
      form.setFieldValue("section_title_ar", section.title_ar || "");
      form.setFieldValue("section_content_ar", section.content || "");
    }
  }, [section, form]);

  useEffect(() => {
    if (selectedSectionId && !section) {
      form.setFieldValue("section_title_ar", "");
      form.setFieldValue("section_content_ar", "");
    }
  }, [selectedSectionId, section, form]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-arabic-bold ">إدارة الموقع اللإلكتروني</h1>

        <Select
          options={page_selector || []}
          className="max-w-[300px]"
          onChange={(e) => {
            setSelectedPageId(e);
          }}
          value={selectedPageId}
        />
      </div>

      <form
        className="flex gap-2 flex-col"
        onSubmit={async (e) => {
          e.preventDefault();
          const isValid = await form.validateAllFields("submit");
          if (isValid) {
            form.handleSubmit();
          }
        }}
      >
        <form.Field name="title">
          {(field) => (
            <FormField
              field={field}
              className="max-w-[573px] flex gap-2 flex-col"
            >
              <div className="text-2xl">عنوان الصفحة</div>
              <input
                className="py-[10px]  border-gray border-2 rounded-[14px] px-3 w-full"
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </FormField>
          )}
        </form.Field>
        <form.Field name="meta_description_ar">
          {(field) => (
            <FormField
              field={field}
              className="max-w-[573px] flex gap-2 flex-col"
            >
              <div className="text-2xl">وصف حكاية لبيب</div>
              <textarea
                className="py-[10px]   border-gray border-2 rounded-[14px] px-3 w-full"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </FormField>
          )}
        </form.Field>
        <div className="flex gap-2 flex-col mt-4">
          <div className="flex justify-between">
            <div className="text-2xl mb-2">إدارة محتوى الصفحة</div>
            <Select
              options={section_selector || []}
              className="max-w-[300px]"
              onChange={(e) => {
                setSectionPageId(e);
              }}
              value={selectedSectionId}
            />
          </div>
          <form.Field name="section_title_ar">
            {(field) => (
              <FormField
                field={field}
                className="max-w-[573px] flex gap-2 flex-col"
              >
                <div className="text-2xl">عنوان المحتوى</div>
                <input
                  className="py-[10px]  border-gray border-2 rounded-[14px] px-3 w-full"
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </FormField>
            )}
          </form.Field>
          <form.Field name="section_content_ar">
            {(field) => (
              <FormField
                field={field}
                className="max-w-[573px] flex gap-2 flex-col"
              >
                <div className="text-2xl">وصف المحتوى</div>
                <textarea
                  className="py-[10px]  border-gray border-2 rounded-[14px] px-3 w-full"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </FormField>
            )}
          </form.Field>
        </div>

        <Button
          type="submit"
          text={isPending ? "جاري الحفظ..." : "حفظ التغييرات"}
          className={cn("!text-2xl w-fit disabled:opacity-50")}
          disabled={isPending}
        />
      </form>
    </div>
  );
}
