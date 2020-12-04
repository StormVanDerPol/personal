import React from "react";
import useDraggable from "../../hooks/useDraggable";

const Draggable = ({ initialPosition = { x: 0, y: 0 } }) => {
  const { ref, setPosition } = useDraggable(initialPosition, true);

  return (
    <div ref={ref} className="inline-block p-10 border bg-pink-500 absolute">
      <button
        onMouseDown={() => {
          setPosition({ x: 10, y: 100 });
        }}
      >
        oh ye
      </button>
    </div>
  );
};

export default Draggable;
