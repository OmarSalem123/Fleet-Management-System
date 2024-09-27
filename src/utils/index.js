export const formatDate = (date) => {
  const d = new Date(date);
  const formattedDate = d.toLocaleDateString("en-GB");
  const formattedTime = d.toLocaleTimeString("en-GB", { hour12: false });
  return { formattedDate, formattedTime };
};
