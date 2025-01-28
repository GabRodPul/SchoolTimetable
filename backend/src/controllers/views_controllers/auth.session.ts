import { NextFunction, Request, Response } from 'express';
import { compareSync } from 'bcrypt';
import { verify, JwtPayload } from 'jsonwebtoken';
import { UserModel } from '../../models/user.model';
import { Id, UserData } from '../../../../common/@types/models';
import utils from '../../utils/utils';
import { resMsg } from '../../utils/response';
import { DB } from '../../models';
import { computeError } from '../../utils/error';
import { envvars } from '../../env';
import { UserRole } from '../../../../common/@enums/models';

const Users = DB.users;

const _authView = async (req: Request, res: Response, view: string) => 
    (req.session as any).user !== undefined 
    ? res.redirect("/home")
    : res.render(view);

export const registerView = async (req: Request, res: Response) => _authView(req, res, "/signup");
export const loginView  = async (req: Request, res: Response) => _authView(req, res, "/login");

export const signup  = async (req: Request, res: Response) => {

};

export const signin  = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.render("error", {
            code:    400,
            message: "Email or password required"
        });
    }

    try {
        const data = await DB.users.findOne({ where: { email }, raw: true }) as UserData&Id | null;
        if (!data
        ||  !compareSync(password, data.password))
            return res.render("error", resMsg(401, "Email or password not valid!"));

        (req.session as any).user = {
            email, 
            id: data.id
        }

        return res.redirect("/home");
    } catch (err: any) {
        return res.render("error", computeError(err, "Some error occurred while retrieving users."));
    }
};

export const logoutView = async (req: Request, res: Response) => {
    try {
        // Respuesta sencilla para confirmar que el logout fue procesado
        res.send(resMsg(200, "User successfully logged out."));
    } catch (err: any) {
        console.error("Logout error:", err);
        res.render("error", computeError(err, "An error occurred while logging out."));
    }
};