export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleString("en-GB", { hour12: false });
};
