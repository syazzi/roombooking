import prisma from "@/lib/prisma";
import { getSession } from "next-auth/react";

const { NextResponse } = require("next/server");

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      where: {},
      include: {
        room: {
          include: {
            building: true,
          },
        },
        user: true,
      },
    });
    return NextResponse.json(
      {
        booking: bookings,
        message: "Data succesfully uploaded",
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        booking: null,
        message: "error: " + err,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      startDate,
      startingTime,
      expiryTime,
      period,
      activity,
      note,
      status,
      noOfPeople,
      userId,
      roomId,
    } = body;
    console.log(
      startDate,
      startingTime,
      expiryTime,
      period,
      activity,
      note,
      status,
      noOfPeople,
      userId,
      roomId
    );

    const roomExist = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!roomExist) {
      return NextResponse.json(
        { room: roomExist, message: "room does not exist" },
        { status: 409 }
      );
    }

    const existingBooking = await prisma.booking.findFirst({
      where: { startDate: startDate, startingTime: startingTime, roomId: roomId },
    });

    if (existingBooking) {
      return NextResponse.json(
        { booking: existingBooking, message: "room Unavailable" },
        { status: 409 }
      );
    }

    if (period == "Weekly") {
      const [day, month, year] = startDate.split("/");
      const sDate = new Date(year, month - 1, day);
      const tempArray = [];
      for (let i = 0; i < 14; i++) {
        const newDate = new Date(sDate);
        newDate.setDate(sDate.getDate() + i * 7);
        tempArray.push({
          startDate: newDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          startingTime: startingTime,
          expiryTime: expiryTime,
          period: period,
          activity: activity,
          note: note,
          status: status,
          noOfPeople: noOfPeople,
          userId: userId,
          roomId: roomId,
        });
      }

      const newBook = await prisma.booking.createMany(
        {data: tempArray}
      )
      return NextResponse.json(
        {bookings: newBook},
        { status: 201 }
      );
    } else if (period == "Once") {
      const newBook = await prisma.booking.create({
        data: {
          startDate,
          startingTime,
          expiryTime,
          period,
          activity,
          note,
          status,
          noOfPeople,
          userId,
          roomId,
        },
      });

      return NextResponse.json(
        {
          message: newBook,
        },
        { status: 201 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        booking: null,
        message: err,
      },
      { status: 500 }
    );
  }
}
