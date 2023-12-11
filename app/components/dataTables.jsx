"use client";
import React from "react";
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["DATE", "TIME", "ROOM", ""];

const TABLE_ROWS = [
  {
    date: "23/04/18",
    time: "7:50 - 9:40",
    room: "ROOM 1",
  },
  {
    date: "23/04/18",
    time: "7:50 - 9:40",
    room: "ROOM 1",
  },
  {
    date: "23/04/18",
    time: "7:50 - 9:40",
    room: "ROOM 1",
  },
  {
    date: "23/04/18",
    time: "7:50 - 9:40",
    room: "ROOM 1",
  },
  {
    date: "23/04/18",
    time: "7:50 - 9:40",
    room: "ROOM 1",
  },
];

export default function dataTables() {
  return (
    <Card className="h-full flex-1 max-w-6xl overflow-y-auto overflow-x-visible">
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
        <tbody>
          {TABLE_ROWS.map(({ date, time, room }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={date}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {date}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {time}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {room}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    Delete
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
