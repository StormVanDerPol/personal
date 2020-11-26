import { useState } from "react";
import useUniqueKey from "./useUniqueKey";

const useWindows = () => {
  const getKey = useUniqueKey();
  const [windows, setWindows] = useState([]);

  const addWindow = (props) => {
    setWindows([...windows, { ...props, key: getKey("window_new") }]);
  };

  const removeWindow = (key) => {
    console.log(key);

    setWindows([...windows.filter((w) => w.key !== key)]);
  };

  const minimizeWindow = (key) => {
    const window = windows.find((w) => w.key === key);
    window.minimized = window.minimized ? false : true;
    setWindows([...windows]);
  };

  return { windows, addWindow, removeWindow, minimizeWindow };
};

export default useWindows;
