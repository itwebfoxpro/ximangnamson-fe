import DashboardHistory from "./DashboardHistory";
import Sidebar from "@/components/Dashboard/Sidebar";
import styles from "./history.module.scss"
export default function DashboardPage() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.container}>
        <DashboardHistory />
      </main>
    </div>
  );
}
