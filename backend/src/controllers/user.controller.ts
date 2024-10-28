import express, { Request, Response } from "express";
import { DB } from "../models"
import { resMsg } from "../utils/response";
import { computeError } from "../utils/error";

const Users = DB.users;
const UserController = Object.freeze({
    create: async(req: Request, res: Response) => {
        try {
            const data = await Users.create(req.body);
            res.send(data);
        } catch (err: any) {
            res.send(computeError( err ));
        }
    },

    findAll: async(req: Request, res: Response) => {
        try {
            const data = await Users.findAll();
            res.send(data);
        } catch (err: any) {
            res.send(resMsg(500, err.message));
        }
    },

    findByPk: async(req: Request, res: Response) => {
        try {
            const data = await Users.findByPk(req.params.id);
            res.send(data);
        } catch (err: any) {
            res.send(computeError( err ));
        }        
    },

    update: async(req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const data = await Users.findByPk(id);
            if (!data)
                throw new Error(`User with id ${id} not found`);

            req.body.updatedAt = Date.now();
            await data.update(req.body);
            await data.save();
        } catch (err: any) {
            res.send(computeError(err, `Some error occurred while updating user with id ${id}`));
        }
    },

    delete: async(req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const data = await Users.destroy({ where: { id } });
            if (!data)
                throw new Error(`User with id ${id} not found`);

            res.send(resMsg(204, "Succesfully deleted!"));
        } catch(err: any) {
            res.send(computeError(err, `Some error occurred while deleting user with id ${id}`));
        }
    },
});

export { UserController };