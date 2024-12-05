// import { DB } from "../models"; // Importa tu modelo de base de datos
// import { WorkDay } from "../../../common/@enums/models"; 
// import { SessionHour, ScheduleCell } from "../../../common/@types/models";

// export const buildScheduleData = async () => {
//   // Estructura para organizar el horario por día
//   const scheduleData: Record<WorkDay, ScheduleCell[]> = {
//     [WorkDay.Monday]: [],
//     [WorkDay.Tuesday]: [],
//     [WorkDay.Wednesday]: [],
//     [WorkDay.Thursday]: [],
//     [WorkDay.Friday]: [],
//   };

//   // Obtén los datos de las clases (classHours) y módulos (igt_modules) desde la base de datos
//   const classHours = await DB.classHour.findAll({
//     attributes: ['id', 'sessionHour', 'start', 'end', 'turn'], // Aseguramos que solo traemos lo que necesitamos
//   });

//   const modules = await DB.igt_modules.findAll({
//     include: [
//       { model: DB.modules, as: "module", attributes: ["name"] },
//       { model: DB.users, as: "teacher", attributes: ["name"] },
//       { model: DB.groups, as: "group", attributes: ["name"] },
//     ],
//   });

//   // Creamos un mapa para acceso rápido de módulos por clase y día
//   const modulesMap = modules.reduce((acc, moduleData) => {
//     const { sessionHour, day } = moduleData; // Assuming these properties exist
//     if (!acc[day]) acc[day] = {};
//     acc[day][sessionHour] = moduleData;
//     return acc;
//   }, {} as Record<WorkDay, Record<SessionHour, any>>);

//   // Rellenamos el horario con los datos
//   classHours.forEach((classHour) => {
//     const { sessionHour, start, end, turn } = classHour;
    
//     Object.values(WorkDay).forEach((day) => {
//       const moduleData = modulesMap[day]?.[sessionHour]; // Obtenemos el módulo correspondiente para ese día y hora

//       if (moduleData) {
//         scheduleData[day].push({
//           sessionHour: sessionHour,
//           module: moduleData.module.name,
//           group: moduleData.group.name,
//           teacher: moduleData.teacher.name,
//         });
//       } else {
//         // Si no hay datos del módulo, se añade "Sin Clase" para ese horario
//         scheduleData[day].push({
//           sessionHour: sessionHour,
//           module: "Sin Clase",
//           group: null,
//           teacher: null,
//         });
//       }
//     });
//   });

//   return scheduleData;
// };
