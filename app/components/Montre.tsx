"use client";
import React, { useEffect, useState } from "react";

type TimerSchema = {
  idStart: number;
  idEnd: number;
  interTime: number; //Calcule de l'ecart
  remaningTime: number; //Valeur qui update
  isRunning: boolean;
};

export default function Montre({ data }: { data: TimerSchema }) {
  const [intervale, setDuration] = useState(data.idEnd - data.idStart);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDuration((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTime - 1000;
      });

      const updaate = {
        idStart: data.idStart,
        idEnd: data.idEnd,
        duration: data.idEnd - data.idStart,
        isRunning: 1,
      };
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Formater les heures, minutes et secondes pour avoir toujours deux chiffres
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    return formattedTime;
  }

  return (
    <div>
      <p className="text-2xl">{formatTime(intervale)}</p>
      {/* <p>Start ID: {data.idStart} </p>
        <p>End ID: {data.idEnd}</p>
        <p>Duration: seconds {intervale}</p>
        <p>Is Running: {data.isRunning}</p> */}
    </div>
  );
}
