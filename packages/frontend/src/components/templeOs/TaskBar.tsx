import React, { useContext } from "react";

import { DesktopContext } from "./Desktop";

const TaskBarItem = ({
  window: w,
  activeWindowId,
  setActiveWindowId,
  minimizeWindow,
}) => {
  return (
    <button
      onClick={() => {
        if (w.id !== activeWindowId && !w.minimized) {
          setActiveWindowId(w.id);
        } else minimizeWindow(w.id);
      }}
      type="button"
      className={`mr-1 border-2 ${
        w.minimized
          ? "bg-holy-blue"
          : `${
              w.id === activeWindowId
                ? "bg-holy-blue border-holy-yellow text-holy-yellow"
                : "bg-holy-blue border-holy-white text-holy-white "
            }`
      }`}
    >
      {w.title || "untitled"}
    </button>
  );
};

type TaskBarProps = {
  className: string;
};

const TaskBar = ({ className }: TaskBarProps) => {
  const {
    windows,
    addWindow,
    minimizeWindow,
    activeWindowId,
    setActiveWindowId,
  } = useContext(DesktopContext);

  return (
    <div
      className={`${
        className || ""
      } relative flex bg-holy-blue overflow-hidden`}
    >
      <button
        type="button"
        className="p-2 mr-2"
        onClick={() => addWindow({}, true)}
      >
        Add
      </button>
      {windows?.map((w) => (
        <TaskBarItem
          key={w.id}
          window={w}
          activeWindowId={activeWindowId}
          setActiveWindowId={setActiveWindowId}
          minimizeWindow={minimizeWindow}
        />
      ))}
    </div>
  );
};

export default TaskBar;
