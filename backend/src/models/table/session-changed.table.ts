import { DataTypes, Model } from "sequelize";
import { WorkDay } from "#common/@enums/models";
import { Id, SessionChangeData } from "#common/@types/models";
import { defineId, fkId } from "#src/utils/data";

// The only purpose of extending Model is getting
// warnings when types are modified, as to keep our
// models updated.
// & Id is required to pass id to where.
// Omit = avoid having to define "classHourId" | "sessionId"
export interface SessionChangedInstance extends
    Model<SessionChangeData & Id> { }

const DayVals = { values: Object.values(WorkDay) } as const;


// https://sequelize.org/docsSessionDatav6/core-concepts/validations-and-constraints/
export const SessionChangedTable = {
    name: "session_changed",
    cols: {
        ...defineId,
        
        classHourId: fkId,
        sessionId: fkId,
    
        day: {
            type: DataTypes.ENUM(DayVals),
            allowNull: false,
        },
    
        startDate: {
            type: DataTypes.DATE(),
            allowNull: false,
        },
    
        endDate: {
            type: DataTypes.DATE(),
            allowNull: false,
        },
    }
}