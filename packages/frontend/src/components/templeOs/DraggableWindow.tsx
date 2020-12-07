import { checkInputBounds } from "arashi-utils";
import React, { useContext, useEffect } from "react";
import { useJankDrag, Position } from "../../hooks";
import { DesktopContext } from "./Desktop";

type DraggableWindowProps = {
  initialPosition?: Position;
  title?: string;
  children?: any;
  id: string;
  minimized?: boolean;
};

const DraggableWindow = ({
  initialPosition,
  title,
  children,
  id,
  minimized,
}: DraggableWindowProps) => {
  const { ref, node, lastPosition } = useJankDrag({
    initialPosition,
    orderZIndex: true,
  });

  const {
    minimizeWindow,
    removeWindow,
    activeWindowId,
    setActiveWindowId,
  } = useContext(DesktopContext);

  const active = id === activeWindowId;

  useEffect(() => {
    if (!node) return;
    const handleClickElsewhere = (e: MouseEvent & TouchEvent) => {
      if (checkInputBounds(e, node) && !minimized) setActiveWindowId(id);
    };
    node.offsetParent.addEventListener("mousedown", handleClickElsewhere);
    node.offsetParent.addEventListener("touchstart", handleClickElsewhere);
    return () => {
      node?.offsetParent?.removeEventListener(
        "mousedown",
        handleClickElsewhere
      );
      node?.offsetParent?.removeEventListener(
        "touchstart",
        handleClickElsewhere
      );
    };
  }, [node, activeWindowId, id]);

  return (
    <div
      ref={ref}
      className={`absolute border-holy-blue border-2 ${
        minimized ? "pointer-events-none overflow-hidden w-10 h-10" : ""
      }`}
    >
      <div
        className={`flex text-holy-white  ${
          active ? "bg-holy-blue text-holy-yellow" : "bg-holy-blue"
        } pointer-events-none`}
      >
        <h2 className="">{title || "unnamed window"}</h2>
        <button
          className="pointer-events-auto"
          type="button"
          onClick={() => minimizeWindow(id)}
        >
          [-]
        </button>
        <button
          className="pointer-events-auto"
          type="button"
          onClick={() => {
            removeWindow(id);
          }}
        >
          [x]
        </button>
      </div>

      <div className="bg-holy-white">
        <div>
          Position: {lastPosition.x} {lastPosition.y}
        </div>
        {minimized && <div>Minimized</div>}
        {children}
      </div>
    </div>
  );
};

export default DraggableWindow;
