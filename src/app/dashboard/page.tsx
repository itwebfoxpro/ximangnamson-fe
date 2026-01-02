"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/account");
      return;
    }

    if (!loading && user) {
      router.replace("/dashboard/history");
    }
  }, [user, loading, router]);

  return null;
}
