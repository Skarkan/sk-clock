import { create } from "zustand";
import { TimerSchema } from "./types/types";
import { persist, createJSONStorage } from "zustand/middleware";

export type TimerStore = {
  timers: TimerSchema[];
  setTimers: (timers: TimerSchema[]) => void;
  addTimer: (timer: TimerSchema) => void;
  removeTimer: (idStart: number) => void;
  updateTimer: (idStart: number, updatedTimer: Partial<TimerSchema>) => void;
  restartTimer: (idStart: number) => void;
};

export const useTimerStore = create<TimerStore>()(
  persist(
    (set, get) => ({
      timers: [],

      setTimers: (timers: TimerSchema[]) => {
        set({ timers });
      },

      addTimer: (timer: TimerSchema) => {
        set((state) => ({
          timers: [...state.timers, timer],
        }));
      },

      removeTimer: (idStart: number) => {
        set((state) => ({
          timers: state.timers.filter((timer) => timer.idStart !== idStart),
        }));
      },

      updateTimer: (idStart: number, updatedTimer: Partial<TimerSchema>) => {
        set((state) => ({
          timers: state.timers.map((timer) =>
            timer.idStart === idStart ? { ...timer, ...updatedTimer } : timer
          ),
        }));
      },

      restartTimer: (idStart: number) => {
        const timerToRestart = get().timers.find(
          (timer) => timer.idStart === idStart
        );
        if (timerToRestart) {
          const updatedTimers = get().timers.map((timer) =>
            timer.idStart === idStart
              ? {
                  ...timer,
                  interTime: timer.idEnd - timer.idStart,
                  isRunning: true,
                }
              : timer
          );
          set({ timers: updatedTimers });
        }
      },
    }),
    {
      name: "timer-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTimerStore;
