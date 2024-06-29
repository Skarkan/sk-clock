"use client";

import React, { useEffect, useState } from "react";
import { formatTime } from "../lib/formatage";
import useTimerStore from "../timerStore";
import { TimerSchema } from "../types/types";

type Props = {
  data: TimerSchema;
};

export default function VraiMontre({ data }: Props) {
  const { updateTimer, removeTimer, restartTimer } = useTimerStore((state) => ({
    updateTimer: state.updateTimer,
    removeTimer: state.removeTimer,
    restartTimer: state.restartTimer,
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
    <div className=" bg-slate-800 text-white p-10 rounded-2xl m-5 h-64 w-[400px] flex flex-col items-center">
      <p className="text-5xl py-10">{formatTime(duration)}</p>
      <div className="flex flex-row w-max space-x-5">
        <button
          className="px-4 py-2 bg-gray-600 rounded-lg"
          onClick={handleSuppTimer}
        >
          Delete
        </button>
        <button
          className={`px-4 py-2 ${
            data.isRunning ? "bg-gray-600" : "bg-gray-700 "
          } rounded-lg`}
          onClick={() =>
            updateTimer(data.idStart, { isRunning: !data.isRunning })
          }
        >
          {data.isRunning ? "Pause" : "Resume"}
        </button>
        <button
          className="px-4 py-2 bg-gray-600 rounded-lg"
          onClick={() => restartTimer(data.idStart)}
        >
          Restart
        </button>
      </div>
    </div>
  );
}
