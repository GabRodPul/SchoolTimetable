import { Request, Response } from "express";
import { DB } from "../models";
// import { FullSessionData } from "../../../common/@types/models";
import { SessionHour } from "../../../common/@types/models";
import { computeError } from "../utils/error";
import { Op } from "sequelize";


export const ScheduleController = {
    getSchedule2: async (req: Request, res: Response): Promise<void> => {
        try {
            const moduleId = (await DB.enrollments.findAll({ // ARRAY
                attributes: [ "moduleId" ],
                where: { studentId: req.params.studentId },
            })).map(e => e.dataValues.moduleId);

            const modules = (await DB.modules.findAll({
                where: { id: moduleId }
            })).map(m => m.dataValues);

            const igtModules = (await DB.igt_modules.findAll({ // ARRAY
                attributes: [ "id" ],
                where: { moduleId }
            })).map(igt => igt.dataValues);

            const sessions   = (await DB.sessions.findAll({ 
                where: { igtModuleId: igtModules.map(igt => igt.id) }
            })).map(s => s.dataValues);

            const classHours = (await DB.classHour.findAll({ 
                where: { id: sessions.map(s => s.classHourId) } 
            })).map(c => c.dataValues);

            const data = sessions.map(s => ({
                moduleName: modules
                    .find(m => m.id === igtModules.find(igt => igt.id === s.igtModuleId)!.moduleId)!
                    .name,
                ...s,
                ...classHours.find(c => c.id === s.classHourId),
            }));

            res.send(data);
        } catch(err: any) {
            res.send(computeError(err));
        }
    },

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
                        as: "igt_module",
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
