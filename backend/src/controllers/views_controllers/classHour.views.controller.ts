import express, { Request, Response } from "express";
import { DB } from "../../models";
import { resMsg } from "../../utils/response";
import { computeError } from "../../utils/error";

// Aquí debería ir una variable para guardar las cosas
const ClassHours = DB.classHour;
// Obtener todas las horas de clase
const findAll = async (req: Request, res: Response) => {
    try {
        const data = await ClassHours.findAll();
        res.render('classHour/index', { data });
    } catch (err: any) {
        res.send(resMsg(500, err.message));
    }
}


// Métodos
export const ClassHourViewsController = Object.freeze({
    //Guardar una hora de clase en la base de datos
    store: async (req: Request, res: Response) => {
        try {
            const newClassHour = {...req.body};
            const data = await ClassHours.create(newClassHour);
            res.redirect('/classHour');
        } catch (err: any) {
            // We make sure that computeError return ResponseData
            res.render("error", computeError(err, "Some error occurred while creating the User."));
        }
    },


    // Mostrar el formulario para crear una nueva hora de clase
    showCreateForm: (req: Request, res: Response) => {
        res.render('classHour/create');
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
            res.render('classHour/edit', { classHour });
        } catch (err: any) {
            res.send(resMsg(500, err.message));
        }
    },

    // Actualizar una hora de clase
    update: async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const [updated] = await ClassHours.update(req.body, { where: { id } });
            if (!updated) {
                throw new Error(`ClassHour with id ${id} not found`);
            }
            res.redirect('/classHour'); // Redirigir a la lista de horas de clase
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
            res.redirect('/classHour');
        } catch (err: any) {
            res.send(computeError(err, `Some error occurred while deleting classHour with id ${id}`));
        }
    },
});