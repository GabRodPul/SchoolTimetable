import { Request, Response } from "express";
import { Op } from "sequelize";
import { DB } from "../../models";

const groups = DB.groups;

// Save a new group
export const store = async (req: Request, res: Response): Promise<void> => {
    // Validate request
    if (!req.body?.name) {
        res.render("error", {
            message: "Content cannot be empty",
        });
        return;
    }

    try {
        // Create a group
        const group = { name: req.body.name };

        // Save the group in the Database
        await groups.create(group);
        await findAll(req, res);
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.render("error", {
                message: err.message || "Some error occurred while creating the group",
            });
        } else {
            res.render("error", {
                message: "An unknown error occurred while creating the group",
            });
        }
    }
};

// Retrieve all groups
export const index = async (req: Request, res: Response): Promise<void> => {
    await findAll(req, res);
};

// Helper function to find all groups
const findAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await groups.findAll();
        res.render("group/index", { groups: data });
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.render("error", {
                message: err.message || "Some error occurred while retrieving groups",
            });
        } else {
            res.render("error", {
                message: "An unknown error occurred while retrieving groups",
            });
        }
    }
};

// Show form to create a new group
export const create = (req: Request, res: Response): void => {
    res.render("classHour/create");
};

// Show form to edit a group
export const edit = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    try {
        const data = await groups.findByPk(id);
        res.render("group/edit", { group: data });
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.render("error", {
                message: err.message || "Some error occurred while retrieving the group",
            });
        } else {
            res.render("error", {
                message: "An unknown error occurred while retrieving the group",
            });
        }
    }
};

// Update a group by id
export const update = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    try {
        const [num] = await groups.update(req.body, {
            where: { id: id },
        });

        if (num === 1) {
            await findAll(req, res);
        } else {
            res.render("error", {
                message: `Cannot update group with id=${id}. Maybe group was not found or req.body is empty.`,
            });
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.render("error", {
                message: err.message || "Some error occurred while updating the group",
            });
        } else {
            res.render("error", {
                message: "An unknown error occurred while updating the group",
            });
        }
    }
};

// Delete a group by id
export const destroy = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    try {
        const num = await groups.destroy({
            where: { id: id },
        });

        if (num === 1) {
            await findAll(req, res);
        } else {
            res.render("error", {
                message: `Cannot delete group with id=${id}. Maybe group was not found.`,
            });
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.render("error", {
                message: err.message || "Some error occurred while deleting the group",
            });
        } else {
            res.render("error", {
                message: "An unknown error occurred while deleting the group",
            });
        }
    }
};
