import React from "react";

export default function Pagination({
  page,
  setPage,
  lastPage,
  isFetching,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  lastPage: number;
  isFetching: boolean;
}) {
  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1 || isFetching}
        className="px-4 py-2 rounded-lg bg-primary text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-primary transition cursor-pointer"
      >
        السابق
      </button>

      <span className="text-gray-700 font-medium">
        الصفحة {page} من {lastPage}
      </span>

      <button
        onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
        disabled={page === lastPage || isFetching}
        className="px-4 py-2 rounded-lg bg-primary text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-primary transition cursor-pointer"
      >
        التالي
      </button>
    </div>
  );
}
