import { Button } from "@/components";
import { cn } from "@/lib";
import React from "react";

export default function Tabs({
  title,
  activeTab,
  onTabChange,
  buttonText,
  buttonText2,
}: {
  title: string;
  activeTab: boolean; // true for first tab, false for second tab
  onTabChange: (isPaid: boolean) => void;
  buttonText: string;
  buttonText2: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex gap-4 lg:gap-10 lg:items-center  lg:flex-row flex-col">
        <div className="text-3xl text-navy font-arabic-bold">{title}</div>
        <Button
          onClick={() => onTabChange(true)}
          text={buttonText}
          className={cn(
            "!px-15 !rounded-xl",
            activeTab === true
              ? "!text-white !bg-navy border-2 !border-navy !text-2xl"
              : "!text-navy !bg-white border-2 !border-navy !text-2xl"
          )}
        />
        <Button
          onClick={() => onTabChange(false)}
          text={buttonText2}
          className={cn(
            "!px-15 !rounded-xl",
            activeTab === false
              ? "!text-white !bg-navy border-2 !border-navy !text-2xl"
              : "!text-navy !bg-white border-2 !border-navy !text-2xl"
          )}
        />
      </div>
    </div>
  );
}
