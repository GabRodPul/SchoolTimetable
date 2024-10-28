// 'e' as an abbreviation of "export"
declare namespace e {
    type Id = { id: number }
    
    type UserData = {
        name:        string,
        email:       string,
        password:    string,
        phoneNumber: string
    }
}

export = e;