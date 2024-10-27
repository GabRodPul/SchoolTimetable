// 'e' as an abbreviation of "export"
declare namespace e {
    type ControllerResponse 
        = { code: 400, errors: string[] }
        | { code: 500, message: string  }
    
    type UserData = {
        name:        string,
        email:       string,
        password:    string,
        phoneNumber: string
    }
}

export = e;