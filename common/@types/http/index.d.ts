declare namespace e {
    type ResponseData<T> 
        = T
        | { code: 400, errors: string[] }
        | { code: number, message: string  }
}

export = e;