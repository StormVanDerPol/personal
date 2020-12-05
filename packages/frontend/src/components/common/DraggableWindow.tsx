import React from "react";
import { useDraggable, Position } from "../../hooks";

type DraggableWindowProps = {
  initialPosition?: Position;
  title?: string;
  onClose?: () => void;
  onMinimize?: () => void;
};

const DraggableWindow = ({
  initialPosition,
  title,
  onClose,
  onMinimize,
}: DraggableWindowProps) => {
  const { ref, setPosition } = useDraggable({
    initialPosition,
    orderZIndex: true,
  });

  return (
    <div ref={ref} className="absolute">
      <div className="flex bg-pink-600 pointer-events-none">
        <h2 className="">{title || "unnamed window"}</h2>
        <button
          className="pointer-events-auto"
          type="button"
          onClick={onMinimize}
        >
          [-]
        </button>
        <button className="pointer-events-auto" type="button" onClick={onClose}>
          [x]
        </button>
      </div>

      <div className="bg-green-600">content</div>
    </div>
  );
};

export default DraggableWindow;
