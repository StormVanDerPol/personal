import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type DraggableProps = {
  children?: any;
  className?: string;
  container?: HTMLDivElement;
  canDragOnContent?: boolean;
  initialPosition?: { x: number; y: number };
  index?: number;
  snap?: boolean;
  gridSize?: { x: number; y: number };
  gridSpacing?: { x: number; y: number };
  transition?: string;
  isDraggingClassName?: string;
};

/**
 * Draggable, requires to be wrapped by DragContainer
 * @prop  {HTMLDivElement} container - used to access the parent <DragContainer/>
 * @prop  {boolean} canDragOnContent - if true allows drag to activate when content is pressed
 * @prop  {x: number; y: number} initialPosition - Offsets position initially, changes will update position.
 * @prop  {boolean} snap - if true snaps element to grid using a transition
 * @prop  {x: number; y: number} gridSize - Functionally defaults to the size of the element
 * @prop  {x: number; y: number} gridSpacing - Space between cells, defaults to 0
 * @prop  {string} transition - Snap transition override
 * @prop  {string} isDraggingClassName - CSS Classes appended while dragging.
 */

const Draggable = forwardRef(
  (
    {
      className,
      children,
      container,
      canDragOnContent,
      initialPosition = { x: 0, y: 0 },
      index,
      snap,
      gridSize,
      gridSpacing,
      transition,
      isDraggingClassName,
    }: DraggableProps,
    givenRef: any
  ) => {
    const localRef = useRef(null);

    const draggableRef = givenRef || localRef;

    const [draggable, setDraggable] = useState(null);

    const [position, setPosition] = useState(initialPosition);

    //Store ref
    useEffect(() => {
      setDraggable(draggableRef.current);
    }, [draggableRef]);

    const containerChildren: HTMLElement[] = [].slice.call(container?.children);

    // Sets initial z index
    useEffect(() => {
      if (draggable) draggable.style.zIndex = index.toString();
    }, [draggable, index]);

    //Uses CSS to change position of element.
    const changePosition = useCallback(
      (targetPosition: { x: number; y: number }) => {
        let { x, y } = targetPosition;

        if (x > container.offsetWidth - draggable.offsetWidth)
          x = container.clientWidth - draggable.offsetWidth;

        if (y > container.offsetHeight - draggable.offsetHeight)
          y = container.clientHeight - draggable.offsetHeight;

        if (x < 0) x = 0;
        if (y < 0) y = 0;

        draggable.lastX = x;
        draggable.lastY = y;
        draggable.style.transform = `translate(${x}px, ${y}px)`;
      },
      [
        container.clientHeight,
        container.clientWidth,
        container.offsetHeight,
        container.offsetWidth,
        draggable,
      ]
    );

    //Binds changePosition to ref
    useEffect(() => {
      if (draggable) draggable.changePosition = changePosition;
    }, [changePosition, draggable]);

    // Sets initial position
    useEffect(() => {
      if (draggable) changePosition(position);
    }, [changePosition, draggable, position]);

    const handleDragStart = (e) => {
      if (!canDragOnContent) if (draggable !== e.target) return;

      draggable.active = true;
      draggable.lastX = draggable.lastX || 0;
      draggable.lastY = draggable.lastY || 0;
      draggable.initialX = e.clientX - draggable.lastX;
      draggable.initialY = e.clientY - draggable.lastY;

      //Set zindex based on highest sibling zindex
      const highestZIndex = Math.max(
        ...containerChildren.map((child) => Number(child.style.zIndex))
      );

      if (draggable.style.zIndex != highestZIndex)
        draggable.style.zIndex = highestZIndex + 1;

      if (isDraggingClassName)
        draggable.className = `${draggable.className} ${isDraggingClassName}`;

      if (transition) draggable.style.transition = null;

      if (!gridSize && snap)
        gridSize = { x: draggable.offsetWidth, y: draggable.offsetHeight };

      //Bind methods to window for ux
      if (window) {
        window.addEventListener("mousemove", handleDrag);
        window.addEventListener("mouseup", handleDragEnd);
      }
    };

    const handleDrag = (e) => {
      e.preventDefault();
      if (!draggable?.active) return null;

      draggable.currentX = e.clientX - draggable.initialX;
      draggable.currentY = e.clientY - draggable.initialY;

      changePosition({ x: draggable.currentX, y: draggable.currentY });
    };

    const handleDragEnd = () => {
      //Set active to false so that handleDrag returns early
      draggable.active = false;
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("mouseup", handleDragEnd);

      if (isDraggingClassName)
        draggable.className = `${draggable.className}`.replace(
          ` ${isDraggingClassName}`,
          ""
        );

      if (!snap)
        return setPosition({ x: draggable.currentX, y: draggable.currentY });

      const snapTo = {
        x: Math.round(draggable.currentX / gridSize?.x || 1),
        y: Math.round(draggable.currentY / gridSize?.y || 1),
      };

      const endPosition = {
        x: snapTo.x * ((gridSize?.x || 1) + (gridSpacing?.x || 0)),
        y: snapTo.y * ((gridSize?.y || 1) + (gridSpacing?.y || 0)),
      };

      changePosition(endPosition);

      if (transition) {
        draggable.style.transition = transition;

        const endTransition = () => {
          setPosition(endPosition);
          draggable.style.transition = null;
          draggable.removeEventListener("transitionend", endTransition);
        };

        draggable.addEventListener("transitionend", endTransition);
      }
    };

    return (
      <div
        ref={givenRef || localRef}
        onMouseDown={handleDragStart}
        className={`absolute ${className || ""}`}
      >
        {children}
      </div>
    );
  }
);

Draggable.displayName = "Draggable";

export default Draggable;
