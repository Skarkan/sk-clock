type TimerSchema = {
  idStart: number;
  idEnd: number;
  interTime: number; // Calcule de l'écart
  isRunning: boolean;
};

type MontreProps = {
  data: TimerSchema;
  table: TimerSchema[];
  localUpdate: (newTimers: TimerSchema[]) => void;
};

type InputTimerProps = {
  data: TimerSchema[];
  localUpdate: (newTimers: TimerSchema[]) => void;
};

type SaisiShema = {
  seconds: string;
  minutes: string;
  hours: string;
};
