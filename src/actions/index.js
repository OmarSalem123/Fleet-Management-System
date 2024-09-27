import axios from "axios";

export const fetchVehiclePositions = async (deviceId, from, to) => {
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

export const fetchDevices = async () => {
  const url = "http://localhost:8082/api/devices";
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${btoa("admin:admin")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching devices:", error);
    return [];
  }
};
