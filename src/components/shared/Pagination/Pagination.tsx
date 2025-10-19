import React from "react";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  total: number;
  from: number;
  to: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  lastPage,
  total,
  from,
  to,
  hasNextPage,
  hasPrevPage,
  onNextPage,
  onPrevPage,
  className = "",
}: PaginationProps) {
  // Don't render if there's only one page or no data
  if (lastPage <= 1 || total === 0) {
    return null;
  }

  return (
    <div className={`flex  justify-between gap-4 ${className}`}>
      {/* Page Info */}
      <div className="text-center text-gray-600 text-sm">
        عرض {from} إلى {to} من {total} نتيجة
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4">
        {/* Previous Button */}
        <button
          onClick={onPrevPage}
          disabled={!hasPrevPage}
          className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          السابق
        </button>

        {/* Page Number */}
        <span className="px-4 py-2 text-sm font-medium text-gray-700">
          صفحة {currentPage} من {lastPage}
        </span>

        {/* Next Button */}
        <button
          onClick={onNextPage}
          disabled={!hasNextPage}
          className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          التالي
        </button>
      </div>
    </div>
  );
}
