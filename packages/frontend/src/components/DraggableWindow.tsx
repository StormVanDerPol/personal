import React from "react";
import { Draggable } from "./draggable-base";

const DraggableWindow = (props) => {
  const { children, ...otherProps } = props;

  return (
    <Draggable
      {...otherProps}
      snap
      gridSize={{ x: 32, y: 32 }}
      gridSpacing={{ x: 4, y: 4 }}
      transition="transform 0.5s ease"
      className="pt-5 bg-blue-800 border-2"
    >
      <div className="p-5 bg-blue-500">{children}</div>
    </Draggable>
  );
};

export default DraggableWindow;
