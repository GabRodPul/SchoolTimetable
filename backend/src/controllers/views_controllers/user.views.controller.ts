import _express, { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { DB } from "../../models";
import { resMsg } from "../../utils/response";
import { computeError } from "../../utils/error";
import utils from "../../utils/utils";

const Users = DB.users;
const findAll = async (_req: Request, res: Response) => {
    try {
        const data = await Users.findAll();
        return res.render("users/index", { data });
    } catch (err: any) {
        return res.render("error", computeError(err));
    }
};

export const UserViewsController = Object.freeze({
    store: async (req: Request, res: Response) => {
        try {
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            const user = { ...req.body, password: hashedPassword };

            const data = await Users.create(user);
            return await findAll(req, res);
        } catch (err: any) {
            // We make sure that computeError return ResponseData
            res.render("error", computeError(err, "Some error occurred while creating the User."));
        }
    },

    create: async (req: Request, res: Response) => res.render("users/create"),

    findAll,

    edit: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const data = await DB.users.findByPk(id);
            if (!data) throw new Error(`User with id ${id} not found`);

            return res.render("users/edit", { data });
        } catch (err: any) {
            return res.render("error", computeError(err));
        }
    },

    update: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            req.body.password  = bcrypt.hashSync(req.body.password, 10);
            req.body.updatedAt = Date.now();
            const count = await DB.users.update(req.body, { where: { id } });
            if (!count[0])
                throw new Error(`Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`)

            return await findAll(req, res);
        } catch (err: any) {
            res.render("error", computeError(err, `Some error occurred while updating user with id ${id}`));
        }
    },

    destroy: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const count = await Users.destroy({ where: { id } });
            if (!count) throw new Error(`Cannot delete User with id=${id}. Maybe User was not found or req.body is empty!`);

            return await findAll(req, res);
        } catch (err: any) {
            res.render("error", computeError(err, `Some error occurred while deleting user with id ${id}`));
        }
    },
});