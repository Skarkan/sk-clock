import React, { ChangeEvent, FormEvent, useState } from "react";
import { convertToMilliseconds } from "../lib/formatage";
import useTimerStore from "../timerStore";
import { TimerSchema } from "../types/types";

type InputTimerProps = {
  localUpdate?: (newTimers: TimerSchema[]) => void;
};

export default function InputTimer({ localUpdate }: InputTimerProps) {
  const [saisiTime, setSaisiTime] = useState({
    seconds: "00",
    minutes: "00",
    hours: "00",
  });

  const { addTimer } = useTimerStore((state) => ({
    addTimer: state.addTimer,
  }));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const filteredValue = value.replace(/[^\d]/g, "").slice(0, 2);

    setSaisiTime({
      ...saisiTime,
      [name]: filteredValue,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const ms = convertToMilliseconds(saisiTime);

    const newTimer: TimerSchema = {
      idStart: Date.now(),
      idEnd: Date.now() + ms,
      interTime: ms,
      isRunning: true,
    };

    addTimer(newTimer); // Mettre à jour localement si nécessaire
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Heures:
            <input
              type="text"
              name="hours"
              value={saisiTime.hours}
              onChange={handleChange}
              inputMode="numeric"
              pattern="[0-9]*"
              onFocus={(e) => e.target.select()}
              min="0"
              max="23"
              step="1"
            />
          </label>
        </div>
        <div>
          <label>
            Minutes:
            <input
              type="text"
              name="minutes"
              value={saisiTime.minutes}
              onChange={handleChange}
              inputMode="numeric"
              pattern="[0-9]*"
              onFocus={(e) => e.target.select()}
              style={{ textAlign: "right" }}
              min="0"
              max="59"
              step="1"
            />
          </label>
        </div>
        <div>
          <label>
            Secondes:
            <input
              type="text"
              name="seconds"
              value={saisiTime.seconds}
              onChange={handleChange}
              inputMode="numeric"
              pattern="[0-9]*"
              onFocus={(e) => e.target.select()}
              style={{ direction: "rtl", textAlign: "right" }}
              min="0"
              max="59"
              step="1"
            />
          </label>
        </div>
        <button type="submit">Click pour envoyer</button>
      </form>
    </>
  );
}
