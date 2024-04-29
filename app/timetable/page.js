import Navbar from "../components/Navbar";
import Dropdown from "../components/dropDown";
import Footer from "../components/footer";
import prisma from "@/lib/prisma";

async function getBuildings() {
  const buildings = await prisma.building.findMany({
    where: { published: true },
  });
  return buildings;
}

async function getRooms() {
  const rooms = await prisma.room.findMany({});
  return rooms;
}

export default async function Timetable() {
  const buildings = await getBuildings();
  const rooms = await getRooms();
  return (
    <>
      <main className="timetable h-screen">
        <Navbar />
        <div className="flex justify-center">
          <div className="bg-gray-400 max-w-6xl flex-1 p-3">
            <Dropdown buildings={buildings} rooms={rooms} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
