import { RootSidebar } from "@/layout";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <div className="grid grid-cols-[auto_1fr] h-screen bg-primary-2">
      <RootSidebar />
      <div className="py-8 px-20 rounded-tr-[60px] rounded-br-[60px] bg-white">
        {children}
      </div>
    </div>
  );
}
