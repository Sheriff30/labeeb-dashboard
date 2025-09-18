import { Currency } from "@/components";
import { cn } from "@/lib";
import React from "react";

type InvoiceInputProps = {
  title: string;
  currency?: boolean;
  total?: boolean;
  value: string | number;
};

export default function InvoiceInput({
  title,
  currency,
  total,
  value,
}: InvoiceInputProps) {
  return (
    <div
      className={cn(
        total && "text-primary-blue mt-4",
        "flex  gap-10 items-center "
      )}
    >
      <div className={cn(total && "!text-2xl font-arabic-bold", " text-xl")}>
        {title}
      </div>
      <div className="flex gap-2.5 text-xl items-center">
        <span className={cn(total && "font-bold", "font-roboto  text-2xl")}>
          {value}
        </span>
        {currency ? (
          <Currency className="w-[30px] h-[30px]" />
        ) : (
          <div>طالب</div>
        )}
      </div>
    </div>
  );
}
