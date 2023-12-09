import React from "react";

export default function scheduleGrid({day, date}) {
  return (
    <div className="grid grid-cols-6 py-2 gap-1 w-full h-full items-center">
      <div className="flex flex-col">
        <div className="flex gap-3">
          <div>prev</div>
          <div>next</div>
        </div>
        <div className="py-1">{day}</div>
        <div>{date}</div>
      </div>
      <div className="schedule "></div>
      <div className="schedule "></div>
      <div className="schedule "></div>
      <div className="schedule "></div>
      <div className="schedule "></div>
    </div>
  );
}
