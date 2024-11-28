import { UniqueConstraintError, ValidationError } from "sequelize";
import { ResponseData } from "../../../common/@types/http";
import { resMsg, resVErrs } from "./response";

// Aseguramos que la función computeError retorne un ResponseData adecuado.
const computeError = (err: Error, placeholder?: string): ResponseData<never> => 
    err instanceof ValidationError || err instanceof UniqueConstraintError
    ? resVErrs(err.errors.map(e => e.message))  // Errores de validación o restricción única
    : resMsg(500, err.message ?? placeholder);  // Error genérico con mensaje

export { computeError };