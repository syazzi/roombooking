import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

export default function EditRoomDetailsModal(props) {
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    props.setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  console.log(props);
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
                  <form onSubmit={props.submit}>
                    <div>
                      <input type="text" name="name" placeholder="Room name" value={props.formData.name} onChange={handleInputChange} required/>
                    </div>
                    <div>
                      <input
                        type="number"
                        name="quota"
                        placeholder="Limit of pax"
                        value={props.formData.quota}
                        onChange={handleInputChange} required
                      />
                    </div>
                    <div>
                      <input type="text" value={props.formData.roomType} name="roomType" placeholder="type of room" onChange={handleInputChange} required/>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
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
