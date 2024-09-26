import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { formatDate } from "../utils";
import ObjectsCard from "../components/ObjectsCard";

const fetchVehiclePositions = async (deviceId, from, to) => {
  const url = "http://localhost:8082/api/positions";
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${btoa("admin:admin")}`,
      },
      params: {
        deviceId,
        from,
        to,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicle positions:", error);
    return [];
  }
};

const LiveTracking = ({ deviceId, startDate, endDate }) => {
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000);
  const [currentTime, setCurrentTime] = useState("");

  const customIcon = new Icon({
    iconUrl: "/vehicle.svg",
    iconSize: [38, 38],
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchVehiclePositions(deviceId, startDate, endDate);
      setPositions(data);
      setIsLoading(false);
    };
    fetchData();
  }, [deviceId, startDate, endDate]);

  useEffect(() => {
    let interval;
    if (isPlaying && positions.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % positions.length;
          setCurrentTime(formatDate(positions[nextIndex].fixTime));
          return nextIndex;
        });
      }, playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, positions, playbackSpeed]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsPlaying(false);
    setCurrentTime(formatDate(positions[0]?.fixTime));
  };

  if (isLoading) return <></>;

  return (
    <div className="relative">
      <MapContainer
        center={[positions[0]?.latitude, positions[0]?.longitude]}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {positions.map((position) => (
          <Marker
            key={position.id}
            position={[position.latitude, position.longitude]}
            icon={customIcon}
          >
            <Popup>{position.id}</Popup>
          </Marker>
        ))}
        <Polyline
          positions={positions.map((pos) => [pos.latitude, pos.longitude])}
        />
      </MapContainer>
      <ObjectsCard />
    </div>
  );
};

export default LiveTracking;
