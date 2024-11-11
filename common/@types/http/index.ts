export type ResponseData<T> 
    = T
    | { code: 400, errors: string[] }
    | { code: number, message: string  };

export type Body<T> = { body: T };