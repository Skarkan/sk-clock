import { create } from "zustand";
import { TimerSchema } from "./types/types";

export type TimerStore = {
  timers: TimerSchema[];
  setTimers: (timers: TimerSchema[]) => void;
  addTimer: (timer: TimerSchema) => void;
  removeTimer: (idStart: number) => void;
  updateTimer: (idStart: number, updatedTimer: Partial<TimerSchema>) => void;
};

const useTimerStore = create<TimerStore>((set, get) => ({
  timers: [],

  setTimers: (timers: TimerSchema[]) => {
    set({ timers });
    localStorage.setItem("Timers", JSON.stringify(timers));
  },

  addTimer: (timer: TimerSchema) => {
    set((state) => ({
      timers: [...state.timers, timer],
    }));
    localStorage.setItem("Timers", JSON.stringify(get().timers));
  },

  removeTimer: (idStart: number) => {
    set((state) => ({
      timers: state.timers.filter((timer) => timer.idStart !== idStart),
    }));
    localStorage.setItem("Timers", JSON.stringify(get().timers));
  },

  updateTimer: (idStart: number, updatedTimer: Partial<TimerSchema>) => {
    set((state) => ({
      timers: state.timers.map((timer) =>
        timer.idStart === idStart ? { ...timer, ...updatedTimer } : timer
      ),
    }));
    localStorage.setItem("Timers", JSON.stringify(get().timers));
  },
}));

export default useTimerStore;
