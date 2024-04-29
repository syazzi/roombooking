"use client";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import EditRoomDetailsModal from "./EditRoomDetailsModal";

export default function ViewRoomDetailsModal(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: props.room?.name,
    quota: props.room?.quota,
    roomType: props.room?.roomType,
  });

  const close = () => {
    setIsOpen(false);
  };
  const open = () => {
    props.setIsOpen(false);
    setFormData({
      name: props.room.name,
      quota: props.room.quota,
      roomType: props.room.roomType,
    });
    setIsOpen(true);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const body = {
      name: formData.name,
      quota: parseInt(formData.quota),
      roomType: formData.roomType,
    };
    // console.log(JSON.stringify(body));
    try {
      const res = await fetch(`http://localhost:3000/api/room/${props.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        console.log("success");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = async (e) => {
    const confirmed = confirm("Would you like to confirm deleteion of the room along with room booking?");
    if (confirmed) {
      try {
        const res = await fetch(`http://localhost:3000/api/room/${props.id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          console.log("success");
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  // console.log(props);

  if (props.room) {
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
                      Room Details
                    </Dialog.Title>
                    <div className="flex justify-center">
                      <div>
                        <div className="pt-8">
                          Name: {props.room.building.name} {props.room.name}
                        </div>
                        <div className="pt-8">
                          Quota: {props.room.quota} pax
                        </div>
                        <div className="pt-8">Type: {props.room.roomType}</div>
                      </div>
                      <div className="self-center ml-auto">
                        <button
                          className="text-red-700 hover:text-gray-700 block"
                          onClick={deleteHandler}
                        >
                          Delete
                        </button>
                        <button onClick={() => open()}>Edit</button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
        <EditRoomDetailsModal
          show={isOpen}
          onClose={() => close()}
          room={props.room}
          submit={(e) => submitHandler(e)}
          setFormData={setFormData}
          formData={formData}
        />
      </>
    );
  }
}
