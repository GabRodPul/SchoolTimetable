import { Sequelize, DataTypes, Model } from "sequelize";
import { Id, SessionChangeData } from "../../../common/@types/models"
import { isBeforeStart } from "../utils/validation";
import { defineId, namedFkId } from "../utils/data";
import { WorkDay } from "../../../common/@enums/models"

// The only purpose of extending Model is getting
// warnings when types are modified, as to keep our
// models updated.
// & Id is required to pass id to where.
// Omit = avoid having to define "classHourId" | "sessionId"
interface SessionInstance extends
    Model<Omit<SessionChangeData, "classHourId" | "sessionId"> & Id> { }

const DayVals = { values: Object.values(WorkDay) } as const;


// https://sequelize.org/docsSessionDatav6/core-concepts/validations-and-constraints/
const SessionChangedModel = {
    init: (sequelize: Sequelize) =>
        sequelize.define<SessionInstance>("session_changed", {
            ...defineId,

            ...namedFkId("classHourId"),
            ...namedFkId("sessionId"),

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
        }),
};

export { SessionChangedModel };