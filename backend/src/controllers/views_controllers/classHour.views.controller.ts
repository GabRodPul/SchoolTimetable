import express, { Request, Response } from "express";
import { DB } from "../../models";
import { resMsg } from "../../utils/response";
import { computeError } from "../../utils/error";

// Aquí debería ir una variable para guardar las cosas
const ClassHours = DB.classHour;

// Métodos
const ClassHourViewsController = Object.freeze({
    // Obtener todas las horas de clase
    findAll: async (req: Request, res: Response) => {
        try {
            const data = await ClassHours.findAll();
            res.render('ClassHour/index', { classHours: data });
        } catch (err: any) {
            res.send(resMsg(500, err.message));
        }
    },

    // Mostrar el formulario para crear una nueva hora de clase
    showCreateForm: (req: Request, res: Response) => {
        res.render('ClassHour/create');
    },

    // Guardar una nueva hora de clase
    create: async (req: Request, res: Response) => {
        try {
            const newClassHour = await ClassHours.create(req.body);
            res.redirect('/classHours'); // Redirigir a la lista de horas de clase
        } catch (err: any) {
            res.send(resMsg(500, err.message));
        }
    },

    // Mostrar el formulario para editar una hora de clase
    showEditForm: async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const classHour = await ClassHours.findByPk(id);
            if (!classHour) {
                throw new Error(`ClassHour with id ${id} not found`);
            }
            res.render('ClassHour/edit', { classHour });
        } catch (err: any) {
            res.send(resMsg(500, err.message));
        }
    },

    // Actualizar una hora de clase
    update: async (req: Request, res: Response) => {
        const id = req.params.id;
        const { turn, sessionHour, start, end } = req.body;
        try {
            const [updated] = await ClassHours.update({ turn, sessionHour, start, end }, { where: { id } });
            if (!updated) {
                throw new Error(`ClassHour with id ${id} not found`);
            }
            res.redirect('/classHours'); // Redirigir a la lista de horas de clase
        } catch (err: any) {
            res.send(resMsg(500, err.message));
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
            res.send(resMsg(204, "Successfully deleted!"));
        } catch (err: any) {
            res.send(computeError(err, `Some error occurred while deleting classHour with id ${id}`));
        }
    },
});

export { ClassHourViewsController };