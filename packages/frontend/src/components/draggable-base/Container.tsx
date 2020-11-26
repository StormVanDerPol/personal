import React, { cloneElement, useEffect, useRef, useState } from "react";

type ContainerProps = {
  children?: any;
  className?: string;
};

/**
 * Wrapper for Draggable
 */

const Container = ({ children, className }: ContainerProps) => {
  const containerRef = useRef(null);
  const [draggables, setDraggables] = useState([]);

  useEffect(() => {
    setDraggables(
      children?.map(
        (child, index) =>
          cloneElement(child, {
            ...child.props,
            container: containerRef.current,
            index,
          }) || []
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {draggables && draggables.map((d) => d)}
    </div>
  );
};
export default Container;
