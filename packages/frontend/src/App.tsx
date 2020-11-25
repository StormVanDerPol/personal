import React, { useState } from "react";
import { DragContainer } from "./components/draggable-base";
import DraggableWindow from "./components/DraggableWindow";

export default function App() {
  const [windows, setWindows] = useState([
    { title: "title", content: <span>hello there</span> },
    { title: "title", content: <span>hello there</span> },
    {
      title: "title",
      content: (
        <DragContainer className="w-40 h-40 bg-red-400">
          <DraggableWindow>
            <span>hey</span>
          </DraggableWindow>
        </DragContainer>
      ),
    },
  ]);

  return (
    <div className=" bg-blue-300">
      <DragContainer className="w-screen h-screen overflow-hidden bg-green-400">
        {windows.map((w) => (
          <DraggableWindow>{w.content}</DraggableWindow>
        ))}
      </DragContainer>
    </div>
  );
}
