import { useState } from "react";
import useUniqueKey from "./useUniqueKey";

const useWindows = () => {
  const getKey = useUniqueKey();
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState<string>(null);

  const addWindow = (props?, setActive?) => {
    const id = getKey("window");

    setWindows([
      ...windows,
      {
        ...props,
        id,
      },
    ]);
    setActive && setActiveWindowId(id);
  };

  const removeWindow = (id) => {
    setWindows([...windows.filter((w) => w.id !== id)]);
  };

  const minimizeWindow = (id) => {
    const window = windows.find((w) => w.id === id);
    window.minimized = window.minimized ? false : true;
    setWindows([...windows]);
    setActiveWindowId(window.minimized ? null : id);
  };

  return {
    windows,
    addWindow,
    removeWindow,
    minimizeWindow,
    activeWindowId,
    setActiveWindowId,
  } as useWindowsTypes;
};

export type useWindowsTypes = {
  windows: any[];
  addWindow: (props?, setActive?: boolean) => void;
  removeWindow: (id) => void;
  minimizeWindow: (id) => void;
  activeWindowId: string;
  setActiveWindowId: React.Dispatch<React.SetStateAction<string>>;
};

export default useWindows;
