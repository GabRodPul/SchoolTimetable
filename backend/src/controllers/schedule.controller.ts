import { Request, Response } from "express";
import { DB } from "../models";
// import { FullSessionData } from "../../../common/@types/models";
import { SessionHour } from "../../../common/@types/models";

export const ScheduleController = {
  async getSchedule(req: Request, res: Response): Promise<void> {
    try {
      const sessions = await DB.sessions.findAll({
        include: [
          {
            model: DB.classHour,
            as: "classHour",
            attributes: ["sessionHour", "turn", "start", "end"],
          },
          {
            model: DB.igt_modules,
            as: "igtModule",
            include: [
              { model: DB.modules, as: "module", attributes: ["name"] },
              { model: DB.users, as: "teacher", attributes: ["name"] },
              { model: DB.groups, as: "group", attributes: ["name"] },
            ],
          },
        ],
        attributes: ["weekDay"],
      });

      const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
      const defaultSchedule = days.map((day) => ({
        day,
        hours: Array.from({ length: 6 }, (_, i) => ({
          sessionHour: (i + 1) as SessionHour,
          module: "Sin Clase",
          group: null,
          teacher: null,
        })),
      }));

      sessions.forEach((session: any) => {
        const dayIndex = days.indexOf(session.weekDay);
        if (dayIndex !== -1) {
          const scheduleDay = defaultSchedule[dayIndex];
          const hourIndex = session.classHour.sessionHour - 1;
      
          scheduleDay.hours[hourIndex] = {
            sessionHour: session.classHour.sessionHour,
            module: session.igtModule.module.name,
            group: session.igtModule.group.name,
            teacher: session.igtModule.teacher.name,
          };
        }
      });
      
      console.log(defaultSchedule);  

      res.json(defaultSchedule);
    } catch (error) {
      console.error("Error fetching schedule:", error);
      res.status(500).json({ error: "Failed to fetch schedule" });
    }
  },
};
