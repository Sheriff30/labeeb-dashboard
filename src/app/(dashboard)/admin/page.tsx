"use client";
import { useAuth } from "@/Context/UserContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (user?.role === "school") {
      router.replace("/admin");
    }
  }, [user, isAuthenticated, router]);

  return <div>ADMIN DASHBOARD</div>;
}
