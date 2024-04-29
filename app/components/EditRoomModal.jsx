"use client";
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditRoomModal(props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const notify = (value) => toast(value);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };
  async function submit(e) {
    e.preventDefault();
    setLoading(true)
    const body = {
      disable_date_from: startDate,
      disable_date_to: endDate
    }
    console.log(JSON.stringify(body));
    try{
      const res = await fetch(`http://localhost:3000/api/room/${props.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        window.location.reload();
      }

    }catch(err){
      notify(err, "please try again");
      setTimeout(() => {
        setLoading(false)
      }, 2000);
    }
  }

  return (
    <div className="">
      <Transition appear show={props.show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={props.onClose}>
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
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit Rooms
                  </Dialog.Title>
                  <form action="" onSubmit={submit} className="h-96 ">
                    <div>
                      <input
                        id="startDate"
                        name="disable_date_from"
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        required
                      />
                      <div className="text-center my-1">To</div>
                      <input
                        id="endDate"
                        type="date"
                        name="disable_date_to"
                        value={endDate}
                        onChange={handleEndDateChange}
                        required
                      />
                    </div>
                    <div className="mt-16 flex items-center justify-end gap-x-6">
                      <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={props.onClose}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ${
                          loading ? "" : "hover:bg-blue-200"
                        } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                      >
                        {loading ? "Loading" : "Save"}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
