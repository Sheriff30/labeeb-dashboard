"use client";
import { Loading } from "@/components/shared/Loading";
import Pagination from "@/components/shared/Pagination/Pagination";
import { useModal } from "@/Context/ModalContext";
import { useArticles, useDeleteArticle } from "@/hooks/Content";
import { CirclePlus, Eye, Trash2, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface Article {
  id: string;
  title: string;
  title_ar: string | null;
  slug: string;
  excerpt: string;
  excerpt_ar: string | null;
  content: string;
  content_ar: string | null;
  type: "article" | "video" | "document";
  video_url: string | null;
  document_url: string | null;
  featured_image: string | null;
  thumbnail: string | null;
  tags: string[];
  is_featured: boolean;
  is_active: boolean;
  views_count: number;
  sort_order: number;
  published_at: string;
  category_id: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
  category: {
    id: string;
    name: string;
    name_ar: string | null;
    slug: string;
    description: string | null;
    description_ar: string | null;
    icon: string | null;
    color: string | null;
    is_active: boolean;
    sort_order: number;
    created_by: string;
    updated_by: string;
    created_at: string;
    updated_at: string;
  };
}

export default function Page() {
  const [page, setPage] = useState(1);
  const { openModal, closeModal } = useModal();
  const per_page = 10;

  const { data, isFetching, isError, isLoading } = useArticles(
    page,
    per_page,
    "",
    ""
  );
  const { mutate: deleteArticle } = useDeleteArticle();

  const lastPage = data?.last_page || 1;

  // Handle delete with confirmation modal
  const handleDelete = (id: string, title: string) => {
    openModal("CONFIRM", {
      title: "تأكيد الحذف",
      titleColor: "text-red-500",
      message: `هل أنت متأكد من حذف المقالة "${title}"؟ لا يمكن التراجع عن هذا الإجراء.`,
      buttonText: "حذف",
      buttonClassName: "bg-red-500 hover:bg-red-600",
      onConfirm: () => {
        deleteArticle(id, {
          onSuccess: () => {
            closeModal();
            // Show success message
            openModal("CONFIRM", {
              title: "تم الحذف بنجاح",
              titleColor: "text-green-500",
              message: "تم حذف المقالة بنجاح",
              buttonText: "موافق",
              onConfirm: () => closeModal(),
            });
          },
          onError: () => {
            closeModal();
            // Show error message
            openModal("CONFIRM", {
              title: "خطأ في الحذف",
              titleColor: "text-red-500",
              message: "حدث خطأ أثناء حذف المقالة. يرجى المحاولة مرة أخرى.",
              buttonText: "موافق",
              onConfirm: () => closeModal(),
            });
          },
        });
      },
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="text-center text-2xl">حدث خطأ في تحميل المقالات</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-primary">المدونة</h1>
        <div className="flex gap-4">
          <Link
            href="/admin/blog/create"
            className="flex gap-2 text-primary-blue text-xl items-center"
          >
            <div>إنشاء مقالة</div> <CirclePlus />
          </Link>
        </div>
      </div>

      {/* Articles Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[1200px] bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-50">
            <tr className="text-right">
              <th className="px-6 py-4 text-2xl font-arabic-medium text-gray-900">
                الصورة
              </th>
              <th className="px-6 py-4 text-2xl font-arabic-medium text-gray-900">
                العنوان
              </th>
              <th className="px-6 py-4 text-2xl font-arabic-medium text-gray-900">
                التصنيف
              </th>
              <th className="px-6 py-4 text-2xl font-arabic-medium text-gray-900">
                النوع
              </th>
              <th className="px-6 py-4 text-2xl font-arabic-medium text-gray-900">
                المشاهدات
              </th>
              <th className="px-6 py-4 text-2xl font-arabic-medium text-gray-900">
                تاريخ النشر
              </th>
              <th className="px-6 py-4 text-2xl font-arabic-medium text-gray-900">
                الحالة
              </th>
              <th className="px-6 py-4 text-2xl font-arabic-medium text-gray-900">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.data?.map((article: Article) => (
              <tr key={article.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="h-16 w-16 rounded-lg overflow-hidden">
                    {article.featured_image ? (
                      <Image
                        src={article.featured_image}
                        alt={article.title}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">
                          لا توجد صورة
                        </span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xl font-arabic-medium text-gray-900">
                    {article.title}
                  </div>
                  <div className="text-lg text-gray-500 mt-1 line-clamp-2">
                    {article.excerpt}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-arabic-medium bg-blue-100 text-blue-800">
                    {article.category?.name ||
                      article.category?.name_ar ||
                      "غير محدد"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-arabic-medium ${
                      article.type === "article"
                        ? "bg-green-100 text-green-800"
                        : article.type === "video"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {article.type === "article"
                      ? "مقالة"
                      : article.type === "video"
                      ? "فيديو"
                      : "مستند"}
                  </span>
                </td>
                <td className="px-6 py-4 text-xl text-gray-900">
                  {article.views_count}
                </td>
                <td className="px-6 py-4 text-xl text-gray-900">
                  {new Date(article.published_at).toLocaleDateString("en-GB")}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-arabic-medium ${
                      article.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {article.is_active ? "نشط" : "غير نشط"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3 items-center">
                    <button
                      onClick={() => handleDelete(article.id, article.title)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="حذف"
                    >
                      <Trash2 size={20} />
                    </button>
                    <Link
                      href={`/admin/blog/${article.id}/edit`}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="تعديل"
                    >
                      <Edit size={20} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data?.data?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-2xl text-gray-500">لا توجد مقالات</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {data?.data?.length > 0 && (
        <Pagination
          page={page}
          setPage={setPage}
          lastPage={lastPage}
          isFetching={isFetching}
        />
      )}
    </div>
  );
}
