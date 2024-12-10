// src/components/DayColumn/DayColumn.tsx
import React from "react";
import HourSlot from "../HourSlot/HourSlot";

type DayColumnProps = {
  day: string;
  timeSlot: string;
  schedule: Array<{ time: string; module?: string; teacher?: string; group?: string }>;
};

const DayColumn: React.FC<DayColumnProps> = ({ day, timeSlot, schedule }) => {
  const slotData = schedule.find((slot) => slot.time === timeSlot);

  return (
    <div className="day-column">
      <HourSlot
        module={slotData?.module || "Sin Clase"}
        teacher={slotData?.teacher || "N/A"}
        group={slotData?.group || "N/A"}
      />
    </div>
  );
};

export default DayColumn;
