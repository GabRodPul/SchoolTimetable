import { DataTypes, Model } from "sequelize";
import { WorkDay } from "#common/@enums/models";
import { Id, SessionData } from "#common/@types/models";
import { defineId, fkId } from "#src/utils/data";

// The only purpose of extending Model is getting
// warnings when types are modified, as to keep our
// models updated.
// & Id is required to pass id to where.
// Omit = avoid having to define "courseId"
export interface SessionInstance extends 
    Model<SessionData & Id> {}

const DayVals = { values: Object.values(WorkDay) } as const;


// https://sequelize.org/docsSessionDatav6/core-concepts/validations-and-constraints/
export const SessionTable = {
    name: "sessions",
    cols: {
        ...defineId,
        classHourId: fkId,
        igtModuleId: fkId,
        day: {
            type: DataTypes.ENUM(DayVals),
            allowNull: false,
        },
    }
    
}