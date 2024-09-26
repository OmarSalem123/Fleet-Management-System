import React from "react";

const Badges = ({ children, color }) => {
  const badgeStyles = {
    blue: "bg-blue-100 text-blue-800",
    dark: "bg-gray-100 text-gray-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    indigo: "bg-indigo-100 text-indigo-800",
  };

  const style = badgeStyles[color] || "bg-gray-100 text-gray-800";

  return (
    <span
      className={`${style} inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10`}
    >
      {children}
    </span>
  );
};

export default Badges;
