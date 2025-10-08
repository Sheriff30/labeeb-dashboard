/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, FormField, Select } from "@/components";
import { useCategories, useCreateArticle } from "@/hooks/Content";
import { cn } from "@/lib";
import { useForm } from "@tanstack/react-form";
import React, { useState } from "react";

export default function CreateArticle() {
  const { mutate, isPending } = useCreateArticle();
  const { data: categories } = useCategories();
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // Transform categories for Select component
  const categoryOptions =
    categories?.data?.map((category: any) => ({
      label: category.name_ar || category.name,
      value: category.id,
    })) || [];

  const form = useForm({
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category_id: "",
      published_at: new Date().toISOString(),
      type: "article",
      video_url: "",
      featured_image: "",
      document_url: "",
      thumbnail: "",
      tags: [],
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
      <div className="text-3xl font-arabic-bold text-primary">إنشاء مقالة </div>

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
        {/* Title */}
        <form.Field name="title">
          {(field) => (
            <FormField field={field} className="flex gap-2 flex-col">
              <div className="text-2xl">عنوان المقالة</div>
              <input
                className="py-1.5 border-gray border-2 rounded-[14px] px-3 w-full"
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="أدخل عنوان المقالة"
              />
              {errors.title && (
                <div className="text-red-500 text-sm">
                  {errors.title.map((error, index) => (
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
              <div className="text-2xl">الرابط (Slug)</div>
              <input
                className="py-1.5 border-gray border-2 rounded-[14px] px-3 w-full"
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="article-slug"
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

        {/* Category */}
        <form.Field name="category_id">
          {(field) => (
            <FormField field={field} className="flex gap-2 flex-col">
              <div className="text-2xl">التصنيف</div>
              <Select
                options={categoryOptions}
                value={field.state.value}
                onChange={(value) => field.handleChange(value)}
                placeholder="اختر التصنيف"
              />
              {errors.category_id && (
                <div className="text-red-500 text-sm">
                  {errors.category_id.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
            </FormField>
          )}
        </form.Field>

        {/* Type */}
        <form.Field name="type">
          {(field) => (
            <FormField field={field} className="flex gap-2 flex-col">
              <div className="text-2xl">نوع المحتوى</div>
              <Select
                options={[
                  { label: "مقالة", value: "article" },
                  { label: "فيديو", value: "video" },
                  { label: "مستند", value: "document" },
                ]}
                value={field.state.value}
                onChange={(value) => field.handleChange(value)}
                placeholder="اختر نوع المحتوى"
              />
              {errors.type && (
                <div className="text-red-500 text-sm">
                  {errors.type.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
            </FormField>
          )}
        </form.Field>

        {/* Excerpt */}
        <form.Field name="excerpt">
          {(field) => (
            <FormField
              field={field}
              className="flex gap-2 flex-col lg:col-span-2"
            >
              <div className="text-2xl">مقتطف المقالة</div>
              <textarea
                className="py-1.5 border-gray border-2 rounded-[14px] px-3 w-full h-20"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="أدخل مقتطف قصير عن المقالة"
              />
              {errors.excerpt && (
                <div className="text-red-500 text-sm">
                  {errors.excerpt.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
            </FormField>
          )}
        </form.Field>

        {/* Content */}
        <form.Field name="content">
          {(field) => (
            <FormField
              field={field}
              className="flex gap-2 flex-col lg:col-span-2"
            >
              <div className="text-2xl">محتوى المقالة</div>
              <textarea
                className="py-1.5 border-gray border-2 rounded-[14px] px-3 w-full h-40"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="أدخل محتوى المقالة كاملاً"
              />
              {errors.content && (
                <div className="text-red-500 text-sm">
                  {errors.content.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
            </FormField>
          )}
        </form.Field>

        {/* Video URL - Show only if type is video */}
        <form.Field name="video_url">
          {(field) => (
            <FormField field={field} className="flex gap-2 flex-col">
              <div className="text-2xl">رابط الفيديو</div>
              <input
                className="py-1.5 border-gray border-2 rounded-[14px] px-3 w-full"
                type="url"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
              />
              {errors.video_url && (
                <div className="text-red-500 text-sm">
                  {errors.video_url.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
            </FormField>
          )}
        </form.Field>

        {/* Featured Image */}
        <form.Field name="featured_image">
          {(field) => (
            <FormField field={field} className="flex gap-2 flex-col">
              <div className="text-2xl">الصورة الرئيسية</div>
              <input
                className="py-1.5 border-gray border-2 rounded-[14px] px-3 w-full"
                type="url"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="رابط الصورة الرئيسية"
              />
              {errors.featured_image && (
                <div className="text-red-500 text-sm">
                  {errors.featured_image.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
            </FormField>
          )}
        </form.Field>

        {/* Published At */}
        <form.Field name="published_at">
          {(field) => (
            <FormField field={field} className="flex gap-2 flex-col">
              <div className="text-2xl">تاريخ النشر</div>
              <input
                className="py-1.5 border-gray border-2 rounded-[14px] px-3 w-full"
                type="datetime-local"
                value={field.state.value?.slice(0, 16) || ""}
                onChange={(e) =>
                  field.handleChange(new Date(e.target.value).toISOString())
                }
              />
              {errors.published_at && (
                <div className="text-red-500 text-sm">
                  {errors.published_at.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
            </FormField>
          )}
        </form.Field>

        {/* Document URL - Show only if type is document */}
        <form.Field name="document_url">
          {(field) => (
            <FormField field={field} className="flex gap-2 flex-col">
              <div className="text-2xl">رابط المستند</div>
              <input
                className="py-1.5 border-gray border-2 rounded-[14px] px-3 w-full"
                type="url"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="رابط المستند (PDF، DOC، إلخ)"
              />
              {errors.document_url && (
                <div className="text-red-500 text-sm">
                  {errors.document_url.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
            </FormField>
          )}
        </form.Field>

        {/* Display general errors */}
        {Object.keys(errors).length > 0 && (
          <div>
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
            text={isPending ? "جاري الإنشاء..." : "إنشاء المقالة"}
            className={cn("!text-2xl w-fit disabled:opacity-50")}
            disabled={isPending}
          />
        </div>
      </form>
    </div>
  );
}
