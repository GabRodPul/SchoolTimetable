declare namespace e {
    type ResponseData 
        = { code: 400, errors: string[] }
        | { code: number, message: string  }
}

export = e;