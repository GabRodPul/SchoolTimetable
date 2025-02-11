import express, { Request, Response } from "express";
import { DB } from "../models"
import { resMsg } from "../utils/response";
import { computeError } from "../utils/error";

const SessionChanged = DB.sessionsChanged;
const SessionChangedController = Object.freeze({
    create: async (req: Request, res: Response) => {
        try {
            console.log("llegué hasta aquí")
            const data = await SessionChanged.create(req.body);
            res.send(data);
        } catch (err: any) {
            res.send(computeError(err));
        }
    },

    findAll: async (req: Request, res: Response) => {
        try {
            const data = await SessionChanged.findAll();
            res.send(data);
        } catch (err: any) {
            res.send(resMsg(500, err.message));
        }
    },

    findByPk: async (req: Request, res: Response) => {
        try {
            const data = await SessionChanged.findByPk(req.params.id);
            res.send(data);
        } catch (err: any) {
            res.send(computeError( err ));
        }  
    },

    update: async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const data = await SessionChanged.findByPk(id);
            if (!data)
                throw new Error(`SessionChanged with id ${id} not found`);

            req.body.updatedAt = Date.now();
            await data.update(req.body);
            await data.save();
        } catch (err: any) {
            res.send(computeError(err, `Some error occurred while updating SessionChanged with id ${id}`));
        }
    },

    delete: async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const data = await SessionChanged.destroy({ where: { id } });
            if (!data)
                throw new Error(`SessionChanged with id ${id} not found`);

            res.send(resMsg(204, "Succesfully deleted!"));
        } catch(err: any) {
            res.send(computeError(err, `Some error occurred while deleting SessionChanged with id ${id}`));
        }
    },
});

export { SessionChangedController };