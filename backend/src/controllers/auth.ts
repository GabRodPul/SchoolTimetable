import { NextFunction, Request, Response } from 'express';
import { compareSync } from 'bcrypt';
import { verify, JwtPayload } from 'jsonwebtoken'; // Asegúrate de importar jwt
import { UserModel } from '../models/user.model'; // Ajustado para importar UserModel
import { Id, UserData } from '../../../common/@types/models';
import utils from '../utils/utils';
import { resMsg } from '../utils/response';
import { DB } from '../models';
import { computeError } from '../utils/error';

const Users = DB.users;

const validateUser = ( u: any ) => 
    !!u.name     &&  // !u.name !== undefined
    !!u.email    && 
    !!u.password &&
    !!u.phoneNumber
    ? u as UserData
    : undefined;

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    // Obtenemos el token del encabezado de autorización
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Obtiene el token sin el "Bearer"

    if (!token) {
        res.send(resMsg(400, "Token is required."));
        return;
    }

    const vrfCallback = (err: any, decoded: any) => {
        if (err || !decoded) {
            res.send(resMsg(401, "Invalid token."));
            return;
        }

        // Asegúrate de que `decoded` tiene el tipo correcto y contiene `id`
        const user = decoded as JwtPayload;

        if (!user.email) {
            res.send(resMsg(401, "Invalid token payload."));
            return;
        }

        // Busca el usuario con su correo
        try {
            const data = Users.findOne({ where: { email: user.email } });
            if (!data) {
                res.send(resMsg(401, "Invalid user."));
                return;
            }

            next();
        } catch (err: any) {
            console.error("Database error:", err);
            res.send(resMsg(500, `Error retrieving User with email=${user.email}`));
            return;
        }
    }

    // Verifica el token usando el secreto JWT
    verify(token, process.env.JWT_SECRET as string, vrfCallback);
};

export const signin = async (req: Request, res: Response) => {
    try {
        const data          = (await Users.create(req.body)).get({ plain: true });
        const accessToken   = utils.generateToken(data);
        const user          = utils.cleanUser(data);
        res.send({ user, accessToken });
    } catch (err: any) {
        res.status(500).send(computeError(err, "Some error occurred while signing in."))
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.send(resMsg(401, "Email & password are needed for login!"));

        const data = (await Users.findOne({ where: { email }, raw: true })) as UserData | null;
        if (!data) {
            res.send(resMsg(401, "Password not valid!"));
            return;
        }
        
        // Compare the encrypted password
        const result = compareSync(password, data.password);
        if (!result) {
            res.send(resMsg(401, "Password not valid!"));
            return;
        }

        // Generate the token
        const accessToken = utils.generateToken(data);

        // Get the basic user details
        const user = utils.cleanUser(data);

        // Return the token along with user details
        res.send({ user, accessToken });
    } catch(err: any) {
        console.error("Database error:", err);
        res.send(resMsg(500, "Some error occurred while retrieving user data."));
    }
}