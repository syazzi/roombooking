"use client";
import React, { useState } from "react";
import Modal from "./modal";
import ShowModal from "./ShowModal";
export default function scheduleGrid({ day, date, roomId, bookingData }) {
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenTwo, setIsOpenTwo] = useState(false);
  let [isOpenThree, setIsOpenThree] = useState(false);
  let [isOpenFour, setIsOpenFour] = useState(false);
  let [isOpenFive, setIsOpenFive] = useState(false);
  let [isOpenShow, setIsOpenShow] = useState(false);
  let [booking, setIsBooking] = useState();
  function closeModal() {
    setIsOpen(false);
  }
  function closeModalTwo() {
    setIsOpenTwo(false);
  }
  function closeModalThree() {
    setIsOpenThree(false);
  }
  function closeModalFour() {
    setIsOpenFour(false);
  }
  function closeModalFive() {
    setIsOpenFive(false);
  }

  function closeShowModal() {
    setIsOpenShow(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function openModalTwo() {
    setIsOpenTwo(true);
  }
  function openModalThree() {
    setIsOpenThree(true);
  }
  function openModalFour() {
    setIsOpenFour(true);
  }
  function openModalFive() {
    setIsOpenFive(true);
  }

  function openShowModal(data) {
    setIsBooking(bookingData.filter((item) => item.startingTime == data)),
      setIsOpenShow(true);
  }

  if (bookingData) {
    return (
      <div className="grid grid-cols-6 py-2 gap-1 w-full h-full items-center">
        <div className="flex flex-col">
          <div className="py-1 text-black">{day}</div>
          <div className="text-black">{date}</div>
        </div>
        <div
          className={
            bookingData.filter((item) => item.startingTime == "07:50").length >
            0
              ? "bookedSchedule"
              : "schedule"
          }
          onClick={
            bookingData.filter((item) => item.startingTime == "07:50").length >
            0
              ? () => openShowModal("07:50")
              : openModal
          }
        >
          {bookingData
            .filter((item) => item.startingTime == "07:50")
            .map((item) => (
              <div key={item.userId}>
                <div>Name: {item.user.firstname}</div>
                <div>Activity: {item.activity}</div>
              </div>
            ))}
        </div>
        <Modal
          bDate={date}
          show={isOpen}
          onClose={closeModal}
          time={"07:50"}
          endTime={"09:40"}
          roomId={roomId}
        ></Modal>

        <div
          className={
            bookingData.filter((item) => item.startingTime == "09:50").length >
            0
              ? "bookedSchedule"
              : "schedule"
          }
          onClick={
            bookingData.filter((item) => item.startingTime == "09:50").length >
            0
              ? () => openShowModal("09:50")
              : openModalTwo
          }
        >
          {bookingData
            .filter((item) => item.startingTime == "09:50")
            .map((item) => (
              <div key={item.userId}>
                <div>Name: {item.user.firstname}</div>
                <div>Activity: {item.activity}</div>
              </div>
            ))}
        </div>
        <Modal
          bDate={date}
          show={isOpenTwo}
          onClose={closeModalTwo}
          time={"09:50"}
          endTime={"11:40"}
          roomId={roomId}
        ></Modal>

        <div
          className={
            bookingData.filter((item) => item.startingTime == "12:50").length >
            0
              ? "bookedSchedule"
              : "schedule"
          }
          onClick={
            bookingData.filter((item) => item.startingTime == "12:50").length >
            0
              ? () => openShowModal("12:50")
              : openModalThree
          }
        >
          {bookingData
            .filter((item) => item.startingTime == "12:50")
            .map((item) => (
              <div key={item.userId}>
                <div>Name: {item.user.firstname}</div>
                <div>Activity: {item.activity}</div>
              </div>
            ))}
        </div>
        <Modal
          bDate={date}
          show={isOpenThree}
          onClose={closeModalThree}
          time={"12:50"}
          endTime={"13:40"}
          roomId={roomId}
        ></Modal>

        <div
          className={
            bookingData.filter((item) => item.startingTime == "14:10").length >
            0
              ? "bookedSchedule"
              : "schedule"
          }
          onClick={
            bookingData.filter((item) => item.startingTime == "14:10").length >
            0
              ? () => openShowModal("14:10")
              : openModalFour
          }
        >
          {bookingData
            .filter((item) => item.startingTime == "14:10")
            .map((item) => (
              <div key={item.userId}>
                <div>Name: {item.user.firstname}</div>
                <div>Activity: {item.activity}</div>
              </div>
            ))}
        </div>
        <Modal
          bDate={date}
          show={isOpenFour}
          onClose={closeModalFour}
          time={"14:10"}
          endTime={"16:00"}
          roomId={roomId}
        ></Modal>

        <div
          className={
            bookingData.filter((item) => item.startingTime == "16:10").length >
            0
              ? "bookedSchedule"
              : "schedule"
          }
          onClick={
            bookingData.filter((item) => item.startingTime == "16:10").length >
            0
              ? () => openShowModal("16:10")
              : openModalFive
          }
        >
          {bookingData
            .filter((item) => item.startingTime == "16:10")
            .map((item) => (
              <div key={item.userId}>
                <div>Name: {item.user.firstname}</div>
                <div>Activity: {item.activity}</div>
              </div>
            ))}
        </div>
        <Modal
          bDate={date}
          show={isOpenFive}
          onClose={closeModalFive}
          time={"16:10"}
          endTime={"18:00"}
          roomId={roomId}
        ></Modal>
        <ShowModal
          show={isOpenShow}
          date={date}
          onClose={closeShowModal}
          booking={booking}
        ></ShowModal>
      </div>
    );
  }
}
