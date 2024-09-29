import axios from "axios";

export const fetchVehiclePositions = async (deviceId, from, to) => {
  const url = `${process.env.REACT_APP_API_URL}/positions`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${btoa(
          `${process.env.REACT_APP_API_CREDENTIALS}`
        )}`,
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
  const url = `${process.env.REACT_APP_API_URL}/devices`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${btoa(
          `${process.env.REACT_APP_API_CREDENTIALS}`
        )}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching devices:", error);
    return [];
  }
};

export const fetchEvents = async (id) => {
  const url = `${process.env.REACT_APP_API_URL}/events/${id}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${btoa(
          `${process.env.REACT_APP_API_CREDENTIALS}`
        )}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching devices:", error);
    return [];
  }
};
