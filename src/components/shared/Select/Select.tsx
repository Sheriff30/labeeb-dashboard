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
};
export default function Select({
  options,
  value,
  onChange,
  placeholder,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
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
    <div ref={selectRef} className={cn("relative w-full  ", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-2xl border-b py-2 border-gray w-full flex items-center justify-between cursor-pointer"
      >
        {options.find((o) => o.value === value)?.label || placeholder}

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
        <ul className="absolute top-full w-full cursor-pointer">
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
