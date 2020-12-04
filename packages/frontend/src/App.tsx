import React, { useCallback, useRef } from "react";
import Draggable from "./components/common/Draggable";
import { Desktop } from "./components/templeOs";

export default function App() {
  const ref = useCallback((node) => console.log(node), []);

  return (
    <div ref={ref} className="m-5 relative w-96 h-96 bg-green-400">
      <Draggable initialPosition={{ x: 250, y: 250 }} />
      <Draggable />
      <Draggable />
      {/* <Desktop /> */}
    </div>
  );
}
