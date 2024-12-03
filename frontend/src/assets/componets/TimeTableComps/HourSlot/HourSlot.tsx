import React from "react";

type TimeSlotProps = {
  class: string;
  teacher?: string;
  room?: string;
};

const TimeSlot: React.FC<TimeSlotProps> = ({ class: className, teacher, room }) => {
  return (
    <div className={`time-slot ${className === "Sin Clase" ? "no-class" : "class"}`}>
      {className !== "Sin Clase" ? (
        <>
          <p>{className}</p>
          <p>{teacher}</p>
          <p>{room}</p>
        </>
      ) : (
        <p>Sin Clase</p>
      )}
    </div>
  );
};

export default TimeSlot;
