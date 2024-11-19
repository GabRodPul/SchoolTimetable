export type Id = { id: number }
    
export type UserData = {
    name:        string,
    email:       string,
    password:    string,
    phoneNumber: string,
    roleMain:    string,
    roleOther:   string,
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
    courseId:    number,
}

export type ModuleData = {
    subjectCode: string,
    groupId:     number,
    teacherId:   number,
    courseId:    number
}