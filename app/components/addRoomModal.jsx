"use client";
import { Dialog, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import React, { Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";

export default function addRoomModal(props) {
  const { data } = useSession();
  const [loading, setLoading] = useState(false);
  const notify = (value) => toast(value);
  const [formData, setFormData] = useState({
    name: null,
    buildingId: null,
    roomType: "classroom",
    quota: 1,
    status: "Available",
    fics: data.user.user.ficId,
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
      name: formData.name,
      buildingId: formData.buildingId,
      roomType: formData.roomType,
      quota: parseInt(formData.quota),
      status: formData.status,
      fics: formData.fics,
      disable_date_from: "",
      disable_date_to: "",
    };

    try {
      setLoading(true);
      const res = await fetch("/api/room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setFormData({
        name: "",
        buildingId: "",
        roomType: "classroom",
        quota: 1,
        status: "Available",
        fics: data.user.user.ficId,
      });
      if (res.ok) {
        window.location.reload();
      } else {
        notify(res.statusText);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
                    Room Form
                  </Dialog.Title>

                  <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />

                    <label htmlFor="roomType">roomType:</label>
                    <input
                      type="text"
                      id="roomType"
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleInputChange}
                      required
                    />

                    <label htmlFor="buildingId">Building:</label>
                    <select
                      name="buildingId"
                      id="buildingId"
                      value={formData.buildingId}
                      onChange={handleInputChange}
                    >
                      <option value="">Choose a building</option>
                      {props.building.building.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>

                    <label htmlFor="status">Status:</label>
                    <select
                      name="status"
                      id="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="Available">Available</option>
                      <option value="Unavailable">Unavailable</option>
                      <option value="Occupied">Occupied</option>
                    </select>

                    <label htmlFor="quota">Quota:</label>
                    <input
                      type="number"
                      name="quota"
                      id="quota"
                      value={formData.quota}
                      onChange={handleInputChange}
                      required
                    />

                    <div className="mt-4">
                      <button
                        type="submit"
                        className={`inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 ${
                          loading ? "" : "hover:bg-blue-200"
                        } focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                        disabled={loading ? true : false}
                      >
                        {loading ? <FaSpinner /> : "submit"}
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
