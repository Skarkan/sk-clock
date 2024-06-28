"use client";
import React, { useEffect, useState } from "react";
import { formatTime } from "../lib/formatage";

export default function Montre({ data, table, localUpdate }: MontreProps) {
  const [duration, setDuration] = useState(data.interTime);

  const updateInterTimer = (
    idStart: number,
    table: TimerSchema[],
    newRemainingTime: number
  ) => {
    const updatedTimers = table.map((timer) =>
      timer.idStart === idStart
        ? {
            ...timer,
            interTime: newRemainingTime,
          }
        : timer
    );
    localUpdate(updatedTimers);
  };

  const toggleRunning = (idStart: number, table: TimerSchema[]) => {
    const updatedTimers = table.map((timer) =>
      timer.idStart === idStart
        ? { ...timer, isRunning: !timer.isRunning }
        : timer
    );
    localUpdate(updatedTimers);
  };

  const resetTimer = (idStart: number) => {
    const updatedTimers = table.map((timer) =>
      timer.idStart === idStart
        ? {
            ...timer,
            interTime: timer.idEnd - timer.idStart,
            isRunning: false,
          }
        : timer
    );
    localUpdate(updatedTimers);
  };

  const suppTimer = (data: TimerSchema) => {
    const updatedTimers = table.filter((timer) => timer !== data);
    localUpdate(updatedTimers);
  };

  useEffect(() => {
    setDuration(data.interTime);
  }, [data.interTime]);

  useEffect(() => {
    if (data.isRunning) {
      const intervalId = setInterval(() => {
        setDuration((prevDuration) => {
          const newDuration = prevDuration - 1000;
          if (newDuration <= 0) {
            toggleRunning(data.idStart, table);
            clearInterval(intervalId);
            return 0;
          }
          updateInterTimer(data.idStart, table, newDuration);
          return newDuration;
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [data.interTime, table, data.idStart]);

  return (
    <div>
      <p className="text-2xl">{formatTime(duration)}</p>
      <button onClick={() => suppTimer(data)}>Supp</button>
      <button onClick={() => toggleRunning(data.idStart, table)}>Pause</button>
      <button onClick={() => resetTimer(data.idStart)}>Restarte</button>
    </div>
  );
}
