"use client";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import AdminViewRoom from "./adminViewRoom";
import AdminEditRoom from "./adminEditRoom";
export default function adminTable() {
  const { data } = useSession();
  const [bookings, setBookings] = useState();
  const [buildings, setBuildings] = useState();
  const [rooms, setRooms] = useState();
  useEffect(() => {
    if (data) {
      const getBuildings = async () => {
        const buildingData = await fetch("http://localhost:3000/api/building")
        if (!buildingData.ok) {
          throw new Error("Network response was not ok");
        }
        const dataOne = await buildingData.json()
        setBuildings(dataOne)
      }
      const getRooms = async () => {
        const roomData = await fetch("http://localhost:3000/api/room")
        if (!roomData.ok) {
          throw new Error("Network response was not ok");
        }
        const dataOne = await roomData.json()
        setRooms(dataOne)
      }
      const getBookings = async () => {
        const bookingData = await fetch("http://localhost:3000/api/booking");
        if (!bookingData.ok) {
          throw new Error("Network response was not ok");
        }
        const dataOne = await bookingData.json();
        const filterBooking = dataOne.booking.filter(
          (item) => item.userId == data?.user.user.id
        );
        setBookings(filterBooking);
      };
      getBookings();
      getRooms()
      getBuildings()
    }
  }, [data]);


  if (data && rooms) {
    return (
      <div className="container justify-center items-center">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-center">
              {data.user.user.firstname} {data.user.user.lastname}
            </h5>
            <div className="">
              <Tabs value="html" className="justify-content-center">
                <TabsHeader className="w-100">
                  <Tab key="roomView" value="roomView">
                    View Room
                  </Tab>
                  <Tab key="roomEdit" value="roomEdit">
                    Edit Room
                  </Tab>
                </TabsHeader>
                <TabsBody>
                  <TabPanel key="roomView" value="roomView">
                    <AdminViewRoom user={data.user.user} booking={bookings} rooms={rooms.room} buildings={buildings}></AdminViewRoom>
                  </TabPanel>
                  <TabPanel key="roomEdit" value="roomEdit">
                    <AdminEditRoom rooms={rooms.room} user={data.user.user}></AdminEditRoom>
                  </TabPanel>
                </TabsBody>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="container text-white h-screen">Wait for a sec</div>;
  }
}
