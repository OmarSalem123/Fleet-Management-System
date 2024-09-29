import React, { useEffect, useState } from "react";
import { fetchVehiclePositions, fetchDevices } from "../actions";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import ObjectsCard from "../components/ObjectsCard";
import Meters from "../components/Meters";

const LiveTracking = ({ deviceId, startDate, endDate }) => {
  const [positions, setPositions] = useState([]);
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedObjectId, setSelectedObjectId] = useState(null);
  const [isPlaybackOpen, setIsPlaybackOpen] = useState(false);

  const customIcon = new Icon({
    iconUrl: "/vehicle.svg",
    iconSize: [38, 38],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [positionsData, devicesData] = await Promise.all([
          fetchVehiclePositions(deviceId, startDate, endDate),
          fetchDevices(),
        ]);

        setPositions(positionsData);
        setDevices(devicesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [deviceId, startDate, endDate]);

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
      <ObjectsCard
        positions={positions}
        devices={devices}
        setSelectedObjectId={setSelectedObjectId}
        selectedObjectId={selectedObjectId}
        setIsPlaybackOpen={setIsPlaybackOpen}
      />

      {/* Right sidebar */}
      <div
        className="absolute top-4 right-4 h-screen z-10 max-md:hidden"
        style={{ zIndex: 1000 }}
      >
        <div
          className={`flex ${
            isPlaybackOpen ? "flex-col items-end" : "flex-row"
          }`}
        >
          <img
            src="1.svg"
            alt="nav"
            className="cursor-pointer w-[56px] h-[56px]"
          />
          <img
            src="2.svg"
            alt="nav"
            className="cursor-pointer w-[56px] h-[56px]"
          />
          <img
            src="3.svg"
            alt="nav"
            className="cursor-pointer w-[56px] h-[56px]"
          />
        </div>
        {selectedObjectId && (
          <Meters selectedObjectId={selectedObjectId} devices={devices} />
        )}
      </div>
      <div
        className="absolute bottom-16 right-4 z-10 flex flex-col w-full items-end"
        style={{ zIndex: 1000 }}
      >
        <img
          src="4.svg"
          alt="nav"
          className="cursor-pointer w-[56px] h-[56px]"
        />
        <img
          src="5.svg"
          alt="nav"
          className="cursor-pointer w-[56px] h-[56px]"
        />
        <img
          src="6.svg"
          alt="nav"
          className="cursor-pointer w-[56px] h-[56px] "
        />
        <img
          src="7.svg"
          alt="nav"
          className="cursor-pointer w-[56px] h-[56px] "
        />
      </div>
    </div>
  );
};

export default LiveTracking;
