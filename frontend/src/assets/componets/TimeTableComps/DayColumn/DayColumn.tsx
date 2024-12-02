import React from "react";
import TimeSlot from "../HourSlot/HourSlot";

type DayColumnProps = {
  day: string;
  timeSlot: string;
  schedule: Array<{ time: string; class?: string; teacher?: string; room?: string }>;
};

const DayColumn: React.FC<DayColumnProps> = ({ day, timeSlot, schedule }) => {
  const slotData = schedule.find((slot) => slot.time === timeSlot);

  return (
    <div className="day-column">
      <TimeSlot
        class={slotData?.class || "Sin Clase"}
        teacher={slotData?.teacher}
        room={slotData?.room}
      />
    </div>
  );
};

export default DayColumn;
