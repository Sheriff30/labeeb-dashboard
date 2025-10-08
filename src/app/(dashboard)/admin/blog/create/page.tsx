"use client";

import CreateArticle from "../createArticle/CreateArticle";
import CreateCategory from "../createCategory/CreateCategory";

export default function Page() {
  return (
    <div className="flex flex-col gap-10 overflow-y-auto h-full no-scrollbar">
      <CreateCategory />
      <CreateArticle />
    </div>
  );
}
