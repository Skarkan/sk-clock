"use client";
import React, { useEffect, useState } from "react";

type TimersSchema = {
  idStart: number;
  idEnd: number;
  duration: number;
  isRunning: boolean;
}[];

export default function Montre({
  data,
}: {
  data: {
    idStart: number;
    idEnd: number;
    duration: number;
    isRunning: boolean;
  };
}) {
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

  return (
    <div>
      <p> LA MONTRE : End ID: </p>

      <div key={" "}>
        <p>Start ID: {data.idStart} </p>
        <p>End ID: {data.idEnd}</p>
        <p>Duration: seconds {intervale}</p>
        <p>Is Running: {data.isRunning}</p>
      </div>
    </div>
  );
}
