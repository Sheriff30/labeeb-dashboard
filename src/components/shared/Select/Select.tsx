"use client";

import { cn } from "@/lib";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  variant?: "primary" | "secondary";
  optional?: boolean;
};
export default function Select({
  options,
  value,
  onChange,
  placeholder,
  optional,
  className,
  variant = "primary",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const SELECT_REF = useRef<HTMLDivElement>(null);
  const SELECTED = options.find((o) => o.value === value)?.label;

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        SELECT_REF.current &&
        !SELECT_REF.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={SELECT_REF} className={cn("relative w-full  ", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "text-2xl w-full flex items-center justify-between cursor-pointer text-gray",

          variant === "secondary" && "border-b-gray",
          isOpen || SELECTED ? "border-b-primary" : "border-b-gray",
          variant === "primary" && " py-2 border-b   ",
          SELECTED && variant === "primary" && "text-primary border-b-primary",
          SELECTED &&
            variant === "secondary" &&
            "text-primary-blue !font-arabic-medium !border-primary-blue",
          variant === "secondary" &&
            "border-b-gray py-[10px] px-3 border-2 border-gray rounded-[14px] font-arabic-light "
        )}
      >
        <div className="flex items-center gap-2 w-full">
          <div>{SELECTED || placeholder}</div>

          {!SELECTED && optional && (
            <div className="text-gray"> ( إختياري )</div>
          )}
        </div>

        <Image
          src="/images/select-arrow.svg"
          alt="select-arrow"
          width={24}
          height={24}
          className={`inline-block transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {isOpen && (
        <ul className="absolute top-full w-full cursor-pointer z-5">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="h-8.5 text-2xl flex items-center px-3 bg-primary-blue-2 hover:bg-primary-blue hover:text-white"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
