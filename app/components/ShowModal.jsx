"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function ShowModal(props) {
  const { data } = useSession();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();
  useEffect(() => {
    setId(props.booking?.map((item) => item.id));
  }, [props]);

  const deleteHandler = async (e) => {
    const confirmed = confirm("Do you wish to proceed with deletion?");
    if (confirmed) {
      try {
        setLoading(true)
        const res = await fetch(`http://localhost:3000/api/booking/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div>
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
                    Booked Details
                  </Dialog.Title>
                  <div className="flex">
                    <div>
                      <p>
                        Name:{" "}
                        {props.booking?.map((item) => item.user.firstname)}{" "}
                        {props.booking?.map((item) => item.user.lastname)}
                      </p>
                      <p>
                        Activity: {props.booking?.map((item) => item.activity)}
                      </p>
                      <p>
                        Time: {props.booking?.map((item) => item.startingTime)}{" "}
                        - {props.booking?.map((item) => item.expiryTime)}
                      </p>
                      <p>Date: {props.booking?.map((item) => item.startDate)}</p>
                      <p>
                        Description: {props.booking?.map((item) => item.note)}
                      </p>
                    </div>
                    {props.booking?.filter(
                      (item) => item.userId == data.user.user.id
                    ).length > 0 ? (
                      <div className="ml-auto self-center">
                        <button
                          className="bg-red-600 text-white p-1 hover:bg-red-400 rounded-sm"
                          onClick={deleteHandler}
                        >
                          <span>
                            <FaRegTrashAlt className="inline" />{" "}
                          </span>
                          <span>Delete</span>
                        </button>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
