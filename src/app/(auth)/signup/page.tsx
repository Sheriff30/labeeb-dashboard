"use client";
import { FloatLabelInput, Select, SelectableCheckboxGroup } from "@/components";
import React, { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [category, setCategory] = useState("");
  const [schoolStage, setSchoolStage] = useState<string[]>([]);

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
      <form action="" className="flex flex-col gap-7">
        {/* School name */}
        <FloatLabelInput
          label="اسم المدرسة"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="max-w-[35.8125rem] "
        />
        {/* Selector group 1 */}
        <div className="flex gap-15 ">
          <Select
            placeholder="المدينة"
            value={city}
            onChange={(val) => setCity(val)}
            options={[
              { value: "makkah", label: "مكة المكرمة" },
              { value: "madinah", label: "المدينة المنورة" },
              { value: "riyadh", label: "الرياض" },
              { value: "jeddah", label: "جدة" },
              { value: "dammam", label: "الدمام" },
              { value: "taif", label: "الطائف" },
            ]}
            className="max-w-46.5"
          />

          <Select
            placeholder="الحي"
            value={district}
            onChange={(val) => setDistrict(val)}
            options={[
              { value: "alaziziyah", label: "العزيزية" },
              { value: "alsharafiyah", label: "الشرقية" },
              { value: "alsalam", label: "السلام" },
              { value: "alrawdah", label: "الروضة" },
              { value: "alnaseem", label: "النسيم" },
            ]}
            className="max-w-46.5"
          />

          <Select
            placeholder="الفئة"
            value={category}
            onChange={(val) => setCategory(val)}
            options={[
              { value: "boys", label: "بنين" },
              { value: "girls", label: "بنات" },
              { value: "both", label: "كلاهم" },
            ]}
            className="max-w-46.5"
          />
        </div>
        {/* School stage */}
        <SelectableCheckboxGroup
          options={[
            { value: "kindergarten", label: "رياض الأطفال" },
            { value: "primary", label: "الابتدائية" },
            { value: "middle", label: "الإعدادية" },
            { value: "secondary", label: "الثانوية" },
          ]}
          value={schoolStage}
          onChange={(val) => setSchoolStage(val)}
          label="المرحلة الدراسية"
        />
      </form>
    </div>
  );
}
