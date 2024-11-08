export type Id = { id: number }
    
export type UserData = {
    name:        string,
    email:       string,
    password:    string,
    phoneNumber: string
}

export type CourseData = {
    code:        string,
    name:        string,   
}

export type GroupData = {
    code:       string
}

export type ApiData = UserData
                    | CourseData
                    | GroupData