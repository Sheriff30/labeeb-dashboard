import { cn } from "@/lib";
import React from "react";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  variant: "primary" | "secondary" | "tertiary";
  text: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  type,
  variant = "primary",
  text,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "py-1 px-6 transition-all duration-200 cursor-pointer",
        className,
        variant === "primary" &&
          "text-[32px] text-white bg-primary  rounded-lg ",
        variant === "secondary" && "",
        variant === "tertiary" &&
          "text-navy border-navy border-[1.5px] rounded-[14px] text-2xl disabled:border-gray disabled:text-gray disabled:cursor-not-allowed"
      )}
      {...props}
    >
      {text}
    </button>
  );
}
