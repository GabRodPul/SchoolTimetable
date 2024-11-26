import express, { Request, Response } from "express";
import { DB } from "../models"
import { resMsg } from "../utils/response";
import { computeError } from "../utils/error";

const Warming = DB.warmings;
const WarmingController = Object.freeze({
    create: async(req: Request, res: Response) => {
        try {
            const data = await Warming.create(req.body);
            res.send(data);
        } catch (err: any) {
            res.send(computeError( err ));
        }
    },

    findAll: async(req: Request, res: Response) => {
        try {
            const data = await Warming.findAll();
            res.send(data);
        } catch (err: any) {
            res.send(resMsg(500, err.message));
        }
    },

    findOne: async(req: Request, res: Response) => {
        res.send(resMsg(500, "UNIMPLEMENTED"));
    },

    update: async(req: Request, res: Response) => {
        res.send(resMsg(500, "UNIMPLEMENTED"));
    },

    delete: async(req: Request, res: Response) => {
        res.send(resMsg(500, "UNIMPLEMENTED"));
    },
});

export { WarmingController };