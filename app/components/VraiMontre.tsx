"use client";
import React, { useEffect, useState } from "react";
import { formatTime } from "../lib/formatage";
import useTimerStore from "../timerStore";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

export type TimerSchema = {
  idStart: number;
  idEnd: number;
  interTime: number;
  isRunning: boolean;
  name: string;
  notified: boolean;
};

type Props = {
  data: TimerSchema;
};

const playNotificationSound = () => {
  const audio = new Audio("notification.mp3");
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

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(timer?.name || "");

  useEffect(() => {
    let intervalId: number;

    if (timer?.isRunning) {
      intervalId = window.setInterval(() => {
        updateTimer(data.idStart, {
          interTime: Math.max(timer.interTime - 1000, 0),
        });
        if (timer.interTime <= 1000) {
          if (Notification.permission === "granted") {
            new Notification("Hey !", {
              body: `Your timer ${timer.name} has ended!`,
            });
          }

          playNotificationSound();
          updateTimer(data.idStart, { isRunning: false });
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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleNameSubmit = () => {
    if (newName.length >= 5) {
      updateTimer(data.idStart, { name: newName });
      setIsEditing(false);
    } else {
      alert("Please enter a name with at least 5 characters.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNameSubmit();
    }
  };

  if (!timer) return null;

  const percentage = (timer.interTime * 100) / (timer.idEnd - timer.idStart);

  return (
    <div
      className={`text-white p-10 rounded-2xl h-fit w-96 flex flex-col items-center transition-all ${
        timer.isRunning ? "bg-gray-900" : "bg-gray-900"
      } `}
    >
      <div className="w-32 h-32 mb-7">
        <CircularProgressbarWithChildren
          value={percentage}
          styles={{
            path: {
              stroke: `rgba(49, 75, 211, ${percentage / 100})`,
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
              fill: "#314bd3",
            },
          }}
        >
          <p className="text-xl">{formatTime(timer.interTime)}</p>
        </CircularProgressbarWithChildren>
      </div>
      {isEditing ? (
        <input
          type="text"
          value={newName}
          onChange={handleNameChange}
          onBlur={handleNameSubmit}
          onKeyDown={handleKeyDown}
          className="border-white text-center bg-gray-800 rounded-lg p-4 w-full text-xl mb-4"
          autoFocus
        />
      ) : (
        <p
          className="cursor-pointer text-center bg-gray-800 rounded-lg p-4 w-full text-xl mb-4"
          onClick={() => setIsEditing(true)}
        >
          {timer.name}
        </p>
      )}
      <div className="flex flex-row w-max space-x-5">
        <button
          className="px-4 py-2 bg-red-900 rounded-lg transition-all hover:bg-red-700"
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
          className="px-4 py-2 bg-blue-900 rounded-lg transition-all hover:bg-blue-700"
          onClick={() => restartTimer(data.idStart)}
        >
          Restart
        </button>
      </div>
    </div>
  );
}
