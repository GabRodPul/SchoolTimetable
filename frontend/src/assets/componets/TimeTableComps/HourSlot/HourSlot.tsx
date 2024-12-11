import React from "react";

type HourSlotProps = {
  module: string;
  group?: string | null;
  teacher?: string | null;
};

const HourSlot: React.FC<HourSlotProps> = ({ module, group, teacher }) => {
  return (
    <div className={`time-slot ${module === "Sin Clase" ? "no-class" : "class"}`}>
      {module !== "Sin Clase" ? (
        <>
          <p>{module}</p>
          <p>{group || "N/A"}</p>
          <p>{teacher || "N/A"}</p>
        </>
      ) : (
        <p>Sin Clase</p>
      )}
    </div>
  );
};

export default HourSlot;
