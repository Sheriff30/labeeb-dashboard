import React from "react";
import type { AnyFieldApi } from "@tanstack/react-form";

export default function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.errors && (
        <span className="text-error text-sm">
          {field.state.meta.errors[0]
            ?.split(/(05XXXXXXXX|\+9665XXXXXXXX)/)
            .map((part: string, i: number) =>
              part === "05XXXXXXXX" || part === "+9665XXXXXXXX" ? (
                <span key={i} className="font-mono text-red-600 " dir="ltr">
                  {part}
                </span>
              ) : (
                part
              )
            )}
        </span>
      )}
    </>
  );
}
