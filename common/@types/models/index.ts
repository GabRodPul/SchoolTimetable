import { Turn, WorkDay } from "../../@enums/models"

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
    image?:         string,
}
export type UserDataResponse = {
    name:           string,
    email:          string,
    password:       string,
    phoneNumber:    string,
    role:           string,
    image?:         string,
}

export type UserWithId = UserData & { id: number };

export type AuthData = {
    user:           UserData & Id,
    accessToken:    string,
}

/***
 * @deprecated This type should be removed
 */
export type CourseData = {
    code:        string,
    name:        string,   
}

export type GroupData = {
    name:       string,
}

export type ModuleData = {
    name:        string,
}

export type IGTModuleData = {
    teacherId:  number,
    groupId:    number,
    moduleId:   number,
    weeklyHours:number,
}

export type TeacherModuleData = {
    teacherId:   number,
    moduleId:    number,
}

export type EnrollmentData = {
    studentId:  number,
    moduleId:   number
}


export type SessionHour   = 1 | 2 | 3 | 4 | 5 | 6;
export type ClassHourData = {
    turn:           Turn,
    sessionHour:    SessionHour,
    start:          string,
    end:            string,
}



// export type ScheduleCell = {
//     sessionHour:    SessionHour,
//     module:         string,
//     group:          string | null,
//     teacher:        string | null,
// };


// export type FullSessionData = {
//     sessionHour:    SessionHour,
//     time:           string,
//     module:         string,
//     group:          string,
//     teacher:        string,
// };

export type ScheduleResponse = {
    day:    string;
    hours:  Array<{ 
        time:       string,
        module?:    string,
        teacher?:   string,
        group?:     string,
    }>;
  };



export type SessionData = {
    classHourId:    number,
    igtModuleId:    number,
    day:            WorkDay,
}

export type SessionChangeData = {
    sessionId:      number,
    classHourId:    number,
    day:            WorkDay,
    startDate:      Date,
    endDate:        Date,
}

export type WarningData = {
    teacherId:      number,
    description:    string,
    startDate:      Date,
    endDate:        Date,
    startHour:      string, // MySQL TIME
    endHour:        string, // MySQL TIME
} 