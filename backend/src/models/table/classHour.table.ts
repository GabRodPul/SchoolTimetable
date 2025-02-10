import { DataTypes, Model } from "sequelize";
import { ClassHourData, Id } from "#common/@types/models";
import { defineId, enumStrVals } from "#src/utils/data";
import { Turn } from "#common/@enums/models";

// The only purpose of extending Model is getting
// warnings when types are modified, as to keep our
// models updated.
// & Id is required to pass id to where.
// Omit = avoid having to define "courseId"
export interface ClassHourInstance extends Model<ClassHourData & Id> {}

export const ClassHourTable = {
    name: "classHours",
    cols: {
        ...defineId,
        turn: {
            type: DataTypes.ENUM(enumStrVals(Turn)),
            allowNull: false,
        },
        sessionHour: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 6
            }
        },
        start:  {
            type: DataTypes.TIME,
            allowNull: false,
        },
        end: {
            type: DataTypes.TIME,
            allowNull: false,
            // We need to add validation for this to make sure startDate <= endDate...
            // - Gabriel
        },
    }
};