"use client";

import Sidebar from "@/components/Dashboard/Sidebar";
import BottomBar from "@/components/Dashboard/BottomBar/BottomBar";
import { useIsMobile } from "@/hooks/useIsMobile";
import styles from "./layout.module.scss";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  return (
    <div key={user?.username || "guest"} className={styles.layoutDasboard}>
      {isMobile ? <BottomBar /> : <Sidebar />}
      <main className={styles.container}>{children}</main>
    </div>
  );
}
