import React from "react";
import type { AnyFieldApi } from "@tanstack/react-form";

export default function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.errors && (
        <span className="text-error text-sm">{field.state.meta.errors}</span>
      )}
    </>
  );
}
