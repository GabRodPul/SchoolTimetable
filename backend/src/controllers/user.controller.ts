import _express, { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { DB } from "../models";
import { resMsg } from "../utils/response";
import { computeError } from "../utils/error";
import utils from "../utils/utils";

const Users = DB.users;

const UserController = Object.freeze({
    create: async (req: Request, res: Response) => {
        try {
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            const user = { ...req.body, password: hashedPassword };

            const data = await Users.create(user);
            res.send(data);
        } catch (err: any) {
            // We make sure that computeError return ResponseData
            res.status(500).send(computeError(err, "Some error occurred while creating the User."));
        }
    },

    findAll: async (_req: Request, res: Response) => {
        try {
            const data = await Users.findAll();
            res.send(data);
        } catch (err: any) {
            res.send(computeError(err));
        }
    },

    findByPk: async (req: Request, res: Response) => {
        try {
            const data = await Users.findByPk(req.params.id);
            if (!data) throw new Error(`User with id ${req.params.id} not found`);
            res.send(data);
        } catch (err: any) {
            res.send(computeError(err));
        }
    },

    update: async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const data = await Users.findByPk(id);
            if (!data) throw new Error(`User with id ${id} not found`);

            req.body.password  = bcrypt.hashSync(req.body.password, 10);
            req.body.updatedAt = Date.now();
            await data.update(req.body);
            await data.save();

            res.send(resMsg(200, `User with id ${id} updated successfully`));
        } catch (err: any) {
            res.send(computeError(err, `Some error occurred while updating user with id ${id}`));
        }
    },

    delete: async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const data = await Users.destroy({ where: { id } });
            if (!data) throw new Error(`User with id ${id} not found`);

            res.send(resMsg(204, "Successfully deleted!"));
        } catch (err: any) {
            res.send(computeError(err, `Some error occurred while deleting user with id ${id}`));
        }
    },
});

export { UserController };