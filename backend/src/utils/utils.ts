import { UserData } from "../../../common/@types/models";

var jwt = require('jsonwebtoken');

// Función para generar un token y devolverlo
function generateToken(user: any) {
    if (!user) return null;

    var u = {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber
    };

    // Genera el token
    return jwt.sign(u, process.env.JWT_SECRET as string, {
        expiresIn: 60 * 60 * 24 // Expira en 24 horas
    });
}

// Función para obtener un "usuario limpio", sin campos sensibles como contraseña
function cleanUser(user: UserData) {
    if (!user) return null;

    // Retorna un objeto con la información limpia del usuario, sin la contraseña
    const { password, ...cleanUser } = user; // Excluye la contraseña
    return cleanUser; // El usuario "limpio"
}

// Crear un objeto que agrupe las funciones
const utils = {
    generateToken,
    cleanUser: cleanUser
};

// Exportar el objeto utils
export default utils;