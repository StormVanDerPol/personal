import React, { useContext } from "react";
import { DesktopContext } from "./Desktop";

const TaskBar = ({ className }) => {
  const { windows, addWindow, minimizeWindow } = useContext(DesktopContext);

  console.log(windows);

  return (
    <div className={`${className || ""} flex overflow-hidden`}>
      <button
        className="p-2 mr-2"
        onClick={() =>
          addWindow({
            title: "Test",
            children: <span>I tried my best</span>,
          })
        }
      >
        Add
      </button>

      {windows?.map((window) => {
        const { title, key, minimized } = window;
        return (
          <button
            onClick={(e) => {
              e.preventDefault();
              minimizeWindow(key);
            }}
            className={`${
              minimized ? "bg-green-700" : "bg-green-900"
            } transition-color text-white py-2 px-4 rounded-sm mr-2`}
            key={`minimize-${key}`}
            {...window}
          >
            {title}
          </button>
        );
      }) || location.reload()}
    </div>
  );
};

export default TaskBar;
