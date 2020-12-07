export const range = (value, min, max) => {
  return value < min ? min : value > max ? max : value;
};

/**
 * checkInputBounds
 * returns true if touch/click event happens inside of the bounds of node
 * @param event - any mouse or Touch event
 * @param node - HTML Element
 * */

export const checkInputBounds = (
  event: MouseEvent & TouchEvent,
  node: HTMLElement
) => {
  const isTouch = event.type === ("touchstart" || "touchmove" || "touchend");

  const clientX = isTouch ? event.touches[0].clientX : event.clientX;
  const clientY = isTouch ? event.touches[0].clientY : event.clientY;

  const rect = node.getBoundingClientRect();

  return !(
    clientX >= rect.right ||
    clientX <= rect.left ||
    clientY >= rect.bottom ||
    clientY <= rect.top
  );
};

export const checkRange = (x1, y1, x2, y2, range) => {
  return Math.abs(x1 - x2) <= range && Math.abs(y1 - y2) <= range;
};

export const dodoFlight = async (...args) => {
  const res = await fetch(...args);
  return res.json();
};
