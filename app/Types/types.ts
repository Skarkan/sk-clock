type TimerSchema = {
  idStart: number;
  idEnd: number;
  interTime: number; // Calcule de l'écart
  isRunning: boolean;
};

type MontreProps = {
  data: TimerSchema;
  table: TimerSchema[];
  updateLocal: (newTimers: TimerSchema[]) => void;
};

type SaisiShema = {
  seconds: string;
  minutes: string;
  hours: string;
};
