import { Sequelize, DataTypes, Model } from "sequelize";
import { Id, SessionData } from "../../../common/@types/models"
import { isBeforeStart } from "../utils/validation";
import { defineId, namedFkId } from "../utils/data";
import { WorkDay } from "../../../common/@enums/models" 

// The only purpose of extending Model is getting
// warnings when types are modified, as to keep our
// models updated.
// & Id is required to pass id to where.
// Omit = avoid having to define "courseId"
interface SessionInstance extends 
    Model<Omit<SessionData, "classHourId" | "igtModuleId"> & Id> {}

const DayVals = { values: Object.values(WorkDay) } as const;


// https://sequelize.org/docsSessionDatav6/core-concepts/validations-and-constraints/
const SessionModel = { init: (sequelize: Sequelize) =>
    sequelize.define<SessionInstance>("session", {
        ...defineId,
        
        ...namedFkId("classHourId"),
        ...namedFkId("igtModuleId"),

        day: {
            type: DataTypes.ENUM(DayVals),
            allowNull: false,
        },
    }),
};

export { SessionModel };