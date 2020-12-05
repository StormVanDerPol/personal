import React from "react";
import DraggableWindow from "./components/common/DraggableWindow";
import { Desktop } from "./components/templeOs";

export default function App() {
  return (
    <div className="relative m-5 w-96 h-96 bg-green-400 draw-grid-16">
      <DraggableWindow initialPosition={{ x: 250, y: 250 }} />
      {/* <Desktop /> */}
    </div>
  );
}
