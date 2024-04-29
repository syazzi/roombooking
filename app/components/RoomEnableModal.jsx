"use clients";
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
// import EditRoomModal from "./EditRoomModal";

// building: {id: 'clttx3r540006aa92nlqf72v7', name: 'CLT', address: 'UBD', published: true, image: '/image/clt.jpg', …}
// buildingId: "clttx3r540006aa92nlqf72v7"
// createdAt: "2024-03-16T10:04:48.360Z"
// disable_date_from: ""
// disable_date_to: ""
// fics: [{…}]
// id: "clttx8qy00008aa923bfck6kf"
// name: "G.02"
// quota: 24
// roomType: "classroom"
// status: "Available"
// updatedAt: "2024-03-16T10:01:58.763Z"
export default function RoomModal(props) {
  const router = useRouter()
  async function clear(id) {
    const body = {
      disable_date_from: "",
      disable_date_to: ""
    }
    const confirmed = confirm("Are You Sure u would like to enable this room?");
    if( confirmed){
      const res = await fetch(`http://localhost:3000/api/room/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        window.location.reload()
      }
    }
  }

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
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Enable Room
                  </Dialog.Title>
                  <div className="grid grid-cols-3 gap-4">
                    {props.rooms
                      .filter(
                        (item) =>
                          item.fics.map((item) => item.id) == props.user.ficId && item.disable_date_from != ""
                      )
                      .map((item) => (
                        <div
                          className="border border-black p-4 cursor-pointer hover:bg-blue-gray-50"
                          onClick={() => clear(item.id)}
                          key={item.id}
                        >
                          <div>
                            Name: {item.building.name} {item.name}
                          </div>
                        </div>
                      ))}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
