"use client";
import { Dialog, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import React, { Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Modal({ show, onClose, time, endTime, roomId, bDate }) {
  const { data } = useSession();
  const [loading, setLoading] = useState(false);
  const notify = (value) => toast(value);
  const [formData, setFormData] = useState({
    startDate: bDate,
    startingTime: time,
    expiryTime: endTime,
    period: "Once",
    activity: "Class",
    note: "",
    status: "Approve",
    noOfPeople: 1,
    userId: null,
    roomId: roomId,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      startDate: bDate,
      startingTime: formData.startingTime.toString(),
      expiryTime: formData.expiryTime.toString(),
      period: formData.period.toString(),
      activity: formData.activity.toString(),
      note: formData.note.toString(),
      status: "Approve",
      noOfPeople: parseInt(formData.noOfPeople),
      userId: data.user.user.id,
      roomId: roomId,
    };

    try {
      setLoading(true);
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        window.location.reload();
      } else {
        notify(res.statusText);
        setFormData({
          startDate: bDate,
          startingTime: time,
          expiryTime: endTime,
          period: "Once",
          activity: "Class",
          note: "",
          status: "Approve",
          noOfPeople: 1,
          userId: data.user.user.id,
          roomId: roomId,
        });
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    } catch (error) {
      notify(error);
      setFormData({
        startDate: bDate,
        startingTime: time,
        expiryTime: endTime,
        period: "Once",
        activity: "Class",
        note: "",
        status: "Approve",
        noOfPeople: 1,
        userId: data.user.user.id,
        roomId: roomId,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <ToastContainer />
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Booking Form
                  </Dialog.Title>

                  <form onSubmit={handleSubmit}>
                    <label htmlFor="Date">Date:</label>
                    <input
                      type="text"
                      id="Date"
                      name="startDate"
                      value={bDate}
                      readOnly
                    />

                    <label htmlFor="time">Time:</label>
                    <input
                      type="text"
                      id="time"
                      name="time"
                      value={formData.startingTime}
                      readOnly
                    />

                    <label htmlFor="activity">Activity:</label>
                    <select
                      name="activity"
                      id="activity"
                      value={formData.activity}
                      onChange={handleInputChange}
                    >
                      <option value="Class">Class</option>
                      <option value="Tutorial">Tutorial</option>
                      <option value="Club">Club</option>
                    </select>

                    <label htmlFor="period">Period:</label>
                    <select
                      name="period"
                      id="period"
                      value={formData.period}
                      onChange={handleInputChange}
                    >
                      <option value="Once">Once</option>
                      <option value="Weekly">Weekly</option>
                    </select>

                    <label htmlFor="note">Note:</label>
                    <textarea
                      id="note"
                      name="note"
                      value={formData.note}
                      onChange={handleInputChange}
                    ></textarea>

                    <label htmlFor="noOfPeople">NoOfPeople:</label>
                    <input
                      type="number"
                      id="noOfPeople"
                      name="noOfPeople"
                      value={formData.noOfPeople}
                      onChange={handleInputChange}
                    />

                    <div className="mt-4">
                      <button
                        type="submit"
                        className={`inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 ${
                          loading ? "" : "hover:bg-blue-200"
                        } focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                        disabled={loading ? true : false}
                      >
                        {loading ? "Loading" : "Submit"}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
