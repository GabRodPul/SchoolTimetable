import { ResponseData } from "../../../common/@types/http";

// Respuesta estándar con un mensaje (de tipo string)
const resMsg = (code: number, message: string): ResponseData<never> => ({
    code,
    message,
});

// Respuesta de errores con un código 400 y un arreglo de errores
const resVErrs = (errors: string[]): ResponseData<never> => ({
    code: 400,
    errors,
});

export { resMsg, resVErrs };