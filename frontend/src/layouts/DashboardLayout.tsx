import React from "react";
import NavBar from "../components/NavBar";
import styles from "./DashboardLayout.module.css";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <NavBar />
      <main className={styles.container}>{children}</main>
    </>
  );
}

export default DashboardLayout;
