import { 
    Identifier, 
    Sequelize, 
    ValidationError, 
    UniqueConstraintError 
} from "sequelize";
import express, { Request, Response } from "express";
import { DB } from "../models"
import { UserModel } from "../models/user.model";
import { ControllerResponse } from "../../../common/@types/data";

const Users = DB.users;
const UserController = Object.freeze({
    create: async(req: Request, res: Response) => {
        try {
            const data = await Users.create(req.body);
            res.send(data);
        } catch (err: any) {
            const why : ControllerResponse = 
                err instanceof ValidationError || err instanceof UniqueConstraintError
                ? { code: 400, errors: err.errors.map( e => e.message ) }
                : { code: 500, message: err.message }

            res.send(why);
        }
    },

    findAll: async(req: Request, res: Response) => {
        throw new Error("UNIMPLEMENTED");
    },

    findOne: async(req: Request, res: Response) => {
        throw new Error("UNIMPLEMENTED");
    },

    update: async(req: Request, res: Response) => {
        throw new Error("UNIMPLEMENTED");
    },

    delete: async(req: Request, res: Response) => {
        throw new Error("UNIMPLEMENTED");
    },
});

export { UserController };