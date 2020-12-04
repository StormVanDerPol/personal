import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Position = {
  x: number;
  y: number;
};

const DraggablesContext = createContext([]);

const range = (value, min, max) => {
  console.log("value", value, "min", min, "max", max);
  return value < min ? min : value > max ? max : value;
};

const useDraggable = (initialPosition?, orderZIndex?) => {
  const draggables = useContext(DraggablesContext);
  const [draggable, setDraggable] = useState(null);
  const [lastPosition, setLastPosition] = useState<Position>(
    initialPosition || { x: 0, y: 0 }
  );
  const [active, setActive] = useState<boolean>(false);

  const callbackRef = useCallback((node) => setDraggable(node), []);

  const setTransform = useCallback(
    (targetPosition: Position) => {
      if (!draggable) return;

      const { x, y } = targetPosition;
      draggable.style.transform = `translate(${x}px, ${y}px)`;
    },
    [draggable]
  );

  const setZIndex = () => {
    if (!draggable) return;

    const highestZIndex = Math.max(
      ...draggables.map((d) => Number(d.style.zIndex))
    );

    if (draggable.style.zIndex != highestZIndex)
      draggable.style.zIndex = highestZIndex + 1;

    if (highestZIndex > draggables.length - 1) {
      draggables.forEach((d) => {
        d.style.zIndex = d.style.zIndex - 1;
      });
    }
  };

  //Init
  useEffect(() => {
    if (!draggable) return;
    draggables.push(draggable);

    console.log(draggables);

    if (orderZIndex)
      draggables.forEach((d, i) => {
        d.style.zIndex = i;
      });

    if (initialPosition) setPosition(initialPosition);
  }, [draggable]);

  //HANDLERS
  useEffect(() => {
    if (!draggable) return;

    const handleDragStart = (e: MouseEvent): void => {
      if (draggable !== e.target) return;

      draggable.initialPositionX = 0;
      draggable.initialPositionY = 0;

      draggable.initialPositionX = e.clientX - lastPosition.x;
      draggable.initialPositionY = e.clientY - lastPosition.y;

      if (orderZIndex) setZIndex();

      setActive(true);
    };

    draggable.addEventListener("mousedown", handleDragStart);

    return () => {
      draggable.removeEventListener("mousedown", handleDragStart);
    };
  }, [draggable, lastPosition]);

  useEffect(() => {
    const handleDrag = (e: MouseEvent): void => {
      e.preventDefault();
      if (!active || !draggable) return;

      const parentNodeRect: DOMRect = draggable.offsetParent.getBoundingClientRect();

      console.log(e.clientX, e.clientY);

      draggable.currentX = range(
        e.clientX - draggable.initialPositionX,
        0,
        parentNodeRect.width - draggable.offsetWidth
      );
      draggable.currentY = range(
        e.clientY - draggable.initialPositionY,
        0,
        parentNodeRect.height - draggable.offsetHeight
      );

      setTransform({ x: draggable.currentX, y: draggable.currentY });
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
  }, [active, setTransform, draggable]);

  //Changing position
  const setPosition = (position) => {
    setLastPosition(position);
    setTransform(position);
  };

  return { ref: callbackRef, active, position: lastPosition, setPosition };
};

export default useDraggable;
