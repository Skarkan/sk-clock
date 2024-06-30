export function formatTime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  } else {
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  }
}

type SaisiSchema = { seconds: string; minutes: string; hours: string };

export const convertToMilliseconds = (saisi: SaisiSchema) => {
  const { seconds, minutes, hours } = saisi;

  // Convert each part to integer and then to milliseconds
  const hoursInMs = parseInt(hours, 10) * 60 * 60 * 1000;
  const minutesInMs = parseInt(minutes, 10) * 60 * 1000;
  const secondsInMs = parseInt(seconds, 10) * 1000;

  // Sum all parts to get total milliseconds
  const totalMilliseconds = hoursInMs + minutesInMs + secondsInMs;

  return totalMilliseconds;
};
