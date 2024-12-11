import React from "react";
import DayColumn from "../DayColumn/DayColumn";
import { FetchData, FetchState } from "../../../../types/api";
import { ScheduleResponse } from "#common/@types/models";


type ScheduleProps = {
  scheduleData:   FetchData<ScheduleResponse[]>;
};

const Schedule: React.FC<ScheduleProps> = ({ scheduleData }) => {
  console.log(scheduleData);
  // Estado de carga
  if (scheduleData.state === FetchState.Loading) {
    return <div>Cargando horario...</div>;
  }

  if (scheduleData.state === FetchState.Error) {
    return <div>Error al cargar el horario</div>;
  }

  if (scheduleData.state === FetchState.Success || scheduleData.state === FetchState.SuccessMany) {
    let schedule: ScheduleResponse[];

    if (Array.isArray(scheduleData.data)) {
      if (Array.isArray(scheduleData.data[0])) {
        schedule = (scheduleData.data as ScheduleResponse[][]).flat();
      } else {
        schedule = scheduleData.data as ScheduleResponse[];
      }
    } else {
      schedule = [];
    }

    return (
      <div className="schedule">
        {schedule.map((dayData: ScheduleResponse) => (
          <div key={dayData.day} className="dia">
            <h3>{dayData.day}</h3>
            {[1, 2, 3, 4, 5, 6].map((hora) => (
              <DayColumn
                key={`${dayData.day}-${hora}`}
                timeSlot={`${hora}`}
                schedule={dayData.hours}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return <div>No hay datos disponibles</div>;
};

export default Schedule;
