"use client";
import React from "react";
import { FieldInfo } from "../FieldInfo";
import { AnyFieldApi } from "@tanstack/react-form";

type FormFieldProps = {
  field: AnyFieldApi;
  children: React.ReactNode;
  className?: string;
};

export default function FormField({
  field,
  children,
  className = "flex flex-col gap-1 w-full",
}: FormFieldProps) {
  return (
    <div className={className}>
      {children}
      <FieldInfo field={field} />
    </div>
  );
}
