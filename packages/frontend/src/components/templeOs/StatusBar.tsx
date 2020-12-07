import React, { useEffect, useState } from "react";
import useBible from "../../hooks/network/useBible";

const Clock = () => {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const handler = setInterval(() => {
      setBlink((b) => !b);
    }, 500);

    return () => clearInterval(handler);
  }, []);

  const date = new Date();
  const time = {
    h: date.getHours().toString(),
    m: date.getMinutes().toString(),
    s: date.getSeconds().toString(),
  };

  return (
    <span>
      <span>
        {time.h.length === 1 && "0"}
        {time.h}
      </span>
      <span className={`${blink && "opacity-0"}`}>:</span>
      <span>
        {time.m.length === 1 && "0"}
        {time.m}
      </span>
      <span className={`${blink && "opacity-0"}`}>:</span>
      <span>
        {time.s.length === 1 && "0"}
        {time.s}
      </span>
    </span>
  );
};

const StatusBar = () => {
  const { data, isLoading } = useBible("jn 3:16");

  return (
    <div className="bg-holy-blue w-full ">
      <Clock />
      {!isLoading &&
        data.verses?.map((d) => <span key={d.text}>{d.text}</span>)}
    </div>
  );
};

export default StatusBar;
