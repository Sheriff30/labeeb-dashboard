import { ModalRenderer } from "@/components";
import { ModalProvider } from "@/Context";
import { RootSidebar } from "@/layout";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <div className="grid grid-cols-[auto_1fr] h-screen bg-primary-2 ">
      <RootSidebar />
      <div className="h-screen pt-8 overflow-y-auto  px-20 rounded-tr-[60px] rounded-br-[60px] bg-white relative">
        <ModalProvider>
          {children}
          <ModalRenderer />
        </ModalProvider>{" "}
      </div>
    </div>
  );
}
