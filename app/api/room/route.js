import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      where: {},
      include: {
        fics: true,
        building: true,
      },
    });
    return NextResponse.json(
      {
        room: rooms,
        message: "Rooms succesfully uploaded",
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        room: null,
        message: "Error: " + err,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      buildingId,
      roomType,
      quota,
      status,
      fics,
      disable_date_from,
      disable_date_to,
    } = body;

    const roomExist = await prisma.room.findFirst({
      where: {
        buildingId: buildingId,
        name: name,
      },
    });

    if (roomExist) {
      return NextResponse.json({ messaage: "room exist" }, { status: 400 });
    }

    const faculty = await prisma.FIC.findMany({
      where: {
        id: fics
      }
    })

    const newRoom = await prisma.room.create({
      data: {
        name,
        buildingId,
        roomType,
        quota,
        status,
        fics: {
          connect: { id: fics }
        },
        disable_date_from,
        disable_date_to,
      },
    });
    console.log(faculty);
    return NextResponse.json({room: newRoom},{ status: 201 });


  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        room: null,
        message: err,
      },
      { status: 500 }
    );
  }
}
