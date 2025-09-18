import React from "react";

type SummaryInputProps = {
  title: string;
  children: React.ReactNode;
};

export default function SummaryInput({ title, children }: SummaryInputProps) {
  return (
    <div className="text-2xl">
      <div className="text-2xl mb-1">{title}</div>
      <div className="border border-primary-blue py-2 px-4 text-primary-blue rounded-xl  w-full">
        {children}
      </div>
    </div>
  );
}
