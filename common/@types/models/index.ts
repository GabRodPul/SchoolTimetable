export type Id = { id: number }
    
export type UserData = {
    name:        string,
    email:       string,
    password:    string,
    phoneNumber: string,
    // filename:    string
}

export type AuthData = {
    user: UserData,
    accessToken: string,
}

export type CourseData = {
    code:        string,
    name:        string,   
}

export type GroupData = {
    code:        string
}