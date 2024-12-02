import { DB } from "../models"; // Importa tu modelo de base de datos
import { WorkDay } from "../../../common/@enums/models" 

export const buildScheduleData = async () => {
  const scheduleData: Record<WorkDay, any[]> = {
    [WorkDay.Monday]: [],
    [WorkDay.Tuesday]: [],
    [WorkDay.Wednesday]: [],
    [WorkDay.Thursday]: [],
    [WorkDay.Friday]: [],
  };

  // Obtén datos de las clases y módulos desde la base de datos
  const classHours = await DB.classHour.findAll();
  const modules = await DB.igt_modules.findAll({
    include: [
      { model: DB.modules, as: "module" },
      { model: DB.users, as: "teacher" },
      { model: DB.groups, as: "group" },
    ],
  });

  // Recorre los días laborales y organiza los datos
  for (const day of Object.values(WorkDay)) {
    for (const classHour of classHours) {
      const moduleData = modules.find(
        (mod: any) => mod.classHourId === classHour.id && mod.day === day
      );

      if (moduleData) {
        scheduleData[day].push({
          time: `${classHour.start} - ${classHour.end}`,
          module: moduleData.module.name,
          teacher: moduleData.teacher.name,
          group: moduleData.group.name,
          room: moduleData.classroom || "Sin Aula",
        });
      }
    }
  }

  return scheduleData;
};
