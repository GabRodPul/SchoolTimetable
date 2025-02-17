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
        res.render("groups2/index", { data });
    } catch (err: any) {
        return res.render("error", computeError(err));
    }
};

export const GroupViewsController = Object.freeze({
    store: async (req: Request, res: Response): Promise <void> => {
        try {
            if (!req.body || Object.keys(req.body).length===0){
                res.status(400).send({ error: "The body should not be empty"})
                return;
            }
            const group = { ...req.body};
            const data = await Groups.create(group);
            res.redirect("/groups2")
        } catch (err: any) {
            return res.render("error", computeError(err, "Some error occurred while creating the Group."));
        }
    },

    showCreateForm: async (req: Request, res: Response) => res.render("groups2/create"),

    findAll,

    showEditForm: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const data = await DB.groups.findByPk(id);
            if (!data) 
                throw new Error(`Group with id ${id} not found`);

            return res.render("groups2/edit", { data });
        } catch (err: any) {
            return res.render("error", computeError(err));
        }
    },

    update: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {

            if (!req.body || Object.keys(req.body).length === 0) {
                console.error("Error: The request body is empty.");
                res.status(400).send({ error: "The request body is empty." });
                return;
            }

            // Ensure the ID is not being updated
            const { id: bodyId, ...updateData } = req.body; // Exclude the ID

            
            req.body.updatedAt = Date.now();
            // const count = await DB.groups.update(req.body, { where: { id } });
            const [updated] = await Groups.update(updateData, { where: { id } })

            if (!updated)
                throw new Error(`Cannot update Group with id=${id}. Maybe Group was not found or req.body is empty!`)
            
            res.status(200).send({ message: "Groups succesfully updated"});
            // return res.redirect("/groups2")

        } catch (err: any) {
            return res.render("error", computeError(err, `Some error occurred while updating group with id ${id}`));
        }
    },

    destroy: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const count = await Groups.destroy({ where: { id } });
            if (!count) throw new Error(`Cannot delete Group with id=${id}. Maybe Group was not found or req.body is empty!`);

            return res.redirect("/groups2")
        } catch (err: any) {
            return res.render("error", computeError(err, `Some error occurred while deleting Group with id ${id}`));
        }
    },
});