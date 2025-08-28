"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib";
import {
  CancelledTripts,
  Home,
  PreviousTripts,
  ScheduledTripts,
  School,
  SubAdmin,
  Trips,
  Notifications,
  Support,
  Phone,
  Message,
} from "@/components/shared";
import WhatsApp from "@/components/shared/Icons/WhatsApp";

const SIDEBAR_ITEMS = [
  {
    label: "الصفحة الرئيسية",
    icon: Home,
    href: "/school",
  },
  {
    label: "الرحلات",
    icon: Trips,
    links: [
      {
        label: "الرحلات المكتملة",
        icon: PreviousTripts,
        href: "/school/trips/completed",
      },
      {
        label: "الرحلات المجدولة",
        icon: ScheduledTripts,
        href: "/school/trips/scheduled",
      },
      {
        label: "الرحلات الملغية",
        icon: CancelledTripts,
        href: "/school/trips/canceled",
      },
    ],
  },
  {
    label: "بيانات المدرسة",
    icon: School,
    href: "/school/account",
  },
  {
    label: "إضافة مشرف فرعي",
    icon: SubAdmin,
    href: "/school/sub-admin",
  },
  {
    label: "الإشعارات",
    icon: Notifications,
    href: "/school/notifications",
  },
  {
    label: "الدعم الفنى",
    icon: Support,
    links: [
      {
        label: "رساله  عبر الموقع",
        icon: Message,
        href: "/school/support",
      },
      {
        label: "مكالمة هاتفية",
        icon: Phone,
        href: "tel:+966555555555",
      },
      {
        label: "تواصل عبر  واتس اب",
        icon: WhatsApp,
        href: "https://wa.me/966555555555",
      },
    ],
  },
];

type RootSidebarProps = {
  setSidebarOpen: (open: boolean) => void;
  sidebarOpen: boolean;
};

export default function RootSidebar({
  setSidebarOpen,
  sidebarOpen,
}: RootSidebarProps) {
  const [isOpen, setIsOpen] = useState("");

  const pathname = usePathname();
  return (
    <div
      className={cn(
        sidebarOpen ? "!flex" : "hidden",
        "xl:bg-primary-2 bg-primary-2/50 backdrop-blur-3xl xl:backdrop-blur-none w-70 xl:w-89 h-full px-6 py-4 hidden xl:flex  flex-col gap-4 xl:gap-8 fixed  xl:relative top-0 righ-0 z-30"
      )}
    >
      <Image
        src="/images/close.svg"
        width={30}
        height={30}
        alt="close icon"
        className="xl:hidden mr-auto"
        onClick={() => setSidebarOpen(false)}
      />

      <Image
        src="/images/logo.svg"
        alt="logo"
        width={188}
        height={73}
        className="mx-auto  hidden xl:block"
      />
      <div className="text-center">
        <div className="text-primary-3 text-3xl xl:text-[2.5rem] font-arabic-bold truncate ">
          مدرسة رياض نجد
        </div>
        <div className="text-gray text-lg xl:text-2xl font-roboto  ">
          m29026753@gmail.com
        </div>
      </div>

      <div>
        {SIDEBAR_ITEMS.map((item) => {
          const isLink = Boolean(item.href);

          if (isLink) {
            return (
              <Link
                key={item.label}
                href={item.href as string}
                className={cn(
                  "flex items-center gap-2 text-2xl py-2 text-gray ",
                  pathname === item.href && "text-primary-3"
                )}
              >
                {item.icon && <item.icon />}
                <span>{item.label}</span>
              </Link>
            );
          }
          return (
            <div
              key={item.label}
              className="flex  gap-2 text-2xl py-2 text-gray flex-col"
            >
              <div
                className={cn(
                  "flex items-center gap-2 cursor-pointer",
                  isOpen === item.label && "text-primary-3",
                  item.links &&
                    item.links.some((link) => link.href === pathname) &&
                    "text-primary-3"
                )}
                onClick={() =>
                  setIsOpen((prev) => (prev === item.label ? "" : item.label))
                }
              >
                {item.icon && <item.icon />}
                <div>{item.label}</div>
              </div>

              <div
                className={cn(
                  "hidden flex-col gap-2 cursor-pointer",
                  isOpen === item.label && "flex"
                )}
              >
                {item.links?.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-2 text-2xl py-2 text-gray",
                      pathname === link.href && "text-primary-3"
                    )}
                  >
                    {link.icon && <link.icon />}
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
