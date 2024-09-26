import React, { useState } from "react";
import Badges from "./Badges";
import Checkbox from "@mui/material/Checkbox";

const objectsData = [
  {
    id: 1,
    name: "Volvo9666-2146",
    speed: "10 km/h",
    lastUpdate: { date: "20/11/2023", time: "20:10:10" },
    status: "active",
  },
  {
    id: 2,
    name: "Volvo9666-6562",
    speed: "10 km/h",
    lastUpdate: { date: "20/11/2023", time: "20:10:10" },
    status: "active",
  },
];

const ObjectsCard = () => {
  const [selectedObjectId, setSelectedObjectId] = useState(null);

  const handleToggle = (id) => {
    setSelectedObjectId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div
      className="absolute top-4 left-4 bg-white w-[368px] h-[640px] rounded-xl shadow-lg z-10"
      style={{ zIndex: 1000 }}
    >
      {/* first section */}
      <div className="w-full h-[48px] border-b border-border3 flex flex-row items-center justify-between">
        <div className="flex ml-2 flex-row gap-2">
          <h2 className="font-bold">Objects</h2>
          <Badges color={"blue"}>1415 Total</Badges>
          <Badges color={"green"}>1415</Badges>
          <Badges color={"red"}>514</Badges>
        </div>
        <div className="flex mr-2 h-[28px] gap-2">
          <img src="download.svg" alt="download" className="cursor-pointer" />
          <img
            src="full-screen2.svg"
            alt="full-screen2"
            className="cursor-pointer"
          />
          <img src="arrow.svg" alt="arrow" className="cursor-pointer" />
        </div>
      </div>
      {/* second section */}
      <div className="w-full h-[48px] border-b border-border3 flex flex-row items-center justify-between">
        <div className="relative flex h-[36px] ml-2 w-3/4">
          <div className="absolute left-[8px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer">
            <img src="/search2.svg" alt="search" />
          </div>
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg border border-border3 p-2 pl-8 placeholder-[#5E6C84] focus:outline-none"
          />
        </div>
        <div className="relative flex h-[36px] w-1/4 mx-2 justify-center items-center border border-border3 rounded-lg text-[#42526E] hover:bg-p1 hover:text-p2 cursor-pointer">
          Users
        </div>
      </div>
      {/* third section */}
      <div className="w-full h-[48px] border-b border-border3 flex flex-row items-center justify-between">
        <div className="flex w-full items-center justify-between pr-2">
          <Checkbox color="success" size="small" />
          <p className="text-sm">Object Name</p>
          <p className="text-sm">Speed</p>
          <p className="text-sm">Last Update</p>
          <p className="text-sm">Status</p>
        </div>
      </div>
      {/* forth section */}
      <div className="pr-2 border-b border-border3">
        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex flex-row gap-6 items-center">
            <Checkbox color="success" size="small" />
            <p className="font-bold text-xs text-[#42526E]">NASAM Objects</p>
          </div>
          <img src="arrow-down.svg" className="mr-1" />
        </div>
      </div>
      {objectsData.map((object) => (
        <div
          key={object.id}
          className={`w-full h-[48px] flex flex-row items-center justify-between pr-2 gap-4 ${
            selectedObjectId === object.id ? "bg-p2" : ""
          }`}
        >
          <Checkbox
            color="success"
            size="small"
            checked={selectedObjectId === object.id}
            onChange={() => handleToggle(object.id)}
          />
          <div className="text-[14px] text-nowrap">{object.name}</div>
          <div className="text-[12px] text-nowrap">{object.speed}</div>
          <div className="flex-grow ml-2">
            <div className="text-sm">{object.lastUpdate.date}</div>
            <div className="text-sm text-gray-600">
              {object.lastUpdate.time}
            </div>
          </div>
          <div className="pr-2">
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full" />
          </div>
        </div>
      ))}
      {/* bottom section */}
      <button className="absolute bottom-1 right-1 rounded-full flex">
        <img src="refresh.png" alt="refresh" />
      </button>
    </div>
  );
};

export default ObjectsCard;
