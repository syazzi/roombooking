"use client";
import React, { useEffect, useState } from "react";
import ScheduleGrid from "./scheduleGrid";

export default function grid({ roomId, selectedDates, bookings }) {
  const [bookingDataMonday, setbookingDataMonday] = useState([]);
  const [bookingDataTuesday, setBookingDataTuesday] = useState([]);
  const [bookingDataWednesday, setBookingDataWednesday] = useState([]);
  const [bookingDataThursday, setBookingDataThursday] = useState([]);
  const [bookingDataFriday, setBookingDataFriday] = useState([]);
  const [bookingDataSaturday, setBookingDataSaturday] = useState([]);
  const [bookingDataSunday, setBookingDataSunday] = useState([]);

  useEffect(() => {
    const getMonday = () => {
      const mondayData = bookings.filter(
        (items) =>
          items.startDate ==
          selectedDates[0].toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
      );
      setbookingDataMonday(mondayData)
    };

    const getTuesday = () => {
      const tuesdayData = bookings.filter(
        (items) =>
          items.startDate ==
          selectedDates[1].toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
      );
      setBookingDataTuesday(tuesdayData)
    };

    const getWednesday = () => {
      const wednesdayData = bookings.filter(
        (items) =>
          items.startDate ==
          selectedDates[2].toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
      );
      setBookingDataWednesday(wednesdayData)
    };

    const getThursday = () => {
      const thursdayData = bookings.filter(
        (items) =>
          items.startDate ==
          selectedDates[3].toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
      );
      setBookingDataThursday(thursdayData)
    };

    const getFriday = () => {
      const fridayData = bookings.filter(
        (items) =>
          items.startDate ==
          selectedDates[4].toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
      );
      setBookingDataFriday(fridayData)
    };

    const getSaturday = () => {
      const saturdayData = bookings.filter(
        (items) =>
          items.startDate ==
          selectedDates[5].toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
      );
      setBookingDataSaturday(saturdayData)
    };

    const getSunday = () => {
      const sundayData = bookings.filter(
        (items) =>
          items.startDate ==
          selectedDates[6].toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
      );
      setBookingDataSunday(sundayData)
    };

    getMonday();
    getTuesday()
    getWednesday()
    getThursday()
    getFriday()
    getSaturday()
    getSunday()
  }, []);

  console.log("selectedDate", bookings);
  
  return (
    <>
      <ScheduleGrid
        roomId={roomId}
        day={"MONDAY"}
        date={selectedDates[0].toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
        bookingData={bookingDataMonday}
      />
      <ScheduleGrid
        roomId={roomId}
        day={"TUESDAY"}
        date={selectedDates[1].toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
        bookingData={bookingDataTuesday}
      />
      <ScheduleGrid
        roomId={roomId}
        day={"WEDNESDAY"}
        date={selectedDates[2].toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
        bookingData={bookingDataWednesday}
      />
      <ScheduleGrid
        roomId={roomId}
        day={"THURSDAY"}
        date={selectedDates[3].toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
        bookingData={bookingDataThursday}
      />
      <ScheduleGrid
        roomId={roomId}
        day={"FRIDAY"}
        date={selectedDates[4].toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
        bookingData={bookingDataFriday}
      />
      <ScheduleGrid
        roomId={roomId}
        day={"SATURDAY"}
        date={selectedDates[5].toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
        bookingData={bookingDataSaturday}
      />
      <ScheduleGrid
        roomId={roomId}
        day={"SUNDAY"}
        date={selectedDates[6].toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
        bookingData={bookingDataSunday}
      />
    </>
  );
}
