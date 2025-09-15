"use client";
import { ModalRenderer } from "@/components";
import { ModalProvider } from "@/Context";
import { RootSidebar } from "@/layout";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 grid-rows-[70px_1fr] xl:grid-rows-none xl:grid-cols-[auto_1fr] xl:h-screen bg-primary-2  ">
      <RootSidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

      <div className="flex justify-between items-center p-4 xl:hidden">
        <div onClick={() => setSidebarOpen(!sidebarOpen)}>
          {" "}
          <Image src="/images/menu.svg" height={30} width={30} alt="logo" />
        </div>
        <Image src="/images/logo.svg" height={100} width={120} alt="logo" />
      </div>
      <div className="relative overflow-auto bg-primary-2">
        <div className="xl:h-screen py-4 lg:py-8  px-4 lg:px-10  xl:rounded-tr-[60px] xl:rounded-br-[60px] bg-white  ">
          <ModalProvider>
            {children}
            <ModalRenderer />
          </ModalProvider>{" "}
        </div>{" "}
      </div>
    </div>
  );
}
