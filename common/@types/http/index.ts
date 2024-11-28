// Define el tipo de respuesta genérica, que puede ser un tipo T,
// o un objeto con código 400 y errores, o un objeto con código y mensaje.
export type ResponseData<T> = 
    | T  // Caso genérico donde la respuesta es de tipo T
    | { code: 400, errors: string[] }  // Caso de error 400 con un arreglo de errores
    | { code: number, message: string }; // Caso con un código genérico y un mensaje

// Define un tipo Body para encapsular un objeto con la propiedad 'body' de tipo T.
export type Body<T> = { body: T };