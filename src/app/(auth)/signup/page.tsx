"use client";
import { FloatLabelInput } from "@/components";
import React, { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  return (
    <div>
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-6xl text-primary font-arabic-bold ">إنشاء حساب</h1>
        <p className="text-2xl text-gray">
          يرجى تعبئة البيانات لإنشاء حسابكم في المنصة
        </p>
      </div>
      <FloatLabelInput
        label="اسم المدرسة"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}
