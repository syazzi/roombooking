"use client";
import { useRouter } from "next/navigation";

export default function bookingForm({ onSubmit }) {
  async function submitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const body = {
      date: formData.get("date"),
      starting_time: formData.get("time"),
    };
    try {
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      // await Router.push('/drafts');
    //   console.log(body);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="loginForm">
      <form onSubmit={submitHandler}>
        <input
          className="mb-2 rounded-md border-1 border-gray-600"
          type="date"
          name="date"
          id="Email"
          placeholder="Date"
        />
        <input
          className=" mb-2 rounded-md border-1 border-gray-600"
          type="text"
          name="time"
          id="Password"
          placeholder="Time"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
