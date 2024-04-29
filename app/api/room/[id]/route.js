import prisma from "@/lib/prisma";
const { NextResponse } = require("next/server");

export async function PUT(req, { params }) {
  try {
    const roomId = params.id;
    const body = await req.json();

    const { name, quota, roomType, disable_date_from, disable_date_to } = body;
    console.log(name, quota, roomType, disable_date_from, disable_date_to);

      const editRoom = await prisma.room.update({
        where: {id: roomId},
        data: {
          name, quota, roomType,
          disable_date_from,
          disable_date_to
        },
      });
    return NextResponse.json({room: editRoom},{ status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const roomId = params.id;
    const data = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });
    if (!data) {
      return NextResponse.json({ message: "not found", status: 404 });
    }
    await prisma.room.delete({
      where: {
        id: roomId,
      },
    });
    return NextResponse.json({ status: 204 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
