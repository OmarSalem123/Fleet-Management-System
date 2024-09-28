import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-p1 px-4 py-3 h-[50px]">
      <div className="flex flex-row gap-5">
        <img src="/VISTA.svg" alt="logo" width={84} height={40} />
        <div className="relative flex h-min w-[320px]">
          <div className="absolute left-[8px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer">
            <img src="/search.svg" alt="search" />
          </div>
          <input
            type="search"
            placeholder="Search for anything"
            className="w-full rounded border border-border1 bg-p1 p-2 pl-8 placeholder-[#B3BAC5] focus:border-transparent focus:outline-none"
          />
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="cursor-pointer">
          <img src="/alert.svg" alt="alert" />
        </div>
        <div className="cursor-pointer">
          <img src="/full-screen.svg" alt="full-screen" />
        </div>
        <div className="cursor-pointer">
          <img src="/avatar.png" alt="full-screen" width={40} height={40} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
