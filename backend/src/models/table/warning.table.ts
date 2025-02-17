import { DataTypes, Model } from "sequelize";
import { Id, WarningData } from "#common/@types/models";
import { defineId, fkId } from "#src/utils/data";

export interface WarningInstance extends 
    Model<WarningData & Id> {}

export const WarningTable = {
    name: "warnings",
    cols: {
        ...defineId,
        teacherId: fkId,
        description: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        startDate:  {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        endDate: {
            type: DataTypes.STRING(255),
            allowNull: false,
            // We need to add validation for this to make sure startDate <= endDate...
            // - Gabriel
        },
        startHour: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        endHour: {
            type: DataTypes.TIME,
            allowNull: false,
            // Same here: validation
            // - Gabriel
        },
    }
};