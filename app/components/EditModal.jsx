"use client";
import React, { Fragment, useEffect, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";

export default function EditModal(props) {
  const [rooms, setRooms] = useState();
  const router = useRouter()
  const [time, setTime] = useState();
  const [formDate, setFormDate] = useState();
  useEffect(() => {
    const roomsFilter = props.rooms?.room.filter(
      (item) => item.buildingId == props.formData.building
    );
    setRooms(roomsFilter);
  }, [props.formData.building]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name == "startingTime") {
      setTime(value);
      props.setFormData((prevData) => ({
        ...prevData,
        startingTime: value.slice(0, value.indexOf("-")),
        expiryTime: value.slice(value.indexOf("-") + 1, value.length),
      }));
    } else if (name == "Date") {
      setFormDate(value);
      const values = new Date(value);
      const date = values.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      props.setFormData((prevData) => ({
        ...prevData,
        Date: date,
      }));
    } else {
      props.setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch(`http://localhost:3000/api/booking/${props.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(props.formData),
      });
      if (res.ok) {
        console.log("success");
        router.refresh()
      }

    }catch(err){
      console.log(err);
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
                    Edit Form
                  </Dialog.Title>

                  <form onSubmit={handleSubmit}>
                    <label htmlFor="building">Building:</label>
                    <select
                      name="building"
                      id="building"
                      value={props.formData.building}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Buildings</option>
                      {props.buildings.building.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>

                    <label htmlFor="room">Room:</label>
                    <select
                      name="roomId"
                      id="room"
                      value={props.formData.roomId}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Rooms</option>
                      {rooms?.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.name}
                        </option>
                      ))}
                    </select>

                    <label htmlFor="Date">Date:</label>
                    <input
                      type="date"
                      id="Date"
                      name="Date"
                      value={formDate}
                      onChange={handleInputChange}
                    />

                    <label htmlFor="time">Time:</label>
                    <select
                      name="startingTime"
                      id="time"
                      value={time}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Time</option>
                      <option value="07:50-9:40">07:50</option>
                      <option value="09:50-11:40">09:50</option>
                      <option value="11:50-13:40">11:50</option>
                      <option value="14:10-16:00">14:10</option>
                      <option value="16:10-18:00">16:10</option>
                    </select>

                    <label htmlFor="activity">Activity:</label>
                    <select
                      name="activity"
                      id="activity"
                      value={props.formData.activity}
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
                      value={props.formData.period}
                      onChange={handleInputChange}
                    >
                      <option value="Once">Once</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>

                    <label htmlFor="note">Note:</label>
                    <textarea
                      id="note"
                      name="note"
                      value={props.formData.note}
                      onChange={handleInputChange}
                    ></textarea>

                    <label htmlFor="noOfPeople">NoOfPeople:</label>
                    <input
                      type="number"
                      id="noOfPeople"
                      name="noOfPeople"
                      value={props.formData.noOfPeople}
                      onChange={handleInputChange}
                    />

                    <div className="mt-4">
                      <button
                        type="submit"
                        onClick={props.onClose}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Submit
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
