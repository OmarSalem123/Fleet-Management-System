import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FaPlay, FaPause } from "react-icons/fa";

const Playback = ({ setSelectedHistoryId, positions, setIsPlaybackOpen }) => {
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState("");

  const handlePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const handleChangeSpeed = (event) => {
    setSpeed(event.target.value);
  };

  const handleClosePlayback = () => {
    setSelectedHistoryId(null);
    setIsPlaying(false);
  };

  useEffect(() => {
    setIsPlaybackOpen(true);
    return () => {
      setIsPlaybackOpen(false);
    };
  }, [setIsPlaybackOpen]);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTimeIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % positions.length;
          setCurrentTime(positions[nextIndex].fixTime);
          return nextIndex;
        });
      }, 1000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, positions]);

  return (
    <div
      className="absolute top-0 left-[380px] bg-white w-[306px] h-[44px] rounded-xl shadow-lg z-10 max-md:left-4 max-md:top-[660px]"
      style={{ zIndex: 1000 }}
    >
      <div className="flex flex-row items-center h-full mx-2 gap-3">
        <h3 className="text-xs font-bold">10.12.2023</h3>
        <p className="text-xs font-bold">04:20:24</p>
        <div className="cursor-pointer" onClick={handlePlayPause}>
          {isPlaying ? <FaPause color="#2E9245" /> : <FaPlay color="#2E9245" />}
        </div>
        <div className="min-w-[80px]">
          <FormControl
            variant="standard"
            className="bg-[#F4F5F7] border-1 border-p2 rounded-lg"
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={speed}
              label="speed"
              onChange={handleChangeSpeed}
              className="px-2"
            >
              <MenuItem value={0.5}>x0.5</MenuItem>
              <MenuItem value={1}>x1</MenuItem>
              <MenuItem value={1.5}>x1.5</MenuItem>
              <MenuItem value={1.75}>x1.75</MenuItem>
              <MenuItem value={2}>x2</MenuItem>
            </Select>
          </FormControl>
        </div>
        <img
          src="close.svg"
          alt="close"
          className="cursor-pointer"
          onClick={handleClosePlayback}
        />
      </div>
    </div>
  );
};

export default Playback;
