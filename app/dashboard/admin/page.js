import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/footer";
import AdminTable from "@/app/components/adminTable";
export default async function AdminPage() {
  return (
    <div className="adminDashboard h-screen">
      <Navbar></Navbar>
      <main>
        <AdminTable></AdminTable>
      </main>
      <Footer></Footer>
    </div>
  );
}
