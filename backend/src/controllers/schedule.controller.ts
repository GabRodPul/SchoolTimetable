import { Request, Response } from "express";
import { buildScheduleData } from "../services/schedule.service";

export const ScheduleController = {
  // Genera y devuelve el horario
  findAll: async (req: Request, res: Response) => {
    try {
      const scheduleData = await buildScheduleData(); // Llama al servicio que construye el horario
      res.status(200).json(scheduleData); // Devuelve los datos como JSON
    } catch (error) {
      console.error("Error fetching schedule:", error);
      res.status(500).json({ message: "Error fetching schedule" });
    }
  },
};
