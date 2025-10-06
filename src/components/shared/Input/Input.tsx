import { cn } from "@/lib/utils";
import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  value?: string | number;
  textSize?: string;
};

export default function Input({
  className,
  value,
  textSize = "text-2xl",
  ...props
}: InputProps) {
  return (
    <div
      className={cn(
        "py-[10px]  border-gray border-2 rounded-[14px] px-3 w-full",
        value && "border-primary-blue text-primary-blue",
        className
      )}
    >
      <input
        {...props}
        className={cn(
          textSize,
          "placeholder:font-arabic-light w-full  outline-none"
        )}
      />
    </div>
  );
}
