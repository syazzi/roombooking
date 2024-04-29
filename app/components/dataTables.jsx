"use client";
import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const TABLE_HEAD = ["DATE", "TIME", "BUILDING", "ROOM", ""];

export default function dataTables({ data }) {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const { data: session } = useSession();
  const [id, setId] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setId(session?.user.user.id);
      const filteredBookings = data.booking.filter((booking) => {
        return booking.userId === id;
      });
      setBookings(filteredBookings);
    }, [bookings]);
  });
  if (session) {
    return (
      <Card className="h-full flex-1 max-w-6xl overflow-y-auto overflow-x-visible">
        <div className="text-black bg-blue-gray-50 text-center">
          {session.user.user.userHasRole.filter(
            (item) => item.roleId == "clu7l0vyk000d11owpar7utzp"
          ).length > 0 ? (
            <p>
              {session?.user.user.firstname} {session?.user.user.lastname}{" "}
              {session?.user.user.regNo}
            </p>
          ) : (
            <p>
              {session?.user.user.firstname} {session?.user.user.lastname}
            </p>
          )}
        </div>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className=" border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          {bookings.length > 0 ? (
            <tbody>
              {bookings.map((booking, index) => {
                const isLast = index === bookings.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {booking.startDate}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {booking.startingTime} - {booking.expiryTime}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {booking.room.building.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {booking.room.name}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <div className="flex justify-center py-5">No Bookings</div>
          )}
        </table>
      </Card>
    );
  }
}
