"use client";

import React, { useEffect, useState } from "react";
import { formatTime } from "../lib/formatage";
import useTimerStore from "../timerStore";
import { TimerSchema } from "../types/types";

type Props = {
  data: TimerSchema;
};

export default function VraiMontre({ data }: Props) {
  const { updateTimer, removeTimer } = useTimerStore((state) => ({
    updateTimer: state.updateTimer,
    removeTimer: state.removeTimer,
  }));

  const [duration, setDuration] = useState(data.interTime);

  useEffect(() => {
    setDuration(data.interTime);
  }, [data.interTime]);

  useEffect(() => {
    let intervalId: number;

    if (data.isRunning) {
      intervalId = window.setInterval(() => {
        setDuration((prevDuration) => {
          const newDuration = prevDuration - 1000;
          if (newDuration <= 0) {
            clearInterval(intervalId);
            updateTimer(data.idStart, { isRunning: false });
            return 0;
          }
          updateTimer(data.idStart, { interTime: newDuration });
          return newDuration;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [data.idStart, data.isRunning, updateTimer]);

  const handleSuppTimer = () => {
    removeTimer(data.idStart);
  };

  return (
    <div>
      <p className="text-2xl">{formatTime(duration)}</p>
      <button onClick={handleSuppTimer}>Supp</button>
      <button
        onClick={() =>
          updateTimer(data.idStart, { isRunning: !data.isRunning })
        }
      >
        {data.isRunning ? "Pause" : "Restart"}
      </button>
    </div>
  );
}
