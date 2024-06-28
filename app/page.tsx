"use client";
import { useEffect, useState } from "react";
import VraiMontre from "./components/VraiMontre";
import InputTimer from "./components/InputTimer";

export default function Home() {
  const [timers, setTimers] = useState<TimerSchema[]>([]);

  const localUpdate = (array: TimerSchema[]) => {
    localStorage.setItem("Timers", JSON.stringify(array));
    setTimers(array);
  };

  const fetchData = () => {
    const storedTimersJson = localStorage.getItem("Timers");
    if (storedTimersJson) {
      try {
        const storedTimers: TimerSchema[] = JSON.parse(storedTimersJson).map(
          (timer: TimerSchema) => {
            if (timer.isRunning) {
              const remainingTime = timer.idEnd - Date.now();
              return {
                ...timer,
                interTime: remainingTime > 0 ? remainingTime : 0,
              };
            }
            return timer;
          }
        );
        setTimers(storedTimers);
      } catch (error) {
        console.error("Erreur lors de la conversion JSON :", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex items-center flex-col m-10">
      <h1>Temps en Heures, Minutes, Secondes</h1>

      <InputTimer data={timers} localUpdate={localUpdate} />

      <p>{JSON.stringify(timers)}</p>

      {timers &&
        timers.map((data) => (
          <div className="bg-slate-800 text-white p-10 rounded-xl m-5 h-64 w-[300px] flex items-center justify-center">
            <VraiMontre
              key={data.idStart}
              data={data}
              table={timers}
              localUpdate={localUpdate}
            />
          </div>
        ))}
    </div>
  );
}
