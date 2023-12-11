import Navbar from "../components/Navbar";
import ScheduleGrid from "../components/scheduleGrid";
import Dropdown from "../components/dropDown";
import Footer from "../components/footer";

export default function Timetable() {
  return (
    <>
      <main className="timetable">
        <Navbar />

        <div className="flex justify-center items-center">
          <div className="bg-gray-400 max-w-6xl flex-1 p-3">
            <div className=" flex justify-around gap-10 pb-3">
              <Dropdown text={"BUILDINGS"} />

              <Dropdown text={"FLOOR"} />

              <Dropdown text={"ROOM"} />
            </div>
            <div className="grid grid-rows-9 h-screen w-full rounded-2xl items-center">
              <div className="grid grid-cols-6 place-content-center content-center place-items-center">
                <div className="">
                  <div>
                    <Dropdown text={"MONTH"} />
                  </div>
                  <div className="pt-1">
                    <Dropdown text={"WEEK"} />
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-center">7:50 - 9:40</p>
                </div>
                <div className="pt-2">
                  <p className="text-center">7:50 - 11:40</p>
                </div>
                <div className="pt-2">
                  <p className="text-center">12:50 - 13:40</p>
                </div>
                <div className="pt-2">
                  <p className="text-center">14:10 - 16:00</p>
                </div>
                <div className="pt-2">
                  <p className="text-center">16:10 - 18:00</p>
                </div>
              </div>
              <ScheduleGrid day={"MONDAY"} date={"DATE"} />
              <ScheduleGrid day={"TUESDAY"} date={"DATE"} />
              <ScheduleGrid day={"WEDNESDAY"} date={"DATE"} />
              <ScheduleGrid day={"THURSDAY"} date={"DATE"} />
              <ScheduleGrid day={"FRIDAY"} date={"DATE"} />
              <ScheduleGrid day={"SATURDAY"} date={"DATE"} />
              <ScheduleGrid day={"SUNDAY"} date={"DATE"} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
