import express, { Request, Response } from "express";
import { DB } from "../models"
import { resMsg } from "../utils/response";
import { computeError } from "../utils/error";

const Warning = DB.warnings;
const WarningController = Object.freeze({
    create: async (req: Request, res: Response) => {
        try {
            const data = await Warning.create(req.body);
            res.send(data);
        } catch (err: any) {
            res.send(computeError(err));
        }
    },

    findAll: async (req: Request, res: Response) => {
        try {
            const data = await Warning.findAll();
            res.send(data);
        } catch (err: any) {
            res.send(resMsg(500, err.message));
        }
    },

    findForStudent: async (req: Request, res: Response) => {
        try {
            res.send([]);
        } catch (err: any) {
            res.send(resMsg(500, err.message));
        }
    },

    findOne: async (req: Request, res: Response) => {
        try {
            const data = await Warning.findByPk(req.params.id);
            res.send(data);
        } catch (err: any) {
            res.send(computeError( err ));
        }   
    },

    update: async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const data = await Warning.findByPk(id);
            if (!data)
                throw new Error(`Warning with id ${id} not found`);

            req.body.updatedAt = Date.now();
            await data.update(req.body);
            await data.save();
        } catch (err: any) {
            res.send(computeError(err, `Some error occurred while updating Warning with id ${id}`));
        }
    },

    delete: async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const data = await Warning.destroy({ where: { id } });
            if (!data)
                throw new Error(`Warning with id ${id} not found`);

            res.send(resMsg(204, "Succesfully deleted!"));
        } catch(err: any) {
            res.send(computeError(err, `Some error occurred while deleting Warning with id ${id}`));
        }
    },
    
});

export { WarningController };