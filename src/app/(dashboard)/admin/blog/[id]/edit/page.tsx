/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, FormField, Select } from "@/components";
import { Loading } from "@/components/shared/Loading";
import { useArticles, useCategories, useUpdateArticle } from "@/hooks/Content";
import { cn } from "@/lib";
import { useForm } from "@tanstack/react-form";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();
  const articleId = params?.id as string;

  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // Fetch single article data (we'll need to add this hook)
  const { data: articlesData, isLoading: articlesLoading } = useArticles(
    1,
    100
  ); // Get all articles to find the one we need
  const { data: categories } = useCategories();
  const { mutate: updateArticle, isPending } = useUpdateArticle(articleId);

  // Find the current article from the articles list
  const article = articlesData?.data?.find((a: any) => a.id === articleId);

  // Transform categories for Select component
  const categoryOptions =
    categories?.data?.map((category: any) => ({
      label: category.name_ar || category.name,
      value: category.id,
    })) || [];

  const form = useForm({
    defaultValues: {
      title: "",
      title_ar: "",
      slug: "",
      excerpt: "",
      excerpt_ar: "",
      content: "",
      content_ar: "",
      category_id: "",
      published_at: "",
      type: "article",
      video_url: "",
      featured_image: "",
      document_url: "",
      thumbnail: "",
      is_featured: false,
      is_active: true,
    },

    onSubmit: ({ value }) => {
      setErrors({});

      updateArticle(
        { ...value },
        {
          onSuccess: () => {
            console.log("Article updated successfully!");
            router.push("/admin/blog");
          },
          onError: (err: unknown) => {
            // Handle validation errors from API
            const error = err as any;
            if (error.response?.data?.errors) {
              setErrors(error.response.data.errors);
            } else if (error.response?.data) {
              setErrors(error.response.data);
            } else {
              setErrors({
                general: [error.message || "حدث خطأ أثناء تحديث المقالة"],
              });
            }
          },
        }
      );
    },
  });

  // Populate form when article data loads
  useEffect(() => {
    if (article) {
      console.log(
        "Article is_active value:",
        article.is_active,
        "Type:",
        typeof article.is_active
      );
      form.setFieldValue("title", article.title || "");
      form.setFieldValue("title_ar", article.title_ar || "");
      form.setFieldValue("slug", article.slug || "");
      form.setFieldValue("excerpt", article.excerpt || "");
      form.setFieldValue("excerpt_ar", article.excerpt_ar || "");
      form.setFieldValue("content", article.content || "");
      form.setFieldValue("content_ar", article.content_ar || "");
      form.setFieldValue("category_id", article.category_id || "");
      form.setFieldValue("type", article.type || "article");
      form.setFieldValue("video_url", article.video_url || "");
      form.setFieldValue("featured_image", article.featured_image || "");
      form.setFieldValue("document_url", article.document_url || "");
      form.setFieldValue("thumbnail", article.thumbnail || "");
      form.setFieldValue("is_featured", article.is_featured || false);
      // Handle is_active properly - convert string/number to boolean
      const isActive =
        article.is_active === true ||
        article.is_active === 1 ||
        article.is_active === "1" ||
        article.is_active === "true";
      console.log("Converted is_active to:", isActive);
      form.setFieldValue("is_active", isActive);
      form.setFieldValue(
        "published_at",
        article.published_at ? new Date(article.published_at).toISOString() : ""
      );
    }
  }, [article, form]);

  if (articlesLoading) {
    return <Loading />;
  }

  if (!article) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl text-red-600">المقالة غير موجودة</h2>
        <button
          onClick={() => router.push("/admin/blog")}
          className="mt-4 text-primary-blue hover:underline"
        >
          العودة إلى المدونة
        </button>
      </div>
    );
  }

  return (
    <div className=" overflow-auto h-full no-scrollbar  to-white">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200 mb-8">
        <div className=" px-6 py-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h1 className="text-4xl font-arabic-bold text-primary mb-2">
                تعديل المقالة
              </h1>
              <p className="text-lg text-gray-600 font-arabic-medium">
                {article.title}
              </p>
            </div>
            <button
              onClick={() => router.push("/admin/blog")}
              className="flex items-center gap-2 text-primary-blue transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              العودة إلى المدونة
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className=" pb-12">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="xl:col-span-2 ">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-8">
                <form
                  className="space-y-8"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const isValid = await form.validateAllFields("submit");
                    if (isValid) {
                      form.handleSubmit();
                    }
                  }}
                >
                  {/* Basic Information Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-arabic-bold text-primary">
                        المعلومات الأساسية
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Title */}
                      <form.Field name="title">
                        {(field) => (
                          <FormField
                            field={field}
                            className="flex gap-3 flex-col"
                          >
                            <label className="text-lg font-arabic-medium text-gray-700">
                              عنوان المقالة{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              className="py-3 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                              type="text"
                              value={field.state.value}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              placeholder="أدخل عنوان المقالة"
                            />
                            {errors.title && (
                              <div className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">
                                {errors.title.map((error, index) => (
                                  <div key={index}>{error}</div>
                                ))}
                              </div>
                            )}
                          </FormField>
                        )}
                      </form.Field>

                      {/* Title Arabic */}
                      <form.Field name="title_ar">
                        {(field) => (
                          <FormField
                            field={field}
                            className="flex gap-3 flex-col"
                          >
                            <label className="text-lg font-arabic-medium text-gray-700">
                              عنوان المقالة بالعربية
                            </label>
                            <input
                              className="py-3 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                              type="text"
                              value={field.state.value}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              placeholder="أدخل عنوان المقالة بالعربية"
                            />
                            {errors.title_ar && (
                              <div className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">
                                {errors.title_ar.map((error, index) => (
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
                          <FormField
                            field={field}
                            className="flex gap-3 flex-col"
                          >
                            <label className="text-lg font-arabic-medium text-gray-700">
                              الرابط (Slug){" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              className="py-3 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white font-mono"
                              type="text"
                              value={field.state.value}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              placeholder="article-slug"
                            />
                            {errors.slug && (
                              <div className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">
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
                          <FormField
                            field={field}
                            className="flex gap-3 flex-col"
                          >
                            <label className="text-lg font-arabic-medium text-gray-700">
                              التصنيف <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <Select
                                options={categoryOptions}
                                value={field.state.value}
                                onChange={(value) => field.handleChange(value)}
                                placeholder="اختر التصنيف"
                              />
                            </div>
                            {errors.category_id && (
                              <div className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">
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
                          <FormField
                            field={field}
                            className="flex gap-3 flex-col"
                          >
                            <label className="text-lg font-arabic-medium text-gray-700">
                              نوع المحتوى
                            </label>
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
                              <div className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">
                                {errors.type.map((error, index) => (
                                  <div key={index}>{error}</div>
                                ))}
                              </div>
                            )}
                          </FormField>
                        )}
                      </form.Field>

                      {/* Active Status */}
                      <form.Field name="is_active">
                        {(field) => (
                          <FormField
                            field={field}
                            className="flex gap-3 flex-col"
                          >
                            <label className="text-lg font-arabic-medium text-gray-700">
                              حالة المقالة
                            </label>
                            <Select
                              options={[
                                { label: "نشط", value: "true" },
                                { label: "غير نشط", value: "false" },
                              ]}
                              value={field.state.value.toString()}
                              onChange={(value) =>
                                field.handleChange(value === "true")
                              }
                              placeholder="اختر حالة المقالة"
                            />
                            {errors.is_active && (
                              <div className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">
                                {errors.is_active.map((error, index) => (
                                  <div key={index}>{error}</div>
                                ))}
                              </div>
                            )}
                          </FormField>
                        )}
                      </form.Field>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-arabic-bold text-primary">
                        المحتوى
                      </h2>
                    </div>

                    {/* Excerpt */}
                    <form.Field name="excerpt">
                      {(field) => (
                        <FormField
                          field={field}
                          className="flex gap-3 flex-col"
                        >
                          <label className="text-lg font-arabic-medium text-gray-700">
                            مقتطف المقالة
                          </label>
                          <textarea
                            className="py-3 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white resize-none"
                            rows={3}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="أدخل مقتطف قصير عن المقالة"
                          />
                          {errors.excerpt && (
                            <div className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">
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
                          className="flex gap-3 flex-col"
                        >
                          <label className="text-lg font-arabic-medium text-gray-700">
                            محتوى المقالة{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            className="py-3 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white resize-none"
                            rows={8}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="أدخل محتوى المقالة كاملاً"
                          />
                          {errors.content && (
                            <div className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">
                              {errors.content.map((error, index) => (
                                <div key={index}>{error}</div>
                              ))}
                            </div>
                          )}
                        </FormField>
                      )}
                    </form.Field>
                  </div>

                  {/* Media Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-arabic-bold text-primary">
                        الوسائط
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Featured Image */}
                      <form.Field name="featured_image">
                        {(field) => (
                          <FormField
                            field={field}
                            className="flex gap-3 flex-col"
                          >
                            <label className="text-lg font-arabic-medium text-gray-700">
                              الصورة الرئيسية
                            </label>
                            <input
                              className="py-3 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                              type="url"
                              value={field.state.value}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              placeholder="رابط الصورة الرئيسية"
                            />
                            {errors.featured_image && (
                              <div className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">
                                {errors.featured_image.map((error, index) => (
                                  <div key={index}>{error}</div>
                                ))}
                              </div>
                            )}
                          </FormField>
                        )}
                      </form.Field>

                      {/* Video URL */}
                      <form.Field name="video_url">
                        {(field) => (
                          <FormField
                            field={field}
                            className="flex gap-3 flex-col"
                          >
                            <label className="text-lg font-arabic-medium text-gray-700">
                              رابط الفيديو
                            </label>
                            <input
                              className="py-3 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                              type="url"
                              value={field.state.value}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              placeholder="https://youtube.com/watch?v=..."
                            />
                            {errors.video_url && (
                              <div className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">
                                {errors.video_url.map((error, index) => (
                                  <div key={index}>{error}</div>
                                ))}
                              </div>
                            )}
                          </FormField>
                        )}
                      </form.Field>
                    </div>
                  </div>

                  {/* Display general errors */}
                  {Object.keys(errors).length > 0 && (
                    <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
                      <div className="flex items-center gap-2 mb-4">
                        <svg
                          className="w-5 h-5 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <h3 className="text-red-800 font-arabic-bold text-lg">
                          أخطاء التحقق
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {Object.entries(errors).map(([field, fieldErrors]) => (
                          <div key={field} className="text-sm">
                            <strong className="text-red-700 font-arabic-medium">
                              {field}:
                            </strong>
                            <ul className="list-disc list-inside text-red-600 mr-4">
                              {fieldErrors.map((error, index) => (
                                <li key={index}>{error}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => router.push("/admin/blog")}
                      className="px-6 py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-arabic-medium"
                    >
                      إلغاء
                    </button>
                    <Button
                      type="submit"
                      text={isPending ? "جاري التحديث..." : "تحديث المقالة"}
                      className={cn("!text-xl px-8 py-3 disabled:opacity-50")}
                      disabled={isPending}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Article Preview Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-arabic-bold text-gray-900 mb-4">
                    معاينة المقالة
                  </h3>

                  {/* Featured Image Preview */}
                  <form.Subscribe
                    selector={(state) => state.values.featured_image}
                  >
                    {(featuredImage) => (
                      <div className="mb-4">
                        {featuredImage ? (
                          <div className="relative">
                            <Image
                              src={featuredImage}
                              alt="معاينة الصورة"
                              width={300}
                              height={200}
                              className="w-full h-48 object-cover rounded-xl"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                            <div className="text-center">
                              <svg
                                className="w-12 h-12 text-gray-400 mx-auto mb-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <p className="text-gray-500 font-arabic-medium">
                                لا توجد صورة
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </form.Subscribe>

                  {/* Article Info */}
                  <div className="space-y-3">
                    <form.Subscribe selector={(state) => state.values.title}>
                      {(title) => (
                        <h4 className="text-lg font-arabic-bold text-gray-900 line-clamp-2">
                          {title || "عنوان المقالة"}
                        </h4>
                      )}
                    </form.Subscribe>

                    <form.Subscribe selector={(state) => state.values.excerpt}>
                      {(excerpt) => (
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {excerpt || "مقتطف المقالة..."}
                        </p>
                      )}
                    </form.Subscribe>

                    <div className="flex items-center gap-2 text-sm">
                      <form.Subscribe
                        selector={(state) => state.values.is_active}
                      >
                        {(isActive) => (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-arabic-medium ${
                              isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {isActive ? "نشط" : "غير نشط"}
                          </span>
                        )}
                      </form.Subscribe>

                      <form.Subscribe selector={(state) => state.values.type}>
                        {(type) => (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-arabic-medium">
                            {type === "article"
                              ? "مقالة"
                              : type === "video"
                              ? "فيديو"
                              : "مستند"}
                          </span>
                        )}
                      </form.Subscribe>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-arabic-bold text-gray-900 mb-4">
                  إحصائيات سريعة
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-arabic-medium">
                      تاريخ الإنشاء:
                    </span>
                    <span className="text-gray-900 font-arabic-medium text-sm">
                      {new Date(article.created_at).toLocaleDateString("ar")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-arabic-medium">
                      آخر تحديث:
                    </span>
                    <span className="text-gray-900 font-arabic-medium text-sm">
                      {new Date(article.updated_at).toLocaleDateString("ar")}
                    </span>
                  </div>
                  <form.Subscribe selector={(state) => state.values.content}>
                    {(content) => (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-arabic-medium">
                          عدد الكلمات:
                        </span>
                        <span className="text-gray-900 font-arabic-medium">
                          {content ? content.split(" ").length : 0}
                        </span>
                      </div>
                    )}
                  </form.Subscribe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
