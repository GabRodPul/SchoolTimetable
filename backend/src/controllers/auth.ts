import { NextFunction, Request, Response } from 'express';
import { compareSync } from 'bcrypt';
import { verify, JwtPayload } from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import { Id, UserData } from '../../../common/@types/models';
import utils from '../utils/utils';
import { resMsg } from '../utils/response';
import { DB } from '../models';
import { computeError } from '../utils/error';
import { envvars } from '../env';
import { UserRole } from '../../../common/@enums/models';
import bcrypt from "bcrypt";

const Users = DB.users;

const validateUser = (u: any) =>
    !!u.name &&  // !u.name !== undefined
        !!u.email &&
        !!u.password &&
        !!u.phoneNumber
        ? u as UserData
        : undefined;

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    // We get the authorization header token
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Get the token without the "Bearer"
    console.log("s:auth " + token);
    if (!token) {
        res.send(resMsg(400, "Token is required."));
        return;
    }

    const vrfCallback = async (err: any, decoded: any) => {
        if (err || !decoded) {
            res.send(resMsg(401, "Invalid token."));
            return;
        }

        // `decoded` has the correct type and contains `id`
        const user = decoded as JwtPayload;
        console.log(`s:auth ${user.email}`)
        if (!user.email) {
            res.send(resMsg(401, "Invalid token payload."));
            return;
        }

        // Search for the user with their email
        try {
            const data = await Users.findOne({ where: { email: user.email } });
            if (!data) {
                res.send(resMsg(401, "Invalid user."));
                return;
            }
            
            console.log(`s:auth ${!!data}`)
            next();
        } catch (err: any) {
            console.error("Database error:", err);
            res.send(computeError(err, `Error retrieving User with email=${user.email}`));
            return;
        }
    }

    // Verify token using JWT secret
    verify(token, envvars.JWT_SECRET as string, vrfCallback);
};

// FIXME: This should be named "signup"
export const signin = async (req: Request, res: Response) => {
    try {
        const data = (await Users.create({
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10)
        })).get({ plain: true });
        const accessToken = utils.generateToken(data);
        const user = utils.cleanUser(data);
        res.send({ user, accessToken });
    } catch (err: any) {
        res.send(computeError(err, "Some error occurred while signing in."))
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        // Respuesta sencilla para confirmar que el logout fue procesado
        res.send(resMsg(200, "User successfully logged out."));
    } catch (err: any) {
        console.error("Logout error:", err);
        res.send(computeError(err, "An error occurred while logging out."));
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;

        if (!email || !password) {
            res.send(resMsg(401, "Email & password are needed for login!"));
            return;
        }

        const data = (await Users.findOne({ where: { email }, raw: true })) as UserData | null;
        if (!data) {
            res.send(resMsg(401, "Wrong email!"));
            return;
        }

        // Compare the encrypted password
        const result = compareSync(password, data.password);
        console.log(result);
        if (!result) {
            console.log(password)
            console.log(data.password)
            res.send(resMsg(401, "Password not valid!"));
            return;
        }

        // Generate the token
        const accessToken = utils.generateToken(data);

        // Get the basic user details
        const user = utils.cleanUser(data);

        // Return the token along with user details
        res.send({ user, accessToken });
    } catch (err: any) {
        console.error("Database error:", err);
        res.send(computeError(err, "Some error occurred while retrieving user data."));
    }
}
export const hasRolePermissions = (role: UserRole) => {
    console.log("auth llegué hasat aquí")
    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            res.send(resMsg(400, "Token is required."));
            return;
        }

        const vrfCallback = async (err: any, decoded: any) => {
            if (err || !decoded) {
                res.send(resMsg(401, "Invalid token."));
                return;
            }

            const user = decoded as JwtPayload; 
            if (!user.email) {  
                res.send(resMsg(401, "Invalid token payload."));
                return;
            }

            try {
                const data = await Users.findOne({ where: { email: user.email }, raw: true }) as UserData | null;
                if (!data) {
                    res.send(resMsg(401, "Invalid user."));
                    return;
                }

                // We check the user's role to see if it has sufficient permissions
                if (data.role < role)
                    throw new Error(`Insufficient permissions: ${data.role}`);

                next();
            } catch (err: any) {
                console.error("Database error:", err);
                res.send(computeError(err, `Error retrieving User with email=${user.email}`));
                return;
            }
        }

        verify(token, envvars.JWT_SECRET as string, vrfCallback);
    }
};