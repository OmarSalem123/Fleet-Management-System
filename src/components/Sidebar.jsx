import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { sidebarData } from "../constants";

const Sidebar = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const isActive = (url) => location.pathname === url;

  const dropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  return (
    <div
      className={`fixed flex flex-col justify-between shadow-xl transition-all duration-300 h-full z-40 overflow-auto bg-p1 border border-border2 max-md:hidden ${
        sidebarCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex h-[100%] w-full flex-col justify-start">
        <div className="z-50 flex min-h-[56px] items-center justify-between px-2 pt-3">
          {!sidebarCollapsed && (
            <h1 className="text-[16px] font-bold text-text2">VISTA TRACKING</h1>
          )}
          <div
            className="cursor-pointer py-3"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <img
              src="/Collapse.svg"
              alt="arrow"
              className={`${sidebarCollapsed ? "rotate-180" : ""}`}
            />
          </div>
        </div>
        <div className="h-full">
          <ul class="space-y-2 font-medium">
            {sidebarData.map((item, index) => (
              <li key={index}>
                {item.sublinks ? (
                  <div>
                    <div
                      className="flex items-center mx-2 p-2 text-text1 rounded-lg hover:bg-P3 hover:text-text2 group"
                      onClick={() => dropdown(index)}
                    >
                      <img src={item.image} alt={item.title} />
                      {!sidebarCollapsed && (
                        <>
                          <span className="ms-3">{item.title}</span>
                          <img
                            src="/dropdown.svg"
                            alt="dropdown"
                            className={`ml-auto ${
                              activeDropdown === index ? "rotate-180" : ""
                            }`}
                          />
                        </>
                      )}
                    </div>

                    {activeDropdown === index && (
                      <ul className="ml-6 space-y-1">
                        {item.sublinks.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <a
                              href={subItem.url}
                              className="flex items-center mx-2 p-2 text-text1 rounded-lg hover:bg-P3 hover:text-text2 group"
                            >
                              {!sidebarCollapsed && (
                                <span className="ms-3">{subItem.title}</span>
                              )}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.url}
                    className={`flex items-center mx-2 p-2 rounded-lg group ${
                      isActive(item.url)
                        ? "bg-P3 text-text2"
                        : "text-text1 hover:bg-P3 hover:text-text2"
                    }`}
                  >
                    <img src={item.image} alt={item.title} />
                    {!sidebarCollapsed && (
                      <span className="ms-3">{item.title}</span>
                    )}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
