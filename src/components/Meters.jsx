import React from "react";

const Meters = ({ selectedObjectId, devices }) => {
  const selectedDevice = devices.find(
    (device) => device.id === selectedObjectId
  );

  return (
    <div className="flex flex-col items-end">
      <div className="mt-4">
        <img src="speedmeter.png" alt="speed" />
      </div>
      <div className="mt-4">
        <img src="fuel.png" alt="speed" />
      </div>
      <div className="mt-4">
        <img src="rpm.png" alt="speed" />
      </div>
    </div>
  );
};

export default Meters;
