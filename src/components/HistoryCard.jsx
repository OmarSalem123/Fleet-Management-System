import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import Playback from "./Playback";
import { events } from "../constants";
import { fetchEvents } from "../actions";
import { ConfigProvider, DatePicker } from "antd";

const { RangePicker } = DatePicker;

const HistoryCard = ({
  setSelectedObjectId,
  selectedObjectId,
  devices,
  positions,
  setIsPlaybackOpen,
}) => {
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [activeTab, setActiveTab] = useState("history");
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState([]);

  const device = devices.find((device) => device.id === selectedObjectId);

  const handleClose = () => {
    setSelectedObjectId(null);
  };

  const handleToggle = (id) => {
    setSelectedHistoryId((prevId) => (prevId === id ? null : id));
  };

  const handleToggleEvent = (id) => {
    setSelectedEventId((prevId) => (prevId === id ? null : id));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = fetchEvents(device.id);
        setEvent("events: ", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [device.id]);

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
      <div className="w-full h-[48px] border-b border-border3 flex flex-row items-center justify-center">
        <ConfigProvider
          theme={{
            components: {
              DatePicker: {
                activeBorderColor: "#0F6936",
                cellActiveWithRangeBg: "#EEF6F0",
                cellHoverWithRangeBg: "#0F6936",
                cellRangeBorderColor: "#0F6936",
                hoverBorderColor: "#0F6936",
                cellHoverWithRangeBg: "#EEF6F0",
              },
            },
          }}
        >
          <RangePicker />
        </ConfigProvider>
      </div>
      <div className="w-full h-[48px] flex flex-row">
        <div
          className={`flex justify-center items-center w-1/2 border-b cursor-pointer p-1 ${
            activeTab === "history"
              ? "border-b-2 border-p3 text-p3"
              : "border-b border-border3 text-text4"
          }`}
          onClick={() => handleTabClick("history")}
        >
          History
        </div>
        <div
          className={`flex justify-center items-center w-1/2 border-b cursor-pointer p-1 ${
            activeTab === "events"
              ? "border-b-2 border-p3 text-p3"
              : "border-b border-border3 text-text4"
          }`}
          onClick={() => handleTabClick("events")}
        >
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
          <img src="arrow-down.svg" alt="arrow-down" className="mr-1" />
        </div>
      </div>
      {/* history details start here */}
      <div className={`${activeTab === "history" ? "" : "hidden"}`}>
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
              <p className="text-sm">6:00 PM</p>
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
              <p className="text-sm">9:00 PM</p>
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
      </div>
      {/* history details end here */}
      {/* Events details start here */}
      <div className={`my-2 ${activeTab === "events" ? "" : "hidden"}`}>
        <div className="max-h-[36px] ml-16 flex flex-row items-center gap-8">
          <div className="flex flex-row items-center gap-3">
            <img src="in.svg" alt="enter" className="w-[20px] h-[20px]" />
            <p>20</p>
          </div>
          <div className="flex flex-row items-center gap-3">
            <img src="out.svg" alt="out" className="w-[20px] h-[20px]" />
            <p>20</p>
          </div>
        </div>
        {events.map((event) => (
          <div
            key={event.id}
            className={`w-full h-[68px] flex flex-row items-center justify-between pr-2 gap-5 mt-2 ${
              selectedEventId === event.id ? "bg-p2" : ""
            }`}
          >
            <Checkbox
              color="success"
              size="small"
              checked={selectedEventId === event.id}
              onChange={() => handleToggleEvent(event.id)}
            />
            <div className="flex flex-col w-full">
              <p className="text-[14px] text-nowrap">{event.title}</p>
              <p className="text-[14px] text-nowrap text-[#7A869A]">
                {event.location}
              </p>
              <p className="text-[14px] text-nowrap text-[#7A869A]">
                {event.date}
              </p>
            </div>
            <img
              src={event.status === "enter" ? "in.svg" : "out.svg"}
              alt="status"
              className="mr-4"
            />
          </div>
        ))}
      </div>

      {/* Events details end here */}

      {/* Playback box */}
      {selectedHistoryId && (
        <Playback
          setSelectedHistoryId={setSelectedHistoryId}
          positions={positions}
          setIsPlaybackOpen={setIsPlaybackOpen}
        />
      )}
    </div>
  );
};

export default HistoryCard;
