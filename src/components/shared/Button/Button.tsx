import { cn } from "@/lib";
import React from "react";
import Link from "next/link";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "tertiary";
  text: string;
  href?: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  type = "button",
  variant = "primary",
  text,
  className,
  href,
  ...props
}: ButtonProps) {
  const buttonClasses = cn(
    "py-1 px-6 transition-all duration-200 cursor-pointer",
    className,
    variant === "primary" && "text-[32px] text-white bg-primary  rounded-lg ",
    variant === "secondary" &&
      "border-2 border-primary rounded-lg text-3xl text-primary",
    variant === "tertiary" &&
      "text-navy border-navy border-[1.5px] rounded-[14px] text-2xl disabled:border-gray disabled:text-gray disabled:cursor-not-allowed"
  );

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {text}
      </Link>
    );
  }

  return (
    <button type={type} className={buttonClasses} {...props}>
      {text}
    </button>
  );
}
