"use client";

import React, { useEffect } from "react";
import { formatTime } from "../lib/formatage";
import useTimerStore from "../timerStore";
import { TimerSchema } from "../types/types";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

type Props = {
  data: TimerSchema;
};

const playNotificationSound = () => {
  const audio = new Audio("/notification.mp3");
  audio.volume = 0.2;
  audio.play();
};

export default function VraiMontre({ data }: Props) {
  const { updateTimer, removeTimer, restartTimer, timers } = useTimerStore(
    (state) => ({
      updateTimer: state.updateTimer,
      removeTimer: state.removeTimer,
      restartTimer: state.restartTimer,
      timers: state.timers,
    })
  );

  const timer = timers.find((timer) => timer.idStart === data.idStart);

  useEffect(() => {
    let intervalId: number;

    if (timer?.isRunning) {
      intervalId = window.setInterval(() => {
        updateTimer(data.idStart, {
          interTime: Math.max(timer.interTime - 1000, 0),
        });
        if (timer.interTime <= 1000) {
          if (timer.notified === false) {
            playNotificationSound();
          }
          if (Notification.permission === "granted") {
            new Notification("Hey !", {
              body: `Your timer ${timer.name} has ended!`,
            });
          }
          updateTimer(data.idStart, { isRunning: false, notified: true });
          clearInterval(intervalId);
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [data.idStart, timer?.isRunning, timer?.interTime, updateTimer]);

  const handleSuppTimer = () => {
    removeTimer(data.idStart);
  };

  if (!timer) return null;

  const percentage = (timer.interTime * 100) / (timer.idEnd - timer.idStart);

  return (
    <div
      className={` text-white p-10 rounded-2xl m-5 h-fit w-96 flex flex-col items-center transition-all ${
        timer.isRunning ? "bg-slate-800" : "bg-gray-900"
      } `}
    >
      <div className="w-32 h-32 mb-7 ">
        <CircularProgressbarWithChildren
          value={percentage}
          styles={{
            path: {
              stroke: `rgba(62, 152, 199, ${percentage / 100})`,
              strokeLinecap: "round",
              transition: "stroke-dashoffset 0.5s ease 0s",
              transform: "rotate(0.25turn)",
              transformOrigin: "center center",
            },
            trail: {
              strokeLinecap: "butt",
              transform: "rotate(0.25turn)",
              transformOrigin: "center center",
            },
            background: {
              fill: "#3e98c7",
            },
          }}
        >
          <p className="text-xl">{formatTime(timer.interTime)}</p>
        </CircularProgressbarWithChildren>
      </div>
      <p className="text-2xl mb-4">{timer.name}</p> {/* Display timer name */}
      <div className="flex flex-row w-max space-x-5">
        <button
          className="px-4 py-2 bg-gray-600 rounded-lg"
          onClick={handleSuppTimer}
        >
          Delete
        </button>
        <button
          className={`px-4 py-2 w-24 ${
            timer.isRunning ? "bg-gray-600" : "bg-gray-700 "
          } rounded-lg ${
            timer.interTime === 0 ? "bg-gray-800 text-gray-600" : ""
          }`}
          onClick={() =>
            updateTimer(data.idStart, { isRunning: !timer.isRunning })
          }
          disabled={timer.interTime <= 1000}
        >
          {timer.isRunning ? "Pause" : "Play"}
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
