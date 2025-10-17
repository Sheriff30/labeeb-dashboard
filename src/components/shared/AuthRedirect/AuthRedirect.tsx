"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAuthPage = pathname === "/login" || pathname === "/signup";
    const isSchoolRoute = pathname.startsWith("/school");

    if (token && isAuthPage) {
      router.push("/school");
    } else if (!token && isSchoolRoute) {
      router.push("/login");
    }
  }, [pathname, router]);

  return null;
}
