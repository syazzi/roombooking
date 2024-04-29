import prisma from "@/lib/prisma";

import Image from "next/image.js";
import Link from "next/link.js";

import HomepageImage from "./images/homepage.jpg";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Slider from "./components/slider";

async function getBuildings(){
  const buildings = await prisma.building.findMany({
      where: {published: true},

  })
  return buildings;
}

export default async function Home() {
  const buildings = await getBuildings();

  return (
    <>
      <main>
        <div className="homepage">
          <Navbar />
          <div className="homepage-caption">
            <h2>Check Out Rooms</h2>
            <h2 className="pt-7 pb-7">Schedule</h2>
            <h2 className="pb-3">Available For You</h2>
            <Link href={"/timetable"} className="homepage-link">
              Book Now
            </Link>
          </div>
        </div>
        <Slider buildings={buildings}/>
      </main>
      <Footer />
    </>
  );
}
