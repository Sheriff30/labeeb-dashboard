"use client";
import { cn } from "@/lib";
import { usePathname } from "next/navigation";
import React from "react";

export default function ModalWrapper({
  children,
  onClose,
  className,
}: {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}) {
  const pathname = usePathname();
  const isSchoolPath = pathname?.includes("school");
  return (
    <div
      className={cn(
        " w-full inset-0 z-50 flex items-center justify-center p-4",
        isSchoolPath ? "absolute top-0 left-0" : "fixed"
      )}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* Modal Content */}
      <div
        className={cn(
          className,
          "relative z-10 bg-white p-6 rounded-lg shadow-lg flex gap-3 flex-col max-w-125 w-full  justify-center  items-center"
        )}
      >
        {children}
      </div>
    </div>
  );
}
