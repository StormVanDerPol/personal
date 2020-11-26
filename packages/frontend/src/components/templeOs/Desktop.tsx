import React, { createContext } from "react";
import { DragContainer } from "../../components/draggable-base";
import { DraggableWindow } from "../../components/templeOs";
import { useWindows } from "../../hooks";
import TaskBar from "./TaskBar";

export const DesktopContext = createContext({} as any);

export default function Desktop() {
  const { windows, addWindow, removeWindow, minimizeWindow } = useWindows();

  return (
    <DesktopContext.Provider
      value={{ windows, addWindow, removeWindow, minimizeWindow }}
    >
      <div className="relative w-screen h-screen flex flex-col bg-blue-300">
        <DragContainer className="overflow-hidden w-full flex-1 bg-green-400 draw-grid">
          {windows.map((props) => {
            const { title, children, key, ...otherProps } = props;

            return (
              // eslint-disable-next-line react/jsx-key
              <DraggableWindow
                title={title}
                key={key}
                _key={key}
                {...otherProps}
              >
                {children}
              </DraggableWindow>
            );
          })}
        </DragContainer>

        <TaskBar />
      </div>
    </DesktopContext.Provider>
  );
}
