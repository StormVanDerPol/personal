import { useCallback, useEffect, useState } from "react";

type Position = {
  x: number;
  y: number;
};

type UseDraggableConfig = {
  initialPosition?: Position;
  ref: any;
};

const useDraggable = (config: UseDraggableConfig) => {
  const { initialPosition, ref } = config;

  //Bind ref hack
  const [draggable, setDraggable] = useState(null);
  useEffect(() => {
    if (ref.current) setDraggable(ref.current);
  }, [ref]);

  const [lastPosition, setLastPosition] = useState<Position>(initialPosition);

  const [active, setActive] = useState<boolean>(false);

  const changePosition = useCallback(
    (targetPosition: Position) => {
      const { x, y } = targetPosition;
      draggable.style.transform = `translate(${x}px, ${y}px)`;
    },
    [draggable]
  );

  //HANDLERS
  useEffect(() => {
    const handleDragStart = (e: MouseEvent): void => {
      console.log("start", draggable, e.target);

      if (draggable !== e.target) return;

      draggable.initialPositionX = initialPosition.x;
      draggable.initialPositionY = initialPosition.y;

      draggable.initialPositionX = e.clientX - lastPosition.x;
      draggable.initialPositionY = e.clientY - lastPosition.y;

      setActive(true);
    };

    if (draggable) draggable.addEventListener("mousedown", handleDragStart);

    return () => {
      if (draggable)
        draggable.removeEventListener("mousedown", handleDragStart);
    };
  }, [draggable, initialPosition, lastPosition]);

  useEffect(() => {
    const handleDrag = (e: MouseEvent): void => {
      e.preventDefault();

      if (!active || !draggable) return;

      draggable.currentX = e.clientX - draggable.initialPositionX;
      draggable.currentY = e.clientY - draggable.initialPositionY;

      changePosition({ x: draggable.currentX, y: draggable.currentY });
    };

    const handleDragEnd = (): void => {
      setActive(false);
      setLastPosition({ x: draggable.currentX, y: draggable.currentY });
    };

    if (active && window) {
      window.addEventListener("mousemove", handleDrag);
      window.addEventListener("mouseup", handleDragEnd);
    }

    return () => {
      if (active && window) {
        window.removeEventListener("mousemove", handleDrag);
        window.removeEventListener("mouseup", handleDragEnd);
      }
    };
  }, [active, changePosition, draggable]);

  //
  const setPosition = (position) => {
    setLastPosition(position);
    changePosition(position);
  };

  return { active, position: lastPosition, setPosition };
};

export default useDraggable;
