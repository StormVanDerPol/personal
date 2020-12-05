import { range } from "arashi-utils";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Position = {
  x: number;
  y: number;
};

type InputEvent = MouseEvent & TouchEvent;

export type Draggable = HTMLElement & {
  initialPosition: Position;
  currentPosition: Position;
};

export type SnapConfig = {
  enabled?: boolean;
  gridSize?: { width: number; height: number };
  gridSpacing?: { width: number; height: number };
  transition?: string;
};

type useDraggableConfig = {
  initialPosition?: Position;
  orderZIndex?: boolean;
  snapConfig?: SnapConfig;
};

const DraggablesContext = createContext<Draggable[]>([]);

/**
 * A hook that returns a ref object which when attached to a node makes it draggable
 * @returns ref, active, position, setPosition
 * @property {Position} initialPosition
 * @property {boolean} orderZIndex order by z-index on position change.
 *
 * -- snap config --
 * @property {boolean} enabled
 * @property {width: number, height: number} gridSize
 * @property {width: number, height: number} gridSpacing
 * @property {string} transition
 */

const useDraggable = ({
  initialPosition,
  orderZIndex,
  snapConfig,
}: useDraggableConfig) => {
  const draggables = useContext(DraggablesContext);

  const [draggable, setDraggable] = useState<Draggable>(null);
  const [lastPosition, setLastPosition] = useState<Position>(
    initialPosition || { x: 0, y: 0 }
  );
  const [active, setActive] = useState<boolean>(false);

  const callbackRef = useCallback(
    (node: Draggable): void => setDraggable(node),
    []
  );

  const setTransform = useCallback(
    (targetPosition: Position) => {
      if (!draggable) return;

      const { x, y } = targetPosition;
      draggable.style.transform = `translate(${x}px, ${y}px)`;
    },
    [draggable]
  );

  const setPosition = (position: Position): void => {
    setLastPosition(position);
    setZIndex();
    setTransform(position);
  };
  const setZIndex = (): void => {
    if (!draggable || !orderZIndex) return;
    draggable.style.zIndex = (
      Math.max(...draggables.map((d) => Number(d.style.zIndex))) + 1
    ).toString();
  };
  const snapToGrid = (): void => {
    if (!snapConfig?.enabled) return;

    const { gridSize, gridSpacing, transition } = snapConfig;

    const endPosition: Position = {
      x:
        Math.round(draggable.currentPosition.x / gridSize?.width || 1) *
        ((gridSize?.width || 1) + (gridSpacing?.width || 0)),
      y:
        Math.round(draggable.currentPosition.y / gridSize?.height || 1) *
        ((gridSize?.height || 1) + (gridSpacing?.height || 0)),
    };

    setTransform(endPosition);

    if (!transition) {
      setLastPosition(endPosition);
      return;
    }

    draggable.style.transition = transition;

    const endTransition = () => {
      setLastPosition(endPosition);
      draggable.style.transition = null;
      draggable.removeEventListener("transitionend", endTransition);
    };
    draggable.addEventListener("transitionend", endTransition);
  };

  useEffect((): void => {
    if (!draggable) return;
    draggables.push(draggable);

    orderZIndex &&
      draggables.forEach((d, index) => {
        d.style.zIndex = index.toString();
      });

    initialPosition && setPosition(initialPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draggable]);

  //HANDLERS
  //drag start
  useEffect(() => {
    if (!draggable) return;

    const handleDragStart = (e: InputEvent): void => {
      if (draggable !== e.target) return;

      const isTouch = e.type === "touchstart";

      draggable.initialPosition = {
        x: (isTouch ? e.touches[0].clientX : e.clientX) - lastPosition.x,
        y: (isTouch ? e.touches[0].clientY : e.clientY) - lastPosition.y,
      };

      setZIndex();

      setActive(true);
    };

    draggable.addEventListener("mousedown", handleDragStart);
    draggable.addEventListener("touchstart", handleDragStart);

    return () => {
      draggable.removeEventListener("mousedown", handleDragStart);
      draggable.removeEventListener("touchstart", handleDragStart);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draggable, lastPosition]);
  //drag, drag end
  useEffect(() => {
    const handleDrag = (e: InputEvent): void => {
      e.preventDefault();
      if (!active || !draggable) return;

      const parentNodeRect: DOMRect = draggable.offsetParent.getBoundingClientRect();

      const isTouch = e.type === "touchmove";

      draggable.currentPosition = {
        x: range(
          (isTouch ? e.touches[0].clientX : e.clientX) -
            draggable.initialPosition.x,
          0,
          parentNodeRect.width - draggable.offsetWidth
        ),
        y: range(
          (isTouch ? e.touches[0]?.clientY : e.clientY) -
            draggable.initialPosition.y,
          0,
          parentNodeRect.height - draggable.offsetHeight
        ),
      };

      setTransform({
        x: draggable.currentPosition.x,
        y: draggable.currentPosition.y,
      });
    };

    const handleDragEnd = (): void => {
      setActive(false);
      snapToGrid();
      if (!snapConfig?.enabled)
        setLastPosition({
          x: draggable.currentPosition.x,
          y: draggable.currentPosition.y,
        });
    };

    if (active && window) {
      window.addEventListener("mousemove", handleDrag);
      window.addEventListener("touchmove", handleDrag, { passive: false });
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchend", handleDragEnd);
    }

    return () => {
      if (active && window) {
        window.removeEventListener("mousemove", handleDrag);
        window.removeEventListener("touchmove", handleDrag);
        window.removeEventListener("mouseup", handleDragEnd);
        window.removeEventListener("touchend", handleDragEnd);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, setTransform, draggable]);

  return { ref: callbackRef, active, position: lastPosition, setPosition };
};

export default useDraggable;
