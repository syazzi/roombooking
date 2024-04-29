import prisma from "@/lib/prisma";
const { NextResponse } = require("next/server");


export async function GET(res, {params}) {
  try {
    const bookings = await prisma.booking.findUnique({
      where: {id: params.id},
      include: {
        room: {
          include: {
            building: true
          }
        },
        user: true
      }
      
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

export async function PUT(req, { params }) {
  try {
    const bookingId = params.id;
    const body = await req.json();

    const {
      Date,
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
    console.log(Date, startingTime, expiryTime, period, activity, note, status, noOfPeople, userId, roomId);

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
      where: { Date: Date, startingTime: startingTime, roomId: roomId },
    });

    if (existingBooking) {
      return NextResponse.json(
        { booking: existingBooking, message: "room Unavailable" },
        { status: 409 }
      );
    }

    const editBook = await prisma.booking.update({
      where: {id: bookingId},
      data: {
        Date,
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
    return NextResponse.json({booking: editBook},{status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const bookingId = params.id;
    const data = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
    });
    if (!data) {
      return NextResponse.json({ message: "not found", status: 404 });
    }
    await prisma.booking.delete({
      where: {
        id: bookingId,
      },
    });
    return NextResponse.json({ status: 204 });
  } catch (err) {
    return NextResponse.json({ message: "err" }, { status: 500 });
  }
}
