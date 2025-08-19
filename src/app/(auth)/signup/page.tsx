"use client";
import { FloatLabelInput } from "@/components";
import React, { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-2 ">
        <h1 className="text-6xl text-primary font-arabic-bold ">إنشاء حساب</h1>
        <p className="text-2xl text-gray">
          يرجى تعبئة البيانات لإنشاء حسابكم في المنصة
        </p>
      </div>
      {/* Form */}
      <form action="">
        <FloatLabelInput
          label="اسم المدرسة"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
    </div>
  );
}
