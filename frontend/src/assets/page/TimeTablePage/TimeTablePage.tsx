import React from "react";
import DayColumn from "../../componets/TimeTableComps/DayColumn/DayColumn";

const HorarioTable: React.FC = () => {
  const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const timeSlots = [
    "15:00 - 15:55",
    "15:55 - 16:50",
    "16:50 - 17:45",
    "17:45 - 18:00", // Descanso
    "18:00 - 18:55",
    "18:55 - 19:50",
    "19:50 - 20:45",
  ];

  // Datos simulados, se obtendrán desde la base de datos.
  const scheduleData = {
    Lunes: [
      { time: "15:00 - 15:55", class: "Asir", teacher: "LND", room: "Aula 202" },
      { time: "15:55 - 16:50", class: "DAM-T", teacher: "DSW", room: "Aula T1" },
      { time: "16:50 - 17:45", class: "DAM-T", teacher: "DSW", room: "Aula T1" },
      { time: "17:45 - 18:00", class: "Descanso" },
    ],
    Martes: [
      { time: "15:00 - 15:55", class: "Sin Clase" },
      { time: "15:55 - 16:50", class: "Sin Clase" },
      // ...
    ],
  };

  return (
    <div className="horario-table">
      <div className="header-row">
        <div className="time-slot-header"></div>
        {weekDays.map((day) => (
          <div className="day-column-header" key={day}>
            {day}
          </div>
        ))}
      </div>

      {timeSlots.map((slot) => (
        <div className="row" key={slot}>
          <div className="time-slot">{slot}</div>
          {weekDays.map((day) => (
            <DayColumn key={`${day}-${slot}`} day={day} timeSlot={slot} schedule={scheduleData[day]} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default HorarioTable;
