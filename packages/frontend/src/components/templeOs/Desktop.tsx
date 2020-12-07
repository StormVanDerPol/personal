import React, { createContext } from "react";
import DraggableWindow from "./DraggableWindow";
import { useWindows, useWindowsTypes } from "../../hooks";
import TaskBar from "./TaskBar";
import StatusBar from "./StatusBar";

export const DesktopContext = createContext({} as useWindowsTypes);

export default function Desktop() {
  const {
    windows,
    addWindow,
    removeWindow,
    minimizeWindow,
    activeWindowId,
    setActiveWindowId,
  } = useWindows();

  return (
    <DesktopContext.Provider
      value={{
        windows,
        addWindow,
        removeWindow,
        minimizeWindow,
        activeWindowId,
        setActiveWindowId,
      }}
    >
      <div className="flex h-screen flex-col mx-auto">
        <StatusBar />
        <div className="relative overflow-hidden flex-1 bg-holy-white">
          {windows?.map((props) => {
            const { title, children, id, ...otherProps } = props;
            return (
              // eslint-disable-next-line react/jsx-key
              <DraggableWindow title={title} key={id} id={id} {...otherProps}>
                {children}
              </DraggableWindow>
            );
          })}
        </div>

        <TaskBar />
      </div>
    </DesktopContext.Provider>
  );
}
