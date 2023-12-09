"use client";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

const buildings = [
  { name: "SBE" },
  { name: "FIT" },
  { name: "APB" },
  { name: "FOS" },
  { name: "FASS" },
  { name: "CLT" },
];

export default function dropDown({text}) {
  const [selected, setSelected] = useState(buildings[0]);
  return (
    <div className="flex col-span-2 mt-1">
        <div className="pt-1 pe-1">{text}:</div>
      <div className="w-auto">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
            </Listbox.Button>

            <Listbox.Options className="absolute mt-1 max-h-60 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {buildings.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
    </div>
  );
}
