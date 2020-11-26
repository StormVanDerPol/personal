import React, { useContext, useEffect, useRef, useState } from "react";
import { Draggable } from "../draggable-base";
import { DesktopContext } from "./Desktop";

const DraggableWindow = (props) => {
  const {
    title,
    children,
    outerClassName,
    innerClassName,
    minimized,
    _key: key,
    ...otherProps
  } = props;

  const { removeWindow } = useContext(DesktopContext);

  console.log(`draggable window - ${key} UPDATED`);

  return (
    <Draggable
      // ref={ref}
      {...otherProps}
      snap
      gridSize={{ x: 64, y: 64 }}
      transition="transform 0.75s ease"
      className={`bg-blue-800 border-2 rounded-md transition-opacity ${
        minimized ? "opacity-0 pointer-events-none" : ""
      } ${outerClassName || ""} overflow-hidden`}
    >
      <div className="flex pointer-events-none justify-between">
        <h3 className="p-2">{title}</h3>
        <button
          onMouseDown={() => removeWindow(key)}
          className={`${
            minimized ? "pointer-events-none" : "pointer-events-auto"
          }`}
        >
          close
        </button>
      </div>

      <div className={`p-5 bg-blue-500 ${innerClassName || ""}`}>
        {children}
      </div>
    </Draggable>
  );
};

export default DraggableWindow;
