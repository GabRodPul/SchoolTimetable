import express, { Request, Response } from "express";
import { DB } from "../models"
import { resMsg } from "../utils/response";
import { computeError } from "../utils/error";

const ClassHours = DB.classHour;
const ClassHourController = Object.freeze({
    create: async (req: Request, res: Response) => {
        try {
            const data = await ClassHours.create(req.body);
            res.send(data);
        } catch (err: any) {
            res.send(computeError(err));
        }
    },

    findAll: async (req: Request, res: Response) => {
        try {
            const data = await ClassHours.findAll();
            res.send(data);
        } catch (err: any) {
            res.send(resMsg(500, err.message));
        }
    },

    findOne: async (req: Request, res: Response) => {
        res.send(resMsg(500, "Couldn't find one"));
    },

    update: async (req: Request, res: Response) => {
        res.send(resMsg(500, "Couldn't update"));
    },

    delete: async (req: Request, res: Response) => {
        res.send(resMsg(500, "Couldn't delete"));
    },
});

export { ClassHourController };