import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken'; // Asegúrate de importar jwt
import { UserModel } from '../models/user.model'; // Ajustado para importar UserModel
import utils from '../utils/utils';

// Define tipos para los datos de usuario, si es necesario, basados en tu esquema de UserModel
interface UserData {
  id: string; // O el tipo de ID que uses (number, etc.)
  username: string;
  password: string;
  [key: string]: any; // Incluir otras propiedades que UserModel pueda tener
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  // Obtenemos el token del encabezado de autorización
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Obtiene el token sin el "Bearer"

  if (!token) {
    res.status(400).json({
      error: true,
      message: "Token is required."
    });
    return;
  }

  // Verifica el token usando el secreto JWT
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err || !decoded) {
      res.status(401).json({ error: true, message: "Invalid token." });
      return;
    }

    // Asegúrate de que `decoded` tiene el tipo correcto y contiene `id`
    const user = decoded as JwtPayload;

    if (!user.id) {
      res.status(401).json({ error: true, message: "Invalid token payload." });
      return;
    }

    // Busca el usuario por ID
    UserModel.findByPk(user.id)
      .then((data: UserModel | null) => {
        if (!data) {
          res.status(401).json({ error: true, message: "Invalid user." });
          return;
        }

        // Continúa con el siguiente middleware si todo es válido
        next();
      })
      .catch((err: any) => {
        console.error("Database error:", err);
        res.status(500).json({ message: `Error retrieving User with id=${user.id}` });
      });
  });
};



export const signin = (req: Request, res: Response): void => {
  const user: string = req.body.username;
  const pwd: string = req.body.password;

  // Return 400 status if username or password is missing
  if (!user || !pwd) {
    res.status(400).json({
      error: true,
      message: "Username or Password required."
    });
    return;
  }

  // Find the user in the database using UserModel
  UserModel.findOne({ where: { username: user } })
    .then((data: UserModel | null) => {
      if (!data) {
        // Return 401 if user does not exist
        return res.status(401).json({ error: true, message: "Password not valid!" });
      }

      // Compare the encrypted password
      const result = bcrypt.compareSync(pwd, data.password);
      if (!result) {
        return res.status(401).json({ error: true, message: "Password not valid!" });
      }

      // Generate the token
      const token = utils.generateToken(data);

      // Get the basic user details
      const userObj = utils.getCleanUser(data);

      // Return the token along with user details
      return res.json({ user: userObj, access_token: token });
    })
    .catch((err: Error) => {
      console.error("Database error:", err);
      return res.status(500).json({
        message: err.message || "Some error occurred while retrieving user data."
      });
    });
};