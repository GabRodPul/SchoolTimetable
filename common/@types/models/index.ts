import { WorkDay } from "../../@enums/models"

// Each model will have an ID in the database but
// not all data received will have an "id" field inside
// its JSON (i.e. update) 
export type Id = { id: number }
    
export type UserData = {
    name:           string,
    email:          string,
    password:       string,
    phoneNumber:    string,
    role:           string,
    image:          string,
}

export type AuthData = {
    user:           UserData,
    accessToken:    string,
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

export type EnrollmentData = {
    studentId:  number,
    moduleId:   number
}

export type ClassHour = 1 | 2 | 3 | 4 | 5 | 6;
export type AnnualDayGroupData = { // what a mouthful...
    day:        WorkDay,
    hour:       ClassHour,
    groupId:    number,
}

export type HourChangeData = {
    startDate:  Date,
    endDate:    Date,
    hour:       ClassHour,
    teacherId:  number,
    groupId:    number,
}

export type ReminderData = {
    startDate:  Date,
    endDate:    Date,
    changeId:   number,
    groupId:    number,
} 