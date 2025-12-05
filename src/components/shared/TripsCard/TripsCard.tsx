import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type TripsCardProps = {
  href: string;
  type: string;
  info: string;
};

export default function TripsCard({ href, type, info }: TripsCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "p-4 md:p-6 flex flex-col gap-4 text-white rounded-[18px]",
        type === "canceled" && "bg-error",
        type === "previous" && "bg-primary-green",
        type === "scheduled" && "bg-primary-blue"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="text-3xl font-arabic-bold ">
          {type === "previous"
            ? "الرحلات الموافق عليها"
            : type === "canceled"
            ? "الرحلات الملغية"
            : "الرحلات قيد المراجعة"}
        </div>
        <Image src="/images/arrow.svg" alt="arrow" width={24} height={24} />
      </div>
      <div className="text-5xl font-roboto font-bold ">{info}</div>
    </Link>
  );
}
