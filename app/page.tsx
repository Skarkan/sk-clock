"use client";
import React, { useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import VraiMontre from "./components/VraiMontre";
import InputTimer from "./components/InputTimer";
import useTimerStore from "./timerStore";

export default function Home() {
  const requestNotificationPermission = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        } else if (permission === "denied") {
          console.log("Notification permission denied.");
        }
      });
    } else {
      console.log("This browser does not support notifications.");
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const { timers, setTimers } = useTimerStore((state) => ({
    timers: state.timers,
    setTimers: state.setTimers,
  }));

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    if (source.index === destination.index) {
      return;
    }

    const reorderedTimers = Array.from(timers);
    const [movedTimer] = reorderedTimers.splice(source.index, 1);
    reorderedTimers.splice(destination.index, 0, movedTimer);

    // Mettre à jour les timers dans le store
    setTimers(reorderedTimers);
  };

  return (
    <div className="flex items-center flex-col m-6">
      <h1 className="text-xl font-mono ">TimerApp Skarkan</h1>
      <InputTimer />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="timers" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex w-full flex-wrap justify-center"
            >
              {timers.map((timer, index) => (
                <Draggable
                  key={timer.idStart.toString()}
                  draggableId={timer.idStart.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex-none m-2" // Exemple de classe pour le style des éléments Draggable
                    >
                      <VraiMontre key={timer.idStart} data={timer} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
