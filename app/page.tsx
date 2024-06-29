"use client";
import React, { useEffect } from "react";
import VraiMontre from "./components/VraiMontre";
import InputTimer from "./components/InputTimer";
import useTimerStore from "./timerStore";
import { TimerSchema } from "./types/types";

export default function Home() {
  const { timers, setTimers } = useTimerStore();

  useEffect(() => {
    // Charger les timers depuis le localStorage au montage du composant
    const storedTimersJson = localStorage.getItem("Timers");
    if (storedTimersJson) {
      try {
        const storedTimers: TimerSchema[] = JSON.parse(storedTimersJson);
        setTimers(storedTimers);
      } catch (error) {
        console.error("Erreur lors de la conversion JSON :", error);
      }
    }
  }, [setTimers]);

  return (
    <div className="flex items-center flex-col m-10">
      <h1>Temps en Heures, Minutes, Secondes</h1>
      <InputTimer />
      <div className="flex w-full flex-wrap justify-center">
        {timers.map((data) => (
          <VraiMontre key={data.idStart} data={data} />
        ))}
      </div>
      <p>{JSON.stringify(timers)}</p>
    </div>
  );
}
