import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/footer";
import DataTables from "@/app/components/dataTables";

async function loadBooking() {
  const res = await fetch("http://localhost:3000/api/booking");
  const data = await res.json();

  return data;
}

export default async function historyPage() {
  const bookings = await loadBooking();
  if (bookings) {
    return (
      <>
        <main className="CustomerDashboard">
          <Navbar />
  
          <div className="h-screen py-3 flex justify-center ">
            <DataTables data={bookings} />
          </div>
        </main>
        <Footer />
      </>
    );
  }
}
