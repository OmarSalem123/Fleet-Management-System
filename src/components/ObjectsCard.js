import React, { useState } from "react";
import Badges from "./Badges";
import Checkbox from "@mui/material/Checkbox";
import { formatDate } from "../utils";
import HistoryCard from "./HistoryCard";

const ObjectsCard = ({ devices, positions }) => {
  const [selectedObjectId, setSelectedObjectId] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleToggle = (id) => {
    setSelectedObjectId((prevId) => (prevId === id ? null : id));
  };

  const getDeviceInfo = (deviceId) => {
    const device = devices.find((device) => device.id === deviceId);
    return device
      ? { name: device.name, status: device.status }
      : { name: "Unknown Device", status: "Unknown" };
  };

  const toggleMinimized = () => {
    setIsMinimized((prevState) => !prevState);
  };

  if (isMinimized) {
    return (
      <button
        className="absolute top-[40%] left-4 bg-white p-4 rounded-xl shadow-lg flex items-center justify-center z-10"
        style={{ zIndex: 1000 }}
        onClick={toggleMinimized}
      >
        <span className="font-bold">Objects</span>
        <img
          src="arrow.svg"
          alt="arrow"
          className="cursor-pointer rotate-180 h-[28px]"
        />
      </button>
    );
  }

  return (
    <>
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
            <img
              src="arrow.svg"
              alt="arrow"
              className="cursor-pointer"
              onClick={toggleMinimized}
            />
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
          <div className="relative flex h-[36px] w-1/4 mx-2 justify-center items-center border border-border3 rounded-lg text-text4 hover:bg-p1 hover:text-p2 cursor-pointer">
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
              <p className="font-bold text-xs text-text4">NASAM Objects</p>
            </div>
            <img src="arrow-down.svg" className="mr-1" />
          </div>
        </div>
        {positions.map((position) => {
          const { formattedDate, formattedTime } = formatDate(
            position.deviceTime
          );
          const { name: deviceName, status: deviceStatus } = getDeviceInfo(
            position.deviceId
          );
          return (
            <div
              key={position.id}
              className={`w-full h-[48px] flex flex-row items-center justify-between pr-2 gap-7 ${
                selectedObjectId === position.id ? "bg-p2" : ""
              }`}
            >
              <Checkbox
                color="success"
                size="small"
                checked={selectedObjectId === position.id}
                onChange={() => handleToggle(position.id)}
              />
              <div className="flex flex-row w-full items-center">
                <div className="text-[14px] text-nowrap w-1/3">
                  {deviceName}
                </div>
                <div className="text-[12px] text-nowrap w-1/3 text-center">
                  {position.speed} km/h
                </div>
                <div className="flex-grow ml-2 text-center w-1/3">
                  <div className="text-sm">{formattedDate}</div>
                  <div className="text-sm text-[#7A869A]">{formattedTime}</div>
                </div>
              </div>
              <div className="pr-2">
                {deviceStatus === "online" ? (
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full" />
                ) : (
                  <span className="inline-block w-3 h-3 bg-red-500 rounded-full" />
                )}
              </div>
            </div>
          );
        })}
        {/* bottom section */}
        <button className="absolute bottom-1 right-1 rounded-full flex">
          <img src="refresh.png" alt="refresh" />
        </button>
      </div>

      {/* History Card section */}
      {selectedObjectId && (
        <HistoryCard setSelectedObjectId={setSelectedObjectId} />
      )}
    </>
  );
};

export default ObjectsCard;
