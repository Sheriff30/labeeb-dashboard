"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

type FloatLabelInputProps = {
  label: string;
  format?: string;
  formatLang?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function FloatLabelInput({
  label,
  type = "text",
  value,
  onChange,
  id,
  className,
  format,
  formatLang,
  ...props
}: FloatLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const shrinkLabel = isFocused || (value && String(value).length > 0);

  return (
    <div className={cn("relative w-full h-13", className)}>
      <div className="absolute w-full  bottom-0 ">
        <label
          htmlFor={id}
          className={`absolute -top-4  text-2xl transition-all duration-200 
          ${shrinkLabel ? "top-[-1.6875rem] text-xl text-gray" : "text-black"}`}
        >
          <span>{label} </span>
          {format && (
            <span
              className={`text-gray text-xl transition-all duration-200 ${
                shrinkLabel ? "opacity-0" : "opacity-100"
              } ${formatLang === "en" ? "font-roboto" : ""}  `}
            >
              {format}
            </span>
          )}
        </label>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={label}
          className={`block relative z-2 w-full border-b-[0.09375rem] ${
            type === "tel" && "font-english-light"
          }
          ${type === "email" && "font-roboto"}
          
          ${
            shrinkLabel ? "border-primary" : "border-gray"
          }   text-primary  placeholder-transparent focus:outline-none $  `}
          {...props}
        />{" "}
      </div>
    </div>
  );
}
