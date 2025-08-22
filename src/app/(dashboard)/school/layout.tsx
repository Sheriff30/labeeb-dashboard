import { RootSidebar } from "@/layout";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <div className="grid grid-cols-[auto_1fr] h-screen">
      <RootSidebar />
      {children}
    </div>
  );
}
