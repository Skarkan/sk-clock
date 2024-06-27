"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Montre from "./components/Montre";

type TimersSchema = {
  idStart: number;
  idEnd: number;
  duration: number;
  isRunning: boolean;
};

export default function Home() {
  // //Initialisation
  // if (!localStorage.getItem("Timers")) {
  //   const initialTimers = [
  //     {
  //       idStart: 0,
  //       idEnd: 0,
  //       duration: 0,
  //       isRunning: false, // Modifié pour indiquer que c'est un booléen
  //     },
  //     {
  //       idStart: 2,
  //       idEnd: 3,
  //       duration: 3,
  //       isRunning: true, // Modifié pour indiquer que c'est un booléen
  //     },
  //   ];
  //   localStorage.setItem("Timers", JSON.stringify(initialTimers));
  // }

  const [Timers, setTimers] = useState<TimersSchema[]>([]);

  useEffect(() => {
    const storedTimersJson = localStorage.getItem("Timers");
    if (storedTimersJson) {
      try {
        const storedTimers: TimersSchema[] = JSON.parse(storedTimersJson);
        setTimers(storedTimers);
      } catch (error) {
        console.error("Erreur lors de la conversion JSON :", error);
      }
    }
  }, []);

  const [time, setTime] = useState({
    seconds: "00",
    minutes: "00",
    hours: "00",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const filteredValue = value.replace(/[^\d]/g, "").slice(0, 2);

    setTime({
      ...time,
      [name]: filteredValue,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updateTimers = [
      ...Timers,
      {
        idStart: Date.now(),
        idEnd: Date.now() + 9000,
        duration: 9000,
        isRunning: true,
      },
    ];
    setTimers(updateTimers);
    localStorage.setItem("Timers", JSON.stringify(updateTimers));
  };
  const suppTimer = (data: TimersSchema, index: number) => {
    const updatedTimers = Timers.filter((timer) => timer !== data);
    setTimers(updatedTimers);
    localStorage.setItem("Timers", JSON.stringify(updatedTimers));
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
              value={time.hours}
              onChange={handleChange}
              inputMode="numeric"
              pattern="[0-9]*"
              onFocus={(e) => e.target.select()}
              style={{ direction: "rtl" }}
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
              value={time.minutes}
              onChange={handleChange}
              inputMode="numeric"
              pattern="[0-9]*"
              onFocus={(e) => e.target.select()}
              style={{ direction: "rtl" }}
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
              value={time.seconds}
              onChange={handleChange}
              inputMode="numeric"
              pattern="[0-9]*"
              onFocus={(e) => e.target.select()}
              style={{ direction: "rtl" }}
              min="0"
              max="59"
              step="1"
            />
          </label>
        </div>
        <button type="submit">Click pour envoyer</button>
      </form>

      {Timers.map((data, index) => (
        <>
          <Montre key={index} data={data} />
          <button onClick={() => suppTimer(data, index)}> Supp {index}</button>
        </>
      ))}
    </div>
  );
}
