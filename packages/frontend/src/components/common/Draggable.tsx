import React, { useRef } from "react";
import useDraggable from "../../hooks/useDraggable";

const Draggable = () => {
  const ref = useRef(null);
  const { active, position, setPosition } = useDraggable({
    initialPosition: { x: 0, y: 0 },
    ref: ref,
  });

  return (
    <div ref={ref} className="inline-block p-10 bg-pink-500">
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
