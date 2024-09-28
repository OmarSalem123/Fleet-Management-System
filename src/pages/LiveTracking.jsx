import React, { useEffect, useState } from "react";
import { fetchVehiclePositions, fetchDevices, fetchEvents } from "../actions";
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

const LiveTracking = ({ deviceId, startDate, endDate }) => {
  const [positions, setPositions] = useState([]);
  const [devices, setDevices] = useState([]);
  const [events, setEvents] = useState([]);
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
      try {
        const [positionsData, devicesData, eventsData] = await Promise.all([
          fetchVehiclePositions(deviceId, startDate, endDate),
          fetchDevices(),
          fetchEvents(),
        ]);

        setPositions(positionsData);
        setDevices(devicesData);
        setEvents(eventsData);
        console.log("events: ", eventsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
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
      <ObjectsCard positions={positions} devices={devices} />
    </div>
  );
};

export default LiveTracking;
