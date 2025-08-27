"use client";
import { cn } from "@/lib";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to complete before calling onClose
    setTimeout(() => {
      onClose();
    }, 300); // Match the transition duration
  };

  return (
    <div
      className={cn(
        "w-full inset-0 z-20 flex items-center justify-center p-4 lg:p-15 transition-all duration-400 ease-in-out",
        isSchoolPath ? "absolute top-0 left-0" : "fixed",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose}></div>

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
