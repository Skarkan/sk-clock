"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Montre from "./components/Montre";

export default function Home() {
  const [timers, setTimers] = useState<TimerSchema[]>([]);

  const [saisiTime, setSaisiTime] = useState({
    seconds: "00",
    minutes: "00",
    hours: "00",
  });

  const convertToMilliseconds = (saisi: SaisiShema) => {
    const { seconds, minutes, hours } = saisi;

    // Convert each part to integer and then to milliseconds
    const hoursInMs = parseInt(hours, 10) * 60 * 60 * 1000;
    const minutesInMs = parseInt(minutes, 10) * 60 * 1000;
    const secondsInMs = parseInt(seconds, 10) * 1000;

    // Sum all parts to get total milliseconds
    const totalMilliseconds = hoursInMs + minutesInMs + secondsInMs;

    return totalMilliseconds;
  };

  const localUpdate = (array: TimerSchema[]) => {
    localStorage.setItem("Timers", JSON.stringify(array));
    setTimers(array);
  };

  const suppTimer = (data: TimerSchema, index: number) => {
    const updatedTimers = timers.filter((timer) => timer !== data);
    localUpdate(updatedTimers);
  };

  const stopTimer = (idStart: number) => {
    const updatedTimers = timers.map((timer) =>
      timer.idStart === idStart
        ? { ...timer, isRunning: !timer.isRunning }
        : timer
    );
    localUpdate(updatedTimers);
  };

  const resetTimer = (idStart: number, idEnd: number) => {
    const updatedTimers = timers.map((timer) =>
      timer.idStart === idStart
        ? { ...timer, interTime: idEnd - idStart, isRunning: true }
        : timer
    );
    localUpdate(updatedTimers);
  };

  const fetchData = () => {
    const storedTimersJson = localStorage.getItem("Timers");
    if (storedTimersJson) {
      try {
        const storedTimers: TimerSchema[] = JSON.parse(storedTimersJson);
        setTimers(storedTimers);
      } catch (error) {
        console.error("Erreur lors de la conversion JSON :", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

    const updateTimers = [
      ...timers,
      {
        idStart: Date.now(),
        idEnd: Date.now() + ms,
        interTime: Date.now() + ms - Date.now(),
        isRunning: true,
      },
    ];
    localUpdate(updateTimers);
  };

  return (
    <div className="flex items-center flex-col m-10">
      <h1>Temps en Heures, Minutes, Secondes</h1>
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
              max="59"
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

      <p>{JSON.stringify(timers)}</p>

      {timers &&
        timers.map((data, index) => (
          <div className="bg-slate-800 text-white p-10 rounded-xl m-5 h-64 w-[300px] flex items-center justify-center">
            <Montre
              key={Math.random()}
              data={data}
              table={timers}
              updateLocal={localUpdate}
            />
            <button onClick={() => suppTimer(data, index)}>Supp {index}</button>
            <button onClick={() => stopTimer(data.idStart)}>
              Pause {index}
            </button>
            <button onClick={() => resetTimer(data.idStart, data.idEnd)}>
              Restarte {index}
            </button>
          </div>
        ))}
    </div>
  );
}
