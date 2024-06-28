// "use client";
// import React, { useEffect, useState } from "react";

// export default function Montre({ data, table, updateLocal }: MontreProps) {
//   const updateInterTimer = (
//     idStart: number,
//     table: TimerSchema[],
//     newRemainingTime: number
//   ) => {
//     const updatedTimers = table.map((timer) =>
//       timer.idStart === idStart
//         ? {
//             ...timer,
//             interTime: newRemainingTime,
//           }
//         : timer
//     );
//     updateLocal(updatedTimers);
//   };
//   const updateRunning = (idStart: number, table: TimerSchema[]) => {
//     const updatedTimers = table.map((timer) =>
//       timer.idStart === idStart
//         ? {
//             ...timer,
//             isRunning: false,
//           }
//         : timer
//     );
//     updateLocal(updatedTimers);
//   };

//   const [duration, setDuration] = useState(data.interTime);

//   // useEffect(() => {
//   //   if (data.isRunning == true) {
//   //     const intervalId = setInterval(() => {
//   //       setDuration(() => {
//   //         const n = data.interTime - 1000;
//   //         if (n < 0) {
//   //           updateRunning(data.idStart, table);
//   //           return n;
//   //         }
//   //         updateInterTimer(data.idStart, table, n);
//   //         return n <= 0 ? 0 : n;
//   //       });
//   //     }, 1000);
//   //     return () => clearInterval(intervalId);
//   //   }
//   // });
//   useEffect(() => {
//     setDuration(data.interTime);
//   }, [data.interTime]);

//   useEffect(() => {
//     if (data.isRunning) {
//       const intervalId = setInterval(() => {
//         setDuration((prevDuration) => {
//           const newDuration = prevDuration - 1000;
//           if (newDuration <= 0) {
//             updateRunning(data.idStart, table);
//             clearInterval(intervalId);
//             return 0;
//           }
//           updateInterTimer(data.idStart, table, newDuration);
//           return newDuration;
//         });
//       }, 1000);
//       return () => clearInterval(intervalId);
//     }
//   }, [data.isRunning, data.interTime, table, data.idStart]);

//   function formatTime(milliseconds: number): string {
//     const totalSeconds = Math.floor(milliseconds / 1000);
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;

//     const formattedTime = `${String(hours).padStart(2, "0")}:${String(
//       minutes
//     ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
//     return formattedTime;
//   }

//   return (
//     <div>
//       <p className="text-2xl">{formatTime(duration)}</p>
//     </div>
//   );
// }
