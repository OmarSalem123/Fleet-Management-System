import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import Playback from "./Playback";

const HistoryCard = ({
  setSelectedObjectId,
  selectedObjectId,
  devices,
  positions,
}) => {
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);

  const device = devices.find((device) => device.id === selectedObjectId);

  const handleClose = () => {
    setSelectedObjectId(null);
  };

  const handleToggle = (id) => {
    setSelectedHistoryId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div
      className="absolute top-4 left-[400px] bg-white w-[368px] h-[640px] rounded-xl shadow-lg z-10"
      style={{ zIndex: 1000 }}
    >
      {/* first section */}
      <div className="w-full h-[48px] border-b border-border3 flex flex-row items-center justify-between">
        <div className="flex ml-2 flex-row gap-2">
          <img
            src="arrow.svg"
            alt="arrow"
            className="cursor-pointer h-[28px]"
          />
          <h2 className="font-bold">History</h2>
        </div>
        <div className="flex mr-2 h-[28px] gap-2">
          <img src="download.svg" alt="download" className="cursor-pointer" />
          <img
            src="full-screen2.svg"
            alt="full-screen2"
            className="cursor-pointer"
          />
          <img
            src="close.svg"
            alt="close"
            className="cursor-pointer"
            onClick={handleClose}
          />
        </div>
      </div>
      {/* second section */}
      <div className="w-full h-[48px] border-b border-border3 flex flex-row items-center justify-between"></div>
      <div className="w-full h-[48px] flex flex-row">
        <div
          className={`flex justify-center items-center text-p3 w-1/2 border-b-2 border-p3 cursor-pointer p-1`}
        >
          History
        </div>
        <div className="flex justify-center items-center text-text4 w-1/2 border-b border-border3 cursor-pointer p-1">
          Events
        </div>
      </div>
      {/* Card Body */}
      <div className="pr-2">
        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex flex-row gap-6 items-center">
            <Checkbox color="success" size="small" />
            <p className="text-sm">{device.name}</p>
          </div>
          <img src="arrow-down.svg" className="mr-1" />
        </div>
      </div>
      {/* trip details start here */}
      <div
        className={`flex flex-row justify-center items-center min-h-[193px] w-full mt-2 ${
          selectedHistoryId === 1 ? "bg-p2" : ""
        }`}
      >
        <div className="relative flex flex-col justify-center items-center w-1/5">
          <div className="flex items-center justify-center">
            <img src="drive.svg" alt="drive" />
          </div>
          <div
            className="absolute left-[50%] top-[35px] w-[2px] bg-gray-300"
            style={{ height: "200px" }}
          />
        </div>

        <div className="flex flex-col justify-start items-center w-1/4">
          <div className="flex flex-col items-center">
            <p className="text-sm">6:00PM</p>
            <p className="text-sm">24.4.2023</p>
          </div>
          <div className="my-6">
            <Checkbox
              color="success"
              size="small"
              checked={selectedHistoryId === 1}
              onChange={() => handleToggle(1)}
            />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm">6:00PM</p>
            <p className="text-sm">24.4.2023</p>
          </div>
        </div>
        <div className="flex justify-center items-center w-8">
          <img src="vertical_line.svg" alt="vertical" />
        </div>
        <div className="flex flex-col justify-start items-center w-full px-2">
          <p className="text-sm">
            Start address Start address Start address Start address Start
            address Start address
          </p>
          <div className="grid grid-cols-2 w-full py-2">
            <div className="flex flex-row items-center h-[20px] gap-2">
              <img src="right_direction.svg" alt="right_direction" />
              <p className="text-xs">
                <span className="font-bold">120.2</span> km
              </p>
            </div>
            <div className="flex flex-row items-center h-[20px] gap-2">
              <img src="fuel.svg" alt="fuel" />
              <p className="text-xs">
                <span className="font-bold">4.1</span> L
              </p>
            </div>
            <div className="flex flex-row items-center h-[20px] gap-2 mt-2">
              <img src="timeline.svg" alt="timeline" />
              <p className="text-xs">
                <span className="font-bold">8</span> h
              </p>
            </div>
          </div>
          <p className="text-sm">
            End address End address End address End address End address End
            address
          </p>
        </div>
      </div>
      {/* trip details end here */}
      <div
        className={`flex flex-row justify-center items-center min-h-[116px] w-full mt-2`}
      >
        <div className="relative flex flex-col justify-center items-center w-1/6">
          <div className="flex items-center justify-center">
            <img src="park.svg" alt="drive" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full px-2">
          <p className="text-sm">
            Łokciowa, 2, Zawady, Warsaw, Masovian Voivodeship, Poland, 02-989{" "}
          </p>
          <div className="grid grid-cols-2 w-full">
            <div className="flex flex-row items-center h-[20px] gap-2 mt-2">
              <img src="timeline.svg" alt="timeline" />
              <p className="text-xs">
                <span className="font-bold">8</span> h
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Playback box */}
      {selectedHistoryId && (
        <Playback setSelectedHistoryId={setSelectedHistoryId} />
      )}
    </div>
  );
};

export default HistoryCard;
