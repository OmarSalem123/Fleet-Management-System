import React from "react";
import Checkbox from "@mui/material/Checkbox";

const HistoryCard = ({ setSelectedObjectId }) => {
  const handleToggle = () => {
    setSelectedObjectId(null);
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
          <img src="close.svg" alt="close" className="cursor-pointer" onClick={handleToggle} />
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
            <p className="text-sm">My Phone</p>
          </div>
          <img src="arrow-down.svg" className="mr-1" />
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
