"use client";
import React, { useEffect } from "react";
import VraiMontre from "./components/VraiMontre";
import InputTimer from "./components/InputTimer";
import useTimerStore from "./timerStore";

export default function Home() {
  const { timers } = useTimerStore();

  return (
    <div className="flex items-center flex-col m-6">
      <h1 className="text-xl font-mono">TimerApp Skarkan</h1>
      <InputTimer />
      <div className="flex w-full flex-wrap justify-center">
        {timers.map((data) => (
          <VraiMontre key={data.idStart} data={data} />
        ))}
      </div>
      {/* <p>{JSON.stringify(timers)}</p> */}
    </div>
  );
}
