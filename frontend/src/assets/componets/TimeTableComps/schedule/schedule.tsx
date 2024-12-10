import React from "react";
import DayColumn from "../DayColumn/DayColumn";
import { FetchState, FetchData } from "../../../../types/api";

type ScheduleResponse = {
  day: string;
  hours: Array<{ time: string; module?: string; teacher?: string; group?: string }>;
};

type ScheduleProps = {
  scheduleData: FetchData<ScheduleResponse[]>;
};

const Schedule: React.FC<ScheduleProps> = ({ scheduleData }) => {
  if (scheduleData.state === FetchState.Loading) {
    return <div>Cargando horario...</div>;
  }

  if (scheduleData.state === FetchState.Error) {
    return <div>Error al cargar el horario</div>;
  }

  if (
    (scheduleData.state === FetchState.Success || scheduleData.state === FetchState.SuccessMany) &&
    Array.isArray(scheduleData.data)
  ) {
    return (
      <div className="schedule">
        {scheduleData.data.map((dayData: ScheduleResponse) => (
          <div key={dayData.day} className="dia">
            <h3>{dayData.day}</h3>
            {[1, 2, 3, 4, 5, 6].map((hora) => (
              <DayColumn
                key={`${dayData.day}-${hora}`}
                day={dayData.day}
                timeSlot={`${hora}`}
                schedule={dayData.hours}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return <div>No hay datos disponibles</div>; // Manejo para otros casos inesperados
};

export default Schedule;
