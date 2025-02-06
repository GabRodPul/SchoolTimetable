import _express, { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { DB } from "../../models";
import { resMsg } from "../../utils/response";
import { computeError } from "../../utils/error";
import utils from "../../utils/utils";

const Groups = DB.groups;
const findAll = async (_req: Request, res: Response) => {
    try {
        const data = await Groups.findAll();
<<<<<<< HEAD
        res.render("group/index", { data });
=======
        res.render("groups/index", { data });
>>>>>>> fc2723619ba16ebaea87908657f5d0b3b7db6cf4
    } catch (err: any) {
        return res.render("error", computeError(err));
    }
};

export const GroupViewsController = Object.freeze({
    store: async (req: Request, res: Response) => {
        try {
            const group = { ...req.body};
            const data = await Groups.create(group);
            res.redirect("/groups")
        } catch (err: any) {
            return res.render("error", computeError(err, "Some error occurred while creating the Group."));
        }
    },

<<<<<<< HEAD
    showCreateForm: async (req: Request, res: Response) => res.render("group/create"),
=======
    showCreateForm: async (req: Request, res: Response) => res.render("groups/create"),
>>>>>>> fc2723619ba16ebaea87908657f5d0b3b7db6cf4

    findAll,

    showEditForm: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const data = await DB.groups.findByPk(id);
            if (!data) 
                throw new Error(`Group with id ${id} not found`);

<<<<<<< HEAD
            return res.render("group/edit", { data });
=======
            return res.render("groups/edit", { data });
>>>>>>> fc2723619ba16ebaea87908657f5d0b3b7db6cf4
        } catch (err: any) {
            return res.render("error", computeError(err));
        }
    },

    update: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            req.body.updatedAt = Date.now();
            const count = await DB.groups.update(req.body, { where: { id } });
            if (count[0] === 0)
                throw new Error(`Cannot update Group with id=${id}. Maybe Group was not found or req.body is empty!`)
            return res.redirect("/groups")
        } catch (err: any) {
            return res.render("error", computeError(err, `Some error occurred while updating group with id ${id}`));
        }
    },

    destroy: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const count = await Groups.destroy({ where: { id } });
            if (!count) throw new Error(`Cannot delete Group with id=${id}. Maybe Group was not found or req.body is empty!`);

            return res.redirect("/groups")
        } catch (err: any) {
            return res.render("error", computeError(err, `Some error occurred while deleting Group with id ${id}`));
        }
    },
});