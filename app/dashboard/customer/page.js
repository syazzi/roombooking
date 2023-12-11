import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/footer";
import DataTables from "@/app/components/dataTables";

export default function CustomerDashboard() {
  return (
    <>
      <main className="CustomerDashboard">
        <Navbar />

        <div className="h-screen py-3 flex justify-center ">
          <DataTables/>
        </div>
      </main>
      <Footer />
    </>
  );
}
