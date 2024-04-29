"use client";
import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import Calendar from "react-calendar";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import Grid from "./grid";

export default function dropDown({ buildings, rooms }) {
  const [bookings, setBookings] = useState([]);
  const [bookingFilter, setBookingsFilter] = useState([]);
  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" });
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selected, setSelected] = useState({
    id: null,
    name: "Select Building",
  });
  const [selectRoom, setSelectRoom] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/booking");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBookings(data.booking);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const roomsFilter = rooms.filter((room) => room.buildingId === selected.id);

  const roomChangeHandle = (value) => {
    setSelectRoom(value);
    const data = bookings.filter((item) => item.roomId === value.id);
    setBookingsFilter(data);
  };
  const buildingChangeHandle = (value) => {
    setSelected(value);
    setSelectRoom();
    setBookingsFilter([]);
  };
  const handleDateClick = (date) => {
    setSelectedDates([]);
    setSelected({
      id: null,
      name: "Select Building",
    });
    setBookingsFilter([]);
    setSelectRoom();
    const startDate = new Date(date);
    startDate.setDate(startDate.getDate() - (startDate.getDay() - 1));

    const secondDate = new Date(date);
    secondDate.setDate(secondDate.getDate() - (secondDate.getDay() - 2));

    const thirdDate = new Date(date);
    thirdDate.setDate(thirdDate.getDate() - (thirdDate.getDay() - 3));

    const fourthDate = new Date(date);
    fourthDate.setDate(fourthDate.getDate() - (fourthDate.getDay() - 4));

    const fifthDate = new Date(date);
    fifthDate.setDate(fifthDate.getDate() - (fifthDate.getDay() - 5));

    const sixthDate = new Date(date);
    sixthDate.setDate(sixthDate.getDate() - (sixthDate.getDay() - 6));

    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + (7 - endDate.getDay()));

    setSelectedDates([
      startDate,
      secondDate,
      thirdDate,
      fourthDate,
      fifthDate,
      sixthDate,
      endDate,
    ]);
    setCalendarOpen(false);
  };

  return (
    <>
      <div className=" flex justify-around pb-3">
        <div className="flex justify-around mt-1">
          {selectedDates.length > 0 && (
            <div className="w-auto flex">
              <div className="self-center">Buildings:</div>
              <Listbox value={selected} onChange={buildingChangeHandle}>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{selected.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
                  </Listbox.Button>

                  <Listbox.Options className="absolute mt-1 max-h-60 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {buildings?.map((building) => (
                      <Listbox.Option
                        key={building.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                          }`
                        }
                        value={building}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {building.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          )}
          {selected.id != null && (
            <div className="w-auto flex ml-4">
              <div className="self-center">rooms:</div>
              <Listbox value={selectRoom} onChange={roomChangeHandle}>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">
                      {selectRoom ? selectRoom.name : "Select Room"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
                  </Listbox.Button>

                  <Listbox.Options className="absolute mt-1 max-h-60 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {roomsFilter?.map((room) => (
                      <Listbox.Option
                        key={room.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                          }`
                        }
                        value={room}
                      >
                        {({ selectRoom }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selectRoom ? "font-medium" : "font-normal"
                              }`}
                            >
                              {room.name}
                            </span>
                            {selectRoom ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-rows-9 w-full rounded-2xl items-center">
        <div className="grid grid-cols-6 place-content-center content-center place-items-center">
          <div className="pl-4">
            <div className="pt-1">
              <span
                className="cursor-pointer focus:cursor-auto"
                onClick={() => {
                  setCalendarOpen(!calendarOpen);
                }}
              >
                <div className="flex">
                  <div className="pr-3">week:</div>
                  <div>click</div>
                </div>
              </span>
              {selectedDates.length === 7 && (
                <div className="text-xs font-bold">
                  {selectedDates[0].toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}{" "}
                  -{" "}
                  {selectedDates[selectedDates.length - 1].toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  )}
                </div>
              )}
              <div>
                {calendarOpen && (
                  <div className="absolute z-10">
                    <Calendar
                      onClickDay={handleDateClick}
                      tileClassName={({ date }) => {
                        if (
                          selectedDates.length === 2 &&
                          date >= selectedDates[0] &&
                          date <= selectedDates[1]
                        ) {
                          return "selected-range";
                        }
                        return null;
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="pt-2">
            <p className="text-center text-black">7:50 - 9:40</p>
          </div>
          <div className="pt-2">
            <p className="text-center text-black">9:50 - 11:40</p>
          </div>
          <div className="pt-2">
            <p className="text-center text-black">12:50 - 13:40</p>
          </div>
          <div className="pt-2">
            <p className="text-center text-black">14:10 - 16:00</p>
          </div>
          <div className="pt-2">
            <p className="text-center text-black">16:10 - 18:00</p>
          </div>
        </div>
        {selectRoom ? (
          <Grid
            roomId={selectRoom.id}
            selectedDates={selectedDates}
            bookings={bookingFilter}
          />
        ) : (
          <div>click the week to select the week</div>
        )}
      </div>
    </>
  );
}
