import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Timer = ({ hoursMinSecs }) => {
  const { minutes = 0, seconds = 60 } = hoursMinSecs;
  const [[mins, secs], setTime] = useState([minutes, seconds]);

  const tick = () => {
    if (mins === 0 && secs === 0) {
      setTime([59, 59]);
    } else if (secs === 0) {
      setTime([mins - 1, 59]);
    } else {
      setTime([mins, secs - 1]);
    }
  };

  const reset = () => setTime([parseInt(minutes), parseInt(seconds)]);

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <div style={{ top: "2rem" }}>
      {`${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`}
    </div>
  );
};

export default Timer;
