import express, { Request, Response } from "express";
import { DB } from "../../models";
import { resMsg } from "../../utils/response";
import { computeError } from "../../utils/error";
import utils from "../../utils/utils";
import bcrypt from 'bcrypt';

// Aquí debería ir una variable para guardar las cosas
const ClassHours = DB.classHour;

// Obtener todas las horas de clase
const findAll = async (req: Request, res: Response) => {
    try {
        const data = await ClassHours.findAll();
        res.render('classHours/index', { data });
    } catch (err: any) {
        res.send(resMsg(500, err.message));
    }
}

// Métodos
export const ClassHourViewsController = Object.freeze({
    //Guardar una hora de clase en la base de datos
    store: async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                res.status(400).json({ error: "El cuerpo de la solicitud está vacío." });
                return;
            }

            const newClassHour = { ...req.body };
            await ClassHours.create(newClassHour);
            res.redirect('/classHours');
        } catch (err: any) {
            res.render("error", computeError(err, "Some error occurred while creating the User."));
        }
    },

    // Mostrar el formulario para crear una nueva hora de clase
    showCreateForm: (req: Request, res: Response) => {
        res.render('classHours/create');
    },

    findAll,

    // Mostrar el formulario para editar una hora de clase
    showEditForm: async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const classHour = await ClassHours.findByPk(id);
            if (!classHour) {
                throw new Error(`ClassHour with id ${id} not found`);
            }
            res.render('classHours/edit', { classHour });
        } catch (err: any) {
            res.send(resMsg(500, err.message));
        }
    },

    // Actualizar una hora de clase
    update: async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id;
        try {
            console.log("Request received to update ClassHour with ID:", id);
            console.log("Data received in the request body:", req.body);
    
            if (!req.body || Object.keys(req.body).length === 0) {
                console.error("Error: The request body is empty.");
                res.status(400).send({ error: "The request body is empty." });
                return;
            }

            // Ensure the ID is not being updated
            const { id: bodyId, ...updateData } = req.body; // Exclude the ID

            // Check if the record exists before updating
            const classHour = await ClassHours.findByPk(id);
            if (!classHour) {
                console.error(`Error: ClassHour with ID ${id} not found.`);
                res.status(404).send({ error: `ClassHour with ID ${id} not found.` });
                return;
            }

            // Perform the update
            const [updated] = await ClassHours.update(updateData, { where: { id } });

            if (!updated) {
                console.error(`Error: Failed to update ClassHour with ID ${id}.`);
                res.status(500).send({ error: `Failed to update ClassHour with ID ${id}.` });
                return;
            }

            console.log("ClassHour successfully updated.");
            
            res.status(200).send({ message: "ClassHour successfully updated." });
            // res.redirect('/classHours');
        } catch (err: any) {
            console.error("Error during update:", err);
            res.status(500).send({ error: err.message });
        }
    },

    // Eliminar una hora de clase
    delete: async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const deleted = await ClassHours.destroy({ where: { id } });
            if (!deleted) {
                throw new Error(`ClassHour with id ${id} not found`);
            }
            res.redirect('/classHours');
        } catch (err: any) {
            res.send(computeError(err, `Some error occurred while deleting classHour with id ${id}`));
        }
    },
});
