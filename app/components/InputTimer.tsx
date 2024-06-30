import React, { ChangeEvent, FormEvent, useState } from "react";
import { convertToMilliseconds } from "../lib/formatage";
import useTimerStore from "../timerStore";
export type TimerSchema = {
  idStart: number;
  idEnd: number;
  interTime: number;
  isRunning: boolean;
  name: string;
  notified: boolean;
};

export default function InputTimer() {
  const [saisiTime, setSaisiTime] = useState({
    seconds: "00",
    minutes: "00",
    hours: "00",
    name: "",
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

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const paddedValue = value.padStart(2, "0");
    setSaisiTime({
      ...saisiTime,
      [name]: paddedValue,
    });
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSaisiTime({
      ...saisiTime,
      name: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const ms = convertToMilliseconds(saisiTime);

    if (ms < 10000) {
      alert("Please enter a duration of at least 10 seconds.");
      return;
    }

    if (saisiTime.name.length < 5) {
      alert("Please enter a name with at least 5 characters.");
      return;
    }

    const newTimer: TimerSchema = {
      idStart: Date.now(),
      idEnd: Date.now() + ms,
      interTime: ms,
      isRunning: true,
      name: saisiTime.name,
      notified: false,
    };

    addTimer(newTimer);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center mb-14">
      <div className="flex flex-row m-10 w-full justify-between">
        <div className="flex items-center flex-col">
          <input
            type="text"
            name="hours"
            value={saisiTime.hours}
            onChange={handleChange}
            onBlur={handleBlur}
            inputMode="numeric"
            pattern="[0-9]*"
            onFocus={(e) => e.target.select()}
            className="text-center bg-gray-800 rounded-lg p-4 w-20 text-4xl"
            max="23"
            step="1"
          />
          <p className="font-mono text-sm text-gray-400 mt-2">Hours</p>
        </div>
        <div className="flex items-center flex-col">
          <input
            type="text"
            name="minutes"
            value={saisiTime.minutes}
            onChange={handleChange}
            onBlur={handleBlur}
            inputMode="numeric"
            pattern="[0-9]*"
            onFocus={(e) => e.target.select()}
            className="text-right bg-gray-800 rounded-lg p-4 w-20 text-4xl"
            min="0"
            max="59"
            step="1"
          />
          <p className="font-mono text-sm text-gray-400 mt-2">Minutes</p>
        </div>
        <div className="flex items-center flex-col">
          <input
            type="text"
            name="seconds"
            value={saisiTime.seconds}
            onChange={handleChange}
            onBlur={handleBlur}
            inputMode="numeric"
            pattern="[0-9]*"
            onFocus={(e) => e.target.select()}
            className="text-right bg-gray-800 rounded-lg p-4 w-20 text-4xl"
            min="0"
            max="59"
            step="1"
          />
          <p className="font-mono text-sm text-gray-400 mt-2">Secondes</p>
        </div>
      </div>
      <div className="flex items-center flex-col mb-4">
        <input
          type="text"
          name="name"
          value={saisiTime.name}
          onChange={handleNameChange}
          className="text-center bg-gray-800 rounded-lg p-4 w-full text-xl"
          placeholder="Timer Name"
        />
      </div>
      <button
        className="text-white px-4 py-2 w-44 bg-gray-600 rounded-lg"
        type="submit"
      >
        Ajouter
      </button>
    </form>
  );
}
