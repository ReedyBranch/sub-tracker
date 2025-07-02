import React from "react";
import NavBar from "../components/NavBar";
import "../App.css"; // Make sure glow styles are here

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="global-bg text-white">
      <NavBar />
      <div className="glow-bg"></div>
      <div className="glow-bg glow-bg-2"></div>
      <main className="main-content px-3 py-5">{children}</main>
    </div>
  );
}

export default DashboardLayout;
