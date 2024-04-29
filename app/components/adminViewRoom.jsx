"use client";
import React, { useState } from "react";
import ViewRoomDetailsModal from "./ViewRoomDetailsModal";
import AddRoomModal from "./addRoomModal";
import { FaPlus } from "react-icons/fa";

export default function adminViewRoom(props) {
  let [isOpen, setIsOpen] = useState(false);
  let [selectedRoom, setSelectedRoom] = useState();
  let [id, setId] = useState();
  const [modal, setModal] = useState(false);
  const open = (values) => {
    setId(values.id);
    setSelectedRoom(values);
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
    setId(null);
  };
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  if (props.booking && props.buildings) {
    return (
      <>
        <div className="flex pb-3 justify-center items-center">
          <button className="ml-auto" onClick={openModal}>
              <FaPlus className="text-xs inline"/> Add Room
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {props.rooms.filter((item) => item.fics[0].id == props.user.ficId)
            .length > 0 ? (
            <>
              {props.rooms
                .filter((item) => item.fics[0].id == props.user.ficId)
                .map((item) => (
                  <div
                    key={item.id}
                    className="border border-1 text-center hover:bg-gray-100 p-4 cursor-pointer"
                    onClick={() => open(item)}
                  >
                    {item.building.name} {item.name}
                  </div>
                ))}
            </>
          ) : (
            <div>no data</div>
          )}
          <ViewRoomDetailsModal
            show={isOpen}
            id={id}
            onClose={close}
            room={selectedRoom}
            setIsOpen={setIsOpen}
          />
          {modal && (
            <AddRoomModal
              building={props.buildings}
              show={modal}
              onClose={closeModal}
            />
          )}
        </div>
      </>
    );
  } else {
    return <div>Hold on a second</div>;
  }
}
