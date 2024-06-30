import React, { ChangeEvent, FormEvent, useState } from "react";
import { convertToMilliseconds } from "../lib/formatage";
import useTimerStore from "../timerStore";
import { TimerSchema } from "../types/types";

export default function InputTimer() {
  const [saisiTime, setSaisiTime] = useState({
    seconds: "00",
    minutes: "00",
    hours: "00",
  });
  const [timerName, setTimerName] = useState(""); // State for timer name

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

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTimerName(event.target.value); // Update timer name state
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (timerName.length < 5) {
      alert("Le nom du timer doit contenir au moins 5 caractères.");
      return;
    }

    const ms = convertToMilliseconds(saisiTime);

    if (ms < 10000) {
      alert("Veuillez saisir une durée d'au moins 10 secondes.");
      return;
    }

    const newTimer: TimerSchema = {
      idStart: Date.now(),
      idEnd: Date.now() + ms,
      interTime: ms,
      isRunning: true,
      name: timerName,
      notified: false,
    };

    addTimer(newTimer);
    setTimerName(""); // Réinitialiser le champ du nom du timer après soumission
    // Incrémenter l'ordre pour le prochain timer
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center mb-14"
      >
        <div className="flex flex-row m-10 w-full justify-between">
          <div className="flex items-center flex-col">
            <input
              type="text"
              name="hours"
              value={saisiTime.hours}
              onChange={handleChange}
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
        <input
          type="text"
          value={timerName}
          onChange={handleNameChange}
          placeholder="Timer Name"
          className="mb-4 text-center bg-gray-800 rounded-lg p-4 w-64 text-2xl"
        />
        <button
          className="text-white px-4 py-2 w-44 bg-gray-600 rounded-lg"
          type="submit"
        >
          Ajouter
        </button>
      </form>
    </>
  );
}
